import CustomCard from "@/components/blocks/Card";
import InfoList from "@/components/blocks/InfoList";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
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
import { FaPlus } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Izin = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Izin" subTitle="Daftar Permohonan Izin" />
      <CustomCard
        actions={
          <div className="flex justify-end ">
            <Button className="bg-[#FDA31A] text-xs md:text-sm">
              <FaPlus /> Tambah Baru
            </Button>
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
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Unit Kerja
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="2025"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Status
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="2025"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Jenis Izin
              </Label>
              <SelectFilter
                classname="w-full"
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

      <div className="flex mt-4 flex-col min-[864px]:flex-row justify-between gap-5 mb-5">
        <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto order-2 md:order-1">
          <SelectFilter
            classname="w-full md:w-30"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
              { label: "Guest", value: "guest" },
            ]}
          />
          <SearchInput placeholder="Cari Pengajuan Izin" />
        </div>
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#002E5A] ">
            <TableHead className="text-center text-white"></TableHead>
            <TableHead className="text-center text-white">No</TableHead>
            <TableHead className="text-center text-white">Tgl. Input</TableHead>
            <TableHead className="text-center text-white">Jenis Cuti</TableHead>
            <TableHead className="text-center text-white">Keperluan</TableHead>
            <TableHead className="text-center text-white">Lama Cuti</TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
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
