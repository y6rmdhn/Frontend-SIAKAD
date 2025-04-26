import CustomCard from "@/components/commons/card";
import SearchInput from "@/components/commons/SearchInput";
import SelectFilter from "@/components/commons/SelectFilter";
import Title from "@/components/commons/Title";
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
import unitKerjaOptions from "@/constant/dummyFilter";
import React from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const JabatanFungsional = () => {
  return (
    <div className="mt-10">
      <Title title="Jabatan Fungsional" subTitle="Daftar Jabatan Fungsional" />
      <CustomCard
        actions={
          <div className="flex">
            <Label className="w-32 text-[#FDA31A]">Jabatan Fungsional</Label>
            <SelectFilter classname="ml-32 w-80" options={unitKerjaOptions} />
          </div>
        }
      />

      <div className="flex justify-between mt-6">
        <div className="flex gap-4">
          <SelectFilter options={unitKerjaOptions} />
          <SearchInput />
        </div>

        <div className="flex gap-3">
          <Link to="/admin/referensi/kepegawaian/jabatan-fungsional/detail-jabatan-fungsional">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
              <FaPlus /> Tambah
            </Button>
          </Link>
        </div>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center">Kode</TableHead>
            <TableHead className="text-center">Jabatan Fungsional</TableHead>
            <TableHead className="text-center">Golongan/Pangkat</TableHead>
            <TableHead className="text-center">Angka Kredit</TableHead>
            <TableHead className="text-center">Usia Pensiun</TableHead>
            <TableHead className="text-center">Referensi Sister</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center">
              <Checkbox />
            </TableCell>
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
                    <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                  </Button>
                </Link>
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

export default JabatanFungsional;
