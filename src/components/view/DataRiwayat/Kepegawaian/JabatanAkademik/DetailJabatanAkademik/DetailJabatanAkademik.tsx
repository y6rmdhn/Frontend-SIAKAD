import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";

const DetailJabatanAkademik = () => {
  const form = useForm()
  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Akademik" subTitle="Detail Jabatan Akademik" />

      <CustomCard
  actions={
    <div className="flex justify-end mt-10">
      <div className="flex gap-4">
        <Link to="/data-riwayat/kepegawaian/jabatan-akademik">
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
        <div className="grid grid-rows-3 grid-flow-col gap-x-5 items-center mt-4">
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
      <div className="w-full border-b-2 border-b-green-light-uika mt-4">
            </div>
            <Form {...form}>
        <form>
          <div className=" w-96  mt-4">
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

export default DetailJabatanAkademik;
