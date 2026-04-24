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
import postDosenServices from "@/services/create.dosen.services";
import dosenServices from "@/services/dosen.services";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";

// ── Schema ───────────────────────────────────────────────────────────────────
const tambahSchema = z.object({
  pegawai_id: z.string().min(1, "Pegawai wajib dipilih."),
  hubungan_kerja_id: z.string().min(1, "Hubungan Kerja wajib diisi."),
  status_aktif_id: z.string().min(1, "Status Aktif wajib diisi."),
  no_sk: z.string().min(1, "No SK wajib diisi."),
  tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
  tgl_mulai: z.string().min(1, "Tanggal mulai wajib diisi."),
  tgl_selesai: z.string().optional(),
  pejabat_penetap: z.string().optional(),
  file_hubungan_kerja: fileSchema,
});
type TambahSchema = z.infer<typeof tambahSchema>;

interface PegawaiOption { id: string; nama: string; nip: string }

// ── Komponen ─────────────────────────────────────────────────────────────────
const TambahHubunganKerja = () => {
  const navigate = useNavigate();
  const [pegawaiSearch, setPegawaiSearch] = useState("");
  const [openPegawai, setOpenPegawai] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState<PegawaiOption | null>(null);
  const [debouncedSearch] = useDebounce(pegawaiSearch, 400);

  const form = useForm<TambahSchema>({
    defaultValues: {
      pegawai_id: "",
      hubungan_kerja_id: "",
      status_aktif_id: "",
      no_sk: "",
      tgl_sk: "",
      tgl_mulai: "",
      tgl_selesai: "",
      pejabat_penetap: "",
      file_hubungan_kerja: undefined,
    },
    resolver: zodResolver(tambahSchema),
  });

  // Search pegawai
  const { data: pegawaiOptions, isLoading: isLoadingPegawai } = useQuery<PegawaiOption[]>({
    queryKey: ["search-pegawai-admin", debouncedSearch],
    queryFn: async () => {
      const res = await adminServices.searchPegawai({ search: debouncedSearch, is_dropdown: true });
      // Sesuaikan dengan struktur respons BE: data.data atau data[]
      return res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
    },
  });

  // Mutation POST (pakai endpoint admin /validasi/data-hubungan-kerja)
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataHubungankerja(formData),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan.");
      navigate("/admin/validasi-data/kepegawaian/hubungan-kerja");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal menambahkan data.");
    },
  });

  const onSubmit = (values: TambahSchema) => {
    const formData = new FormData();
    console.log("ID Pegawai yang dipilih:", values.pegawai_id);
    formData.append("pegawai_id", values.pegawai_id);
    formData.append("hubungan_kerja_id", values.hubungan_kerja_id);
    formData.append("status_aktif_id", values.status_aktif_id);
    formData.append("no_sk", values.no_sk);
    formData.append("tgl_sk", values.tgl_sk);
    formData.append("tgl_mulai", values.tgl_mulai);
    if (values.tgl_selesai) formData.append("tgl_selesai", values.tgl_selesai);
    if (values.pejabat_penetap) formData.append("pejabat_penetap", values.pejabat_penetap);
    if (values.file_hubungan_kerja instanceof FileList && values.file_hubungan_kerja.length > 0) {
      formData.append("file_hubungan_kerja", values.file_hubungan_kerja[0]);
    }
    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Data Hubungan Kerja" subTitle="Tambah Hubungan Kerja (Admin)" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CustomCard
            actions={
              <div className="flex justify-end gap-2 w-full mt-6 flex-col md:flex-row">
                <Button
                  type="button"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigate("/admin/validasi-data/kepegawaian/hubungan-kerja")}
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

            {/* ── Search Pegawai (Combobox) ────────────────────────────── */}
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
              {/* Hidden input agar error zod muncul */}
              <Input type="hidden" {...form.register("pegawai_id")} />
              {form.formState.errors.pegawai_id && (
                <p className="text-xs text-red-500">{form.formState.errors.pegawai_id.message}</p>
              )}
            </div>

            {/* ── Form Fields ──────────────────────────────────────────── */}
            <InfiniteScrollSelect
              form={form}
              label="Hubungan Kerja"
              name="hubungan_kerja_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Hubungan Kerja--"
              required
              queryKey="hubungan_kerja_admin_tambah"
              queryFn={(page) => dosenServices.getHubunganKerjaSelect({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="nama"
            />

            <InfiniteScrollSelect
              form={form}
              label="Status Aktif"
              name="status_aktif_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Status Aktif--"
              required
              queryKey="status_aktif_admin_tambah"
              queryFn={(page) => dosenServices.getStatusAktifSelect({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="nama"
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
              label="File Hubungan Kerja"
              name="file_hubungan_kerja"
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

export default TambahHubunganKerja;
