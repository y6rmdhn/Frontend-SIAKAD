import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import {DummyDataDosen} from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";
const DetailPenelitian = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Penelitian" subTitle="Detail Penelitian" />
      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2 flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/pelaksanaan-penelitian/penelitian"
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
              <form>
                <div className="mt-10 grid md:grid-rows-8 md:grid-flow-col md:items-center gap-6 w-full">
                  <FormFieldInput
                    label="Perguruan Tinggi Afiliasi"
                    name="perguruan_tinggi_afiliasi"
                    form={form}
                    required={true}
                    placeholder="Cari perguruan tinggi afiliasi"
                    labelStyle="text-[#3F6FA9]"
                  />

                  <FormFieldSelect
                    label="Jenis SKIM"
                    name="jenis_skim"
                    placeholder="--Pilih Jenis SKIM--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldInput
                    label="Judul Penelitian"
                    name="judul_penelitian"
                    form={form}
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldSelect
                    label="Tahun Susulan"
                    name="tahun_susulan"
                    placeholder="--Pilih Tahun Susulan--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldInput
                    label="Tahun Pelaksanaan Ke"
                    name="tahun_pelaksanaan_ke"
                    form={form}
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldSelect
                    label="Lingkup Pengabdian"
                    name="lingkup_pengabdian"
                    placeholder="--Pilih Lingkup Pengabdian--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldSelect
                    label="Sesuai Roadmap"
                    name="sesuai_roadmap"
                    placeholder="--Pilih Sesuai Roadmap--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldInput
                    label="Tanggak SK Penugasan"
                    name="tanggal_sk_penugasan"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Kelompok Bidang"
                    name="tanggal_sk_penugasan"
                    form={form}
                    placeholder="Cari Kelompok bidang"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldSelect
                    label="Litabmas Sebelumnya"
                    name="litabmas_sebelumnya"
                    placeholder="--Pilih Litabmas Sebelumnya--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldInput
                    label="Lokasi Kegiatan"
                    name="lokasi_kegiatan"
                    form={form}
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldSelect
                    label="Tahun Kegiatan"
                    name="tahun_kegiatan"
                    placeholder="--Pilih Tahun kegiatan--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldInput
                    label="Tanggal Mulai"
                    name="tanggal_mulai"
                    form={form}
                    type="date"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    label="Tanggal Selesai"
                    name="tanggal_selesai"
                    form={form}
                    type="date"
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldSelect
                    label="Tahun SK Penugasan"
                    name="tahun_sk_penugasan"
                    placeholder="--Pilih Tingkat Penghargaan--"
                    form={form}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    options={[
                      { value: "1", label: "Kenaikan 1" },
                      { value: "2", label: "Kenaikan 2" },
                    ]}
                  />
                  <FormFieldInput
                    label="Tanggal Input"
                    name="tanggal_input"
                    form={form}
                    placeholder="22 April 2025"
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

export default DetailPenelitian;
