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
import { useMutation, useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import postDosenServices from "@/services/create.dosen.services.ts";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const fileSchema = z
  .any()
  .optional()
  .refine(
    (file) => !file || file.size <= MAX_FILE_SIZE_BYTES,
    `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB.`
  )
  .refine(
    (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
    "Format file harus PDF."
  );

const pangkatSchema = z.object({
  jenis_sk_id: z
    .string({ required_error: "Jenis SK tidak boleh kosong." })
    .min(1, "Jenis SK tidak boleh kosong."),
  jenis_kenaikan_pangkat_id: z
    .string({ required_error: "Jenis kenaikan pangkat tidak boleh kosong." })
    .min(1, "Jenis kenaikan pangkat tidak boleh kosong."),
  pangkat_id: z
    .string({ required_error: "Nama pangkat tidak boleh kosong." })
    .min(1, "Nama pangkat tidak boleh kosong."),

  tmt_pangkat: z
    .string({ required_error: "TMT. Pangkat tidak boleh kosong." })
    .min(1, "TMT. Pangkat tidak boleh kosong.")
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Format TMT. Pangkat tidak valid (YYYY-MM-DD)"
    ),
  no_sk: z
    .string({ required_error: "No SK tidak boleh kosong." })
    .min(1, "No SK tidak boleh kosong."),

  file_pangkat: fileSchema, // Menggunakan skema file PDF saja

  tgl_sk: z
    .string({ required_error: "Tanggal SK tidak boleh kosong." })
    .min(1, "Tanggal SK tidak boleh kosong.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format Tgl. SK tidak valid (YYYY-MM-DD)"),

  pejabat_penetap: z
    .string({ required_error: "Pejabat penetap tidak boleh kosong." })
    .min(1, "Pejabat penetap tidak boleh kosong."),

  masa_kerja_tahun: z.preprocess((val) => {
    if (
      val === "" ||
      val === null ||
      val === undefined ||
      Number.isNaN(Number(val))
    ) {
      return Number(val);
    }
    return Number(val);
  }, z.coerce.number({ required_error: "Masa Kerja (Tahun) tidak boleh kosong.", invalid_type_error: "Masa Kerja (Tahun) harus berupa angka." }).int("Masa Kerja (Tahun) harus bilangan bulat.").nonnegative("Masa Kerja (Tahun) tidak boleh negatif.").max(50, "Masa Kerja (Tahun) tidak boleh lebih dari 50.")),

  masa_kerja_bulan: z.preprocess(
    (val) =>
      val === "" ||
      val === null ||
      val === undefined ||
      Number.isNaN(Number(val))
        ? undefined
        : Number(val), // Konversi ke angka atau undefined
    z.coerce
      .number({ invalid_type_error: "Masa Kerja (Bulan) harus berupa angka." })
      .int("Masa Kerja (Bulan) harus bilangan bulat.") // Validasi baru
      .nonnegative("Masa kerja (Bulan) tidak boleh negatif.") // Tambahan asumsi
      .optional()
      .nullable()
  ),
  acuan_masa_kerja: z.enum(["1", "0"], {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: "Acuan Masa Kerja harus dipilih (Ya/Tidak)." };
      }
      return { message: ctx.defaultError };
    },
  }),

  tanggal_input: z.string().optional().nullable(),
  submit_type: z.string(),
  is_aktif: z.string(),
});

type PangkatFormData = z.infer<typeof pangkatSchema>;

