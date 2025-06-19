import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import InfoList from "@/components/blocks/InfoList";
import Title from "@/components/blocks/Title";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { DummyDataDosen } from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";

const Cuti = () => {
    return (
        <div className="mt-10 mb-20">
            <Title title="Cuti" subTitle="Daftar Pengajuan Cuti" />

            <CustomCard
                actions={
                    <div className="flex justify-end">
                        <Link to="/operasional/pengajuan/tambah-cuti">
                            <Button className="bg-[#FDA31A] text-xs md:text-sm">
                                <FaPlus className="mr-2" /> Tambah Baru
                            </Button>
                        </Link>
                    </div>
                }
            >
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
            </CustomCard>

            {/* Filter */}
            <CustomCard
                actions={
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex gap-4 min-[864px]:flex-row flex-col">
                            <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">Unit Kerja</Label>
                            <SelectFilter
                                classname="w-full"
                                placeholder="Pilih Unit"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                            />
                        </div>
                        <div className="flex gap-4 min-[864px]:flex-row flex-col">
                            <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">Status</Label>
                            <SelectFilter
                                classname="w-full"
                                placeholder="Pilih Status"
                                options={[
                                    { label: "Aktif", value: "aktif" },
                                    { label: "Cuti", value: "cuti" },
                                ]}
                            />
                        </div>
                        <div className="flex gap-4 min-[864px]:flex-row flex-col">
                            <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">Jenis Izin</Label>
                            <SelectFilter
                                classname="w-full"
                                placeholder="Pilih Jenis"
                                options={[
                                    { label: "Tahunan", value: "tahunan" },
                                    { label: "Melahirkan", value: "melahirkan" },
                                    { label: "Penting", value: "penting" },
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
                    <SearchInput placeholder="Cari Pengajuan Cuti" />
                </div>
            </div>

            {/* Table */}
            <Table className="mt-6 table-auto text-xs lg:text-sm">
                <TableHeader>
                    <TableRow className="bg-[#002E5A]">
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
                    <TableRow className="even:bg-gray-100">
                        <TableCell className="text-center">
                            <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
                        </TableCell>
                        <TableCell className="text-center">1</TableCell>
                        <TableCell className="text-center">2025-06-17</TableCell>
                        <TableCell className="text-center">Cuti Tahunan</TableCell>
                        <TableCell className="text-center">Liburan Keluarga</TableCell>
                        <TableCell className="text-center">5 Hari</TableCell>
                        <TableCell className="text-center">Disetujui</TableCell>
                        <TableCell>
                            <div className="flex justify-center items-center gap-2">
                                <Link to="/operasional/pengajuan/detail-cuti">
                                    <Button size="icon" variant="ghost" className="cursor-pointer">
                                        <IoEyeOutline className="w-5 h-5 text-[#26A1F4]" />
                                    </Button>
                                </Link>
                                <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
                                    <Button size="icon" variant="ghost" className="cursor-pointer">
                                        <IoIosDocument className="w-5 h-5 text-[#26A1F4]" />
                                    </Button>
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Pagination */}
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

export default Cuti;
