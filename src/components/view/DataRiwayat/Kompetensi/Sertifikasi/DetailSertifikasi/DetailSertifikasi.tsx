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
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

// Ikon & Notifikasi
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Servis
import dosenServices from "@/services/dosen.services";
import adminServices from "@/services/admin.services.ts";
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

const sertifikasiSchema = z.object({
  jenis_sertifikasi_id: z.string().min(1, "Jenis sertifikasi wajib dipilih."),
  rumpun_bidang_ilmu_id: z.string().min(1, "Bidang studi wajib dipilih."),
  no_sk: z.string().min(1, "Nomor SK wajib diisi."),
  tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
  no_register: z.string().min(1, "Nomor registrasi wajib diisi."),
  no_peserta: z.string().min(1, "Nomor peserta wajib diisi."),
  peran: z.string().min(1, "Kedudukan / peran wajib diisi."),
  penyelenggara: z.string().min(1, "Penyelenggara wajib diisi."),
  tempat: z.string().min(1, "Tempat wajib diisi."),
  lingkup: z.string().min(1, "Lingkup wajib dipilih."),
  keterangan: z.string().optional(),
  dokumen: z.array(dokumenRowSchema).optional(),
});

type SertifikasiValues = z.infer<typeof sertifikasiSchema>;

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

const DetailSertifikasi = () => {
  const navigate = useNavigate();
  const { profile } = usePegawaiProfile();

  const form = useForm<SertifikasiValues>({
    resolver: zodResolver(sertifikasiSchema),
    defaultValues: {
      jenis_sertifikasi_id: "",
      rumpun_bidang_ilmu_id: "",
      no_sk: "",
      tgl_sk: "",
      no_register: "",
      no_peserta: "",
      peran: "",
      penyelenggara: "",
      tempat: "",
      lingkup: "",
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
      postDosenServices.addDataSertifikasi(formData),
    onSuccess: () => {
      toast.success("Data sertifikasi berhasil ditambahkan");
      form.reset();
      navigate("/data-riwayat/kompetensi/sertifikasi");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: SertifikasiValues) => {
    const formData = new FormData();
    formData.append("jenis_sertifikasi_id", values.jenis_sertifikasi_id);
    formData.append("rumpun_bidang_ilmu_id", values.rumpun_bidang_ilmu_id);
    formData.append("no_sk", values.no_sk);
    formData.append("tgl_sk", values.tgl_sk);
    formData.append("no_register", values.no_register);
    formData.append("no_peserta", values.no_peserta);
    formData.append("peran", values.peran);
    formData.append("penyelenggara", values.penyelenggara);
    formData.append("tempat", values.tempat);
    formData.append("lingkup", values.lingkup);
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
      <Title title="Sertifikasi" subTitle="Tambah Sertifikasi Baru" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard>
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row mb-5">
              <Link to="/data-riwayat/kompetensi/sertifikasi">
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
                  Formulir Sertifikasi
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <InfiniteScrollSelect
                  form={form}
                  label="Jenis Sertifikasi"
                  name="jenis_sertifikasi_id"
                  placeholder="--Pilih Jenis Sertifikasi--"
                  required
                  queryKey="jenis-sertif-user"
                  queryFn={(page) => adminServices.getMasterJenisSertifikasi({ page, is_dropdown: true })}
                  itemValue="id"
                  itemLabel="nama_sertifikasi"
                />
                <InfiniteScrollSelect
                  form={form}
                  label="Bidang Studi"
                  name="rumpun_bidang_ilmu_id"
                  placeholder="--Pilih Bidang Studi--"
                  required
                  queryKey="rumpun-bidang-ilmu-user"
                  queryFn={(page) => adminServices.getRumpunBidangIlmu({ page, is_dropdown: true })}
                  itemValue="id"
                  itemLabel="nama"
                />
                <FormFieldInput
                  name="no_sk"
                  label="Nomor SK"
                  form={form}
                  required
                  placeholder="Masukkan nomor SK"
                />
                <FormFieldInput
                  name="tgl_sk"
                  label="Tanggal SK"
                  type="date"
                  form={form}
                  required
                />
                <FormFieldInput
                  name="no_register"
                  label="Nomor Registrasi"
                  form={form}
                  required
                  placeholder="Masukkan nomor registrasi"
                />
                <FormFieldInput
                  name="no_peserta"
                  label="Nomor Peserta"
                  form={form}
                  required
                  placeholder="Masukkan nomor peserta"
                />
                <FormFieldInput
                  name="peran"
                  label="Kedudukan / Peran"
                  form={form}
                  required
                  placeholder="cth: Peserta"
                />
                <FormFieldInput
                  name="penyelenggara"
                  label="Penyelenggara"
                  form={form}
                  required
                  placeholder="cth: Universitas UIKA"
                />
                <FormFieldInput
                  name="tempat"
                  label="Tempat"
                  form={form}
                  required
                  placeholder="cth: Bogor"
                />
                <FormFieldSelect
                  name="lingkup"
                  label="Lingkup"
                  form={form}
                  required
                  placeholder="Pilih Lingkup"
                  options={[
                    { value: "Nasional", label: "Nasional" },
                    { value: "Internasional", label: "Internasional" },
                  ]}
                />
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

export default DetailSertifikasi;
