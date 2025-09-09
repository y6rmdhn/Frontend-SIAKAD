import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/blocks/SearchInput";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { ReadOnlyRichText } from "@/components/blocks/ReadOnlyRichText/ReadOnlyRichText";
import { Skeleton } from "@/components/ui/skeleton";

// --- START DEFINISI TIPE ---
interface JabatanAkademik {
  id: string;
  jabatan_akademik: string;
}

interface DetailBerita {
  id: string;
  unit_kerja_id: string; // Berupa string array JSON
  judul: string;
  konten: string;
  tgl_posting: string;
  tgl_expired: string;
  prioritas: boolean;
  gambar_berita: string | null;
  file_berita: string | null;
  jabatan_akademik: JabatanAkademik[];
}
// --- END DEFINISI TIPE ---

const DetailDataBerita = () => {
  const params = useParams<{ id: string }>();

  // get data
  const { data, isLoading, isError } = useQuery<DetailBerita>({
    queryKey: ["detail-berita-operasional", params.id],
    queryFn: async () => {
      if (!params.id) {
        throw new Error("ID Berita tidak ditemukan di URL.");
      }
      const response = await adminServices.getBeritaSelectwithParams(
        Number(params.id)
      );
      return response.data.data;
    },
    enabled: !!params.id,
  });

  // Helper untuk format tanggal
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Menampilkan state loading
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Berita" subTitle="Detail Berita" />
        <CustomCard>
          <div className="p-6 space-y-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-6 flex-1" />
              </div>
            ))}
          </div>
        </CustomCard>
      </div>
    );
  }

  // Menampilkan state error
  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center text-red-500">
        Gagal memuat data berita.
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Berita" subTitle="Detail Berita" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
              <div>
                <SearchInput />
              </div>
              <div className="w-full flex flex-col lg:flex-row justify-end gap-2">
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to="/admin/operasional/berita"
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                      <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to="/admin/operasional/tambah-berita"
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                      <FaPlus /> Tambah Baru
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to={`/admin/operasional/edit-data-berita/${params.id}`}
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                      <MdEdit /> Edit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-36 shrink-0">
                  Unit
                </Label>
                <Label className="text-xs sm:text-sm text-left flex-1">
                  {/* API mengembalikan string, idealnya ini adalah nama unit */}
                  {data?.unit_kerja_id || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-36 shrink-0">
                  Judul
                </Label>
                <Label className="text-xs sm:text-sm flex-1">
                  {data?.judul || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-36 shrink-0">
                  Isi Berita
                </Label>
                <div className="text-xs sm:text-sm flex-1">
                  {data?.konten ? (
                    <ReadOnlyRichText content={data.konten} />
                  ) : (
                    "-"
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-36 shrink-0">
                  Tgl. Posting
                </Label>
                <Label className="text-xs sm:text-sm text-left flex-1">
                  {formatDate(data?.tgl_posting)}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-36 shrink-0">
                  Tgl. Expired
                </Label>
                <Label className="text-xs sm:text-sm flex-1">
                  {formatDate(data?.tgl_expired)}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-36 shrink-0">
                  Prioritas
                </Label>
                <Label className="text-xs sm:text-sm flex-1">
                  {data?.prioritas ? "Ya" : "Tidak"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-36 shrink-0">
                  Gambar Berita
                </Label>
                <Label className="text-xs sm:text-sm text-left flex-1">
                  {data?.gambar_berita ? (
                    <a
                      href={data.gambar_berita}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Lihat Gambar
                    </a>
                  ) : (
                    "-"
                  )}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-36 shrink-0">
                  File Berita
                </Label>
                <Label className="text-xs sm:text-sm flex-1">
                  {data?.file_berita ? (
                    <a
                      href={data.file_berita}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Unduh File
                    </a>
                  ) : (
                    "-"
                  )}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-36 shrink-0">
                  Penerima Berita
                </Label>
                <div className="text-xs sm:text-sm flex-1">
                  {data?.jabatan_akademik &&
                  data.jabatan_akademik.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {data.jabatan_akademik.map((jabatan) => (
                        <span
                          key={jabatan.id}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md"
                        >
                          {jabatan.jabatan_akademik}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailDataBerita;
