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

const DetailUnitKerja = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Unit Kerja" subTitle="Detail Unit kerja" />
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex flex-col sm:flex-row justify-between gap-4 ">
                <SearchInput />

                <div className="w-full sm:w-auto flex gap-2">
                  <div className="w-full sm:w-auto">
                  <Link to="/admin/referensi/kepegawaian/unit-kerja">
                    <Button
                      type="button"
                      className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto"
                    >
                      <IoIosArrowBack /> Kembali Ke Daftar
                    </Button>
                  </Link>
                  </div>
                  <div className="w-full sm:w-auto">
                  <Button
                    type="submit"
                    className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto"
                  >
                    <IoSaveSharp /> Simpan
                  </Button>
                  </div>
                </div>
              </div>
            }
          >
            <div className="grid grid-rows-10 md:grid-flow-col items-center gap-x-4 gap-y-4 md:gap-y-0">
              <FormFieldInput
                form={form}
                label="Kode Unit"
                name="kodeUnit"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Nama Unit"
                name="namaUnit"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Nama Unit(EN)"
                name="namaUnitEn"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Nama Singkat"
                name="namaSingkat"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Parent Unit"
                name="parentUnit"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Parent Unit--"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Jenis Unit"
                name="jenisUnit"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Jenis Unit--"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="TK.Pendidikan"
                name="tkPendidikan"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="--Pilih Tk.Pendidikan--"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Alamat"
                name="alamat"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="textarea"
              />
              <FormFieldInput
                form={form}
                label="Telpon"
                name="telpon"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Website"
                name="website"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Alamat Email"
                name="alamatEmail"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Akreditasi"
                name="akreditasi"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="-Pilih Akreditasi-"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="No.SK Akreditasi"
                name="noSkAkreditasi"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Tanggal Akreditasi"
                name="noSkAkreditasi"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="date"
              />
              <FormFieldInput
                form={form}
                label="No.SK Pendirian"
                name="noSkPendirian"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Tanggal Sk Pendirian"
                name="tanggalSkPendirian"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="date"
              />
              <FormFieldSelect
                form={form}
                label="Gedung"
                name="gedung"
                labelStyle="text-[#3F6FA9]"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                placeholder="Pilih Gedung"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Akademik"
                name="akademik"
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
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailUnitKerja;
