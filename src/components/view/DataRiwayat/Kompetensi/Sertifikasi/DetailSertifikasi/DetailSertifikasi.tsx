import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
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
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import dosenServices from "@/services/dosen.services";
import { useQuery } from "@tanstack/react-query";

const DetailSertifikasi = () => {
  const form = useForm();

  // get data
  const { data } = useQuery({
    queryKey: ["anak-detail-dosen"],
    queryFn: async () => {
      const response = await dosenServices.getDataDataSertifikasiWithoutParam();
      return response.data;
    },
  });

  return (
    <div className="mt-10 mb-20">
      <Title title="Sertifikasi" subTitle="Detail Sertifikasi" />
      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kompetensi/sertifikasi"
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
                { label: "NIP", value: data?.pegawai_info.nip },
                { label: "Nama", value: data?.pegawai_info.nama },
                { label: "Unit Kerja", value: data?.pegawai_info.unit_kerja },
                { label: "Status", value: data?.pegawai_info.status },
                {
                  label: "Jab. Akademik",
                  value: data?.pegawai_info.jab_akademik,
                },
                {
                  label: "Jab. Fungsional",
                  value: data?.pegawai_info.jab_fungsional,
                },
                {
                  label: "Jab. Struktural",
                  value: data?.pegawai_info.jab_struktural,
                },
                { label: "Pendidikan", value: data?.pegawai_info.pendidikan },
              ]}
            />

            <Form {...form}>
              <form>
                <div className="mt-10 grid md:grid-rows-6 md:grid-flow-col md:items-center gap-6 w-full">
                  <FormFieldSelect
                    label="Jenis Sertifikasi"
                    name="jenisSertifikasi"
                    placeholder="- - pilih Jenis Sertifikasi - -"
                    form={form}
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "Jenis 1" },
                      { value: "2", label: "Jenis 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldSelect
                    label="Nomor Sertifikasi"
                    name="nomorSertifikasi"
                    placeholder="- - pilih Nomor Sertifikasi - -"
                    form={form}
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "Kategori 1" },
                      { value: "2", label: "Kategori 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldInput
                    label="Nomor Registrasi"
                    name="nomorRegistrasi"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldInput
                    label="Kedudukan / Peran"
                    name="kedudukanPeran"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldInput
                    label="Tempat"
                    name="tempat"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldInput
                    label="Tanggal Input"
                    name="tanggalInput"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldSelect
                    label="Bidang Studi"
                    name="bidangStudi"
                    placeholder="- - Pilih Bidang Studi - -"
                    form={form}
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "sk 1" },
                      { value: "2", label: "sk 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldInput
                    label="Tanggal Sertifikasi"
                    name="tanggalSertifikasi"
                    form={form}
                    type="date"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldInput
                    label="Nomor Peserta"
                    name="nomorPeserta"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldInput
                    label="Penyelenggara"
                    name="penyelenggara"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldSelect
                    label="Lingkup"
                    name="lingkup"
                    placeholder="- - Pilih Lingkup - -"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "lingkup 1" },
                      { value: "2", label: "lingkup 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
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

          <Table className="table-auto text-xs">
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
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="File" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Unit Kerja</SelectLabel>
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
                  <div className="flex items-center gap-2">
                    {/*<Button*/}
                    {/*  type="button"*/}
                    {/*  onClick={triggerFileInput}*/}
                    {/*  className="bg-gray-200 rounded border text-black border-gray-400 hover:bg-gray-300"*/}
                    {/*>*/}
                    {/*  Choose File*/}
                    {/*</Button>*/}
                    {/*<span className="italic text-gray-600">{fileName}</span>*/}
                    {/*<Input*/}
                    {/*  ref={fileInputRef}*/}
                    {/*  type="file"*/}
                    {/*  accept=".pdf,.jpg,.jpeg"*/}
                    {/*  className="hidden"*/}
                    {/*  onChange={handleFileChange}*/}
                    {/*/>*/}
                  </div>
                  <span className="text-blue-600 text-xs mt-1">
                    jpg.jpeg pdf (maxsize 2 MB)
                  </span>
                </TableCell>

                <TableCell className="text-center border border-gray-200"></TableCell>
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

export default DetailSertifikasi;
