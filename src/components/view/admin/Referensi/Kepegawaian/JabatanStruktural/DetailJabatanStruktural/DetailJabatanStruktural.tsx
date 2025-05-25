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
import SearchInput from "@/components/blocks/SearchInput";

const DetailJabatanStruktural = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Struktural" subTitle="Detail Jabatan Struktural" />
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex flex-col sm:flex-row justify-between gap-4 ">
                <SearchInput />

                <div className="w-full sm:w-auto flex gap-2">
                  <div className="w-full sm:w-auto">
                  <Link to="/admin/referensi/kepegawaian/jabatan-struktural">
                    <Button
                      type="button"
                      className="sm:w-35 text-xs sm:text-sm sm:w-autocursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto"
                    >
                      <IoIosArrowBack /> Kembali Ke Daftar
                    </Button>
                  </Link>
                  </div>
                  <div className="w-full sm:w-auto">
                  <Button
                    type="submit"
                    className="text-xs sm:text-sm cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto"
                  >
                    <IoSaveSharp /> Simpan
                  </Button>
                  </div>
                </div>
              </div>
            }
          >
            <div className="grid grid-rows-7 md:grid-flow-col items-center gap-x-4 gap-y-4 md:gap-y-0">
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
