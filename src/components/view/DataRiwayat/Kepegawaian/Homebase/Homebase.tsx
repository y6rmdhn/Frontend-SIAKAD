import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
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
import React from "react";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Homebase = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Homebase" subTitle="Daftar Homebase" />
      <CustomCard
        actions={
          <div className="flex justify-end ">
            {" "}
            <Button className="bg-[#FDA31A] text-xs md:text-sm">
              <FaPlus className="w-3! h-3! md:w-4! md:h-4! " /> Tambah Baru{" "}
            </Button>{" "}
          </div>
        }
      />
      <div className="w-full grid grid-cols-2 gap-96 mt-10 bg-[#D6E8F9] p-4 ">
        <div className="flex flex-col gap-2 text-[#2572BE]">
          <p>NIP</p>
          <p>Nama</p>
          <p>Unit Kerja</p>
          <p>Status</p>
        </div>
        <div className="flex flex-col gap-2 text-[#2572BE]">
          <p>Jab. Akademik</p>
          <p>Jab. Fungsional</p>
          <p>Jab. Struktural</p>
          <p>Pendidikan</p>
        </div>
      </div>
      <div className="gap-5 flex mt-5">
        <Select>
          <SelectTrigger className="w-16 md:w-32">
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
          <Input placeholder="Search" className="w-40 md:w-80 pr-8" />
        </div>
      </div>
      <Table className="mt-10 table-auto text-xs md:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-300 ">
            <TableHead className="text-center text-black">TMT Tugas</TableHead>
            <TableHead className="text-center text-black">Homebase</TableHead>
            <TableHead className="text-center text-black">File Sk</TableHead>
            <TableHead className="text-center text-black">
              Tgl Disetujui
            </TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
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

export default Homebase;
