import CustomCard from "@/components/commons/card";
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
import React from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";

const InputKehadiran = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">Input Presensi</h1>
      <CustomCard
        actions={
          <div className="grid grid-rows-2 grid-flow-col gap-6">
            <div className="w-full flex">
              <Label className="w-full text-[#FDA31A]">Unit Kerja</Label>
              <Select>
                <SelectTrigger className="w-full">
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

            <div className="flex">
              <Label className="w-full text-[#FDA31A]">Tanggal</Label>
              <Input type="date" />
            </div>

            <div className="flex">
              <Label className="w-full text-[#FDA31A]">Tanggal</Label>
              <Select>
                <SelectTrigger className="w-full">
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

        <div>
          <div className="flex gap-4">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
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
            <TableHead className="text-center">NIP</TableHead>
            <TableHead className="text-center">Pegawai</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Jam Datang</TableHead>
            <TableHead className="text-center">Jam Pulang</TableHead>
            <TableHead className="text-center">Keterangan</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center">0022096201</TableCell>
            <TableCell className="text-center">
              Hj. PRIHATINI PURWANINGSIH, SH., M.H.
            </TableCell>
            <TableCell className="text-center">Hadir</TableCell>
            <TableCell className="text-center">11.00</TableCell>
            <TableCell className="text-center">16.01</TableCell>
            <TableCell className="text-center">-</TableCell>
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
