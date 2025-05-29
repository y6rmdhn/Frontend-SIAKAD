import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaCheck, FaFileImport } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

const MonitoringSisaCuti = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">
        Sisa Cuti Pegawai{" "}
        <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Daftar Sisa Cuti Pegawai
        </span>
      </h1>

      <CustomCard
        actions={
          <div className="grid grid-rows-3 lg:grid-rows-2 grid-flow-col gap-5 lg:gap-10">
            <div className="grid grid-rows-2 sm:flex">
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
            <div className="grid grid-rows-2 sm:flex">
              <Label className="w-full text-[#FDA31A]">Cuti Tahunan</Label>
              <Select>
                <SelectTrigger className="text-xs sm:text-sm w-full">
                  <SelectValue placeholder="Cuti Tahunan" />
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
              <Label className="w-full text-[#FDA31A]">Periode Cuti</Label>
              <Select>
                <SelectTrigger className="text-xs sm:text-sm w-full">
                  <SelectValue placeholder="Cuti Tahunan" />
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
              <FaFileImport /> Import
            </Button>
          </div>

          <div className="w-full lg:w-auto">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full lg:w-auto text-xs sm:text-sm">
              <FaCheck className="w-4 h-4" /> Generate Jatah Cuti Tahunan
            </Button>
          </div>
        </div>
      </div>




      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center text-xs sm:text-sm">NIP</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Nama Pegawai</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Unit Kerja</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Sisa Cuti</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Cuti Dipakai</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Jumlah Cuti</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center text-xs sm:text-sm">0002065901</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">
              Prof.Dr.Hj.Indupurnahayu,Dra.,Ak.,MM.,CA.
            </TableCell>
            <TableCell className="text-center text-xs sm:text-sm">Sekolah Pascasarjana</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">0</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">0</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">0</TableCell>
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

export default MonitoringSisaCuti;
