import { HiUserGroup } from "react-icons/hi2";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaMoneyBills } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaAddressCard } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { ChartLingkaran } from "@/components/commons/Charts/PieChart/ChartLingkaran";
import { ChartPegawai } from "@/components/commons/Charts/ChartPegawai/ChartPegawai";
import { Button } from "@/components/ui/button";
import { Key, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton.tsx"; // Impor untuk loading

const pieData = [
    { browser: "akademik", visitors: 275, fill: "#92F1A8" },
    { browser: "non akademik", visitors: 200, fill: "#32A14C" },
];

const pieConfig = {
    visitors: { label: "Visitors" },
    chrome: { label: "Chrome", color: "#4285F4" },
};

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

const DasboardUser = () => {
    const [clkBtn, setClkBtn] = useState<string | null>(null);
    const [_, setDetail] = useState<string | null>(null);
    const userSelector = useSelector((state: RootState) => state.user);
    const [isAbsenModalOpen, setIsAbsenModalOpen] = useState(false);
    // FIX: Mengubah tipe state agar sesuai dengan props AbsensiModal
    const [absenType, setAbsenType] = useState<"masuk" | "keluar">("masuk");
    const queryClient = useQueryClient();

    // get data status adbsen
    const { data: statusAbsen, isLoading: isStatusLoading } = useQuery<StatusAbsen>({
        queryKey: ["status-absen"],
        queryFn: async () => {
            const response = await dosenServices.getStatusAbsen();
            return response.data.data;
        },
    });

    // get data history absensi
    const { data: historyAbsen, isLoading: isHistoryLoading } = useQuery<HistoryAbsenItem[]>({
        queryKey: ["history-absen"],
        queryFn: async () => {
            const response = await dosenServices.getHistoryAbsensi();
            return response.data.data;
        },
    });

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
                            title="Kehadiran"
                            data={pieData}
                            dataKey="visitors"
                            nameKey="browser"
                            config={pieConfig}
                            valueLabel="Visitors"
                        />
                    </div>
                    <div className="bg-gradient-to-b lg:w-[40%] from-[#00AF9C] to-[#106D63] h-45 rounded-md text-white p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-medium max-[1193px]:text-lg">
                                Gaji
                            </h1>
                            <BsArrowUpRightCircle className="w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <FaMoneyBills className="w-14 h-14" />
                            <div className="text-center">
                                <p className="text-lg max-[1193px]:text-base">
                                    Total Gaji per bulan
                                </p>
                                <p className="text-2xl font-bold mt-1 max-[1193px]:text-base">
                                    Rp 2.000.000
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-auto">
                    <h1 className="text-xl font-bold">Evaluasi Kerja</h1>
                    <ChartPegawai />
                </div>
            </div>

            <div>
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
                                            {isHistoryLoading ? (
                                                [...Array(3)].map((_, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell colSpan={3}><Skeleton className="h-8 w-full"/></TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                historyAbsen?.map((item) => (
                                                    <TableRow key={item.id} className=" even:bg-gray-100">
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
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="drop-shadow-md bg-white p-4 rounded-lg">
                        <h1 className="text-xl font-bold mb-2">Informasi dan Status</h1>
                        <div className=" p-4">
                            <div className="grid grid-cols-3 gap-4 mb-3 text-sm font-medium">
                                <span>Hari</span>
                                <span>Tanggal</span>
                                <span>Status</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 border-t-2">
                                <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full" />
                                <p className="text-center py-4 text-gray-500">
                                    Hari ini anda belum tercatat hadir
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="drop-shadow-md bg-white p-4 rounded-lg">
                        <h1 className="text-xl font-bold mb-2">Data Riwayat</h1>
                        <div className="flex items-center justify-center text-center border-t-2 gap-2">
                            <div className=" gap-1">
                                <p className="text-gray-500 mb-2">
                                    Anda Belum Melakukan Pengisian Data Riwayat
                                </p>
                                <p className="text-gray-300 mb-2 text-xs">
                                    Segera mengisi data riwayat anda
                                </p>
                            </div>
                            <Link to="/tahapan-data-riwayat">
                                <Button
                                    onClick={() => setDetail("absen")}
                                    className="bg-[#106D63] cursor-pointer"
                                >
                                    Lihat Detail
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="drop-shadow-md bg-white p-4 rounded-lg">
                        <h1 className="text-xl font-bold mb-2 ">Pemberitahuan</h1>
                        <div className="flex items-center justify-center gap-2 border-t-2">
                            <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full" />
                            <p className="text-center py-4 text-gray-500">
                                Tidak ada pemberitahuan
                            </p>
                        </div>
                    </div>

                    <div className="drop-shadow-md bg-white p-4 rounded-lg">
                        <h1 className="text-xl font-bold mb-2">Berita</h1>
                        <div className="flex items-center justify-center gap-2 border-t-2">
                            <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full " />
                            <p className="text-center py-4 text-gray-500">Tidak ada berita</p>
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
