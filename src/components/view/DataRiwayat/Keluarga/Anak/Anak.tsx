import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Label } from "@/components/ui/label";
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
import { FaSquareFull } from "react-icons/fa";
import { HiMiniTrash } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import InfoList from "@/components/blocks/InfoList";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";

const Anak = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Anak" subTitle="Daftar Anak" />
      <CustomCard
        actions={
          <div className="h-0 flex justify-end">
            <Link to="/data-riwayat/keluarga/detail-anak">
              <Button className="bg-yellow-uika text-xs md:text-auto hover:bg-hover-yellow-uika">
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

      <CustomCard
        actions={
          <div className="flex flex-col md:flex-row gap-4">
            <Label className="text-[#FDA31A] md:pr-20">Status Pengajuan</Label>
            <SelectFilter
              classname="w-full md:w-64"
              placeholder="--Semua Pengajuan--"
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
                { label: "Guest", value: "guest" },
              ]}
            />
          </div>
        }
      />

      <div className="md:gap-5 gap-2 flex mt-5 flex-col sm:flex-row ">
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
            <TableHead className="text-center text-white border">
              <FaSquareFull className="w-3 h-3" />
            </TableHead>
            <TableHead className="text-center text-white border">
              Nama Anak
            </TableHead>
            <TableHead className="text-center text-white border">
              Jenis Kelamin
            </TableHead>
            <TableHead className="text-center text-white border">
              Tgl Lahir
            </TableHead>
            <TableHead className="text-center text-white border">
              Umur
            </TableHead>
            <TableHead className="text-center text-white border">
              Anak ke
            </TableHead>
            <TableHead className="text-center text-white border">
              Status Pengajuan
            </TableHead>
            <TableHead className="text-center text-white border">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-[#002E5A]">
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Link to="/data-riwayat/keluarga/detail-data-anak">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                  </Button>
                </Link>
                <Link to="">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <HiMiniTrash className="w-5! h-5! text-[#FDA31A]" />
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

export default Anak;
