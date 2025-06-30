import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import dosenServices from "@/services/dosen.services";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import postDosenServices from "@/services/create.dosen.services";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const fileSchemaNew = z
  .instanceof(FileList, { message: "File wajib diunggah." })
  .refine((files) => files?.length >= 1, "File wajib diunggah.")
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    `Ukuran file maksimal 5MB.`
  )
  .refine(
    (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    "Format file harus PDF, JPG, JPEG, atau PNG."
  );

const pendidikanFormalSchema = z.object({
  lokasi_studi: z.string({ required_error: "Lokasi studi wajib dipilih." }),
  jenjang_pendidikan_id: z.string().min(1, "Jenjang pendidikan wajib dipilih."),
  perguruan_tinggi_id: z.string().min(1, "Perguruan tinggi wajib dipilih."),
  prodi_perguruan_tinggi_id: z.string().min(1, "Program studi wajib dipilih."),
  bidang_studi: z.string().min(1, "Bidang studi wajib diisi."),
  konsentrasi: z.string().optional(),
  nisn: z.string().optional(),
  nomor_induk: z.string().optional(),
  tahun_masuk: z
    .string()
    .min(4, "Tahun masuk wajib diisi.")
    .max(4, "Format tahun tidak valid."),
  tahun_lulus: z
    .string()
    .min(4, "Tahun lulus wajib diisi.")
    .max(4, "Format tahun tidak valid."),
  tanggal_kelulusan: z
    .string()
    .min(1, "Tanggal kelulusan wajib diisi.")
    .refine((date) => new Date(date) <= new Date(), {
      message: "Tanggal kelulusan tidak boleh melebihi tanggal hari ini.",
    }),
  jumlah_semester_ditempuh: z.string().optional(),
  jumlah_sks_kelulusan: z.string().optional(),
  ipk_kelulusan: z.string().optional(),
  judul_tugas: z.string().optional(),
  keterangan: z.string().optional(),
  gelar_akademik_id: z.string().min(1, "Gelar akademik wajib dipilih."),
  letak_gelar: z.string().optional(),
  nomor_ijazah: z.string().min(1, "Nomor ijazah wajib diisi."),
  tanggal_ijazah: z.string().min(1, "Tanggal ijazah wajib diisi."),
  gelar_ijazah_negara: z.string().optional(),
  nomor_ijazah_negara: z.string().optional(),
  tanggal_ijazah_negara: z.string().optional(),
  file_ijazah: fileSchemaNew,
  file_transkrip: fileSchemaNew,
  submit_type: z.string().optional(),
});

type PendidikanFormalValues = z.infer<typeof pendidikanFormalSchema>;

const DetailPendidikanFormal = () => {
  const navigate = useNavigate();

  const form = useForm<PendidikanFormalValues>({
    resolver: zodResolver(pendidikanFormalSchema),
    defaultValues: {
      lokasi_studi: "dalam_negeri",
      submit_type: "submit",
    },
  });

  // get data
  const { data, isLoading } = useQuery({
    queryKey: ["pendidikan-formal-dosen-tambah"],
    queryFn: async () => {
      const response = await dosenServices.getDataPendidikanFormalUser();
      console.log(response.data);
      return response.data;
    },
  });

  // add data
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataPendidikanFormal(formData),
    onSuccess: (response) => {
      console.log("Server response:", response);
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/kualifikasi/pendidikan-formal");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: PendidikanFormalValues) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const aKey = key as keyof PendidikanFormalValues;
      const value = values[aKey];
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else if (value) {
        formData.append(key, String(value));
      }
    });

    mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />
        <CustomCard>
          <Skeleton className="h-40 w-full mb-6" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitData)}
          className="mt-8 space-y-8"
        >
          <CustomCard>
            {/* Card Header and Actions */}
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row mb-5">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kualifikasi/pendidikan-formal"
              >
                <Button className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika">
                  <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer"
              >
                <MdOutlineFileDownload className="mr-2" />
                Simpan Perubahan
              </Button>
            </div>

            {/* Employee Info */}
            <InfoList
              items={[
                { label: "NIP", value: data.pegawai_info.nip },
                { label: "Nama", value: data.pegawai_info.nama },
                { label: "Unit Kerja", value: data.pegawai_info.unit_kerja },
                { label: "Status", value: data.pegawai_info.status },
                {
                  label: "Jab. Akademik",
                  value: data.pegawai_info.jab_akademik,
                },
                {
                  label: "Jab. Fungsional",
                  value: data.pegawai_info.jab_fungsional,
                },
                {
                  label: "Jab. Struktural",
                  value: data.pegawai_info.jab_struktural,
                },
                { label: "Pendidikan", value: data.pegawai_info.pendidikan },
              ]}
            />

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-[#3ABC67]">
                  Data Pendidikan & Institusi
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormFieldInput
                  label="Lokasi Studi"
                  name="lokasi_studi"
                  form={form}
                  type="radio"
                  options={[
                    { value: "dalam_negeri", label: "Dalam Negeri" },
                    { value: "luar_negeri", label: "Luar Negeri" },
                  ]}
                  labelStyle="text-gray-700"
                />
                <InfiniteScrollSelect
                  form={form}
                  label="Jenjang Pendidikan"
                  name="jenjang_pendidikan_id"
                  placeholder="--Pilih Jenjang--"
                  required={false}
                  queryKey="jenjang"
                  queryFn={dosenServices.getJenjangPendidikanSelect}
                  itemValue="id"
                  itemLabel="jenjang_pendidikan"
                />
                <FormFieldSelect
                  label="Nama Perguruan Tinggi"
                  name="perguruan_tinggi_id"
                  placeholder="--Pilih Perguruan Tinggi--"
                  form={form}
                  required
                  options={[
                    { value: "1", label: "Universitas Ibn Khaldun Bogor" },
                  ]} // Dummy option
                  labelStyle="text-gray-700"
                />
                <InfiniteScrollSelect
                  form={form}
                  label="Program Studi"
                  name="prodi_perguruan_tinggi_id"
                  placeholder="--Pilih Program Studi--"
                  required={false}
                  queryKey="prodi"
                  queryFn={dosenServices.getProdiSelect}
                  itemValue="id"
                  itemLabel="nama_prodi"
                />
                <FormFieldInput
                  label="Bidang Studi"
                  name="bidang_studi"
                  form={form}
                  required
                  placeholder="Cth: Ilmu Komputer"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Konsentrasi"
                  name="konsentrasi"
                  form={form}
                  placeholder="Cth: Artificial Intelligence"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="NISN"
                  name="nisn"
                  form={form}
                  placeholder="Masukkan NISN"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Nomor Induk"
                  name="nomor_induk"
                  form={form}
                  placeholder="Masukkan Nomor Induk Mahasiswa"
                  labelStyle="text-gray-700"
                />
              </div>
            </div>

            {/* Section: Data Akademik & Kelulusan */}
            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-[#3ABC67]">
                  Data Akademik & Kelulusan
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormFieldInput
                  label="Tahun Masuk"
                  name="tahun_masuk"
                  form={form}
                  type="number"
                  placeholder="Cth: 2010"
                  required
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Tahun Lulus"
                  name="tahun_lulus"
                  form={form}
                  type="number"
                  placeholder="Cth: 2014"
                  required
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Tanggal Kelulusan"
                  name="tanggal_kelulusan"
                  type="date"
                  form={form}
                  required
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Jumlah Semester Ditempuh"
                  name="jumlah_semester_ditempuh"
                  type="number"
                  form={form}
                  placeholder="Cth: 8"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Jumlah SKS Kelulusan"
                  name="jumlah_sks_kelulusan"
                  type="number"
                  form={form}
                  placeholder="Cth: 144"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="IPK Kelulusan"
                  name="ipk_kelulusan"
                  type="number"
                  form={form}
                  placeholder="Cth: 3.75"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Judul Tugas Akhir / Skripsi / Tesis"
                  name="judul_tugas"
                  form={form}
                  type="textarea"
                  placeholder="Masukkan judul tugas akhir"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Keterangan"
                  name="keterangan"
                  form={form}
                  type="textarea"
                  placeholder="Tambahkan keterangan jika ada"
                  labelStyle="text-gray-700"
                />
              </div>
            </div>

            {/* Section: Data Ijazah & Gelar */}
            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-[#3ABC67]">
                  Data Ijazah & Gelar
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormFieldSelect
                  label="Gelar Akademik"
                  name="gelar_akademik_id"
                  placeholder="--Pilih Gelar--"
                  form={form}
                  required
                  options={[{ value: "1", label: "Sarjana Komputer (S.Kom)" }]} // Dummy option
                  labelStyle="text-gray-700"
                />
                <FormFieldSelect
                  label="Letak Gelar"
                  name="letak_gelar"
                  placeholder="--Pilih Letak Gelar--"
                  form={form}
                  options={[
                    { value: "depan", label: "Depan" },
                    { value: "belakang", label: "Belakang" },
                  ]}
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Nomor Ijazah"
                  name="nomor_ijazah"
                  form={form}
                  required
                  placeholder="Masukkan nomor ijazah"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Tanggal Ijazah"
                  name="tanggal_ijazah"
                  type="date"
                  form={form}
                  required
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Gelar Ijazah Negara"
                  name="gelar_ijazah_negara"
                  form={form}
                  placeholder="Gelar sesuai ijazah negara (jika ada)"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Nomor Ijazah Negara"
                  name="nomor_ijazah_negara"
                  form={form}
                  placeholder="Nomor ijazah negara (jika ada)"
                  labelStyle="text-gray-700"
                />
                <FormFieldInput
                  label="Tanggal Ijazah Negara"
                  name="tanggal_ijazah_negara"
                  type="date"
                  form={form}
                  labelStyle="text-gray-700"
                />
              </div>
            </div>

            {/* Section: Dokumen Pendukung */}
            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-[#3ABC67]">
                  Dokumen Pendukung
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormFieldInputFile
                  label="File Ijazah"
                  name="file_ijazah"
                  required
                  labelStyle="text-gray-700"
                />
                <FormFieldInputFile
                  label="File Transkrip Nilai"
                  name="file_transkrip"
                  required
                  labelStyle="text-gray-700"
                />
              </div>
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailPendidikanFormal;
