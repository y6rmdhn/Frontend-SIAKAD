import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {useMutation, useQuery} from "@tanstack/react-query";
import { FaSave } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
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
import {useState} from "react";
import adminServices from "../../../../services/admin.services";
import wilayahIdServices from "@/services/binderByte.services.ts";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const fileSchema = z
    .any()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE_BYTES, `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB.`)
    .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), "Format file harus PDF, JPG, atau PNG.");

const optionalEmail = z.string().email("Format email tidak valid.").optional().or(z.literal(''));

const dataPegawaiSchema = z.object({
  // --- Data Pribadi ---
  nip: z.string().trim().length(18, "NIP harus terdiri dari 18 digit angka"),
  nuptk: z.string().trim().min(1, "NUPTK wajib diisi"),
  nama: z.string().trim().min(3, "Nama lengkap minimal 3 karakter"),
  gelar_depan: z.string().max(20, "Gelar depan maksimal 20 karakter").optional(),
  gelar_belakang: z.string().max(20, "Gelar belakang maksimal 20 karakter").optional(),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], { required_error: "Jenis kelamin wajib dipilih" }),
  agama: z.string().min(1, "Agama wajib diisi"),
  tempat_lahir: z.string().trim().min(1, "Tempat lahir wajib diisi"),
  tanggal_lahir: z.coerce.date({ errorMap: () => ({ message: "Format tanggal lahir tidak valid" }) }),
  kode_status_pernikahan: z.string().min(1, "Status pernikahan wajib dipilih"),
  golongan_darah: z.string().optional(),

  // --- Kepegawaian ---
  unit_kerja_id: z.string().min(1, "Unit kerja wajib dipilih"),
  status_aktif_id: z.string().min(1, "Status aktif wajib dipilih"),
  status_kerja: z.string().min(1, "Hubungan kerja wajib dipilih"),
  email_pegawai: z.string().email("Format email tidak valid"),
  email_pribadi: optionalEmail,
  golongan: z.string().optional(),
  jabatan_fungsional: z.string().optional(),

  // --- Domisili ---
  no_ktp: z.string().trim().length(16, "No. KTP harus 16 digit").optional().or(z.literal('')),
  no_kk: z.string().trim().length(16, "No. KK harus 16 digit").optional().or(z.literal('')),
  warga_negara: z.string().min(1, "Warga negara wajib diisi"),
  provinsi: z.string().min(1, "Provinsi wajib dipilih"),
  kota: z.string().min(1, "Kota wajib dipilih"),
  kecamatan: z.string().min(1, "Kecamatan wajib dipilih"),
  alamat_domisili: z.string().trim().min(10, "Alamat minimal 10 karakter"),
  kode_pos: z.string().trim().length(5, "Kode pos harus 5 digit").optional().or(z.literal('')),
  suku: z.string().optional(),
  jarak_rumah_domisili: z.string().optional(),
  no_handphone: z.string().trim().regex(/^08[0-9]{8,11}$/, "Format No. Telpon Utama tidak valid (contoh: 081234567890)"),
  no_telepon_domisili_kontak: z.string().trim().regex(/^08[0-9]{8,11}$/, "Format No. Whatsapp tidak valid").optional().or(z.literal('')),

  // --- Rekening Bank ---
  nama_bank: z.string().optional(),
  cabang_bank: z.string().optional(),
  nama_rekening: z.string().optional(),
  no_rekening: z.string().optional(),

  // --- Dokumen ---
  kapreg: z.string().max(50, "Kapreg maksimal 50 karakter").optional(),
  file_kapreg: fileSchema,
  npwp: z.string().trim().length(15, "NPWP harus 15 digit").optional().or(z.literal('')),
  file_npwp: fileSchema,
  file_rekening: fileSchema,
  file_kk: fileSchema,
  file_ktp: fileSchema,
  file_sertifikasi_dosen: fileSchema,
  no_bpjs: z.string().max(20, "No. BPJS maksimal 20 digit").optional(),
  file_bpjs: fileSchema,
  no_bpjs_ketenagakerjaan: z.string().max(20, "No. BPJS Ketenagakerjaan maksimal 20 digit").optional(),
  file_bpjs_ketenagakerjaan: fileSchema,
  no_bpjs_pensiun: z.string().max(20, "No. BPJS Pensiun maksimal 20 digit").optional(),
  file_tanda_tangan: fileSchema,

  // --- Kendaraan & Fisik ---
  nomor_polisi: z.string().max(10, "Nomor polisi maksimal 10 digit").optional(),
  jenis_kendaraan: z.string().max(20, "Jenis kendaraan maksimal 20 karakter").optional(), // max(1) sepertinya terlalu pendek
  tinggi_badan: z.coerce.number({ invalid_type_error: "Tinggi badan harus angka" }).positive("Tinggi badan harus positif").max(300, "Tinggi badan tidak wajar").optional(),
  berat_badan: z.coerce.number({ invalid_type_error: "Berat badan harus angka" }).positive("Berat badan harus positif").max(500, "Berat badan tidak wajar").optional(),
});

