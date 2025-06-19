import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
import { IoAdd } from "react-icons/io5";
import { HiMiniTrash } from "react-icons/hi2";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { useForm } from "react-hook-form";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import SearchInput from "@/components/blocks/SearchInput";

const DetailDokumenInternal = () => {
  const form = useForm({
    defaultValues: {
      nip: "",
      namaDokumen: "",
      uraianSingkat: "",
      urlDokumen: "",
      tanggalDokumen: "",
      jenisDokumen: "",
      menuReferensi: "",
      file: null,
      statusDokumen: "",
      tingkat: "",
      namaPejabatPenetap: "",
      namaValidator: "",
    },
  });

  return (
    <div className="mt-10">
      <h1 className="text-xl  font-medium">
        Dokumen Internal{" "}
        <span className="text-[13px] text-muted-foreground font-normal">
          Detail Dokumen Internal
        </span>
      </h1>
      <CustomCard
        actions={
          <div className="">
            <div className="flex justify-between mb-5 min-[813px]:flex-row flex-col gap-4">
              <div className="flex w-full gap-6 order-2 md:order-1">
                <SearchInput
                  className="w-full md:w-auto"
                  placeholder="Cari nama dokumen"
                />
              </div>

              <div className="flex w-full md:w-auto gap-2 order-1 md:order-2 md:flex-row flex-col">
                <Link
                  className="w-full md:w-auto"
                  to="/operasional/dokumen-internal"
                >
                  <Button className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika">
                    <IoChevronBackOutline /> Kembali ke Daftar
                  </Button>
                </Link>
                <Button className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer">
                  <MdOutlineFileDownload />
                  Simpan
                </Button>
              </div>
            </div>

            {/* Data Dokumen Section */}
            <Form {...form}>
              <form>
                <div className="space-y-4">
                  <div className="border-b-1 border-[#FDA31A]">
                    <h1 className="text-sm font-normal text-[#FDA31A]">
                      Data Dokumen
                    </h1>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Kolom Kiri */}
                    <div className="space-y-7">
                      <FormFieldInput
                        form={form}
                        label="No. Dokumen"
                        name="no_dokumen"
                        labelStyle="text-[#3F6FA9]"
                        required={true}
                      />

                      <FormFieldInput
                        form={form}
                        label="Nama Dokumen"
                        name="nama_dokumen"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInput
                        form={form}
                        label="Uraian Singkat"
                        name="uraian_singkat"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInput
                        form={form}
                        label="URL Dokumen"
                        name="url_dokumen"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInput
                        form={form}
                        label="Tanggal Dokumen"
                        name="tanggal_dokumen"
                        type="date"
                        labelStyle="text-[#3F6FA9]"
                        required={true}
                      />

                      <FormFieldInput
                        form={form}
                        label="Jenis Dokumen"
                        name="jenis_dokumen"
                        placeholder="Surat Keputusan"
                        labelStyle="text-[#3F6FA9]"
                        required={true}
                      />
                    </div>

                    {/* Kolom Kanan */}
                    <div className="space-y-7 md:mt-0.5 lg:mt-0">
                      <FormFieldSelect
                        form={form}
                        label="Menu Referensi"
                        name="menu_referensi"
                        placeholder="Pengajaran"
                        options={[
                          { label: "Admin", value: "admin" },
                          { label: "User", value: "user" },
                          { label: "Guest", value: "guest" },
                        ]}
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInputFile
                        label="File"
                        name="file"
                        classname="border-none shadow-none"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldSelect
                        form={form}
                        label="Status Dokumen"
                        name="status_dokumen"
                        placeholder="Baru"
                        options={[
                          { label: "Admin", value: "admin" },
                          { label: "User", value: "user" },
                          { label: "Guest", value: "guest" },
                        ]}
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldSelect
                        form={form}
                        label="Tingkat"
                        name="tingkat"
                        placeholder="--Pilih Tingkat--"
                        options={[
                          { label: "Admin", value: "admin" },
                          { label: "User", value: "user" },
                          { label: "Guest", value: "guest" },
                        ]}
                        labelStyle="text-[#3F6FA9]"
                        required={true}
                      />

                      <FormFieldInput
                        form={form}
                        label="Nama Pejabat Penetap"
                        name="nama_pejabat_penetap"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInput
                        form={form}
                        label="Nama Validator"
                        name="nama_validator"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Form>

            <div className="border-b-1 border-[#FDA31A] mb-5 mt-10">
              <h1 className="text-sm font-normal text-[#FDA31A]">
                Data Dokumen
              </h1>
            </div>
            <Table className="table-auto text-xs lg:text-sm">
              <TableHeader>
                <TableRow className="bg-[#002E5A] ">
                  <TableHead className="text-center text-white border-1">
                    Pegawai
                  </TableHead>
                  <TableHead className="w-10 text-center text-white">
                    <Button className="w-5 h-5 bg-[#FDA31A] cursor-pointer">
                      <IoAdd />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="bg-white divide-y divide-gray-200">
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center">
                    <div className="flex justify-between">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-- Pilih Pegawai --" />
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
                    </div>
                  </TableCell>
                  <TableCell className="h-full">
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
        }
      />
    </div>
  );
};

export default DetailDokumenInternal;
