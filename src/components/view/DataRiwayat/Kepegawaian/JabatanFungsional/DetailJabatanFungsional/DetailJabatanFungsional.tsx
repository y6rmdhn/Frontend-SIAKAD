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
import adminServices from "@/services/admin.services.ts";
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";

const detailJabatanFungsionalSchema = z.object({
  jabatan_fungsional_id: z.string().min(1, "Jabatan fungsional wajib dipilih."),
  tmt_jabatan: z.string().min(1, "TMT Jabatan wajib diisi."),
  no_sk: z.string().min(1, "No SK wajib diisi."),
  tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
  angka_kredit: z.string().min(1, "Angka kredit wajib diisi."),
  pejabat_penetap: z.string().min(1, "Pejabat penetap wajib diisi."),
  sk_jabatan_fungsional: fileSchema,
  keterangan: z.string().optional(),
});

type DetailJabatanFungsionalSchema = z.infer<typeof detailJabatanFungsionalSchema>;

const DetailJabatanFungsional = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      jabatan_fungsional_id: "",
      tmt_jabatan: "",
      no_sk: "",
      tgl_sk: "",
      angka_kredit: "",
      pejabat_penetap: "",
      sk_jabatan_fungsional: undefined,
      keterangan: "",
    },
    resolver: zodResolver(detailJabatanFungsionalSchema),
  });

  const { profile } = usePegawaiProfile();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataJabatanfungsional(formData),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/kepegawaian/jabatan-fungsional");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitJabatanFungsional = (values: DetailJabatanFungsionalSchema) => {
    const formData = new FormData();
    formData.append("jabatan_fungsional_id", values.jabatan_fungsional_id);
    formData.append("tmt_jabatan", values.tmt_jabatan);
    formData.append("no_sk", values.no_sk);
    formData.append("tgl_sk", values.tgl_sk);
    formData.append("angka_kredit", values.angka_kredit);
    formData.append("pejabat_penetap", values.pejabat_penetap);
    if (values.keterangan) formData.append("keterangan", values.keterangan);

    if (
      values.sk_jabatan_fungsional instanceof FileList &&
      values.sk_jabatan_fungsional.length > 0
    ) {
      formData.append("sk_jabatan_fungsional", values.sk_jabatan_fungsional[0]);
    }

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Fungsional" subTitle="Detail Jabatan Fungsional" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitJabatanFungsional)}>
          <CustomCard
            actions={
              <div className="flex justify-end w-full mt-10">
                <div className="flex justify-end gap-2 w-full md:w-auto flex-col md:flex-row">
                  <Link
                    className="w-full md:w-auto"
                    to="/data-riwayat/kepegawaian/jabatan-fungsional"
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
              label="Jabatan Fungsional"
              name="jabatan_fungsional_id"
              required={true}
              queryKey="jabatan_fungsional_user_tambah"
              queryFn={(page) => adminServices.getJabatanFungsional({ page, is_dropdown: true })}
              placeholder="-- Pilih Jabatan Fungsional --"
              labelStyle="text-[#3F6FA9]"
              itemLabel="nama"
              itemValue="id"
            />

            <FormFieldInput
              form={form}
              label="TMT. Jabatan"
              name="tmt_jabatan"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />

            <FormFieldInput
              form={form}
              label="No. SK"
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

            <FormFieldInput
              form={form}
              label="Angka Kredit"
              name="angka_kredit"
              type="number"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />

            <FormFieldInputFile
              label="File Jabatan"
              name="sk_jabatan_fungsional"
              classname="border-none shadow-none"
              labelStyle="text-[#3F6FA9]"
              required={false}
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

export default DetailJabatanFungsional;
