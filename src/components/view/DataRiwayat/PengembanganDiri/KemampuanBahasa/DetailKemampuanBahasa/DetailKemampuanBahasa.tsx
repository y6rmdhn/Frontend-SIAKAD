import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
const DetailKemampuanBahasa = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div>
                <div className="w-full flex flex-col sm:flex-row justify-end gap-2">
                  <Link to="/data-riwayat/pengembangan-diri/kemampuan-bahasa">
                    <Button className="bg-green-light-uika hover:bg-hover-green-uika w-full sm:w-auto">
                      <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                  </Link>
                  <Link to="">
                    <Button className="bg-[#FDA31A] text-white cursor-pointer w-full sm:w-auto">
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
              </div>
            }
          >
            <div className="sm:mt-10 grid grid-rows-4 md:grid-flow-col items-center gap-x-4 gap-y-4 md:gap-y-0">
              <FormFieldInput
                form={form}
                label="Tahun"
                name="tahun"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Nama Lembaga"
                name="nama_lembaga"
                placeholder="Cari Nama Lembaga"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Kemampuan Berbicara"
                name="kemampuan_berbicara"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInputFile
                form={form}
                label="File Pendukung"
                name="file_pendukung"
                classname="border-none shadow-none"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Bahasa"
                name="bahasa"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Bahasa--"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Kemampuan Mendengar"
                name="kemampuan_mendengar"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Kemampuan Menulis"
                name="kemampuan_menulis"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Tanggal Input"
                name="tanggal_input"
                labelStyle="text-[#3F6FA9]"
                placeholder="22 April 2025"
                required={false}
              />
            </div>
          </CustomCard>
        </form>
      </Form>
    </div >
  );
};

export default DetailKemampuanBahasa;
