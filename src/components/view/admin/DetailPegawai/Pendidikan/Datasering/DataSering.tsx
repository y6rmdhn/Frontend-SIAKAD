import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import DetailPegawai from "@/components/blocks/BiodataDetailPegawai/DetailPegawai";
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
import DetailPegawaiLayout from "@/layouts/DetailPegawaiLayout";
import { IoEyeOutline } from "react-icons/io5";
import {Link, useParams} from "react-router-dom";
import DetailPegawaiSidebar from "../../../../../blocks/PegawaiDetailSidebar/PegawaiDetailSidebar";
import accordionContent from "../../../../../../constant/arccodionContent/arccodionContent";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";
import SearchInput from "@/components/blocks/SearchInput";

const dummyLeftColumn = [
  { name: "Nama Lengkap" },
  { name: "NIP" },
  { name: "Tempat Lahir" },
  { name: "Tanggal Lahir" },
  { name: "Jenis Kelamin" },
  { name: "Agama" },
];

const dummyDatasLeft: (string | number)[] = [
  "Ahmad Subagja",
  "199001012020011001",
  "Bandung",
  "01 Januari 1990",
  "Laki-laki",
  "Islam",
];

const dummyRightColumn = [
  { name: "Jabatan" },
  { name: "Unit Kerja" },
  { name: "Status Pegawai" },
  { name: "Tanggal Pengangkatan" },
  { name: "Email Kantor" },
  { name: "Nomor Telepon" },
];

const dummyDatasRight: (string | number)[] = [
  "Staf Analis Data",
  "Divisi Teknologi Informasi",
  "Pegawai Tetap",
  "15 Maret 2020",
  "ahmad.s@kantor.go.id",
  "081234567890",
];

const Datasering = () => {

  const params = useParams()

  return (
    <DetailPegawaiLayout title="Datasering" subTitile="Daftar Datasering">
      {/*Sidebar*/}
      <DetailPegawaiSidebar currentPegawaiId={params.id} accordionData={accordionContent} />

      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 w-full">
          <DetailPegawai
            leftColumn={dummyLeftColumn}
            rightColumn={dummyRightColumn}
            datasLeft={dummyDatasLeft}
            datasRight={dummyDatasRight}
            classname="bg-[#F6FBFF] text-xs md:text-sm border-l-4 border-l-[#92D3FF]"
          />

          {/* Start (Ini di copy) */}
          <CustomCard
            actions={
              <div className="flex gap-4 flex-col md:flex-row">
                <Label className="md:pr-30 text-[#FDA31A]">
                  Status Pengajuan
                </Label>
                <SelectFilter
                  classname="w-full md:w-80"
                  options={unitKerjaOptions}
                  placeholder="--Semua Pengajuan--"
                />
              </div>
            }
          />
          {/* end (Ini di copy) */}

          {/* Start (Ini di copy) */}
          <div className="gap-5 flex flex-col md:flex-row">
            <SelectFilter
              classname="w-full md:w-32 "
              options={unitKerjaOptions}
              placeholder="--Semua--"
            />

            <SearchInput />
          </div>
          {/* end (Ini di copy) */}
        </div>

        <Table className="mt-10 table-auto border-separate border-spacing-x-[1px]">
          <TableHeader>
            <TableRow className="bg-[#004680]">
              <TableHead className="text-center text-white rounded-tl-lg">
                Perguruan Tinggi Sasaran
              </TableHead>
              <TableHead className="text-center text-white">
                Bidang Tugas
              </TableHead>
              <TableHead className="text-center text-white">
                Tanggal Mulai
              </TableHead>
              <TableHead className="text-center text-white">
                Status Pengajuan
              </TableHead>
              <TableHead className="text-center text-white rounded-tr-lg">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#E7ECF2]">
            <TableRow>
              <TableCell className="flex justify-items-center"></TableCell>
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
    </DetailPegawaiLayout>
  );
};

export default Datasering;
