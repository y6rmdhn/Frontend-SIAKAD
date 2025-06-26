import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile.tsx";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import adminServices from "@/services/admin.services";

// --- Konfigurasi Validasi ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// --- Skema Zod untuk Form Penghargaan ---
const penghargaanSchema = z.object({
  // Field Wajib
  pegawai_id: z.string().min(1, "Pegawai wajib diisi."),
  tanggal_penghargaan: z.string().min(1, "Tanggal penghargaan wajib diisi."),
  jenis_penghargaan: z.string().min(1, "Jenis penghargaan wajib dipilih."),

  // Field Opsional
  nama_penghargaan: z.string().optional(),
  no_sk: z.string().optional(),
  tanggal_sk: z.string().optional(),
  keterangan: z.string().optional(),
  submit_type: z.string(),

  // Validasi opsional untuk file
  file_penghargaan: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0] && files[0].size <= MAX_FILE_SIZE),
      `Ukuran file maksimal 5MB.`
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0] && ACCEPTED_MIME_TYPES.includes(files[0].type)),
      "Hanya format .pdf, .jpg, .png yang diterima."
    ),
});

type PenghargaanSchema = z.infer<typeof penghargaanSchema>;

const DetailPenghargaan = () => {
  const navigate = useNavigate();
  const form = useForm<PenghargaanSchema>({
    resolver: zodResolver(penghargaanSchema),
    defaultValues: {
      pegawai_id: "",
      tanggal_penghargaan: "",
      jenis_penghargaan: "",
      nama_penghargaan: "",
      no_sk: "",
      tanggal_sk: "",
      keterangan: "",
      submit_type: "submit",
      file_penghargaan: undefined,
    },
  });

  // add data
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      potsReferensiServices.penghargaan(formData),
    onSuccess: (response) => {
      console.log("Server response:", response);
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/admin/operasional/kompensasi/penghargaan");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: PenghargaanSchema) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const valueKey = key as keyof PenghargaanSchema;
      const value = values[valueKey];

      if (key === "file_penghargaan") {
        if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        }
      } else {
        if (value !== null && value !== undefined && value !== "") {
          formData.append(key, value as string);
        }
      }
    });
    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">
        Penghargaan{" "}
        <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Detail Penghargaan
        </span>
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="w-full flex flex-col gap-4 lg:flex-row justify-between mt-10">
                <div className="w-full lg:w-96 relative">
                  <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                  <Input
                    placeholder="Search"
                    className="lg:w-96 w-full pr-8 text-xs sm:text-sm"
                  />
                </div>

                <div className="w-full flex flex-col lg:justify-end sm:flex-row gap-4">
                  <div className="w-full lg:w-auto">
                    <Link
                      type="button"
                      to="/admin/operasional/kompensasi/penghargaan"
                    >
                      <Button
                        type="button"
                        className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full lg:w-auto text-xs sm:text-sm"
                      >
                        <IoIosArrowBack /> Kembali ke Daftar
                      </Button>
                    </Link>
                  </div>

                  <div className="w-full lg:w-auto">
                    <Button
                      type="submit"
                      className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full lg:w-auto text-xs sm:text-sm"
                    >
                      <IoSaveSharp /> Simpan
                    </Button>
                  </div>
                </div>
              </div>
            }
          >
            <div className="flex flex-col sm:gap-y-0 gap-4 sm:grid sm:grid-rows-4 grid-flow-col gap-x-5 sm:items-center">
              <InfiniteScrollSelect
                form={form}
                name="pegawai_id"
                label="Pegawai"
                placeholder="--Pilih Pegawai--"
                labelStyle="text-[#3F6FA9]"
                required={false}
                queryKey="pegawai-select-kompensasi"
                queryFn={adminServices.getPegawaiAdminPage}
                itemValue="id"
                itemLabel="nama_pegawai"
              />
              <FormFieldInput
                form={form}
                label="Tgl Penghargaan"
                name="tanggal_penghargaan"
                required={true}
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <InfiniteScrollSelect
                form={form}
                name="jenis_penghargaan"
                placeholder="--Pilih Jenis--"
                label="Jenis Penghargaan"
                labelStyle="text-[#3F6FA9]"
                required={false}
                queryKey="jenis-penghargaan-kompensasi-select"
                queryFn={adminServices.getJenisPenghargaanAktifitas}
                itemValue="nama"
                itemLabel="nama"
              />
              <FormFieldInput
                form={form}
                label="Nama Penghargaan"
                name="nama_penghargaan"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="No.SK"
                name="no_sk"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Tgl.SK"
                name="tanggal_sk"
                required={false}
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <FormFieldInput
                form={form}
                label="Keterangan"
                name="keterangan"
                required={false}
                labelStyle="text-[#3F6FA9]"
                type="textarea"
              />

              <FormFieldInputFile
                label="File Penghargaan"
                name="file_penghargaan"
                classname="border-none shadow-none"
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
