import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { IoSaveSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
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
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <Link to="/admin/referensi/kepegawaian/jabatan-fungsional">
                  <Button
                    type="button"
                    className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] text-xs sm:text-sm w-full sm:w-auto"
                  >
                    <IoIosArrowBack /> Kembali
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] text-xs sm:text-sm w-full sm:w-auto"
                >
                  <IoSaveSharp /> Simpan
                </Button>
              </div>
            }
          >
            <div className="flex flex-col sm:grid sm:grid-rows-5 gap-5 sm:gap-y-0 sm:gap-x-4 grid-flow-col sm:items-center gap-x-4">
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
