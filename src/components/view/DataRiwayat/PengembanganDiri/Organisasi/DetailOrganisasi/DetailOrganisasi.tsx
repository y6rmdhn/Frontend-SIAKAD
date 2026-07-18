import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";

const organisasiSchema = z
  .object({
    tgl_mulai: z.string().min(1, "Tanggal mulai wajib diisi."),
    nama_organisasi: z.string().min(1, "Nama organisasi wajib diisi."),
    tgl_selesai: z.string().min(1, "Tanggal selesai wajib diisi."),
    alamat_organisasi: z.string().min(1, "Alamat organisasi wajib diisi."),
    lingkup: z.string().min(1, "Lingkup wajib dipilih."),
    jabatan: z.string().min(1, "Jabatan wajib diisi."),
    website_organisasi: z.string().optional().or(z.literal("")),
    refleksi: z.string().optional(),
    file_organisasi: fileSchema,
    keterangan: z.string().optional(),
  })
  .refine(
    (data) => new Date(data.tgl_selesai) > new Date(data.tgl_mulai),
    {
      message: "Tanggal selesai harus setelah tanggal mulai.",
      path: ["tgl_selesai"],
    }
  );

type OrganisasiSchema = z.infer<typeof organisasiSchema>;

const DetailOrganisasi = () => {
  const navigate = useNavigate();
  const { profile } = usePegawaiProfile();

  const form = useForm<OrganisasiSchema>({
    resolver: zodResolver(organisasiSchema),
    defaultValues: {
      tgl_mulai: "",
      nama_organisasi: "",
      tgl_selesai: "",
      alamat_organisasi: "",
      lingkup: "",
      jabatan: "",
      website_organisasi: "",
      refleksi: "",
      file_organisasi: undefined,
      keterangan: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataOrganisasi(formData),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/pengembangan-diri/organisasi");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitOrganisasi = (values: OrganisasiSchema) => {
    const formData = new FormData();
    formData.append("tgl_mulai", values.tgl_mulai);
    formData.append("nama_organisasi", values.nama_organisasi);
    formData.append("tgl_selesai", values.tgl_selesai);
    formData.append("alamat_organisasi", values.alamat_organisasi);
    formData.append("lingkup", values.lingkup);
    formData.append("jabatan", values.jabatan);
    if (values.website_organisasi) formData.append("website_organisasi", values.website_organisasi);
    if (values.refleksi) formData.append("refleksi", values.refleksi);
    if (values.keterangan) formData.append("keterangan", values.keterangan);

    if (
      values.file_organisasi instanceof FileList &&
      values.file_organisasi.length > 0
    ) {
      formData.append("file_organisasi", values.file_organisasi[0]);
    }

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Data Organisasi" subTitle="Tambah Riwayat Organisasi" />

      <Form {...form}>
        <form
          className="mt-10"
          onSubmit={form.handleSubmit(handleSubmitOrganisasi)}
        >
          <CustomCard
            actions={
              <div>
                <div className="w-full flex flex-col sm:flex-row justify-end gap-4">
                  <Link to="/data-riwayat/pengembangan-diri/organisasi">
                    <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full sm:w-auto text-white">
                      <IoIosArrowBack />
                      Kembali ke Daftar
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#FDA31A] hover:bg-[#e69316] text-white cursor-pointer w-full sm:w-auto flex items-center gap-2"
                  >
                    <MdOutlineFileDownload />
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

                <div className="grid md:grid-rows-5 md:grid-flow-col gap-6 items-center mt-10">
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
                    label="Nama Organisasi"
                    name="nama_organisasi"
                    type="text"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                    placeholder="cth: Himpunan Mahasiswa / IDI"
                  />
                  <FormFieldInput
                    form={form}
                    label="Jabatan"
                    name="jabatan"
                    type="text"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                    placeholder="cth: Anggota / Ketua"
                  />
                  <FormFieldInput
                    form={form}
                    label="Website Organisasi"
                    name="website_organisasi"
                    type="text"
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                    placeholder="cth: https://..."
                  />
                  <FormFieldInputFile
                    label="File Dokumen SK/KTA"
                    name="file_organisasi"
                    classname="border-none shadow-none"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />

                  <FormFieldInput
                    form={form}
                    label="Tgl. Selesai"
                    name="tgl_selesai"
                    type="date"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                  />
                  <FormFieldInput
                    form={form}
                    label="Alamat Organisasi"
                    name="alamat_organisasi"
                    type="text"
                    required={true}
                    labelStyle="text-[#3F6FA9]"
                    placeholder="Alamat Kantor/Pusat"
                  />
                  <FormFieldSelect
                    form={form}
                    label="Lingkup"
                    name="lingkup"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { value: "lokal", label: "Lokal" },
                      { value: "nasional", label: "Nasional" },
                      { value: "internasional", label: "Internasional" },
                    ]}
                    required={true}
                    placeholder="-- Pilih Lingkup --"
                  />
                  <FormFieldInput
                    form={form}
                    label="Refleksi"
                    name="refleksi"
                    type="text"
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                    placeholder="Refleksi selama mengikuti organisasi"
                  />
                  <FormFieldInput
                    form={form}
                    label="Keterangan"
                    name="keterangan"
                    type="text"
                    required={false}
                    labelStyle="text-[#3F6FA9]"
                    placeholder="Keterangan tambahan"
                  />
                </div>
              </div>
            }
          />
        </form>
      </Form>
    </div>
  );
};

export default DetailOrganisasi;
