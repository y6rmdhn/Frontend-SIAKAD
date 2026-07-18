import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import { Plus, Trash2 } from "lucide-react";

// UI Components
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
import { Label } from "@/components/ui/label";

// Custom Blocks
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import InfoList from "@/components/blocks/InfoList";

// Hooks & Services
import dosenServices from "@/services/dosen.services.ts";
import postDosenServices from "@/services/create.dosen.services";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ── Opsi hubungan keluarga ──
const HUBUNGAN_OPTIONS = [
  { value: "Anak", label: "Anak" },
  { value: "Pasangan", label: "Pasangan (Suami/Istri)" },
  { value: "Ayah", label: "Ayah" },
  { value: "Ibu", label: "Ibu" },
  { value: "Ayah Mertua", label: "Ayah Mertua" },
  { value: "Ibu Mertua", label: "Ibu Mertua" },
];

// ── Opsi tipe dokumen ──
const TIPE_DOKUMEN_OPTIONS = [
  { value: "file", label: "File Upload" },
  { value: "url", label: "Tautan (URL)" },
];

// ── Default row dokumen ──
const defaultDokumenRow = {
  tipe_dokumen: "file" as "file" | "url",
  file: null as File | null,
  url_dokumen: "",
  file_name: "",
  keterangan: "",
};

// ── Zod Schema dokumen pendukung ──
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

// ── Main Schema ──
const keluargaSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi."),
  hubungan: z.string().min(1, "Hubungan wajib dipilih."),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], {
    required_error: "Jenis kelamin wajib dipilih.",
  }),
  tgl_lahir: z.string().min(1, "Tanggal lahir wajib diisi."),
  umur: z.string().min(1, "Umur wajib diisi."),
  alamat: z.string().min(1, "Alamat wajib diisi."),
  telepon: z.string().min(1, "Nomor telepon wajib diisi."),
  pekerjaan: z.string().optional(),

  // Kondisional: hanya saat hubungan = "Anak"
  anak_ke: z.string().optional(),

  // Kondisional: hanya saat hubungan = "Pasangan"
  kartu_nikah: z.string().optional(),
  is_pasangan_satu_institusi: z.boolean().optional(),

  // Dokumen pendukung dinamis
  dokumen: z.array(dokumenRowSchema).optional(),
});

type KeluargaValues = z.infer<typeof keluargaSchema>;

// =============================================================================
// Sub-komponen: satu baris dokumen pendukung
// =============================================================================
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
      {/* Tipe */}
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

      {/* File / URL */}
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

      {/* Nama Dokumen */}
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

      {/* Keterangan */}
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

      {/* Hapus */}
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

