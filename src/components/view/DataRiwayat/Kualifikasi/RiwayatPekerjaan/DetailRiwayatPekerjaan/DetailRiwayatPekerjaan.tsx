import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// UI & Komponen
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";

// Ikon & Notifikasi
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Servis
import postDosenServices from "@/services/create.dosen.services";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";

const TIPE_DOKUMEN_OPTIONS = [
  { value: "file", label: "File Upload" },
  { value: "url", label: "Tautan (URL)" },
];

const defaultDokumenRow = {
  tipe_dokumen: "file" as "file" | "url",
  file: null as File | null,
  url_dokumen: "",
  file_name: "",
  keterangan: "",
};

const dokumenRowSchema = z.discriminatedUnion("tipe_dokumen", [
  z.object({
    tipe_dokumen: z.literal("file"),
    file: z.instanceof(File, { message: "File wajib diupload" }),
    url_dokumen: z.string().optional(),
    file_name: z.string().optional(),
    keterangan: z.string().optional(),
  }),
  z.object({
    tipe_dokumen: z.literal("url"),
    file: z.null().optional(),
    url_dokumen: z.string().url({ message: "Format URL tidak valid" }),
    file_name: z.string().min(1, { message: "Nama dokumen wajib diisi" }),
    keterangan: z.string().optional(),
  }),
]);

const riwayatPekerjaanSchema = z
  .object({
    bidang_usaha: z.string().min(1, "Bidang usaha wajib diisi."),
    jenis_pekerjaan: z.string().min(1, "Jenis pekerjaan wajib diisi."),
    nama_perusahaan: z.string().min(1, "Nama perusahaan wajib diisi."),
    jabatan: z.string().min(1, "Jabatan wajib diisi."),
    divisi: z.string().min(1, "Divisi wajib diisi."),
    deskripsi_pekerjaan: z.string().min(1, "Deskripsi pekerjaan wajib diisi."),
    tgl_mulai: z.string().min(1, "Tanggal mulai wajib diisi."),
    tgl_selesai: z.string().min(1, "Tanggal selesai wajib diisi."),
    is_lokasi: z.enum(["1", "0"], {
      required_error: "Area pekerjaan wajib dipilih.",
    }),
    keterangan: z.string().optional(),
    dokumen: z.array(dokumenRowSchema).optional(),
  })
  .refine(
    (data) => {
      return new Date(data.tgl_selesai) > new Date(data.tgl_mulai);
    },
    {
      message: "Tanggal selesai harus setelah tanggal mulai.",
      path: ["tgl_selesai"],
    }
  );

type RiwayatPekerjaanValues = z.infer<typeof riwayatPekerjaanSchema>;

