import CustomCard from "@/components/commons/card";
import MonitoringInput from "@/components/commons/monitoringInput";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
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
import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";

const HubunganKerjaPegawai = () => {
  return (
    <div className="mt-10 mb-10">
      <h1 className="text-2xl font-semibold">
        Monitoring{" "}
        <span className="text-muted-foreground text-[16px] font-normal">
          hubungan kerja
        </span>
      </h1>

      <CustomCard>
        <MonitoringInput />
      </CustomCard>

      <div className="flex gap-4 w-full mt-5">
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

      <Table className="mt-3 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center">Pegawai</TableHead>
            <TableHead className="text-center">Hubungan Kerja</TableHead>
            <TableHead className="text-center">Fungsional</TableHead>
            <TableHead className="text-center">Usia Pensiun</TableHead>
            <TableHead className="text-center">Tgl Lahir</TableHead>
            <TableHead className="text-center">Tgl Efektif</TableHead>
            <TableHead className="text-center">Tgl Berakhir</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center flex flex-col">
              <span className="text-green-light-uika">0006027004</span>
              Dr. KURMATI, S.pd., M.Si.Pendidikan Matematika
            </TableCell>
            <TableCell className="text-center">PNS/DPK</TableCell>
            <TableCell className="text-center">Guru Besar</TableCell>
            <TableCell className="text-center">70</TableCell>
            <TableCell className="text-center">2 Jun 1969</TableCell>
            <TableCell className="text-center">1 Feb 2023</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center flex flex-col">
              <span className="text-green-light-uika">0006027004</span>
              Dr. KURMATI, S.pd., M.Si.Pendidikan Matematika
            </TableCell>
            <TableCell className="text-center">PNS/DPK</TableCell>
            <TableCell className="text-center">Guru Besar</TableCell>
            <TableCell className="text-center">70</TableCell>
            <TableCell className="text-center">2 Jun 1969</TableCell>
            <TableCell className="text-center">1 Feb 2023</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
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

export default HubunganKerjaPegawai;
