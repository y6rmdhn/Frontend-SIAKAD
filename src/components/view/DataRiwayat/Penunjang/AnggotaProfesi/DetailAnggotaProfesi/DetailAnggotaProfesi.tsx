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

const DetailAnggotaProfesi = () => {
  const form = useForm()
  return (
    <div className="mt-10 mb-20">
      <Title title="Anggota Profesi" subTitle="Detail Anggota Profesi" />

      <CustomCard
        actions={
          <div>
            <div className="w-full flex flex-col sm:flex-row justify-end gap-4">
              <Link to="/data-riwayat/penunjang/anggota-profesi">
                <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full sm:w-auto">
                  <IoIosArrowBack />
                  Kembali ke Daftar
                </Button>
              </Link>

              <Button className="bg-[#FDA31A] hover:bg-[#329C59] cursor-pointer w-full sm:w-auto">
                <MdOutlineFileDownload />
                Simpan
              </Button>
            </div>
          </div>
        }
      />

      <div className="w-full border-l-2 border-[#6AAEF1] flex flex-col gap-2 sm:grid sm:grid-cols-2 mt-10 bg-[#D6E8F9] p-4 ">
        <div className="flex flex-col gap-2 text-[#2572BE]">
          <p className="text-sm sm:text-base">NIP</p>
          <p className="text-sm sm:text-base">Nama</p>
          <p className="text-sm sm:text-base">Unit Kerja</p>
          <p className="text-sm sm:text-base">Status</p>
        </div>
        <div className="flex flex-col gap-2 text-[#2572BE]">
          <p className="text-sm sm:text-base">Jab. Akademik</p>
          <p className="text-sm sm:text-base">Jab. Fungsional</p>
          <p className="text-sm sm:text-base">Jab. Struktural</p>
          <p className="text-sm sm:text-base">Pendidikan</p>
        </div>
      </div>
      
      <Form {...form}>
        <form className="mt-10">
          <div className="flex flex-col sm:grid sm:grid-rows-4 grid-flow-col gap-x-5 gap-y-5 sm:items-center mt-4">
            <FormFieldSelect
              form={form}
              label="Kategori Kegiatan *"
              name="kategori_kegiatan"
              labelStyle="text-[#3F6FA9]"
              options={[
                { value: "1", label: "Kegiatan 1" },
                { value: "2", label: "Kegiatan 2" },
              ]}
              required={true}
              placeholder="-- Pilih Kategori Kegiatan --"
            />
            <FormFieldInput
              form={form}
              label="Peran *"
              name="peran"
              type="text"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />

            <FormFieldInput
              form={form}
              label="Instansi Profesi *"
              name="instansi_profesi"
              type="text"
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

            <FormFieldInput
              form={form}
              label="Nama Organisasi *"
              name="nama_organisasi"
              type="text"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Mulai Keanggotaan *"
              name="mulai_keanggotaan"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Selesai Keanggotaan *"
              name="selesai_keanggotaan"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />

          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailAnggotaProfesi;
