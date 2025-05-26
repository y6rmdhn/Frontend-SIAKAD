import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";

const DetailPendidikanFormal = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />

      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kualifikasi/pendidikan-formal"
              >
                <Button className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>
              <Link to="">
                <Button className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer">
                  <MdOutlineFileDownload />
                  Simpan
                </Button>
              </Link>
            </div>

            <InfoList
              items={[
                "NIP",
                "Nama",
                "Unit Kerja",
                "Status",
                "Jab. Akademik",
                "Jab. Fungsional",
                "Jab. Struktural",
                "Pendidikan",
              ]}
            />

            <Form {...form}>
              <form>
                {/* Institusi */}
                <div className="mt-10">
                  <div className="border-b-1 border-[#FDA31A] mb-5">
                    <h1 className="text-sm font-semibold text-[#3ABC67]">
                      Institusi
                    </h1>
                  </div>

                  <div className="mt-10 grid md:grid-rows-5 md:grid-flow-col md:items-center gap-6 w-full">
                    <FormFieldInput
                      label="Lokasi Studi"
                      name="lokasi_studi"
                      form={form}
                      required={false}
                      type="radio"
                      options={[
                        { value: "1", label: "Kenaikan 1" },
                        { value: "2", label: "Kenaikan 2" },
                      ]}
                      labelStyle="text-[#3F6FA9]"
                    />
                    <FormFieldSelect
                      label="Jenjang Studi"
                      name="jenjang_studi"
                      placeholder="--Pilih Jenjang Studi--"
                      form={form}
                      labelStyle="text-[#3F6FA9]"
                      required={true}
                      options={[
                        { value: "1", label: "Kenaikan 1" },
                        { value: "2", label: "Kenaikan 2" },
                      ]}
                    />
                    <FormFieldInput
                      label="Nama Institusi"
                      name="nama_institusi"
                      form={form}
                      required={true}
                      labelStyle="text-[#3F6FA9]"
                    />
                  </div>
                </div>

                {/* Akademik */}
                <div className="mt-10">
                  <div className="border-b-1 border-[#FDA31A] mb-5">
                    <h1 className="text-sm font-semibold text-[#3ABC67]">
                      Akademik
                    </h1>
                  </div>

                  <div className="mt-10 grid md:grid-rows-3 md:grid-flow-col md:items-center gap-6 w-full">
                    <FormFieldInput
                      label="NISN"
                      name="nisn"
                      form={form}
                      required={false}
                      labelStyle="text-[#2572BE]"
                    />
                    <FormFieldInput
                      label="Konsentrasi"
                      name="konsentrasi"
                      form={form}
                      required={false}
                      labelStyle="text-[#2572BE]"
                    />
                    <FormFieldInput
                      label="Tahun Masuk"
                      name="tahunMasuk"
                      form={form}
                      required
                      labelStyle="text-[#2572BE]"
                    />
                    <FormFieldInput
                      label="Tanggal Kelulusan"
                      name="tanggalKelulusan"
                      type="date"
                      form={form}
                      required
                      placeholder="dd - mm - yyyy"
                      labelStyle="text-[#2572BE]"
                    />
                    <FormFieldInput
                      label="Tahun Lulus"
                      name="tahunLulus"
                      form={form}
                      required
                      labelStyle="text-[#2572BE]"
                    />
                  </div>
                </div>

                {/* Ijazah */}
                <div className="mt-10">
                  <div className="border-b-1 border-[#FDA31A] mb-5">
                    <h1 className="text-sm font-semibold text-[#3ABC67]">
                      Ijazah
                    </h1>
                  </div>

                  <div className="mt-10 grid md:grid-rows-5 md:grid-flow-col md:items-center gap-6 w-full">
                    <FormFieldInput
                      label="Nomor Ijazah"
                      name="nomorIjazah"
                      form={form}
                      labelStyle="text-[#2572BE]"
                    />
                    <FormFieldInput
                      label="Tanggal Ijazah"
                      name="tanggalIjazah"
                      type="date"
                      form={form}
                      placeholder="dd - mm - yyyy"
                      labelStyle="text-[#2572BE]"
                    />
                    {/* File Ijazah */}
                    <FormFieldInputFile
                      label="File Ijazah"
                      name="fileIjazah"
                      form={form}
                      type="file"
                      required={false}
                      labelStyle="text-[#2572BE]"
                    />
                    {/* File Transkrip */}
                    <FormFieldInputFile
                      label="File Transkrip"
                      name="fileTranskrip"
                      form={form}
                      type="file"
                      required={false}
                      labelStyle="text-[#2572BE]"
                    />
                    <FormFieldInput
                      label="Nomor Ijazah Negara"
                      name="nomorIjazahNegara"
                      form={form}
                      labelStyle="text-[#2572BE]"
                    />
                    <FormFieldInput
                      label="Tanggal Ijazah Negara"
                      name="tanggalIjazahNegara"
                      form={form}
                      type="date"
                      placeholder="dd - mm - yyyy"
                      labelStyle="text-[#2572BE]"
                    />
                  </div>
                </div>

                {/* Status Pengajuan */}
                <div className="mt-10">
                  <div className="border-b-1 border-[#FDA31A] mb-5">
                    <h1 className="text-sm font-semibold text-[#3ABC67]">
                      Status Pengajuan
                    </h1>
                  </div>

                  <div className="mt-10 grid md:grid-rows-5 md:grid-flow-col md:items-center gap-6 w-full">
                    <FormFieldInput
                      label="Tanggal Input"
                      name="tanggalInput"
                      form={form}
                      placeholder="22 April 2025"
                      labelStyle="text-[#2572BE]"
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        }
      />
    </div>
  );
};

export default DetailPendidikanFormal;
