import React from "react";
import CustomCard from "@/components/commons/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { HiMiniTrash } from "react-icons/hi2";

const Berita = () => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-normal">
        Berita{" "}
        <span className="text-[16px] text-muted-foreground font-normal">
          Daftar Berita
        </span>
      </h1>

      <CustomCard
        actions={
          <div className="flex">
            <Label className=" text-[#FDA31A] pr-30">Unit Kerja</Label>
            <Select>
              <SelectTrigger className="w-64">
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
        }
      />

      <CustomCard
        cardStyle="border-t-[#87E39B]"
        actions={
          <div>
            <div className="flex justify-between">
              <div className="flex gap-2">
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
                  <Input placeholder="Cari Berita" className="w-80 pr-8" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-[#87E39B] text-white">
                  <IoAdd />
                  Tambah
                </Button>
                <Button className="bg-[#FDA31A] text-white">
                  <HiMiniTrash />
                  Hapus
                </Button>
              </div>
            </div>

            <Table className="mt-10 table-auto">
              <TableHeader>
                <TableRow className="bg-[#002E5A] ">
                  <TableHead className="text-center text-white"></TableHead>
                  <TableHead className="text-center text-white">
                    Unit Kerja
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Judul
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Tgl.Posting
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Tgl.Expired
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Prioritas
                  </TableHead>
                  <TableHead className="text-center text-white">Aksi</TableHead>
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
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full"></div>
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
        }
      />
    </div>
  );
};

export default Berita;
