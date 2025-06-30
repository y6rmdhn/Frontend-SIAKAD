import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

// UI & Komponen Lokal
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";

// Ikon & Notifikasi
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "sonner";

// Servis API
import dosenServices from "@/services/dosen.services";
import postDosenServices from "@/services/create.dosen.services";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

const fileSchema = z
  .instanceof(FileList, { message: "File wajib diunggah." })
  .refine((files) => files?.length >= 1, "File wajib diunggah.");

const tesSchema = z.object({
  jenis_tes_id: z.string().min(1, "Jenis tes wajib dipilih."),
  nama_tes: z.string().min(1, "Nama tes wajib diisi."),
  penyelenggara: z.string().min(1, "Penyelenggara wajib diisi."),
  tgl_tes: z.string().min(1, "Tanggal tes wajib diisi."),
  skor: z.string().min(1, "Skor wajib diisi."),
  file_pendukung: fileSchema,
});

type TesValues = z.infer<typeof tesSchema>;

const DetailTes = () => {
  const navigate = useNavigate();

  const form = useForm<TesValues>({
    resolver: zodResolver(tesSchema),
    mode: "onChange",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["tes-tambah-dosen"],
    queryFn: async () => {
      const response = await dosenServices.getDataTesDosen();
      return response.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => postDosenServices.addDataTes(formData),
    onSuccess: () => {
      toast.success("Data tes berhasil ditambahkan");
      form.reset();
      navigate("/data-riwayat/kompetensi/tes");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: TesValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "file_pendukung") {
        if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    formData.append("submit_type", "submit");

    mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Tes" subTitle="Detail Tes" />
        <CustomCard>
          <Skeleton className="h-40 w-full mb-6" />
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Tes" subTitle="Detail Tes" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard>
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row mb-5">
              <Link to="/data-riwayat/kompetensi/tes">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full md:w-auto"
                >
                  <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#FDA31A] w-full md:w-auto text-white hover:bg-[#e69310]"
              >
                <MdOutlineFileDownload className="mr-2" />
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

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-green-600">
                  Formulir Tes
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <InfiniteScrollSelect
                  form={form}
                  label="Jenis Tes"
                  name="jenis_tes_id"
                  placeholder="--Pilih Jenis Tes--"
                  required
                  queryKey="jenis-tes-datariwayat"
                  queryFn={dosenServices.getJenisTes}
                  itemValue="id"
                  itemLabel="jenis_tes"
                />
                <FormFieldInput
                  name="nama_tes"
                  label="Nama Tes"
                  form={form}
                  required
                  placeholder="cth: IELTS Academic Test"
                />
                <FormFieldInput
                  name="penyelenggara"
                  label="Penyelenggara"
                  form={form}
                  required
                  placeholder="cth: British Council Indonesia"
                />
                <FormFieldInput
                  name="tgl_tes"
                  label="Tanggal Tes"
                  type="date"
                  form={form}
                  required
                />
                <FormFieldInput
                  name="skor"
                  label="Skor Tes"
                  type="number"
                  form={form}
                  required
                  placeholder="cth: 7.5"
                />
                <FormFieldInputFile
                  name="file_pendukung"
                  label="File Pendukung"
                  required
                  description="Sertifikat/bukti tes"
                />
              </div>
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailTes;
