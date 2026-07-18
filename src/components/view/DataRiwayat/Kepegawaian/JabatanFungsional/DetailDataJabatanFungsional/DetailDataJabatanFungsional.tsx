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

interface JabatanFungsionalDetail {
  id: string;
  no_sk: string;
  tgl_sk: string;
  tmt_jabatan: string;
  pejabat_penetap: string;
  angka_kredit: number;
  status: string;
  createdAt: string;
  tgl_disetujui: string | null;
  tgl_ditolak: string | null;
  keterangan_penolakan?: string | null;
  jabatan_fungsional?: {
    nama: string;
  };
  dokumen?: DokumenDetail[];
}

interface PegawaiInfo {
  nama: string;
  nip: string;
}

interface DetailJabatanFungsionalApiResponse {
  data: JabatanFungsionalDetail;
  pegawai: PegawaiInfo;
}

const DetailDataJabatanFungsional = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<DetailJabatanFungsionalApiResponse>({
    queryKey: ["detail-jabatan-fungsional-dosen", params.id],
    queryFn: async () => {
      if (!params.id) {
        throw new Error("ID tidak ditemukan");
      }
      const response = await dosenServices.getJabatanFungsionalDetail(params.id);
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Detail Jabatan Fungsional" subTitle="Memuat data..." />
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
        <Title title="Detail Jabatan Fungsional" subTitle="Rincian data" />
        <Link className="w-full md:w-auto" to="/data-riwayat/kepegawaian/jabatan-fungsional">
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
                  Jabatan Fungsional
                </Label>
                <Label className="text-xs sm:text-sm font-semibold">
                  {detail.jabatan_fungsional?.nama || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  TMT. Jabatan
                </Label>
                <Label className="text-xs sm:text-sm">{formatDate(detail.tmt_jabatan)}</Label>
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
                  Angka Kredit
                </Label>
                <Label className="text-xs sm:text-sm font-semibold">{detail.angka_kredit ?? "0"}</Label>
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

export default DetailDataJabatanFungsional;
