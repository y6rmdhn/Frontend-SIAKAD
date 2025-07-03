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
import { useEffect } from "react"; // Import useEffect

export const izinSchema = z.object({
  jenis_izin_id: z.string().min(1, { message: "Jenis Izin harus diisi." }),
  tgl_mulai: z.string().min(1, { message: "Tanggal mulai harus diisi." }),
  tgl_selesai: z.string().optional(),
  jumlah_izin: z.string().optional(),
  alasan_izin: z.string().optional(),
  submit_type: z.string().optional(),
  file_pendukung: fileSchemaNew,
});

export type IzinSchema = z.infer<typeof izinSchema>;

const DetailIzin = () => {
  const navigate = useNavigate();

  const form = useForm<IzinSchema>({
    resolver: zodResolver(izinSchema),
    defaultValues: {
      jenis_izin_id: "",
      tgl_mulai: "",
      tgl_selesai: "",
      jumlah_izin: "",
      alasan_izin: "",
      submit_type: "submit",
      file_pendukung: undefined,
    },
  });

  // Get watch and setValue to manage fields dynamically
  const { watch, setValue } = form;
  const tglMulai = watch("tgl_mulai");
  const tglSelesai = watch("tgl_selesai");

  // Effect to calculate permit duration when dates change
  useEffect(() => {
    if (tglMulai && tglSelesai) {
      const startDate = new Date(tglMulai);
      const endDate = new Date(tglSelesai);

      // Ensure dates are valid and end date is not before start date
      if (
        !isNaN(startDate.getTime()) &&
        !isNaN(endDate.getTime()) &&
        endDate >= startDate
      ) {
        const diffTime = endDate.getTime() - startDate.getTime();
        // Calculate days and add 1 for inclusive count
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setValue("jumlah_izin", String(diffDays));
      } else {
        // Clear the value if dates are invalid
        setValue("jumlah_izin", "");
      }
    }
  }, [tglMulai, tglSelesai, setValue]);

  // add data
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataPengajuanIzin(formData),
    onSuccess: (response) => {
      console.log("Server response:", response);
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/operasional/pengajuan/izin");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: IzinSchema) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "file_pendukung" && value && value.length > 0) {
        formData.append(key, value[0]);
      } else if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value as string);
      }
    });

    mutate(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Izin" subTitle="Tambah Permohonan Izin" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="">
                <div className="flex w-full md:w-auto gap-2 order-1 md:order-2 md:flex-row flex-col justify-end">
                  <Link
                    className="w-full md:w-auto"
                    to="/operasional/pengajuan/izin"
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
                        label="Jenis Izin"
                        name="jenis_izin_id"
                        labelStyle="text-[#3F6FA9]"
                        placeholder="--Pilih Jenis Izin--"
                        required
                        queryKey="izin-dosen-select"
                        queryFn={dosenServices.getPengajuanIzinDosen}
                        itemValue="id"
                        itemLabel="jenis_izin"
                      />

                      <FormFieldInput
                        form={form}
                        label="Tanggal Mulai"
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
                        required={false}
                      />
                    </div>

                    {/* Kolom Kanan */}
                    <div className="space-y-7 md:mt-0.5 lg:mt-0">
                      {/* Changed to be disabled (read-only) */}
                      <FormFieldInput
                        form={form}
                        label="Jumlah Izin"
                        name="jumlah_izin"
                        type="number"
                        labelStyle="text-[#3F6FA9]"
                        readOnly
                      />
                      <FormFieldInput
                        form={form}
                        label="Alasan Izin"
                        name="alasan_izin"
                        labelStyle="text-[#3F6FA9]"
                        required={false}
                      />

                      <FormFieldInputFile
                        label="File Pendukung"
                        name="file_pendukung"
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

export default DetailIzin;
