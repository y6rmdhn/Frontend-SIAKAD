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
import { useState } from "react";
import adminServices from "../../../../services/admin.services";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import putReferensiServices from "@/services/put.admin.referensi";
import { toast } from "sonner";
import dosenServices from "@/services/dosen.services";

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

const cleanOptionalString = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((val) => (val === "" ? null : val));

// DIPERBARUI: Skema Zod disesuaikan untuk edit
const dataPegawaiSchema = z.object({
  id: z.string().optional(),
  nip: z.string().trim().min(9, "NIP harus terdiri minimal dari 9 digit angka"),
  nidn: cleanOptionalString,
  nuptk: cleanOptionalString,
  nama: z.string().trim().min(3, "Nama lengkap minimal 3 karakter"),
  gelar_depan: cleanOptionalString,
  gelar_belakang: cleanOptionalString,
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], {
    required_error: "Jenis kelamin wajib dipilih",
  }),
  agama: z.string().min(1, "Agama wajib diisi"),
  tempat_lahir: z.string().trim().min(1, "Tempat lahir wajib diisi"),
  tanggal_lahir: z.coerce.date({
    errorMap: () => ({ message: "Format tanggal lahir tidak valid" }),
  }),
  kode_status_pernikahan: z.string().min(1, "Status pernikahan wajib dipilih"),
  golongan_darah: cleanOptionalString,
  unit_kerja_id: z.string().min(1, "Unit kerja wajib dipilih"),
  status_aktif_id: z.string().min(1, "Status aktif wajib dipilih"),
  status_kerja: z.string().min(1, "Hubungan kerja wajib dipilih"),
  email_pegawai: z.string().email("Format email tidak valid"),
  email_pribadi: optionalEmail,
  golongan: cleanOptionalString,
  jabatan_fungsional_id: cleanOptionalString,
  no_ktp: cleanOptionalString,
  no_kk: cleanOptionalString,
  warga_negara: z.string().min(1, "Warga negara wajib diisi"),
  provinsi: z.string().min(1, "Provinsi wajib dipilih"),
  kota: z.string().min(1, "Kota wajib dipilih"),
  kecamatan: z.string().min(1, "Kecamatan wajib dipilih"),
  alamat_domisili: z.string().trim().min(10, "Alamat minimal 10 karakter"),
  kode_pos: cleanOptionalString,
  suku: cleanOptionalString,
  jarak_rumah_domisili: cleanOptionalString,
  no_whatsapp: z
    .string()
    .trim()
    .regex(
      /^08[0-9]{8,11}$/,
      "Format No. Telpon Whatsapp tidak valid (contoh: 081234567890)"
    ),
  no_handphone: cleanOptionalString,
  nama_bank: cleanOptionalString,
  cabang_bank: cleanOptionalString,
  nama_rekening: cleanOptionalString,
  no_rekening: cleanOptionalString,
  kapreg: cleanOptionalString,
  file_kapreg: fileSchema,
  npwp: cleanOptionalString,
  file_npwp: fileSchema,
  file_rekening: fileSchema,
  file_kk: fileSchema,
  file_ktp: fileSchema,
  file_sertifikasi_dosen: fileSchema,
  no_bpjs: cleanOptionalString,
  file_bpjs: fileSchema,
  no_bpjs_ketenagakerjaan: cleanOptionalString,
  file_bpjs_ketenagakerjaan: fileSchema,
  no_bpjs_pensiun: cleanOptionalString,
  file_tanda_tangan: fileSchema,
  nomor_polisi: cleanOptionalString,
  jenis_kendaraan: cleanOptionalString,
  merk_kendaraan: cleanOptionalString,
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
  role_id: z.string().min(1, "Role ID wajib ada"),
});

export type DataPegawaiSchema = z.infer<typeof dataPegawaiSchema>;

interface FormDataPegawaiProps {
  show: string;
  form: UseFormReturn<DataPegawaiSchema>;
}

// --- Komponen Utama ---

