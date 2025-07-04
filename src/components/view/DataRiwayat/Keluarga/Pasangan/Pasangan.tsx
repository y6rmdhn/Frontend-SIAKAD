import { Link, useSearchParams } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import InfoList from "@/components/blocks/InfoList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { useEffect, useMemo } from "react";
import { parseISO, format } from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";
import deleteDataDosenServices from "@/services/dosen.delete.services.ts";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { PasanganParams } from "@/types";

// --- START DEFINISI TIPE ---

interface PegawaiInfo {
    nip: string;
    nama: string;
    unit_kerja: string;
    status: string;
    jab_akademik: string;
    jab_fungsional: string;
    jab_struktural: string | null;
    pendidikan: string;
}

interface TableColumn {
    label: string;
}

interface PasanganItem {
    id: number;
    nama_pasangan: string;
    tempat_lahir: string;
    tgl_lahir: string; // ISO string date
    jenis_pekerjaan: string | null;
    status_kepegawaian: string | null;
    status_pengajuan: "draf" | "diajukan" | "disetujui" | "ditolak";
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface FilterOption {
    id: string;
    nama: string;
}

interface PasanganApiResponse {
    pegawai_info: PegawaiInfo;
    table_columns: TableColumn[];
    filters: {
        status_pengajuan: FilterOption[];
    };
    data: {
        data: PasanganItem[];
    };
    links: PaginationLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page: number;
}

// --- END DEFINISI TIPE ---

const Pasangan = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery<PasanganApiResponse>({
        queryKey: [
            "pasangan-dosen",
            searchParam.get("page"),
            searchParam.get("search"),
            searchParam.get("status_pengajuan"),
        ],
        queryFn: async () => {
            const params: PasanganParams = {
                page: searchParam.get("page"),
                search: searchParam.get("search"),
                status_pengajuan: searchParam.get("status_pengajuan"),
            };
            const response = await dosenServices.getDataPasangan(params);
            return response.data;
        },
    });

    const statusPengajuanOptions = useMemo(() => {
        return data?.filters?.status_pengajuan?.map((item) => ({
            label: item.nama,
            value: item.id,
        })) || [];
    }, [data]);

    // Handler dan Mutasi
    const handleFilterChange = (filterName: string, value: string) => {
        const newSearchParam = new URLSearchParams(searchParam);
        if (value && value !== "semua") {
            newSearchParam.set(filterName, value);
        } else {
            newSearchParam.delete(filterName);
        }
        newSearchParam.set("page", "1");
        setSearchParam(newSearchParam);
    };

