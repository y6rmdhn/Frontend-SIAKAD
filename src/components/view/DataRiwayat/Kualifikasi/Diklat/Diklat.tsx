import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
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
import { FaPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import InfoList from "@/components/blocks/InfoList";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";
import SearchInput from "@/components/blocks/SearchInput";

const Diklat = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Riwayat Diklat" subTitle="Daftar Riwayat Diklat" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kualifikasi/detail-diklat">
              <Button className="bg-yellow-uika hover:bg-hover-yellow-uika">
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

      <div className="gap-5 flex flex-col md:flex-row mt-5">
        <SelectFilter
          classname="w-full md:w-32 "
          options={unitKerjaOptions}
          placeholder="--Semua--"
        />
        <SearchInput />
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#E7ECF2] ">
            <TableHead className="text-center text-black">
              Nama Diklat
            </TableHead>
            <TableHead className="text-center text-black">
              Jenis Diklat
            </TableHead>
            <TableHead className="text-center text-black">
              Penyelenggara
            </TableHead>
            <TableHead className="text-center text-black">Tahun</TableHead>
            <TableHead className="text-center text-black">
              Tgl Diajukan
            </TableHead>
            <TableHead className="text-center text-black">
              Status Pengajuan
            </TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-[#E7ECF2]">
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

export default Diklat;
