import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { HiMiniTrash } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InfoList from "@/components/blocks/InfoList";
import { useMutation, useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldInputFile } from "../../../../../blocks/CustomFormInputFile/CustomFormInputFile";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"]; // Allow PDF/JPG/PNG

const dokumenPendukungSchema = z.object({
  tipe_dokumen: z.string().optional(),
  file: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 5MB.`
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_MIME_TYPES.includes(files[0]?.type),
      "Hanya format .pdf, .jpg, .png yang diterima."
    ),
  nama_dokumen: z.string().optional(),
  jenis_dokumen: z.string().optional(),
  keterangan: z.string().optional(),
});

const detailDiklatSchema = z
  .object({
    jenis_diklat: z.string().min(1, "Jenis Diklat wajib diisi."),
    kategori_diklat: z.string().min(1, "Kategori Kegiatan wajib diisi."),
    tingkat_diklat: z.string().min(1, "Tingkatan Diklat wajib diisi."),
    nama_diklat: z.string().min(1, "Nama Diklat wajib diisi."),
    penyelenggara: z.string().min(1, "Penyelenggara wajib diisi."),
    peran: z.string().optional(),
    jumlah_jam: z.string().optional(),
    no_sertifikat: z.string().min(1, "Nomor Sertifikat wajib diisi."),
    tahun_penyelenggaraan: z
      .string()
      .min(4, "Tahun tidak valid.")
      .max(4, "Tahun tidak valid."),
    tempat: z.string().optional(),
    tgl_mulai: z.string().min(1, "Tanggal mulai wajib diisi."),
    tgl_selesai: z.string().min(1, "Tanggal selesai wajib diisi."),
    submit_type: z.string(),

    // Array for the table
    files: z.array(dokumenPendukungSchema),
  })
  .refine((data) => new Date(data.tgl_selesai) > new Date(data.tgl_mulai), {
    message: "Tanggal selesai harus setelah tanggal mulai.",
    path: ["tgl_selesai"],
  });

type DetailDiklatSchema = z.infer<typeof detailDiklatSchema>;

const DetailDiklat = () => {
  const navigate = useNavigate();
  const form = useForm<DetailDiklatSchema>({
    resolver: zodResolver(detailDiklatSchema),
    defaultValues: {
      jenis_diklat: "",
      kategori_diklat: "",
      tingkat_diklat: "",
      nama_diklat: "",
      penyelenggara: "",
      peran: "",
      jumlah_jam: "",
      no_sertifikat: "",
      tahun_penyelenggaraan: "",
      tempat: "",
      tgl_mulai: "",
      tgl_selesai: "",
      files: [],
      submit_type: "submit",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "files",
  });

  // get data
  const { data: detailData } = useQuery({
    queryKey: ["diklat-detail-dosen"],
    queryFn: async () => {
      const response = await dosenServices.getDataDiklatWithoutParam();
      return response.data;
    },
  });

  // add data
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataDiklat(formData),
    onSuccess: (response) => {
      console.log("Server response:", response);
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/data-riwayat/kualifikasi/diklat");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitDiklat = (values: DetailDiklatSchema) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== "files") {
        const formKey = key as keyof Omit<DetailDiklatSchema, "files">;
        const value = values[formKey];
        // Use nullish coalescing operator (??) to provide a default value for undefined
        formData.append(formKey, value ?? "");
      }
    });

    values.files.forEach((doc, index) => {
      formData.append(`files[${index}][tipe_dokumen]`, doc.tipe_dokumen ?? "");
      formData.append(`files[${index}][nama_dokumen]`, doc.nama_dokumen ?? "");
      formData.append(
        `files[${index}][jenis_dokumen]`,
        doc.jenis_dokumen ?? ""
      );
      formData.append(`files[${index}][keterangan]`, doc.keterangan || "");
      if (doc.file && doc.file.length > 0) {
        formData.append(`files[${index}][file]`, doc.file[0]);
      }
    });

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Riwayat Diklat" subTitle="Detail Riwayat Diklat" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitDiklat)}>
          <CustomCard
            actions={
              <div>
                <div className="flex justify-end gap-2 w-full flex-col md:flex-row">
                  <Link
                    className="w-full md:w-auto"
                    to="/data-riwayat/kualifikasi/diklat"
                  >
                    <Button className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika">
                      <IoIosArrowBack /> Kembali ke Daftar
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

                <div className="mt-10 grid md:grid-rows-8 md:grid-flow-col md:items-center gap-6 w-full">
                  {/* Kolom Kiri */}
                  <FormFieldSelect
                    label="Jenis Diklat"
                    name="jenis_diklat"
                    placeholder="-- pilih Jenis Diklat --"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "pekerti", label: "Pekerti (Pekerti)" },
                      {
                        value: "applied_approach",
                        label: "Applied Approach (Paket)",
                      },
                      {
                        value: "diklat_prajabatan",
                        label: "Diklat Prajabatan (Non-Pekerti)",
                      },
                      {
                        value: "diklat_kepemimpinan",
                        label: "Diklat Kepemimpinan (Non-Pekerti)",
                      },
                      {
                        value: "academic_exchange",
                        label: "Academic Exchange (Non-Paket)",
                      },
                      {
                        value: "pelatihan_profesional",
                        label: "Pelatihan Profesional (Non-Pekerti)",
                      },
                      { value: "lemhanas", label: "Lemhanas (Non-Pekerti)" },
                      { value: "lainnya", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldInput
                    label="Kategori Kegiatan"
                    name="kategori_diklat"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldSelect
                    label="Tingkatan Diklat"
                    name="tingkat_diklat"
                    placeholder="-- pilih Tingkatan Diklat --"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "lokal", label: "Lokal" },
                      { value: "daerah_regional", label: "Daerah/Regional" },
                      { value: "nasional", label: "Nasional" },
                      { value: "internasional", label: "Internasional" },
                      { value: "lainnya", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldInput
                    label="Nama Diklat"
                    name="nama_diklat"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Penyelenggara"
                    name="penyelenggara"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Peran"
                    name="peran"
                    form={form}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Jumlah Jam"
                    name="jumlah_jam"
                    form={form}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Nomor Sertifikat"
                    name="no_sertifikat"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Tahun Penyelenggaraan"
                    name="tahun_penyelenggaraan"
                    placeholder="2004"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Tempat"
                    name="tempat"
                    form={form}
                    labelStyle="text-[#2572BE]"
                  />

                  {/* Kolom Kanan */}
                  <FormFieldInput
                    label="Tanggal Mulai"
                    name="tgl_mulai"
                    type="date"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Tanggal Selesai"
                    name="tgl_selesai"
                    type="date"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />
                </div>
              </div>
            }
          >
            <Table className="mt-10 table-auto">
              <TableHeader>
                <TableRow className="bg-[#002E5A]">
                  <TableHead className="text-center text-white border">
                    Tipe Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border">
                    Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border">
                    Nama Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border">
                    Jenis Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border">
                    Keterangan
                  </TableHead>
                  <TableHead className="text-center text-white">
                    <Button
                      type="button"
                      className="w-7 h-7 bg-[#FDA31A] cursor-pointer"
                      onClick={() =>
                        append({
                          tipe_dokumen: "",
                          nama_dokumen: "",
                          jenis_dokumen: "",
                          keterangan: "",
                          file: undefined,
                        })
                      }
                    >
                      <IoAdd size={20} />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-200">
                {fields.map((field, index) => (
                  <TableRow key={field.id} className=" even:bg-gray-100">
                    <TableCell className="text-center border border-gray-200">
                      <FormFieldSelect
                        name={`files.${index}.tipe_dokumen`}
                        placeholder="-- Pilih Tipe Dokumen --"
                        form={form}
                        required={false}
                        labelStyle="text-[#2572BE]"
                        options={[
                          { value: "1", label: "SK 1" },
                          { value: "2", label: "SK 2" },
                          { value: "lain", label: "Lainnya" },
                        ]}
                      />
                    </TableCell>

                    <TableCell className="border border-gray-200">
                      <FormFieldInputFile
                        label=""
                        name={`files.${index}.file`}
                        classname="border-none shadow-none"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />
                    </TableCell>

                    <TableCell className="text-center border border-gray-200">
                      <FormFieldInput
                        label=""
                        name={`files.${index}.nama_dokumen`}
                        form={form}
                        labelStyle="text-[#2572BE]"
                      />
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      <FormFieldSelect
                        name={`files.${index}.jenis_dokumen`}
                        placeholder="-- Pilih Jenis Dokumen --"
                        form={form}
                        required={false}
                        labelStyle="text-[#2572BE]"
                        options={[
                          { value: "1", label: "SK 1" },
                          { value: "2", label: "SK 2" },
                          { value: "lain", label: "Lainnya" },
                        ]}
                      />
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      <FormFieldInput
                        name={`files.${index}.keterangan`}
                        form={form}
                        labelStyle="text-[#2572BE]"
                      />
                    </TableCell>
                    <TableCell className="h-full border border-gray-200">
                      <div className="flex justify-center items-center w-full h-full">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => remove(index)}
                        >
                          <HiMiniTrash className="w-5 h-5 text-[#FD1A1E]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailDiklat;
