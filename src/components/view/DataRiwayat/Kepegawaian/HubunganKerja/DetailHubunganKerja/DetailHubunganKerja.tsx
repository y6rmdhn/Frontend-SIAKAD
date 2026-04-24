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
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";

// ── Skema baru sesuai DB backend ──────────────────────────────────────────────
// Perubahan dari skema lama:
// - tgl_awal  → tgl_mulai
// - tgl_akhir → tgl_selesai
// - pejabat_penetap dihapus (tidak ada di DB baru)
// ─────────────────────────────────────────────────────────────────────────────
const detailHubunganKerjaSchema = z
  .object({
    hubungan_kerja_id: z.string().min(1, "Hubungan Kerja wajib diisi."),
    status_aktif_id: z.string().min(1, "Status Aktif wajib diisi."),
    tgl_mulai: z.string().min(1, "Tanggal mulai wajib diisi."),
    tgl_selesai: z.string().optional(),
    pejabat_penetap: z.string().optional(),
    no_sk: z.string().min(1, "No SK wajib diisi."),
    tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
    file_hubungan_kerja: fileSchema,
    keterangan: z.string().optional(),
    submit_type: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.tgl_selesai || !data.tgl_mulai) return true;
      return new Date(data.tgl_selesai) > new Date(data.tgl_mulai);
    },
    {
      message: "Tanggal selesai harus setelah tanggal mulai.",
      path: ["tgl_selesai"],
    }
  );

type DetailHubunganKerjaSchema = z.infer<typeof detailHubunganKerjaSchema>;

const DetailHubunganKerja = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      hubungan_kerja_id: "",
      status_aktif_id: "",
      tgl_mulai: "",
      tgl_selesai: "",
      pejabat_penetap: "",
      no_sk: "",
      tgl_sk: "",
      file_hubungan_kerja: undefined,
      keterangan: "",
      submit_type: "submit",
    },
    resolver: zodResolver(detailHubunganKerjaSchema),
  });

  // get data profil pegawai (shared & cached via usePegawaiProfile)
  const { profile } = usePegawaiProfile();

  // add data
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataHubungankerja(formData),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/kepegawaian/hubungan-kerja");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitHubungankerja = (values: DetailHubunganKerjaSchema) => {
    const formData = new FormData();

    // Text fields
    formData.append("hubungan_kerja_id", values.hubungan_kerja_id);
    formData.append("status_aktif_id", values.status_aktif_id);
    formData.append("no_sk", values.no_sk);
    formData.append("tgl_sk", values.tgl_sk);
    formData.append("tgl_mulai", values.tgl_mulai);
    if (values.tgl_selesai) formData.append("tgl_selesai", values.tgl_selesai);
    if (values.pejabat_penetap) formData.append("pejabat_penetap", values.pejabat_penetap);
    if (values.keterangan) formData.append("keterangan", values.keterangan);

    // File
    if (values.file_hubungan_kerja instanceof FileList && values.file_hubungan_kerja.length > 0) {
      formData.append("file_hubungan_kerja", values.file_hubungan_kerja[0]);
    }

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Data Hubungan Kerja" subTitle="Detail Hubungan Kerja" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitHubungankerja)}>
          <CustomCard
            actions={
              <div className="flex justify-end w-full mt-10">
                <div className="flex justify-end gap-2 w-full md:w-auto flex-col md:flex-row">
                  <Link
                    className="w-full md:w-auto"
                    to="/data-riwayat/kepegawaian/hubungan-kerja"
                  >
                    <Button className="bg-green-light-uika w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
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
            {/* Hubungan Kerja */}
            <InfiniteScrollSelect
              form={form}
              label="Hubungan kerja"
              name="hubungan_kerja_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Hubungan Kerja--"
              required={true}
              queryKey="hubungan_kerja_datariwayat"
              queryFn={(page) => dosenServices.getHubunganKerjaSelect({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="nama"
            />

            {/* No SK */}
            <FormFieldInput
              form={form}
              label="No SK"
              name="no_sk"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />

            {/* Tgl SK */}
            <FormFieldInput
              form={form}
              label="Tgl. SK"
              name="tgl_sk"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />

            {/* File (field name sesuai BE: file_hubungan_kerja) */}
            <FormFieldInputFile
              label="File Hubungan Kerja"
              name="file_hubungan_kerja"
              classname="border-none shadow-none"
              labelStyle="text-[#3F6FA9]"
              required={false}
            />

            {/* Tgl Mulai — ganti dari tgl_awal */}
            <FormFieldInput
              form={form}
              label="Tgl. Mulai"
              name="tgl_mulai"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />

            {/* Tgl Selesai */}
            <FormFieldInput
              form={form}
              label="Tgl. Selesai"
              name="tgl_selesai"
              type="date"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />

            {/* Pejabat Penetap */}
            <FormFieldInput
              form={form}
              label="Pejabat Penetap"
              name="pejabat_penetap"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />

            {/* Status Aktif */}
            <InfiniteScrollSelect
              form={form}
              label="Status Aktif"
              name="status_aktif_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Status Aktif--"
              required={true}
              queryKey="status_aktif_datariwayat"
              queryFn={(page) => dosenServices.getStatusAktifSelect({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="nama"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailHubunganKerja;
