import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import InfoList from "@/components/blocks/InfoList";

const DetailHubunganKerja = () => {
  const form = useForm();
  return (
    <div className="mt-10 mb-20">
      <Title title="Data Hubungan Kerja" subTitle="Detail Hubungan Kerja" />

      <CustomCard
        actions={
          <div className="flex justify-end w-full mt-10">
            <div className="flex justify-end gap-2 w-full md:w-auto flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kepegawaian/hubungan-kerja"
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
          <div className="mt-10 grid md:grid-rows-5 md:grid-flow-col md:items-center gap-6 w-full">
            <FormFieldInput
              form={form}
              label="Jabatan Struktural "
              name="jabatan_struktural"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="No SK"
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
              label="File Hubungan Kerja"
              name="file_hubungan_kerja"
              classname="border-none shadow-none"
              labelStyle="text-[#3F6FA9]"
              required={false}
            />

            <FormFieldInput
              form={form}
              label="Keterangan"
              name="keterangan"
              type="textarea"
              required={false}
              labelStyle="text-[#3F6FA9]"
              placeholder="Pegawai Administrasi dengan jam kerja penuh waktu, sesuai ketentuan Universitas"
            />

            <FormFieldInput
              form={form}
              label="Tgl. Mulai"
              name="tgl_mulai"
              type="date"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Tgl. Selesai"
              name="tgl_selesai"
              type="date"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Pejabat Penetap"
              name="pejabat_penetap"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldSelect
              form={form}
              label="Status Aktif"
              name="status_aktif"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Aktif" },
                { value: "2", label: "Tidak Aktif" },
              ]}
              required={false}
              placeholder="-- Pilih Status Aktif --"
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
        </form>
      </Form>
    </div>
  );
};

export default DetailHubunganKerja;
