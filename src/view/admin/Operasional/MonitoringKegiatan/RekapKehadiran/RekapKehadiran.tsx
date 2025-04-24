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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { FiSearch } from "react-icons/fi";

const RekapKehadiran = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">Monitoring Kegiatan</h1>
      <CustomCard
        actions={
          <div className="grid grid-cols-2 grid-flow-col gap-10">
            <div className="flex gap-5">
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
            <div className="flex gap-5">
              <Label className="w-full text-[#FDA31A]">Tanggal Akhir</Label>
              <Input type="date" />
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
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center">NIP</TableHead>
            <TableHead className="text-center">Nama Pegawai</TableHead>
            <TableHead className="text-center">Jam Masuk</TableHead>
            <TableHead className="text-center">Jam Keluar</TableHead>
            <TableHead className="text-center max-w-40">
              Rencana Pekerjaan
            </TableHead>
            <TableHead className="text-center max-w-40">
              Realisasi Pekerjaan
            </TableHead>
            <TableHead className="text-center">File</TableHead>
            <TableHead className="text-center">Foto Masuk</TableHead>
            <TableHead className="text-center">Foto Keluar</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Valid?</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center align-top">0306077701</TableCell>
            <TableCell className="text-center align-top">
              A HERI ISWANTO
            </TableCell>
            <TableCell className="whitespace-normal break-words max-w-20 align-top">
              06:47 Anda Berada di [Area Kampus UIKA]
            </TableCell>
            <TableCell className="whitespace-normal break-words max-w-20 align-top">
              16:00:17 Anda Berada di [Area Kampus UIKA]
            </TableCell>
            <TableCell className="whitespace-normal break-words max-w-40 align-top">
              Membersihkan lobi membersihkan lorong lantai 1 Membersihkan ruang
              kantor Membersihkan ruang dosen Membersihkan kamar kecil dosen dan
              mahasiswa
            </TableCell>
            <TableCell className="whitespace-normal break-words max-w-40 align-top">
              Membersihkan lobi membersihkan lorong lantai 1 Membersihkan ruang
              kantor Membersihkan ruang dosen Membersihkan kamar kecil dosen dan
              mahasiswa
            </TableCell>
            <TableCell className="h-full align-top text-center">-</TableCell>
            <TableCell className="h-full align-top text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-500 cursor-pointer"
                  >
                    Lihat
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
            <TableCell className="h-full align-top text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-500 cursor-pointer"
                  >
                    Lihat
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
            <TableCell className="h-full align-top text-center">-</TableCell>
            <TableCell className="h-full align-top text-red-500 text-center">
              x
            </TableCell>
            <TableCell className="h-full align-top text-center">-</TableCell>
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

export default RekapKehadiran;
