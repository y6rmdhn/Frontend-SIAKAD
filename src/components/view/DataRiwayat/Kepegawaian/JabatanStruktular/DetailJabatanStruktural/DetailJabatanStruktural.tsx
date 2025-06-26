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
import { useMutation, useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

const detailJabatanStrukturalSchema = z
  .object({
    jabatan_struktural_id: z.string().min(1, "Nama Jabatan wajib diisi."),
    no_sk: z.string().min(1, "No SK wajib diisi."),
    tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
    tgl_mulai: z.string().min(1, "Tanggal mulai wajib diisi."),
    pejabat_penetap: z.string().min(1, "Pejabat penetap wajib diisi."),
    file_jabatan: fileSchema,
    tgl_selesai: z.string().optional(),
    submit_type: z.string(),
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

type DetailJabatanStrukturalSchema = z.infer<
  typeof detailJabatanStrukturalSchema
>;

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
      file_jabatan: undefined,
      submit_type: "submit",
    },
    resolver: zodResolver(detailJabatanStrukturalSchema),
  });

  // get data
  const { data: detailData } = useQuery({
    queryKey: ["jabatan-struktural-detail-dosen"],
    queryFn: async () => {
      const response =
        await dosenServices.getDataJabatanakstrukturalWithoutParam();

      return response.data;
    },
  });

  // add data
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataJabatanstruktural(formData),
    onSuccess: (response) => {
      console.log("Server response:", response);
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/kepegawaian/jabatan-struktural");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitJabatanStruktural = (
    values: DetailJabatanStrukturalSchema
  ) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const valueKey = key as keyof DetailJabatanStrukturalSchema;
      const value = values[valueKey];

      if (key === "file_jabatan") {
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
      <Title title="Jabatan Struktural" subTitle="Detail Jabatan Struktural" />

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
                    <Button className="bg-green-light-uika w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
                      <IoIosArrowBack />
                      Kembali ke Daftar
                    </Button>
                  </Link>

                  <Button className="bg-[#FDA31A] w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
                    <MdOutlineFileDownload />
                    Simpan
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

          <div className="mt-10 grid md:grid-rows-5 md:grid-flow-col md:items-center gap-6 w-full">
            <InfiniteScrollSelect
              form={form}
              label="Nama Jabatan"
              name="jabatan_struktural_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Jabatan--"
              required={true}
              queryKey="jenis_jabatan_struktural_datariwayat"
              queryFn={dosenServices.getJabatanStrukturalSelect}
              itemValue="id"
              itemLabel="jenis_jabatan_struktural"
            />

            <FormFieldInput
              form={form}
              label="No SK"
              name="no_sk"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Tgl. SK"
              name="tgl_sk"
              type="date"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInputFile
              label="File Jabatan"
              name="file_jabatan"
              classname="border-none shadow-none"
              labelStyle="text-[#3F6FA9]"
              required={false}
            />

            <FormFieldInput
              form={form}
              label="Tgl. Mulai"
              name="tgl_mulai"
              type="date"
              required={false}
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
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
            {/*<FormFieldInput*/}
            {/*    form={form}*/}
            {/*    label="Tanggal Input"*/}
            {/*    name="tanggal_input"*/}
            {/*    required={false}*/}
            {/*    labelStyle="text-[#3F6FA9]"*/}
            {/*    placeholder="22 April 2025"*/}
            {/*/>*/}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailJabatanStruktural;
