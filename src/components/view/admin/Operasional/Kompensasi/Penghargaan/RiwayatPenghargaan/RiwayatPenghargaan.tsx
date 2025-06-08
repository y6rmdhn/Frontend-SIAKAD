import CustomCard from "@/components/blocks/Card";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {FiSearch} from "react-icons/fi";
import {IoEyeOutline} from "react-icons/io5";
import {MdEdit} from "react-icons/md";
import {Link, useSearchParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import CustomPagination from "@/components/blocks/CustomPagination";
import {format, parseISO} from "date-fns";

const RiwayatPenghargaan = () => {


    const [searchParam, setSearchParam] = useSearchParams();
    const [isAddData, setIsAddData] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParam.get("page") || 1));
    const queryClient = useQueryClient();

    // get data
    const {data} = useQuery({
        queryKey: ["jenis-penghargaan", searchParam.get("page")],
        queryFn: async () => {
            const response = await adminServices.getPenghargaan(
                searchParam.get("page")
            );

            return response.data.data;
        },
    });

    useEffect(() => {
        const page = Number(searchParam.get("page") || 1);
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    }, [searchParam]);

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
            <h1 className="text-lg sm:text-2xl font-normal">
                Riwayat Penghargaan{" "}
                <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Daftar Penghargaan
        </span>
            </h1>

            <CustomCard
                actions={
                    <div className="grid grid-rows-3 lg:grid-rows-2 grid-flow-col gap-5 lg:gap-10">
                        <div className="flex flex-col sm:flex-row">
                            <Label className="w-full text-[#FDA31A]">Unit Kerja</Label>
                            <Select>
                                <SelectTrigger className="w-full text-xs sm:text-sm">
                                    <SelectValue placeholder="041001 - Universitas Ibn Khaldun"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Unit Kerja</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <Label className="w-full text-[#FDA31A]">Jenis Pelanggaran</Label>
                            <Select>
                                <SelectTrigger className="w-full text-xs sm:text-sm">
                                    <SelectValue placeholder="--Semua Jenis Pelanggaran--"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Unit Kerja</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <Label className="w-full text-[#FDA31A]">
                                Jabatan Fungsional
                            </Label>
                            <Select>
                                <SelectTrigger className="w-full text-xs sm:text-sm">
                                    <SelectValue placeholder="--Semua Jabatan Fungsional--"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Unit Kerja</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                }
            />

            <div className="w-full flex flex-col lg:flex-row justify-between mt-6">
                <div className="w-full grid sm:grid-cols-2 gap-4 lg:flex lg:w-full">
                    <div className="w-full lg:w-32">
                        <Select>
                            <SelectTrigger className="w-full lg:w-32 text-xs sm:text-sm">
                                <SelectValue placeholder="--Semua--"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Unit Kerja</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full relative lg:w-90">
                        <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2"/>
                        <Input placeholder="Search" className="w-full pr-8 lg:w-90 text-xs sm:text-sm"/>
                    </div>
                </div>

                <div className="w-full grid sm:grid-cols-2 gap-4 mt-4 lg:mt-0 lg:flex lg:w-auto">
                    <div className="w-full lg:w-auto">
                        <Link to="/admin/operasional/kompensasi/detail-penghargaan">
                            <Button
                                className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full lg:w-auto text-xs sm:text-sm">
                                <FaPlus/> Tambah
                            </Button>
                        </Link>
                    </div>

                    <div className="w-full lg:w-auto">
                        <Button variant="destructive" className="cursor-pointer w-full lg:w-auto text-xs sm:text-sm">
                            <FaRegTrashAlt/> Hapus
                        </Button>
                    </div>
                </div>
            </div>

            <Table className="mt-10 table-auto">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="text-center"></TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">NIP</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Nama Pegawai</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Tgl Penghargaan</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Jenis Penghargaan</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Penghargaan</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {data?.data.map((item: any) => (
                        <TableRow className=" even:bg-gray-100">
                            <TableCell className="text-center">
                                <Checkbox
                                    className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer"/>
                            </TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">{item.nip}</TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">{item.nama_pegawai}</TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">
                                {item.tanggal_penghargaan ? format(parseISO(item.tanggal_penghargaan), "dd MMMM yyyy")
                                    : "-"}
                            </TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">{item.jenis_penghargaan}</TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">{item.nama_penghargaan}</TableCell>
                            <TableCell className="h-full">
                                <div className="flex justify-center items-center w-full h-full">
                                    <Button size="icon" variant="ghost" className="cursor-pointer">
                                        <IoEyeOutline className="w-5! h-5! text-[#26A1F4]"/>
                                    </Button>

                                    <Button size="icon" variant="ghost" className="cursor-pointer">
                                        <MdEdit className="w-5! h-5! text-[#26A1F4]"/>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <CustomPagination
                currentPage={Number(searchParam.get("page") || 1)}
                links={data?.links || []}
                onPageChange={(page) => {

                    if (isEditMode) {
                        toast.warning("Selesaikan edit data terlebih dahulu");
                        return;
                    }

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

export default RiwayatPenghargaan;
