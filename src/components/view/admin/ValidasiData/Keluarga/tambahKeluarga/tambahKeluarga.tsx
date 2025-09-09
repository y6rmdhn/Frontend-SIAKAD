import {Link, useNavigate} from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import InfoList from "@/components/blocks/InfoList";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import {useMutation, useQuery} from "@tanstack/react-query";
import {z} from "zod";
import { IoIosArrowBack } from "react-icons/io";
import dosenServices from "@/services/dosen.services.ts";
import postDosenServices from "@/services/create.dosen.services.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";

const detailAnakSchema = z.object({
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  jenis_kelamin: z.string(),
  tempat_lahir: z.string().min(1, "Tempat lahir tidak boleh kosong"),
  tgl_lahir: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Tanggal lahir tidak valid",
  }).pipe(z.coerce.date()),
  anak_ke: z.preprocess(
      (val) => (val === "" || val === null || val === undefined ? undefined : String(val)),
      z.string()
          .regex(/^\d*$/, "Anak ke harus berupa angka")
          .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
          .refine(val => val === undefined || val > 0, "Anak ke harus lebih besar dari 0 jika diisi")
          .optional()
  ),
  pekerjaan_anak: z.string().optional(),
  keterangan: z.string().optional(),
  submit_type: z.string(),
  umur: z.string().optional(),
});

export type DetailAnakFormData = z.infer<typeof detailAnakSchema>;

const TambahKeluarga = () => {

  const navigate = useNavigate();

  const form = useForm<DetailAnakFormData>({
    defaultValues: {
      nama: "",
      jenis_kelamin: "",
      tempat_lahir: "",
      tgl_lahir: undefined,
      anak_ke: undefined,
      umur: "",
      pekerjaan_anak: "",
      keterangan: "",
      submit_type: "submit",
    }, resolver: zodResolver(detailAnakSchema)
  });

  // get data
  const {data} = useQuery({
    queryKey: ["anak-detail-dosen"],
    queryFn: async () => {
      const response = await dosenServices.getDataAnakWithoutParam();
      return response.data;
    },
  });

  // add data
  const {mutate} = useMutation({
    mutationFn:  (data: FormData) => postDosenServices.addDataAnak(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/keluarga/anak")
    },
    onError: (error: any) => {
      console.error("Mutation error:", error.response.data);
    }
  })

  const handleSubmitAnak = (values: DetailAnakFormData) => {
    const formData = new FormData();

    formData.append('nama', values.nama);
    formData.append('jenis_kelamin', values.jenis_kelamin || "");
    formData.append('tempat_lahir', values.tempat_lahir);
    if (values.tgl_lahir instanceof Date) {
      formData.append('tgl_lahir', values.tgl_lahir.toISOString().split('T')[0]);
    } else {
      formData.append('tgl_lahir', "");
    }
    if (values.anak_ke !== undefined) { // Kirim hanya jika ada nilai
      formData.append('anak_ke', String(values.anak_ke));
    }
    formData.append('pekerjaan_anak', values.pekerjaan_anak || "");
    formData.append('keterangan', values.keterangan || "");
    formData.append('submit_type', values.submit_type);
    if (values.umur) {
      formData.append('umur', values.umur);
    }
    
    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Anak" subTitle="Daftar Anak" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitAnak)}>
          <CustomCard
            actions={
              <div>
                <div className="flex w-full justify-end gap-4 flex-col md:flex-row">
                  <Link className="w-full md:w-auto" to="/admin/validasi-data/keluarga">
                    <Button type="button" className="bg-[#00C0EF] w-full md:w-auto hover:bg-[#00A8D1]">
                      <IoIosArrowBack /> Kembali ke daftar
                    </Button>
                  </Link>
                    <Button type="submit" className="bg-yellow-uika hover:bg-hover-yellow-uika">
                      <FaPlus /> {form.formState.isSubmitting ? "Menyimpan..." : "Tambah Baru"}
                    </Button>
                </div>

                <InfoList
                    items={[
                      {label: "NIP", value: data?.pegawai_info.nip},
                      {label: "Nama", value: data?.pegawai_info.nama},
                      {label: "Unit Kerja", value: data?.pegawai_info.unit_kerja},
                      {label: "Status", value: data?.pegawai_info.status},
                      {label: "Jab. Akademik", value: data?.pegawai_info.jab_akademik},
                      {label: "Jab. Fungsional", value: data?.pegawai_info.jab_fungsional},
                      {label: "Jab. Struktural", value: data?.pegawai_info.jab_struktural},
                      {label: "Pendidikan", value: data?.pegawai_info.pendidikan},
                    ]}
                />

                <div className="mt-10 grid md:grid-rows-8 md:grid-flow-col md:items-center gap-4 w-full">

                  <FormFieldInput
                    form={form}
                    label="Nama Pegawai"
                    name="nama_pegawai"
                    labelStyle="text-[#3F6FA9]"
                    value={data?.pegawai_info.nama || ""}
                    disabled={true}
                    required={true}
                  />


                  {/* Kolom Kiri */}
                  <FormFieldInput
                    form={form}
                    label="Nama"
                    name="nama"
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                  />

                  <FormFieldSelect
                    form={form}
                    label="Jenis Kelamin"
                    name="jenis_kelamin"
                    placeholder="--Pilih--"
                    options={[
                      { label: "Laki-Laki", value: "Laki-laki" },
                      { label: "Perempuan", value: "Perempuan" },
                    ]}
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />

                  <FormFieldInput
                    form={form}
                    label="Tempat Lahir"
                    name="tempat_lahir"
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                  />

                  <FormFieldInput
                    form={form}
                    label="Tanggal Lahir"
                    name="tgl_lahir"
                    type="date"
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                  />

                  <FormFieldInput
                    form={form}
                    label="Umur"
                    name="umur"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />

                  {/*<FormFieldInputFile*/}
                  {/*  form={form}*/}
                  {/*  label="File Akte Kelahiran"*/}
                  {/*  name="file_akte_kelahiran"*/}
                  {/*  classname="border-none shadow-none"*/}
                  {/*  labelStyle="text-[#3F6FA9]"*/}
                  {/*  required={false}*/}
                  {/*/>*/}

                  <FormFieldInput
                    form={form}
                    label="Anak Ke"
                    name="anak_ke"
                    type="number"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />

                  <FormFieldInput
                    form={form}
                    label="Pekerjaan Anak"
                    name="pekerjaan_anak"
                    labelStyle="text-[#3F6FA9]"
                    required={false}
                  />

                  {/* Kolom Kanan */}
                </div>
              </div>
            }
          />
        </form>
      </Form>
    </div>
  );
};

export default TambahKeluarga;