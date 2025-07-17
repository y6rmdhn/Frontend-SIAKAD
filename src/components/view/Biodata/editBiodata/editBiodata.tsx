import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaSave } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, UseFormReturn, FieldErrors } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import pegawaiDetailMenu from "@/constant/PegawaiDetailMenu";
import { z } from "zod";
import KepegawaianSection from "@/components/blocks/DataPegawaiForm/PegawaiSection";
import DomisiliSection from "@/components/blocks/DataPegawaiForm/Domisilisection";
import RekeningBankSection from "@/components/blocks/DataPegawaiForm/RekeningBankSection";
import DokumenSection from "@/components/blocks/DataPegawaiForm/DokumenSection";
import DetailKendaraanSection from "@/components/blocks/DataPegawaiForm/DetailKendaraanSection";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import { useState, useEffect } from "react";
import adminServices from "../../../../services/admin.services";
import wilayahIdServices from "@/services/binderByte.services.ts";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import putReferensiServices from "@/services/put.admin.referensi";
import { toast } from "sonner";
import EditBiodataPageUser from "@/pages/biodata/editBiodata";

// --- Skema Validasi dan Tipe Data ---

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const fileSchema = z
  .any()
  .optional()
  .refine(
    (file) => !file || file.size <= MAX_FILE_SIZE_BYTES,
    `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB.`
  )
  .refine(
    (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
    "Format file harus PDF, JPG, atau PNG."
  );

const optionalEmail = z
  .string()
  .email("Format email tidak valid.")
  .optional()
  .or(z.literal(""));

// DIPERBARUI: Skema Zod disesuaikan untuk edit
const dataPegawaiSchema = z.object({
  id: z.number().optional(),
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
  unit_kerja_id: z.string().min(1, "Unit kerja wajib dipilih"),
  status_aktif_id: z.string().min(1, "Status aktif wajib dipilih"),
  status_kerja: z.string().min(1, "Hubungan kerja wajib dipilih"),
  email_pegawai: z.string().email("Format email tidak valid"),
  email_pribadi: optionalEmail,
  golongan: z.string().optional(),
  // DIPERBARUI: Disesuaikan menjadi _id
  jabatan_fungsional_id: z.string().optional(),
  // DITAMBAHKAN: Validasi untuk jabatan akademik
  jabatan_akademik_id: z.string().optional(),
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
  nama_bank: z.string().optional(),
  cabang_bank: z.string().optional(),
  nama_rekening: z.string().optional(),
  no_rekening: z.string().optional(),
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
  code?: string;
}

interface FormDataPegawaiProps {
  show: string;
  form: UseFormReturn<DataPegawaiSchema>;
}

// --- Komponen Utama ---

const EditBiodataPageUser = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState<string>("kepegawaian");
  const params = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["pegawai-edit", params.id],
    queryFn: async () => {
      const response = await adminServices.getPegawaiDetailAdminPage(
        Number(params.id)
      );
      return response.data.data;
    },
    enabled: !!params.id,
  });

  const { mutate: putData, isPending } = useMutation({
    mutationFn: (data: DataPegawaiSchema) =>
      putReferensiServices.pegawai(data.id!, data),
    onSuccess: () => {
      toast.success("Data pegawai berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["pegawai-edit", params.id] });
    },
    onError: (error) => {
      toast.error(`Gagal memperbarui data: ${error.message}`);
    },
  });

  const form = useForm<DataPegawaiSchema>({
    resolver: zodResolver(dataPegawaiSchema),
    defaultValues: {
      nip: "",
      nuptk: "",
      nama: "",
    },
  });

  useEffect(() => {
    if (data) {
      // DIPERBARUI: form.reset disesuaikan dengan skema baru
      form.reset({
        id: data.id,
        nip: data.nip || "",
        nuptk: data.nuptk || "",
        nama: data.nama || "",
        gelar_depan: data.gelar_depan || "",
        gelar_belakang: data.gelar_belakang || "",
        jenis_kelamin:
          data.jenis_kelamin === "L"
            ? "Laki-laki"
            : data.jenis_kelamin === "P"
            ? "Perempuan"
            : undefined,
        agama: data.agama || "",
        tempat_lahir: data.tempat_lahir || "",
        tanggal_lahir: data.tanggal_lahir
          ? new Date(data.tanggal_lahir)
          : undefined,
        kode_status_pernikahan: data.kode_status_pernikahan?.toString() || "",
        golongan_darah: data.golongan_darah || "",
        unit_kerja_id: data.unit_kerja_id?.toString() || "",
        status_aktif_id: data.status_aktif_id?.toString() || "",
        status_kerja: data.status_kerja || "",
        email_pegawai: data.email_pegawai || "",
        email_pribadi: data.email_pribadi || "",
        // DITAMBAHKAN: Mengisi jabatan fungsional dan akademik
        jabatan_fungsional_id: data.jabatan_fungsional_id?.toString() || "",
        jabatan_akademik_id: data.jabatan_akademik_id?.toString() || "",
        no_ktp: data.no_ktp || "",
        no_kk: data.no_kk || "",
        warga_negara: "WNI",
        alamat_domisili: data.alamat_domisili || "",
        provinsi: data.provinsi || "",
        kota: data.kota || "",
        kecamatan: data.kecamatan || "",
        kode_pos: data.kode_pos || "",
        suku: data.suku_id?.toString() || "",
        jarak_rumah_domisili: data.jarak_rumah_domisili?.toString() || "",
        no_whatsapp: data.no_whatsapp || "",
        no_handphone: data.no_handphone || "",
        nama_bank: data.nama_bank || "",
        cabang_bank: data.cabang_bank || "",
        no_rekening: data.no_rekening || "",
        npwp: data.npwp || "",
        kapreg: data.kapreg || "",
        no_bpjs: data.no_bpjs || "",
        no_bpjs_ketenagakerjaan: data.no_bpjs_ketenagakerjaan || "",
        nomor_polisi: data.nomor_polisi || "",
        jenis_kendaraan: data.jenis_kendaraan || "",
        tinggi_badan: data.tinggi_badan ? Number(data.tinggi_badan) : undefined,
        berat_badan: data.berat_badan ? Number(data.berat_badan) : undefined,
      });
    }
  }, [data, form]);

  const onSubmit = (formData: DataPegawaiSchema) => {
    // Tidak perlu FormData, kirim objek JSON langsung
    putData(formData);
  };

  const onInvalid = (errors: FieldErrors<DataPegawaiSchema>) => {
    const firstErrorField = Object.keys(errors)[0] as keyof DataPegawaiSchema;
    if (firstErrorField) {
      const errorMessage = errors[firstErrorField]?.message;
      const formattedFieldName = firstErrorField
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      toast.error(`${formattedFieldName}: ${errorMessage}`);
    } else {
      toast.error("Data tidak valid, silakan periksa kembali isian Anda.");
    }
  };

  // Kode untuk fetching wilayah tidak berubah
  const selectedProvinceId = form.watch("provinsi");
  const selectedCityId = form.watch("kota");

  const { data: provincesData, isLoading: isProvincesLoading } = useQuery({
    queryKey: ["provinsi-wilayah-id"],
    queryFn: wilayahIdServices.getProvinsi,
  });
  const provinceOptions =
    provincesData?.data?.map((prov: WilayahItem) => ({
      label: prov.name,
      value: prov.code,
    })) || [];

  const { data: citiesData, isLoading: isCitiesLoading } = useQuery({
    queryKey: ["kota-wilayah-id", selectedProvinceId],
    queryFn: () => wilayahIdServices.getKota(selectedProvinceId!),
    enabled: !!selectedProvinceId,
  });
  const cityOptions =
    citiesData?.data?.map((city: WilayahItem) => ({
      label: city.name,
      value: city.code,
    })) || [];

  const { data: kecamatanData, isLoading: isKecamatanLoading } = useQuery({
    queryKey: ["kecamatan-wilayah-id", selectedCityId],
    queryFn: () => wilayahIdServices.getKecamatan(selectedCityId!),
    enabled: !!selectedCityId,
  });
  const kecamatanOptions =
    kecamatanData?.data?.map((kec: WilayahItem) => ({
      label: kec.name,
      value: kec.code,
    })) || [];

  const FormDataPegawai = ({ show, form }: FormDataPegawaiProps) => (
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
      <div style={{ display: show === "detail-kendaraan" ? "block" : "none" }}>
        <DetailKendaraanSection form={form} />
      </div>
    </div>
  );

  return (
    <div className="mt-10 mb-10">
      <Title title="Data Pegawai" subTitle="Edit Pegawai" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          <Card className="mt-5 border-t-yellow-uika border-t-3">
            <CardHeader>
              <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                <div className="w-full md:w-auto lg:w-2xs">
                  <SearchInput />
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2 md:w-auto md:flex-row mt-5 md:mt-0">
                  <Button
                    type="button"
                    onClick={() => navigate("/biodata")}
                    className="w-full cursor-pointer bg-green-light-uika hover:bg-[#329C59] md:w-auto"
                  >
                    <IoIosArrowBack /> Kembali ke Daftar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full cursor-pointer bg-green-light-uika hover:bg-[#329C59] md:w-auto"
                  >
                    {isPending ? (
                      "Menyimpan..."
                    ) : (
                      <span className="flex items-center gap-2">
                        <FaSave /> Simpan
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="mt-10">
              <div className="flex flex-col gap-5 md:grid md:grid-flow-col md:grid-rows-6">
                <FormFieldInput
                  form={form}
                  label="NIP"
                  name="nip"
                  labelStyle="text-[#3F6FA9]"
                  required={true}
                  readOnly
                />
                <FormFieldInput
                  form={form}
                  label="NUPTK"
                  name="nuptk"
                  labelStyle="text-[#3F6FA9]"
                  required={true}
                    readOnly
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
                  readOnly
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

              <div className="mt-10 flex w-full flex-col gap-2">
                <div className="grid w-full grid-cols-2 grid-flow-row gap-2 lg:flex">
                  {pegawaiDetailMenu.map((item, index) => (
                    <Button
                      key={index}
                      type="button"
                      onClick={() => setShow(item.show)}
                      className={`${
                        item.title === "Alamat Domisili & Kontak"
                          ? "col-span-2 min-[506px]:col-span-1"
                          : ""
                      } flex-1 cursor-pointer rounded-lg bg-[#D5D5D5] text-xs text-[#000] hover:bg-[#0A5B4F] hover:text-white md:text-sm lg:rounded-b-none lg:rounded-t-2xl transition-all duration-300 ${
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

export default EditBiodataPageUser;
