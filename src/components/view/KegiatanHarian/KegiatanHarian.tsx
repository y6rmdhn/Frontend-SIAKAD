import CustomCard from "@/components/blocks/Card";
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
import { IoEyeOutline } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";

const KegiatanHarian = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal ">Kegiatan Harian</h1>
      <CustomCard
        actions={
          <div className="grid md:grid-rows-1 md:grid-flow-col grid-rows-2 gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Label className="w-full text-[#FDA31A]">Bulan</Label>
              <SelectFilter
                placeholder="Maret"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Label className="w-full text-[#FDA31A]">Tahun</Label>
              <SelectFilter
                placeholder="2025"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
          </div>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full">
        <SelectFilter
          placeholder="--Semua--"
          classname="w-full sm:w-32"
          options={[
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
            { label: "Guest", value: "guest" },
          ]}
        />

        <SearchInput />
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
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
              <div className="flex justify-center items-center w-full h-full">
                {/* <Link to="/admin/operasional/kompensasi/detail-dokumen-internal"> */}
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                </Button>
                {/* </Link> */}
                {/* <Link to="/admin/operasional/kompensasi/detail-dokumen-internal"> */}
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <IoIosDocument className="w-5! h-5! text-[#26A1F4]" />
                </Button>
                {/* </Link> */}
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

export default KegiatanHarian;
