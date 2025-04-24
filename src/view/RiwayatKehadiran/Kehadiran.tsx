import CustomCard from "@/components/commons/card";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { IoIosDocument } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Kehadiran = () => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl  font-normal">
        Riwayat{" "}
        <span className="text-[16px] text-muted-foreground">
          Presensi Pegawai
        </span>
      </h1>
      <CustomCard
        actions={
          <div className=" ">
            <div className="flex">
              <Label className=" text-[#FDA31A] pr-30">Tahun</Label>
              <Select>
                <SelectTrigger className="w-64">
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

            <Table className="mt-10 table-auto">
              <TableHeader>
                <TableRow className="bg-[#002E5A] ">
                  <TableHead className="text-center text-white"></TableHead>
                  <TableHead className="text-center text-white">NIP</TableHead>
                  <TableHead className="text-center text-white">
                    Nama Pegawai
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Tugas Tambahan
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Perguruan Tinggi Penugasan
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Terhitung Mulai Tanggal
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Tgl Disetujui
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <Table className="mt-10 table-auto">
                          <TableHeader>
                            <TableRow className="bg-[#002E5A] ">
                              <TableHead className="text-center text-white"></TableHead>
                              <TableHead className="text-center text-white">
                                NIP
                              </TableHead>
                              <TableHead className="text-center text-white">
                                Nama Pegawai
                              </TableHead>
                              <TableHead className="text-center text-white">
                                Tugas Tambahan
                              </TableHead>
                              <TableHead className="text-center text-white">
                                Perguruan Tinggi Penugasan
                              </TableHead>
                              <TableHead className="text-center text-white">
                                Terhitung Mulai Tanggal
                              </TableHead>
                              <TableHead className="text-center text-white">
                                Tgl Disetujui
                              </TableHead>
                              <TableHead className="text-center text-white">
                                Aksi
                              </TableHead>
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
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <IoIosDocument className="w-5! h-5! text-[#26A1F4]" />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="h-full align-top text-center"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        }
      />
    </div>
  );
};

export default Kehadiran;