const DetailPangkat = () => {
  const navigate = useNavigate();

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
      acuan_masa_kerja: "0",
      tanggal_input: null,
      submit_type: "submit",
      is_aktif: "1",
    },
    resolver: zodResolver(pangkatSchema),
  });

  // get data
  const { data: detailData } = useQuery({
    queryKey: ["pangkat-detail-dosen"],
    queryFn: async () => {
      const response = await dosenServices.getDataPangkatWithoutParam();

      return response.data;
    },
  });

  // add data
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataPangkat(formData),
    onSuccess: (response) => {
      console.log("Server response:", response);
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/kepegawaian/pangkat");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitPangkat = (values: PangkatFormData) => {
    const formData = new FormData();

    if (values.file_pangkat && values.file_pangkat.length > 0) {
      formData.append("file_pangkat", values.file_pangkat[0]);
    }

    (Object.keys(values) as Array<keyof PangkatFormData>).forEach((key) => {
      if (key !== "file_pangkat") {
        let valueToAppend = values[key];

        if (
          key === "masa_kerja_tahun" &&
          (valueToAppend === null || valueToAppend === undefined)
        ) {
          valueToAppend = 0;
        }

        if (valueToAppend !== null && valueToAppend !== undefined) {
          formData.append(key, String(valueToAppend));
        } else {
          // @ts-ignore
          if (key === "masa_kerja_tahun" && valueToAppend === 0) {
            formData.append(key, String(valueToAppend));
          }
        }
      }
    });

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Pangkat" subTitle="Detail Pangkat" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitPangkat)}>
          <CustomCard
            actions={
              <div className=" flex justify-start md:justify-end mt-10">
                <div className="flex w-full md:w-auto flex-col md:flex-row gap-4">
                  <Button
                    onClick={() =>
                      navigate("/data-riwayat/kepegawaian/pangkat")
                    }
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full md:w-auto flex items-center gap-2 text-xs md:text-sm"
                  >
                    <IoIosArrowBack className="w-3! h-3! md:w-4! h-4!" />
                    Kembali ke Daftar
                  </Button>

                  <Button className="w-full sm:w-auto bg-[#FDA31A] hover:bg-[#329C59] cursor-pointer flex items-center gap-2 text-xs md:text-sm">
                    {isSubmitting ? (
                      "Menyimpan..."
                    ) : (
                      <>
                        <MdOutlineFileDownload />
                        Simpan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            }
          />

          <InfoList
            items={[
              { label: "NIP", value: detailData?.pegawai_info.nip },
              { label: "Nama", value: detailData?.pegawai_info.nama },
              {
                label: "Unit Kerja",
                value: detailData?.pegawai_info.unit_kerja,
              },
              { label: "Status", value: detailData?.pegawai_info.status },
              {
                label: "Jab. Akademik",
                value: detailData?.pegawai_info.jab_akademik,
              },
              {
                label: "Jab. Fungsional",
                value: detailData?.pegawai_info.jab_fungsional,
              },
              {
                label: "Jab. Struktural",
                value: detailData?.pegawai_info.jab_struktural,
              },
              {
                label: "Pendidikan",
                value: detailData?.pegawai_info.pendidikan,
              },
            ]}
          />

          <div className="grid md:grid-rows-6 md:grid-flow-col gap-5 items-center mt-4">
            <FormFieldSelect
              form={form}
              label="Jenis SK"
              name="jenis_sk_id"
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              options={[
                { value: "1", label: "Perjanjian Kontrak" },
                { value: "2", label: "SK Tetap 80%" },
                { value: "3", label: "SK Tetap 100%" },
                { value: "4", label: "SK Inpassing" },
                { value: "5", label: "SK Pangkat" },
                { value: "6", label: "SK Berkala YPIKA" },
                { value: "7", label: "SK Pangkat YPIKA" },
              ]}
              required={true}
              placeholder="-- Pilih Jenis SK --"
            />
            <FormFieldSelect
              form={form}
              label="Jenis Kenaikan Pangkat"
              name="jenis_kenaikan_pangkat_id"
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              options={[
                { value: "1", label: "Kopertis" },
                { value: "2", label: "LLDIKTI4" },
                { value: "3", label: "Universitas" },
                { value: "4", label: "Yayasan" },
              ]}
              required={false}
              placeholder="-- Pilih Jenis Kenaikan Pangkat --"
            />
            <FormFieldSelect
              form={form}
              label="Nama Pangkat"
              name="pangkat_id"
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              options={[
                { value: "1", label: "Juru Muda (I/A)" },
                { value: "2", label: "Juru Muda Tingkat 1 (I/B)" },
                { value: "3", label: "Juru (I/C)" },
                { value: "4", label: "Juru Tingkat 1 (I/D)" },
                { value: "5", label: "Pengatur Muda (II/A)" },
                { value: "6", label: "Pengatur Muda Tingkat 1 (II/B)" },
                { value: "7", label: "Pengatur (II/C)" },
                { value: "8", label: "Pengatur Tingkat 1 (II/D)" },
                { value: "9", label: "Penata Muda (III/A)" },
                { value: "10", label: "Penata Muda Tingkat 1 (III/B)" },
                { value: "11", label: "Penata (III/C)" },
                { value: "12", label: "Penata Tingkat 1 (III/D)" },
                { value: "13", label: "Pembina (IV/A)" },
                { value: "14", label: "Pembina Tingkat 1 (IV/B)" },
                { value: "15", label: "Pembina Utama Muda (IV/C)" },
                { value: "16", label: "Pembina Utama Madya (IV/D)" },
                { value: "17", label: "Pembina Utama (IV/E)" },
              ]}
              required={false}
              placeholder="-- Pilih Pangkat --"
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
              required={false}
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
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />
            <FormFieldInput
              form={form}
              label="Pejabat Penetap"
              name="pejabat_penetap"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
            />

            <FormFieldInput
              form={form}
              label="Masa Kerja (Tahun)"
              name="masa_kerja_tahun"
              type="number"
              required={false}
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
                { value: "1", label: "Ya" }, // <<< Ubah value menjadi "1"
                { value: "0", label: "Tidak" }, // <<< Ubah value menjadi "0"
              ]}
              required={false} // Tetap false karena skema Zod Anda .optional().nullable()
              placeholder="-- Pilih Acuan --"
            />

            <FormFieldInput
              form={form}
              label="Tanggal Input"
              name="tanggal_input"
              required={false}
              labelStyle="text-[#3F6FA9] text-xs md:text-sm"
              placeholder="22 April 2025"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailPangkat;
