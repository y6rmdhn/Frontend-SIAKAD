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

// UI Components
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

// Custom Blocks
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";

// Services
import adminServices from "@/services/admin.services";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import postDosenServices from "@/services/create.dosen.services";

/* 
  =============================================================================
    1. SCHEMA VALIDASI (ZOD)
      Sesuaikan field dengan kebutuhan API masing-masing model.
        =============================================================================
        */
const formSchema = z.object({
    pegawai_id: z.string().min(1, "Pegawai wajib dipilih."),
    /* Field Placeholder: Tambahkan field lain di bawah ini */
    bidang_usaha: z.string().min(1, "Bidang Usaha wajib diisi."),
    jenis_pekerjaan: z.string().min(1, "Jenis Pekerjaan wajib diisi."),
    nama_perusahaan: z.string().min(1, "Nama Perusahaan wajib diisi."),
    jabatan: z.string().min(1, "Jabatan wajib diisi."),
    divisi: z.string().min(1, "Divisi wajib diisi."),
    deskripsi_pekerjaan: z.string().optional(),
    tgl_mulai: z.string().min(1, "Tanggal Mulai wajib diisi."),
    tgl_selesai: z.string().min(1, "Tanggal Selesai wajib diisi."),
    is_lokasi: z.enum(["Dalam Negeri", "Luar Negeri"]).default("Dalam Negeri"),
    file_dokumen: fileSchema, // Skema untuk upload file
});

const TIPE_DOKUMEN_OPTIONS = [
    { value: "file", label: "File Upload" },
    { value: "url", label: "Tautan (URL)" },
];
const defaultDokumenRow = {
    tipe_dokumen: "file" as "file" | "url",
    file: null as File | null,
    url_dokumen: "",
    file_name: "",   // manual input jika tipe url
    keterangan: "",
};
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


const TambahRiwayatPekerjaan = () => {
    const navigate = useNavigate();
    const [pegawaiSearch, setPegawaiSearch] = useState("");
    const [openPegawai, setOpenPegawai] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState<PegawaiOption | null>(null);
    const [debouncedSearch] = useDebounce(pegawaiSearch, 400);

    /* 
        =============================================================================
            2. INITIAL VALUES
                =============================================================================
                  */
    const form = useForm<FormSchemaType>({
        defaultValues: {
            pegawai_id: "",
            bidang_usaha: "",
            jenis_pekerjaan: "",
            nama_perusahaan: "",
            jabatan: "",
            divisi: "",
            deskripsi_pekerjaan: "",
            tgl_mulai: "",
            tgl_selesai: "",
            is_lokasi: "Dalam Negeri",
            file_dokumen: undefined,
        },
        resolver: zodResolver(formSchema),
    });


    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "dokumen",
    });
    /* 
        =============================================================================
            3. SEARCH PEGAWAI (COMBOBOX)
                Fungsi ini mengambil data pegawai dari API untuk dipilih admin.
                    =============================================================================
                      */
    const { data: pegawaiOptions, isLoading: isLoadingPegawai } = useQuery<PegawaiOption[]>({
        queryKey: ["search-pegawai-admin", debouncedSearch],
        queryFn: async () => {
            const res = await adminServices.searchPegawai({ search: debouncedSearch, is_dropdown: true });
            return res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
        },
    });

    /* 
        =============================================================================
            4. MUTATION (POST DATA)
                Ganti 'placeholderService' dengan service yang sebenarnya nanti.
                    =============================================================================
                      */
    const { mutate, isPending } = useMutation({
        mutationFn: (formData: FormData) =>
            postDosenServices.addDataRiwayatPekerjaan(formData),
        onSuccess: () => {
            toast.success("Data berhasil ditambahkan.");
            navigate(-1); // Kembali ke halaman sebelumnya
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Gagal menambahkan data.");
        },
    });

    const onSubmit = (values: FormSchemaType) => {
        const formData = new FormData();
        formData.append("pegawai_id", values.pegawai_id);
        formData.append("bidang_usaha", values.bidang_usaha);
        formData.append("jenis_pekerjaan", values.jenis_pekerjaan);
        formData.append("nama_perusahaan", values.nama_perusahaan);
        formData.append("jabatan", values.jabatan);
        formData.append("divisi", values.divisi);
        formData.append("deskripsi_pekerjaan", values.deskripsi_pekerjaan);
        formData.append("tgl_mulai", values.tgl_mulai);
        formData.append("tgl_selesai", values.tgl_selesai);
        formData.append("is_lokasi", values.is_lokasi);

        // Upload File
        if (values.file_dokumen instanceof FileList && values.file_dokumen.length > 0) {
            formData.append("file_dokumen", values.file_dokumen[0]);
        }

        mutate(formData);
    };

    return (
        <div className="mt-10 mb-20">
            <Title title="Tambah Data Baru" subTitle="Formulir Input Data Validasi" />

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
                        {/* ── 5. SELECTION PEGAWAI (REUSABLE) ── */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <Label className="text-[#3F6FA9] font-medium">
                                Pilih Pegawai <span className="text-red-500">*</span>
                            </Label>
                            <Popover open={openPegawai} onOpenChange={setOpenPegawai}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openPegawai}
                                        className="justify-between w-full"
                                    >
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
                                                            <Check
                                                                className={cn("mr-2 h-4 w-4", selectedPegawai?.id === p.id ? "opacity-100" : "opacity-0")}
                                                            />
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

                        {/* ── 6. DUMMY FORM FIELDS (Ganti sesuai model) ── */}

                        {/* 
            <InfiniteScrollSelect
              form={form}
              label="Jenis SK"
              name="jenis_sk_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Jenis SK--"
              required
              queryKey="jenis_sk_admin_tambah"
              queryFn={(page) => dosenServices.getJenisSk({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="jenis_sk"
            /> */}
                        <FormFieldInput
                            form={form}
                            label="Bidang Usaha"
                            name="bidang_usaha"
                            required
                            placeholder="Masukan Bidang Usaha..."
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Jenis Pekerjaan"
                            name="jenis_pekerjaan"
                            required
                            placeholder="Masukan Jenis Pekerjaan..."
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Nama Perusahaan"
                            name="nama_perusahaan"
                            required
                            placeholder="Masukan Nama Perusahaan..."
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Jabatan"
                            name="jabatan"
                            required
                            placeholder="Masukan Jabatan..."
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Divisi"
                            name="divisi"
                            required
                            placeholder="Masukan Divisi..."
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Tanggal Mulai"
                            name="tgl_mulai"
                            type="date"
                            required
                            labelStyle="text-[#3F6FA9]"
                        />


                        <FormFieldInput
                            form={form}
                            label="Tanggal Selesai"
                            name="tgl_selesai"
                            type="date"
                            required
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Lokasi"
                            name="is_lokasi"
                            required
                            placeholder="Pilih Lokasi..."
                            labelStyle="text-[#3F6FA9]"
                            type="radio"
                            options={[
                                { value: "Dalam Negeri", label: "Dalam Negeri" },
                                { value: "Luar Negeri", label: "Luar Negeri" },
                            ]}
                        />

                        <FormFieldInputFile
                            label="Upload Dokumen"
                            name="file_dokumen"
                            classname="border-none shadow-none"
                            labelStyle="text-[#3F6FA9]"
                            required={false}
                        />
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

export default TambahRiwayatPekerjaan;
