import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";

const DetailOrangtua = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Orang Tua" subTitle="Daftar Orang Tua" />

      <CustomCard
        actions={
          <div>
            <div className="flex flex-col md:flex-row justify-end gap-2">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/keluarga/orangtua"
              >
                <Button className="bg-[#002E5A] w-full md:w-auto hover:bg-hover-blue-200">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>

              <Button className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer">
                <MdOutlineFileDownload />
                Simpan
              </Button>
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
                      label="Nama Orang Tua"
                      name="nama_orangtua"
                      labelStyle="text-[#3F6FA9]"
                      required={true}
                    />

                    <FormFieldSelect
                      form={form}
                      label="Jenis Orang Tua"
                      name="jenis_orangtua"
                      placeholder="--ayah--"
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
                      label="Alamat"
                      name="alamat"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />

                    <FormFieldInput
                      form={form}
                      label="Telpon"
                      name="telpon"
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

export default DetailOrangtua;
