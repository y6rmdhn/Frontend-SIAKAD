import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import InfoList from "@/components/blocks/InfoList";

const DetailJabatanFungsional = () => {
  const form = useForm();
  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Fungsional" subTitle="Detail Jabatan Fungsional" />

      <CustomCard
        actions={
          <div className="flex justify-end w-full mt-10">
            <div className="flex justify-end gap-2 w-full md:w-auto flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kepegawaian/jabatan-fungsional"
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
          <div className="mt-10 grid md:grid-rows-3 md:grid-flow-col md:items-center gap-6 w-full">
            <FormFieldSelect
              form={form}
              label="Nama Jabatan *"
              name="nama_jabatan"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Surat Keputusan 1" },
                { value: "2", label: "Surat Keputusan 2" },
              ]}
              required={true}
              placeholder="-- Pilih Nama Jabatan --"
            />
            <FormFieldInput
              form={form}
              label="TMT. Jabatan *"
              name="tmt_jabatan"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="No. SK"
              name="no_sk"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Tgl. SK"
              name="tgl_sk"
              type="date"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />

            <FormFieldInputFile
              form={form}
              label="File Jabatan"
              name="file_jabatan"
              classname="border-none shadow-none"
              labelStyle="text-[#3F6FA9]"
              required={false}
            />

            <FormFieldInput
              form={form}
              label="Pejabat Penetap"
              name="pejabat_penetap"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
          </div>
        </form>
      </Form>
      <div className="w-full border-b-2 border-b-green-light-uika mt-4"></div>
      <Form {...form}>
        <form>
          <div className="md:w-96 mt-4">
            <FormFieldInput
              form={form}
              label="Tanggal Input"
              name="tanggal_input"
              required={false}
              labelStyle="text-[#3F6FA9]"
              placeholder="22 April 2025"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailJabatanFungsional;
