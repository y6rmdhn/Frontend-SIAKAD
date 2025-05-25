import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useForm } from "react-hook-form";

const DetailPenunjangLain = () => {
  const form = useForm()
  return (
    <div className="mt-10 mb-20">
      <Title title="Penunjang Lain" subTitle="Detail Penunjang Lain" />

      <CustomCard
        actions={
          <div>
            <div className="w-full flex flex-col sm:flex-row justify-end gap-4">
              <Link to="/data-riwayat/penunjang/penunjang-lain">
                <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer flex w-full sm:w-auto">
                  <IoIosArrowBack />
                  Kembali ke Daftar
                </Button>
              </Link>

              <Button className="bg-[#FDA31A] hover:bg-[#329C59] cursor-pointer flex w-full sm:w-auto">
                <MdOutlineFileDownload />
                Simpan
              </Button>
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
              <form className="mt-10">
                <div className="flex flex-col sm:grid sm:grid-rows-5 grid-flow-col gap-x-5 gap-y-5 sm:items-center mt-4">
                  <FormFieldSelect
                    form={form}
                    label="Kategori Kegiatan"
                    name="kategori_kegiatan"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "Kegiatan 1" },
                      { value: "2", label: "Kegiatan 2" },
                    ]}
                    required={true}
                    placeholder="-- Pilih Kategori Kegiatan --"
                  />
                  <FormFieldSelect
                    form={form}
                    label="Tingkat"
                    name="tingkat"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "Panitia/Badan Pada Perguruan Tinggi" },
                      { value: "2", label: "Panitia/Badan Pada Lembaga Pemerintah" },
                      { value: "5", label: "Delegasi Nasional Ke Pertemuan Internasional" },
                      { value: "4", label: "Panitia Pada Pertemuan Ilmiah" },
                      { value: "7", label: "Panitia Lainnya" },
                      { value: "3", label: "Sebagai Anggota" },

                    ]}
                    required={true}
                    placeholder="-- Pilih Tingkat --"
                  />

                  <FormFieldInput
                    form={form}
                    label="Instansi"
                    name="instansi"
                    type="text"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldSelect
                    form={form}
                    label="SK Penugasan"
                    name="sk_penugasan"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "Penugasan 1" },
                      { value: "2", label: "Penugasan 2" },
                    ]}
                    required={true}
                    placeholder="-- Pilih SK Penugasan --"
                  />

                  <FormFieldInput
                    form={form}
                    label="Tanggal SK Penugasan "
                    name="tanggal_sk_penugasan"
                    type="date"
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldSelect
                    form={form}
                    label="Jenis Kegiatan"
                    name="jenis   _kegiatan"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "Kegiatan 1" },
                      { value: "2", label: "Kegiatan 2" },
                    ]}
                    required={true}
                    placeholder="-- Pilih Kategori Kegiatan --"
                  />
                  <FormFieldInput
                    form={form}
                    label="Nama Kegiatan"
                    name="nama_kegiatan"
                    type="text"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    form={form}
                    label="Tanggal Mulai"
                    name="tanggal_mulai"
                    type="date"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    form={form}
                    label="Tanggal Selesai"
                    name="tanggal_selesai"
                    type="date"
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldInput
                    form={form}
                    label="Tanggal Input"
                    name="tanggal_input"
                    required={false}
                    labelStyle="text-[#3F6FA9]"
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

export default DetailPenunjangLain;
