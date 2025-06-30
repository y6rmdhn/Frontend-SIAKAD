import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";

const DetailDataKemampuanBahasaAdmin = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["detail-kemampuan-bahasa-admin", params.id],
    queryFn: async () => {
      if (!params.id) {
        throw new Error("ID Kemampuan Bahasa tidak ditemukan di URL");
      }
      const response = await adminServices.getKemampuanBahasaDetailAdmin(
        params.id
      );
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />
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
        <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />
        <CustomCard>
          <p className="p-10 text-red-500">
            Gagal memuat detail data kemampuan bahasa.
          </p>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />

      <CustomCard
        title={
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">
              {data?.pegawai_info_detail?.nama}
            </h2>
            <p className="text-sm text-gray-500">
              NIP: {data?.pegawai_info_detail?.nip}
            </p>
          </div>
        }
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/admin/validasi-data/pengembangan/kemampuan-bahasa"
              >
                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-[#329C59] text-white">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-black rounded-lg p-4">
              {/* KIRI */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Tahun
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.tahun || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Bahasa
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.nama_bahasa || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Nama Lembaga
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.nama_lembaga || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Kemampuan Mendengar
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.kemampuan_mendengar || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Kemampuan Berbicara
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.kemampuan_bicara || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Kemampuan Menulis
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.kemampuan_menulis || "-"}
                  </Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    Status Pengajuan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right capitalize">
                    {data?.data?.status_info?.label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.tgl_diajukan_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.timestamps?.tgl_disetujui || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold text-right">
                    {data?.data?.nama_pegawai || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-start border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    File Pendukung
                  </Label>
                  <div className="text-xs sm:text-sm font-semibold text-right">
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

export default DetailDataKemampuanBahasaAdmin;
