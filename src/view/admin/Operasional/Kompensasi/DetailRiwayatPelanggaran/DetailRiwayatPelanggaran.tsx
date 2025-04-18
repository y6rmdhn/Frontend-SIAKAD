import CustomCard from "@/components/commons/card";
import { FormFieldInput } from "@/components/commons/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/commons/CustomFormSelect/CustomFormSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";

const DetailRiwayatPelanggaran = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-semibold">
        Pelanggaran{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          Detail Riwayat Pelanggaran
        </span>
      </h1>

      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex justify-between mt-10">
                <div className="flex gap-6">
                  <div className="relative">
                    <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                    <Input placeholder="Search" className="w-96 pr-8" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                    <IoIosArrowBack /> Kembali ke Daftar
                  </Button>

                  <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                    <IoSaveSharp /> Simpan
                  </Button>
                </div>
              </div>
            }
          >
            <div className="grid grid-rows-4 grid-flow-col gap-x-5 items-center">
              <FormFieldInput
                form={form}
                label="Pegawai"
                name="pegawai"
                required={true}
                labelStyle="text-[#3F6FA9]"
                placeholder="Cari Pegawai"
              />
              <FormFieldInput
                form={form}
                label="Tgl Pelanggaran"
                name="tgl_pelanggaran"
                required={true}
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <FormFieldSelect
                form={form}
                label="Jenis Pelanggaran"
                name="jenis_pelanggaran"
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
                placeholder="Terlambat atau Alpa"
              />
              <FormFieldInput
                form={form}
                label="No.SK"
                name="no_sk"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Tgl.SK"
                name="tgl_sk"
                required={false}
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <FormFieldInput
                form={form}
                label="Keterangan"
                name="keterangan"
                required={false}
                labelStyle="text-[#3F6FA9]"
                type="textarea"
              />
              <FormFieldInput
                form={form}
                label="File Keterangan"
                name="file_keterangan"
                required={false}
                labelStyle="text-[#3F6FA9]"
                type="file"
              />
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailRiwayatPelanggaran;
