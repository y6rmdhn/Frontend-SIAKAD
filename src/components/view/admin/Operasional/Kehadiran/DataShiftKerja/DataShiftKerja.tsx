import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Form } from "@/components/ui/form";

const DataShiftKerja = () => {
  const form = useForm();
  const navigate = useNavigate();

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-semibold">
        Shift Kerja{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          Daftar Shift Kerja
        </span>
      </h1>
      <Form {...form}>
        <form>
          <Card className="mt-5 border-t-yellow-uika border-t-3">
            <CardHeader>
              <div className="flex justify-between">
                <div className="relative">
                  <Input className="w-2xs pr-8" placeholder="Search" />
                  <FiSearch className="absolute -translate-y-1/2 top-1/2 right-2" />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate("/admin/pegawai")}
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer"
                  >
                    <IoIosArrowBack />
                    Kembali ke Daftar
                  </Button>

                  <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer">
                    <FaSave />
                    Simpan
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-10 grid-rows-4 grid-flow-col grid gap-5">
              <FormFieldInput
                form={form}
                label="Nama Shift"
                name="nama_shift"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldSelect
                form={form}
                label="Senin"
                name="senin"
                labelStyle="text-[#3F6FA9]"
                required={false}
                placeholder="--Pilih Senin--"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
              <FormFieldSelect
                form={form}
                label="Selasa"
                name="selasa"
                labelStyle="text-[#3F6FA9]"
                required={false}
                placeholder="--Pilih Selasa--"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
              <FormFieldSelect
                form={form}
                label="Rabu"
                name="rabu"
                labelStyle="text-[#3F6FA9]"
                required={false}
                placeholder="--Pilih Rabu--"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
              <FormFieldSelect
                form={form}
                label="Kamis"
                name="kamis"
                labelStyle="text-[#3F6FA9]"
                required={false}
                placeholder="--Pilih Kamis--"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
              <FormFieldSelect
                form={form}
                label="Jumat"
                name="jumat"
                labelStyle="text-[#3F6FA9]"
                required={false}
                placeholder="--Pilih Jumat--"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
              <FormFieldSelect
                form={form}
                label="Sabtu"
                name="sabtu"
                labelStyle="text-[#3F6FA9]"
                required={false}
                placeholder="--Pilih Sabtu--"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
              <FormFieldSelect
                form={form}
                label="Minggu"
                name="minggu"
                labelStyle="text-[#3F6FA9]"
                required={false}
                placeholder="--Pilih Minggu--"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </CardContent>
            <CardFooter>
              <div className="bg-[#F6E9E9] w-full p-4 border-l-4 border-l-[#E3CBCB]">
                <h1>
                  <span className="text-red-500">Keterangan :</span>Jika jam
                  pada hari shift dikosongi maka dianggap sebagai hari libur
                </h1>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default DataShiftKerja;
