import React from "react";
import CustomCard from "@/components/blocks/Card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
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
import { IoEyeOutline } from "react-icons/io5";

const DokumenInternal = () => {
  return (
    <div className="mt-10">
      <h1 className="text-xl  font-bold">
        Dokumen Internal{" "}
        <span className="text-[13px] text-muted-foreground font-normal">
          Daftar Dokumen Internal
        </span>
      </h1>

      <CustomCard
        actions={
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex gap-20">
                <Label className=" text-[#FDA31A] w-40">Jenis Dokumen</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="--Semua Jenis Dokumen--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Jenis Dokumen</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-20">
                <Label className=" text-[#FDA31A] w-40">Status Dokumen</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="--Semua Status Dokumen--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status Dokumen</SelectLabel>
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

            <div className="space-y-4">
              <div className="flex gap-20">
                <Label className=" text-[#FDA31A] w-40">Menu Referensi</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="--Semua Menu Referensi--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Menu Referensi</SelectLabel>
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
          </div>
        }
      />

      <CustomCard
        cardStyle="border-t-[#87E39B]"
        actions={
          <div className="">
            <div className="flex justify-between mb-5">
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
              <div className="flex gap-6">
                <div className="relative">
                  <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                  <Input
                    placeholder="Cari Dokumen Internal"
                    className="w-80 pr-8"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Link to="/operasional/detail-dokumen-internal">
                <Button className="bg-green-light-uika hover:bg-hover-green-uika">
                  <IoAdd />
                  Tambah
                </Button>
                </Link>
                <Link to="">
                <Button className="bg-[#FDA31A] text-white cursor-pointer">
                  <HiMiniTrash />
                  Hapus
                </Button>
                </Link>
              </div>
            </div>

            <Table className="mt-10 table-auto">
              <TableHeader>
                <TableRow className="bg-[#002E5A] ">
                  <TableHead className="text-center text-white border-1">
                    Di unggah oleh
                  </TableHead>
                  <TableHead className="text-center text-white border-1">
                    No. Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border-1">
                    Nama Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border-1">
                    Jenis Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border-1">
                    Menu Referensi
                  </TableHead>
                  <TableHead className="text-center text-white border-1">File</TableHead>
                  <TableHead className="text-center text-white border-1">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-200">
                <TableRow className=" even:bg-gray-100">
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

            <div className="flex justify-between mt-8">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="10 baris" />
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

              <Pagination className="mt-8 flex justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DokumenInternal;
