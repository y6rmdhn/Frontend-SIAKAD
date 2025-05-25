import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { HiMiniTrash } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";

const DetailPublikasi = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Publikasi" subTitle="Detail Publikasi" />

      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2 flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/pelaksanaan-penelitian/publikasi"
              >
                <Button className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>
              <Link to="">
                <Button className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer">
                  <MdOutlineFileDownload />
                  Simpan
                </Button>
              </Link>
            </div>

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
            <Form {...form}>
              <form>
                <div className="mt-10 grid md:grid-rows-12 md:grid-flow-col md:items-center gap-3 w-full">
                  <FormFieldSelect
                    label="Jenis Publikasi"
                    name="jenis_publikasi"
                    placeholder="--Pilih Jenis Publikasi--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldSelect
                    label="Kategori Capaian"
                    name="kategori_capaian"
                    placeholder="--Pilih Kategori Capaian--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldSelect
                    label="Aktivitas Litabmas"
                    name="aktivitas_litabmas"
                    placeholder="--Pilih Aktivitas Litabmas--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldInput
                    label="Judul"
                    name="judul"
                    form={form}
                    required={false}
                    type="textarea"
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Judul Asli"
                    name="judul_asli"
                    form={form}
                    required={false}
                    type="textarea"
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Nomor"
                    name="nomor"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="DOI"
                    name="doi"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="ISBN"
                    name="isbn"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="ISSN"
                    name="issn"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Pemberi Paten"
                    name="pemberi_paten"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldSelect
                    label="Nomor Sk Penugasan"
                    name="nomor_sk_penugasan"
                    placeholder="--Pilih Tingkat Penghargaan--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />

                  <FormFieldInput
                    label="Nama Jurnal"
                    name="nama_jurnal"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Tanggal Terbit"
                    name="tanggal_terbit"
                    form={form}
                    type="date"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Penerbit"
                    name="penerbit"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Edisi"
                    name="edisi"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Volume"
                    name="volume"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Halaman"
                    name="halaman"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Jumlah Halaman"
                    name="jumlah_halaman"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="E-ISSN"
                    name="e_issn"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Seminar"
                    name="seminar"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Prosiding"
                    name="prosiding"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Nomor Paten"
                    name="nomor_paten"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Tgl SK Penugasan"
                    name="tgl_sk_penugasan"
                    form={form}
                    type="date"
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Tanggal Input"
                    name="tanggal_input"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                </div>
              </form>
            </Form>
          </div>
        }
      >
        <div className="mt-10">
          <div className="border-b-1 border-[#FDA31A] mb-5">
            <h1 className="text-sm font-semibold text-[#3ABC67]">
              Dokumen Pendukung
            </h1>
          </div>

          <Table className="table-auto text-xs lg:text-sm">
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
                <TableHead className="text-center text-white">
                  <Button className="w-5 h-5 bg-[#FDA31A] cursor-pointer">
                    <IoAdd />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-200">
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center border border-gray-200">
                  <SelectFilter
                    classname="w-full md:w-32 "
                    options={unitKerjaOptions}
                    placeholder="--Semua--"
                  />
                </TableCell>

                <TableCell className="border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      //   onClick={triggerFileInput}
                      className="bg-gray-200 rounded border text-black border-gray-400 hover:bg-gray-300"
                    >
                      Choose File
                    </Button>
                    <span className="italic text-gray-600">a</span>
                    <Input
                      //   ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg"
                      className="hidden"
                      //   onChange={handleFileChange}
                    />
                  </div>
                  <span className="text-blue-600 text-xs mt-1">
                    jpg.jpeg pdf (maxsize 2 MB)
                  </span>
                </TableCell>

                <TableCell className="text-center border border-gray-200"></TableCell>
                <TableCell className="text-center border border-gray-200">
                  <SelectFilter
                    classname="w-full md:w-32 "
                    options={unitKerjaOptions}
                    placeholder="--Semua--"
                  />
                </TableCell>
                <TableCell className="text-center border border-gray-200"></TableCell>
                <TableCell className="h-full border border-gray-200">
                  <div className="flex justify-center items-center w-full h-full">
                    <Link to="">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <HiMiniTrash className="w-5! h-5! text-[#FD1A1E]" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CustomCard>
    </div>
  );
};

export default DetailPublikasi;