const DokumenRow = ({
  form,
  index,
  onRemove,
}: {
  form: any;
  index: number;
  onRemove: () => void;
}) => {
  const tipe = form.watch(`dokumen.${index}.tipe_dokumen`);

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-3 py-2 align-top">
        <FormField
          control={form.control}
          name={`dokumen.${index}.tipe_dokumen`}
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value}
                onValueChange={(val: "file" | "url") => {
                  field.onChange(val);
                  form.setValue(`dokumen.${index}.file`, null);
                  form.setValue(`dokumen.${index}.url_dokumen`, "");
                  form.setValue(`dokumen.${index}.file_name`, "");
                }}
              >
                <SelectTrigger className="h-8 text-xs w-32">
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                <SelectContent>
                  {TIPE_DOKUMEN_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </td>

      <td className="px-3 py-2 align-top">
        {tipe === "file" ? (
          <FormField
            control={form.control}
            name={`dokumen.${index}.file`}
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="h-8 text-xs w-48"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      onChange(file);
                      if (file) form.setValue(`dokumen.${index}.file_name`, file.name);
                    }}
                  />
                </FormControl>
                <p className="text-[10px] text-gray-400">pdf, jpg, jpeg, png (maks 2MB)</p>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name={`dokumen.${index}.url_dokumen`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    placeholder="https://..."
                    className="h-8 text-xs w-48"
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        )}
      </td>

      <td className="px-3 py-2 align-top">
        <FormField
          control={form.control}
          name={`dokumen.${index}.file_name`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={tipe === "file" ? "Otomatis dari file..." : "Nama dokumen..."}
                  readOnly={tipe === "file"}
                  className={cn(
                    "h-8 text-xs",
                    tipe === "file" && "bg-gray-100 cursor-not-allowed text-gray-500"
                  )}
                />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </td>

      <td className="px-3 py-2 align-top">
        <FormField
          control={form.control}
          name={`dokumen.${index}.keterangan`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Keterangan..." className="h-8 text-xs" />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </td>

      <td className="px-3 py-2 align-top text-center">
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 p-1 rounded cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
};

const DetailRiwayatPekerjaan = () => {
  const navigate = useNavigate();
  const { profile } = usePegawaiProfile();

  const form = useForm<RiwayatPekerjaanValues>({
    resolver: zodResolver(riwayatPekerjaanSchema),
    defaultValues: {
      bidang_usaha: "",
      jenis_pekerjaan: "",
      nama_perusahaan: "",
      jabatan: "",
      divisi: "",
      deskripsi_pekerjaan: "",
      tgl_mulai: "",
      tgl_selesai: "",
      is_lokasi: "1",
      keterangan: "",
      dokumen: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dokumen",
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
    formData.append("bidang_usaha", values.bidang_usaha);
    formData.append("jenis_pekerjaan", values.jenis_pekerjaan);
    formData.append("nama_perusahaan", values.nama_perusahaan);
    formData.append("jabatan", values.jabatan);
    formData.append("divisi", values.divisi);
    formData.append("deskripsi_pekerjaan", values.deskripsi_pekerjaan);
    formData.append("tgl_mulai", values.tgl_mulai);
    formData.append("tgl_selesai", values.tgl_selesai);
    formData.append("is_lokasi", values.is_lokasi === "1" ? "true" : "false");
    if (values.keterangan) formData.append("keterangan", values.keterangan);

    // Dokumen metadata JSON
    const dokumenMeta = (values.dokumen ?? []).map((dok) => ({
      tipe_dokumen: dok.tipe_dokumen,
      file_name:
        dok.tipe_dokumen === "file" ? (dok.file as File).name : dok.file_name,
      url_dokumen: dok.tipe_dokumen === "url" ? dok.url_dokumen : null,
      keterangan: dok.keterangan || null,
    }));

    if (dokumenMeta.length > 0) {
      formData.append("dokumen", JSON.stringify(dokumenMeta));
    }

    // File fisik
    (values.dokumen ?? []).forEach((dok, index) => {
      if (dok.tipe_dokumen === "file" && dok.file instanceof File) {
        formData.append(`dokumen[${index}][file]`, dok.file);
      }
    });

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Riwayat Pekerjaan" subTitle="Tambah Riwayat Pekerjaan" />
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
                <MdOutlineSave className="mr-2" />
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

            <InfoList
              items={[
                { label: "NIP", value: profile?.nip ?? "-" },
                { label: "Nama", value: profile?.nama ?? "-" },
                { label: "Unit Kerja", value: profile?.unit_kerja ?? "-" },
                { label: "Status", value: profile?.status ?? "-" },
                { label: "Jab. Fungsional", value: profile?.jab_fungsional ?? "-" },
                { label: "Jab. Struktural", value: profile?.jab_struktural ?? "-" },
                { label: "Pendidikan", value: profile?.pendidikan ?? "-" },
              ]}
            />

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-green-600">
                  Formulir Riwayat Pekerjaan
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormFieldInput
                  name="bidang_usaha"
                  label="Bidang Usaha"
                  form={form}
                  required
                  placeholder="cth: Pendidikan, Keuangan, TI"
                />
                <FormFieldInput
                  name="nama_perusahaan"
                  label="Nama Perusahaan / Instansi"
                  form={form}
                  required
                  placeholder="Nama Instansi"
                />
                <FormFieldInput
                  name="jenis_pekerjaan"
                  label="Jenis Pekerjaan"
                  form={form}
                  required
                  placeholder="cth: Dosen, Programmer, Manager"
                />
                <FormFieldInput
                  name="jabatan"
                  label="Jabatan"
                  form={form}
                  required
                  placeholder="Posisi Jabatan"
                />
                <FormFieldInput
                  name="divisi"
                  label="Divisi / Bagian"
                  form={form}
                  required
                  placeholder="Posisi Divisi"
                />
                <FormFieldSelect
                  name="is_lokasi"
                  label="Lokasi Pekerjaan"
                  form={form}
                  required
                  options={[
                    { value: "1", label: "Dalam Negeri" },
                    { value: "0", label: "Luar Negeri" },
                  ]}
                />
                <FormFieldInput
                  name="tgl_mulai"
                  label="Tanggal Mulai"
                  type="date"
                  form={form}
                  required
                />
                <FormFieldInput
                  name="tgl_selesai"
                  label="Tanggal Selesai"
                  type="date"
                  form={form}
                  required
                />
                <div className="md:col-span-2">
                  <FormFieldInput
                    name="deskripsi_pekerjaan"
                    label="Deskripsi Pekerjaan"
                    form={form}
                    required
                    placeholder="Tuliskan deskripsi ringkas pekerjaan Anda"
                    type="textarea"
                  />
                </div>
                <div className="md:col-span-2">
                  <FormFieldInput
                    name="keterangan"
                    label="Keterangan"
                    form={form}
                    placeholder="Keterangan tambahan"
                    type="textarea"
                  />
                </div>
              </div>
            </div>

            {/* Dokumen Pendukung Dinamis */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center justify-between border-b border-teal-600 pb-2">
                <h3 className="text-teal-600 font-semibold">Dokumen Pendukung</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1B3A5C] text-white">
                      <th className="px-3 py-2 text-left w-36">Tipe Dokumen</th>
                      <th className="px-3 py-2 text-left w-52">Dokumen</th>
                      <th className="px-3 py-2 text-left">Nama Dokumen</th>
                      <th className="px-3 py-2 text-left">Keterangan</th>
                      <th className="px-3 py-2 w-12 text-center">
                        <button
                          type="button"
                          onClick={() => append({ ...defaultDokumenRow })}
                          className="bg-green-50 hover:bg-green-600 text-white rounded p-1 cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <DokumenRow
                        key={field.id}
                        form={form}
                        index={index}
                        onRemove={() => remove(index)}
                      />
                    ))}
                    {fields.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-6 text-gray-400 italic text-sm"
                        >
                          Belum ada dokumen. Klik <strong>+</strong> untuk menambah.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailRiwayatPekerjaan;
