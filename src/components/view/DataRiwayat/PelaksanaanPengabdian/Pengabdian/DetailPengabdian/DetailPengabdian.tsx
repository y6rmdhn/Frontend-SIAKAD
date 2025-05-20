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

const DetailPengabdian = () => {
  const form = useForm()
  return (
    <div className="mt-10 mb-20">
      <Title title="Pengabdian" subTitle="Detail Pengabdian" />

      <CustomCard
  actions={
    <div className="flex justify-end mt-10">
      <div className="flex gap-4">
        <Link to="/data-riwayat/pelaksanaan-pengabdian/pengabdian">
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
        <div className="grid grid-rows-9 grid-flow-col gap-x-5 items-center mt-4">
        <FormFieldInput
          form={form}
          label="Perguruan Tinggi Afiliasi*"
          name="perguruan_tinggi_afiliatif"
          required={true}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldSelect
          form={form}
          label="Jenis SKIM *"
          name="jenis_skim"
          labelStyle="text-[#3F6FA9]"
          options={[
            { value: "1", label: "Surat Keputusan 1" },
            { value: "2", label: "Surat Keputusan 2" },
          ]}
          required={true}
          placeholder="-- Pilih Jenis SKIM --"
        />
        <FormFieldSelect
          form={form}
          label="Aktivitas Litabnas*"
          name="aktivitas_litabnas"
          labelStyle="text-[#3F6FA9]"
          options={[
            { value: "1", label: "Kenaikan 1" },
            { value: "2", label: "Kenaikan 2" },
          ]}
          required={false}
          placeholder="-- Pilih Aktivitas Litabnas --"
                  />
         <FormFieldInput
          form={form}
          label="Judul/Kegiatan *"
          name="judul_kegiatan"
          type="textarea"
          required={true}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldSelect
          form={form}
          label="Tahun Usulan *"
          name="tahun_usulan"
          labelStyle="text-[#3F6FA9]"
          options={[
            { value: "1", label: "Juru Muda (I/a)" },
            { value: "2", label: "Juru Muda Tingkat I (I/b)" },
          ]}
          required={true}
          placeholder="-- Pilih Tahun Usulan --"
        />
        <FormFieldInput
          form={form}
          label="Tahun Pelaksanaan Ke *"
          name="tahun_pelaksanaan_ke"
          type="text"
          required={true}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldSelect
          form={form}
          label="Lingkup Pengabdian "
          name="lingkup_pengabdian"
          labelStyle="text-[#3F6FA9]"
          options={[
            { value: "1", label: "Lingkup Pengabdian  1" },
            { value: "2", label: "Lingkup Pengabdian  2" },
          ]}
          required={false}
          placeholder="-- Pilih Lingkup Pengabdian --"
        />
        <FormFieldSelect
          form={form}
          label="Sesuai Roadmap "
          name="sesuai_roadmap"
          labelStyle="text-[#3F6FA9]"
          options={[
            { value: "1", label: "Roadmap  1" },
            { value: "2", label: "Roadmap  2" },
          ]}
          required={false}
          placeholder="-- Pilih Sesuai Roadmap  --"
        />
        <FormFieldInput
          form={form}
          label="Tanggal SK Penugasan"
          name="tanggal_sk_penugasan"
          type="date"
          required={false}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldInput
          form={form}
          label="Kelompok Bidang"
          name="kelompok_bidang"
          required={true}
          labelStyle="text-[#3F6FA9]"
          placeholder="Cari Kelompok Bidang"
        />
        <FormFieldSelect
          form={form}
          label="Litabnas Sebelumnya"
          name="litabnas_sebelumnya"
          labelStyle="text-[#3F6FA9]"
          options={[
            { value: "1", label: "Litabnas  1" },
            { value: "2", label: "Litabnas  2" },
          ]}
          required={false}
          placeholder="-- Pilih Sesuai Roadmap  --"
        />
        <FormFieldInput
          form={form}
        label=""
          name="kosong"
          required={false}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldInput
          form={form}
          label="Lokasi Kegiatan "
          name="lokasi_kegiatan"
          type="textarea"
          required={false}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldSelect
          form={form}
          label="Tahun Kegiatan *"
          name="tahun_kegiatan"
          labelStyle="text-[#3F6FA9]"
          options={[
            { value: "1", label: "2025" },
            { value: "2", label: "2024" },
          ]}
          required={true}
          placeholder="-- Pilih Tahun Kegiatan  --"
        />
        <FormFieldInput
          form={form}
          label="Tanggal Mulai*"
          name="tanggal_mulai"
          type="date"
          required={true}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldInput
          form={form}
          label="Tanggal Selesai"
          name="tanggal_selesai"
          type="date"
          required={false}
          labelStyle="text-[#3F6FA9]"
        />
        <FormFieldSelect
          form={form}
          label="Nomor SK Penugasan"
          name="nomor_sk_penugasan"
          labelStyle="text-[#3F6FA9]"
          options={[
            { value: "1", label: "Dokumen 1" },
            { value: "2", label: "Dokumen 2" },
          ]}
          required={false}
          placeholder="-- Pilih Dokumen  --"
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

export default DetailPengabdian;