    const { mutate: deleteData } = useMutation({
        mutationFn: (id: number) =>
            deleteDataDosenServices.deteleDataPasangan(id),
        onSuccess: () => {
            toast.success("Data berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: ["pasangan-dosen"] });
        },
    });

    const handleDeleteData = (id: number) => {
        deleteData(id);
    };

    useEffect(() => {
        if (!searchParam.get("page")) {
            searchParam.set("page", "1");
            setSearchParam(searchParam);
        }
    }, [searchParam, setSearchParam]);

    useEffect(() => {
        if (Number(searchParam.get("page")) < 1) {
            searchParam.set("page", "1");
            setSearchParam(searchParam);
        }
    }, [searchParam, setSearchParam]);

    useEffect(() => {
        if (
            data?.last_page &&
            Number(searchParam.get("page")) > data.last_page &&
            data.last_page > 0
        ) {
            searchParam.set("page", data.last_page.toString());
            setSearchParam(searchParam);
        }
    }, [searchParam, data, setSearchParam]);

    return (
        <div className="mt-10 mb-20">
            <Title title="Pasangan" subTitle="Daftar Pasangan" />

            <CustomCard
                actions={
                    <div className="h-0 flex justify-end">
                        <Link to="/data-riwayat/keluarga/detail-pasangan">
                            <Button className="bg-yellow-uika text-xs md:text-auto hover:bg-hover-yellow-uika">
                                <FaPlus /> Tambah Baru
                            </Button>
                        </Link>
                    </div>
                }
            />

            {isLoading ? (
                <Skeleton className="h-24 w-full mt-4" />
            ) : (
                <InfoList
                    items={[
                        // FIX: Menambahkan fallback value '??' untuk memastikan tipe selalu string
                        { label: "NIP", value: data?.pegawai_info.nip ?? '-' },
                        { label: "Nama", value: data?.pegawai_info.nama ?? '-' },
                        { label: "Unit Kerja", value: data?.pegawai_info.unit_kerja ?? '-' },
                        { label: "Status", value: data?.pegawai_info.status ?? '-' },
                        { label: "Jab. Akademik", value: data?.pegawai_info.jab_akademik ?? '-' },
                        { label: "Jab. Fungsional", value: data?.pegawai_info.jab_fungsional ?? '-' },
                        { label: "Jab. Struktural", value: data?.pegawai_info.jab_struktural ?? '-' },
                        { label: "Pendidikan", value: data?.pegawai_info.pendidikan ?? '-' },
                    ]}
                />
            )}


            <CustomCard
                actions={
                    <div className="flex flex-col md:flex-row gap-4">
                        <Label className="text-[#FDA31A] md:pr-20">Status Pengajuan</Label>
                        <SelectFilter
                            classname="w-full md:w-64"
                            placeholder="--Semua Pengajuan--"
                            value={searchParam.get("status_pengajuan") || "semua"}
                            options={statusPengajuanOptions}
                            onValueChange={(value) => handleFilterChange("status_pengajuan", value)}
                        />
                    </div>
                }
            />

            <div className="md:gap-5 gap-2 flex mt-5 flex-col sm:flex-row ">

                <SearchInput />
            </div>

            {isLoading ? (
                <div className="mt-10 space-y-4">
                    <Skeleton className="h-12 w-full" />
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
            ) : (
                <>
                    <Table className="mt-10 table-auto text-xs lg:text-sm">
                        <TableHeader>
                            <TableRow className="bg-[#002E5A] hover:bg-[#002E5A]">
                                <TableHead className="text-center text-white border">#</TableHead>
                                {data?.table_columns.map((item: TableColumn, index) => (
                                    <TableHead key={index} className="text-center text-white border">
                                        {item.label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-200">
                            {isLoading ? (
                                <div className="mt-10 space-y-4">
                                    <Skeleton className="h-12 w-full" />
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} className="h-10 w-full" />
                                    ))}
                                </div>
                            ) : (
                                data?.data.data.map((item: PasanganItem, index: number) => (
                                    <TableRow key={item.id} className=" even:bg-gray-100">
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="text-center">{item.nama_pasangan}</TableCell>
                                        <TableCell className="text-center">{item.tempat_lahir}</TableCell>
                                        <TableCell className="text-center">
                                            {item.tgl_lahir ? format(parseISO(item.tgl_lahir), "dd MMMM yyyy") : "-"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.jenis_pekerjaan || "-"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.status_kepegawaian || "-"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                size="sm"
                                                className={`w-full text-xs lg:text-sm text-black
                                            ${item.status_pengajuan === "draf" ? "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65"
                                                        : item.status_pengajuan === "diajukan" ? "bg-[#FFC951]/50 hover:bg-[#FFC951]/50"
                                                            : item.status_pengajuan === "disetujui" ? "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50"
                                                                : item.status_pengajuan === "ditolak" ? "bg-red-500 hover:bg-red-500 text-white"
                                                                    : "bg-slate-300 hover:bg-slate-300"
                                                    }`}
                                            >
                                                {item.status_pengajuan}
                                            </Button>
                                        </TableCell>
                                        <TableCell className="h-full">
                                            <div className="flex justify-center items-center w-full h-full">
                                                <Link to={`/data-riwayat/keluarga/detail-data-pasangan/${item.id}`}>
                                                    <Button size="icon" variant="ghost" className="cursor-pointer">
                                                        <IoEyeOutline className="w-5 h-5 text-[#26A1F4]" />
                                                    </Button>
                                                </Link>
                                                <ConfirmDialog
                                                    title="Hapus Data?"
                                                    description="Apakah Anda yakin ingin menghapus data ini?"
                                                    onConfirm={() => handleDeleteData(item.id)}
                                                >
                                                    <Button size="icon" type="button" variant="ghost" className="cursor-pointer">
                                                        <FaRegTrashAlt className="text-[#FDA31A]" />
                                                    </Button>
                                                </ConfirmDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    <CustomPagination
                        currentPage={Number(searchParam.get("page") || 1)}
                        links={data?.links || []}
                        onPageChange={(page) => {
                            searchParam.set("page", page.toString());
                            setSearchParam(searchParam);
                        }}
                        hasNextPage={!!data?.next_page_url}
                        hasPrevPage={!!data?.prev_page_url}
                        totalPages={data?.last_page}
                    />
                </>
            )}
        </div>
    );
};

export default Pasangan;
