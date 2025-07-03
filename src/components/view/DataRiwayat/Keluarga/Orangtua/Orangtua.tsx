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
import { FaSquareFull } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import InfoList from "@/components/blocks/InfoList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useMemo } from "react";
import { parseISO, format } from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";
import { toast } from "sonner";
import deleteDataDosenServices from "@/services/dosen.delete.services.ts";
import { OrangtuaParams } from "@/types";

const Orangtua = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const queryClient = useQueryClient();

    // get data
    const { data, isLoading } = useQuery({
        queryKey: [
            "orangtua-dosen",
            searchParam.get("page"),
            searchParam.get("search"),
            searchParam.get("status_pengajuan"),
            searchParam.get("status_orangtua"),
        ],
        queryFn: async () => {
            const params: OrangtuaParams = {
                page: searchParam.get("page"),
                search: searchParam.get("search"),
                status_pengajuan: searchParam.get("status_pengajuan"),
                status_orangtua: searchParam.get("status_orangtua"),
            };
            const response = await dosenServices.getDataOrangtua(params);
            return response.data;
        },
    });

    const statusPengajuanOptions = useMemo(() => {
        return data?.filters?.status_pengajuan?.map((item: any) => ({
            label: item.nama,
            value: item.id,
        })) || [];
    }, [data]);

    const statusOrangtuaOptions = useMemo(() => {
        const options = data?.filters?.status_orangtua?.map((item: any) => ({
            label: item.nama,
            value: item.id,
        })) || [];
        return [{ label: "Semua Status Orang Tua", value: "semua" }, ...options];
    }, [data]);

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

    // delete data
    const { mutate: deleteData } = useMutation({
        mutationFn: (id: number) => deleteDataDosenServices.deteleDataOrangtua(id),
        onSuccess: () => {
            toast.success("Data berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: ["orangtua-dosen"] });
        }
    })

    const handleDeleteData = (id: number) => {
        deleteData(id)
    }

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
            <Title title="Orang Tua" subTitle="Daftar Orang Tua" />

            <CustomCard
                actions={
                    <div className="h-0 flex justify-end">
                        <Link to="/data-riwayat/keluarga/detail-orangtua">
                            <Button className="bg-yellow-uika text-xs md:text-auto hover:bg-hover-yellow-uika">
                                <FaPlus /> Tambah Baru
                            </Button>
                        </Link>
                    </div>
                }
            />

            <InfoList
                items={[
                    { label: "NIP", value: data?.pegawai_info.nip },
                    { label: "Nama", value: data?.pegawai_info.nama },
                    { label: "Unit Kerja", value: data?.pegawai_info.unit_kerja },
                    { label: "Status", value: data?.pegawai_info.status },
                    { label: "Jab. Akademik", value: data?.pegawai_info.jab_akademik },
                    { label: "Jab. Fungsional", value: data?.pegawai_info.jab_fungsional },
                    { label: "Jab. Struktural", value: data?.pegawai_info.jab_struktural },
                    { label: "Pendidikan", value: data?.pegawai_info.pendidikan },
                ]}
            />

            <CustomCard
                actions={
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <Label className="text-[#FDA31A] md:pr-5 w-60">Status Pengajuan</Label>
                            <SelectFilter classname="w-full" placeholder="--Semua Pengajuan--"
                                value={searchParam.get("status_pengajuan") || "semua"}
                                options={statusPengajuanOptions}
                                onValueChange={(value) => handleFilterChange("status_pengajuan", value)}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <Label className="text-[#FDA31A] md:pr-5 w-60">Status Orang Tua</Label>
                            <SelectFilter classname="w-full" placeholder="--Semua Status--"
                                value={searchParam.get("status_orangtua") || "semua"}
                                options={statusOrangtuaOptions}
                                onValueChange={(value) => handleFilterChange("status_orangtua", value)}
                            />
                        </div>
                    </div>
                }
            />

            <div className="md:gap-5 gap-2 flex mt-5 flex-col sm:flex-row ">

                <SearchInput />
            </div>

            <Table className="mt-10 table-auto text-xs lg:text-sm">
                <TableHeader>
                    <TableRow className="bg-[#002E5A] ">
                        <TableHead className="text-center text-white border">
                            <FaSquareFull className="w-3 h-3" />
                        </TableHead>
                        {data?.table_columns.map((item: { id: Key | null | undefined; label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                            <TableHead key={item.id} className="text-center text-white border">
                                {item.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {isLoading ? (
                        <TableRow><TableCell colSpan={9} className="text-center h-24">Memuat data...</TableCell></TableRow>
                    ) : data?.data?.data?.length === 0 ? (
                        <TableRow><TableCell colSpan={9} className="text-center h-24">Data tidak ditemukan.</TableCell></TableRow>
                    ) : (
                        data?.data.data.map((item: any) => (
                            <TableRow key={item.id} className=" even:bg-gray-100">
                                <TableCell className="text-center">{item.id}</TableCell>
                                <TableCell className="text-center">{item.nama}</TableCell>
                                <TableCell className="text-center">{item.status_orangtua}</TableCell>
                                <TableCell className="text-center">{item.tempat_lahir}</TableCell>
                                <TableCell className="text-center">
                                    {item.tgl_lahir ? format(parseISO(item.tgl_lahir), "dd MMMM yyyy")
                                        : "-"}
                                </TableCell>
                                <TableCell className="text-center">{item.umur}</TableCell>
                                <TableCell className="text-center">{item.pekerjaan}</TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        size="sm"
                                        className={`w-full text-xs lg:text-sm text-black
    ${item.status_pengajuan === "draf"
                                                ? "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65"
                                                : item.status_pengajuan === "diajukan"
                                                    ? "bg-[#FFC951]/50 hover:bg-[#FFC951]/50"
                                                    : item.status_pengajuan === "disetujui"
                                                        ? "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50"
                                                        : item.status_pengajuan === "ditolak"
                                                            ? "bg-red-500 hover:bg-red-500"
                                                            : "bg-slate-300 hover:bg-slate-300"
                                            }
  `}
                                    >
                                        {item.status_pengajuan}
                                    </Button>
                                </TableCell>
                                <TableCell className="h-full">
                                    <div className="flex justify-center items-center w-full h-full">
                                        <Link to={"/data-riwayat/keluarga/detail-data-orangtua/" + item.id}>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="cursor-pointer"
                                            >
                                                <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                                            </Button>
                                        </Link>
                                        <ConfirmDialog
                                            title="Hapus Data?"
                                            description="Apakah Anda yakin ingin menghapus data ini?"
                                            onConfirm={() => handleDeleteData(item.id)}
                                        >
                                            <Button
                                                size="icon"
                                                type="button"
                                                variant="ghost"
                                                className="cursor-pointer"
                                            >
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
        </div>
    );
};

export default Orangtua;
