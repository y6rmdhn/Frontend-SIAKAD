import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { parseISO, format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface DokumenDetail {
  id: string;
  file_name: string;
  file_path: string;
  kategori_dokumen: string | null;
  url: string;
}

interface KeluargaDetail {
  id: string;
  nama: string;
  hubungan: string;
  jenis_kelamin: string;
  tempat_lahir: string | null;
  tgl_lahir: string | null;
  umur: number | string;
  alamat: string | null;
  telepon: string | null;
  pekerjaan: string | null;
  anak_ke: number | string | null;
  kartu_nikah: string | null;
  is_pasangan_satu_institusi: boolean | null;
  status: string;
  tgl_diajukan: string | null;
  tgl_disetujui: string | null;
  tgl_ditolak: string | null;
  keterangan_penolakan?: string | null;
  dokumen?: DokumenDetail[];
}

interface PegawaiInfo {
  nama: string;
}

interface DetailKeluargaApiResponse {
  data: KeluargaDetail;
  pegawai: PegawaiInfo;
}

const DetailKeluarga = () => {
  const params = useParams<{ id: string }>();

  // Fetch detail data
  const { data, isLoading, isError } = useQuery<DetailKeluargaApiResponse>({
    queryKey: ["detail-keluarga-dosen", params.id],
    queryFn: async () => {
      if (!params.id) {
        throw new Error("ID Keluarga tidak ditemukan di URL");
      }
      const response = await dosenServices.getDataKeluargaDetail(params.id);
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Detail Keluarga" subTitle="Memuat data..." />
        <CustomCard>
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CustomCard>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="mt-10 mb-20 text-center text-red-500">
        Gagal memuat detail data keluarga.
      </div>
    );
  }

  const detail = data.data;
  const isAnak = detail.hubungan === "Anak";
  const isPasangan = detail.hubungan === "Pasangan";

  return (
    <div className="mt-10 mb-20">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Title title="Detail Keluarga" subTitle={`Detail ${detail.hubungan}`} />
        <Link className="w-full md:w-auto" to="/data-riwayat/keluarga">
          <Button className="bg-green-light-uika w-full md:w-auto hover:bg-[#329C59]">
            <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
          </Button>
        </Link>
      </div>

      <CustomCard
        actions={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-3 rounded-lg p-4 mt-5">
            {/* KIRI */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Nama Lengkap
                </Label>
                <Label className="text-xs sm:text-sm font-semibold">{detail.nama}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Hubungan
                </Label>
                <Label className="text-xs sm:text-sm capitalize">{detail.hubungan}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Jenis Kelamin
                </Label>
                <Label className="text-xs sm:text-sm">{detail.jenis_kelamin}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Tempat Lahir
                </Label>
                <Label className="text-xs sm:text-sm">{detail.tempat_lahir || "-"}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Tgl Lahir
                </Label>
                <Label className="text-xs sm:text-sm">
                  {detail.tgl_lahir
                    ? format(parseISO(detail.tgl_lahir), "dd MMMM yyyy")
                    : "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Umur
                </Label>
                <Label className="text-xs sm:text-sm">{detail.umur} Tahun</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Telepon
                </Label>
                <Label className="text-xs sm:text-sm">{detail.telepon || "-"}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Pekerjaan
                </Label>
                <Label className="text-xs sm:text-sm">{detail.pekerjaan || "-"}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Alamat
                </Label>
                <Label className="text-xs sm:text-sm break-all">{detail.alamat || "-"}</Label>
              </div>
            </div>

            {/* KANAN */}
            <div className="space-y-2">
              {isAnak && (
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                    Anak Ke
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">{detail.anak_ke || "-"}</Label>
                </div>
              )}

              {isPasangan && (
                <>
                  <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                    <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                      No Kartu Nikah
                    </Label>
                    <Label className="text-xs sm:text-sm font-semibold">{detail.kartu_nikah || "-"}</Label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                    <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                      Satu Institusi?
                    </Label>
                    <Label className="text-xs sm:text-sm font-semibold">
                      {detail.is_pasangan_satu_institusi ? "Ya" : "Tidak"}
                    </Label>
                  </div>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="text-[#3F6FA9] font-medium text-xs sm:text-sm shrink-0 w-38">
                  Status Pengajuan
                </Label>
                <Label className="text-xs sm:text-sm font-semibold capitalize">{detail.status}</Label>
              </div>

              {detail.status === "ditolak" && detail.keterangan_penolakan && (
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2 bg-red-50 text-red-700">
                  <Label className="text-red-700 font-medium text-xs sm:text-sm shrink-0 w-38">
                    Alasan Penolakan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">{detail.keterangan_penolakan}</Label>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                  Dokumen Pendukung
                </Label>
                <div className="flex flex-col gap-1 w-full text-right sm:text-left">
                  {detail.dokumen && detail.dokumen.length > 0 ? (
                    detail.dokumen.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline text-xs sm:text-sm block truncate w-full"
                        title={doc.file_name}
                      >
                        {doc.file_name}
                      </a>
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-xs sm:text-sm">Tidak ada dokumen</span>
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

export default DetailKeluarga;
