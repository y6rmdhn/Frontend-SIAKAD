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
import Title from "@/components/blocks/Title";

const DetailBerita = () => {
  const form = useForm({
    defaultValues: {
      unitKerja: "",
      namaDokumen: "",
      prioritas: "",
      tglPosting: "",
      judul: "",
      file: null,
      statusDokumen: "",
      tglExpired: "",
    },
  });

  return (
    <div className="mt-10">
      <Title title="Berita" subTitle="Detail Berita" />
      <CustomCard
        actions={
          <div className="">
              <div className="flex w-full md:w-auto gap-2 order-1 md:order-2 md:flex-row flex-col justify-end">
                <Link
                  className="w-full md:w-auto"
                  to="/operasional/berita"
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

            {/* Data Dokumen Section */}
            <Form {...form}>
              <form>
                <div className="space-y-4 mt-10">
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
                        label="Unit Kerja"
                        name="unit_kerja"
                        labelStyle="text-[#3F6FA9]"
                        required={true}
                      />

                      <FormFieldInput
                        form={form}
                        label="Nama Dokumen"
                        name="nama_dokumen"
                        labelStyle="text-[#3F6FA9]"
                        required={true}
                      />

                      <FormFieldInput
                        form={form}
                        label="Prioritas"
                        name="prioritas"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInput
                        form={form}
                        label="Tgl. Posting"
                        name="tgl_posting"
                        type="date"
                        labelStyle="text-[#3F6FA9]"
                        required={true}
                      />
                    </div>

                    {/* Kolom Kanan */}
                    <div className="space-y-7 md:mt-0.5 lg:mt-0">
                      <FormFieldInput
                        form={form}
                        label="Judul"
                        name="judul"
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

                      <FormFieldInput
                        form={form}
                        label="Tgl. Expired"
                        name="tgl_expired"
                        type="date"
                        labelStyle="text-[#3F6FA9]"
                        required={true}
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

export default DetailBerita;