const DataPegawai = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState<string>("kepegawaian");
  const form = useForm({
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
      no_telepon_domisili_kontak: "",
      no_handphone: "",
      nama_bank: "",
      cabang_bank: "",
      nama_rekening: "",
      no_rekening: "",
      kapreg: "",
      file_kapreg: null,
      npwp: "",
      file_npwp: null,
      file_rekening: null,
      file_kk: null,
      file_ktp: null,
      file_sertifikasi_dosen: null,
    },
    resolver: zodResolver(dataPegawaiSchema),
  });

  const selectedProvinceId = form.watch('provinsi');
  const selectedCityId = form.watch('kota');

  const { data: provincesData, isLoading: isProvincesLoading } = useQuery({
    queryKey: ['provinsi-wilayah-id'],
    queryFn: wilayahIdServices.getProvinsi,
  });

  const { data: citiesData, isLoading: isCitiesLoading } = useQuery({
    queryKey: ['kota-wilayah-id', selectedProvinceId],
    queryFn: () => wilayahIdServices.getKota(selectedProvinceId),
    enabled: !!selectedProvinceId,
  });

  const { data: kecamatanData, isLoading: isKecamatanLoading } = useQuery({
    queryKey: ['kecamatan-wilayah-id', selectedCityId],
    queryFn: () => wilayahIdServices.getKecamatan(selectedCityId),
    enabled: !!selectedCityId,
  });

  const provinceOptions = provincesData?.data?.map(prov => ({ label: prov.name, value: prov.code })) || [];
  const cityOptions = citiesData?.data?.map(city => ({ label: city.name, value: city.code })) || [];
  const kecamatanOptions = kecamatanData?.data?.map(kec => ({ label: kec.name, value: kec.code })) || [];

  const { mutate: postDataPegawai, isPending } = useMutation({
    mutationFn: (data: FormData) => postPegawaiServices.dataPegawai(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
    },
    onError: (error) => {
      console.error("Gagal menyimpan:", error);
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
    }
  });


    const {data: statusPernikahanData} = useQuery({
        queryKey: ["status-pernikahan-select"],
        queryFn: async () => {
            const response = await adminServices.getStatusPernikahanReferensi();

            return response.data.data;
        },
    });
    const statusPernikahanOptions = statusPernikahanData?.data?.map(item => ({
        label: item.nama_status,
        value: item.id.toString(),
    })) || [];

  const handleSubmitDataPegawai = (values) => {
    const valuesForApi = { ...values };

    const provinceName = provincesData?.data?.find(p => p.code === values.provinsi)?.name;
    if (provinceName) {
      valuesForApi.provinsi = provinceName;
    }

    const cityName = citiesData?.data?.find(c => c.code === values.kota)?.name;
    if (cityName) {
      valuesForApi.kota = cityName;
    }

    const kecamatanName = kecamatanData?.data?.find(k => k.code === values.kecamatan)?.name;
    if (kecamatanName) {
      valuesForApi.kecamatan = kecamatanName;
    }

    const formData = new FormData();
    Object.keys(valuesForApi).forEach((key) => {
      const value = valuesForApi[key];
      if (value !== null && value !== undefined && value !== '') {
        if (key === 'tanggal_lahir' && value instanceof Date) {
          const formattedDate = value.toISOString().split('T')[0];
          formData.append(key, formattedDate);
        } else {
          formData.append(key, value);
        }
      }
    });

    console.log("Data yang dikirim ke API:", Object.fromEntries(formData));
    postDataPegawai(formData);
  };

  const FormDataPegawai = ({ show, form }) => {
    return (
        <div>
          <div style={{ display: show === 'kepegawaian' ? 'block' : 'none' }}>
            <KepegawaianSection form={form} />
          </div>
          <div style={{ display: show === 'domisili' ? 'block' : 'none' }}>
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
          <div style={{ display: show === 'rekening-bank' ? 'block' : 'none' }}>
            <RekeningBankSection form={form} />
          </div>
          <div style={{ display: show === 'dokumen' ? 'block' : 'none' }}>
            <DokumenSection form={form} />
          </div>
          <div style={{ display: show === 'detail-kendaraan' ? 'block' : 'none' }}>
            <DetailKendaraanSection form={form} />
          </div>
        </div>
    );
  };

  return (
      <div className="mt-10 mb-10">
        <Title title="Data Pegawai" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(
              handleSubmitDataPegawai,

              // (errors) => {
              //   console.error("VALIDATION FAILED:", errors);
              //   toast.error("Data tidak valid. Silakan periksa kembali semua isian form Anda.");
              // }
          )}>
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
                      {isPending ? "Menyimpan..." : (
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
                  <FormFieldInput form={form} label="NIP" name="nip" labelStyle="text-[#3F6FA9]" required={true} />
                  <FormFieldInput form={form} label="NUPTK" name="nuptk" labelStyle="text-[#3F6FA9]" required={true} />
                  <FormFieldInput form={form} label="Nama Lengkap" name="nama" labelStyle="text-[#3F6FA9]" required={true} />
                  <FormFieldInput form={form} label="Gelar Depan" name="gelar_depan" labelStyle="text-[#3F6FA9]" required={false} />
                  <FormFieldInput form={form} label="Gelar Belakang" name="gelar_belakang" labelStyle="text-[#3F6FA9]" required={false} />
                  <FormFieldInput
                      label="Jenis Kelamin"
                      name="jenis_kelamin"
                      form={form}
                      required={false}
                      type="radio"
                      options={[{ label: "Laki-laki", value: "Laki-laki" }, { label: "Perempuan", value: "Perempuan" }]}
                      labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput form={form} label="Agama" name="agama" labelStyle="text-[#3F6FA9]" required={true} />
                  <FormFieldInput form={form} label="Tempat Lahir" name="tempat_lahir" labelStyle="text-[#3F6FA9]" required={false} />
                  <FormFieldInput form={form} type="date" label="Tgl Lahir"  name="tanggal_lahir" labelStyle="text-[#3F6FA9]" required={true} />
                  <FormFieldSelect
                      form={form}
                      label="Status Nikah"
                      name="kode_status_pernikahan"
                      placeholder="--Pilih--"
                      options={statusPernikahanOptions}
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                  />
                  <FormFieldSelect
                      form={form}
                      label="Golongan Darah"
                      name="golongan_darah"
                      placeholder="--Pilih--"
                      options={[{ label: "A", value: "A" }, { label: "B", value: "B" }, { label: "AB", value: "AB" }, { label: "O", value: "O" }]}
                      labelStyle="text-[#3F6FA9]"
                      required={false}
                  />
                </div>

                {/* Bagian Menu Tabbed dan Kontennya dipindahkan ke sini */}
                <div className="w-full flex flex-col gap-2 mt-10">
                  <div className="w-full grid grid-cols-2 grid-flow-row  lg:flex gap-2">
                    {pegawaiDetailMenu.map((item, index) => (
                        <Button
                            key={index}
                            type="button"
                            onClick={() => setShow(item.show)}
                            className={`${item.title === "Alamat Domisili & Kontak" ? "col-span-2 min-[506px]:col-span-1" : ""} flex-1 text-xs md:text-sm cursor-pointer bg-[#D5D5D5] text-[#000] hover:bg-[#0A5B4F] hover:text-white lg:rounded-t-2xl lg:rounded-b-none transition-all duration-300 ${show === item.show ? "bg-[#106D63] text-white" : ""}`}
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