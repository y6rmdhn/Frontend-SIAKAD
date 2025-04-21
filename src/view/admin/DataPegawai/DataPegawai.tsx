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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormFieldInput } from "@/components/commons/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/commons/CustomFormSelect/CustomFormSelect";

const DataPegawai = () => {
  const navigate = useNavigate();
  const form = useForm();

  return (
    <div className="mt-10 mb-10">
      <h1 className="text-2xl font-semibold">Data Pegawai</h1>
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
                form={form}
                label="Jenis Kelamin"
                name="jelas_kelamin"
                labelStyle="text-[#3F6FA9]"
                required={false}
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
            <CardFooter>
              <Tabs defaultValue="kepegawaian" className="w-full mt-14">
                <TabsList className="w-full">
                  <TabsTrigger className="cursor-pointer" value="kepegawaian">
                    Kepegawaian
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="domisili">
                    Alamat Domisili & Kontak
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="kependudukan">
                    Kependudukan
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="rekening-bank">
                    Rekening Bank
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="dokumen">
                    Dokumen
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="lain-lain">
                    Lain-Lain
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="kepegawaian"
                  className="grid grid-rows-5 grid-flow-col gap-5 mt-10"
                >
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
                    label="Email Perguruan Tinggi"
                    name="email_pergguruan_tinggi"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="No Akun finger"
                    name="no_akun_finger"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
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
                    placeholder="--Pilih Jabatan Akademik--"
                    required={true}
                  />
                </TabsContent>
                <TabsContent
                  value="domisili"
                  className="grid grid-rows-6 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldInput
                    form={form}
                    label="File Sertifikasi Dosen"
                    name="file_sertifikasi_dosen"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
                  <FormFieldSelect
                    form={form}
                    label="Provinsi"
                    name="pilih_provinsi"
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
                    label="Alamat / Jalan"
                    name="alamat"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="Kode Pos"
                    name="alamat"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="Jarak Rumah (KM)"
                    name="alamat"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    placeholder="Tuliskan Jarak dalam KM"
                  />
                  <FormFieldInput
                    form={form}
                    label="No.Telpon"
                    name="no_telpon"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="No.Telpon Kantor"
                    name="no_telpon_kantor"
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
                  <FormFieldSelect
                    form={form}
                    label="Kepemilikan No.Hp Utama"
                    name="kecamatan"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "User", value: "user" },
                      { label: "Guest", value: "guest" },
                    ]}
                    placeholder="--Pilih Kepemilikan No Hp Utama--"
                    required={false}
                  />
                </TabsContent>
                <TabsContent
                  value="kependudukan"
                  className="grid grid-rows-6 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldInput
                    form={form}
                    label="Email Pribadi"
                    name="email_pribadi"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="No.KTP"
                    name="no_ktp"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="No.KK"
                    name="no_k"
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
                    placeholder="--Pilih Negara--"
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
                    placeholder="--Pilih Kecamatan--"
                    required={false}
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
                    label="Alamat"
                    name="alamat"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="Alamat"
                    name="alamat"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="Kode Pos"
                    name="kode_pos"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
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
                    label="file KTP"
                    name="file_ktp"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
                </TabsContent>
                <TabsContent
                  value="rekening-bank"
                  className="grid grid-rows-3 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldInput
                    form={form}
                    label="File KK"
                    name="file_kk"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
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
                    label="No Rekening"
                    name="no_rekening"
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
                    label="Cabang BANK"
                    name="cabang_bank"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                </TabsContent>
                <TabsContent
                  value="dokumen"
                  className="grid grid-rows-5 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldInput
                    form={form}
                    label="File Rekening"
                    name="file_rekening"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
                  <FormFieldInput
                    form={form}
                    label="KAPREG"
                    name="kapreg"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="File KAPREG"
                    name="file_kapreg"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
                  <FormFieldInput
                    form={form}
                    label="NPWP"
                    name="npwp"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="File NPWP"
                    name="file_npwp"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
                  <FormFieldInput
                    form={form}
                    label="No BPJS"
                    name="no_bpjs"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="No BPJS Ketenagakerjaan"
                    name="no_bpjs_ketenagaKerjaan"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="No BPJS Pensiun"
                    name="no_bpjs_pensiun"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="File BPJS"
                    name="file_bpjs"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
                  <FormFieldInput
                    form={form}
                    label="File BPJS Ketenagakerjaan"
                    name="file_bpjs_ketenagakerjaan"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
                </TabsContent>
                <TabsContent
                  value="lain-lain"
                  className="grid grid-rows-3 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldInput
                    form={form}
                    label="File BPJS Pensiun"
                    name="file_kk"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
                  <FormFieldSelect
                    form={form}
                    label="Golongan Darah"
                    name="golongan_darah"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "User", value: "user" },
                      { label: "Guest", value: "guest" },
                    ]}
                    placeholder="--Pilih Status Aktif--"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="Tinggi Badan"
                    name="tinggi_badan"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="Berat Badan (kg)"
                    name="file_kk"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />
                  <FormFieldInput
                    form={form}
                    label="File Tanda Tangan"
                    name="file_tanda_tangan"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                    type="file"
                  />
                </TabsContent>
              </Tabs>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default DataPegawai;
