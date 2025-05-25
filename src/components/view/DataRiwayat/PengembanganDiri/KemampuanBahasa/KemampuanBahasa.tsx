import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InfoList from "@/components/blocks/InfoList";
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
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
const KemampuanBahasa = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Kemampuan Bahasa" subTitle="Daftar Kemampuan Bahasa" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/pengembangan-diri/detail-kemampuan-bahasa">
              <Button className="bg-yellow-uika hover:bg-hover-yellow-uika w-full sm:w-auto">
                <FaPlus /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />
      <InfoList
        items={[
          "NIP",
          "Nama",
          "Unit Kerja",
          "Status",
          "Jab. Akademik",
          "Jab. Fungsional",
          "Jab. Struktural",
          "Pendidikan",
        ]}
      />
      <div className="w-full flex flex-col sm:flex-row gap-5  mt-5">
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
          <FiSearch className="absolute top-1/2 -translate-y-1/2 right-9" />
          <FiRefreshCw className="absolute top-1/2 -translate-y-1/2 right-3" />
          <Input placeholder="Search" className="w-full sm:w-90 pr-8" />
        </div>
      </div>
      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-[#E7ECF2] ">
            <TableHead className="text-center text-black text-xs sm:text-sm">Tahun</TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">Bahasa</TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Nilai Mendengar
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Nilai Bicara
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Nilai Menulis
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Status Pengajuan
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-[#E7ECF2]">
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
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

export default KemampuanBahasa;
