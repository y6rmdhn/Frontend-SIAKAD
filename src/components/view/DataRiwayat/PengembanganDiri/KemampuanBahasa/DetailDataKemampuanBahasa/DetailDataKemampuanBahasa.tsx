import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { format, parseISO } from "date-fns";

const DetailDataKemampuanBahasa = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["detail-kemampuan-bahasa-dosen", params.id],
    queryFn: async () => {
      if (!params.id) return null;
      const response = await dosenServices.getKemampuanBahasaDetail(params.id);
      console.log(response.data);
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />
        <CustomCard>
          <div className="flex justify-center items-center p-10">
            <p>Memuat data...</p>
          </div>
        </CustomCard>
      </div>
    );
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    try {
      return format(parseISO(dateString), "dd MMMM yyyy");
    } catch (error) {
      return "Tanggal tidak valid";
    }
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/pengembangan-diri/kemampuan-bahasa"
              >
                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-[#329C59] text-white">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
              {/* KIRI */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Tahun
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data.tahun || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Bahasa
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data.nama_bahasa || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Nama Lembaga
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data.nama_lembaga || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Kemampuan Mendengar
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data.kemampuan_mendengar || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Kemampuan Berbicara
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data.kemampuan_bicara || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Kemampuan Menulis
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data.kemampuan_menulis || "-"}
                  </Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Status Pengajuan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data.status_info.label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {formatDate(data?.data.timestamps.tgl_diajukan)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {formatDate(data?.data.timestamps.tgl_disetujui)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
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

export default DetailDataKemampuanBahasa;
