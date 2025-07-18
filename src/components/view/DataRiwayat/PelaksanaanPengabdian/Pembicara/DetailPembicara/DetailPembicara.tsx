import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoAdd } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HiMiniTrash } from "react-icons/hi2";
import InfoList from "@/components/blocks/InfoList";
import {DummyDataDosen} from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";

const DetailPembicara = () => {
  const form = useForm();
  return (
    <div className="mt-10 mb-20">
      <Title title="Pembicara" subTitle="Detail Pembicara" />

      <CustomCard
        actions={
          <div className="flex w-full justify-end mt-10">
            <div className="flex justify-end gap-2 w-full md:w-auto flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/pelaksanaan-pengabdian/pembicara"
              >
                <Button className="bg-green-light-uika w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
                  <IoIosArrowBack />
                  Kembali ke Daftar
                </Button>
              </Link>

              <Button className="bg-[#FDA31A] w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
                <MdOutlineFileDownload />
                Simpan
              </Button>
            </div>
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

      <Form {...form}>
        <form>
          <div className="mt-10 grid md:grid-rows-6 md:grid-flow-col md:items-center gap-6 w-full">
            <FormFieldInput
              form={form}
              label="Judul Makalah"
              name="judul_makalah"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldSelect
              form={form}
              label="Nama Pertemuan Ilmiah"
              name="nama_pertemuan_ilmiah"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Pertemuan  1" },
                { value: "2", label: "Pertemuan  2" },
              ]}
              required={true}
              placeholder="--Pilih Kategori Kegiatan--"
            />
            <FormFieldInput
              form={form}
              label="Penyelenggara"
              name="penyelenggara"
              type="text"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldSelect
              form={form}
              label="Kategori Capaian Luar"
              name="kategori_capaian_luar"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Capaian 1" },
                { value: "2", label: "Capaian 2" },
              ]}
              required={true}
              placeholder="--Pilih Kategori Capaian Luar--"
            />
            <FormFieldSelect
              form={form}
              label="SK Penugasan"
              name="sk_penugasan"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Penugasan 1" },
                { value: "2", label: "Penugasan 2" },
              ]}
              required={false}
              placeholder="--Pilih SK Penugasan--"
            />
            <FormFieldSelect
              form={form}
              label="Kategori Kegiatan"
              name="kategori_kegiatan"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Kegiatan 1" },
                { value: "2", label: "Kegiatan 2" },
              ]}
              required={true}
              placeholder="--Pilih Kategori Kegiatan--"
            />
            <FormFieldSelect
              form={form}
              label="Kategori Pembicara"
              name="kategori_pembicara"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Pembicara 1" },
                { value: "2", label: "Pembicara 2" },
              ]}
              required={true}
              placeholder="--Pilih Kategori Pembicara--"
            />
            <FormFieldSelect
              form={form}
              label="Tingkat Pertemuan"
              name="tingkat_pertemuan"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Pertemuan  1" },
                { value: "2", label: "Pertemuan  2" },
              ]}
              required={false}
              placeholder="--Pilih Tingkat Pertemuan--"
            />
            <FormFieldInput
              form={form}
              label="Tanggal Pelaksanaan"
              name="tanggal_pelaksanaan"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Bahasa"
              name="bahasa"
              required={true}
              labelStyle="text-[#3F6FA9]"
              placeholder="Cari Kelompok Bidang"
            />
            <FormFieldSelect
              form={form}
              label="Litabnas"
              name="litabnas"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Litabnas  1" },
                { value: "2", label: "Litabnas  2" },
              ]}
              required={false}
              placeholder="--Pilih Aktivitas Litabnas--"
            />
            <FormFieldInput
              form={form}
              label="Tanggal Input"
              name="tanggal_input"
              required={false}
              labelStyle="text-[#3F6FA9]"
              placeholder="22 April 2025"
            />
          </div>
          <div className="w-full border-b-2 border-b-green-light-uika mt-10">
            <h1 className="font-normal text-base text-green-light-uika">
              Dokumen Pendukung
            </h1>
          </div>

          <Table className="mt-10 table-auto text-xs lg:text-sm">
            <TableHeader>
              <TableRow className="bg-[#002E5A]">
                <TableHead className="text-center text-white border">
                  Tipe Dokumen
                </TableHead>
                <TableHead className="text-center text-white border">
                  Dokumen
                </TableHead>
                <TableHead className="text-center text-white border">
                  Nama Dokumen
                </TableHead>
                <TableHead className="text-center text-white border">
                  Jenis Dokumen
                </TableHead>
                <TableHead className="text-center text-white border">
                  Keterangan
                </TableHead>
                <TableHead className="text-center text-white border">
                  <Button className="w-5 h-5 bg-[#FDA31A] cursor-pointer">
                    <IoAdd />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-200">
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center border border-gray-200">
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="File" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>File</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell className="border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.pdf"
                        className="block h-[42px] text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded file:border-0 file:text-sm file:font-semibold
                 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />
                      <span className="text-blue-600 text-xs mt-1">
                        jpg.jpeg pdf (maxsize 2.007152 MB)
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center border border-gray-200 w-64 whitespace-normal">
                  Materi dan Sertifikat Pembicara Pelatihan Internal
                </TableCell>
                <TableCell className="text-center border border-gray-200">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Pilih Jenis Dokumen --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="br">dokumen 1</SelectItem>
                      <SelectItem value="lm">dokumen 2</SelectItem>
                      <SelectItem value="lain">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center border border-gray-200 w-64 whitespace-normal">
                  Materi presentasi dan sertifikat sebagai fasilitator pelatihan
                  internal dosen dan tenaga kependidikan.
                </TableCell>
                <TableCell className="h-full border border-gray-200">
                  <div className="flex justify-center items-center w-full h-full">
                    <Link to="">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <HiMiniTrash className="!w-5 !h-5 text-[#FD1A1E]" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </Form>
    </div>
  );
};

export default DetailPembicara;