const EditBiodataPageUserComponent = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState<string>("kepegawaian");
  const params = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["pegawai-edit", params.id],
    queryFn: async () => {
      const response = await dosenServices.getProfilPegawai();
      console.log(response.data);
      return response.data.data;
    },
    enabled: !!params.id,
  });

  const { mutate: putData, isPending } = useMutation({
    mutationFn: (data: DataPegawaiSchema) =>
      dosenServices.updateProfilPegawai(data),
    onSuccess: () => {
      toast.success("Data pegawai berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["pegawai-edit", params.id] });
      queryClient.invalidateQueries({ queryKey: ["biodata-dosen"] });
    },
    onError: (error: any) => {
      toast.error(`Gagal memperbarui data: ${error.response?.data?.message || error.message}`);
    },
  });

  // DIPERBARUI: Default values langsung di useForm
  const form = useForm<DataPegawaiSchema>({
    resolver: zodResolver(dataPegawaiSchema),
    // @ts-ignore
    values: data
      ? {
        // Data pribadi
        id: data.id,
        nip: data.nip || "",
        nidn: data.nidn || "",
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
        kode_status_pernikahan: data.status_pernikahan_id?.toString() || "",
        golongan_darah: data.golongan_darah || "",

        // Data kepegawaian (Read-Only)
        unit_kerja_id: data.unit_kerja_id?.nama || "",
        status_aktif_id: data.status_aktif_id?.nama || "",
        status_kerja: data.hubungan_kerja_id?.nama || "",
        email_pegawai: data.email_pegawai || "",
        email_pribadi: data.email_pribadi || "",
        jabatan_fungsional_id: data.jabatan_fungsional?.nama || "",
        pangkat_id: data.pangkat_id?.nama || "",
        eselon_id: data.eselon_id?.nama || "",
        role_id: data.role_id?.nama || "",

        // Data domisili
        no_ktp: data.no_ktp || "",
        no_kk: data.no_kk || "",
        warga_negara: data.warga_negara || "WNI",
        provinsi: data.provinsi || "",
        kota: data.kota || "",
        kecamatan: data.kecamatan || "",
        alamat_domisili: data.alamat_domisili || "",
        kode_pos: data.kode_pos || "",
        suku: data.suku_id?.toString() || "",
        jarak_rumah_domisili: data.jarak_rumah_domisili?.toString() || "",
        no_whatsapp: data.no_whatsapp || "",
        no_handphone: data.no_handphone || "",

        // Data rekening
        nama_bank: data.nama_bank || "",
        cabang_bank: data.cabang_bank || "",
        nama_rekening: data.atas_nama_rekening || "",
        no_rekening: data.no_rekening || "",

        // Data dokumen
        npwp: data.npwp || "",
        kapreg: data.karpeg || "",
        no_bpjs: data.no_bpjs || "",
        no_bpjs_ketenagakerjaan: data.no_bpjs_ketenagakerjaan || "",
        no_bpjs_pensiun: data.no_bpjs_pensiun || "",

        // Data kendaraan
        nomor_polisi: data.nomor_polisi || "",
        jenis_kendaraan: data.jenis_kendaraan || "",
        merk_kendaraan: data.merk_kendaraan || "",
        tinggi_badan: data.tinggi_badan
          ? Number(data.tinggi_badan)
          : undefined,
        berat_badan: data.berat_badan ? Number(data.berat_badan) : undefined,

        // File fields
        file_kapreg: undefined,
        file_npwp: undefined,
        file_rekening: undefined,
        file_kk: undefined,
        file_ktp: undefined,
        file_sertifikasi_dosen: undefined,
        file_bpjs: undefined,
        file_bpjs_ketenagakerjaan: undefined,
        file_tanda_tangan: undefined,
      }
      : {
        nip: "",
        nidn: "",
        nuptk: "",
        nama: "",
        warga_negara: "",
      },
  });

  const onSubmit = (formData: DataPegawaiSchema) => {
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

  const FormDataPegawai = ({ show, form }: FormDataPegawaiProps) => (
    <div>
      <div style={{ display: show === "kepegawaian" ? "block" : "none" }}>
        <KepegawaianSection form={form} isReadOnly={false} isLecturerEdit={true} />
      </div>
      <div style={{ display: show === "domisili" ? "block" : "none" }}>
        <DomisiliSection form={form} />
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
                />
                <FormFieldInput
                  form={form}
                  label="NIDN"
                  name="nidn"
                  labelStyle="text-[#3F6FA9]"
                  required={false}
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
                  queryFn={(page) => adminServices.getAgama({ page, is_dropdown: true })}
                  itemValue="nama"
                  itemLabel="nama"
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
                  queryFn={(page) => adminServices.getStatusPernikahan({ page, is_dropdown: true })}
                  itemValue="id"
                  itemLabel="nama"
                />
                <InfiniteScrollSelect
                  form={form}
                  label="Golongan Darah"
                  name="golongan_darah"
                  labelStyle="text-[#3F6FA9]"
                  placeholder="--Pilih Golongan Darah--"
                  required={false}
                  queryKey="golongan-darah-select"
                  queryFn={(page) => adminServices.getGolonganDarah({ page, is_dropdown: true })}
                  itemValue="golongan_darah"
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
                      className={`${item.title === "Alamat Domisili & Kontak"
                        ? "col-span-2 min-[506px]:col-span-1"
                        : ""
                        } flex-1 cursor-pointer rounded-lg bg-[#D5D5D5] text-xs text-[#000] hover:bg-[#0A5B4F] hover:text-white md:text-sm lg:rounded-b-none lg:rounded-t-2xl transition-all duration-300 ${show === item.show ? "bg-[#106D63] text-white" : ""
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

export default EditBiodataPageUserComponent;
