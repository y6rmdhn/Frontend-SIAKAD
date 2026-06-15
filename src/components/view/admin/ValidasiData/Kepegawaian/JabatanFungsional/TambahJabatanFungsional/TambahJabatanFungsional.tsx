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
import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "@/services/endpoint.constant";
import dosenServices from "@/services/dosen.services";
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
    jabatan_fungsional_id: z.string().min(1, "Nama data wajib diisi."),
    tmt_jabatan: z.string().min(1, "Tanggal wajib diisi."),
    pejabat_penetap: z.string().min(1, "Nama wajib diisi."),
    no_sk: z.string().min(1, "Nomor SK wajib diisi."),
    tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
    angka_kredit: z.string().min(1, "Angka kredit wajib diisi."),
    keterangan: z.string().optional(),
    file_dokumen: fileSchema, // Skema untuk upload file
});

type FormSchemaType = z.infer<typeof formSchema>;

interface PegawaiOption {
    id: string;
    nama: string;
    nip: string;
}

const TambahJabatanFungsional = () => {
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
            jabatan_fungsional_id: "",
            tmt_jabatan: "",
            pejabat_penetap: "",
            no_sk: "",
            tgl_sk: "",
            angka_kredit: "",
            keterangan: "",
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
            postDosenServices.addDataJabatanfungsional(formData),
        onSuccess: () => {
            toast.success("Data berhasil ditambahkan.");
            navigate("/admin/validasi-data/kepegawaian/jabatan-fungsional"); // Kembali ke halaman sebelumnya
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Gagal menambahkan data.");
        },
    });

    const onSubmit = (values: FormSchemaType) => {
        const formData = new FormData();
        formData.append("pegawai_id", values.pegawai_id);
        formData.append("jabatan_fungsional_id", values.jabatan_fungsional_id);
        formData.append("tmt_jabatan", values.tmt_jabatan);
        formData.append("pejabat_penetap", values.pejabat_penetap);
        formData.append("no_sk", values.no_sk);
        formData.append("tgl_sk", values.tgl_sk);
        formData.append("angka_kredit", values.angka_kredit);
        if (values.keterangan) formData.append("keterangan", values.keterangan);

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
                            label="Nama Jabatan Fungsional"
                            name="jabatan_fungsional_id"
                            required
                            queryKey="jabatan_fungsional_admin_tambah"
                            queryFn={(page) => adminServices.getJabatanFungsional({ page, is_dropdown: true })}
                            placeholder="-- Pilih Jabatan Fungsional --"
                            labelStyle="text-[#3F6FA9]"
                            itemLabel="nama"
                            itemValue="id"
                        />
                        <FormFieldInput
                            form={form}
                            label="No SK"
                            name="no_sk"
                            required
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
                            label="TMT. Jabatan Fungsional"
                            name="tmt_jabatan"
                            type="date"
                            required
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

                        <FormFieldInput
                            form={form}
                            label="Angka Kredit"
                            name="angka_kredit"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="Masukkan angka kredit..."
                            type="number"
                        />
                        <FormFieldInput
                            form={form}
                            label="Pejabat Penetap"
                            name="pejabat_penetap"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInputFile
                            label="Upload SK Jabatan Fungsional"
                            name="file_jabatan_fungsional"
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

export default TambahJabatanFungsional;
