import CustomCard from "@/components/commons/card";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { IoSaveSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "@/components/commons/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/commons/CustomFormSelect/CustomFormSelect";
import { Link } from "react-router-dom";

const DetailJabatanFungsional = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Fungsional" subTitle="Detail Jabatan Fungsional" />
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex justify-end gap-4">
                <Link to="/admin/referensi/kepegawaian/jabatan-fungsional">
                  <Button
                    type="button"
                    className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]"
                  >
                    <IoIosArrowBack /> Kembali
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]"
                >
                  <IoSaveSharp /> Simpan
                </Button>
              </div>
            }
          >
            <div className="grid grid-rows-5 grid-flow-col items-center gap-x-4">
              <FormFieldInput
                form={form}
                label="Kode Jabatan"
                name="kode_jabatan"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Jabatan Fungsional"
                name="jabatan)fungsional"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldSelect
                form={form}
                label="Jabatan Akademik"
                name="jabatan_akademik"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Jabatan Akademik--"
                required={true}
              />
              <FormFieldSelect
                form={form}
                label="Golongan Pangkat"
                name="golongan_pangkat"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Golongan Pangkat--"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Angka Kredit"
                name="angka_kredit"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Usia Pensiun"
                name="usia_pensiun"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldSelect
                form={form}
                label="Referensi Sister"
                name="referensi_sister"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Referensi Sister--"
                required={false}
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

export default DetailJabatanFungsional;
