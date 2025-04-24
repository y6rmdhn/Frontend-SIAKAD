import CustomCard from "@/components/commons/card";
import { FormFieldInput } from "@/components/commons/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/commons/CustomFormSelect/CustomFormSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt, FaSave } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";

const DetailDokumenInternal = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">
        Dokumen Internal{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          Detail Dokumen Internal
        </span>
      </h1>

      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex justify-between mt-10">
                <div className="relative">
                  <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                  <Input placeholder="Search" className="w-80 pr-8" />
                </div>

                <div className="flex gap-4">
                  <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer">
                    <IoIosArrowBack />
                    Kembali ke Daftar
                  </Button>

                  <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer">
                    <FaSave />
                    Simpan
                  </Button>
                </div>
              </div>
            }
          >
            <div className="w-full border-b-2 border-b-green-light-uika mt-4">
              <h1 className="text-xl font-normal text-green-light-uika">
                Data Dokumen
              </h1>
            </div>

            <div className="grid grid-rows-6 grid-flow-col gap-x-5 items-center mt-4">
              <FormFieldInput
                form={form}
                label="No Dokumen"
                name="no_dokumen"
                required={true}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Nama Dokumen"
                name="nama_dokumen"
                required={true}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Uraian Singkat"
                name="uraian_singkat"
                required={false}
                labelStyle="text-[#3F6FA9]"
                type="textarea"
              />
              <FormFieldInput
                form={form}
                label="Url Dokumen"
                name="url_dokumen"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Tgl Dokumen"
                name="nama_dokumen"
                required={true}
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <FormFieldSelect
                form={form}
                label="Jenis Dokumen"
                name="jenis_dokumen"
                labelStyle="text-[#3F6FA9]"
                options={[
                  {
                    value: "1",
                    label: "Pelanggaran Ringan",
                  },
                  {
                    value: "2",
                    label: "Pelanggaran Sedang",
                  },
                  {
                    value: "3",
                    label: "Pelanggaran Berat",
                  },
                ]}
                required={true}
                placeholder="Surat Keputusan"
              />
              <FormFieldSelect
                form={form}
                label="Menu Referensi"
                name="menu_referensi"
                labelStyle="text-[#3F6FA9]"
                options={[
                  {
                    value: "1",
                    label: "Pelanggaran Ringan",
                  },
                  {
                    value: "2",
                    label: "Pelanggaran Sedang",
                  },
                  {
                    value: "3",
                    label: "Pelanggaran Berat",
                  },
                ]}
                required={false}
                placeholder="Pengajaran"
              />
              <FormFieldInput
                form={form}
                label="File"
                name="file"
                required={false}
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <FormFieldSelect
                form={form}
                label="Status Dokumen"
                name="Barun"
                labelStyle="text-[#3F6FA9]"
                options={[
                  {
                    value: "1",
                    label: "Pelanggaran Ringan",
                  },
                  {
                    value: "2",
                    label: "Pelanggaran Sedang",
                  },
                  {
                    value: "3",
                    label: "Pelanggaran Berat",
                  },
                ]}
                required={false}
                placeholder="Baru"
              />
              <FormFieldSelect
                form={form}
                label="Tinggkat"
                name="tinggkat"
                labelStyle="text-[#3F6FA9]"
                options={[
                  {
                    value: "1",
                    label: "Pelanggaran Ringan",
                  },
                  {
                    value: "2",
                    label: "Pelanggaran Sedang",
                  },
                  {
                    value: "3",
                    label: "Pelanggaran Berat",
                  },
                ]}
                required={true}
                placeholder="--Pilih Tinggkat--"
              />
              <FormFieldInput
                form={form}
                label="Nama Pejabat Penetep"
                name="nama_pejabat_penetep"
                required={false}
                labelStyle="text-[#3F6FA9]"
                placeholder="Cari Nama Pejabat Penetap"
              />
              <FormFieldInput
                form={form}
                label="Nama Validator"
                name="nama_validator"
                required={false}
                labelStyle="text-[#3F6FA9]"
                placeholder="Cari Nama Validator"
              />
            </div>

            <div className="w-full border-b-2 border-b-green-light-uika mt-4">
              <h1 className="text-xl font-normal text-green-light-uika">
                Penerima
              </h1>
            </div>

            <div className="flex flex-col mt-4">
              <div className="bg-[#E7ECF2] w-full p-3 flex justify-between items-center">
                <div />
                <h1 className="text-lg font-normal">Pegawai</h1>
                <Button
                  size="icon"
                  className="bg-green-light-uika hover:bg-[#329C59]"
                >
                  <FaPlus className="w-3 h-3" />
                </Button>
              </div>

              <div className="w-full p-3 flex justify-between gap-4 items-center">
                <Input placeholder="Cari Pegawai" className="w-full" />
                <Button size="icon" variant="destructive">
                  <FaRegTrashAlt className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailDokumenInternal;
