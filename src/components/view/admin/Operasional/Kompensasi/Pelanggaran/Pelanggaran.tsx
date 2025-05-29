import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const Pelanggaran = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">
        Riwayat Pelanggaran{" "}
        <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Daftar Pelanggaran
        </span>
      </h1>

      <CustomCard
        actions={
          <div className="grid grid-rows-3 lg:grid-rows-2 grid-flow-col gap-5 lg:gap-10">
            <div className="flex flex-col sm:flex-row">
              <Label className="w-full text-[#FDA31A]">Unit Kerja</Label>
              <Select>
                <SelectTrigger className="text-xs sm:text-sm w-full">
                  <SelectValue placeholder="041001 - Universitas Ibn Khaldun" />
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
                <SelectTrigger className="text-xs sm:text-sm w-full">
                  <SelectValue placeholder="--Semua Jenis Pelanggaran--" />
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
                <SelectTrigger className="text-xs sm:text-sm w-full">
                  <SelectValue placeholder="--Semua Jabatan Fungsional--" />
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
          </div>

          <div className="w-full relative lg:w-90">
            <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
            <Input placeholder="Search" className="w-full pr-8 lg:w-90 text-xs sm:text-sm" />
          </div>
        </div>

        <div className="w-full grid sm:grid-cols-2 gap-4 mt-4 lg:mt-0 lg:flex lg:w-auto">
          <div className="w-full lg:w-auto">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full lg:w-auto text-xs sm:text-sm">
              <FaPlus /> Tambah
            </Button>
          </div>

          <div className="w-full lg:w-auto">
            <Button variant="destructive" className="cursor-pointer w-full lg:w-auto text-xs sm:text-sm">
              <FaRegTrashAlt /> Hapus
            </Button>
          </div>
        </div>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Nama Pegawai</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Tanggal Pelanggaran</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Jenis Pelanggaran</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center">
              <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
            </TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                </Button>

                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <MdEdit className="w-5! h-5! text-[#26A1F4]" />
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

export default Pelanggaran;
