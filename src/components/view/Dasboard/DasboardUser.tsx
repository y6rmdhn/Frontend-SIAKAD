import { HiUserGroup } from "react-icons/hi2";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaAddressCard } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { ChartLingkaran } from "@/components/commons/Charts/PieChart/ChartLingkaran";
import { ChartPegawai } from "@/components/commons/Charts/ChartPegawai/ChartPegawai";
import { Button } from "@/components/ui/button";
import { Key, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { AbsensiModal } from "@/components/blocks/AbsensiModal/AbsensiModal.tsx";
import dosenServices from "@/services/dosen.services.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { parseISO, format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { type ChartConfig } from "@/components/ui/chart";

// Tipe data untuk status absen
interface StatusAbsen {
  sudah_absen_masuk: boolean;
  sudah_absen_keluar: boolean;
}

// Tipe data untuk riwayat absen
interface HistoryAbsenItem {
  id: Key;
  tanggal: string;
  jam_masuk: string;
  jam_keluar: string;
}

export const kehadiranChartConfig = {
  Hadir: {
    label: "Hadir",
    color: "hsl(var(--chart-2))",
  },
  "Tidak Hadir (Izin, Sakit, Cuti, Alpa)": {
    label: "Tidak Hadir",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const DasboardUser = () => {
  const [clkBtn, setClkBtn] = useState<string | null>(null);
  const [_, setDetail] = useState<string | null>(null);
  const userSelector = useSelector((state: RootState) => state.user);
  const [isAbsenModalOpen, setIsAbsenModalOpen] = useState(false);
  const [absenType, setAbsenType] = useState<"masuk" | "keluar">("masuk");
  const queryClient = useQueryClient();

  // get dasboard user
  const { data } = useQuery({
    queryKey: ["dasboard-user", absenType],
    queryFn: async () => {
      const response = await dosenServices.getDasboardUser();
      return response.data;
    },
  });

  // get dasboard user
  const { data: dataGrafik, isLoading: isGrafikLoading } = useQuery({
    queryKey: ["dasboard-user-grafik", absenType],
    queryFn: async () => {
      const response = await dosenServices.getDasboardGrafik();
      return response.data;
    },
  });

  // get data status absen
  const { data: statusAbsen, isLoading: isStatusLoading } =
    useQuery<StatusAbsen>({
      queryKey: ["status-absen"],
      queryFn: async () => {
        const response = await dosenServices.getStatusAbsen();
        return response.data.data;
      },
    });

  // get data history absensi
  const { data: historyAbsen, isLoading: isHistoryLoading } = useQuery<
    HistoryAbsenItem[]
  >({
    queryKey: ["history-absen", absenType],
    queryFn: async () => {
      const response = await dosenServices.getHistoryAbsensi();
      return response.data.data;
    },
  });

  const statistikKehadiranData = useMemo(() => {
    const grafik = data?.statistik_kehadiran?.grafik;
    if (!grafik) return [];
    const colors = ["#32A14C", "#FDBA74", "#FF8042", "#FFBB28"];
    return grafik.labels.map((label: string, index: number) => ({
      name: label,
      value: grafik.data[index],
      fill: colors[index % colors.length],
    }));
  }, [data]);

  const sudahMasuk = statusAbsen?.sudah_absen_masuk;
  const sudahKeluar = statusAbsen?.sudah_absen_keluar;

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
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
              subtitle={data?.statistik_kehadiran?.rentang_tanggal}
              data={statistikKehadiranData}
              dataKey="value"
              nameKey="name"
              config={kehadiranChartConfig}
              valueLabel="Total Hari"
            />
          </div>

          {/* Gaji */}
          <Link
            to="/penggajian"
            className="w-full  max-w-sm flex flex-col gap-4 cursor-pointer"
          >
            {/* Kartu Gaji */}
            <div className=" h-full bg-gradient-to-r from-teal-600 to-green-600 rounded-xl text-white p-4 hover:brightness-110 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm ">Total Gaji per bulan</p>
                  <p className="text-2xl font-bold">Rp 2.000.000</p>
                </div>
                <BsArrowUpRightCircle size={24} />
              </div>
            </div>

            {/* Detail Gaji */}
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">Detail Penggajian</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gaji Pokok</span>
                  <span>Rp 1.500.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Tunjangan</span>
                  <span>Rp 700.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Potongan</span>
                  <span>- Rp 200.000</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-base pt-2">
                  <span>Total Gaji</span>
                  <span>Rp 2.000.000</span>
                </div>
              </div>
            </div>
          </Link>
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
            ) : !sudahMasuk ? (
              <Button
                onClick={() => handleBukaModal("masuk")}
                className="flex-1 bg-[#106D63] hover:bg-[#106D63] text-white flex items-center justify-center gap-2"
              >
                <HiOutlineClipboardDocumentList className="text-lg" />
                Absen Masuk
              </Button>
            ) : sudahMasuk && !sudahKeluar ? (
              <Button
                onClick={() => handleBukaModal("keluar")}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
              >
                <FaAddressCard className="text-lg" />
                Absen Keluar
              </Button>
            ) : (
              <Button disabled className="flex-1">
                Absensi Selesai
              </Button>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setClkBtn("riwayat")}
                  className={
                    clkBtn === "riwayat"
                      ? "w-full lg:w-40 bg-[#106D63] text-white hover:bg-[#106D63] hover:text-white cursor-pointer flex items-center justify-center gap-2"
                      : "w-full lg:w-40 bg-white border-1 border-[#106D63] text-[#106D63] hover:bg-white cursor-pointer flex items-center justify-center gap-2"
                  }
                >
                  <FaAddressCard className="text-lg" />
                  Riwayat Absen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center text-sm">
                    Riwayat Hadir
                  </DialogTitle>
                  <Table className="table-auto text-xs lg:text-sm">
                    <TableHeader>
                      <TableRow className="bg-[#002E5A] ">
                        <TableHead className="text-center text-white border">
                          Tanggal
                        </TableHead>
                        <TableHead className="text-center text-white border">
                          Jam Masuk
                        </TableHead>
                        <TableHead className="text-center text-white border">
                          Jam Keluar
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200">
                      {isHistoryLoading
                        ? [...Array(3)].map((_, i) => (
                            <TableRow key={i}>
                              <TableCell colSpan={3}>
                                <Skeleton className="h-8 w-full" />
                              </TableCell>
                            </TableRow>
                          ))
                        : historyAbsen?.map((item) => (
                            <TableRow
                              key={item.id}
                              className=" even:bg-gray-100"
                            >
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
            <div className=" p-4">
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm font-medium">
                <span>Hari</span>
                <span>Tanggal</span>
                <span>Status</span>
              </div>
              <div className="flex items-center justify-center gap-2 border-t-2">
                <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full" />
                <p className="text-center text-xs py-4 text-gray-500">
                  {data?.status_hari_ini}
                </p>
              </div>
            </div>
          </div>

          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <h1 className="text-xl font-semibold mb-2">Data Riwayat</h1>
            <div className="flex items-center justify-center text-center border-t-2 gap-2">
              {!data?.persentase_riwayat.is_lengkap && (
                <div className="w-full flex gap-2 mt-4">
                  <p className="text-gray-500 text-sm">
                    {data?.persentase_riwayat.pesan}
                  </p>
                  <Link to="/tahapan-data-riwayat">
                    <Button
                      onClick={() => setDetail("absen")}
                      className="bg-[#106D63] cursor-pointer"
                    >
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
              {data?.berita_dan_pemberitahuan.map((item: any, index: any) => (
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
              ))}
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
