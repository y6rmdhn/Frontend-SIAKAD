import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import postDosenServices from "@/services/create.dosen.services";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Import Zod dan resolvernya
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { AxiosError } from "axios";

// Definisikan skema validasi dengan Zod
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const penghargaanSchema = z.object({
  jenis_penghargaan_id: z.string().min(1, "Jenis penghargaan wajib diisi."),
  nama_penghargaan: z.string().min(1, "Nama penghargaan wajib diisi."),
  instansi_pemberi: z.string().min(1, "Instansi pemberi wajib diisi."),
  tanggal_penghargaan: z.string().min(1, "Tanggal penghargaan wajib diisi."),
  no_sk: z.string().min(1, "No. SK wajib diisi."),
  tanggal_sk: z.string().min(1, "Tanggal SK wajib diisi."),
  keterangan: z.string().min(1, "Keterangan wajib diisi."),
  file_penghargaan: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "File pendukung wajib diunggah.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Ukuran file maksimal 2MB."
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Format file harus .pdf, .jpg, atau .png"
    ),
  submit_type: z.string().optional(),
});

type PenghargaanFormalValues = z.infer<typeof penghargaanSchema>;

const DetailPenghargaan = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(penghargaanSchema),
    defaultValues: {
      jenis_penghargaan_id: "",
      nama_penghargaan: "",
      instansi_pemberi: "",
      tanggal_penghargaan: "",
      no_sk: "",
      tanggal_sk: "",
      keterangan: "",
      file_penghargaan: undefined,
      submit_type: "submit",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["penghargaan-dosen-detail"],
    queryFn: async () => {
      const response = await dosenServices.getPenghargaan();
      return response.data;
    },
  });

  const { mutate: addPenghargaan, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataPenghargaan(formData),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/penunjang/penghargaan");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      let errorMessage = "Gagal menambahkan data.";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    },
  });

  // ✨ FIX: Fungsi handleSubmitData diperbarui
  const handleSubmitData = (values: PenghargaanFormalValues) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      // Lakukan type assertion pada `key`
      const typedKey = key as keyof PenghargaanFormalValues;
      const value = values[typedKey];

      if (
        typedKey === "file_penghargaan" &&
        value instanceof FileList &&
        value.length > 0
      ) {
        formData.append(typedKey, value[0]);
      } else if (typeof value === "string") {
        formData.append(typedKey, value);
      }
    });

    addPenghargaan(formData);
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />
        <CustomCard>
          <Skeleton className="h-40 w-full mb-6" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Penghargaan" subTitle="Detail Penghargaan" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitData)}
          className="mt-10 space-y-6"
        >
          <CustomCard>
            <div className="w-full flex justify-end gap-4 mb-6">
              <Link to="/data-riwayat/penunjang/penghargaan">
                <Button variant="outline" className="flex items-center gap-2">
                  <IoIosArrowBack />
                  Kembali ke Daftar
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-[#FDA31A] hover:bg-[#e69316] cursor-pointer flex items-center gap-2"
                disabled={isPending}
              >
                <MdOutlineFileDownload />
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

            {data?.pegawai_info && (
              <InfoList
                items={[
                  { label: "NIP", value: data.pegawai_info.nip },
                  { label: "Nama", value: data.pegawai_info.nama },
                  { label: "Unit Kerja", value: data.pegawai_info.unit_kerja },
                  { label: "Status", value: data.pegawai_info.status },
                  {
                    label: "Jab. Akademik",
                    value: data.pegawai_info.jab_akademik,
                  },
                  {
                    label: "Jab. Fungsional",
                    value: data.pegawai_info.jab_fungsional,
                  },
                  {
                    label: "Jab. Struktural",
                    value: data.pegawai_info.jab_struktural,
                  },
                  { label: "Pendidikan", value: data.pegawai_info.pendidikan },
                ]}
              />
            )}

            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-x-10 gap-y-4 mt-6">
              <InfiniteScrollSelect
                form={form}
                label="Jenis Penghargaan"
                name="jenis_penghargaan_id"
                placeholder="--Pilih Jenis Penghargaan--"
                required={true}
                labelStyle="text-[#3F6FA9]"
                queryKey="penghargaan-select"
                queryFn={dosenServices.getJenisPenghargaanReferensi}
                itemValue="id"
                itemLabel="nama"
              />
              <FormFieldInput
                form={form}
                label="Nama Penghargaan"
                name="nama_penghargaan"
                type="text"
                required={true}
                labelStyle="text-[#3F6FA9]"
                placeholder="Contoh: Penghargaan Dosen Berprestasi"
              />

              <FormFieldInput
                form={form}
                label="Instansi Pemberi"
                name="instansi_pemberi"
                type="text"
                required={true}
                labelStyle="text-[#3F6FA9]"
                placeholder="Contoh: Kementerian Pendidikan"
              />

              <FormFieldInput
                form={form}
                label="Tanggal Penghargaan"
                name="tanggal_penghargaan"
                type="date"
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                form={form}
                label="Nomor SK"
                name="no_sk"
                type="text"
                required={true}
                labelStyle="text-[#3F6FA9]"
                placeholder="Contoh: 123/SK/VI/2025"
              />

              <FormFieldInput
                form={form}
                label="Tanggal SK"
                name="tanggal_sk"
                type="date"
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                form={form}
                label="Keterangan"
                name="keterangan"
                type="textarea"
                required={true}
                labelStyle="text-[#3F6FA9]"
                placeholder="Jelaskan prestasi atau detail penghargaan"
              />

              <FormFieldInputFile
                label="File Pendukung"
                name="file_penghargaan"
                required={true}
                labelStyle="text-[#3F6FA9]"
              />
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailPenghargaan;
