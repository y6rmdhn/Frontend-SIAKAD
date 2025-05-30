import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";
import InfoList from "@/components/blocks/InfoList";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { z } from "zod";

// Define interface for the data item
interface anakItem {
  nama: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tgl_lahir: Date;
  anak_ke: number;
  pekerjaan_anak: string;
  keterangan: string;
  submit_type: string;
  // Add other properties as needed
}

// Define interface for the API response
interface anakResponse {
  data: anakItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const anakSchema = z.object({
  id: z.number().optional(),
  pangkat: z.string().min(1, "Pangkat tidak boleh kosong"),
  nama_golongan: z.string().min(1, "Nama Golongan tidak boleh kosong"),
});

const DetailAnak = () => {
  const form = useForm({
    nama: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tgl_lahir: "",
    anak_ke: "",
    pekerjaan_anak: "",
    keterangan: "",
    submit_type: "submit",
  });

  const handleSubmitAnak = (values) => {};

  return (
    <div className="mt-10 mb-20">
      <Title title="Anak" subTitle="Daftar Anak" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitAnak)}>
          <CustomCard
            actions={
              <div>
                <div className="flex justify-end">
                  <Link to="/data-riwayat/keluarga/anak">
                    <Button className="bg-yellow-uika hover:bg-hover-yellow-uika">
                      <FaPlus /> Tambah Baru
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

                <div className="mt-10 grid md:grid-rows-7 md:grid-flow-col md:items-center gap-4 w-full">
                  {/* Kolom Kiri */}
                  <FormFieldInput
                    form={form}
                    label="Nama"
                    name="nama"
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                  />

                  <FormFieldSelect
                    form={form}
                    label="Jenis Kelamin"
                    name="jenis_kelamin"
                    placeholder="--Laki-laki--"
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
                    label="Tempat Lahir"
                    name="tempat_lahir"
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                  />

                  <FormFieldInput
                    form={form}
                    label="Tanggal Lahir"
                    name="tanggal_lahir"
                    type="date"
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                  />

                  <FormFieldInput
                    form={form}
                    label="Umur"
                    name="umur"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />

                  {/* <FormFieldInputFile
                    form={form}
                    label="File Akte Kelahiran"
                    name="file_akte_kelahiran"
                    classname="border-none shadow-none"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  /> */}

                  <FormFieldInput
                    form={form}
                    label="Anak Ke"
                    name="anak_ke"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />

                  <FormFieldInput
                    form={form}
                    label="Pekerjaan Anak"
                    name="pekerjaan_anak"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />

                  {/* Kolom Kanan */}
                  <div className="flex md:w-80 w-full flex-col gap-2 bg-white shadow-md p-3 sm:flex-row sm:gap-14 sm:p-4">
                    <Label className="font-bold w-full text-[#2572BE] sm:w-50">
                      Tanggal Input
                    </Label>
                    <Label className="w-full sm:w-50 text-[#2572BE]">
                      26 Maret 2026
                    </Label>
                  </div>
                </div>
              </div>
            }
          />
        </form>
      </Form>
    </div>
  );
};

export default DetailAnak;
