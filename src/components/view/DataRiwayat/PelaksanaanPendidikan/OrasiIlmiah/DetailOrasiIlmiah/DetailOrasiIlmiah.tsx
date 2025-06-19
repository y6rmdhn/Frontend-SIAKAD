import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import InfoList from "@/components/blocks/InfoList";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {DummyDataDosen} from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";

const DetailOrasiIlmiah = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Orasi Ilmiah" subTitle="Detail Orasi Ilmiah" />
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex justify-end gap-2 flex-col md:flex-row">
                <Link
                  className="w-full md:w-auto"
                  to="/data-riwayat/pelaksanaan-pendidikan/orasi-ilmiah"
                >
                  <Button
                    type="button"
                    className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika"
                  >
                    <IoIosArrowBack /> Kembali ke Daftar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-yellow-uika w-full md:w-auto hover:bg-hover-yellow-uika"
                >
                  <IoMdDownload /> Simpan
                </Button>
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
            <div className="mt-10 grid md:grid-rows-6 md:grid-flow-col md:items-center gap-6 w-full">
              <FormFieldSelect
                label="Pilih Kategori Kegiatan"
                name="kategoriKegiatan"
                placeholder="--Pilih Kategori Kegiatan--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={true}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldSelect
                label="Pilih Kategori Capaian Luaran"
                name="kategoriCapaianLuaran"
                placeholder="--Pilih Ketegori Capaian Luaran--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={false}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldSelect
                label="Litabmas"
                name="litabmas"
                placeholder="--Pilih Litabmas--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={false}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldSelect
                label="Kategori Pembicara"
                name="kategoriPembicara"
                placeholder="--Pilih Litabmas--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={true}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldInput
                label="Judul Makalah"
                name="judulMakalah"
                form={form}
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Nama Pertemuan Ilmiah"
                name="namaPertemuanIlmiah"
                form={form}
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldSelect
                label="Tinggkat Pertemuan"
                name="tingkatPertemuan"
                placeholder="--Pilih Tingkat Pertemuan--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={false}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldInput
                label="Penyelenggara"
                name="tgmMulai"
                form={form}
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Tanggal Pelaksana"
                name="tglPelaksana"
                form={form}
                type="date"
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Bahasa"
                name="bahasa"
                form={form}
                placeholder="Indonesia"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldSelect
                label="Sk Penugasan"
                name="skPenugasan"
                placeholder="--Pilih SK Penugasan--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={false}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldInput
                label="Tanggal Input"
                name="tglInput"
                form={form}
                placeholder="22 April 2025"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />
            </div>

            <h1 className="mt-10 text-green-light-uika font-semibold text-base md:text-xl">
              Dokumen Pendukung
            </h1>

            <Separator className="w-full" />

            <div className="flex justify-end mt-10">
              <Button className="bg-green-light-uika text-xs md:text-sm hover:bg-hover-green-uika">
                <FaPlus /> Tambah
              </Button>
            </div>

            <Table className="mt-3 table-auto text-xs lg:text-sm border-separate border-spacing-x-[1px]">
              <TableHeader>
                <TableRow className="bg-[#002E5A]">
                  <TableHead className="text-center text-white rounded-tl-lg">
                    Tipe Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Nama Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Jenis Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Keterangan
                  </TableHead>
                  <TableHead className="text-center text-white rounded-tr-lg">
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
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <FaRegTrashAlt className="w-4! h-4! text-red-500" />
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
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailOrasiIlmiah;
