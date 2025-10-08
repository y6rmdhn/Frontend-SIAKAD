import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

// --- START DEFINISI TIPE ---

const pelanggaranSchema = z.object({
  pegawai_id: z.string(),
  tgl_pelanggaran: z.string().min(1, "Tanggal pelanggaran wajib diisi."),
  jenis_pelanggaran_id: z.string().min(1, "Jenis pelanggaran wajib dipilih."),
  no_sk: z.string().optional(),
  tgl_sk: z.string().optional(),
  keterangan: z.string().optional(),
  file_foto: z.any().optional(),
});

type PelanggaranSchema = z.infer<typeof pelanggaranSchema>;

interface UpdatePelanggaranPayload {
  id: string; // ✅ DIUBAH: number -> string
  data: Omit<PelanggaranSchema, "file_foto" | "pegawai_id">;
}

// Tipe untuk item dari API getJenisPelanggaran
interface JenisPelanggaranItem {
  id: string; // ✅ DIUBAH: number | string -> string
  nama_pelanggaran: string;
}

// --- END DEFINISI TIPE ---

const PelanggaranForm = ({ initialData }: { initialData: any }) => {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<PelanggaranSchema>({
    resolver: zodResolver(pelanggaranSchema),
    defaultValues: {
      pegawai_id: `${initialData.nip} - ${initialData.nama_pegawai}` || "",
      tgl_pelanggaran: initialData.tgl_pelanggaran
        ? initialData.tgl_pelanggaran.split("T")[0]
        : "",
      jenis_pelanggaran_id: String(initialData.jenis_pelanggaran_id) || "",
      no_sk: initialData.no_sk || "",
      tgl_sk: initialData.tgl_sk ? initialData.tgl_sk.split("T")[0] : "",
      keterangan: initialData.keterangan || "",
      file_foto: undefined,
    },
  });

  // FIX: Menambahkan tipe generik pada useQuery
  const { data } = useQuery<{ data: { data: JenisPelanggaranItem[] } }>({
    queryKey: ["jenis-pelanggaran-select-option-edit"],
    queryFn: async () => {
      const response = await adminServices.getJenisPelanggaran();
      return response.data;
    },
  });

  // `item` sekarang secara otomatis memiliki tipe yang benar
  const jenisPelanggaranOptions =
    data?.data.data.map((item) => ({
      label: item.nama_pelanggaran,
      value: item.id.toString(), // ✅ Tetap pakai toString() untuk konsistensi
    })) || [];

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: UpdatePelanggaranPayload) =>
      putReferensiServices.pelanggaran(payload.id, payload.data),
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      queryClient.invalidateQueries({
        queryKey: ["detail-pelanggaran-admin", params.id],
      });
      navigate("/admin/operasional/kompensasi/pelanggaran");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: PelanggaranSchema) => {
    if (!params.id) return toast.error("ID data tidak ditemukan!");

    // ✅ TIDAK PERLU CONVERT KE NUMBER, langsung pakai string
    const { file_foto, pegawai_id, ...dataToSend } = values;

    mutate({ id: params.id, data: dataToSend }); // ✅ Langsung pakai params.id sebagai string
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitData)}>
        <CustomCard
          actions={
            <div className="w-full flex flex-col lg:flex-row justify-end gap-2 mt-5">
              <Link to="/admin/operasional/kompensasi/pelanggaran">
                <Button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                >
                  <IoIosArrowBack /> Kembali
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-blue-600 w-full xl:w-auto hover:bg-blue-700 text-white w-full"
                disabled={isPending}
              >
                <IoSaveSharp /> {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          }
        >
          {/* ... Field-field Form ... */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
            <div className="space-y-2">
              <FormFieldInput
                form={form}
                label="Pegawai"
                name="pegawai_id"
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Tgl Pelanggaran"
                name="tgl_pelanggaran"
                required
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <FormFieldSelect
                form={form}
                label="Jenis Pelanggaran"
                name="jenis_pelanggaran_id"
                labelStyle="text-[#3F6FA9]"
                options={jenisPelanggaranOptions}
                required
              />
              <FormFieldInput
                form={form}
                label="No.SK"
                name="no_sk"
                labelStyle="text-[#3F6FA9]"
              />
            </div>
            <div className="space-y-2">
              <FormFieldInput
                form={form}
                label="Tgl.SK"
                name="tgl_sk"
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <FormFieldInput
                form={form}
                label="Keterangan"
                name="keterangan"
                labelStyle="text-[#3F6FA9]"
                type="textarea"
              />
              <FormFieldInputFile
                name="file_foto"
                label="Ganti File Bukti"
                labelStyle="text-[#3F6FA9]"
              />
            </div>
          </div>
        </CustomCard>
      </form>
    </Form>
  );
};

const EditDataPelanggaran = () => {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["detail-pelanggaran-admin", params.id],
    queryFn: async () => {
      if (!params.id) return null;
      const response = await adminServices.getDetailPelanggaran(params.id);
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) return <div className="mt-10 text-center">Memuat data...</div>;

  if (isError)
    return (
      <div className="mt-10 text-center text-red-500">Gagal memuat data.</div>
    );

  if (!data?.data)
    return <div className="mt-10 text-center">Data tidak ditemukan.</div>;

  return (
    <div className="mt-10 mb-20">
      <Title title="Pelanggaran" subTitle="Edit Detail Pelanggaran" />
      <PelanggaranForm initialData={data.data} />
    </div>
  );
};

export default EditDataPelanggaran;
