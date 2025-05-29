import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
const DetailPaten = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Paten" subTitle="Detail Paten" />
      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2 flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/pelaksanaan-penelitian/paten"
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
                <div className="mt-10 grid md:grid-rows-7 md:grid-flow-col md:items-center gap-6 w-full">
                  <FormFieldSelect
                    label="Jenis Paten"
                    name="jenis_paten"
                    placeholder="--Pilih Jenis Paten--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />

                  <FormFieldSelect
                    label="Aktivitas Litabmas"
                    name="aktivitas_litabmas"
                    placeholder="--Pilih Aktivitas Litabmas--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />

                  <FormFieldInput
                    label="Judul Karya"
                    name="judul_karya"
                    form={form}
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldInput
                    label="Tanggal Terbit"
                    name="tanggal_terbit"
                    form={form}
                    type="date"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Penerbit"
                    name="penerbit"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Jumlah Halaman"
                    name="jumlah_halaman"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Keterangan/Petunjuk Akses"
                    name="keterangan_petunjuk_akses"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldSelect
                    label="Kategori Capaian"
                    name="kategori_capaian"
                    placeholder="--Pilih Kategori Capaian--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldInput
                    label="Nomor Paten"
                    name="nomor_paten"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Lembaga Pemberi Paten"
                    name="lembaga_pemberi_paten"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="ISBN"
                    name="isbn"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Tautan External"
                    name="tautan_external"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Tanggal Input"
                    name="tanggal_input"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
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

export default DetailPaten;
