import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import unitKerjaOptions from "@/constant/dummyFilter";
import {FaRegTrashAlt} from "react-icons/fa";
import {Link, useSearchParams} from "react-router-dom";
import {IoIosArrowUp} from "react-icons/io";
import {IoIosArrowDown} from "react-icons/io";
import {IoEyeOutline} from "react-icons/io5";
import {FaPlus} from "react-icons/fa6";
import {useQuery} from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import {useEffect} from "react";
import CustomPagination from "@/components/blocks/CustomPagination";
import {ChevronDownIcon} from "lucide-react";

const JabatanStruktural = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const {data} = useQuery({
        queryKey: ["jabatan-struktural", searchParam.get("page")],
        queryFn: async () => {
            const statusKeaktifanResponse = await adminServices.getJabatanStrukturalReferensi(
                searchParam.get("page")
            );

            return statusKeaktifanResponse.data.data;
        },
    });

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
            <Title title="Jabatan Struktural" subTitle="Daftar Jabatan Struktural"/>
            <CustomCard
                actions={
                    <div className="sm:flex grid grid-rows-1 gap-3">
                        <Label className="w-32 sm:w-45 md:w-60 text-[#FDA31A]">Jabatan Struktural</Label>
                        <SelectFilter classname="w-58 md:w-80 lg:w-92" options={unitKerjaOptions}/>
                    </div>
                }
            />

            <div className="grid grid-rows-2 gap-3 sm:flex justify-between mt-6">
                <div className="flex gap-4">
                    <SelectFilter classname="w-30 sm:w-25" options={unitKerjaOptions}/>
                    <SearchInput/>
                </div>

                <div className="flex sm:gap-3 gap-4">
                    <Link to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural">
                        <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika w-30 sm:w-23 md:w-25">
                            <FaPlus/> Tambah
                        </Button>
                    </Link>
                    <Button variant="destructive" className="cursor-pointe w-30 sm:w-22">
                        <FaRegTrashAlt/> Hapus
                    </Button>
                </div>
            </div>

            <Table className="mt-10 table-auto">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="text-center"></TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">
                            Nama Jabatan Struktural
                        </TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">
                            Parent Jabatan Struktural
                        </TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Unit Kerja</TableHead>
                        <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {data?.data.map((item, index) => (
                        <TableRow key={index} className=" even:bg-gray-100">
                            <TableCell className="text-center">
                                <ChevronDownIcon
                                    className={`text-muted-foreground size-4 transition-transform duration-200`}
                                /></TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">{item.kode}</TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">{item.keterangan}</TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">{item.parent?.keterangan || "-"}</TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">{item.unit_kerja.nama_unit}</TableCell>
                            <TableCell className="h-full">
                                <div className="flex justify-center items-center w-full h-full">
                                    <Link to="">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="cursor-pointer"
                                        >
                                            <IoIosArrowUp className="w-6! h-6! text-yellow-uika"/>
                                        </Button>
                                    </Link>
                                    <Link to="">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="cursor-pointer"
                                        >
                                            <IoIosArrowDown className="w-6! h-6! text-yellow-uika"/>
                                        </Button>
                                    </Link>
                                    <Link to="">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="cursor-pointer"
                                        >
                                            <FaPlus className="w-5! h-5! text-green-500"/>
                                        </Button>
                                    </Link>
                                    <Link to="">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="cursor-pointer"
                                        >
                                            <IoEyeOutline className="w-5! h-5! text-[#26A1F4]"/>
                                        </Button>
                                    </Link>
                                    <Button size="icon" variant="ghost" className="cursor-pointer">
                                        <FaRegTrashAlt className="text-red-500"/>
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

export default JabatanStruktural;
