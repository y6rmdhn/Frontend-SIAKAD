import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { id as localeID } from "date-fns/locale";

// UI Components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

// Custom Components
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";

// Icons
import { IoIosArrowBack } from "react-icons/io";

// Services
import adminServices from "@/services/admin.services";

// --- Komponen Utama ---
const DetailDataOrganisasiAdmin = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["detail-organisasi-admin", params.id],
    queryFn: async () => {
      if (!params.id) throw new Error("ID Organisasi tidak ditemukan di URL");
      const response = await adminServices.getOrganisasiDetailAdmin(params.id);
      return response.data;
    },
    enabled: !!params.id,
  });

  const orgData = data?.data;
  const pegawaiInfo = data?.pegawai_info;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      // Cek apakah format sudah "dd MMMM yyyy"
      if (/\d{2} \w+ \d{4}/.test(dateString)) return dateString;
      return format(parseISO(dateString), "d MMMM yyyy", { locale: localeID });
    } catch {
      return dateString;
    }
  };

  const getStatusColorClass = (color?: string) => {
    switch (color) {
      case "success":
        return "text-green-600";
      case "info":
        return "text-blue-600";
      case "warning":
        return "text-yellow-600";
      case "danger":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Data Organisasi" subTitle="Detail Organisasi" />
        <CustomCard>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-48" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        </CustomCard>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Data Organisasi" subTitle="Detail Organisasi" />
        <CustomCard>
          <p className="p-10 text-red-500">
            Gagal memuat detail data organisasi: {(error as Error).message}
          </p>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Data Organisasi" subTitle="Detail Riwayat Organisasi" />

      <CustomCard
        title={
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{pegawaiInfo?.nama}</h2>
            <p className="text-sm text-gray-500">NIP: {pegawaiInfo?.nip}</p>
          </div>
        }
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link to="/admin/validasi-data/pengembangan/organisasi">
                <Button className="bg-[#3ABC67] hover:bg-[#329C59] text-white">
                  <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-black rounded-lg p-4">
              {/* KOLOM KIRI */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-48">
                    Nama Organisasi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {orgData?.nama_organisasi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-48">
                    Jabatan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {orgData?.jabatan_dalam_organisasi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-48">
                    Periode
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {orgData?.periode || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-48">
                    Jenis Organisasi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right capitalize">
                    {orgData?.jenis_organisasi || "-"}
                  </Label>
                </div>
              </div>

              {/* KOLOM KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-48">
                    Tempat
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {orgData?.tempat_organisasi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-48">
                    Status Pengajuan
                  </Label>
                  <Label
                    className={`text-xs sm:text-sm font-semibold text-right capitalize ${getStatusColorClass(
                      orgData?.status_pengajuan_info?.color
                    )}`}
                  >
                    {orgData?.status_pengajuan_info?.label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-48">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {formatDate(orgData?.timestamps.tgl_diajukan)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-start border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-48">
                    Dokumen
                  </Label>
                  <div className="text-xs sm:text-sm font-semibold text-right">
                    {orgData?.dokumen?.url ? (
                      <a
                        href={orgData.dokumen.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Lihat Dokumen
                      </a>
                    ) : (
                      <p>-</p>
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

export default DetailDataOrganisasiAdmin;
