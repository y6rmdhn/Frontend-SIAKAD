// TambahSertifikasi.tsx — versi lengkap final

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import { Plus, Trash2 } from "lucide-react";

// UI Components
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
    Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Blocks
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";

// Services
import adminServices from "@/services/admin.services";
import postDosenServices from "@/services/create.dosen.services";

// ── Enum statis ──
const LINGKUP_OPTIONS = [
    { value: "Lokal", label: "Lokal" },
    { value: "Nasional", label: "Nasional" },
    { value: "Internasional", label: "Internasional" },
];

const TIPE_DOKUMEN_OPTIONS = [
    { value: "file", label: "File Upload" },
    { value: "url", label: "Tautan (URL)" },
];

// ── Default row baru ──
const defaultDokumenRow = {
    tipe_dokumen: "file" as "file" | "url",
    file: null as File | null,
    url_dokumen: "",
    file_name: "",   // manual input jika tipe url
    keterangan: "",
};

// ── Zod Schema ──
const dokumenRowSchema = z.discriminatedUnion("tipe_dokumen", [
    z.object({
        tipe_dokumen: z.literal("file"),
        file: z.instanceof(File, { message: "File wajib diupload" }),
        url_dokumen: z.string().optional(),
        file_name: z.string().optional(), // otomatis dari file.name, tidak perlu validasi
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

const formSchema = z.object({
    pegawai_id: z.string().min(1, "Pegawai wajib dipilih."),
    jenis_sertifikasi_id: z.string().min(1, "Jenis Sertifikasi wajib dipilih."),
    rumpun_bidang_ilmu_id: z.string().min(1, "Rumpun Bidang Ilmu wajib dipilih."),
    no_sk: z.string().min(1, "Nomor SK wajib diisi."),
    tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
    no_register: z.string().min(1, "Nomor Register wajib diisi."),
    no_peserta: z.string().min(1, "Nomor Peserta wajib diisi."),
    peran: z.string().min(1, "Peran wajib diisi."),
    penyelenggara: z.string().min(1, "Penyelenggara wajib diisi."),
    tempat: z.string().min(1, "Tempat wajib diisi."),
    lingkup: z.string().min(1, "Lingkup wajib diisi."),
    dokumen: z.array(dokumenRowSchema).optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface PegawaiOption {
    id: string;
    nama: string;
    nip: string;
}

// =============================================================================
// Sub-komponen: satu baris dokumen
// Dipisah supaya watch() tidak re-render seluruh tabel
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
            {/* Tipe Dokumen */}
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
                                    // Reset field lawan saat ganti tipe
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

            {/* Kolom Dokumen: input file atau input URL */}
            <td className="px-3 py-2 align-top">
                {tipe === "file" ? (
                    <FormField
                        control={form.control}
                        name={`dokumen.${index}.file`}
                        render={({ field: { onChange, ...rest } }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        className="h-8 text-xs w-48"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null;
                                            onChange(file);
                                            // Auto-set file_name dari nama file
                                            if (file) {
                                                form.setValue(`dokumen.${index}.file_name`, file.name);
                                            }
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

            {/* 
                file_name:
                - tipe file  → readonly, terisi otomatis dari nama file
                - tipe url   → input manual (wajib diisi)
            */}
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
                                <Input
                                    {...field}
                                    placeholder="Keterangan..."
                                    className="h-8 text-xs"
                                />
                            </FormControl>
                            <FormMessage className="text-[10px]" />
                        </FormItem>
                    )}
                />
            </td>

            {/* Hapus */}
            <td className="px-3 py-2 align-top">
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700 p-1 rounded"
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
const TambahSertifikasi = () => {
    const navigate = useNavigate();
    const [pegawaiSearch, setPegawaiSearch] = useState("");
    const [openPegawai, setOpenPegawai] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState<PegawaiOption | null>(null);
    const [debouncedSearch] = useDebounce(pegawaiSearch, 400);

    const form = useForm<FormSchemaType>({
        defaultValues: {
            pegawai_id: "",
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
            dokumen: [],
        },
        resolver: zodResolver(formSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "dokumen",
    });

    const { data: pegawaiOptions, isLoading: isLoadingPegawai } = useQuery<PegawaiOption[]>({
        queryKey: ["search-pegawai-admin", debouncedSearch],
        queryFn: async () => {
            const res = await adminServices.searchPegawai({ search: debouncedSearch, is_dropdown: true });
            return res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (formData: FormData) =>
            // TODO: ganti dengan service asli
            postDosenServices.addDataSertifikasi(formData),
        onSuccess: () => {
            toast.success("Data berhasil ditambahkan.");
            navigate(-1);
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Gagal menambahkan data.");
        },
    });

    const onSubmit = (values: FormSchemaType) => {
        const formData = new FormData();

        // Field utama
        formData.append("pegawai_id", values.pegawai_id);
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

        // Dokumen: metadata sebagai JSON
        const dokumenMeta = (values.dokumen ?? []).map((dok, index) => ({
            tipe_dokumen: dok.tipe_dokumen,
            // file_name: dari file.name jika upload, dari input manual jika url
            file_name: dok.tipe_dokumen === "file"
                ? (dok.file as File).name
                : dok.file_name,
            url_dokumen: dok.tipe_dokumen === "url" ? dok.url_dokumen : null,
            keterangan: dok.keterangan || null,
        }));
        formData.append("dokumen", JSON.stringify(dokumenMeta));

        // File fisik — index harus match dengan posisi di dokumenMeta
        (values.dokumen ?? []).forEach((dok, index) => {
            if (dok.tipe_dokumen === "file" && dok.file instanceof File) {
                formData.append(`dokumen[${index}][file]`, dok.file);
            }
        });

        mutate(formData);
    };

    return (
        <div className="mt-10 mb-20">
            <Title title="Tambah Data Sertifikasi" subTitle="Formulir Input Data Sertifikasi" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CustomCard
                        actions={
                            <div className="flex justify-end gap-2 w-full mt-6 flex-col md:flex-row">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => navigate(-1)}
                                >
                                    <IoIosArrowBack /> Kembali
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-[#FDA31A] hover:bg-[#e08c10] text-white"
                                >
                                    <MdOutlineSave />
                                    {isPending ? "Menyimpan..." : "Simpan"}
                                </Button>
                            </div>
                        }
                    />

                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        {/* Pilih Pegawai */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <Label className="text-[#3F6FA9] font-medium">
                                Pilih Pegawai <span className="text-red-500">*</span>
                            </Label>
                            <Popover open={openPegawai} onOpenChange={setOpenPegawai}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" className="justify-between w-full">
                                        {selectedPegawai
                                            ? `${selectedPegawai.nip} — ${selectedPegawai.nama}`
                                            : "-- Cari NIP atau nama pegawai --"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                                    <Command shouldFilter={false}>
                                        <CommandInput
                                            placeholder="Ketik NIP atau nama..."
                                            value={pegawaiSearch}
                                            onValueChange={setPegawaiSearch}
                                        />
                                        <CommandList>
                                            {isLoadingPegawai ? (
                                                <CommandEmpty>Mencari...</CommandEmpty>
                                            ) : !pegawaiOptions?.length ? (
                                                <CommandEmpty>Pegawai tidak ditemukan.</CommandEmpty>
                                            ) : (
                                                <CommandGroup>
                                                    {pegawaiOptions.map((p) => (
                                                        <CommandItem
                                                            key={p.id}
                                                            value={p.id}
                                                            onSelect={() => {
                                                                setSelectedPegawai(p);
                                                                form.setValue("pegawai_id", p.id, { shouldValidate: true });
                                                                setOpenPegawai(false);
                                                            }}
                                                        >
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
                            {form.formState.errors.pegawai_id && (
                                <p className="text-xs text-red-500">{form.formState.errors.pegawai_id.message}</p>
                            )}
                        </div>

                        {/* Field Sertifikasi */}
                        <InfiniteScrollSelect form={form} label="Jenis Sertifikasi" name="jenis_sertifikasi_id" labelStyle="text-[#3F6FA9]" placeholder="--Pilih Jenis Sertifikasi--" required queryKey="jenis_sertifikasi_list" queryFn={(page) => adminServices.getJenisSertifikasiReferensi({ page, is_dropdown: true })} itemValue="id" itemLabel="nama_sertifikasi" />
                        <InfiniteScrollSelect form={form} label="Bidang Studi" name="rumpun_bidang_ilmu_id" labelStyle="text-[#3F6FA9]" placeholder="--Pilih Bidang Studi--" required queryKey="rumpun_bidang_ilmu_list" queryFn={(page) => adminServices.getRumpunBidangIlmu({ page, is_dropdown: true })} itemValue="id" itemLabel="nama" />
                        <FormFieldInput form={form} label="Nomor Sertifikasi" name="no_sk" required placeholder="Masukan nomor sertifikasi..." labelStyle="text-[#3F6FA9]" />
                        <FormFieldInput form={form} label="Tanggal Sertifikasi" name="tgl_sk" type="date" required labelStyle="text-[#3F6FA9]" />
                        <FormFieldInput form={form} label="Nomor Register" name="no_register" required placeholder="Masukan nomor register..." labelStyle="text-[#3F6FA9]" />
                        <FormFieldInput form={form} label="Nomor Peserta" name="no_peserta" required placeholder="Masukan nomor peserta..." labelStyle="text-[#3F6FA9]" />
                        <FormFieldInput form={form} label="Kedudukan/Peran" name="peran" required placeholder="Masukan kedudukan/peran..." labelStyle="text-[#3F6FA9]" />
                        <FormFieldInput form={form} label="Penyelenggara" name="penyelenggara" required placeholder="Masukan penyelenggara..." labelStyle="text-[#3F6FA9]" />
                        <FormFieldInput form={form} label="Tempat" name="tempat" required placeholder="Masukan tempat..." labelStyle="text-[#3F6FA9]" />
                        <FormFieldSelect form={form} label="Lingkup" name="lingkup" labelStyle="text-[#3F6FA9]" placeholder="--Pilih Lingkup--" required options={LINGKUP_OPTIONS} />
                    </div>

                    {/* ── Dokumen Pendukung ── */}
                    <div className="mt-8 space-y-4">
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
                                            <button
                                                type="button"
                                                onClick={() => append({ ...defaultDokumenRow })}
                                                className="bg-green-500 hover:bg-green-600 text-white rounded p-1"
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
                                            <td colSpan={5} className="text-center py-6 text-gray-400 italic text-sm">
                                                Belum ada dokumen. Klik <strong>+</strong> untuk menambah.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TambahSertifikasi;