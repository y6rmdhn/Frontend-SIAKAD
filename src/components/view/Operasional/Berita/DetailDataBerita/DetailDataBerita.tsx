import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FaDownload,
  FaUser,
  FaRegCalendarAlt,
  FaHistory,
  FaFlag,
} from "react-icons/fa";

const DetailDataBerita = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    // 1. Ganti queryKey agar unik untuk berita
    queryKey: ["berita-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak ditemukan");
      // 2. Panggil service yang sesuai untuk berita
      const response = await dosenServices.getBeritaDetail(id);
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
      default:
        return "bg-gray-500";
    }
  };

  // Tampilan saat loading
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Berita" subTitle="Detail Berita" />
        <CustomCard
          actions={
            <div className="flex flex-col gap-4">
              <div className="flex justify-end mb-4">
                <Skeleton className="h-10 w-48" />
              </div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-48 w-full" />
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
        <Title title="Berita" subTitle="Detail Berita" />
        <p className="text-red-500">Gagal memuat data berita.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Berita" subTitle="Detail Berita" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end mb-4">
              <Link className="w-full md:w-auto" to="/operasional/berita">
                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-[#32a95c]">
                  <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
                </Button>
              </Link>
            </div>

            <article>
              {/* --- GAMBAR BERITA --- */}
              {data?.data.has_gambar && data?.data.gambar_berita && (
                <img
                  src={data.data.gambar_berita}
                  alt={data.data.judul}
                  className="w-full h-auto max-h-96 object-cover rounded-lg mb-4"
                />
              )}

              {/* --- JUDUL --- */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {data?.data.judul || "Judul Tidak Tersedia"}
              </h1>

              {/* --- METADATA --- */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-4 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <FaUser /> <span>{data?.dosen.nama || "-"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegCalendarAlt />{" "}
                  <span>Diposting: {formatDate(data?.data.tgl_posting)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaHistory />{" "}
                  <span>Berakhir: {formatDate(data?.data.tgl_expired)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaFlag />{" "}
                  <span>Prioritas: {data?.data.prioritas_label || "-"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label>Status:</Label>
                  <span
                    className={`capitalize px-2 py-0.5 text-xs rounded-md text-white ${getStatusColor(
                      data?.data.status_info.color
                    )}`}
                  >
                    {data?.data.status_info.label || "-"}
                  </span>
                </div>
              </div>

              {/* --- KONTEN BERITA --- */}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: data?.data.konten || "<p>Konten tidak tersedia.</p>",
                }}
              />

              {/* --- TAG JABATAN & UNIT KERJA --- */}
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-semibold mb-2">Ditujukan untuk:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {data?.data.unit_kerja || "-"}
                  </span>
                  {data?.data.jabatan_akademik
                    .split(", ")
                    .map((jabatan: any) => (
                      <span
                        key={jabatan}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {jabatan}
                      </span>
                    ))}
                </div>
              </div>

              {/* --- FILE LAMPIRAN --- */}
              {data?.data.has_file && data.data.file_berita && (
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-semibold mb-2">Lampiran:</h3>
                  <a
                    href={data.data.file_berita.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <FaDownload /> {data.data.file_berita.nama_file}
                  </a>
                </div>
              )}
            </article>
          </div>
        }
      />
    </div>
  );
};

export default DetailDataBerita;
