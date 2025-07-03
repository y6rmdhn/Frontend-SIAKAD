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

const DetailPendidikanFormalValidasi = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pendidikan-formal-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak ditemukan");
      // NOTE: Menggunakan service yang diasumsikan ada untuk pendidikan formal
      const response = await adminServices.getPendidikanFormalDetail(id);
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
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <Title
            title="Pendidikan Formal"
            subTitle="Detail Pendidikan Formal"
          />
          <Link to="/admin/validasi-data/kualifikasi/pendidikan-formal">
            <Skeleton className="h-10 w-48" />
          </Link>
        </div>
        <CustomCard
          actions={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
              <div className="space-y-4 p-2">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
              <div className="space-y-4 p-2">
                {[...Array(8)].map((_, i) => (
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
        <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />
        <p className="text-red-500">Gagal memuat data pendidikan formal.</p>
        <Link to="/admin/validasi-data/kualifikasi/pendidikan-formal">
          <Button className="mt-4">Kembali</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
        <Title
          title="Pendidikan Formal"
          subTitle={`Detail untuk ${data?.pegawai_info_detail.nama}`}
        />
        <Link
          className="w-full md:w-auto"
          to="/admin/validasi-data/kualifikasi/pendidikan-formal"
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
                  Lokasi Studi
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.lokasi_studi || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Jenjang Studi
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.jenjang_pendidikan_label || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Perguruan Tinggi
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.nama_institusi_label || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Program Studi
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.nama_prodi_label || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Bidang Studi
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.bidang_studi || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Gelar Akademik
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.gelar_akademik_label || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  IPK Kelulusan
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.ipk_kelulusan || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <div className="flex flex-col">
                  <Label className="font-semibold text-gray-500 text-sm shrink-0 w-52">
                    Judul Tugas Akhir
                  </Label>
                  <Label className="text-gray-400 text-xs font-semibold">
                    (Skripsi/Tesis/Disertasi)
                  </Label>
                </div>
                <Label className="text-sm text-right font-medium">
                  {data?.data.judul_tugas || "-"}
                </Label>
              </div>
            </div>

            {/* KANAN */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="text-gray-500 font-semibold text-sm shrink-0 w-48">
                  Nomor Induk
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.nomor_induk || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="text-gray-500 font-semibold text-sm shrink-0 w-48">
                  Nomor Ijazah
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.nomor_ijazah || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Tahun Masuk
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.tahun_masuk || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Tahun Lulus
                </Label>
                <Label className="text-sm text-right font-medium">
                  {data?.data.tahun_lulus || "-"}
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
                  {formatDate(data?.data.timestamps.tanggal_diajukan)}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  Tanggal Disetujui
                </Label>
                <Label className="text-sm text-right font-medium">
                  {formatDate(data?.data.timestamps.tanggal_disetujui)}
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
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  File Ijazah
                </Label>
                <a
                  href={data?.data.file_ijazah_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium text-right ${
                    data?.data.file_ijazah_url
                      ? "text-blue-500 hover:underline"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-2 justify-end">
                    <FaFileDownload />{" "}
                    {data?.data.file_ijazah_url
                      ? "Lihat Dokumen"
                      : "Tidak ada file"}
                  </div>
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-gray-500 text-sm shrink-0 w-48">
                  File Transkrip
                </Label>
                <a
                  href={data?.data.file_transkrip_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium text-right ${
                    data?.data.file_transkrip_url
                      ? "text-blue-500 hover:underline"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-2 justify-end">
                    <FaFileDownload />{" "}
                    {data?.data.file_transkrip_url
                      ? "Lihat Dokumen"
                      : "Tidak ada file"}
                  </div>
                </a>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailPendidikanFormalValidasi;
