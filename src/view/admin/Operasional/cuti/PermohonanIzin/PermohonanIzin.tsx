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
import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const PermohonanIzin = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">
        Validasi Pengajuan Cuti{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          Daftar Pengajuan Cuti
        </span>
      </h1>

      <CustomCard
        actions={
          <div className="grid grid-rows-2 grid-flow-col gap-10">
            <div className="flex">
              <Label className="w-full text-[#FDA31A]">Unit Kerja</Label>
              <Select>
                <SelectTrigger className="w-full">
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
            <div className="flex">
              <Label className="w-full text-[#FDA31A]">Status</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Diajukan" />
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
            <div className="flex">
              <Label className="w-full text-[#FDA31A]">Periode Cuti</Label>
              <Select>
                <SelectTrigger className="w-full">
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

      <div className="flex justify-between mt-6">
        <div className="w-full flex gap-3">
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
            <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
            <Input placeholder="Search" className="w-80 pr-8" />
          </div>
        </div>

        <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
          Batalkkan
        </Button>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center">NIP</TableHead>
            <TableHead className="text-center">Nama Pegawai</TableHead>
            <TableHead className="text-center">Unit Kerja</TableHead>
            <TableHead className="text-center">Sisa Cuti</TableHead>
            <TableHead className="text-center">Cuti Dipakai</TableHead>
            <TableHead className="text-center">Jumlah Cuti</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center">
              <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
            </TableCell>
            <TableCell className="text-center">0002065901</TableCell>
            <TableCell className="text-center">
              Prof.Dr.Hj.Indupurnahayu,Dra.,Ak.,MM.,CA.
            </TableCell>
            <TableCell className="text-center">Sekolah Pascasarjana</TableCell>
            <TableCell className="text-center">0</TableCell>
            <TableCell className="text-center">0</TableCell>
            <TableCell className="text-center">0</TableCell>
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

export default PermohonanIzin;
