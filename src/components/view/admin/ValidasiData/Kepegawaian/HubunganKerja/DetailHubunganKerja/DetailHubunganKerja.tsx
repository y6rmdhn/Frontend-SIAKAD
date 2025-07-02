import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { Skeleton } from "@/components/ui/skeleton";
import { FaFileDownload } from "react-icons/fa";

const DetailHubunganKerja = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    // 1. Mengganti queryKey agar unik
    queryKey: ["hubungan-kerja-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak ditemukan");
      // 2. Memanggil service yang sesuai
      const response = await adminServices.getHubunganKerjaDetail(id);
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

  // Helper untuk warna status
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
        <Title title="Data Hubungan Kerja" subTitle="Detail Hubungan Kerja" />
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
        <Title title="Data Hubungan Kerja" subTitle="Detail Hubungan Kerja" />
        <p className="text-red-500">Gagal memuat data hubungan kerja.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Data Hubungan Kerja" subTitle="Detail Hubungan Kerja" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/admin/validasi-data/kepegawaian/hubungan-kerja"
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
                    Nama Pegawai
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.pegawai_info_detail.nama || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Jenis Hubungan Kerja
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.hubungan_kerja_label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    No. SK
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.no_sk || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Tgl. SK
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.tgl_sk)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Tgl. Mulai
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.tgl_awal)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Tgl. Selesai
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.tgl_akhir)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Pejabat Penetap
                  </Label>
                  <Label className="text-sm font-medium text-right capitalize">
                    {data?.data.pejabat_penetap || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Status Aktif
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.status_aktif_label || "-"}
                  </Label>
                </div>
              </div>

              {/* === KOLOM KANAN === */}
              <div className="space-y-2">
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
                    {formatDate(data?.data.tgl_diajukan)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {formatDate(data?.data.tgl_disetujui)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-sm font-medium text-right">
                    {data?.data.nama_pegawai || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
                    File Pendukung
                  </Label>
                  <div className="text-sm font-medium text-right">
                    {data?.data.file_hubungan_kerja_link ? (
                      <a
                        href={data.data.file_hubungan_kerja_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center justify-end"
                      >
                        <FaFileDownload className="mr-2" />
                        Lihat Dokumen
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailHubunganKerja;
