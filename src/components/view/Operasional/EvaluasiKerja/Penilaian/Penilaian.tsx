import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import { ChevronsUpDown } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// UI Components
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";

// Services
import dosenServices from "@/services/dosen.services";
import postDosenServices from "@/services/create.dosen.services";

// --- Zod Schema ---
const penilaianSchema = z
  .object({
    pegawai_dinilai_id: z.string().min(1, "Pegawai wajib dipilih"),
    pegawai_penilai_id: z.string().min(1, "Penilai wajib diisi"),
    pegawai_atasan_id: z.string().min(1, "Atasan evaluator wajib terdeteksi. Silakan hubungi admin."),
    template_id: z.string().min(1, "Template evaluasi wajib dipilih"),
    periode_start: z.string().nonempty("Tanggal awal periode wajib diisi"),
    periode_end: z.string().nonempty("Tanggal akhir periode wajib diisi"),
  })
  .refine(
    (data) => {
      if (!data.periode_start || !data.periode_end) return true;
      return new Date(data.periode_end) >= new Date(data.periode_start);
    },
    {
      message: "Tanggal akhir tidak boleh mendahului tanggal awal",
      path: ["periode_end"],
    }
  );

type PenilaianFormValues = z.infer<typeof penilaianSchema>;

interface PegawaiOption {
  id: string | number;
  nama?: string;
  nama_pegawai?: string;
  nama_lengkap?: string;
  nip: string;
}

