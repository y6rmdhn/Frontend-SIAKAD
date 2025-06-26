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
import dosenServices from "@/services/dosen.services.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import postDosenServices from "@/services/create.dosen.services.ts";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { fileSchema } from "@/components/view/admin/DataPegawai/DataPegawai";

const detailJabatanAkademikSchema = z.object({
  jabatan_akademik_id: z
    .string({
      required_error: "Nama Jabatan is required.",
    })
    .min(1, "Nama Jabatan is required."),
  tmt_jabatan: z.string().min(1, "TMT. Jabatan is required."),
  no_sk: z.string().min(1, "No SK is required."),
  tgl_sk: z.string().min(1, "Tanggal SK is required."),
  file_jabatan: fileSchema,
  pejabat_penetap: z.string().min(1, "Pejabat penetap is required."),
  tanggal_input: z.string().optional(),
  submit_type: z.string(),
});

// You can also define the type for type safety
type DetailJabatanAkademikSchema = z.infer<typeof detailJabatanAkademikSchema>;

const DetailJabatanAkademik = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      jabatan_akademik_id: "",
      tmt_jabatan: "",
      no_sk: "",
      tgl_sk: "",
      pejabat_penetap: "",
      file_jabatan: undefined,
      tanggal_input: "",
      submit_type: "submit",
    },
    resolver: zodResolver(detailJabatanAkademikSchema),
  });

  // get data
  const { data: detailData } = useQuery({
    queryKey: ["jabatan-akademik-detail-dosen"],
    queryFn: async () => {
      const response = await dosenServices.getDataJabatanakademikWithoutParam();

      return response.data;
    },
  });

  // add data
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataJabatanAkademik(formData),
    onSuccess: (response) => {
      console.log("Server response:", response);
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/kepegawaian/jabatan-akademik");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitJabatanAkademik = (values: DetailJabatanAkademikSchema) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof DetailJabatanAkademikSchema];

      if (key === "file_jabatan") {
        if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        }
      } else {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      }
    });

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Akademik" subTitle="Detail Jabatan Akademik" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitJabatanAkademik)}>
          <CustomCard
            actions={
              <div className="flex justify-end mt-10 w-full">
                <div className="flex justify-end gap-2 flex-col w-full md:w-auto md:flex-row">
                  <Link
                    className="w-full md:w-auto"
                    to="/data-riwayat/kepegawaian/jabatan-akademik"
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

          <div className="mt-10 grid md:grid-rows-3 md:grid-flow-col md:items-center gap-6 w-full">
            <InfiniteScrollSelect
              form={form}
              label="Nama Jabatan"
              name="jabatan_akademik_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Jabatan--"
              required={true}
              queryKey="jenis_jabatan_akademik_datariwayat_pangkat"
              queryFn={dosenServices.getJabatanAkademikSelect}
              itemValue="id"
              itemLabel="jabatan_akademik"
            />
            <FormFieldInput
              form={form}
              label="TMT. Jabatan *"
              name="tmt_jabatan"
              type="date"
              required={true}
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="No. SK"
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
              label="Pejabat Penetap"
              name="pejabat_penetap"
              required={false}
              labelStyle="text-[#3F6FA9]"
            />
          </div>
        </form>
      </Form>
      {/*<div className="w-full border-b-2 border-b-green-light-uika mt-4"></div>*/}
      {/*<Form {...form}>*/}
      {/*    <form>*/}
      {/*        <div className="md:w-96 mt-4">*/}
      {/*            <FormFieldInput*/}
      {/*                form={form}*/}
      {/*                label="Tanggal Input"*/}
      {/*                name="tanggal_input"*/}
      {/*                required={false}*/}
      {/*                labelStyle="text-[#3F6FA9]"*/}
      {/*                placeholder="22 April 2025"*/}
      {/*            />*/}
      {/*        </div>*/}
      {/*    </form>*/}
      {/*</Form>*/}
    </div>
  );
};

export default DetailJabatanAkademik;
