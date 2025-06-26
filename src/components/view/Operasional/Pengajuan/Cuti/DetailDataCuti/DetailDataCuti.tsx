import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import dosenServices from "@/services/dosen.services";
import { useQuery } from "@tanstack/react-query";

const DetailDataCuti = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["detail-pengajuan-cuti-dosen", params.id],
    queryFn: async () => {
      if (!params.id) return null;
      const response = await dosenServices.getDataCutiWithoutParams(params.id);
      console.log(response.data);
      return response.data;
    },
    enabled: !!params.id,
  });

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd MMMM yyyy");
    } catch (error) {
      return "Tanggal tidak valid";
    }
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Izin" subTitle="Detail Permohonan Izin" />
        <CustomCard>
          <div className="flex justify-center items-center p-10">
            <p>Memuat data...</p>
          </div>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Cuti" subTitle="Detail Permohonan Cuti" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/operasional/pengajuan/cuti"
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
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Unit Kerja
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {data?.pegawai.unit_kerja || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Nama Pegawai
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {data?.pegawai.nama || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Jenis Cuti
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {data?.data.jenis_cuti || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Status
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {data?.data.status_info.description
                      ? data.data.status_info.description
                      : "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Alasan Cuti
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {data?.data.alasan_cuti || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Tanggal Cuti
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {formatDate(data?.data.tgl_mulai)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Tanggal Akhir Cuti
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {formatDate(data?.data.tgl_selesai)}
                  </Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Status Pengajuan
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {data?.data.status_info.label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {formatDate(data?.data.timestamps.tgl_diajukan)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {formatDate(data?.data.timestamps.tgl_disetujui)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-xs sm:text-sm">
                    {data?.pegawai.nama || "-"}
                  </Label>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailDataCuti;
