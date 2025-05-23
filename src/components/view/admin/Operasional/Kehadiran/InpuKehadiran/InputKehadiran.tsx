import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FiSearch } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { FaFileImport, FaPlus, FaRegTrashAlt } from "react-icons/fa";

const InputKehadiran = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">Input Presensi</h1>
      <CustomCard
        actions={
          <div className="grid grid-rows-3 md:grid-rows-2 grid-flow-col gap-6">
            <div className="w-full grid grid-rows-2 sm:flex">
              <Label className="w-full text-[#FDA31A]">Unit Kerja</Label>
              <Select>
                <SelectTrigger className="w-60 sm:w-full">
                  <SelectValue placeholder="--041001 Universitas Ibn Khaldun--" />
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

            <div className="grid grid-rows-2 sm:flex">
              <Label className="w-full text-[#FDA31A]">Tanggal</Label>
              <Input type="date" className="w-60 sm:w-full"/>
            </div>

            <div className="grid grid-rows-2 sm:flex">
              <Label className="w-full text-[#FDA31A]">Tanggal</Label>
              <Select>
                <SelectTrigger className="w-60 sm:w-full">
                  <SelectValue placeholder="--Semua Status Presensi--" />
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
      <div className="grid grid-rows-2 gap-4 lg:flex justify-between mt-6">
        <div className="w-full grid grid-rows-2 sm:flex gap-3">
          <Select>
            <SelectTrigger className="w-70 sm:w-28 lg:w-32">
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
            <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
            <Input placeholder="Search" className="w-70 sm:80 pr-8" />
          </div>
        </div>

        <div>
          <div className="flex gap-4">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-auto sm:w-28 lg:w-auto">
              <FaPlus /> Tambah
            </Button>

            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
              <FaFileImport /> Import
            </Button>
          </div>
        </div>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center text-xs sm:text-sm">NIP</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Pegawai</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Status</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Jam Datang</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Jam Pulang</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Keterangan</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center text-xs sm:text-sm">0022096201</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">
              Hj. PRIHATINI PURWANINGSIH, SH., M.H.
            </TableCell>
            <TableCell className="text-center text-xs sm:text-sm">Hadir</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">11.00</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">16.01</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">-</TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                </Button>

                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <FaRegTrashAlt className="text-red-500" />
                </Button>
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

export default InputKehadiran;
