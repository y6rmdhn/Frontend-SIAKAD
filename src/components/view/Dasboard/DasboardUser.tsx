import { Key, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { parseISO, format } from "date-fns";
import { id } from "date-fns/locale";

// UI Components
import { HiUserGroup, HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { type ChartConfig } from "@/components/ui/chart";

// Custom Components & Services
import { ChartLingkaran } from "@/components/commons/Charts/PieChart/ChartLingkaran";
import { AbsensiModal } from "@/components/blocks/AbsensiModal/AbsensiModal";
import { RootState } from "@/store/store";
import dosenServices from "@/services/dosen.services.ts";

// --- START DEFINISI TIPE DATA ---
interface StatusAbsen {
  sudah_absen_masuk: boolean;
  sudah_absen_keluar: boolean;
  detail: {
    tgl_absensi: string;
    jam_masuk: string;
    jam_keluar: string;
    is_terlambat: boolean;
    is_pulang_awal: boolean;
    lokasi_absensi: string;
    jenis_kehadiran: { nama: string };
  } | null;
}

interface HistoryAbsenItem {
  id: Key;
  tgl_absensi: string;
  jam_masuk: string;
  jam_keluar: string;
}

interface SlipGaji {
  id: string;
  pegawai_id: string;
  periode_bulan: number;
  periode_tahun: number;
  total_kehadiran: number;
  total_tunjangan_tetap: number;
  total_tunjangan_variabel: number;
  total_potongan: number;
  gaji_bersih: number;
}

interface TahapanRiwayatDetail {
  key: string;
  label: string;
  sudah_diisi: boolean;
  jumlah_record: number;
}

interface TahapanRiwayat {
  is_lengkap: boolean;
  persentase: number;
  total_kategori: number;
  total_terisi: number;
  pesan: string;
  detail: TahapanRiwayatDetail[];
}
// --- END DEFINISI TIPE DATA ---

export const kehadiranChartConfig = {
  "Hadir (termasuk WFH & Dinas)": { label: "Hadir", color: "#32A14C" },
  "Tidak Hadir (Sakit, Izin, Cuti, Alpha)": {
    label: "Tidak Hadir",
    color: "#FDBA74",
  },
} satisfies ChartConfig;

const DasboardUser = () => {
  const userSelector = useSelector((state: RootState) => state.user);
  const [isAbsenModalOpen, setIsAbsenModalOpen] = useState(false);
  const [absenType, setAbsenType] = useState<"masuk" | "keluar">("masuk");
  const queryClient = useQueryClient();

  // --- START QUERIES ---
  // Mengambil data dashboard absensi (gabungan kehadiran dan riwayat)
  const { data: absensiDashboard, isLoading: isAbsensiDashboardLoading } = useQuery({
    queryKey: ["absensi-dashboard"],
    queryFn: () => dosenServices.getAbsensiDashboard().then((res) => res.data.data),
  });

  const dataGrafik = absensiDashboard;
  const tahapanRiwayat = absensiDashboard?.persentase_riwayat;
  const isTahapanLoading = isAbsensiDashboardLoading;

  const { data: statusAbsen, isLoading: isStatusLoading } = useQuery<StatusAbsen>({
    queryKey: ["status-absen"],
    queryFn: () => dosenServices.getStatusAbsen().then((res) => res.data.data),
    staleTime: 0,
  });

  const { data: historyAbsen, isLoading: isHistoryLoading } = useQuery<
    HistoryAbsenItem[]
  >({
    queryKey: ["history-absen"],
    queryFn: () =>
      dosenServices.getHistoryAbsensi().then((res) => res.data.data),
  });

  // Query baru untuk mengambil data slip gaji
  const { data: slipGajiData, isLoading: isGajiLoading } = useQuery<SlipGaji>({
    queryKey: ["slip-gaji-terbaru"],
    queryFn: async () => {
      const response = await dosenServices.getSlipGaji();
      // Mengambil data gaji pertama dari array
      return response.data.data?.[0];
    },
  });
  // --- END QUERIES ---

  const detailAbsen = statusAbsen?.detail;
  const statistikKehadiranData = useMemo(() => {
    const grafik = dataGrafik?.statistik_kehadiran?.grafik;
    if (!grafik) return [];
    const colors = ["#32A14C", "#FDBA74"];
    return grafik.labels.map((label: string, index: number) => ({
      name: label,
      value: grafik.data[index],
      fill: colors[index % colors.length],
    }));
  }, [dataGrafik]);

  const formatRupiah = (angka: string | number | undefined) => {
    if (angka === undefined || angka === null) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka));
  };

  const getNamaBulan = (bulan: number | undefined) => {
    if (!bulan) return "";
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return namaBulan[bulan - 1] || "";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return "Selamat Pagi";
    if (hour >= 12 && hour < 15) return "Selamat Siang";
    if (hour >= 15 && hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const handleAbsenSuccess = () => {
    setIsAbsenModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["status-absen"] });
    queryClient.invalidateQueries({ queryKey: ["history-absen"] });
  };

  const handleBukaModal = (tipe: "masuk" | "keluar") => {
    setAbsenType(tipe);
    setIsAbsenModalOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-20 mt-10">
      <div className="w-full ">
        <div className="text-sm md:text-base mb-10 flex gap-2 items-center ">
          <HiUserGroup />
          <h1 className="font-medium">Pegawai</h1>
        </div>
        <h1 className="text-sm md:text-base font-medium">{getGreeting()}</h1>
        <h1 className="text-2xl font-semibold">{userSelector.name}</h1>
        <div className="flex flex-col gap-5 lg:flex-row mb-7">
          <div className="lg:w-[60%]">
            <ChartLingkaran
              title="Statistik Kehadiran"
              subtitle={dataGrafik?.statistik_kehadiran?.rentang_tanggal}
              data={statistikKehadiranData}
              dataKey="value"
              nameKey="name"
              config={kehadiranChartConfig}
              valueLabel="Total Hari"
            />
            {/* Detail kehadiran dari API
            {dataGrafik?.statistik_kehadiran?.detail && (
              <div className="grid grid-cols-4 gap-2 mt-2 text-center text-xs">
                {Object.entries(dataGrafik.statistik_kehadiran.detail).map(([key, val]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-2">
                    <p className="font-semibold text-gray-700 capitalize">{key}</p>
                    <p className="text-lg font-bold text-[#106D63]">{val as number}</p>
                  </div>
                ))}
              </div>
            )} */}
          </div>

          {/* === BAGIAN GAJI (TELAH DIPERBARUI) === */}
          <Link
            to={"/penggajian/" + slipGajiData?.id}
            className="w-full max-w-sm flex flex-col gap-4 cursor-pointer"
          >
            {isGajiLoading ? (
              <>
                <Skeleton className="h-[76px] w-full rounded-xl" />
                <Skeleton className="h-[178px] w-full rounded-xl" />
              </>
            ) : (
              <>
                {/* Kartu Gaji */}
                <div className="h-full bg-gradient-to-r from-teal-600 to-green-600 rounded-xl text-white p-4 hover:brightness-110 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm ">
                        {slipGajiData ? `Bulan ${getNamaBulan(slipGajiData.periode_bulan)} ${slipGajiData.periode_tahun}` : "Gaji Bulan Ini"}
                      </p>
                      <p className="text-2xl font-bold">
                        {formatRupiah(slipGajiData?.gaji_bersih)}
                      </p>
                    </div>
                    <BsArrowUpRightCircle size={24} />
                  </div>
                </div>

                {/* Detail Gaji */}
                <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold mb-2">
                    Detail Penggajian
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Pendapatan</span>
                      <span>
                        {formatRupiah(Number(slipGajiData?.total_tunjangan_tetap || 0) + Number(slipGajiData?.total_tunjangan_variabel || 0))}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Total Potongan</span>
                      <span>
                        - {formatRupiah(slipGajiData?.total_potongan)}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-base pt-2">
                      <span>Gaji Bersih</span>
                      <span>{formatRupiah(slipGajiData?.gaji_bersih)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Link>
          {/* === END BAGIAN GAJI === */}
        </div>
        <div className="w-auto">
          <h1 className="text-xl font-bold">Evaluasi Kerja</h1>
          <div className="flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-xl py-10 mt-3">
            <p className="text-sm text-gray-400 italic">🚧 Sedang dalam fase pengembangan</p>
          </div>
        </div>
      </div>

      <div className="lg:w-[40%]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row w-full gap-5 md:gap-2">
            {isStatusLoading ? (
              <Skeleton className="h-10 flex-1" />
            ) : !statusAbsen?.sudah_absen_masuk ? (
              <Button
                onClick={() => handleBukaModal("masuk")}
                className="flex-1 bg-[#106D63] hover:bg-[#0c524a] text-white"
              >
                <HiOutlineClipboardDocumentList className="mr-2 text-lg" />{" "}
                Absen Masuk
              </Button>
            ) : statusAbsen?.sudah_absen_masuk &&
              !statusAbsen?.sudah_absen_keluar ? (
              <Button
                onClick={() => handleBukaModal("keluar")}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <FaAddressCard className="mr-2 text-lg" /> Absen Keluar
              </Button>
            ) : (
              <Button disabled className="flex-1">
                Absensi Selesai
              </Button>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <FaAddressCard className="mr-2 text-lg" /> Riwayat Absen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center text-lg">
                    Riwayat Kehadiran
                  </DialogTitle>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Tanggal</TableHead>
                        <TableHead className="text-center">Jam Masuk</TableHead>
                        <TableHead className="text-center">
                          Jam Keluar
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isHistoryLoading
                        ? [...Array(3)].map((_, i) => (
                          <TableRow key={i}>
                            <TableCell colSpan={3}>
                              <Skeleton className="h-8 w-full" />
                            </TableCell>
                          </TableRow>
                        ))
                        : historyAbsen?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="text-center">
                              {format(parseISO(item.tgl_absensi), "dd-MM-yyyy")}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.jam_masuk?.substring(0, 5)}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.jam_keluar?.substring(0, 5)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <h1 className="text-xl font-semibold mb-2">Informasi dan Status</h1>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm font-medium border-b pb-2">
                <span>Hari</span>
                <span>Tanggal</span>
                <span>Status</span>
              </div>

              {detailAbsen ? (
                <div className="grid grid-cols-3 gap-4 text-sm pt-3">
                  <span className="text-gray-700">
                    {format(parseISO(detailAbsen.tgl_absensi), "EEEE", { locale: id })}
                  </span>
                  <span className="text-gray-700">
                    {format(parseISO(detailAbsen.tgl_absensi), "dd/MM/yyyy")}
                  </span>
                  <span>
                    {detailAbsen.is_terlambat ? (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                        Terlambat
                      </span>
                    ) : (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                        {detailAbsen.jenis_kehadiran?.nama ?? "Hadir"}
                      </span>
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 border-t-2 pt-4">
                  <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full" />
                  <p className="text-center text-xs py-2 text-gray-500">
                    Belum ada data absensi hari ini
                  </p>
                </div>
              )}

              {detailAbsen && (
                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>
                    <span className="font-medium">Jam Masuk: </span>
                    {detailAbsen.jam_masuk?.substring(0, 5) ?? "-"}
                  </div>
                  <div>
                    <span className="font-medium">Jam Keluar: </span>
                    {detailAbsen.jam_keluar?.substring(0, 5) ?? "-"}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Lokasi: </span>
                    {detailAbsen.lokasi_absensi ?? "-"}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-semibold">Data Riwayat</h1>
              <Link
                to="/tahapan-data-riwayat"
                className="text-xs text-[#106D63] hover:underline font-medium"
              >
                Lihat Detail →
              </Link>
            </div>
            <div className="border-t-2 pt-4">
              {isTahapanLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Skeleton className="h-20 w-full rounded-xl" />
                </div>
              ) : tahapanRiwayat ? (
                <>
                  {/* Progress bar + info */}
                  <div className="flex items-center gap-4 mb-3">
                    {/* Circular progress */}
                    <div className="relative w-16 h-16 shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          strokeWidth="3.6"
                          stroke="#e5e7eb"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeWidth="3.6"
                          strokeDasharray={`${tahapanRiwayat.persentase}, 100`}
                          stroke={tahapanRiwayat.is_lengkap ? "#32A14C" : "#106D63"}
                          fill="none"
                          strokeLinecap="round"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
                        {tahapanRiwayat.persentase}%
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-700">
                        {tahapanRiwayat.total_terisi} / {tahapanRiwayat.total_kategori} kategori terisi
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {tahapanRiwayat.pesan}
                      </p>
                    </div>
                  </div>
                  {/* Detail items */}
                  <div className="space-y-1 mt-2">
                    {tahapanRiwayat.detail.slice(0, 4).map((item) => (
                      <div key={item.key} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600 truncate max-w-[70%]">{item.label}</span>
                        <span className={`flex items-center gap-1 font-medium ${item.sudah_diisi ? "text-green-600" : "text-red-500"}`}>
                          {item.sudah_diisi ? (
                            <FiCheckCircle className="w-3.5 h-3.5" />
                          ) : (
                            <FiXCircle className="w-3.5 h-3.5" />
                          )}
                          {item.sudah_diisi ? `${item.jumlah_record} data` : "Belum diisi"}
                        </span>
                      </div>
                    ))}
                    {tahapanRiwayat.detail.length > 4 && (
                      <p className="text-xs text-center text-gray-400 pt-1">
                        +{tahapanRiwayat.detail.length - 4} lainnya —{" "}
                        <Link to="/tahapan-data-riwayat" className="text-[#106D63] hover:underline">
                          lihat semua
                        </Link>
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center gap-2 py-4">
                  <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full" />
                  <p className="text-center text-xs text-gray-500">
                    Data kelengkapan riwayat belum tersedia
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <h1 className="text-xl font-semibold mb-2">
              Berita &amp; Pemberitahuan
            </h1>
            <div className="border-t-2">
              {/* TODO: Hubungkan ke endpoint BE /dosen-dashboard saat sudah tersedia field berita_dan_pemberitahuan */}
              <div className="flex items-center justify-center gap-2 py-4">
                <p className="text-center text-xs text-gray-400">
                  Belum ada berita atau pemberitahuan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AbsensiModal
        onAbsenSuccess={handleAbsenSuccess}
        absenType={absenType}
        open={isAbsenModalOpen}
        onOpenChange={setIsAbsenModalOpen}
      />
    </div>
  );
};

export default DasboardUser;
