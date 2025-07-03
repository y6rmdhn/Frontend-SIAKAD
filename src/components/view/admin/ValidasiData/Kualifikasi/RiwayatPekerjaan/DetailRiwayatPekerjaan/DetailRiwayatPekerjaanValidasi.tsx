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

const DetailRiwayatPekerjaanValidasi = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    // 1. Mengganti queryKey agar unik untuk riwayat pekerjaan
    queryKey: ["riwayat-pekerjaan-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak ditemukan");
      // 2. Memanggil service yang sesuai untuk riwayat pekerjaan
      const response = await adminServices.getRiwayatPekerjaanDetail(id);
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
      case "secondary":
        return "bg-gray-400";
      default:
        return "bg-gray-500";
    }
  };

  // Tampilan saat loading
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <Title
            title="Riwayat Pekerjaan"
            subTitle="Detail Riwayat Pekerjaan"
          />
          <Link to="/admin/validasi-data/kualifikasi/riwayat-pekerjaan">
            <Skeleton className="h-10 w-48" />
          </Link>
        </div>
        <CustomCard
          actions={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
              <div className="space-y-4 p-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
              <div className="space-y-4 p-2">
                {[...Array(7)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
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
        <Link to="/admin/validasi-data/kualifikasi/riwayat-pekerjaan">
          <Button className="mt-4">Kembali</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
        <Title
          title="Riwayat Pekerjaan"
          subTitle={`Detail untuk ${data?.pegawai_info_detail.nama}`}
        />
        <Link
          className="w-full md:w-auto"
          to="/admin/validasi-data/kualifikasi/riwayat-pekerjaan"
        >
          <Button className="bg-[#00C0EF] w-full md:w-auto hover:bg-[#00a9d4] text-white">
            <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
          </Button>
        </Link>
      </div>

      <CustomCard
        actions={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2 border border-gray-200 rounded-lg p-4">
            {/* KIRI */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Bidang Usaha
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.bidang_usaha || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Jenis Pekerjaan
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.jenis_pekerjaan || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Jabatan
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.jabatan || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Instansi
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.instansi || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Divisi
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.divisi || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Deskripsi
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.deskripsi || "-"}
                </Label>
              </div>
            </div>

            {/* KANAN */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="text-gray-500 font-semibold text-sm shrink-0 w-48">
                  Area Pekerjaan
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.area_pekerjaan_label || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="text-gray-500 font-semibold text-sm shrink-0 w-48">
                  Mulai Bekerja
                </Label>
                <Label className="text-sm text-right font-medium">
                  {formatDate(data?.data.mulai_bekerja)}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Selesai Bekerja
                </Label>
                <Label className="text-sm text-right font-medium">
                  {formatDate(data?.data.selesai_bekerja)}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Status Pengajuan
                </Label>
                <Label className="text-sm text-right font-medium">
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
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Tanggal Diajukan
                </Label>
                <Label className="text-sm text-right font-medium">
                  {formatDate(data?.data.timestamps.tgl_diajukan)}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Tanggal Disetujui
                </Label>
                <Label className="text-sm text-right font-medium">
                  {formatDate(data?.data.timestamps.tgl_disetujui)}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Dibuat Oleh
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.nama_pegawai || "-"}
                </Label>
              </div>
            </div>

            {/* DOKUMEN PENDUKUNG */}
            {data?.dokumen_pendukung && data.dokumen_pendukung.length > 0 && (
              <div className="lg:col-span-2 mt-4">
                <Label className="font-semibold text-gray-600 text-base">
                  Dokumen Pendukung
                </Label>
                <div className="mt-2 space-y-2">
                  {data.dokumen_pendukung.map((dok: any) => (
                    <div
                      key={dok.id}
                      className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2"
                    >
                      <Label className="font-medium text-gray-500 text-sm shrink-0 w-48">
                        {dok.nama_dokumen || "Dokumen"}
                      </Label>
                      <a
                        href={dok.file_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-medium text-right ${
                          dok.file_url
                            ? "text-blue-500 hover:underline"
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center gap-2 justify-end">
                          <FaFileDownload />{" "}
                          {dok.file_url ? "Lihat Dokumen" : "Tidak ada file"}
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};

export default DetailRiwayatPekerjaanValidasi;
