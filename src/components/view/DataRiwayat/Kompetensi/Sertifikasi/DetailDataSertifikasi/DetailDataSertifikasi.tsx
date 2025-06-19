import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";

const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return "-";
  const options = { year: "numeric", month: "long", day: "numeric" };
  // @ts-ignore
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const DetailDataSertifikasi = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["kualifikasi-detail-data-sertifikasi", params.id],
    queryFn: async () => {
      if (!params.id) return null;
      const response = await dosenServices.getDetailDataSertifikasiDosen(
        params.id
      );
      console.log(response.data);
      return response.data;
    },
    enabled: !!params.id,
  });

  // Display a loading message while data is being fetched
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Sertifikasi" subTitle="Detail Sertifikasi" />
        <CustomCard>
          <div>Loading...</div>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Sertifikasi" subTitle="Detail Sertifikasi" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kompetensi/sertifikasi"
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
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Jenis Sertifikasi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data?.jenis_sertifikasi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Nomor Sertifikasi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data?.no_sertifikasi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Nomor Registrasi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data?.no_registrasi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Tanggal Sertifikasi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {formatDate(data?.data?.tgl_sertifikasi)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Nomor Peserta
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data?.no_peserta || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Penyelenggara
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data?.penyelenggara || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Lingkup
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.data?.lingkup || "-"}
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
                    {data?.data?.status_info?.label || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {formatDate(data?.data?.timestamps?.tgl_diajukan)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {formatDate(data?.data?.timestamps?.tgl_disetujui)}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                    {data?.pegawai?.nama || "-"}
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

export default DetailDataSertifikasi;
