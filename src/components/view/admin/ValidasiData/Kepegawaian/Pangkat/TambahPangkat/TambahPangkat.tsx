import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";

// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

// Services
import adminServices from "@/services/admin.services";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import postDosenServices from "@/services/create.dosen.services";
import dosenServices from "@/services/dosen.services";

/* 
  =============================================================================
  1. SCHEMA VALIDASI (ZOD)
  Sesuaikan field dengan kebutuhan API masing-masing model.
  =============================================================================
*/
const formSchema = z.object({
    pegawai_id: z.string().min(1, "Pegawai wajib dipilih."),
    /* Field Placeholder: Tambahkan field lain di bawah ini */
    jenis_kenaikan_pangkat_id: z.string().min(1, "Jenis kenaikan pangkat wajib diisi."),
    pangkat_id: z.string().min(1, "Pangkat wajib diisi."),
    jenis_sk_id: z.string().min(1, "Jenis SK wajib diisi."),
    no_sk: z.string().min(1, "Nomor SK wajib diisi."),
    tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
    tmt_pangkat: z.string().min(1, "TMT Pangkat wajib diisi."),
    masa_kerja_tahun: z.string().min(1, "Masa Kerja Tahun wajib diisi."),
    masa_kerja_bulan: z.string().min(1, "Masa Kerja Bulan wajib diisi."),
    pejabat_penetap: z.string().min(1, "Pejabat Penetap wajib diisi."),
    is_acuan_masa_kerja: z.boolean().default(false),
    file_dokumen: fileSchema, // Skema untuk upload file
});

type FormSchemaType = z.infer<typeof formSchema>;

interface PegawaiOption {
    id: string;
    nama: string;
    nip: string;
}

const TambahPangkat = () => {
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
            jenis_kenaikan_pangkat_id: "",
            pangkat_id: "",
            jenis_sk_id: "",
            no_sk: "",
            tgl_sk: "",
            tmt_pangkat: "",
            masa_kerja_tahun: "",
            masa_kerja_bulan: "",
            pejabat_penetap: "",
            is_acuan_masa_kerja: false,
            file_dokumen: undefined,
        },
        resolver: zodResolver(formSchema),
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
            postDosenServices.addDataPangkat(formData),
        onSuccess: () => {
            toast.success("Data berhasil ditambahkan.");
            navigate("/admin/validasi-data/kepegawaian/pangkat");
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Gagal menambahkan data.");
        },
    });

    const onSubmit = (values: FormSchemaType) => {
        const formData = new FormData();
        formData.append("pegawai_id", values.pegawai_id);
        formData.append("jenis_kenaikan_pangkat_id", values.jenis_kenaikan_pangkat_id);
        formData.append("pangkat_id", values.pangkat_id);
        formData.append("jenis_sk_id", values.jenis_sk_id);
        formData.append("no_sk", values.no_sk);
        formData.append("tgl_sk", values.tgl_sk);
        formData.append("tmt_pangkat", values.tmt_pangkat);
        formData.append("masa_kerja_tahun", values.masa_kerja_tahun);
        formData.append("masa_kerja_bulan", values.masa_kerja_bulan);
        formData.append("pejabat_penetap", values.pejabat_penetap);
        formData.append("is_acuan_masa_kerja", values.is_acuan_masa_kerja.toString());

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
                        <InfiniteScrollSelect
                            form={form}
                            label="Pangkat"
                            name="pangkat_id"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="--Pilih Pangkat--"
                            required
                            queryKey="pangkat_admin_tambah"
                            queryFn={(page) => dosenServices.getPangkat({ page, is_dropdown: true })}
                            itemValue="id"
                            itemLabel="nama"
                        />
                        <InfiniteScrollSelect
                            form={form}
                            label="Jenis Kenaikan Pangkat"
                            name="jenis_kenaikan_pangkat_id"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="--Pilih Jenis Kenaikan Pangkat--"
                            required
                            queryKey="jenis_kenaikan_pangkat_admin_tambah"
                            queryFn={(page) => dosenServices.getJenisKenaikanPangkat({ page, is_dropdown: true })}
                            itemValue="id"
                            itemLabel="nama"
                        />
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
                        />

                        <FormFieldInput
                            form={form}
                            label="TMT. Pangkat"
                            name="tmt_pangkat"
                            type="date"
                            required
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="No. SK"
                            name="no_sk"
                            required
                            placeholder="Masukan nomor SK ..."
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Tgl. SK"
                            name="tgl_sk"
                            type="date"
                            required
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Masa Kerja Tahun"
                            name="masa_kerja_tahun"
                            type="number"
                            required
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Masa Kerja Bulan"
                            name="masa_kerja_bulan"
                            type="number"
                            required
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Acuan Masa Kerja"
                            name="is_acuan_masa_kerja"
                            type="checkbox"
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Pejabat Penetap"
                            name="pejabat_penetap"
                            required
                            placeholder="Masukan nama pejabat ..."
                            labelStyle="text-[#3F6FA9]"
                        />


                        {/* Contoh InfiniteScrollSelect jika ada pilihan dropdown dari API */}
                        {/* 
            <InfiniteScrollSelect
              form={form}
              label="Kategori"
              name="kategori_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Kategori--"
              required
              queryKey="kategori_list"
              queryFn={(page) => dummyServices.getKategori({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="nama"
            /> 
            */}

                        <FormFieldInputFile
                            label="Upload Dokumen"
                            name="file_pangkat"
                            classname="border-none shadow-none"
                            labelStyle="text-[#3F6FA9]"
                            required={false}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TambahPangkat;
