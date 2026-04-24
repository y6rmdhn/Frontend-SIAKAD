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
    jenis_test_id: z.string().min(1, "Jenis Tes wajib dipilih"),
    nama: z.string().min(1, "Nama Tes wajib diisi."),
    penyelenggara: z.string().min(1, "Penyelenggara wajib diisi"),
    tgl_test: z.string().min(1, "Tanggal Tes wajib diisi"),
    nilai: z.string().min(1, "Skor Tes wajib diisi"),
    file_test: fileSchema, // Skema untuk upload file
});

type FormSchemaType = z.infer<typeof formSchema>;

interface PegawaiOption {
    id: string;
    nama: string;
    nip: string;
}

const TambahTes = () => {
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
            jenis_test_id: "",
            nama: "",
            tgl_test: "",
            penyelenggara: "",
            nilai: "",
            file_test: undefined,
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
            postDosenServices.addDataTes(formData),
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
        formData.append("jenis_test_id", values.jenis_test_id);
        formData.append("nama", values.nama);
        formData.append("tgl_test", values.tgl_test);
        formData.append("nilai", values.nilai);
        formData.append("penyelenggara", values.penyelenggara);


        // Upload File
        if (values.file_test instanceof FileList && values.file_test.length > 0) {
            formData.append("file_test", values.file_test[0]);
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
                        <InfiniteScrollSelect
                            form={form}
                            label="Jenis Tes"
                            name="jenis_test_id"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="--Pilih Jenis Tes--"
                            required
                            queryKey="jenis_test_admin_tambah"
                            queryFn={(page) => dosenServices.getJenisTes({ page, is_dropdown: true })}
                            itemValue="id"
                            itemLabel="jenis_test"
                        />

                        <FormFieldInput
                            form={form}
                            label="Nama Tes"
                            name="nama"
                            required
                            placeholder="Masukan nama tes..."
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Penyelenggara"
                            name="penyelenggara"
                            required
                            placeholder="Masukan penyelenggara..."
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInput
                            form={form}
                            label="Tanggal Tes"
                            name="tgl_test"
                            type="date"
                            required
                            labelStyle="text-[#3F6FA9]"
                        />


                        <FormFieldInput
                            form={form}
                            label="Skor Tes"
                            name="nilai"
                            labelStyle="text-[#3F6FA9]"
                            placeholder="Masukan skor tes..."
                        />

                        <FormFieldInputFile
                            label="Upload Dokumen"
                            name="file_test"
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

export default TambahTes;
