import CustomCard from "@/components/blocks/Card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
import { IoAdd } from "react-icons/io5";
import { HiMiniTrash } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";

const DokumenInternal = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Dokumen Internal" subTitle="Daftar Dokumen Internal" />

      <CustomCard
        actions={
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Jenis Dokumen
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="-Semua Jenis Dokumen-"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Status Dokumen
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="-Semua Jenis Dokumen-"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Menu Referensi
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="-Semua Jenis Dokumen-"
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

      <CustomCard
        cardStyle="border-t-[#87E39B]"
        actions={
          <div className="">
            <div className="flex flex-col min-[864px]:flex-row justify-between gap-5 mb-5">
              <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto order-2 md:order-1">
                <SelectFilter
                  classname="w-full md:w-30"
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "User", value: "user" },
                    { label: "Guest", value: "guest" },
                  ]}
                />
                <SearchInput placeholder="Cari Dokumen Internal" />
              </div>

              <div className="flex flex-col md:flex-row w-full md:w-auto gap-2 order-1 md:order-2">
                <Link
                  className="w-full md:w-auto"
                  to="/operasional/detail-dokumen-internal"
                >
                  <Button className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika">
                    <IoAdd />
                    Tambah
                  </Button>
                </Link>
                <Button className="bg-[#FDA31A] text-white cursor-pointer">
                  <HiMiniTrash />
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        }
      >
        <Table className="table-auto text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-[#002E5A] ">
              <TableHead className="text-center text-white border-1">
                Di unggah oleh
              </TableHead>
              <TableHead className="text-center text-white border-1">
                No. Dokumen
              </TableHead>
              <TableHead className="text-center text-white border-1">
                Nama Dokumen
              </TableHead>
              <TableHead className="text-center text-white border-1">
                Jenis Dokumen
              </TableHead>
              <TableHead className="text-center text-white border-1">
                Menu Referensi
              </TableHead>
              <TableHead className="text-center text-white border-1">
                File
              </TableHead>
              <TableHead className="text-center text-white border-1">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-200">
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Link to="/operasional/detail-data-dokumen-internal">
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

        <div className="flex justify-between mt-8">
          <SelectFilter
            classname="w-32"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
              { label: "Guest", value: "guest" },
            ]}
          />

          <Pagination className="flex justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CustomCard>
    </div>
  );
};

export default DokumenInternal;
