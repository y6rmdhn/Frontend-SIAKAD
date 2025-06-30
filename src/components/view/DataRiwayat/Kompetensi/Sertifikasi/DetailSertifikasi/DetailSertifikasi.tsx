import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

// UI & Komponen Lokal
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";

// Ikon & Notifikasi
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "sonner";

// Servis API
import dosenServices from "@/services/dosen.services";
import postDosenServices from "@/services/create.dosen.services";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

const sertifikasiSchema = z.object({
  jenis_sertifikasi_id: z.string().min(1, "Jenis sertifikasi wajib dipilih."),
  bidang_ilmu_id: z.string().min(1, "Bidang studi wajib dipilih."),
  no_sertifikasi: z.string().min(1, "Nomor sertifikasi wajib diisi."),
  tgl_sertifikasi: z.string().min(1, "Tanggal sertifikasi wajib diisi."),
  no_registrasi: z.string().optional(),
  no_peserta: z.string().optional(),
  peran: z.string().optional(),
  penyelenggara: z.string().optional(),
  tempat: z.string().optional(),
  lingkup: z.string().optional(),
  keterangan: z.string().optional(),
});

type SertifikasiValues = z.infer<typeof sertifikasiSchema>;

const DetailSertifikasi = () => {
  const navigate = useNavigate();

  const form = useForm<SertifikasiValues>({
    resolver: zodResolver(sertifikasiSchema),
    mode: "onChange",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["sertifikasi-tambah-dosen"],
    queryFn: async () => {
      const response = await dosenServices.getDataDataSertifikasiWithoutParam();
      return response.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newData: SertifikasiValues & { submit_type: string }) =>
      postDosenServices.addDataSertifikasi(newData),
    onSuccess: () => {
      toast.success("Data sertifikasi berhasil ditambahkan");
      form.reset();
      navigate("/data-riwayat/kompetensi/sertifikasi");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data.";
      toast.error(errorMessage);
    },
  });

  const handleSubmitData = (values: SertifikasiValues) => {
    const dataToSubmit = {
      ...values,
      submit_type: "submit",
    };
    mutate(dataToSubmit);
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Sertifikasi" subTitle="Detail Sertifikasi" />
        <CustomCard>
          <Skeleton className="h-40 w-full mb-6" />
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Sertifikasi" subTitle="Detail Sertifikasi" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard>
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row mb-5">
              <Link to="/data-riwayat/kompetensi/sertifikasi">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full md:w-auto"
                >
                  <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#FDA31A] w-full md:w-auto text-white hover:bg-[#e69310]"
              >
                <MdOutlineFileDownload className="mr-2" />
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

            <InfoList
              items={[
                { label: "NIP", value: data.pegawai_info.nip },
                { label: "Nama", value: data.pegawai_info.nama },
                { label: "Unit Kerja", value: data.pegawai_info.unit_kerja },
                { label: "Status", value: data.pegawai_info.status },
                {
                  label: "Jab. Akademik",
                  value: data.pegawai_info.jab_akademik,
                },
                {
                  label: "Jab. Fungsional",
                  value: data.pegawai_info.jab_fungsional,
                },
                {
                  label: "Jab. Struktural",
                  value: data.pegawai_info.jab_struktural,
                },
                { label: "Pendidikan", value: data.pegawai_info.pendidikan },
              ]}
            />

            <div className="mt-10">
              <div className="border-b-2 border-[#FDA31A] pb-2 mb-6">
                <h2 className="text-lg font-semibold text-green-600">
                  Formulir Sertifikasi
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {/* Nama field disesuaikan dengan Zod Schema & API */}
                <InfiniteScrollSelect
                  form={form}
                  label="Jenis Sertifikasi"
                  name="jenis_sertifikasi_id"
                  placeholder="--Pilih Jenis Sertifikasi--"
                  required
                  queryKey="jenis-sertif"
                  queryFn={dosenServices.getJenisSertifikasiReferensi}
                  itemValue="id"
                  itemLabel="nama_sertifikasi"
                />
                <InfiniteScrollSelect
                  form={form}
                  label="Bidang Studi"
                  name="bidang_ilmu_id"
                  placeholder="--Pilih Bidang Studi--"
                  required
                  queryKey="bidang"
                  queryFn={dosenServices.getRumpunBidangIlmu}
                  itemValue="id"
                  itemLabel="nama_bidang"
                />
                <FormFieldInput
                  name="no_sertifikasi"
                  label="Nomor Sertifikasi"
                  form={form}
                  required
                  placeholder="Masukkan nomor sertifikasi"
                />
                <FormFieldInput
                  name="tgl_sertifikasi"
                  label="Tanggal Sertifikasi"
                  type="date"
                  form={form}
                  required
                />
                <FormFieldInput
                  name="no_registrasi"
                  label="Nomor Registrasi"
                  form={form}
                  placeholder="Masukkan nomor registrasi (jika ada)"
                />
                <FormFieldInput
                  name="no_peserta"
                  label="Nomor Peserta"
                  form={form}
                  placeholder="Masukkan nomor peserta (jika ada)"
                />
                <FormFieldInput
                  name="peran"
                  label="Kedudukan / Peran"
                  form={form}
                  placeholder="cth: Peserta"
                />
                <FormFieldInput
                  name="penyelenggara"
                  label="Penyelenggara"
                  form={form}
                  placeholder="cth: Universitas UIKA Bogor"
                />
                <FormFieldInput
                  name="tempat"
                  label="Tempat"
                  form={form}
                  placeholder="cth: Bogor"
                />
                <FormFieldSelect
                  name="lingkup"
                  label="Lingkup"
                  form={form}
                  placeholder="Pilih Lingkup"
                  options={
                    data?.lingkup_options || [
                      { value: "Nasional", label: "Nasional" },
                      { value: "Internasional", label: "Internasional" },
                    ]
                  }
                />
                <FormFieldInput
                  name="keterangan"
                  label="Keterangan"
                  form={form}
                  placeholder="Keterangan tambahan"
                  type="textarea"
                />
              </div>
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailSertifikasi;
