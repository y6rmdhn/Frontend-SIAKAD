import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

// UI & Komponen Lokal
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import adminServices from "@/services/admin.services";
import postDosenServices from "@/services/create.dosen.services";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";

const tesSchema = z.object({
  jenis_test_id: z.string().min(1, "Jenis tes wajib dipilih."),
  nama: z.string().min(1, "Nama tes wajib diisi."),
  penyelenggara: z.string().min(1, "Penyelenggara wajib diisi."),
  tgl_test: z.string().min(1, "Tanggal tes wajib diisi."),
  nilai: z.string().min(1, "Nilai / Skor wajib diisi."),
  file_test: fileSchema,
  keterangan: z.string().optional(),
});

type TesValues = z.infer<typeof tesSchema>;

const DetailTes = () => {
  const navigate = useNavigate();
  const { profile } = usePegawaiProfile();

  const form = useForm<TesValues>({
    resolver: zodResolver(tesSchema),
    defaultValues: {
      jenis_test_id: "",
      nama: "",
      penyelenggara: "",
      tgl_test: "",
      nilai: "",
      file_test: undefined,
      keterangan: "",
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
    formData.append("jenis_test_id", values.jenis_test_id);
    formData.append("nama", values.nama);
    formData.append("penyelenggara", values.penyelenggara);
    formData.append("tgl_test", values.tgl_test);
    formData.append("nilai", values.nilai);
    if (values.keterangan) {
      formData.append("keterangan", values.keterangan);
    }

    if (values.file_test instanceof FileList && values.file_test.length > 0) {
      formData.append("file_test", values.file_test[0]);
    }

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Tes" subTitle="Tambah Riwayat Tes" />
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

            <InfoList
              items={[
                { label: "NIP", value: profile?.nip ?? "-" },
                { label: "Nama", value: profile?.nama ?? "-" },
                { label: "Unit Kerja", value: profile?.unit_kerja ?? "-" },
                { label: "Status", value: profile?.status ?? "-" },
                { label: "Jab. Fungsional", value: profile?.jab_fungsional ?? "-" },
                { label: "Jab. Struktural", value: profile?.jab_struktural ?? "-" },
                { label: "Pendidikan", value: profile?.pendidikan ?? "-" },
              ]}
            />

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-green-600">
                  Formulir Riwayat Tes
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <InfiniteScrollSelect
                  form={form}
                  label="Jenis Tes"
                  name="jenis_test_id"
                  placeholder="--Pilih Jenis Tes--"
                  required
                  queryKey="jenis-tes-datariwayat"
                  queryFn={(page) => adminServices.getJenisTes({ page, is_dropdown: true })}
                  itemValue="id"
                  itemLabel="jenis_tes"
                />
                <FormFieldInput
                  name="nama"
                  label="Nama Tes"
                  form={form}
                  required
                  placeholder="cth: TOEFL / IELTS"
                />
                <FormFieldInput
                  name="penyelenggara"
                  label="Penyelenggara"
                  form={form}
                  required
                  placeholder="cth: ETS / British Council"
                />
                <FormFieldInput
                  name="tgl_test"
                  label="Tanggal Tes"
                  type="date"
                  form={form}
                  required
                />
                <FormFieldInput
                  name="nilai"
                  label="Skor / Nilai"
                  form={form}
                  required
                  placeholder="cth: 550 / 7.5"
                />
                <FormFieldInputFile
                  name="file_test"
                  label="File Sertifikat Tes"
                  required={false}
                />
                <div className="md:col-span-2">
                  <FormFieldInput
                    name="keterangan"
                    label="Keterangan"
                    form={form}
                    placeholder="Keterangan tambahan"
                    type="textarea"
                  />
                </div>
              </div>
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailTes;
