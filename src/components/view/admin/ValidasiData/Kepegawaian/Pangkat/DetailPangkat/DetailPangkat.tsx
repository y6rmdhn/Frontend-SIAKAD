import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { Skeleton } from "@/components/ui/skeleton";

const DetailPangkat = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["detail-pangkat-admin", params.id],
    queryFn: async () => {
      if (!params.id) {
        throw new Error("ID Pangkat tidak ditemukan di URL");
      }
      const response = await adminServices.getPangkatDetailAdmin(params.id);
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Data Pangkat" subTitle="Detail Pangkat" />
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

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Data Pangkat" subTitle="Detail Pangkat" />
        <CustomCard>
          <p className="p-10 text-red-500">Gagal memuat detail data pangkat.</p>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Data Pangkat" subTitle="Detail Pangkat" />

      <CustomCard
        title={
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">
              {data?.pegawai_info_detail?.nama_lengkap}
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
                to="/admin/validasi-data/kepegawaian/pangkat"
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
                    Jenis SK
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.jenis_sk_label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Jenis Kenaikan Pangkat
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.jenis_kenaikan_pangkat_label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Nama Pangkat
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.nama_pangkat || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    TMT. Pangkat
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.tmt_pangkat_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    No. SK
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.no_sk || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Tanggal SK
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.tgl_sk_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Pejabat Penetap
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.pejabat_penetap || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Masa Kerja (Tahun)
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.masa_kerja_tahun ?? "-"} Tahun
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Masa Kerja (Bulan)
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.masa_kerja_bulan ?? "-"} Bulan
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Acuan Masa Kerja
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.acuan_masa_kerja ? (
                      <FaCheck className="text-green-500 w-4 h-4" />
                    ) : (
                      <IoClose className="text-red-500 w-5 h-5" />
                    )}
                  </Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Status Pengajuan
                  </Label>
                  <Label className="text-xs sm:text-sm text-right capitalize">
                    {data?.data?.status_info?.label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.tgl_diajukan_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.tgl_disetujui_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.nama_pegawai || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-start border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    File Pendukung
                  </Label>
                  <div className="text-xs sm:text-sm text-right">
                    {data?.data?.file_pangkat_link ? (
                      <a
                        href={data.data.file_pangkat_link}
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

export default DetailPangkat;