const Penilaian = () => {
  const navigate = useNavigate();
  const userSelector = useSelector((state: RootState) => state.user);

  // --- States ---
  const [pegawaiSearch, setPegawaiSearch] = useState("");
  const [openPegawai, setOpenPegawai] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState<PegawaiOption | null>(null);
  const [debouncedSearch] = useDebounce(pegawaiSearch, 400);

  // --- Form Hook ---
  const form = useForm<PenilaianFormValues>({
    resolver: zodResolver(penilaianSchema),
    defaultValues: {
      pegawai_dinilai_id: "",
      pegawai_penilai_id: userSelector.pegawai_id || "",
      pegawai_atasan_id: "",
      template_id: "",
      periode_start: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split("T")[0], // Awal bulan ini
      periode_end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split("T")[0], // Akhir bulan ini
    },
  });

  // Keep penilai updated if store state changes
  useEffect(() => {
    if (userSelector.pegawai_id) {
      form.setValue("pegawai_penilai_id", userSelector.pegawai_id);
    }
  }, [userSelector.pegawai_id, form]);

  // --- Fetch Atasan (Structural Superior) ---
  const { data: atasanRes, isLoading: isLoadingAtasan } = useQuery({
    queryKey: ["evaluator-atasan", userSelector.pegawai_id],
    queryFn: async () => {
      const res = await dosenServices.getAtasan();
      return res.data?.data ?? res.data ?? null;
    },
    enabled: !!userSelector.pegawai_id,
  });

  useEffect(() => {
    if (atasanRes?.id) {
      form.setValue("pegawai_atasan_id", String(atasanRes.id));
    }
  }, [atasanRes, form]);

  // --- Fetch Active Templates (Staff / Dosen) ---
  const { data: templatesRes, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ["evaluasi-templates"],
    queryFn: async () => {
      const res = await dosenServices.getEvaluasiTemplates();
      return res.data?.data ?? res.data ?? [];
    },
  });

  // --- Fetch Pegawai Search Options (calls PEGAWAI/list) ---
  const { data: pegawaiOptionsRes, isLoading: isLoadingPegawai } = useQuery({
    queryKey: ["search-pegawai-evaluasi", debouncedSearch],
    queryFn: async () => {
      const res = await dosenServices.getPegawaiList({
        search: debouncedSearch,
      });
      return res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
    },
  });

  const pegawaiOptions: PegawaiOption[] = Array.isArray(pegawaiOptionsRes)
    ? pegawaiOptionsRes
    : [];

  // --- Form Submission Mutation ---
  const { mutate: createTransaction, isPending: isSubmitting } = useMutation({
    mutationFn: (values: PenilaianFormValues) =>
      postDosenServices.createEvaluasiKinerja(values),
    onSuccess: (res: any) => {
      toast.success("Penilaian berhasil dibuat.");
      const createdData = res.data?.data ?? res.data;
      if (createdData?.id) {
        // Redirect directly to the scoring page based on template type
        const selectedTemplate = templatesRes?.find(
          (t: any) => t.id === form.watch("template_id")
        );
        const isDosen = selectedTemplate?.name?.toLowerCase().includes("dosen");
        const evaluationUrl = isDosen
          ? `/operasional/evaluasi-kerja/form-evaluasi-kerja-dosen/${createdData.id}`
          : `/operasional/evaluasi-kerja/form-evaluasi-kerja-pegawai/${createdData.id}`;
        navigate(evaluationUrl);
      } else {
        navigate("/operasional/evaluasi-kerja");
      }
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Gagal membuat penilaian evaluasi."
      );
    },
  });

  const onSubmit = (values: PenilaianFormValues) => {
    createTransaction(values);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Evaluasi Kerja" subTitle="Buat Penilaian Baru" />

      <CustomCard>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* --- Radio Group Selection for Template --- */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label className="text-[#3F6FA9] font-medium text-sm">
                  Jenis Penilaian / Template <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-6 mt-1">
                  {isLoadingTemplates ? (
                    <span className="text-sm text-gray-500">Memuat jenis penilaian...</span>
                  ) : (
                    templatesRes?.map((tpl: any) => (
                      <label key={tpl.id} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                        <input
                          type="radio"
                          name="template_id"
                          value={tpl.id}
                          checked={form.watch("template_id") === tpl.id}
                          onChange={(e) => form.setValue("template_id", e.target.value)}
                          className="w-4 h-4 text-[#FDA31A] focus:ring-[#FDA31A]"
                        />
                        {tpl.name}
                      </label>
                    ))
                  )}
                </div>
                {form.formState.errors.template_id && (
                  <p className="text-xs text-red-500 mt-1">
                    {form.formState.errors.template_id.message}
                  </p>
                )}
              </div>

              {/* --- Combobox Search Pegawai --- */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label className="text-[#3F6FA9] font-medium text-sm">
                  Cari Pegawai Dinilai <span className="text-red-500">*</span>
                </Label>
                <Popover open={openPegawai} onOpenChange={setOpenPegawai}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openPegawai}
                      className="justify-between w-full text-left font-normal"
                    >
                      {selectedPegawai
                        ? `${selectedPegawai.nip} — ${
                            selectedPegawai.nama ||
                            selectedPegawai.nama_pegawai ||
                            selectedPegawai.nama_lengkap ||
                            ""
                          }`
                        : "-- Ketik NIP atau nama pegawai --"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[350px] md:w-[600px] p-0" align="start">
                    <Command shouldFilter={false}>
                      <CommandInput
                        placeholder="Cari NIP atau Nama..."
                        value={pegawaiSearch}
                        onValueChange={setPegawaiSearch}
                      />
                      <CommandList>
                        {isLoadingPegawai ? (
                          <CommandEmpty>Mencari...</CommandEmpty>
                        ) : !pegawaiOptions.length ? (
                          <CommandEmpty>Pegawai tidak ditemukan.</CommandEmpty>
                        ) : (
                          <CommandGroup>
                            {pegawaiOptions.map((p) => {
                              const displayName =
                                p.nama || p.nama_pegawai || p.nama_lengkap || "";
                              return (
                                <CommandItem
                                  key={p.id}
                                  value={String(p.id)}
                                  onSelect={() => {
                                    setSelectedPegawai(p);
                                    form.setValue("pegawai_dinilai_id", String(p.id));
                                    setOpenPegawai(false);
                                  }}
                                >
                                  {p.nip} — {displayName}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {form.formState.errors.pegawai_dinilai_id && (
                  <p className="text-xs text-red-500 mt-1">
                    {form.formState.errors.pegawai_dinilai_id.message}
                  </p>
                )}
              </div>

              {/* --- Read-only resolved Atasan --- */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label className="text-[#3F6FA9] font-medium text-sm">
                  Atasan Evaluator (Penilai Atasan)
                </Label>
                <input
                  type="text"
                  disabled
                  value={
                    isLoadingAtasan
                      ? "Mencari atasan..."
                      : atasanRes
                      ? `${atasanRes.nip} — ${atasanRes.nama}`
                      : "Evaluator tidak memiliki atasan jabatan struktural"
                  }
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed text-sm text-gray-500"
                />
                {form.formState.errors.pegawai_atasan_id && (
                  <p className="text-xs text-red-500 mt-1">
                    {form.formState.errors.pegawai_atasan_id.message}
                  </p>
                )}
              </div>

              {/* --- Periode Start --- */}
              <FormFieldInput
                form={form}
                name="periode_start"
                label="Tanggal Awal Periode *"
                type="date"
              />

              {/* --- Periode End --- */}
              <FormFieldInput
                form={form}
                name="periode_end"
                label="Tanggal Akhir Periode *"
                type="date"
              />

            </div>

            {/* --- Buttons --- */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Link to="/operasional/evaluasi-kerja">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <IoIosArrowBack />
                  Kembali
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FDA31A] hover:bg-[#e08c10] text-white flex items-center gap-2"
              >
                <MdOutlineSave className="text-lg" />
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </CustomCard>
    </div>
  );
};

export default Penilaian;
