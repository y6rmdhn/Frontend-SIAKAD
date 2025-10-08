import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

const penghargaanSchema = z.object({
  pegawai_id: z.string().min(1, "Pegawai wajib diisi."),
  tanggal_penghargaan: z.string().min(1, "Tanggal penghargaan wajib diisi."),
  jenis_penghargaan: z.string().min(1, "Jenis penghargaan wajib dipilih."),
  nama_penghargaan: z.string().optional(),
  no_sk: z.string().optional(),
  tanggal_sk: z.string().optional(),
  keterangan: z.string().optional(),
  file_penghargaan: z.any().optional(),
});
type PenghargaanSchema = z.infer<typeof penghargaanSchema>;

interface UpdatePenghargaanPayload {
  id: string; // Changed to string
  data: Omit<PenghargaanSchema, "file_penghargaan">;
}

const PenghargaanForm = ({ initialData }: { initialData: any }) => {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<PenghargaanSchema>({
    resolver: zodResolver(penghargaanSchema),
    defaultValues: {
      pegawai_id: `${initialData.nip} - ${initialData.nama_pegawai}` || "",
      tanggal_penghargaan: initialData.tanggal_penghargaan
        ? initialData.tanggal_penghargaan.split("T")[0]
        : "",
      jenis_penghargaan: initialData.jenis_penghargaan || "",
      nama_penghargaan: initialData.nama_penghargaan || "",
      no_sk: initialData.no_sk || "",
      tanggal_sk: initialData.tanggal_sk
        ? initialData.tanggal_sk.split("T")[0]
        : "",
      keterangan: initialData.keterangan || "",
      file_penghargaan: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: UpdatePenghargaanPayload) =>
      putReferensiServices.penghargaan(payload.id, payload.data), // ID as string
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      queryClient.invalidateQueries({
        queryKey: ["default-value-penghargaan-admin"],
      });
      navigate("/admin/operasional/kompensasi/penghargaan");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: PenghargaanSchema) => {
    if (!params.id) return toast.error("ID data tidak ditemukan!");

    // Remove Number conversion - use string directly
    const stringId = params.id; // Already a string

    const { file_penghargaan, ...dataToSend } = values;
    const payloadForApi = {
      ...dataToSend,
      nama_penghargaan: dataToSend.nama_penghargaan || "",
      no_sk: dataToSend.no_sk || "",
      tanggal_sk: dataToSend.tanggal_sk || "",
      keterangan: dataToSend.keterangan || "",
    };

    mutate({ id: stringId, data: payloadForApi });
  };

  const onFormError = (errors: any) => {
    console.error("Validation Errors:", errors);
    toast.error("Gagal submit, periksa kembali isian form Anda.");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitData, onFormError)}>
        <CustomCard
          actions={
            <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
              <div className="w-full lg:w-96 relative">
                <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                <Input
                  placeholder="Search"
                  className="lg:w-96 w-full pr-8 text-xs sm:text-sm"
                />
              </div>
              <div className="w-full flex flex-col lg:flex-row justify-end gap-2">
                <Link
                  className="w-full xl:w-auto"
                  to="/admin/operasional/kompensasi/penghargaan"
                >
                  <Button
                    type="button"
                    className="bg-[#3ABC67] w-full xl:w-auto hover:bg-[#329C59] text-white text-xs sm:text-sm"
                  >
                    <IoIosArrowBack /> Kembali ke Daftar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-[#3ABC67] w-full xl:w-auto hover:bg-[#329C59] text-white text-xs sm:text-sm"
                  disabled={isPending}
                >
                  <IoSaveSharp /> {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
            <div className="space-y-2">
              <FormFieldInput
                form={form}
                label="Pegawai"
                name="pegawai_id"
                required
              />
              <FormFieldInput
                form={form}
                label="Tgl Penghargaan"
                name="tanggal_penghargaan"
                required
                type="date"
              />
              <InfiniteScrollSelect
                form={form}
                name="jenis_penghargaan"
                placeholder="--Pilih Jenis--"
                label="Jenis Penghargaan"
                required={false}
                queryKey="jenis-kehadiran-select"
                queryFn={adminServices.getJenisPenghargaanAktifitas}
                itemValue="nama"
                itemLabel="nama"
              />
              <FormFieldInput
                form={form}
                label="Nama Penghargaan"
                name="nama_penghargaan"
              />
            </div>

            <div className="space-y-2">
              <FormFieldInput form={form} label="No.SK" name="no_sk" />
              <FormFieldInput
                form={form}
                label="Tgl.SK"
                name="tanggal_sk"
                type="date"
              />
              <FormFieldInput
                form={form}
                label="Keterangan"
                name="keterangan"
                type="textarea"
              />
              <FormFieldInputFile
                label="Ganti File Penghargaan"
                name="file_penghargaan"
              />
            </div>
          </div>
        </CustomCard>
      </form>
    </Form>
  );
};

const EditDataPenghargaan = () => {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["default-value-penghargaan-admin", params.id],
    queryFn: async () => {
      if (!params.id) return null;
      const response = await adminServices.getDetailPenghargaan(params.id); // params.id is already string
      console.log(response.data);

      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading)
    return <div className="mt-10 text-center">Memuat data untuk diedit...</div>;

  if (isError)
    return (
      <div className="mt-10 text-center text-red-500">
        Gagal memuat data. Silakan coba lagi.
      </div>
    );

  if (!data?.data)
    return <div className="mt-10 text-center">Data tidak ditemukan.</div>;

  return (
    <div className="mt-10 mb-20">
      <Title title="Penghargaan" subTitle="Edit Detail Penghargaan" />
      <PenghargaanForm initialData={data.data} />
    </div>
  );
};

export default EditDataPenghargaan;
