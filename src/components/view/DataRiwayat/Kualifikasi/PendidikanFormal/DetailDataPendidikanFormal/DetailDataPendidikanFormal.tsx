import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import dosenServices from "@/services/dosen.services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO, isValid } from "date-fns";

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

interface PendidikanFormalDetail {
  id: string;
  instansi_pendidikan: string | null;
  lokasi_pendidikan: string;
  nomor_induk: string;
  judul: string | null;
  letak_gelar: string | null;
  konsentrasi: string | null;
  tahun_masuk: number;
  tanggal_lulus: string;
  tahun_lulus: number;
  jumlah_semester: number | null;
  jumlah_sks: number | null;
  ipk: string | null;
  nomor_ijazah: string;
  tanggal_ijazah: string;
  nomor_ijazah_negara: string | null;
  tanggal_ijazah_negara: string | null;
  nomor_dokumen: string | null;
  tanggal_dokumen: string | null;
  status: string;
  createdAt: string;
  tgl_disetujui: string | null;
  tgl_ditolak: string | null;
  keterangan_penolakan?: string | null;
  jenjang_pendidikan?: {
    jenjang_singkatan: string;
  };
  universitas?: {
    nama: string;
  };
  prodi?: {
    nama_prodi: string;
  };
  gelar?: {
    nama: string;
  };
  rumpun_bidang_ilmu?: {
    nama: string;
  };
  dokumen?: DokumenDetail[];
}

interface PegawaiInfo {
  nama: string;
  nip: string;
}

interface DetailPendidikanFormalApiResponse {
  data: PendidikanFormalDetail;
  pegawai: PegawaiInfo;
}

const DetailDataPendidikanFormal = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<DetailPendidikanFormalApiResponse>({
    queryKey: ["pendidikan-formal-dosen-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak ditemukan");
      const response = await dosenServices.getPendidikanFormalDetail(id);
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Detail Pendidikan Formal" subTitle="Memuat data..." />
        <CustomCard>
          <div className="p-6 space-y-4">
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
        Gagal memuat detail data pendidikan formal.
      </div>
    );
  }

  const detail = data.data;

  return (
    <div className="mt-10 mb-20">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Title title="Detail Pendidikan Formal" subTitle="Rincian data" />
        <Link className="w-full md:w-auto" to="/data-riwayat/kualifikasi/pendidikan-formal">
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
                  Lokasi Pendidikan
                </Label>
                <Label className="text-xs sm:text-sm">
                  {detail.lokasi_pendidikan === "DALAM_NEGERI" ? "Dalam Negeri" : "Luar Negeri"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Jenjang Pendidikan
                </Label>
                <Label className="text-xs sm:text-sm font-semibold">
                  {detail.jenjang_pendidikan?.jenjang_singkatan || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Perguruan Tinggi
                </Label>
                <Label className="text-xs sm:text-sm">
                  {detail.universitas?.nama || detail.instansi_pendidikan || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Program Studi
                </Label>
                <Label className="text-xs sm:text-sm">
                  {detail.prodi?.nama_prodi || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Gelar
                </Label>
                <Label className="text-xs sm:text-sm">
                  {detail.gelar?.nama || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Letak Gelar
                </Label>
                <Label className="text-xs sm:text-sm">
                  {detail.letak_gelar || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Rumpun Ilmu
                </Label>
                <Label className="text-xs sm:text-sm">
                  {detail.rumpun_bidang_ilmu?.nama || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Konsentrasi
                </Label>
                <Label className="text-xs sm:text-sm">
                  {detail.konsentrasi || "-"}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  No. Induk / NIM
                </Label>
                <Label className="text-xs sm:text-sm">{detail.nomor_induk || "-"}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Tahun Masuk
                </Label>
                <Label className="text-xs sm:text-sm">{detail.tahun_masuk || "-"}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Tahun Lulus
                </Label>
                <Label className="text-xs sm:text-sm">{detail.tahun_lulus || "-"}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Tanggal Lulus
                </Label>
                <Label className="text-xs sm:text-sm">{formatDate(detail.tanggal_lulus)}</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  IPK Kelulusan
                </Label>
                <Label className="text-xs sm:text-sm">{detail.ipk || "-"}</Label>
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
                  Nomor Ijazah
                </Label>
                <Label className="text-xs sm:text-sm">{detail.nomor_ijazah || "-"}</Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Tanggal Ijazah
                </Label>
                <Label className="text-xs sm:text-sm">{formatDate(detail.tanggal_ijazah)}</Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Judul Tugas Akhir / Tesis
                </Label>
                <Label className="text-xs sm:text-sm">{detail.judul || "-"}</Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                  Dokumen Ijazah
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

export default DetailDataPendidikanFormal;
