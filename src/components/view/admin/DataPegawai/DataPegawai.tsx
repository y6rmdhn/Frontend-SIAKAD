import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import pegawaiDetailMenu from "@/constant/PegawaiDetailMenu";
import { useEffect, useRef, useState } from "react";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";

const DataPegawai = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState<string>("kepegawaian");
  const form = useForm();

  const cardFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardFooterRef.current) {
      cardFooterRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [show]);

  return (
    <div className="mt-10 mb-10">
      <h1 className="text-2xl font-normal">Data Pegawai</h1>
      <Form {...form}>
        <form>
          <Card className="mt-5  border-t-yellow-uika border-t-3">
            <CardHeader>
              <div className="flex justify-between">
                <div className="relative">
                  <Input className="w-2xs pr-8" placeholder="Search" />
                  <FiSearch className="absolute -translate-y-1/2 top-1/2 right-2" />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => navigate("/admin/pegawai")}
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer"
                  >
                    <IoIosArrowBack />
                    Kembali ke Daftar
                  </Button>

                  <Button
                    type="submit"
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer"
                  >
                    <FaSave />
                    Simpan
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-10 grid grid-rows-5 grid-flow-col gap-5">
              <FormFieldInput
                form={form}
                label="NIP"
                name="nip"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Nama Lengkap"
                name="nama_lengkap"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Gelar Depan"
                name="gelar_depan"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Gelar_Belakang"
                name="gelar_belakang"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                label="Jenis Kelamin"
                name="jenis_kelamin"
                form={form}
                required={false}
                type="radio"
                options={[
                  { label: "Laki-laki", value: "lk" },
                  { label: "Perempuan", value: "pr" },
                ]}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Agama"
                name="agama"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Tempat Lahir"
                name="tempat_lahir"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Tgl Lahir"
                name="tgl_lahir"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Status Nikah"
                name="status_nikah"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Terhubung dengan Sister"
                name="terhubung_dengan_sister"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2 w-full">
              <div className="w-full flex gap-2 mt-10">
                {pegawaiDetailMenu.map((item, index) => (
                  <Button
                    key={index}
                    type="button"
                    onClick={() => setShow(item.show)}
                    className={`flex-1 cursor-pointer bg-[#D5D5D5] text-[#000] hover:bg-[#0A5B4F] hover:text-white rounded-t-2xl rounded-b-none transition-all duration-300 ${
                      show === item.show ? "bg-[#106D63] text-white" : ""
                    }`}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
              <div ref={cardFooterRef} className="w-full pb-10">
                {show === "kepegawaian" ? (
                  <div className="grid grid-rows-4 grid-flow-col gap-4 mt-10">
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
                      required={true}
                    />
                    <FormFieldSelect
                      form={form}
                      label="Status Aktif"
                      name="status_aktif"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Status Aktif--"
                      required={true}
                    />
                    <FormFieldSelect
                      form={form}
                      label="Hubungan Kerja"
                      name="hubungan_kerja"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Hubungan Kerja--"
                      required={true}
                    />
                    <FormFieldInput
                      form={form}
                      label="Email Pegawai"
                      name="email_pegawai"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="Email Pribadi"
                      name="email_pribadi"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldSelect
                      form={form}
                      label="Golongan"
                      name="golongan"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Golongan--"
                      required={false}
                    />
                    <FormFieldSelect
                      form={form}
                      label="Jabatan Fungsional"
                      name="jabatan_fungsional"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Jabatan Fungsional--"
                      required={false}
                    />
                  </div>
                ) : show === "domisili" ? (
                  <div className="grid grid-rows-6 grid-flow-col gap-x-5 mt-10 items-center">
                    <FormFieldInput
                      form={form}
                      label="No.KTP"
                      name="np_ktp"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="No KK"
                      name="no_kk"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldSelect
                      form={form}
                      label="Warga Negara"
                      name="warga_negara"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Warga Negara--"
                      required={true}
                    />
                    <FormFieldSelect
                      form={form}
                      label="Provinsi"
                      name="provinsi"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Provinsi--"
                      required={false}
                    />
                    <FormFieldSelect
                      form={form}
                      label="Kota"
                      name="kota"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Kota--"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="Alamat / Jalan"
                      name="alamat"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                      type="textarea"
                    />
                    <FormFieldSelect
                      form={form}
                      label="Kecamatan"
                      name="kecamatan"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Kecamatan--"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="Kode Pos"
                      name="alamat"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldSelect
                      form={form}
                      label="Suku"
                      name="suku"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Suku--"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="Jarak Rumah (KM)"
                      name="jarak_rumah"
                      labelStyle="text-[#3F6FA9]"
                      placeholder="Tuliskan Jarak dalam KM"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="No. Whatsapp"
                      name="no_whatsapp"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="No.Telpon Utama"
                      name="no_telpon_utama"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                  </div>
                ) : show === "rekening-bank" ? (
                  <div className="grid grid-rows-2 grid-flow-col gap-4 mt-10">
                    <FormFieldSelect
                      form={form}
                      label="Nama BANK"
                      name="nama_bank"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih BANK--"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="Cabang BANK"
                      name="cabang_bank"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="Atas Nama Rekening"
                      name="nama_rekening"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="No Rekening"
                      name="no_rekening"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                  </div>
                ) : show === "dokumen" ? (
                  <div className="grid grid-rows-8 grid-flow-col gap-4 mt-10 items-center">
                    <FormFieldInput
                      form={form}
                      label="KAPREG"
                      name="kapreg"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInputFile
                      form={form}
                      label="File KAPREG"
                      name="file_kapreg"
                      classname="border-none shadow-none"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="NPWP"
                      name="npwp"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInputFile
                      form={form}
                      label="File NPWP"
                      name="file_npwp"
                      classname="border-none shadow-none"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInputFile
                      form={form}
                      label="File Rekening"
                      name="file_rekening"
                      classname="border-none shadow-none"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                      type="file"
                    />
                    <FormFieldInputFile
                      form={form}
                      label="File KK"
                      name="file_kk"
                      classname="border-none shadow-none"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                      type="file"
                    />
                    <FormFieldInputFile
                      form={form}
                      label="File KTP"
                      name="file_ktp"
                      classname="border-none shadow-none"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                      type="file"
                    />
                    <FormFieldInputFile
                      form={form}
                      label="File Sertifikasi Dosen"
                      name="file_sertifikasi_dosen"
                      classname="border-none shadow-none"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                      type="file"
                    />
                    <FormFieldInput
                      form={form}
                      label="No BPJS"
                      placeholder="Masukan Nomor"
                      name="no_bpjs"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="No BPJS Ketenagakerjaan"
                      placeholder="Masukan Nomor"
                      name="no_bpjs_ketenagaKerjaan"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="No BPJS Pensiun"
                      placeholder="Masukan Nomor"
                      name="no_bpjs_pensiun"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInputFile
                      form={form}
                      label="File BPJS"
                      name="file_bpjs"
                      classname="border-none shadow-none"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                      type="file"
                    />
                    <FormFieldInputFile
                      form={form}
                      label="File BPJS Ketenagakerjaan"
                      classname="border-none shadow-none"
                      name="file_bpjs_ketenagakerjaan"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                      type="file"
                    />
                    <FormFieldInputFile
                      form={form}
                      label="File Tanda Tangan"
                      name="file_tanda_tangan"
                      classname="border-none shadow-none"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                      type="file"
                    />
                  </div>
                ) : (
                  <div className="grid grid-rows-3 grid-flow-col gap-4 mt-10 items-center">
                    <FormFieldInput
                      form={form}
                      label="Nomor Polisi"
                      name="nomor_polisi"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldSelect
                      form={form}
                      label="Jenis Kendaraan"
                      name="jenis_kendaraan"
                      labelStyle="text-[#3F6FA9]"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                        { label: "Guest", value: "guest" },
                      ]}
                      placeholder="--Pilih Jenis Kendaraan--"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="Merk Kendaraan"
                      name="merk_kendaraan"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="Berat Badan (kg)"
                      name="file_berat_badan"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                    <FormFieldInput
                      form={form}
                      label="Tinggi Badan (cm)"
                      name="file_tinggi_badan"
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                    />
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default DataPegawai;
