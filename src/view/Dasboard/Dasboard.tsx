import CustomCard from "@/components/commons/card";
import { FaGraduationCap } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlinePersonRemove } from "react-icons/md";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";

const Dasboard = () => {
  const [aktifBtn, setAktifBtn] = useState("Fungsional");
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <CustomCard
        actions={
          <div className="flex gap-30">
            <Label className="text-[#FFAC07]">Unit Kerja</Label>
            <Select>
              <SelectTrigger className="w-96">
                <SelectValue placeholder="04101-Universitas Ibn Khaldun Bogor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Semua</SelectLabel>
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

      <div className="grid grid-cols-4 gap-10 mt-6">
        <div className="bg-[#28BCB7] h-40 rounded-md text-white flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
          <h1 className="text-[20px] font-semibold flex flex-col items-center">Jumlah Pegawai Aktif
          <p className="text-2xl font-semibold mt-3">611</p> </h1>
          <IoPersonOutline className="w-14 h-14 absolute bottom-0 left-1 " />
          </div>
          
        </div>
        <div className="bg-[#66D820] h-40 rounded-md text-white flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
          <h1 className="text-[20px] text-center font-semibold flex flex-col items-center">Jumlah Pegawai (Akademik)
          <p className="text-2xl font-semibold mt-1">655</p> </h1>
          <FaGraduationCap className="w-14 h-14 absolute bottom-0 left-1"/>
          </div>
          
        </div>
        <div className="bg-[#FFAC07] h-40 rounded-md text-white flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
          <h1 className="text-[20px] text-center font-semibold flex flex-col items-center">Jumlah Pegawai (Non Akademik)
          <p className="text-2xl font-semibold mt-1">319</p> </h1>
          <FaUserGroup className="w-14 h-14 absolute bottom-0 left-1"/>
          </div>
          
        </div>
        <div className="bg-[#D22D17] h-40 rounded-md text-white flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
          <h1 className="text-[20px] text-center font-semibold flex flex-col items-center">Jumlah Pegawai Tidak Aktif
          <p className="text-2xl font-semibold mt-1">373</p> </h1>
          <MdOutlinePersonRemove className="w-14 h-14 absolute bottom-0 left-1" />
          </div>
         
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <CustomCard>
          <h1>Statistik Kepegawaian</h1>
          <div className="flex gap-3">
            <Button onClick={() => setAktifBtn("Fungsional")} className={aktifBtn === "Fungsional" ? "bg-[#FFAC07]" : "bg-[#CDCDCD]"}>Fungsional</Button>
            <Button onClick={() => setAktifBtn("Hubungan Kerja")} className={aktifBtn === "Hubungan Kerja" ? "bg-[#FFAC07]" : "bg-[#CDCDCD]"}>Hubungan Kerja</Button>
            <Button onClick={() => setAktifBtn("Pendidikan")} className={aktifBtn === "Pendidikan" ? "bg-[#FFAC07]" : "bg-[#CDCDCD]"}>Pendidikan</Button>
          </div>
          {/* <Table className="mt-3 table-auto">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-center">Fungsional</TableHead>
                <TableHead className="text-center">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center flex flex-col">1</TableCell>
                <TableCell className="text-center">1</TableCell>
                <TableCell className="text-center">Guru Besar</TableCell>
              </TableRow>
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center flex flex-col">2</TableCell>
                <TableCell className="text-center">2</TableCell>
                <TableCell className="text-center">Guru Besar</TableCell>
              </TableRow>
            </TableBody>
          </Table> */}
          {aktifBtn === "Fungsional" ? <h1>Fungsional</h1> : aktifBtn === "Hubungan Kerja" ? <h1>Hubungan Kerja</h1> : <h1>Pendidikan</h1>}
        </CustomCard>
        <div className="flex flex-col gap-5">
          <CustomCard>
            <h1>Pemberitahuan</h1>
          </CustomCard>
          <CustomCard>
            <h1>Berita</h1>
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;

