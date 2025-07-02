import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import dosenServices from "@/services/dosen.services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const DetailDataPendidikanFormal = () => {
  // 1. Ambil ID dari URL
  const { id } = useParams<{ id: string }>();

  // 2. Gunakan ID untuk mengambil data yang spesifik
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pendidikan-formal-dosen-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak ditemukan");
      const response = await dosenServices.getPendidikanFormalDetail(id);
      return response.data;
    },
    enabled: !!id, // Query hanya akan berjalan jika ID tersedia
  });

  // 3. Helper untuk format tanggal
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Tampilan saat loading
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />
        <CustomCard
          actions={
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <Skeleton className="h-10 w-48" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
                <div className="space-y-4 p-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="space-y-4 p-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  }

  // Tampilan saat error
  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />
        <p className="text-red-500">
          Gagal memuat data detail pendidikan formal.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kualifikasi/pendidikan-formal"
              >
                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-[#32a95c]">
                  <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 border border-gray-200 rounded-lg p-4">
              {/* === KOLOM KIRI === */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Nama Pegawai
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.pegawai.nama || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Jenjang Pendidikan
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.jenjang_pendidikan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Perguruan Tinggi
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.perguruan_tinggi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Program Studi
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.prodi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Tahun Masuk
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.tahun_masuk || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Tahun Lulus
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.tahun_lulus || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Nomor Ijazah
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.nomor_ijazah || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Tanggal Ijazah
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.tanggal_ijazah)}
                  </Label>
                </div>
              </div>

              {/* === KOLOM KANAN === */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Status Pengajuan
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    <span
                      className={`capitalize px-2 py-1 rounded-md text-white bg-${
                        data?.data.status_info.color === "success"
                          ? "green"
                          : "gray"
                      }-500`}
                    >
                      {data?.data.status_info.label || "-"}
                    </span>
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.timestamps.tanggal_diajukan)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.timestamps.tanggal_disetujui)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Gelar Akademik
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.gelar_akademik || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    IPK Kelulusan
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.ipk_kelulusan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Jumlah SKS
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.jumlah_sks_kelulusan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-sm shrink-0 w-48">
                    Judul Tugas Akhir
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.judul_tugas || "-"}
                  </Label>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailDataPendidikanFormal;
