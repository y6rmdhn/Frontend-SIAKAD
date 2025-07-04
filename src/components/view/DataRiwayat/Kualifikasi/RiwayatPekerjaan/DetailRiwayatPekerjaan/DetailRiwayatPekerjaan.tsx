import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

// UI & Komponen Lokal
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";

import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { HiMiniTrash } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { toast } from "sonner";

import dosenServices from "@/services/dosen.services";
import postDosenServices from "@/services/create.dosen.services";

const fileSchema = z
  .instanceof(FileList, { message: "File wajib diunggah." })
  .refine((files) => files?.length >= 1, "File wajib diunggah.");

const dokumenPendukungSchema = z.object({
  tipe_dokumen: z.string().min(1, "Tipe wajib dipilih."),
  nama_dokumen: z.string().min(1, "Nama dokumen wajib diisi."),
  jenis_dokumen_id: z.string().min(1, "Jenis wajib dipilih."),
  keterangan: z.string().optional(),
  file: fileSchema,
});

const riwayatPekerjaanSchema = z.object({
  bidang_usaha: z.string().min(1, "Bidang usaha wajib dipilih."),
  jenis_pekerjaan: z.string().min(1, "Jenis pekerjaan wajib dipilih."),
  jabatan: z.string().min(1, "Jabatan wajib diisi."),
  instansi: z.string().min(1, "Instansi wajib diisi."),
  divisi: z.string().optional(),
  deskripsi: z.string().optional(),
  mulai_bekerja: z.string().min(1, "Tanggal mulai wajib diisi."),
  selesai_bekerja: z.string().min(1, "Tanggal selesai wajib diisi."),
  area_pekerjaan: z.string({ required_error: "Area pekerjaan wajib dipilih." }),
  dokumen_pendukung: z
    .array(dokumenPendukungSchema)
    .min(1, "Minimal satu dokumen pendukung wajib diunggah."),
  submit_type: z.string().optional(),
});

type RiwayatPekerjaanValues = z.infer<typeof riwayatPekerjaanSchema>;

