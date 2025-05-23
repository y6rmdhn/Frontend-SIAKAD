import CustomCard from "@/components/blocks/Card";
import MonitoringInput from "@/components/blocks/MonitoringInput";
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
      <h1 className="text-lg sm:text-2xl font-normal">
        Monitoring{" "}
        <span className="text-muted-foreground text-[12px] sm:text-[16px] font-normal">
          hubungan kerja
        </span>
      </h1>

      <CustomCard>
        <MonitoringInput />
      </CustomCard>

      <div className="grid grid-rows-2 sm:flex gap-4 w-full mt-5">
        <Select>
          <SelectTrigger className="w-70 sm:w-32">
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

        <div className="relative w-70 sm:w-80">
          <Input
            placeholder="Search"
            className="w-full pr-10"
          />
          <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2" />
        </div>
      </div>

      <Table className="mt-3 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center text-xs sm:text-sm">Pegawai</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Hubungan Kerja</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Fungsional</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Usia Pensiun</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Tgl Lahir</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Tgl Efektif</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Tgl Berakhir</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center flex flex-col text-xs sm:text-sm">
              <span className="text-green-light-uika">0006027004</span>
              Dr. KURMATI, S.pd., M.Si.Pendidikan Matematika
            </TableCell>
            <TableCell className="text-center text-xs sm:text-sm">PNS/DPK</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">Guru Besar</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">70</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">2 Jun 1969</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">1 Feb 2023</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">-</TableCell>
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
            <TableCell className="text-center text-xs sm:text-sm">PNS/DPK</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">Guru Besar</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">70</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">2 Jun 1969</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">1 Feb 2023</TableCell>
            <TableCell className="text-center text-xs sm:text-sm">-</TableCell>
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
