import CustomCard from "@/components/blocks/Card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { IoAdd } from "react-icons/io5";
import { HiMiniTrash } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";

const Berita = () => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-normal">
        Berita{" "}
        <span className="text-[16px] text-muted-foreground font-normal">
          Daftar Berita
        </span>
      </h1>

      <CustomCard
        actions={
          <div className="flex flex-col md:flex-row justify-start gap-4">
            <Label className=" text-[#FDA31A] md:pr-30">Unit Kerja</Label>
            <SelectFilter
              placeholder="041001 - Universitas Ibn Khaldun"
              classname="w-full md:w-80"
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
                { label: "Guest", value: "guest" },
              ]}
            />
          </div>
        }
      />

      <CustomCard
        cardStyle="border-t-[#87E39B]"
        actions={
          <div>
            <div className="flex justify-between flex-col min-[870px]:flex-row gap-4">
              <div className="flex gap-2 order-2 w-full md:w-auto">
                <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
                  <SelectFilter
                    classname="w-full md:w-30"
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "User", value: "user" },
                      { label: "Guest", value: "guest" },
                    ]}
                  />

                  <SearchInput />
                </div>
              </div>

              <div className="flex gap-2 order-1 md:order-2 w-full md:w-auto">
                <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
                  <Link to="/operasional/tambah-berita">
                    <Button className="bg-[#87E39B] text-white">
                      <IoAdd />
                      Tambah
                    </Button>
                  </Link>
                  <Button className="bg-[#FDA31A] text-white">
                    <HiMiniTrash />
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Table className="mt-10 table-auto text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-[#002E5A] ">
              <TableHead className="text-center text-white"></TableHead>
              <TableHead className="text-center text-white">
                Unit Kerja
              </TableHead>
              <TableHead className="text-center text-white">Judul</TableHead>
              <TableHead className="text-center text-white">
                Tgl.Posting
              </TableHead>
              <TableHead className="text-center text-white">
                Tgl.Expired
              </TableHead>
              <TableHead className="text-center text-white">
                Prioritas
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
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Link to="/operasional/detail-berita">
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
      </CustomCard>
    </div>
  );
};

export default Berita;
