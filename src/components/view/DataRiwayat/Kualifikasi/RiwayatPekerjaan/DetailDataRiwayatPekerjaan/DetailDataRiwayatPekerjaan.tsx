import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import dosenServices from "@/services/dosen.services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const DetailDataRiwayatPekerjaan = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    // Ganti queryKey agar unik untuk data ini
    queryKey: ["riwayat-pekerjaan-dosen-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak ditemukan");
      const response = await dosenServices.getRiwayatPekerjaanDetail(id);
      return response.data;
    },
    enabled: !!id,
  });

  // Helper untuk format tanggal
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusColor = (color?: string) => {
    switch (color) {
      case "success":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Tampilan saat loading
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Riwayat Pekerjaan" subTitle="Detail Riwayat Pekerjaan" />
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
        <Title title="Riwayat Pekerjaan" subTitle="Detail Riwayat Pekerjaan" />
        <p className="text-red-500">Gagal memuat data riwayat pekerjaan.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Riwayat Pekerjaan" subTitle="Detail Riwayat Pekerjaan" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kualifikasi/riwayat-pekerjaan"
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
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Bidang Usaha
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.bidang_usaha || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Jenis Pekerjaan
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.jenis_pekerjaan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Jabatan
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.jabatan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Nama Instansi
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.instansi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Area Pekerjaan
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.area_pekerjaan_text || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Divisi
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.divisi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Deskripsi Kerja
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.deskripsi || "-"}
                  </Label>
                </div>
              </div>

              {/* === KOLOM KANAN === */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Mulai Bekerja
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.mulai_bekerja)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Selesai Bekerja
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.selesai_bekerja)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Status Pengajuan
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    <span
                      className={`capitalize px-2 py-1 text-xs rounded-md text-white ${getStatusColor(
                        data?.data.status_info.color
                      )}`}
                    >
                      {data?.data.status_info.label || "-"}
                    </span>
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.timestamps.tgl_diajukan)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.timestamps.tgl_disetujui)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.pegawai.nama || "-"}
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

export default DetailDataRiwayatPekerjaan;
