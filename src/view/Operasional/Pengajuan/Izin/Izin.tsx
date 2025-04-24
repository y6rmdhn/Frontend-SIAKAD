import CustomCard from "@/components/commons/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosDocument } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Izin = () => {
  return (
    <div className=' mt-10'>
        <h1 className='text-2xl font-normal '>Izin{' '}
          <span className='text-muted-foreground font-normal text-[16px]'>Daftar Permohonan Izin</span>
        </h1>
        <CustomCard actions={
          <div className='flex justify-end '> <Button className='bg-[#FDA31A]' ><FaPlus/> Tambah Baru </Button> </div>
        }/>
        <div className='w-full grid grid-cols-2 gap-96 mt-10 bg-[#D6E8F9] p-4 '>
         <div className='flex flex-col gap-2 text-[#2572BE]'>
          <p>NIP</p>
          <p>Nama</p>
          <p>Unit Kerja</p>
          <p>Status</p>
           </div>
           <div className='flex flex-col gap-2 text-[#2572BE]'>
          <p>Jab. Akademik</p>
          <p>Jab. Fungsional</p>
          <p>Jab. Struktural</p>
          <p>Pendidikan</p>
           </div>
           </div>
           <CustomCard
        actions={
          <div className=" grid grid-rows-2 grid-flow-col gap-4">
            <div className="flex">
              <Label className=" text-[#FDA31A] w-full">Unit Kerja</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="2025" />
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
              <Label className=" text-[#FDA31A] w-full">Status</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="2025" />
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
              <Label className=" text-[#FDA31A] w-full">Jenis Izin</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="2025" />
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
        <div className="gap-5 flex mt-5">
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
              <Input placeholder="Cari Pengajuan Izin" className="w-80 pr-8" />
            </div>
          </div>
          <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-[#002E5A] ">
            <TableHead className="text-center text-white"></TableHead>
            <TableHead className="text-center text-white">No</TableHead>
            <TableHead className="text-center text-white">
              Tgl. Input
            </TableHead>
            <TableHead className="text-center text-white">
              Jenis Cuti
            </TableHead>
            <TableHead className="text-center text-white">
               Keperluan
            </TableHead>
            <TableHead className="text-center text-white">
              Lama Cuti
            </TableHead>
            <TableHead className="text-center text-white">
              Status
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
                <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoIosDocument className="w-5! h-5! text-[#26A1F4]" />
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

export default Izin;
