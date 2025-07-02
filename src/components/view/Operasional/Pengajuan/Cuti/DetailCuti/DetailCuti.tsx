import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { useForm } from "react-hook-form";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import Title from "@/components/blocks/Title";
import { useMutation } from "@tanstack/react-query";
import postDosenServices from "@/services/create.dosen.services";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchemaNew } from "@/components/view/DataRiwayat/Kualifikasi/PendidikanFormal/DetailPendidikanFormal/DetailPendidikanFormal";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import dosenServices from "@/services/dosen.services";

const cutiSchema = z.object({
  jenis_cuti_id: z.string().min(1, { message: "Jenis cuti harus diisi." }),
  tgl_mulai: z.string().min(1, { message: "Tanggal mulai harus diisi." }),
  tgl_selesai: z.string().min(1, { message: "Tanggal selesai harus diisi." }),
  jumlah_cuti: z.string().optional(),
  alasan_cuti: z.string().optional(),
  alamat: z.string().optional(),
  no_telp: z.coerce.number().optional(),
  submit_type: z.string().optional(),
  file_cuti: fileSchemaNew,
});

export type CutiSchema = z.infer<typeof cutiSchema>;

const DetailCuti = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(cutiSchema),
    defaultValues: {
      jenis_cuti_id: "",
      tgl_mulai: "",
      tgl_selesai: "",
      jumlah_cuti: "",
      alasan_cuti: "",
      no_telp: undefined,
      submit_type: "submit",
      alamat: "",
      file_cuti: undefined,
    },
  });

  // add data
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataPengajuanCuti(formData),
    onSuccess: (response) => {
      console.log("Server response:", response);
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/operasional/pengajuan/cuti");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: CutiSchema) => {
    const formData = new FormData();

    const { file_cuti, ...otherValues } = values;

    if (file_cuti && file_cuti.length > 0) {
      formData.append("file_cuti", file_cuti[0]);
    }

    Object.entries(otherValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Cuti" subTitle="Tambah Permohonan Cuti" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="">
                <div className="flex w-full md:w-auto gap-2 order-1 md:order-2 md:flex-row flex-col justify-end">
                  <Link
                    className="w-full md:w-auto"
                    to="/operasional/pengajuan/cuti"
                  >
                    <Button className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika">
                      <IoChevronBackOutline /> Kembali ke Daftar
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer"
                  >
                    <MdOutlineFileDownload />
                    Simpan
                  </Button>
                </div>

                {/* Data Dokumen Section */}
                <div className="space-y-4 mt-10">
                  <div className="border-b-1 border-[#FDA31A]">
                    <h1 className="text-sm font-normal text-[#FDA31A]">
                      Data Dokumen
                    </h1>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Kolom Kiri */}
                    <div className="space-y-7">
                      <InfiniteScrollSelect
                        form={form}
                        label="Jenis Cuti"
                        name="jenis_cuti_id"
                        labelStyle="text-[#3F6FA9]"
                        placeholder="--Pilih Jenis Cuti--"
                        required
                        queryKey="cuti-dosen-select"
                        queryFn={dosenServices.getPengajuanCutiDosen}
                        itemValue="id"
                        itemLabel="nama_jenis_cuti"
                      />
                      <FormFieldInput
                        form={form}
                        label="Tagnggal Mulai"
                        name="tgl_mulai"
                        type="date"
                        labelStyle="text-[#3F6FA9]"
                        required={true}
                      />

                      <FormFieldInput
                        form={form}
                        label="Tanggal Selesai"
                        name="tgl_selesai"
                        type="date"
                        labelStyle="text-[#3F6FA9]"
                        required={true}
                      />

                      <FormFieldInput
                        form={form}
                        label="Jumlah Cuti"
                        name="jumlah_cuti"
                        type="number"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />
                    </div>

                    {/* Kolom Kanan */}
                    <div className="space-y-7 md:mt-0.5 lg:mt-0">
                      <FormFieldInput
                        form={form}
                        label="Alasan Cuti"
                        name="alasan_cuti"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInput
                        form={form}
                        label="Alamat"
                        name="alamat"
                        type="textarea"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInput
                        form={form}
                        label="No. Telepon"
                        name="no_telp"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInputFile
                        label="File Cuti"
                        name="file_cuti"
                        classname="border-none shadow-none"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </form>
      </Form>
    </div>
  );
};

export default DetailCuti;
