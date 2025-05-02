import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useForm } from "react-hook-form";

const DetailPangkat = () => {
  const form = useForm()
  return (
    <div className="mt-10 mb-20">
      <Title title="Pangkat" subTitle="Detail Pangkat" />

      <CustomCard
  actions={
    <div className="flex justify-end mt-10">
      <div className="flex gap-4">
        <Link to="/data-riwayat/kepegawaian/pangkat">
          <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
            <IoIosArrowBack />
            Kembali ke Daftar
          </Button>
        </Link>

        <Button className="bg-[#FDA31A] hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
          <MdOutlineFileDownload />
          Simpan
        </Button>
      </div>
    </div>
  }
/>

      <div className="w-full grid grid-cols-2 gap-96 mt-10 bg-[#D6E8F9] p-4 ">
        <div className="flex flex-col gap-2 text-[#2572BE]">
          <p>NIP</p>
          <p>Nama</p>
          <p>Unit Kerja</p>
          <p>Status</p>
        </div>
        <div className="flex flex-col gap-2 text-[#2572BE]">
          <p>Jab. Akademik</p>
          <p>Jab. Fungsional</p>
          <p>Jab. Struktural</p>
          <p>Pendidikan</p>
        </div>
      </div>
      <Form {...form}>
        <form>
        <div className="grid grid-rows-6 grid-flow-col gap-x-5 items-center mt-4">
        <FormFieldSelect
          form={form}
          label="Jenis SK *"
          name="jenis_sk"
          labelStyle="text-[#3F6FA9]"
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
          labelStyle="text-[#3F6FA9]"
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
          labelStyle="text-[#3F6FA9]"
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
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldInput
          form={form}
          label="No. SK"
          name="no_sk"
          required={false}
          labelStyle="text-[#3F6FA9]"
        />
        {/* Upload file */}
        <div className="flex items-center gap-4">
  <label className="text-[#3F6FA9] text-sm font-medium min-w-[180px]">
    File Perangkat
  </label>

  <div className="flex flex-col">
    <input
      type="file"
      accept=".jpg,.jpeg,.pdf"
      className="block h-[42px] text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded file:border-0 file:text-sm file:font-semibold
                 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
    />
    <span className="text-blue-600 text-xs mt-1">
      jpg.jpeg pdf (maxsize 2.007152 MB)
    </span>
  </div>
</div>


      
        <FormFieldInput
          form={form}
          label="Tgl. SK"
          name="tgl_sk"
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
        <FormFieldInput
          form={form}
          label="Masa Kerja (Tahun)"
          name="masa_kerja_tahun"
          required={false}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldInput
          form={form}
          label="Masa Kerja (Bulan)"
          name="masa_kerja_bulan"
          type="date"
          required={false}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldInput
          form={form}
          label="Acuan Masa Kerja"
          name="acuan_masa_kerja"
          required={false}
          labelStyle="text-[#3F6FA9]"
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

export default DetailPangkat;
