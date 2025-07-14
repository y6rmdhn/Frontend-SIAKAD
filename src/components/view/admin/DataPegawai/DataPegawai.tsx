import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSave } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import pegawaiDetailMenu from "@/constant/PegawaiDetailMenu";
import { z } from "zod";
import { toast } from "sonner";
import postPegawaiServices from "@/services/create.pegawai.ts";
import KepegawaianSection from "@/components/blocks/DataPegawaiForm/PegawaiSection";
import DomisiliSection from "@/components/blocks/DataPegawaiForm/Domisilisection";
import RekeningBankSection from "@/components/blocks/DataPegawaiForm/RekeningBankSection";
import DokumenSection from "@/components/blocks/DataPegawaiForm/DokumenSection";
import DetailKendaraanSection from "@/components/blocks/DataPegawaiForm/DetailKendaraanSection";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import { useState } from "react";
import adminServices from "../../../../services/admin.services";
import wilayahIdServices from "@/services/binderByte.services.ts";
import { AxiosError } from "axios";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// Skema untuk validasi file, sekarang hanya ada satu yang benar
export const fileSchema = z
  .any()
  .optional()
  .refine(
    (fileList) =>
      !fileList ||
      fileList.length === 0 ||
      fileList[0].size <= MAX_FILE_SIZE_BYTES,
    `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB.`
  )
  .refine(
    (fileList) =>
      !fileList ||
      fileList.length === 0 ||
      ACCEPTED_FILE_TYPES.includes(fileList[0].type),
    "Format file harus PDF, JPG, atau PNG."
  );

const optionalEmail = z
  .string()
  .email("Format email tidak valid.")
  .optional()
  .or(z.literal(""));

// Skema utama untuk data pegawai
const dataPegawaiSchema = z.object({
  // --- Data Pribadi ---
  nip: z.string().trim().length(18, "NIP harus terdiri dari 18 digit angka"),
  nuptk: z.string().trim().min(1, "NUPTK wajib diisi"),
  nama: z.string().trim().min(3, "Nama lengkap minimal 3 karakter"),
  gelar_depan: z
    .string()
    .max(20, "Gelar depan maksimal 20 karakter")
    .optional(),
  gelar_belakang: z
    .string()
    .max(20, "Gelar belakang maksimal 20 karakter")
    .optional(),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], {
    required_error: "Jenis kelamin wajib dipilih",
  }),
  agama: z.string().min(1, "Agama wajib diisi"),
  tempat_lahir: z.string().trim().min(1, "Tempat lahir wajib diisi"),
  tanggal_lahir: z.coerce.date({
    errorMap: () => ({ message: "Format tanggal lahir tidak valid" }),
  }),
  kode_status_pernikahan: z.string().min(1, "Status pernikahan wajib dipilih"),
  golongan_darah: z.string().optional(),

  // --- Kepegawaian ---
  unit_kerja_id: z.string().min(1, "Unit kerja wajib dipilih"),
  status_aktif_id: z.string().min(1, "Status aktif wajib dipilih"),
  status_kerja: z.string().min(1, "Hubungan kerja wajib dipilih"),
  email_pegawai: z.string().email("Format email tidak valid"),
  email_pribadi: optionalEmail,
  golongan: z.string().optional(),
  // DIPERBAIKI: Validasi untuk jabatan_fungsional_id diaktifkan kembali
  jabatan_fungsional_id: z.string().optional(),
  jabatan_akademik_id: z.string().optional(),

  // --- Domisili ---
  no_ktp: z
    .string()
    .trim()
    .length(16, "No. KTP harus 16 digit")
    .optional()
    .or(z.literal("")),
  no_kk: z
    .string()
    .trim()
    .length(16, "No. KK harus 16 digit")
    .optional()
    .or(z.literal("")),
  warga_negara: z.string().min(1, "Warga negara wajib diisi"),
  provinsi: z.string().min(1, "Provinsi wajib dipilih"),
  kota: z.string().min(1, "Kota wajib dipilih"),
  kecamatan: z.string().min(1, "Kecamatan wajib dipilih"),
  alamat_domisili: z.string().trim().min(10, "Alamat minimal 10 karakter"),
  kode_pos: z
    .string()
    .trim()
    .length(5, "Kode pos harus 5 digit")
    .optional()
    .or(z.literal("")),
  suku: z.string().optional(),
  jarak_rumah_domisili: z.string().optional(),
  no_whatsapp: z
    .string()
    .trim()
    .regex(
      /^08[0-9]{8,11}$/,
      "Format No. Telpon Whatsapp tidak valid (contoh: 081234567890)"
    ),
  no_handphone: z
    .string()
    .trim()
    .regex(/^08[0-9]{8,11}$/, "Format No. telpon tidak valid")
    .optional()
    .or(z.literal("")),

  // --- Rekening Bank ---
  nama_bank: z.string().optional(),
  cabang_bank: z.string().optional(),
  nama_rekening: z.string().optional(),
  no_rekening: z.string().optional(),

  // --- Dokumen (DIPERBAIKI: Menggunakan fileSchema lokal) ---
  kapreg: z.string().max(50, "Kapreg maksimal 50 karakter").optional(),
  file_kapreg: fileSchema,
  npwp: z
    .string()
    .trim()
    .length(15, "NPWP harus 15 digit")
    .optional()
    .or(z.literal("")),
  file_npwp: fileSchema,
  file_rekening: fileSchema,
  file_kk: fileSchema,
  file_ktp: fileSchema,
  file_sertifikasi_dosen: fileSchema,
  no_bpjs: z.string().max(20, "No. BPJS maksimal 20 digit").optional(),
  file_bpjs: fileSchema,
  no_bpjs_ketenagakerjaan: z
    .string()
    .max(20, "No. BPJS Ketenagakerjaan maksimal 20 digit")
    .optional(),
  file_bpjs_ketenagakerjaan: fileSchema,
  no_bpjs_pensiun: z
    .string()
    .max(20, "No. BPJS Pensiun maksimal 20 digit")
    .optional(),
  file_tanda_tangan: fileSchema,

  // --- Kendaraan & Fisik ---
  nomor_polisi: z.string().max(10, "Nomor polisi maksimal 10 digit").optional(),
  jenis_kendaraan: z
    .string()
    .max(20, "Jenis kendaraan maksimal 20 karakter")
    .optional(),
  tinggi_badan: z.coerce
    .number({ invalid_type_error: "Tinggi badan harus angka" })
    .positive("Tinggi badan harus positif")
    .max(300, "Tinggi badan tidak wajar")
    .optional(),
  berat_badan: z.coerce
    .number({ invalid_type_error: "Berat badan harus angka" })
    .positive("Berat badan harus positif")
    .max(500, "Berat badan tidak wajar")
    .optional(),
});

