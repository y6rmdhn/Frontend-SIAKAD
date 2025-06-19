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
import {DummyDataDosen} from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";

const DetailPenghargaan = () => {
  const form = useForm()
  return (
    <div className="mt-10 mb-20">
      <Title title="Penghargaan" subTitle="Detail Penghargaan" />

      <CustomCard
        actions={
          <div>
            <div className="w-full flex flex-col sm:flex-row justify-end gap-4">
              <Link to="/data-riwayat/penunjang/penghargaan">
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
                <div className="flex flex-col sm:grid sm:grid-rows-4 grid-flow-col gap-x-5 gap-y-4 sm:gap-y-0 sm:items-center mt-4">
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
                    label="Jenis Penghargaan"
                    name="jenis_penghargaan"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "Emas" },
                      { value: "2", label: "Umroh" },
                      { value: "5", label: "Sertifikat" },
                      { value: "4", label: "Dosen/Pegawai Teladan" },

                    ]}
                    required={true}
                    placeholder="-- Pilih Jenis Penghargaan --"
                  />

                  <FormFieldInput
                    form={form}
                    label="Tanggal Penghargaan"
                    name="tanggal_penghargaan"
                    type="date"
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

                  <FormFieldSelect
                    form={form}
                    label="Tingkat Penghargaan"
                    name="tingkat_penghargaan"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "1", label: "Sekolah" },
                      { value: "2", label: "Kecamatan" },
                      { value: "5", label: "Kabupaten/Kota" },
                      { value: "4", label: "Provinsi" },
                      { value: "3", label: "Nasional" },
                      { value: "6", label: "Internasional" },
                      { value: "7", label: "Lainnya" },

                    ]}
                    required={true}
                    placeholder="-- Pilih Jenis Penghargaan --"
                  />
                  <FormFieldInput
                    form={form}
                    label="Nama Penghargaan"
                    name="nama_penghargaan"
                    type="textarea"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    form={form}
                    label="Instansi Pemberi"
                    name="instansi_pemberi"
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

                </div>
              </form>
            </Form>
          </div>
        }
      />
    </div>
  );
};

export default DetailPenghargaan;
