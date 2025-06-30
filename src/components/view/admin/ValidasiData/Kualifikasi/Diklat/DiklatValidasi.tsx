import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const DiklatValidasi = () => {
    return (
        <div className="mt-10 mb-20">
            <Title title="Validasi" subTitle="Riwayat Diklat Pegawai" />

            <CustomCard
                actions={
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col min-[1258px]:flex-row gap-1 col-span-2 md:col-span-1">
                            <Label className="text-[#FDA31A] md:w-full text-xs md:text-sm">
                                Unit Kerja
                            </Label>
                            <SelectFilter
                                placeholder="041001 - Universitas Ibn Khaldun"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                            />
                        </div>
                        <div className="flex flex-col min-[1258px]:flex-row gap-1 col-span-2 md:col-span-1">
                            <Label className="text-[#FDA31A] md:w-full text-xs md:text-sm">
                                Status
                            </Label>
                            <SelectFilter
                                placeholder="Disetujui"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                            />
                        </div>
                        <div className="flex flex-col min-[1258px]:flex-row gap-1 col-span-2 md:col-span-1">
                            <Label className="text-[#FDA31A] md:w-full text-xs md:text-sm">
                                Jabatan Fungsional
                            </Label>
                            <SelectFilter
                                placeholder="-Semua Jabatan Fungsional-"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                            />
                        </div>
                    </div>
                }
            />

            <div className="flex flex-col min-[940px]:flex-row md:justify-between mt-10 gap-4">
                <div className="flex flex-col md:flex-row gap-2 lg:gap-4">
                    <SelectFilter classname="w-full md:w-32"
                        placeholder="--Semua--"
                        options={[
                            { label: "Admin", value: "admin" },
                            { label: "User", value: "user" },
                            { label: "Guest", value: "guest" },
                        ]}
                    />

                    <SearchInput placeholder="Cari Nama Pegawai"/>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:justify-end">
                    <Button
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <FaCheck className="mr-2" /> Approve
                    </Button>
                    <Button
                        variant="destructive"
                    >
                        <IoClose className="mr-2" /> Reject
                    </Button>
                    <Button
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        <MdPlayArrow className="mr-2" /> Draft
                    </Button>
                </div>
            </div>

            <Table className="mt-10 table-auto text-xs lg:text-sm">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="text-center">
                            <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
                        </TableHead>
                        <TableHead className="text-center">NIP</TableHead>
                        <TableHead className="text-center">Nama Pegawai</TableHead>
                        <TableHead className="text-center">Nama Diklat</TableHead>
                        <TableHead className="text-center">Jenis Diklat</TableHead>
                        <TableHead className="text-center">Penyelenggara</TableHead>
                        <TableHead className="text-center">Tahun</TableHead>
                        <TableHead className="text-center">Tangal Diajukan</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    <TableRow className=" even:bg-gray-100">
                        <TableCell className="text-center">
                            <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
                        </TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="h-full">
                            <div className="flex justify-center items-center w-full h-full">
                                <Link to="/admin/validasi-data/kualifikasi/diklat/detail-diklat">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="cursor-pointer"
                                    >
                                        <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                                    </Button>
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Pagination className="mt-8 flex justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default DiklatValidasi;
