import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FaPlus } from "react-icons/fa";
import { FaSquareFull } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiMiniTrash } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";

const Anak = () => {
    return (
        <div className="mt-10 mb-20">
            <Title title="Anak" subTitle="Daftar Anak" />
            <CustomCard
                actions={
                    <div className="h-0 flex justify-end">
                        <Link to="/data-riwayat/keluarga/detail-anak">
                            <Button className="bg-yellow-uika hover:bg-hover-yellow-uika">
                                <FaPlus /> Tambah Baru
                            </Button>
                        </Link>
                    </div>
                }
            />
            <div className="w-full border-l-2 border-[#6AAEF1] grid grid-cols-2 gap-96 mt-10 bg-[#D6E8F9] p-4 ">
                <div className="flex flex-col gap-2 text-[#2572BE] font-semibold">
                    <p>NIP</p>
                    <p>Nama</p>
                    <p>Unit Kerja</p>
                    <p>Status</p>
                </div>
                <div className="flex flex-col gap-2 text-[#2572BE] font-semibold">
                    <p>Jab. Akademik</p>
                    <p>Jab. Fungsional</p>
                    <p>Jab. Struktural</p>
                    <p>Pendidikan</p>
                </div>
            </div>

            <CustomCard
                actions={
                    <div className="items-center h-0 flex gap-20">
                        <Label className=" text-[#FDA31A]">Status Pengajuan</Label>
                        <Select>
                            <SelectTrigger className="w-64">
                                <SelectValue placeholder="- - Semua Pengajuan - -" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Pengajuan</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                }
            />

            <div className="gap-5 flex mt-5">
                <Select>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="--Semua--" />
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

                <div className="relative">
                    <FiSearch className="absolute top-1/2 -translate-y-1/2 right-9" />
                    <FiRefreshCw className="absolute top-1/2 -translate-y-1/2 right-3" />
                    <Input placeholder="Search" className="w-80 pr-8" />
                </div>
            </div>
            <Table className="mt-10 table-auto">
                <TableHeader>
                    <TableRow className="bg-[#002E5A] ">
                        <TableHead className="text-center text-white border"><FaSquareFull className="w-3 h-3" /></TableHead>
                        <TableHead className="text-center text-white border">Nama Anak</TableHead>
                        <TableHead className="text-center text-white border">Jenis Kelamin</TableHead>
                        <TableHead className="text-center text-white border">Tgl Lahir</TableHead>
                        <TableHead className="text-center text-white border">Umur</TableHead>
                        <TableHead className="text-center text-white border">Anak ke</TableHead>
                        <TableHead className="text-center text-white border">Status Pengajuan</TableHead>
                        <TableHead className="text-center text-white border">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    <TableRow className=" even:bg-[#002E5A]">
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="h-full">
                            <div className="flex justify-center items-center w-full h-full">
                                <Link to="">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="cursor-pointer"
                                    >
                                        <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                                    </Button>
                                </Link>
                                <Link to="">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="cursor-pointer"
                                    >
                                        <HiMiniTrash className="w-5! h-5! text-[#FDA31A]" />
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

export default Anak;

