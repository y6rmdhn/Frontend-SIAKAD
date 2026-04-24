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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Blocks
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

// Services
import adminServices from "@/services/admin.services";
import dosenServices from "@/services/dosen.services";
import postDosenServices from "@/services/create.dosen.services";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";

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

const formSchema = z.object({
    pegawai_id: z.string().min(1, "Pegawai wajib dipilih."),
    jenis_penghargaan_id: z.string().min(1, "Jenis penghargaan wajib dipilih."),
    kategori: z.string().min(1, "Kategori wajib diisi."),
    tingkat: z.string().min(1, "Tingkat wajib diisi."),
    nama_penghargaan: z.string().min(1, "Nama penghargaan wajib diisi."),
    tgl_penghargaan: z.string().min(1, "Tanggal penghargaan wajib diisi."),
    instansi: z.string().min(1, "Instansi wajib diisi."),
    no_sk: z.string().min(1, "Nomor SK wajib diisi."),
    tanggal_sk: z.string().min(1, "Tanggal SK wajib diisi."),
    dokumen: z.array(dokumenRowSchema).optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface PegawaiOption {
    id: string;
    nama: string;
    nip: string;
}

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

const TambahPenghargaan = () => {
    const navigate = useNavigate();
    const [pegawaiSearch, setPegawaiSearch] = useState("");
    const [openPegawai, setOpenPegawai] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState<PegawaiOption | null>(null);
    const [debouncedSearch] = useDebounce(pegawaiSearch, 400);

    const form = useForm<FormSchemaType>({
        defaultValues: {
            pegawai_id: "",
            jenis_penghargaan_id: "",
            kategori: "",
            tingkat: "",
            nama_penghargaan: "",
            tgl_penghargaan: "",
            instansi: "",
            no_sk: "",
            tanggal_sk: "",
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
            postDosenServices.addDataPenghargaan(formData),
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
        formData.append("pegawai_id", values.pegawai_id);
        formData.append("jenis_penghargaan_id", values.jenis_penghargaan_id);
        formData.append("kategori", values.kategori);
        formData.append("tingkat", values.tingkat);
        formData.append("nama_penghargaan", values.nama_penghargaan);
        formData.append("tgl_penghargaan", values.tgl_penghargaan);
        formData.append("instansi", values.instansi);
        formData.append("no_sk", values.no_sk);
        formData.append("tanggal_sk", values.tanggal_sk);

        const dokumenMeta = (values.dokumen ?? []).map((dok) => ({
            tipe_dokumen: dok.tipe_dokumen,
            file_name: dok.tipe_dokumen === "file" ? (dok.file as File).name : dok.file_name,
            url_dokumen: dok.tipe_dokumen === "url" ? dok.url_dokumen : null,
            keterangan: dok.keterangan || null,
        }));

        if (dokumenMeta.length > 0) {
            formData.append("dokumen", JSON.stringify(dokumenMeta));
        }

        (values.dokumen ?? []).forEach((dok, index) => {
            if (dok.tipe_dokumen === "file" && dok.file instanceof File) {
                formData.append(`dokumen[${index}][file]`, dok.file);
            }
        });

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

                        <InfiniteScrollSelect
                            form={form}
                            label="Jenis Penghargaan"
                            name="jenis_penghargaan_id"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="--Pilih Jenis Penghargaan--"
                            required
                            queryKey="jenis_penghargaan_admin_tambah"
                            queryFn={(page) => dosenServices.getJenisPenghargaanReferensi({ page, is_dropdown: true })}
                            itemValue="id"
                            itemLabel="nama"
                        />
                        <FormFieldSelect
                            form={form}
                            label="Tingkat Penghargaan"
                            name="tingkat"
                            required
                            placeholder="--Pilih Tingkat Penghargaan--"
                            labelStyle="text-[#3F6FA9]"
                            options={[
                                { value: "internasional", label: "Internasional" },
                                { value: "nasional", label: "Nasional" },
                                { value: "provinsi", label: "Provinsi" },
                                { value: "kabupaten/kota", label: "Kabupaten/Kota" },
                                { value: "kecamatan", label: "Kecamatan" },
                                { value: "sekolah", label: "Sekolah" },
                            ]}
                        />

                        <FormFieldInput
                            form={form}
                            label="Kategori"
                            name="kategori"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="Masukkan kategori penghargaan..."
                        />

                        <FormFieldInput
                            form={form}
                            label="Nama Penghargaan"
                            name="nama_penghargaan"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="Masukkan nama penghargaan..."
                        />

                        <FormFieldInput
                            form={form}
                            label="Tanggal Penghargaan"
                            name="tgl_penghargaan"
                            type="date"
                            required
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Instansi Pemberi"
                            name="instansi"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="Masukkan instansi pemberi penghargaan..."
                        />

                        <FormFieldInput
                            form={form}
                            label="Nomor SK"
                            name="no_sk"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="Masukkan nomor SK..."
                        />

                        <FormFieldInput
                            form={form}
                            label="Tanggal SK"
                            name="tanggal_sk"
                            type="date"
                            required
                            labelStyle="text-[#3F6FA9]"
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

export default TambahPenghargaan;
