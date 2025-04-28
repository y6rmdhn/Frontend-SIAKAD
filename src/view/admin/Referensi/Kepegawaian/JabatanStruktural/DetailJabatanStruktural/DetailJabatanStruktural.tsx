import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { IoSaveSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Link } from "react-router-dom";
import SearchInput from "@/components/blocks/SearchInput";
import { Input } from "@/components/ui/input";

const DetailJabatanStruktural = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Struktural" subTitle="Detail Jabatan Struktural" />
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex justify-between gap-4 ">
                <SearchInput />

                <div className="flex gap-2">
                  <Link to="/admin/referensi/kepegawaian/jabatan-fungsional">
                    <Button
                      type="button"
                      className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]"
                    >
                      <IoIosArrowBack /> Kembali Ke Daftar
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]"
                  >
                    <IoSaveSharp /> Simpan
                  </Button>
                </div>
              </div>
            }
          >
            <div className="grid grid-rows-7 grid-flow-col items-center gap-x-4">
              <FormFieldInput
                form={form}
                label="Kode"
                name="kode"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Nama Jabatan Struktural"
                name="nama_jabatan_struktural"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldSelect
                form={form}
                label="Jenis Jabatan Struktural"
                name="jenis_jabatan_struktural"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Jabatan Struktural--"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Singkatan"
                name="singkatan"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Parenet Jabatan Struktural"
                name="parenet_jabatan_struktural"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="-Pilih Parent Jabatan-"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Unit Kerja"
                name="unit_kerja"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="Universitas Ibn Khaldun"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Alamat Email"
                name="alamat_email"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Eselon"
                name="eselon"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Eselon--"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Pangkat Min"
                name="pangkat_min"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Pangkat Min--"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Pangkat Max"
                name="pangkat_max"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Pangkat Max--"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Beban Sks"
                name="beban_sks"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="is Pimpinan"
                name="is_pimpinan"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="checkbox"
              />
              <FormFieldInput
                form={form}
                label="Aktif"
                name="aktif"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="checkbox"
              />

              <FormFieldInput
                form={form}
                label="Keterangan"
                name="keterangan"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="textarea"
              />
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailJabatanStruktural;
