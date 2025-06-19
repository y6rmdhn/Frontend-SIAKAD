import CustomCard from "@/components/blocks/Card";
import InfoList from "@/components/blocks/InfoList";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
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
import unitKerjaOptions from "@/constant/dummyFilter";
import { FaPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {DummyDataDosen} from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";

const Homebase = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Homebase" subTitle="Daftar Homebase" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Button className="bg-[#FDA31A] text-xs md:text-sm">
              <FaPlus className="w-3! h-3! md:w-4! md:h-4! " /> Tambah Baru
            </Button>
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
      <div className="lg:gap-5 gap-2 flex flex-col md:flex-row mt-5">
        <SelectFilter classname="md:w-32" options={unitKerjaOptions} />
        <SearchInput />
      </div>

      <Table className="mt-10 table-auto text-xs md:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-300 ">
            <TableHead className="text-center text-black">TMT Tugas</TableHead>
            <TableHead className="text-center text-black">Homebase</TableHead>
            <TableHead className="text-center text-black">File Sk</TableHead>
            <TableHead className="text-center text-black">
              Tgl Disetujui
            </TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
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

export default Homebase;
