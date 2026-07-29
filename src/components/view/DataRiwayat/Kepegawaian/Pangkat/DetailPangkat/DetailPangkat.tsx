import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useForm } from "react-hook-form";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import InfoList from "@/components/blocks/InfoList";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import postDosenServices from "@/services/create.dosen.services.ts";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const fileSchema = z
  .any()
  .optional()
  .refine(
    (files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= MAX_FILE_SIZE_BYTES;
    },
    `Ukuran file maksimal adalah ${MAX_FILE_SIZE_MB}MB.`
  )
  .refine(
    (files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_FILE_TYPES.includes(files[0].type);
    },
    "Format file yang diterima hanya PDF."
  );

const pangkatSchema = z.object({
  jenis_sk_id: z.string().min(1, "Jenis SK tidak boleh kosong."),
  jenis_kenaikan_pangkat_id: z.string().min(1, "Jenis kenaikan pangkat tidak boleh kosong."),
  pangkat_id: z.string().min(1, "Nama pangkat tidak boleh kosong."),
  tmt_pangkat: z.string().min(1, "TMT. Pangkat tidak boleh kosong."),
  no_sk: z.string().min(1, "No SK tidak boleh kosong."),
  file_pangkat: fileSchema,
  tgl_sk: z.string().min(1, "Tanggal SK tidak boleh kosong."),
  masa_kerja_tahun: z.coerce.number().int().nonnegative().max(50),
  masa_kerja_bulan: z.coerce.number().int().nonnegative().max(11).optional().nullable(),
  acuan_masa_kerja: z.preprocess(
    (val) => (typeof val === "string" ? val === "true" || val === "1" : Boolean(val)),
    z.boolean()
  ),
  keterangan: z.string().optional(),
});

type PangkatFormData = z.infer<typeof pangkatSchema>;

const DetailPangkat = () => {
  const navigate = useNavigate();
  const { profile } = usePegawaiProfile();

  const form = useForm({
    defaultValues: {
      jenis_sk_id: "",
      jenis_kenaikan_pangkat_id: "",
      pangkat_id: "",
      tmt_pangkat: "",
      no_sk: "",
      file_pangkat: null,
      tgl_sk: "",
      pejabat_penetap: "",
      masa_kerja_tahun: 0,
      masa_kerja_bulan: undefined,
      acuan_masa_kerja: false,
      keterangan: "",
    },
    resolver: zodResolver(pangkatSchema),
  });

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataPangkat(formData),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/kepegawaian/pangkat");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitPangkat = (values: PangkatFormData) => {
    const formData = new FormData();
    formData.append("jenis_sk_id", values.jenis_sk_id);
    formData.append("jenis_kenaikan_pangkat_id", values.jenis_kenaikan_pangkat_id);
    formData.append("pangkat_id", values.pangkat_id);
    formData.append("tmt_pangkat", values.tmt_pangkat);
    formData.append("no_sk", values.no_sk);
    formData.append("tgl_sk", values.tgl_sk);
    formData.append("pejabat_penetap", values.pejabat_penetap);
    formData.append("masa_kerja_tahun", String(values.masa_kerja_tahun));
    formData.append("masa_kerja_bulan", String(values.masa_kerja_bulan ?? 0));
    formData.append("is_acuan_masa_kerja", String(values.acuan_masa_kerja));
    if (values.keterangan) {
      formData.append("keterangan", values.keterangan);
    }

    if (values.file_pangkat && values.file_pangkat.length > 0) {
      formData.append("file_pangkat", values.file_pangkat[0]);
    }

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Pangkat" subTitle="Tambah Pangkat Baru" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitPangkat)}>
          <CustomCard
            actions={
              <div className="flex justify-start md:justify-end mt-10">
                <div className="flex w-full md:w-auto flex-col md:flex-row gap-4">
                  <Button
                    type="button"
                    onClick={() => navigate("/data-riwayat/kepegawaian/pangkat")}
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full md:w-auto flex items-center gap-2 text-xs md:text-sm"
                  >
                    <IoIosArrowBack />
                    Kembali ke Daftar
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#FDA31A] hover:bg-[#e08c10] cursor-pointer flex items-center gap-2 text-xs md:text-sm text-white"
                  >
                    <MdOutlineFileDownload />
                    {isSubmitting ? "Menyimpan..." : "Simpan"}
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

          <div className="grid md:grid-rows-6 md:grid-flow-col gap-5 items-center mt-10">
            <InfiniteScrollSelect
              form={form}
              label="Jenis SK"
              name="jenis_sk_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Jenis SK--"
              required={true}
              queryKey="jenis_sk_datariwayat_pangkat"
              queryFn={(page) => dosenServices.getJenisSk({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="jenis_sk"
            />
            <InfiniteScrollSelect
              form={form}
              label="Jenis Kenaikan Pangkat"
              name="jenis_kenaikan_pangkat_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Jenis Kenaikan Pangkat--"
              required={true}
              queryKey="jenis_kenaikan_pangkat_datariwayat_pangkat"
              queryFn={(page) => dosenServices.getJenisKenaikanPangkat({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="nama"
            />
            <InfiniteScrollSelect
              form={form}
              label="Nama Pangkat"
              name="pangkat_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Nama Pangkat--"
              required={true}
              queryKey="jenis_pangkat_datariwayat_pangkat"
              queryFn={(page) => dosenServices.getMasterPangkatReferensi({ page, is_dropdown: true })}
              itemValue="id"
              itemLabel="nama"
            />
            <FormFieldInput
              form={form}
              label="TMT. Pangkat *"
              name="tmt_pangkat"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInput
              form={form}
              label="No. SK"
              name="no_sk"
              required={true}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInputFile
              label="File Pangkat"
              name="file_pangkat"
              classname="border-none shadow-none"
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              required={false}
            />

            <FormFieldInput
              form={form}
              label="Tgl. SK"
              name="tgl_sk"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInput
              form={form}
              label="Pejabat Penetap"
              name="pejabat_penetap"
              required={true}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />

            <FormFieldInput
              form={form}
              label="Masa Kerja (Tahun)"
              name="masa_kerja_tahun"
              type="number"
              required={true}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />

            <FormFieldInput
              form={form}
              label="Masa Kerja (Bulan)"
              name="masa_kerja_bulan"
              type="number"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />

            <FormFieldSelect
              form={form}
              label="Acuan Masa Kerja"
              name="acuan_masa_kerja"
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              options={[
                { value: true, label: "Ya" },
                { value: false, label: "Tidak" },
              ]}
              required={true}
              placeholder="-- Pilih Acuan --"
            />

            <FormFieldInput
              form={form}
              label="Keterangan"
              name="keterangan"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailPangkat;
