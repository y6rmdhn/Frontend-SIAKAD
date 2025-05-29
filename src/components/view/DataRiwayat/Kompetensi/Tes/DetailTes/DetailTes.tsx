import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";

const DetailTes = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Sertifikasi" subTitle="Detail Sertifikasi" />
      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kompetensi/tes"
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
                <div className="mt-10 grid md:grid-rows-5 md:grid-flow-col md:items-center gap-4 w-full">
                  {/* Kolom Kiri */}
                  <FormFieldSelect
                    label="Jenis Tes"
                    name="jenisTes"
                    placeholder="-- Pilih Jenis Tes --"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "1", label: "Jenis 1" },
                      { value: "2", label: "Jenis 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldSelect
                    label="Penyelenggara"
                    name="penyelenggara"
                    placeholder="-- Pilih Jenis Penghargaan --"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "1", label: "Kategori 1" },
                      { value: "2", label: "Kategori 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldInput
                    label="Skor Tes"
                    name="skorTes"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldSelect
                    label="SK Penugasan"
                    name="skPenugasan"
                    placeholder="-- Pilih SK Penugasan --"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "1", label: "Kategori 1" },
                      { value: "2", label: "Kategori 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  {/* Kolom Kanan */}
                  <FormFieldSelect
                    label="Nama Tes"
                    name="namaTes"
                    placeholder="-- Pilih Tingkat Penghargaan --"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "1", label: "SK 1" },
                      { value: "2", label: "SK 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldInput
                    label="Tanggal Tes"
                    name="tanggalTes"
                    type="date"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInputFile
                    label="File Pendukung"
                    name="file_pendukung"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Tanggal Input"
                    name="tanggalInput"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    placeholder="22 April 2025"
                  />
                </div>
              </form>
            </Form>
          </div>
        }
      />
    </div>
  );
};

export default DetailTes;
