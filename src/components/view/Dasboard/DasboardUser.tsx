import { Key, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { parseISO, format } from "date-fns";

// UI Components
import { HiUserGroup, HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
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
import { ChartPegawai } from "@/components/commons/Charts/ChartPegawai/ChartPegawai";
import { AbsensiModal } from "@/components/blocks/AbsensiModal/AbsensiModal";
import { RootState } from "@/store/store";
import dosenServices from "@/services/dosen.services.ts";

// --- START DEFINISI TIPE DATA ---
interface StatusAbsen {
  sudah_absen_masuk: boolean;
  sudah_absen_keluar: boolean;
}

interface HistoryAbsenItem {
  id: Key;
  tanggal: string;
  jam_masuk: string;
  jam_keluar: string;
}

interface SlipGaji {
  id: number;
  periode: { nama_periode: string };
  total_pendapatan: string;
  total_potongan: string;
  gaji_bersih: string;
}
// --- END DEFINISI TIPE DATA ---

export const kehadiranChartConfig = {
  Hadir: { label: "Hadir", color: "hsl(var(--chart-2))" },
  "Tidak Hadir (Izin, Sakit, Cuti, Alpa)": {
    label: "Tidak Hadir",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const DasboardUser = () => {
  const userSelector = useSelector((state: RootState) => state.user);
  const [isAbsenModalOpen, setIsAbsenModalOpen] = useState(false);
  const [absenType, setAbsenType] = useState<"masuk" | "keluar">("masuk");
  const queryClient = useQueryClient();

  // --- START QUERIES ---
  const { data: dataDasbor } = useQuery({
    queryKey: ["dasboard-user"],
    queryFn: () => dosenServices.getDasboardUser().then((res) => res.data),
  });

  const { data: dataGrafik, isLoading: isGrafikLoading } = useQuery({
    queryKey: ["dasboard-user-grafik"],
    queryFn: () => dosenServices.getDasboardGrafik().then((res) => res.data),
  });

  const { data: statusAbsen, isLoading: isStatusLoading } =
    useQuery<StatusAbsen>({
      queryKey: ["status-absen"],
      queryFn: () =>
        dosenServices.getStatusAbsen().then((res) => res.data.data),
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
      return response.data.data[0];
    },
  });
  // --- END QUERIES ---

  const statistikKehadiranData = useMemo(() => {
    const grafik = dataDasbor?.statistik_kehadiran?.grafik;
    if (!grafik) return [];
    const colors = ["#32A14C", "#FDBA74", "#FF8042", "#FFBB28"];
    return grafik.labels.map((label: string, index: number) => ({
      name: label,
      value: grafik.data[index],
      fill: colors[index % colors.length],
    }));
  }, [dataDasbor]);

  const formatRupiah = (angka: string | number | undefined) => {
    if (angka === undefined || angka === null) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka));
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
              subtitle={dataDasbor?.statistik_kehadiran?.rentang_tanggal}
              data={statistikKehadiranData}
              dataKey="value"
              nameKey="name"
              config={kehadiranChartConfig}
              valueLabel="Total Hari"
            />
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
                        {slipGajiData?.periode.nama_periode || "Gaji Bulan Ini"}
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
                        {formatRupiah(slipGajiData?.total_pendapatan)}
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
          <ChartPegawai
            chartData={dataGrafik?.data}
            isLoading={isGrafikLoading}
          />
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
                                {format(parseISO(item.tanggal), "dd-MM-yyyy")}
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
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm font-medium">
                <span>Hari</span>
                <span>Tanggal</span>
                <span>Status</span>
              </div>
              <div className="flex items-center justify-center gap-2 border-t-2">
                <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full" />
                <p className="text-center text-xs py-4 text-gray-500">
                  {dataDasbor?.status_hari_ini}
                </p>
              </div>
            </div>
          </div>

          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <h1 className="text-xl font-semibold mb-2">Data Riwayat</h1>
            <div className="border-t-2 pt-4">
              {!dataDasbor?.persentase_riwayat.is_lengkap && (
                <div className="w-full flex gap-2 items-center">
                  <p className="text-gray-500 text-sm flex-1">
                    {dataDasbor?.persentase_riwayat.pesan}
                  </p>
                  <Link to="/tahapan-data-riwayat">
                    <Button className="bg-[#106D63] hover:bg-[#0c524a] cursor-pointer">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <h1 className="text-xl font-semibold mb-2">
              Berita & Pemberitahuan
            </h1>
            <div className="border-t-2">
              {dataDasbor?.berita_dan_pemberitahuan.map(
                (item: any, index: any) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 p-4 border-b last:border-b-0"
                  >
                    <p className="text-sm">
                      {index + 1}. {item.judul}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {item.tanggal}
                    </p>
                  </div>
                )
              )}
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
