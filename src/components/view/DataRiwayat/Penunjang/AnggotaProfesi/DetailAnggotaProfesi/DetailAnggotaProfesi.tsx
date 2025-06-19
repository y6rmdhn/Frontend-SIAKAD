import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import InfoList from "@/components/blocks/InfoList";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useForm } from "react-hook-form";
import {DummyDataDosen} from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";

const DetailAnggotaProfesi = () => {
  const form = useForm()
  return (
    <div className="mt-10 mb-20">
      <Title title="Anggota Profesi" subTitle="Detail Anggota Profesi" />

      <CustomCard
        actions={
          <div>
            <div className="w-full flex flex-col sm:flex-row justify-end gap-4">
              <Link to="/data-riwayat/penunjang/anggota-profesi">
                <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full sm:w-auto">
                  <IoIosArrowBack />
                  Kembali ke Daftar
                </Button>
              </Link>

              <Button className="bg-[#FDA31A] hover:bg-[#329C59] cursor-pointer w-full sm:w-auto">
                <MdOutlineFileDownload />
                Simpan
              </Button>
            </div>
              <InfoList
                  items={[
                      { label: "NIP", value: DummyDataDosen.pegawai_info.nip },
                      { label: "Nama", value: DummyDataDosen.pegawai_info.nama },
                      { label: "Unit Kerja", value: DummyDataDosen.pegawai_info.unit_kerja },
                      { label: "Status", value: DummyDataDosen.pegawai_info.status },
                      { label: "Jab. Akademik", value: DummyDataDosen.pegawai_info.jab_akademik },
                      { label: "Jab. Fungsional", value: DummyDataDosen.pegawai_info.jab_fungsional },
                      { label: "Jab. Struktural", value: DummyDataDosen.pegawai_info.jab_struktural },
                      { label: "Pendidikan", value: DummyDataDosen.pegawai_info.pendidikan },
                  ]}
              />

            <Form {...form}>
              <form className="mt-10">
                <div className="flex flex-col sm:grid sm:grid-rows-4 grid-flow-col gap-x-5 gap-y-5 sm:items-center mt-4">
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
                  <FormFieldInput
                    form={form}
                    label="Peran"
                    name="peran"
                    type="text"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldInput
                    form={form}
                    label="Instansi Profesi"
                    name="instansi_profesi"
                    type="text"
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

                  <FormFieldInput
                    form={form}
                    label="Nama Organisasi"
                    name="nama_organisasi"
                    type="text"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    form={form}
                    label="Mulai Keanggotaan"
                    name="mulai_keanggotaan"
                    type="date"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    form={form}
                    label="Selesai Keanggotaan"
                    name="selesai_keanggotaan"
                    type="date"
                    required={true}
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

export default DetailAnggotaProfesi;
