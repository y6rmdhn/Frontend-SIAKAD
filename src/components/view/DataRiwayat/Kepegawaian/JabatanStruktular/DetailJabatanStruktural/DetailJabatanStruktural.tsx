import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import InfoList from "@/components/blocks/InfoList";
import { useMutation } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import adminServices from "@/services/admin.services.ts";
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";

const detailJabatanStrukturalSchema = z
  .object({
    jabatan_struktural_id: z.string().min(1, "Nama Jabatan wajib diisi."),
    no_sk: z.string().min(1, "No SK wajib diisi."),
    tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
    tgl_mulai: z.string().min(1, "Tanggal mulai wajib diisi."),
    pejabat_penetap: z.string().min(1, "Pejabat penetap wajib diisi."),
    file_jabatan_struktural: fileSchema,
    tgl_selesai: z.string().optional(),
    keterangan: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.tgl_selesai) {
        return true;
      }
      return new Date(data.tgl_selesai) > new Date(data.tgl_mulai);
    },
    {
      message: "Tanggal selesai harus setelah tanggal mulai.",
      path: ["tgl_selesai"],
    }
  );

type DetailJabatanStrukturalSchema = z.infer<typeof detailJabatanStrukturalSchema>;

const DetailJabatanStruktural = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      jabatan_struktural_id: "",
      no_sk: "",
      tgl_sk: "",
      tgl_mulai: "",
      pejabat_penetap: "",
      tgl_selesai: "",
      file_jabatan_struktural: undefined,
      keterangan: "",
    },
    resolver: zodResolver(detailJabatanStrukturalSchema),
  });

  const { profile } = usePegawaiProfile();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataJabatanstruktural(formData),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/kepegawaian/jabatan-struktural");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitJabatanStruktural = (values: DetailJabatanStrukturalSchema) => {
    const formData = new FormData();
    formData.append("jabatan_struktural_id", values.jabatan_struktural_id);
    formData.append("no_sk", values.no_sk);
    formData.append("tgl_sk", values.tgl_sk);
    formData.append("tgl_mulai", values.tgl_mulai);
    formData.append("pejabat_penetap", values.pejabat_penetap);
    if (values.tgl_selesai) formData.append("tgl_selesai", values.tgl_selesai);
    if (values.keterangan) formData.append("keterangan", values.keterangan);

    if (
      values.file_jabatan_struktural instanceof FileList &&
      values.file_jabatan_struktural.length > 0
    ) {
      formData.append("file_jabatan_struktural", values.file_jabatan_struktural[0]);
    }

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Struktural" subTitle="Tambah Jabatan Struktural" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitJabatanStruktural)}>
          <CustomCard
            actions={
              <div className="flex justify-end w-full mt-10">
                <div className="flex justify-end w-full md:w-auto gap-2 flex-col md:flex-row">
                  <Link
                    className="w-full md:w-auto"
                    to="/data-riwayat/kepegawaian/jabatan-struktural"
                  >
                    <Button
                      type="button"
                      className="bg-green-light-uika w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2"
                    >
                      <IoIosArrowBack />
                      Kembali ke Daftar
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#FDA31A] w-full md:w-auto hover:bg-[#e08c10] cursor-pointer flex items-center gap-2"
                  >
                    <MdOutlineFileDownload />
                    {isPending ? "Menyimpan..." : "Simpan"}
                  </Button>
                </div>
              </div>
            }
          />

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

          <div className="mt-10 grid md:grid-rows-4 md:grid-flow-col md:items-center gap-6 w-full">
            <InfiniteScrollSelect
              form={form}
              label="Nama Jabatan"
              name="jabatan_struktural_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Jabatan--"
              required={true}
              queryKey="jenis_jabatan_struktural_datariwayat"
              queryFn={(page) => adminServices.getJabatanStruktural({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="nama"
            />

            <FormFieldInput
              form={form}
              label="No SK"
              name="no_sk"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Tgl. SK"
              name="tgl_sk"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInputFile
              label="File Jabatan"
              name="file_jabatan_struktural"
              classname="border-none shadow-none"
              labelStyle="text-[#3F6FA9]"
              required={false}
            />

            <FormFieldInput
              form={form}
              label="Tgl. Mulai"
              name="tgl_mulai"
              type="date"
              required={true}
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
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Keterangan"
              name="keterangan"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailJabatanStruktural;
