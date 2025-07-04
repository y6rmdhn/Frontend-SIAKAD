import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";

const DetailDataPenghargaanAdmin = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["detail-penghargaan-admin", params.id],
    queryFn: async () => {
      if (!params.id) {
        throw new Error("ID Penghargaan tidak ditemukan di URL");
      }
      const response = await adminServices.getPenghargaanDetailAdmin(params.id);
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Penghargaan" subTitle="Detail Penghargaan" />
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
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
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

  // Menampilkan state error
  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Penghargaan" subTitle="Detail Penghargaan" />
        <CustomCard>
          <p className="p-10 text-red-500">
            Gagal memuat detail data penghargaan.
          </p>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Penghargaan" subTitle="Detail Penghargaan" />

      <CustomCard
        title={
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{data?.data.nama_pegawai}</h2>
            <p className="text-sm text-gray-500">NIP: {data?.data.nip}</p>
          </div>
        }
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/admin/validasi-data/penunjang/penghargaan"
              >
                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-hover-blue-200">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-black rounded-lg p-4">
              {/* KIRI */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Kategori Kegiatan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.kategori_kegiatan_label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Jenis Penghargaan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.jenis_penghargaan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Tingkat Penghargaan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.tingkat_penghargaan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Nama Penghargaan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.nama_penghargaan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Tanggal Penghargaan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.tanggal_penghargaan_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Instansi Pemberi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.instansi_pemberi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    SK Penugasan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.no_sk_penugasan || "-"}
                  </Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Status Pengajuan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right capitalize">
                    {data?.data?.status_info?.label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.timestamps?.tgl_diajukan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.timestamps?.tgl_disetujui || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.nama_pegawai || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-start border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    File Pendukung
                  </Label>
                  <div className="text-xs sm:text-sm text-right">
                    {data?.data?.dokumen?.url ? (
                      <a
                        href={data.data.dokumen.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Lihat File
                      </a>
                    ) : (
                      <p>Tidak ada file</p>
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

export default DetailDataPenghargaanAdmin;
