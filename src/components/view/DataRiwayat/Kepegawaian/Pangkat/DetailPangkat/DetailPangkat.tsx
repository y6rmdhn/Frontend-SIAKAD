import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useForm } from "react-hook-form";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import InfoList from "@/components/blocks/InfoList";
import { useNavigate } from "react-router-dom";

const DetailPangkat = () => {
  const form = useForm();
  const navigate = useNavigate();

  return (
    <div className="mt-10 mb-20">
      <Title title="Pangkat" subTitle="Detail Pangkat" />

      <CustomCard
        actions={
          <div className=" flex justify-start md:justify-end mt-10">
            <div className="flex w-full md:w-auto flex-col md:flex-row gap-4">
              <Button
                onClick={() => navigate("/data-riwayat/kepegawaian/pangkat")}
                className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full md:w-auto flex items-center gap-2 text-xs md:text-sm"
              >
                <IoIosArrowBack className="w-3! h-3! md:w-4! h-4!" />
                Kembali ke Daftar
              </Button>

              <Button className="w-full sm:w-auto bg-[#FDA31A] hover:bg-[#329C59] cursor-pointer flex items-center gap-2 text-xs md:text-sm">
                <MdOutlineFileDownload className="w-3! h-3! md:w-4! h-4!" />
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
          <div className="grid grid-cols-1  gap-5 items-center mt-4">
            <FormFieldSelect
              form={form}
              label="Jenis SK *"
              name="jenis_sk"
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              options={[
                { value: "1", label: "Surat Keputusan 1" },
                { value: "2", label: "Surat Keputusan 2" },
              ]}
              required={true}
              placeholder="-- Pilih Jenis SK --"
            />
            <FormFieldSelect
              form={form}
              label="Jenis Kenaikan Pangkat"
              name="jenis_kenaikan_pangkat"
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              options={[
                { value: "1", label: "Kenaikan 1" },
                { value: "2", label: "Kenaikan 2" },
              ]}
              required={false}
              placeholder="-- Pilih Jenis Kenaikan Pangkat --"
            />
            <FormFieldSelect
              form={form}
              label="Nama Pangkat"
              name="nama_pangkat"
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              options={[
                { value: "1", label: "Juru Muda (I/a)" },
                { value: "2", label: "Juru Muda Tingkat I (I/b)" },
              ]}
              required={false}
              placeholder="-- Pilih Pangkat --"
            />
            <FormFieldInput
              form={form}
              label="TMT. Pangkat *"
              name="tmt_pangkat"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInput
              form={form}
              label="No. SK"
              name="no_sk"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInputFile
              form={form}
              label="File Perangkat"
              name="file_perangkat"
              classname="border-none shadow-none"
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              required={false}
            />

            <FormFieldInput
              form={form}
              label="Tgl. SK"
              name="tgl_sk"
              type="date"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInput
              form={form}
              label="Pejabat Penetap"
              name="pejabat_penetap"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInput
              form={form}
              label="Masa Kerja (Tahun)"
              name="masa_kerja_tahun"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInput
              form={form}
              label="Masa Kerja (Bulan)"
              name="masa_kerja_bulan"
              type="date"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInput
              form={form}
              label="Acuan Masa Kerja"
              name="acuan_masa_kerja"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInput
              form={form}
              label="Tanggal Input"
              name="tanggal_input"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              placeholder="22 April 2025"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailPangkat;
