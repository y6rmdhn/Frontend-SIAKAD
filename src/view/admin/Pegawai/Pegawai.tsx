import FilterPegawai from "@/components/commons/FilterPegawai";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaSyncAlt } from "react-icons/fa";
import Status from "@/components/commons/Status";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomCard from "@/components/commons/card";

const Pegawai = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl font-normal">Pegawai</h1>
      <CustomCard title="Filter">
        <FilterPegawai />
      </CustomCard>

      <div className="mt-14 flex gap-10">
        <div className="flex gap-5">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="-- Semua --" />
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

          <div className="relative">
            <Input placeholder="Search" className="w-2xs pr-8" />
            <FiSearch className="absolute -translate-y-1/2 top-1/2 right-2" />
          </div>
        </div>

        <div className="flex gap-2">
          <Link to="/admin/pegawai/data-pegawai">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
              <FaPlus /> Tambah
            </Button>
          </Link>

          <Button variant="destructive" className="cursor-pointer">
            <FaRegTrashAlt /> Hapus
          </Button>

          <Select>
            <SelectTrigger className="w-60 pl-9 relative">
              <SelectValue className="text-white" placeholder="Sister" />
              <FaSyncAlt className="absolute -translate-y-1/2 top-1/2 left-3" />
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

          <Button className="cursor-pointer min-w-52 bg-green-light-uika flex justify-start items-center hover:bg-[#329C59]">
            {" "}
            <FaCheck /> Set Status
          </Button>
        </div>
      </div>

      <Table className="mt-3 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center">NIP</TableHead>
            <TableHead className="text-center">NIDN</TableHead>
            <TableHead className="text-center">Nama Pegawai</TableHead>
            <TableHead className="text-center">Uni Kerja</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Terhubung Sister</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="font-medium">
              <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
            </TableCell>
            <TableCell className="text-center">0001016434</TableCell>
            <TableCell className="text-center">0001016434</TableCell>
            <TableCell className="text-center">
              Prof.Dr.Hj. Indupumahayu,Dra.,Ak,MM.,CA.
            </TableCell>
            <TableCell className="text-center">Ekonomi Syariah (S3)</TableCell>
            <TableCell className="text-center">AA</TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center h-full">
                <FaCheck className="text-green-light-uika" />
              </div>
            </TableCell>
            <TableCell className="text-center w-28">
              <div className="flex">
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                </Button>
                <Button
                  onClick={() =>
                    navigate(
                      "/admin/detail-pegawai/biodata/" + params.pegawaiID
                    )
                  }
                  size="icon"
                  variant="ghost"
                  className="cursor-pointer"
                >
                  <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                </Button>
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <FaRegTrashAlt className="text-red-500" />
                </Button>
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

      <Status />
    </div>
  );
};

export default Pegawai;
