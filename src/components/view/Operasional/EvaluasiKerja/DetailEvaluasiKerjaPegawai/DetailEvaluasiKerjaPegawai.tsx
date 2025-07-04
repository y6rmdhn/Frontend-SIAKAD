import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// UI Components
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";

// Icons
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import postDosenServices from "@/services/create.dosen.services";

// --- Skema Validasi Zod untuk Pegawai (Tendik) ---
const evaluasiKerjaPegawaiSchema = z.object({
  pegawai_id: z.number(),
  periode_tahun: z.string().length(4, "Tahun harus 4 digit"),
  tanggal_penilaian: z.string().nonempty("Tanggal penilaian wajib diisi."),
  nilai_kehadiran: z.coerce
    .number()
    .min(0, "Nilai min 0")
    .max(100, "Nilai maks 100"),
  nilai_penerapan_tridharma: z.coerce
    .number()
    .min(0, "Nilai min 0")
    .max(100, "Nilai maks 100"),
  nilai_komitmen_disiplin: z.coerce
    .number()
    .min(0, "Nilai min 0")
    .max(100, "Nilai maks 100"),
  nilai_kepemimpinan_kerjasama: z.coerce
    .number()
    .min(0, "Nilai min 0")
    .max(100, "Nilai maks 100"),
  nilai_inisiatif_integritas: z.coerce
    .number()
    .min(0, "Nilai min 0")
    .max(100, "Nilai maks 100"),
});

export type EvaluasiKerjaPegawaiFormValues = z.infer<
  typeof evaluasiKerjaPegawaiSchema
>;

// --- Komponen Utama ---
const DetailEvaluasiKerjaPegawai = () => {
  const { id: pegawaiId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // --- Form ---
  const form = useForm<EvaluasiKerjaPegawaiFormValues>({
    resolver: zodResolver(evaluasiKerjaPegawaiSchema),
    defaultValues: {
      pegawai_id: pegawaiId ? parseInt(pegawaiId, 10) : undefined,
      periode_tahun: new Date().getFullYear().toString(),
      tanggal_penilaian: new Date().toISOString().split("T")[0],
    },
  });

  // --- Data Mutation (POST) ---
  const { mutate: submitEvaluation, isPending: isSubmitting } = useMutation({
    mutationFn: (data: EvaluasiKerjaPegawaiFormValues) =>
      postDosenServices.postEvaluasiKinerja(data),
    onSuccess: () => {
      toast.success("Evaluasi kinerja berhasil disimpan.");
      queryClient.invalidateQueries({ queryKey: ["evaluasi-kinerja-pegawai"] });
      navigate("/operasional/evaluasi-kerja");
    },
    onError: (err: any) => {
      toast.error(
        `Gagal menyimpan: ${err.response?.data?.message || err.message}`
      );
    },
  });

  const onSubmit = (values: EvaluasiKerjaPegawaiFormValues) => {
    submitEvaluation(values);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Evaluasi Kerja" subTitle="Form Evaluasi Kerja Pegawai" />

      <CustomCard>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Baris Kedua: Field Penilaian */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-4">
                <FormFieldInput
                  form={form}
                  name="periode_tahun"
                  label="Periode Tahun"
                  placeholder="Contoh: 2024"
                />
                <FormFieldInput
                  form={form}
                  name="tanggal_penilaian"
                  label="Tanggal Penilaian"
                  type="date"
                />
                <FormFieldInput
                  form={form}
                  name="nilai_kehadiran"
                  label="1. Kehadiran *"
                  type="number"
                />
                <FormFieldInput
                  form={form}
                  name="nilai_penerapan_tridharma"
                  label="2. Penerapan Tridharma"
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-4">
                <FormFieldInput
                  form={form}
                  name="nilai_komitmen_disiplin"
                  label="3. Komitmen & Disiplin"
                  type="number"
                />
                <FormFieldInput
                  form={form}
                  name="nilai_kepemimpinan_kerjasama"
                  label="4. Kepemimpinan & Kerjasama"
                  type="number"
                />
                <FormFieldInput
                  form={form}
                  name="nilai_inisiatif_integritas"
                  label="5. Inisiatif & Integritas"
                  type="number"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8 gap-4">
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
                className="bg-[#3ABC67] hover:bg-[#32a95c]"
                disabled={isSubmitting}
              >
                <MdOutlineFileDownload className="mr-2" />
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </CustomCard>
    </div>
  );
};

export default DetailEvaluasiKerjaPegawai;