const DetailRiwayatPekerjaan = () => {
  const navigate = useNavigate();

  const form = useForm<RiwayatPekerjaanValues>({
    resolver: zodResolver(riwayatPekerjaanSchema),
    defaultValues: {
      area_pekerjaan: "1",
      dokumen_pendukung: [],
      submit_type: "submit",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dokumen_pendukung",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["riwayat-pekerjaan-dosen-tambah"],
    queryFn: async () => {
      const response = await dosenServices.getRiwayatPekerjaan();
      return response.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataRiwayatPekerjaan(formData),
    onSuccess: () => {
      toast.success("Data riwayat pekerjaan berhasil ditambahkan");
      form.reset();
      navigate("/data-riwayat/kualifikasi/riwayat-pekerjaan");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: RiwayatPekerjaanValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "dokumen_pendukung") {
        formData.append(key, value as string);
      }
    });

    values.dokumen_pendukung.forEach((dokumen, index) => {
      formData.append(
        `dokumen_pendukung[${index}][tipe_dokumen]`,
        dokumen.tipe_dokumen
      );
      formData.append(
        `dokumen_pendukung[${index}][nama_dokumen]`,
        dokumen.nama_dokumen
      );
      formData.append(
        `dokumen_pendukung[${index}][jenis_dokumen_id]`,
        dokumen.jenis_dokumen_id
      );
      if (dokumen.keterangan) {
        formData.append(
          `dokumen_pendukung[${index}][keterangan]`,
          dokumen.keterangan
        );
      }
      if (dokumen.file && dokumen.file.length > 0) {
        formData.append(`dokumen_pendukung[${index}][file]`, dokumen.file[0]);
      }
    });

    mutate(formData);
  };

  const addDocumentRow = () => {
    append({
      tipe_dokumen: "file",
      nama_dokumen: "",
      jenis_dokumen_id: "",
      keterangan: "",
      file: new DataTransfer().files,
    });
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Riwayat Pekerjaan" subTitle="Detail Riwayat Pekerjaan" />
        <CustomCard>
          <Skeleton className="h-40 w-full mb-6" />
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Riwayat Pekerjaan" subTitle="Detail Riwayat Pekerjaan" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard>
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row mb-5">
              <Link to="/data-riwayat/kualifikasi/riwayat-pekerjaan">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full md:w-auto"
                >
                  <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#FDA31A] w-full md:w-auto text-white hover:bg-[#e69310]"
              >
                <MdOutlineFileDownload className="mr-2" />
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

            {data?.pegawai_info && (
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
            )}

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-green-600">
                  Formulir Riwayat Pekerjaan
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {/* Menggunakan FormField dari file lain */}
                <FormFieldInput
                  name="bidang_usaha"
                  label="Bidang Usaha"
                  form={form}
                  required
                />
                <FormFieldInput
                  name="instansi"
                  label="Instansi/Perusahaan"
                  form={form}
                  required
                  placeholder="Nama Instansi"
                />
                <FormFieldInput
                  name="jenis_pekerjaan"
                  label="Jenis Pekerjaan"
                  form={form}
                  required
                />
                <FormFieldInput
                  name="jabatan"
                  label="Jabatan"
                  form={form}
                  required
                  placeholder="Posisi Jabatan"
                />
                <FormFieldInput
                  name="mulai_bekerja"
                  label="Tanggal Mulai"
                  type="date"
                  form={form}
                  required
                />
                <FormFieldInput
                  name="selesai_bekerja"
                  label="Tanggal Selesai"
                  type="date"
                  form={form}
                  required
                />
                <FormFieldInput
                  name="area_pekerjaan"
                  label="Area Pekerjaan"
                  type="radio"
                  form={form}
                  required
                  options={[
                    { value: "1", label: "Dalam Negeri" },
                    { value: "0", label: "Luar Negeri" },
                  ]}
                />
              </div>
            </div>

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-green-600">
                  Dokumen Pendukung
                </h2>
              </div>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow className="bg-[#002E5A] hover:bg-[#002E5A]">
                    <TableHead className="text-white">Tipe Dokumen</TableHead>
                    <TableHead className="text-white">Nama Dokumen</TableHead>
                    <TableHead className="text-white">Jenis Dokumen</TableHead>
                    <TableHead className="text-white">File</TableHead>
                    <TableHead className="text-white">Keterangan</TableHead>
                    <TableHead className="text-center text-white w-[100px]">
                      <Button
                        type="button"
                        size="sm"
                        className="bg-[#FDA31A] hover:bg-[#e69310]"
                        onClick={addDocumentRow}
                      >
                        <IoAdd className="h-5 w-5" />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id} className="align-top">
                      <TableCell className="min-w-[150px]">
                        <FormFieldSelect
                          name={`dokumen_pendukung.${index}.tipe_dokumen`}
                          form={form}
                          options={[{ value: "file", label: "File" }]}
                        />
                      </TableCell>
                      <TableCell className="min-w-[200px]">
                        <FormFieldInput
                          name={`dokumen_pendukung.${index}.nama_dokumen`}
                          form={form}
                          placeholder="Surat Keterangan Kerja"
                        />
                      </TableCell>
                      <TableCell className="min-w-[200px]">
                        <FormFieldSelect
                          name={`dokumen_pendukung.${index}.jenis_dokumen_id`}
                          form={form}
                          placeholder="Pilih Jenis"
                          options={[
                            { value: "file", label: "File" },
                            { value: "gambar", label: "Gambar" },
                            { value: "pdf", label: "PDF" },
                            { value: "lainnya", label: "Lainnya" },
                          ]}
                        />
                      </TableCell>
                      <TableCell className="min-w-[250px]">
                        <FormFieldInputFile
                          name={`dokumen_pendukung.${index}.file`}
                          description="Pilih file..."
                        />
                      </TableCell>
                      <TableCell className="min-w-[200px]">
                        <FormFieldInput
                          name={`dokumen_pendukung.${index}.keterangan`}
                          form={form}
                          placeholder="Keterangan tambahan"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(index)}
                        >
                          <HiMiniTrash className="w-5 h-5 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {form.formState.errors.dokumen_pendukung && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.dokumen_pendukung.message}
                </p>
              )}
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailRiwayatPekerjaan;
