import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { format, parseISO, isValid } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const formatDate = (dateStr?: string | null) => {
  if (!dateStr || dateStr.trim() === "" || dateStr.startsWith("0000-00-00")) {
    return "-";
  }
  try {
    const parsed = parseISO(dateStr);
    if (isValid(parsed)) {
      return format(parsed, "dd MMMM yyyy");
    }
  } catch (e) {
    // ignore
  }
  return "-";
};

interface DokumenDetail {
  id: string;
  file_name: string;
  file_path: string;
  kategori_dokumen: string | null;
  url: string;
}

interface JabatanStrukturalDetail {
  id: string;
  no_sk: string;
  tgl_sk: string;
  tgl_mulai: string;
  tgl_selesai: string | null;
  pejabat_penetap: string | null;
  status: string;
  createdAt: string;
  tgl_disetujui: string | null;
  tgl_ditolak: string | null;
  keterangan_penolakan?: string | null;
  jabatan_struktural?: {
    nama: string;
  };
  dokumen?: DokumenDetail[];
}

interface PegawaiInfo {
  nama: string;
}

interface DetailJabatanStrukturalApiResponse {
  data: JabatanStrukturalDetail;
  pegawai: PegawaiInfo;
}

const DetailDataJabatanStruktural = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<DetailJabatanStrukturalApiResponse>({
    queryKey: ["detail-jabatan-struktural-dosen", params.id],
    queryFn: async () => {
      if (!params.id) {
        throw new Error("ID tidak ditemukan");
      }
      const response = await dosenServices.getJabatanStrukturalDetail(params.id);
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Detail Jabatan Struktural" subTitle="Memuat data..." />
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
        Gagal memuat detail data.
      </div>
    );
  }

  const detail = data.data;

  return (
    <div className="mt-10 mb-20">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Title title="Detail Jabatan Struktural" subTitle="Rincian data" />
        <Link className="w-full md:w-auto" to="/data-riwayat/kepegawaian/jabatan-struktural">
          <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-[#2e9851]">
            <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
          </Button>
        </Link>
      </div>

      <CustomCard
        actions={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-black rounded-lg p-4 mt-5">
            {/* KIRI */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Jabatan Struktural
                </Label>
                <Label className="text-xs sm:text-sm font-semibold">
                  {detail.jabatan_struktural?.nama || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  No. SK
                </Label>
                <Label className="text-xs sm:text-sm">{detail.no_sk || "-"}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Tgl. SK
                </Label>
                <Label className="text-xs sm:text-sm">{formatDate(detail.tgl_sk)}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Tgl. Mulai
                </Label>
                <Label className="text-xs sm:text-sm">{formatDate(detail.tgl_mulai)}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Tgl. Selesai
                </Label>
                <Label className="text-xs sm:text-sm">{formatDate(detail.tgl_selesai)}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Pejabat Penetap
                </Label>
                <Label className="text-xs sm:text-sm">{detail.pejabat_penetap || "-"}</Label>
              </div>
            </div>

            {/* KANAN */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Status Pengajuan
                </Label>
                <Label className="text-xs sm:text-sm font-semibold capitalize">{detail.status}</Label>
              </div>

              {detail.status === "ditolak" && detail.keterangan_penolakan && (
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2 bg-red-50 text-red-700">
                  <Label className="text-red-700 font-semibold text-xs sm:text-sm shrink-0 w-38">
                    Alasan Penolakan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">{detail.keterangan_penolakan}</Label>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Tanggal Diajukan
                </Label>
                <Label className="text-xs sm:text-sm">{formatDate(detail.createdAt)}</Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Tanggal Disetujui
                </Label>
                <Label className="text-xs sm:text-sm">{formatDate(detail.tgl_disetujui)}</Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Dibuat Oleh
                </Label>
                <Label className="text-xs sm:text-sm">{data.pegawai?.nama || "-"}</Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Dokumen SK
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

export default DetailDataJabatanStruktural;
