import { Link, useNavigate } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";
import adminServices from "@/services/admin.services";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";

const kemampuanBahasaSchema = z.object({
  tahun: z
    .string()
    .min(4, "Tahun harus 4 digit.")
    .max(4, "Tahun harus 4 digit."),
  bahasa_id: z.string().min(1, "Bahasa wajib dipilih."),
  nama_lembaga: z.string().min(1, "Nama Lembaga wajib diisi."),
  skor_bicara: z.coerce.number({ required_error: "Skor bicara wajib diisi.", invalid_type_error: "Skor bicara harus berupa angka." }).min(0).max(100),
  skor_mendengar: z.coerce.number({ required_error: "Skor mendengar wajib diisi.", invalid_type_error: "Skor mendengar harus berupa angka." }).min(0).max(100),
  skor_menulis: z.coerce.number({ required_error: "Skor menulis wajib diisi.", invalid_type_error: "Skor menulis harus berupa angka." }).min(0).max(100),
  file_kemampuan_bahasa: fileSchema,
  keterangan: z.string().optional(),
});

type KemampuanBahasaSchema = z.infer<typeof kemampuanBahasaSchema>;

const DetailKemampuanBahasa = () => {
  const navigate = useNavigate();
  const { profile } = usePegawaiProfile();

  const form = useForm<KemampuanBahasaSchema>({
    resolver: zodResolver(kemampuanBahasaSchema),
    defaultValues: {
      tahun: "",
      bahasa_id: "",
      nama_lembaga: "",
      skor_bicara: 0,
      skor_mendengar: 0,
      skor_menulis: 0,
      file_kemampuan_bahasa: undefined,
      keterangan: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataKemampuanbahasa(formData),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/pengembangan-diri/kemampuan-bahasa");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitKemampuanBahasa = (values: KemampuanBahasaSchema) => {
    const formData = new FormData();
    formData.append("tahun", values.tahun);
    formData.append("bahasa_id", values.bahasa_id);
    formData.append("nama_lembaga", values.nama_lembaga);
    formData.append("skor_bicara", String(values.skor_bicara));
    formData.append("skor_mendengar", String(values.skor_mendengar));
    formData.append("skor_menulis", String(values.skor_menulis));
    if (values.keterangan) formData.append("keterangan", values.keterangan);

    if (
      values.file_kemampuan_bahasa instanceof FileList &&
      values.file_kemampuan_bahasa.length > 0
    ) {
      formData.append("file_kemampuan_bahasa", values.file_kemampuan_bahasa[0]);
    }

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Kemampuan Bahasa" subTitle="Tambah Kemampuan Bahasa" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitKemampuanBahasa)}>
          <CustomCard
            actions={
              <div>
                <div className="w-full flex flex-col sm:flex-row justify-end gap-2">
                  <Link to="/data-riwayat/pengembangan-diri/kemampuan-bahasa">
                    <Button className="bg-green-light-uika hover:bg-hover-green-uika w-full sm:w-auto">
                      <IoIosArrowBack /> Kembali ke Daftar
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
              </div>
            }
          >
            <div className="sm:mt-10 grid grid-rows-4 md:grid-flow-col items-center gap-6 mt-10">
              <FormFieldInput
                form={form}
                label="Tahun"
                name="tahun"
                placeholder="2025"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Nama Lembaga"
                name="nama_lembaga"
                placeholder="cth: Lembaga Bahasa UIKA"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Skor Berbicara"
                name="skor_bicara"
                placeholder="cth: 80"
                type="number"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInputFile
                label="File Sertifikat/Dokumen Pendukung"
                name="file_kemampuan_bahasa"
                classname="border-none shadow-none"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />

              <InfiniteScrollSelect
                form={form}
                label="Bahasa"
                name="bahasa_id"
                labelStyle="text-[#3F6FA9]"
                placeholder="--Pilih Bahasa--"
                required={true}
                queryKey="master_bahasa_select"
                queryFn={(page) => adminServices.getMasterBahasa({ page, is_dropdown: true })}
                itemValue="id"
                itemLabel="nama"
              />
              <FormFieldInput
                form={form}
                label="Skor Mendengar"
                name="skor_mendengar"
                placeholder="cth: 85"
                type="number"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Skor Menulis"
                name="skor_menulis"
                placeholder="cth: 75"
                type="number"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Keterangan"
                name="keterangan"
                placeholder="Keterangan tambahan"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailKemampuanBahasa;
