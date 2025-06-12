import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const pelanggaranSchema = z.object({
  pegawai_id: z.string().min(1, "Pegawai harus diisi"),
  tgl_pelanggaran: z.string().min(1, "Tanggal pelanggaran harus diisi"),
  jenis_pelanggaran_id: z.string().min(1, "Jenis pelanggaran harus diisi"),
  no_sk: z.string().optional(),
  tgl_sk: z.string().optional(),
  keterangan: z.string().optional(),

  file_foto: z
    .instanceof(File, { message: "Harap pilih sebuah file." })
    .refine((file) => file === undefined || file.size <= MAX_FILE_SIZE, {
      message: `Ukuran file maksimal adalah ${MAX_FILE_SIZE / 1024 / 1024} MB.`,
    }),
});

type PelanggaranFormValue = z.infer<typeof pelanggaranSchema>;

const DetailRiwayatPelanggaran = () => {
  const navigate = useNavigate();
  const form = useForm<PelanggaranFormValue>({
    resolver: zodResolver(pelanggaranSchema),
    defaultValues: {
      pegawai_id: "",
      tgl_pelanggaran: "",
      jenis_pelanggaran_id: "",
      no_sk: "",
      tgl_sk: "",
      keterangan: "",
      file_foto: undefined,
    },
  });

  // get data
  const { data } = useQuery({
    queryKey: ["jenis-pelanggaran-select-option"],
    queryFn: async () => {
      const response = await adminServices.getJenisPelanggaran();

      return response.data;
    },
  });

  const jenisPelanggaranOptions =
    data?.data.data.map((item) => ({
      label: item.nama_pelanggaran,
      value: item.id.toString(),
    })) || [];

  // add data
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      potsReferensiServices.pelanggaran(formData),
    onSuccess: (response) => {
      console.log("Server response:", response);
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/admin/operasional/kompensasi/pelanggaran");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: PelanggaranFormValue) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "file_foto") {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">
        Pelanggaran{" "}
        <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Detail Riwayat Pelanggaran
        </span>
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="flex justify-between mt-10">
                <div className="flex gap-6">
                  <div className="relative">
                    <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                    <Input placeholder="Search" className="w-96 pr-8" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link to="/admin/operasional/kompensasi/pelanggaran">
                    <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                      <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]"
                  >
                    <IoSaveSharp /> Simpan
                  </Button>
                </div>
              </div>
            }
          >
            <div className="grid grid-rows-4 grid-flow-col gap-x-5 items-center">
              <FormFieldInput
                form={form}
                label="Pegawai"
                name="pegawai_id"
                required={true}
                labelStyle="text-[#3F6FA9]"
                placeholder="Cari Pegawai"
              />
              <FormFieldInput
                form={form}
                label="Tgl Pelanggaran"
                name="tgl_pelanggaran"
                required={true}
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <FormFieldSelect
                form={form}
                label="Jenis Pelanggaran"
                name="jenis_pelanggaran_id"
                labelStyle="text-[#3F6FA9]"
                options={jenisPelanggaranOptions}
                required={true}
                placeholder="Terlambat atau Alpa"
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
                name="tgl_sk"
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
                label="File Keterangan"
                name="file_foto"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailRiwayatPelanggaran;