export type DataPegawaiSchema = z.infer<typeof dataPegawaiSchema>;

interface WilayahItem {
  name: string;
  id?: string;
}

interface FormDataPegawaiProps {
  show: string;
  form: UseFormReturn<DataPegawaiSchema>;
}

const DataPegawai = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState<string>("kepegawaian");

  const form = useForm<DataPegawaiSchema>({
    resolver: zodResolver(dataPegawaiSchema),
    defaultValues: {
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
      jabatan_fungsional_id: "",
      jabatan_akademik_id: "",
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
      file_kapreg: undefined,
      npwp: "",
      file_npwp: undefined,
      file_rekening: undefined,
      file_kk: undefined,
      file_ktp: undefined,
      file_sertifikasi_dosen: undefined,
      file_bpjs: undefined,
      file_bpjs_ketenagakerjaan: undefined,
      file_tanda_tangan: undefined,
    },
  });

  const selectedProvinceId = form.watch("provinsi");
  const selectedCityId = form.watch("kota");

  const { data: provincesData, isLoading: isProvincesLoading } = useQuery({
    queryKey: ["provinsi-wilayah-id"],
    queryFn: wilayahIdServices.getProvinsi,
  });

  const { data: citiesData, isLoading: isCitiesLoading } = useQuery({
    queryKey: ["kota-wilayah-id", selectedProvinceId],
    queryFn: () => wilayahIdServices.getKota(selectedProvinceId!),
    enabled: !!selectedProvinceId,
  });

  const { data: kecamatanData, isLoading: isKecamatanLoading } = useQuery({
    queryKey: ["kecamatan-wilayah-id", selectedCityId],
    queryFn: () => wilayahIdServices.getKecamatan(selectedCityId!),
    enabled: !!selectedCityId,
  });

  const provinceOptions =
    provincesData?.map((prov: WilayahItem) => ({
      label: prov.name,
      value: prov.id,
    })) || [];

  const cityOptions =
    citiesData?.map((city: WilayahItem) => ({
      label: city.name,
      value: city.id,
    })) || [];

  const kecamatanOptions =
    kecamatanData?.map((kec: WilayahItem) => ({
      label: kec.name,
      value: kec.id,
    })) || [];
    

  const { mutate: postDataPegawai, isPending } = useMutation({
    mutationFn: (data: FormData) => postPegawaiServices.dataPegawai(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Gagal menyimpan:", error);
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
    },
  });

  const handleSubmitDataPegawai = (values: DataPegawaiSchema) => {
    const formData = new FormData();

    // Mapping untuk mengubah ID wilayah menjadi nama
    const provinceName = provinceOptions.find(
      (p: any) => p.value === values.provinsi
    )?.label;
    const cityName = cityOptions.find(
      (c: any) => c.value === values.kota
    )?.label;
    const kecamatanName = kecamatanOptions.find(
      (k: any) => k.value === values.kecamatan
    )?.label;

    Object.keys(values).forEach((key) => {
      const formKey = key as keyof DataPegawaiSchema;
      let value = values[formKey];

      if (value instanceof FileList) {
        if (value.length > 0) {
          formData.append(formKey, value[0]);
        }
      } else if (value !== null && value !== undefined && value !== "") {
        if (formKey === "provinsi" && provinceName) {
          value = provinceName;
        } else if (formKey === "kota" && cityName) {
          value = cityName;
        } else if (formKey === "kecamatan" && kecamatanName) {
          value = kecamatanName;
        }

        if (key === "tanggal_lahir" && value instanceof Date) {
          formData.append(key, value.toISOString().split("T")[0]);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    console.log("Data yang dikirim ke API:", Object.fromEntries(formData));
    postDataPegawai(formData);
  };

  const onInvalid = (errors: any) => {
    console.error("Validation Errors:", errors);
    toast.error("Validasi gagal, silakan periksa kembali isian form Anda.");
  };

  const FormDataPegawai = ({ show, form }: FormDataPegawaiProps) => {
    return (
      <div>
        <div style={{ display: show === "kepegawaian" ? "block" : "none" }}>
          <KepegawaianSection form={form} />
        </div>
        <div style={{ display: show === "domisili" ? "block" : "none" }}>
          <DomisiliSection
            form={form}
            provinceOptions={provinceOptions}
            cityOptions={cityOptions}
            kecamatanOptions={kecamatanOptions}
            isProvincesLoading={isProvincesLoading}
            isCitiesLoading={isCitiesLoading}
            isKecamatanLoading={isKecamatanLoading}
          />
        </div>
        <div style={{ display: show === "rekening-bank" ? "block" : "none" }}>
          <RekeningBankSection form={form} />
        </div>
        <div style={{ display: show === "dokumen" ? "block" : "none" }}>
          <DokumenSection form={form} />
        </div>
        <div
          style={{ display: show === "detail-kendaraan" ? "block" : "none" }}
        >
          <DetailKendaraanSection form={form} />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-10 mb-10">
      <Title title="Data Pegawai" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitDataPegawai, onInvalid)}>
          <Card className="mt-5 border-t-yellow-uika border-t-3">
            <CardHeader>
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                <div className="w-full md:w-auto lg:w-2xs">
                  <SearchInput />
                </div>
                <div className="flex flex-col items-center justify-center md:flex-row gap-2 w-full md:w-auto mt-5 md:mt-0">
                  <Button
                    type="button"
                    onClick={() => navigate("/admin/pegawai")}
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full md:w-auto"
                  >
                    <IoIosArrowBack />
                    Kembali ke Daftar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full md:w-auto"
                  >
                    {isPending ? (
                      "Menyimpan..."
                    ) : (
                      <span className="flex gap-2 items-center">
                        <FaSave /> Simpan
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="mt-10">
              <div className="flex flex-col md:grid md:grid-rows-6 md:grid-flow-col gap-5">
                <FormFieldInput
                  form={form}
                  label="NIP"
                  name="nip"
                  labelStyle="text-[#3F6FA9]"
                  required={true}
                />
                <FormFieldInput
                  form={form}
                  label="NUPTK"
                  name="nuptk"
                  labelStyle="text-[#3F6FA9]"
                  required={true}
                />
                <FormFieldInput
                  form={form}
                  label="Nama Lengkap"
                  name="nama"
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
                  label="Gelar Belakang"
                  name="gelar_belakang"
                  labelStyle="text-[#3F6FA9]"
                  required={false}
                />
                <FormFieldInput
                  label="Jenis Kelamin"
                  name="jenis_kelamin"
                  form={form}
                  required={true}
                  type="radio"
                  options={[
                    { label: "Laki-laki", value: "Laki-laki" },
                    { label: "Perempuan", value: "Perempuan" },
                  ]}
                  labelStyle="text-[#3F6FA9]"
                />
                <InfiniteScrollSelect
                  form={form}
                  label="Agama"
                  name="agama"
                  labelStyle="text-[#3F6FA9]"
                  placeholder="--Pilih Agama--"
                  required={true}
                  queryKey="agama"
                  queryFn={adminServices.getAgama}
                  itemValue="id"
                  itemLabel="nama_agama"
                />
                <FormFieldInput
                  form={form}
                  label="Tempat Lahir"
                  name="tempat_lahir"
                  labelStyle="text-[#3F6FA9]"
                  required={true}
                />
                <FormFieldInput
                  form={form}
                  type="date"
                  label="Tgl Lahir"
                  name="tanggal_lahir"
                  labelStyle="text-[#3F6FA9]"
                  required={true}
                />
                <InfiniteScrollSelect
                  form={form}
                  label="Status Nikah"
                  name="kode_status_pernikahan"
                  labelStyle="text-[#3F6FA9]"
                  placeholder="--Pilih Status Pernikahan--"
                  required={true}
                  queryKey="status-pernikahan-select"
                  queryFn={adminServices.getStatusPernikahan}
                  itemValue="id"
                  itemLabel="nama_status"
                />
                <InfiniteScrollSelect
                  form={form}
                  label="Golongan Darah"
                  name="golongan_darah"
                  labelStyle="text-[#3F6FA9]"
                  placeholder="--Pilih Golongan Darah--"
                  required={false}
                  queryKey="golongan-darah-select"
                  queryFn={adminServices.getGolonganDarah}
                  itemValue="id"
                  itemLabel="golongan_darah"
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
                  <FormDataPegawai show={show} form={form} />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default DataPegawai;
