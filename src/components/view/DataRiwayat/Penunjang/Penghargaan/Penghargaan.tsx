import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InfoList from "@/components/blocks/InfoList";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {DummyDataDosen} from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";

const Penghargaan = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Penghargaan" subTitle="Daftar Penghargaan" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/penunjang/detail-penghargaan">
              <Button className="bg-yellow-uika hover:bg-hover-yellow-uika w-full sm:auto">
                <FaPlus /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />
        <InfoList
            items={[
                { label: "NIP", value: DummyDataDosen.pegawai_info.nip },
                { label: "Nama", value: DummyDataDosen.pegawai_info.nama },
                { label: "Unit Kerja", value: DummyDataDosen.pegawai_info.unit_kerja },
                { label: "Status", value: DummyDataDosen.pegawai_info.status },
                { label: "Jab. Akademik", value: DummyDataDosen.pegawai_info.jab_akademik },
                { label: "Jab. Fungsional", value: DummyDataDosen.pegawai_info.jab_fungsional },
                { label: "Jab. Struktural", value: DummyDataDosen.pegawai_info.jab_struktural },
                { label: "Pendidikan", value: DummyDataDosen.pegawai_info.pendidikan },
            ]}
        />
      <div className="gap-5 w-full flex flex-col sm:flex-row mt-5">
        <Select>
          <SelectTrigger className="w-full sm:w-32">
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

        <div className="w-full sm:w-90 relative">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
          <Input placeholder="Search" className="w-full sm:w-90 pr-8" />
        </div>
      </div>
      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-300 ">
            <TableHead className="text-center text-black text-xs sm:text-sm">No</TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">Nama Penghargaan</TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">Instansi</TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">Tgl. Sinkron</TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">Status Pengajuan</TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Link to="/data-riwayat/penunjang/detail-data-penghargaan">
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

export default Penghargaan;
