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

const DetailAnak = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Anak" subTitle="Daftar Anak" />
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

            <Form {...form}>
              <form>
                <div className="grid md:grid-cols-2 mt-10 gap-10">
                  {/* Kolom Kiri */}
                  <div className="space-y-4">
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

                    <FormFieldInputFile
                      form={form}
                      label="File Akte Kelahiran"
                      name="file_akte_kelahiran"
                      classname="border-none shadow-none"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />

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
                  </div>

                  {/* Kolom Kanan */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 bg-white shadow-md p-3 sm:flex-row sm:gap-14 sm:p-4">
                      <Label className="font-bold w-full text-[#2572BE] sm:w-50">
                        Tanggal Input
                      </Label>
                      <Label className="w-full sm:w-50 text-[#2572BE]">
                        26 Maret 2026
                      </Label>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        }
      />
    </div>
  );
};

export default DetailAnak;
