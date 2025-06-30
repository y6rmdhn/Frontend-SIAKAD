import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { Skeleton } from "@/components/ui/skeleton";

const DetailJabatanStruktural = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["detail-jabatan-struktural-admin", params.id],
    queryFn: async () => {
      if (!params.id) {
        throw new Error("ID Jabatan Struktural tidak ditemukan di URL");
      }
      const response = await adminServices.getJabatanStrukturalDetailAdmin(
        params.id
      );
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title
          title="Data Jabatan Struktural"
          subTitle="Detail Jabatan Struktural"
        />
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
        <Title
          title="Data Jabatan Struktural"
          subTitle="Detail Jabatan Struktural"
        />
        <CustomCard>
          <p className="p-10 text-red-500">
            Gagal memuat detail data jabatan struktural.
          </p>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title
        title="Data Jabatan Struktural"
        subTitle="Detail Jabatan Struktural"
      />

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
                to="/admin/validasi-data/kepegawaian/jabatan-struktural"
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
                    Jabatan Struktural
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.nama_jabatan_struktural || "-"}
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
                    Tgl. SK
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.tgl_sk_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Tgl. Mulai
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.tgl_mulai_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                    Tgl. Selesai
                  </Label>
                  <Label className="text-xs sm:text-sm text-right">
                    {data?.data?.tgl_selesai_formatted || "-"}
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
                    {data?.data?.file_jabatan_link ? (
                      <a
                        href={data.data.file_jabatan_link}
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

export default DetailJabatanStruktural;
