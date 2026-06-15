import { useState } from "react";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import dosenServices from "@/services/dosen.services";
import adminServices from "@/services/admin.services";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import postDosenServices from "@/services/create.dosen.services";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ChevronsUpDown, Check } from "lucide-react";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils";

// ── Jenjang yang masuk kategori "sederhana" (SD/SMP/SMA/SMK) ──
const JENJANG_SEDERHANA_KEYWORDS = ["SD", "SMP", "SMA/SMK"];

const isSederhanaJenjang = (label: string): boolean => {
  const upper = label.toUpperCase().trim();
  return JENJANG_SEDERHANA_KEYWORDS.some((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`);
    return regex.test(upper);
  });
};

// ── Enum statis ──
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

// ── Zod Schema dokumen ──
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
const pendidikanFormalSchema = z.object({
  pegawai_id: z.string().min(1, "Pegawai wajib dipilih."),
  lokasi_pendidikan: z.enum(["DALAM_NEGERI", "LUAR_NEGERI"], { required_error: "Lokasi studi wajib dipilih." }),
  jenjang_pendidikan_id: z.string().min(1, "Jenjang pendidikan wajib dipilih."),
  univ_id: z.string().optional(),
  prodi_id: z.string().optional(),
  gelar_id: z.string().optional(),
  rumpun_bidang_ilmu_id: z.string().optional(),
  instansi_pendidikan: z.string().optional(),
  nomor_induk: z.string().min(1, "Nomor induk wajib diisi."),
  konsentrasi: z.string().optional(),
  judul: z.string().optional(),
  letak_gelar: z.enum(["DEPAN", "BELAKANG"]).optional(),
  tahun_masuk: z.string().min(4, "Tahun masuk wajib diisi.").max(4, "Format tahun tidak valid."),
  tahun_lulus: z.string().min(4, "Tahun lulus wajib diisi.").max(4, "Format tahun tidak valid."),
  tanggal_lulus: z.string().min(1, "Tanggal lulus wajib diisi.").refine((date) => new Date(date) <= new Date(), { message: "Tanggal lulus tidak boleh melebihi hari ini." }),
  jumlah_semester: z.string().optional(),
  jumlah_sks: z.string().optional(),
  ipk: z.string().optional(),
  nomor_ijazah: z.string().min(1, "Nomor ijazah wajib diisi."),
  tanggal_ijazah: z.string().min(1, "Tanggal ijazah wajib diisi."),
  nomor_ijazah_negara: z.string().optional(),
  tanggal_ijazah_negara: z.string().optional(),
  nomor_dokumen: z.string().optional(),
  tanggal_dokumen: z.string().optional(),
  dokumen: z.array(dokumenRowSchema).optional(),
});

type PendidikanFormalValues = z.infer<typeof pendidikanFormalSchema>;

interface PegawaiOption {
    id: string;
    nama: string;
    nip: string;
}

// Sub-komponen: satu baris dokumen
const DokumenRow = ({ form, index, onRemove }: { form: any; index: number; onRemove: () => void; }) => {
  const tipe = form.watch(`dokumen.${index}.tipe_dokumen`);
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-3 py-2 align-top">
        <FormField control={form.control} name={`dokumen.${index}.tipe_dokumen`} render={({ field }) => (
          <FormItem>
            <Select value={field.value} onValueChange={(val: "file" | "url") => {
              field.onChange(val);
              form.setValue(`dokumen.${index}.file`, null);
              form.setValue(`dokumen.${index}.url_dokumen`, "");
              form.setValue(`dokumen.${index}.file_name`, "");
            }}>
              <SelectTrigger className="h-8 text-xs w-32"><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
              <SelectContent>
                {TIPE_DOKUMEN_OPTIONS.map((opt) => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}
              </SelectContent>
            </Select>
            <FormMessage className="text-[10px]" />
          </FormItem>
        )} />
      </td>
      <td className="px-3 py-2 align-top">
        {tipe === "file" ? (
          <FormField control={form.control} name={`dokumen.${index}.file`} render={({ field: { onChange } }) => (
            <FormItem>
              <FormControl>
                <Input type="file" accept=".pdf,.jpg,.jpeg,.png" className="h-8 text-xs w-48" onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  onChange(file);
                  if (file) form.setValue(`dokumen.${index}.file_name`, file.name);
                }} />
              </FormControl>
              <p className="text-[10px] text-gray-400">pdf, jpg, jpeg, png (maks 2MB)</p>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )} />
        ) : (
          <FormField control={form.control} name={`dokumen.${index}.url_dokumen`} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="url" placeholder="https://..." className="h-8 text-xs w-48" />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )} />
        )}
      </td>
      <td className="px-3 py-2 align-top">
        <FormField control={form.control} name={`dokumen.${index}.file_name`} render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder={tipe === "file" ? "Otomatis dari file..." : "Nama dokumen..."} readOnly={tipe === "file"} className={cn("h-8 text-xs", tipe === "file" && "bg-gray-100 cursor-not-allowed text-gray-500")} />
            </FormControl>
            <FormMessage className="text-[10px]" />
          </FormItem>
        )} />
      </td>
      <td className="px-3 py-2 align-top">
        <FormField control={form.control} name={`dokumen.${index}.keterangan`} render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder="Keterangan..." className="h-8 text-xs" />
            </FormControl>
            <FormMessage className="text-[10px]" />
          </FormItem>
        )} />
      </td>
      <td className="px-3 py-2 align-top">
        <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700 p-1 rounded"><Trash2 size={14} /></button>
      </td>
    </tr>
  );
};

const TambahPendidikanFormal = () => {
  const navigate = useNavigate();
  const [pegawaiSearch, setPegawaiSearch] = useState("");
  const [openPegawai, setOpenPegawai] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState<PegawaiOption | null>(null);
  const [debouncedSearch] = useDebounce(pegawaiSearch, 400);

  const [selectedJenjangLabel, setSelectedJenjangLabel] = useState<string>("");
  const modeSederhana = isSederhanaJenjang(selectedJenjangLabel);

  const form = useForm<PendidikanFormalValues>({
    resolver: zodResolver(pendidikanFormalSchema),
    defaultValues: {
      pegawai_id: "",
      lokasi_pendidikan: "DALAM_NEGERI",
      letak_gelar: "BELAKANG",
      dokumen: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "dokumen" });

  const { data: pegawaiOptions, isLoading: isLoadingPegawai } = useQuery<PegawaiOption[]>({
    queryKey: ["search-pegawai-admin", debouncedSearch],
    queryFn: async () => {
      const res = await adminServices.searchPegawai({ search: debouncedSearch, is_dropdown: true });
      return res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => postDosenServices.addDataPendidikanFormal(formData),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate(-1);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan data.");
    },
  });

  const handleJenjangChange = (label: string) => {
    setSelectedJenjangLabel(label);
    if (isSederhanaJenjang(label)) {
      form.setValue("univ_id", "");
      form.setValue("prodi_id", "");
      form.setValue("gelar_id", "");
      form.setValue("rumpun_bidang_ilmu_id", "");
      form.setValue("konsentrasi", "");
      form.setValue("judul", "");
      form.setValue("letak_gelar", undefined);
      form.setValue("jumlah_semester", "");
      form.setValue("jumlah_sks", "");
      form.setValue("ipk", "");
      form.setValue("nomor_dokumen", "");
      form.setValue("tanggal_dokumen", "");
    } else {
      form.setValue("instansi_pendidikan", "");
      form.setValue("nomor_ijazah_negara", "");
      form.setValue("tanggal_ijazah_negara", "");
    }
  };

  const onSubmit = (values: PendidikanFormalValues) => {
    if (modeSederhana) {
      if (!values.instansi_pendidikan?.trim()) {
        form.setError("instansi_pendidikan", { message: "Nama instansi pendidikan wajib diisi." });
        return;
      }
    } else {
      if (!values.univ_id?.trim()) { form.setError("univ_id", { message: "Perguruan tinggi wajib dipilih." }); return; }
      if (!values.gelar_id?.trim()) { form.setError("gelar_id", { message: "Gelar akademik wajib dipilih." }); return; }
      if (!values.judul?.trim()) { form.setError("judul", { message: "Judul tugas akhir wajib diisi." }); return; }
      if (!values.nomor_dokumen?.trim()) { form.setError("nomor_dokumen", { message: "Nomor dokumen wajib diisi." }); return; }
      if (!values.tanggal_dokumen?.trim()) { form.setError("tanggal_dokumen", { message: "Tanggal dokumen wajib diisi." }); return; }
    }

    const formData = new FormData();
    const commonFields: Record<string, string> = {
      pegawai_id: values.pegawai_id,
      lokasi_pendidikan: values.lokasi_pendidikan,
      jenjang_pendidikan_id: values.jenjang_pendidikan_id,
      nomor_induk: values.nomor_induk,
      tahun_masuk: values.tahun_masuk,
      tahun_lulus: values.tahun_lulus,
      tanggal_lulus: values.tanggal_lulus,
      nomor_ijazah: values.nomor_ijazah,
      tanggal_ijazah: values.tanggal_ijazah,
    };

    const sederhanaFields: Record<string, string> = {
      instansi_pendidikan: values.instansi_pendidikan || "",
      nomor_ijazah_negara: values.nomor_ijazah_negara || "",
      tanggal_ijazah_negara: values.tanggal_ijazah_negara || "",
    };

    const lengkapFields: Record<string, string> = {
      univ_id: values.univ_id || "",
      prodi_id: values.prodi_id || "",
      gelar_id: values.gelar_id || "",
      rumpun_bidang_ilmu_id: values.rumpun_bidang_ilmu_id || "",
      konsentrasi: values.konsentrasi || "",
      judul: values.judul || "",
      letak_gelar: values.letak_gelar || "",
      jumlah_semester: values.jumlah_semester || "",
      jumlah_sks: values.jumlah_sks || "",
      ipk: values.ipk || "",
      nomor_dokumen: values.nomor_dokumen || "",
      tanggal_dokumen: values.tanggal_dokumen || "",
    };

    const fieldMap = { ...commonFields, ...(modeSederhana ? sederhanaFields : lengkapFields) };
    Object.entries(fieldMap).forEach(([key, val]) => { if (val) formData.append(key, val); });

    const dokumenMeta = (values.dokumen ?? []).map((dok) => ({
      tipe_dokumen: dok.tipe_dokumen,
      file_name: dok.tipe_dokumen === "file" ? (dok.file as File).name : dok.file_name,
      url_dokumen: dok.tipe_dokumen === "url" ? dok.url_dokumen : null,
      keterangan: dok.keterangan || null,
    }));

    if (dokumenMeta.length > 0) formData.append("dokumen", JSON.stringify(dokumenMeta));

    (values.dokumen ?? []).forEach((dok, index) => {
      if (dok.tipe_dokumen === "file" && dok.file instanceof File) {
        formData.append(`dokumen[${index}][file]`, dok.file);
      }
    });

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Pendidikan Formal" subTitle="Tambah Pendidikan Formal (Admin)" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <CustomCard>
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row mb-5">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika text-white border-0">
                <IoIosArrowBack className="mr-2" /> Kembali
              </Button>
              <Button type="submit" disabled={isPending} className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer hover:bg-[#e08c10]">
                <MdOutlineSave className="mr-2" /> {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2">
                <Label className="text-[#3ABC67] font-semibold text-lg border-b-2 border-[#FDA31A] pb-2 mb-2">
                    Pilih Pegawai <span className="text-red-500">*</span>
                </Label>
                <Popover open={openPegawai} onOpenChange={setOpenPegawai}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={openPegawai} className="justify-between w-full h-12 mt-2">
                            {selectedPegawai ? `${selectedPegawai.nip} — ${selectedPegawai.nama}` : "-- Cari NIP atau nama pegawai --"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                        <Command shouldFilter={false}>
                            <CommandInput placeholder="Ketik NIP atau nama..." value={pegawaiSearch} onValueChange={setPegawaiSearch} />
                            <CommandList>
                                {isLoadingPegawai ? (<CommandEmpty>Mencari...</CommandEmpty>) : !pegawaiOptions?.length ? (<CommandEmpty>Pegawai tidak ditemukan.</CommandEmpty>) : (
                                    <CommandGroup>
                                        {pegawaiOptions.map((p) => (
                                            <CommandItem key={p.id} value={p.id} onSelect={() => {
                                                setSelectedPegawai(p);
                                                form.setValue("pegawai_id", p.id, { shouldValidate: true });
                                                setOpenPegawai(false);
                                            }}>
                                                <Check className={cn("mr-2 h-4 w-4", selectedPegawai?.id === p.id ? "opacity-100" : "opacity-0")} />
                                                {p.nip} — {p.nama}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <Input type="hidden" {...form.register("pegawai_id")} />
                {form.formState.errors.pegawai_id && (<p className="text-xs text-red-500">{form.formState.errors.pegawai_id.message}</p>)}
            </div>
            </div>

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-[#3ABC67]">Data Pendidikan & Institusi</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormFieldInput label="Lokasi Studi" name="lokasi_pendidikan" form={form} type="radio" options={[{ value: "DALAM_NEGERI", label: "Dalam Negeri" }, { value: "LUAR_NEGERI", label: "Luar Negeri" }]} labelStyle="text-gray-700" />
                <InfiniteScrollSelect form={form} label="Jenjang Pendidikan" name="jenjang_pendidikan_id" placeholder="--Pilih Jenjang--" required queryKey="jenjang" queryFn={(page) => adminServices.getJenjangPendidikan({ page, is_dropdown: true })} itemValue="id" itemLabel="jenjang_singkatan" onSelectLabel={handleJenjangChange} />
                {modeSederhana ? (
                  <FormFieldInput label="Nama Instansi Pendidikan" name="instansi_pendidikan" form={form} required placeholder="Cth: SDN 01 Jakarta" labelStyle="text-gray-700" />
                ) : (
                  <>
                    <InfiniteScrollSelect form={form} label="Nama Perguruan Tinggi" name="univ_id" placeholder="--Pilih Perguruan Tinggi--" required queryKey="universitas" queryFn={(page) => adminServices.getUniversitas({ page, is_dropdown: true })} itemValue="id" itemLabel="nama" />
                    <InfiniteScrollSelect form={form} label="Program Studi" name="prodi_id" placeholder="--Pilih Program Studi--" required={false} queryKey="prodi" queryFn={(page) => adminServices.getProdiSelect({ page, is_dropdown: true })} itemValue="id" itemLabel="nama_prodi" />
                    <InfiniteScrollSelect form={form} label="Rumpun Bidang Ilmu" name="rumpun_bidang_ilmu_id" placeholder="--Pilih Rumpun Bidang Ilmu--" required={false} queryKey="rumpun_bidang_ilmu" queryFn={(page) => adminServices.getRumpunBidangIlmu({ page, is_dropdown: true })} itemValue="id" itemLabel="nama" />
                    <FormFieldInput label="Konsentrasi" name="konsentrasi" form={form} placeholder="Cth: Artificial Intelligence" labelStyle="text-gray-700" />
                  </>
                )}
                <FormFieldInput label={modeSederhana ? "Nomor Induk Siswa (NIS)" : "Nomor Induk Mahasiswa (NIM)"} name="nomor_induk" form={form} required placeholder={modeSederhana ? "Masukkan NIS" : "Masukkan NIM"} labelStyle="text-gray-700" />
              </div>
            </div>

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-[#3ABC67]">Data Akademik & Kelulusan</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormFieldInput label="Tahun Masuk" name="tahun_masuk" form={form} type="number" placeholder="Cth: 2010" required labelStyle="text-gray-700" />
                <FormFieldInput label="Tahun Lulus" name="tahun_lulus" form={form} type="number" placeholder="Cth: 2014" required labelStyle="text-gray-700" />
                <FormFieldInput label="Tanggal Lulus" name="tanggal_lulus" type="date" form={form} required labelStyle="text-gray-700" />
                {!modeSederhana && (
                  <>
                    <FormFieldInput label="Jumlah Semester" name="jumlah_semester" type="number" form={form} placeholder="Cth: 8" labelStyle="text-gray-700" />
                    <FormFieldInput label="Jumlah SKS" name="jumlah_sks" type="number" form={form} placeholder="Cth: 144" labelStyle="text-gray-700" />
                    <FormFieldInput label="IPK" name="ipk" type="number" form={form} placeholder="Cth: 3.75" labelStyle="text-gray-700" />
                    <div className="md:col-span-2">
                      <FormFieldInput label="Judul Tugas Akhir / Skripsi / Tesis" name="judul" form={form} type="textarea" placeholder="Masukkan judul tugas akhir" required labelStyle="text-gray-700" />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-[#3ABC67]">Data Ijazah & Gelar</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {!modeSederhana && (
                  <>
                    <InfiniteScrollSelect label="Gelar Akademik" name="gelar_id" placeholder="--Pilih Gelar--" form={form} required queryKey="gelar" queryFn={(page) => adminServices.getGelarAkademik({ page, is_dropdown: true })} itemValue="id" itemLabel="nama" />
                    <FormFieldSelect label="Letak Gelar" name="letak_gelar" placeholder="--Pilih Letak Gelar--" form={form} options={[{ value: "DEPAN", label: "Depan" }, { value: "BELAKANG", label: "Belakang" }]} labelStyle="text-gray-700" />
                  </>
                )}
                <FormFieldInput label="Nomor Ijazah" name="nomor_ijazah" form={form} required placeholder="Masukkan nomor ijazah" labelStyle="text-gray-700" />
                <FormFieldInput label="Tanggal Ijazah" name="tanggal_ijazah" type="date" form={form} required labelStyle="text-gray-700" />
                {modeSederhana && (
                  <>
                    <FormFieldInput label="Nomor Ijazah Negara" name="nomor_ijazah_negara" form={form} placeholder="Masukkan nomor ijazah negara (opsional)" labelStyle="text-gray-700" />
                    <FormFieldInput label="Tanggal Ijazah Negara" name="tanggal_ijazah_negara" type="date" form={form} labelStyle="text-gray-700" />
                  </>
                )}
                {!modeSederhana && (
                  <>
                    <FormFieldInput label="Nomor Dokumen SK" name="nomor_dokumen" form={form} required placeholder="Nomor dokumen SK" labelStyle="text-gray-700" />
                    <FormFieldInput label="Tanggal Dokumen SK" name="tanggal_dokumen" type="date" form={form} required labelStyle="text-gray-700" />
                  </>
                )}
              </div>
            </div>

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
                      <th className="px-3 py-2 w-10 text-center">
                        <button type="button" onClick={() => append({ ...defaultDokumenRow })} className="bg-green-500 hover:bg-green-600 text-white rounded p-1"><Plus size={14} /></button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (<DokumenRow key={field.id} form={form} index={index} onRemove={() => remove(index)} />))}
                    {fields.length === 0 && (<tr><td colSpan={5} className="text-center py-6 text-gray-400 italic text-sm">Belum ada dokumen. Klik <strong>+</strong> untuk menambah.</td></tr>)}
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

export default TambahPendidikanFormal;