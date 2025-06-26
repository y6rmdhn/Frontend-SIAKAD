import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import pegawaiDetailMenu from "@/constant/PegawaiDetailMenu";
import KepegawaianSection from "@/components/blocks/DataPegawaiForm/PegawaiSection";
import DomisiliSection from "@/components/blocks/DataPegawaiForm/Domisilisection";
import RekeningBankSection from "@/components/blocks/DataPegawaiForm/RekeningBankSection";
import DokumenSection from "@/components/blocks/DataPegawaiForm/DokumenSection";
import DetailKendaraanSection from "@/components/blocks/DataPegawaiForm/DetailKendaraanSection";
import Title from "@/components/blocks/Title";
import { useState, useEffect } from "react";
import dosenServices from "@/services/dosen.services";
import { Button } from "@/components/ui/button";

// ====================================================================
// PERBAIKAN KUNCI (1): Hapus definisi 'type DataPegawaiSchema' lokal dari sini.
// ====================================================================

// ====================================================================
// PERBAIKAN KUNCI (2): Impor tipe dari satu sumber terpusat agar konsisten
// dengan semua komponen anak.
// Ganti path ini jika lokasi file Anda berbeda.
import { type DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
// ====================================================================

interface FormDataPegawaiProps {
  show: string;
  form: UseFormReturn<DataPegawaiSchema>;
  isReadOnly: boolean; // Tambahkan isReadOnly agar bisa diteruskan ke anak
}

const BiodataUser = () => {
  const [show, setShow] = useState<string>("kepegawaian");

  // Sekarang useForm menggunakan tipe yang diimpor, yang lebih ketat
  const form = useForm<DataPegawaiSchema>({
    defaultValues: {
      // PERBAIKAN KUNCI (3): Berikan nilai default yang valid sesuai tipe yang ketat.
      // 'jenis_kelamin' tidak boleh undefined.
      nip: "",
      nuptk: "",
      nama: "",
      gelar_depan: "",
      gelar_belakang: "",
      jenis_kelamin: undefined,
      agama: "",
      tempat_lahir: "",
      tanggal_lahir: undefined,
      kode_status_pernikahan: "",
      golongan_darah: "",
      unit_kerja_id: "",
      status_aktif_id: "",
      status_kerja: "",
      email_pegawai: "",
      email_pribadi: "",
      golongan: "",
      jabatan_fungsional: "",
      no_ktp: "",
      no_kk: "",
      warga_negara: "",
      provinsi: "",
      kota: "",
      alamat_domisili: "",
      kecamatan: "",
      kode_pos: "",
      suku: "",
      jarak_rumah_domisili: "",
      no_whatsapp: "",
      no_handphone: "",
      nama_bank: "",
      cabang_bank: "",
      nama_rekening: "",
      no_rekening: "",
      kapreg: "",
      npwp: "",
      no_bpjs: "",
      no_bpjs_ketenagakerjaan: "",
      no_bpjs_pensiun: "",
      nomor_polisi: "",
      jenis_kendaraan: "",
      tinggi_badan: undefined,
      berat_badan: undefined,
    },
  });

  const { data: getBiodata } = useQuery({
    queryKey: ["biodata-dosen"],
    queryFn: async () => {
      const response = await dosenServices.getBiodataDosen();
      return response.data.data;
    },
  });

  useEffect(() => {
    if (getBiodata) {
      const {
        biodata_pribadi,
        kontak,
        dokumen_identitas,
        rekening_bank,
        status_kepegawaian,
        jabatan_fungsional_aktif,
      } = getBiodata;

      form.reset({
        nip: biodata_pribadi.nip || "",
        nuptk: biodata_pribadi.nuptk || "",
        nama: biodata_pribadi.nama_lengkap || "",
        gelar_depan: biodata_pribadi.gelar_depan || "",
        gelar_belakang: biodata_pribadi.gelar_belakang || "",
        jenis_kelamin:
          biodata_pribadi.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
        agama: biodata_pribadi.agama || "",
        tempat_lahir: biodata_pribadi.tempat_lahir || "",
        tanggal_lahir: biodata_pribadi.tanggal_lahir
          ? new Date(biodata_pribadi.tanggal_lahir)
          : undefined,
        golongan_darah: biodata_pribadi.golongan_darah || "",
        alamat_domisili: kontak.alamat_domisili || "",
        kota: kontak.kota || "",
        provinsi: kontak.provinsi || "",
        kode_pos: kontak.kode_pos || "",
        no_handphone: kontak.no_handphone || "",
        email_pribadi: kontak.email_pribadi || "",
        jarak_rumah_domisili: kontak.jarak_rumah_domisili || "",
        no_ktp: dokumen_identitas.no_ktp || "",
        no_kk: dokumen_identitas.no_kk || "",
        npwp: dokumen_identitas.npwp || "",
        no_bpjs: dokumen_identitas.no_bpjs || "",
        no_bpjs_ketenagakerjaan:
          dokumen_identitas.no_bpjs_ketenagakerjaan || "",
        no_bpjs_pensiun: dokumen_identitas.no_bpjs_pensiun || "",
        kapreg: dokumen_identitas.karpeg || "",
        no_rekening: rekening_bank.no_rekening || "",
        nama_bank: rekening_bank.nama_bank || "",
        cabang_bank: rekening_bank.cabang_bank || "",
        status_aktif_id: status_kepegawaian.status_aktif?.nama_status || "",
        status_kerja: status_kepegawaian.status_kerja || "",
        jabatan_fungsional: jabatan_fungsional_aktif?.nama_jabatan || "",
        tinggi_badan: biodata_pribadi.tinggi_badan || undefined,
        berat_badan: biodata_pribadi.berat_badan || undefined,
      });
    }
  }, [getBiodata, form]);

  const FormDataPegawai = ({
    show,
    form,
    isReadOnly,
  }: FormDataPegawaiProps) => {
    return (
      <div>
        <div className={show === "kepegawaian" ? "block" : "hidden"}>
          <KepegawaianSection form={form} isReadOnly={isReadOnly} />
        </div>
        <div className={show === "domisili" ? "block" : "hidden"}>
          <DomisiliSection form={form} isReadOnly={isReadOnly} />
        </div>
        <div className={show === "rekening-bank" ? "block" : "hidden"}>
          <RekeningBankSection form={form} isReadOnly={isReadOnly} />
        </div>
        <div className={show === "dokumen" ? "block" : "hidden"}>
          <DokumenSection form={form} isReadOnly={isReadOnly} />
        </div>
        <div className={show === "detail-kendaraan" ? "block" : "hidden"}>
          <DetailKendaraanSection form={form} isReadOnly={isReadOnly} />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-10 mb-10">
      <Title title="Data Pegawai" />
      <Form {...form}>
        <form>
          <Card className="mt-5 border-t-yellow-uika border-t-3">
            <CardContent className="mt-10">
              <div className="flex flex-col md:grid md:grid-rows-6 md:grid-flow-col gap-5">
                {/* PERBAIKAN KUNCI (4): Tambahkan 'readOnly' atau 'disabled' pada semua field */}
                <FormFieldInput
                  form={form}
                  label="NIP"
                  name="nip"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
                <FormFieldInput
                  form={form}
                  label="NUPTK"
                  name="nuptk"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
                <FormFieldInput
                  form={form}
                  label="Nama Lengkap"
                  name="nama"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
                <FormFieldInput
                  form={form}
                  label="Gelar Depan"
                  name="gelar_depan"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
                <FormFieldInput
                  form={form}
                  label="Gelar Belakang"
                  name="gelar_belakang"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
                <FormFieldInput
                  label="Jenis Kelamin"
                  name="jenis_kelamin"
                  form={form}
                  type="radio"
                  options={[
                    { label: "Laki-laki", value: "Laki-laki" },
                    { label: "Perempuan", value: "Perempuan" },
                  ]}
                  labelStyle="text-[#3F6FA9]"
                />
                <FormFieldInput
                  form={form}
                  label="Agama"
                  name="agama"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
                <FormFieldInput
                  form={form}
                  label="Tempat Lahir"
                  name="tempat_lahir"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
                <FormFieldInput
                  form={form}
                  type="date"
                  label="Tgl Lahir"
                  name="tanggal_lahir"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
                <FormFieldInput
                  form={form}
                  label="Status Nikah"
                  name="kode_status_pernikahan"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
                <FormFieldInput
                  form={form}
                  label="Golongan Darah"
                  name="golongan_darah"
                  labelStyle="text-[#3F6FA9]"
                  readOnly
                />
              </div>

              <div className="w-full flex flex-col gap-2 mt-10">
                <div className="w-full grid grid-cols-2 grid-flow-row lg:flex gap-2">
                  {pegawaiDetailMenu.map((item, index) => (
                    <Button
                      key={index}
                      type="button"
                      onClick={() => setShow(item.show)}
                      className={`${
                        item.title === "Alamat Domisili & Kontak"
                          ? "col-span-2 min-[506px]:col-span-1"
                          : ""
                      } flex-1 text-xs md:text-sm cursor-pointer bg-[#D5D5D5] text-[#000] hover:bg-[#0A5B4F] hover:text-white lg:rounded-t-2xl lg:rounded-b-none transition-all duration-300 ${
                        show === item.show ? "bg-[#106D63] text-white" : ""
                      }`}
                    >
                      {item.title}
                    </Button>
                  ))}
                </div>
                <div className="w-full pb-10">
                  <FormDataPegawai show={show} form={form} isReadOnly={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default BiodataUser;
