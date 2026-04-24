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

import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

import adminServices from "@/services/admin.services";
import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "@/services/endpoint.constant";
import dosenServices from "@/services/dosen.services";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";

// ── Schema ────────────────────────────────────────────────────────────────────
const tambahSchema = z.object({
  pegawai_id: z.string().min(1, "Pegawai wajib dipilih."),
  jabatan_struktural_id: z.string().min(1, "Jabatan Struktural wajib diisi."),
  no_sk: z.string().min(1, "No SK wajib diisi."),
  tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
  tgl_mulai: z.string().min(1, "Tanggal mulai wajib diisi."),
  tgl_selesai: z.string().optional(),
  pejabat_penetap: z.string().optional(),
  file_jabatan_struktural: fileSchema,
});
type TambahSchema = z.infer<typeof tambahSchema>;

interface PegawaiOption { id: string; nama: string; nip: string }

// ── Komponen ──────────────────────────────────────────────────────────────────
const TambahJabatanStruktural = () => {
  const navigate = useNavigate();
  const [pegawaiSearch, setPegawaiSearch] = useState("");
  const [openPegawai, setOpenPegawai] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState<PegawaiOption | null>(null);
  const [debouncedSearch] = useDebounce(pegawaiSearch, 400);

  const form = useForm<TambahSchema>({
    defaultValues: {
      pegawai_id: "",
      jabatan_struktural_id: "",
      no_sk: "",
      tgl_sk: "",
      tgl_mulai: "",
      tgl_selesai: "",
      pejabat_penetap: "",
      file_jabatan_struktural: undefined,
    },
    resolver: zodResolver(tambahSchema),
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
      axiosInstance.post(`${endpoint.VALIDASI}/data-jabatan-struktural`, formData),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan.");
      navigate("/admin/validasi-data/kepegawaian/jabatan-struktural");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal menambahkan data.");
    },
  });

  const onSubmit = (values: TambahSchema) => {
    const formData = new FormData();
    formData.append("pegawai_id", values.pegawai_id);
    formData.append("jabatan_struktural_id", values.jabatan_struktural_id);
    formData.append("no_sk", values.no_sk);
    formData.append("tgl_sk", values.tgl_sk);
    formData.append("tgl_mulai", values.tgl_mulai);
    if (values.tgl_selesai) formData.append("tgl_selesai", values.tgl_selesai);
    if (values.pejabat_penetap) formData.append("pejabat_penetap", values.pejabat_penetap);
    if (values.file_jabatan_struktural instanceof FileList && values.file_jabatan_struktural.length > 0) {
      formData.append("file_jabatan_struktural", values.file_jabatan_struktural[0]);
    }
    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Data Jabatan Struktural" subTitle="Tambah Jabatan Struktural (Admin)" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CustomCard
            actions={
              <div className="flex justify-end gap-2 w-full mt-6 flex-col md:flex-row">
                <Button
                  type="button"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigate("/admin/validasi-data/kepegawaian/jabatan-struktural")}
                >
                  <IoIosArrowBack /> Kembali
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-[#FDA31A] hover:bg-[#e08c10]"
                >
                  <MdOutlineSave />
                  {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            }
          />

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {/* ── Search Pegawai (Combobox) ─────────────────────────────── */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label className="text-[#3F6FA9] font-medium">
                Cari Pegawai <span className="text-red-500">*</span>
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
                <PopoverContent className="w-full p-0" align="start">
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

            {/* ── Jabatan Struktural (InfiniteScrollSelect) ──────────────── */}
            <InfiniteScrollSelect
              form={form}
              label="Jabatan Struktural"
              name="jabatan_struktural_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Jabatan Struktural--"
              required
              queryKey="jabatan_struktural_admin_tambah"
              queryFn={(page) => dosenServices.getJabatanStrukturalSelect({
                is_dropdown: true,
                page: page
              })}
              itemValue="id"
              itemLabel="singkatan"
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
              label="Tgl. Mulai"
              name="tgl_mulai"
              type="date"
              required
              labelStyle="text-[#3F6FA9]"
            />

            <FormFieldInput
              form={form}
              label="Tgl. Selesai"
              name="tgl_selesai"
              type="date"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />

            <FormFieldInput
              form={form}
              label="Pejabat Penetap"
              name="pejabat_penetap"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />

            <FormFieldInputFile
              label="File Jabatan Struktural"
              name="file_jabatan_struktural"
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

export default TambahJabatanStruktural;