// =============================================================================
// Main Component
// =============================================================================
const TambahKeluarga = () => {
  const navigate = useNavigate();

  const form = useForm<KeluargaValues>({
    resolver: zodResolver(keluargaSchema),
    defaultValues: {
      nama: "",
      hubungan: "",
      jenis_kelamin: undefined,
      tgl_lahir: "",
      umur: "",
      alamat: "",
      telepon: "",
      pekerjaan: "",
      anak_ke: "",
      kartu_nikah: "",
      is_pasangan_satu_institusi: false,
      dokumen: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dokumen",
  });

  // Watch hubungan untuk conditional rendering
  const hubungan = form.watch("hubungan");
  const isAnak = hubungan === "Anak";
  const isPasangan = hubungan === "Pasangan";

  // Fetch Pegawai profile to show in InfoList
  const { data: profileData } = useQuery({
    queryKey: ["profil-pegawai-keluarga"],
    queryFn: async () => {
      const response = await dosenServices.getProfilPegawai();
      return response.data.data;
    },
  });

  // Auto-hitung umur dari tanggal lahir
  const handleTglLahirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tgl = e.target.value;
    if (tgl) {
      const today = new Date();
      const birth = new Date(tgl);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      form.setValue("umur", String(age >= 0 ? age : 0));
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => postDosenServices.addDataKeluarga(formData),
    onSuccess: () => {
      form.reset();
      toast.success("Data keluarga berhasil ditambahkan.");
      navigate("/data-riwayat/keluarga");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal menambahkan data.");
    },
  });

  const onSubmit = (values: KeluargaValues) => {
    // Validasi kondisional
    if (isAnak && !values.anak_ke?.trim()) {
      form.setError("anak_ke", { message: "Anak ke- wajib diisi." });
      return;
    }

    const formData = new FormData();

    // Field selalu ada (pegawai_id sudah otomatis dari session di backend)
    formData.append("nama", values.nama);
    formData.append("hubungan", values.hubungan);
    formData.append("jenis_kelamin", values.jenis_kelamin);
    formData.append("tgl_lahir", values.tgl_lahir);
    formData.append("umur", values.umur);
    formData.append("alamat", values.alamat);
    formData.append("telepon", values.telepon);
    if (values.pekerjaan) formData.append("pekerjaan", values.pekerjaan);

    // Field kondisional: Anak
    if (isAnak && values.anak_ke) {
      formData.append("anak_ke", values.anak_ke);
    }

    // Field kondisional: Pasangan
    if (isPasangan) {
      if (values.kartu_nikah) formData.append("kartu_nikah", values.kartu_nikah);
      formData.append(
        "is_pasangan_satu_institusi",
        values.is_pasangan_satu_institusi ? "true" : "false"
      );
    }

    // Dokumen pendukung — metadata JSON
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
      <Title title="Data Keluarga" subTitle="Tambah Data Keluarga" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <CustomCard>
            {/* ── Actions ── */}
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row mb-5">
              <Link className="w-full md:w-auto" to="/data-riwayat/keluarga">
                <Button type="button" className="bg-green-light-uika w-full md:w-auto hover:bg-[#329C59]">
                  <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#FDA31A] hover:bg-[#e08f12] w-full md:w-auto text-white cursor-pointer"
              >
                <MdOutlineSave className="mr-2" />
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

            <InfoList
              items={[
                { label: "NIP", value: profileData?.nip },
                { label: "Nama", value: profileData?.nama },
                { label: "Unit Kerja", value: profileData?.unit_kerja_id?.nama },
                { label: "Status", value: profileData?.status_aktif_id?.nama },
                { label: "Jab. Fungsional", value: profileData?.jabatan_fungsional_id?.nama },
                { label: "Hubungan Kerja", value: profileData?.hubungan_kerja_id?.nama },
              ]}
            />

            {/* ══════════════════════════════════════════════════════
                Section 1: Data Identitas Anggota Keluarga
            ══════════════════════════════════════════════════════ */}
            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-[#3ABC67]">
                  Data Identitas Anggota Keluarga
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">

                {/* Nama */}
                <FormFieldInput
                  label="Nama Lengkap"
                  name="nama"
                  form={form}
                  required
                  placeholder="Masukkan nama lengkap"
                  labelStyle="text-gray-700"
                />

                {/* Hubungan — dropdown */}
                <FormFieldSelect
                  label="Hubungan Keluarga"
                  name="hubungan"
                  placeholder="--Pilih Hubungan--"
                  form={form}
                  required
                  options={HUBUNGAN_OPTIONS}
                  labelStyle="text-gray-700"
                  onChange={() => {
                    // Reset field kondisional saat ganti hubungan
                    form.setValue("anak_ke", "");
                    form.setValue("kartu_nikah", "");
                    form.setValue("is_pasangan_satu_institusi", false);
                  }}
                />

                {/* Anak ke- — muncul hanya saat hubungan = Anak */}
                {isAnak && (
                  <FormFieldInput
                    label="Anak Ke-"
                    name="anak_ke"
                    form={form}
                    type="number"
                    required
                    placeholder="Cth: 1"
                    labelStyle="text-gray-700"
                  />
                )}

                {/* Jenis Kelamin */}
                <FormFieldInput
                  label="Jenis Kelamin"
                  name="jenis_kelamin"
                  form={form}
                  type="radio"
                  required
                  options={[
                    { value: "Laki-laki", label: "Laki-laki" },
                    { value: "Perempuan", label: "Perempuan" },
                  ]}
                  labelStyle="text-gray-700"
                />

                {/* Tanggal Lahir — dengan auto-hitung umur */}
                <FormField
                  control={form.control}
                  name="tgl_lahir"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-sm font-medium text-gray-700">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleTglLahirChange(e);
                          }}
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Umur — terisi otomatis, bisa diedit manual */}
                <FormFieldInput
                  label="Umur (Tahun)"
                  name="umur"
                  form={form}
                  type="number"
                  required
                  placeholder="Terisi otomatis dari tanggal lahir"
                  labelStyle="text-gray-700"
                />

                {/* Pekerjaan */}
                <FormFieldInput
                  label="Pekerjaan"
                  name="pekerjaan"
                  form={form}
                  placeholder="Cth: Guru, Wiraswasta, Pelajar"
                  labelStyle="text-gray-700"
                />

                {/* Telepon */}
                <FormFieldInput
                  label="Nomor Telepon"
                  name="telepon"
                  form={form}
                  required
                  placeholder="Cth: 08123456789"
                  labelStyle="text-gray-700"
                />

                {/* Alamat — full width */}
                <div className="md:col-span-2">
                  <FormFieldInput
                    label="Alamat"
                    name="alamat"
                    form={form}
                    type="textarea"
                    required
                    placeholder="Masukkan alamat lengkap"
                    labelStyle="text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════
                Section 2: Data Pasangan
                Muncul HANYA saat hubungan = "Pasangan"
            ══════════════════════════════════════════════════════ */}
            {isPasangan && (
              <div className="mt-10">
                <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                  <h2 className="text-lg font-semibold text-[#3ABC67]">Data Pasangan</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {/* Nomor Kartu Nikah */}
                  <FormFieldInput
                    label="Nomor Kartu Nikah"
                    name="kartu_nikah"
                    form={form}
                    placeholder="Masukkan nomor kartu nikah"
                    labelStyle="text-gray-700"
                  />

                  {/* Satu Institusi — toggle boolean */}
                  <FormField
                    control={form.control}
                    name="is_pasangan_satu_institusi"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Pasangan dalam Satu Institusi?
                        </label>
                        <FormControl>
                          <div className="flex items-center gap-6 mt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="is_pasangan_satu_institusi"
                                value="true"
                                checked={field.value === true}
                                onChange={() => field.onChange(true)}
                                className="accent-[#3ABC67] w-4 h-4"
                              />
                              <span className="text-sm text-gray-700">Ya</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="is_pasangan_satu_institusi"
                                value="false"
                                checked={field.value === false}
                                onChange={() => field.onChange(false)}
                                className="accent-[#3ABC67] w-4 h-4"
                              />
                              <span className="text-sm text-gray-700">Tidak</span>
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════
                Section 3: Dokumen Pendukung Dinamis
            ══════════════════════════════════════════════════════ */}
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
                          className="bg-green-500 hover:bg-green-600 text-white rounded p-1 cursor-pointer"
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

export default TambahKeluarga;
