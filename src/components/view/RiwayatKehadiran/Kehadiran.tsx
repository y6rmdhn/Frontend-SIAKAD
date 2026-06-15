import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";

// --- START DEFINISI TIPE ---
interface HistoryAbsenItem {
    id: string;
    tgl_absensi: string;
    jam_masuk: string | null;
    jam_keluar: string | null;
    is_terlambat: boolean;
    is_pulang_awal: boolean;
    lokasi_absensi: string | null;
    jenis_kehadiran?: { nama: string };
    keterangan?: string;
}
// --- END DEFINISI TIPE ---

const Kehadiran = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    
    // Inisialisasi tgl_mulai dan tgl_selesai, default ke bulan ini atau kosong.
    const [tglMulai, setTglMulai] = useState<string>(searchParam.get('tgl_mulai') || "");
    const [tglSelesai, setTglSelesai] = useState<string>(searchParam.get('tgl_selesai') || "");

    useEffect(() => {
        const newParams = new URLSearchParams(searchParam);
        if (tglMulai) newParams.set("tgl_mulai", tglMulai);
        else newParams.delete("tgl_mulai");
        
        if (tglSelesai) newParams.set("tgl_selesai", tglSelesai);
        else newParams.delete("tgl_selesai");

        setSearchParam(newParams);
    }, [tglMulai, tglSelesai, setSearchParam]);

    // get data riwayat harian
    const { data: riwayatData, isLoading: isRiwayatLoading } = useQuery({
        queryKey: ["riwayat-kehadiran-dosen", tglMulai, tglSelesai],
        queryFn: async () => {
            const params: any = {};
            if (tglMulai) params.tgl_mulai = tglMulai;
            if (tglSelesai) params.tgl_selesai = tglSelesai;
            
            const response = await dosenServices.getHistoryAbsensi(params);
            return response.data;
        },
    });

    return (
        <div className="mt-10 mb-20">
            <Title title="Riwayat" subTitle="Presensi Pegawai" />

            <CustomCard
                actions={
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex items-center gap-3">
                            <Label className="text-[#FDA31A] font-semibold">Dari</Label>
                            <input
                                type="date"
                                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-[#002E5A]"
                                value={tglMulai}
                                onChange={(e) => setTglMulai(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Label className="text-[#FDA31A] font-semibold">Sampai</Label>
                            <input
                                type="date"
                                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-[#002E5A]"
                                value={tglSelesai}
                                onChange={(e) => setTglSelesai(e.target.value)}
                            />
                        </div>
                    </div>
                }
            >
                <div className="overflow-x-auto">
                    <Table className="mt-4 table-auto text-xs lg:text-sm">
                        <TableHeader>
                            <TableRow className="bg-[#002E5A] hover:bg-[#002E5A]">
                                <TableHead className="text-center text-white w-16">No</TableHead>
                                <TableHead className="text-center text-white">Tanggal</TableHead>
                                <TableHead className="text-center text-white">Jam Datang</TableHead>
                                <TableHead className="text-center text-white">Jam Pulang</TableHead>
                                <TableHead className="text-center text-white">Lokasi Presensi</TableHead>
                                <TableHead className="text-center text-white">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-200">
                            {isRiwayatLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={6}><Skeleton className="h-8 w-full" /></TableCell>
                                    </TableRow>
                                ))
                            ) : riwayatData?.data && riwayatData.data.length > 0 ? (
                                riwayatData.data.map((item: HistoryAbsenItem, index: number) => (
                                    <TableRow key={item.id} className="even:bg-gray-100">
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="text-center font-medium">
                                            {format(parseISO(item.tgl_absensi), "dd-MM-yyyy")}
                                        </TableCell>
                                        <TableCell className="text-center text-gray-600">
                                            {item.jam_masuk?.substring(0, 5) || "-"}
                                        </TableCell>
                                        <TableCell className="text-center text-gray-600">
                                            {item.jam_keluar?.substring(0, 5) || "-"}
                                        </TableCell>
                                        <TableCell className="text-center text-gray-600">
                                            {item.lokasi_absensi || "-"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.is_terlambat ? (
                                                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                                                    Terlambat
                                                </span>
                                            ) : (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                    {item.jenis_kehadiran?.nama || "Hadir"}
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                                        Data presensi tidak ditemukan pada periode tersebut.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CustomCard>
        </div>
    );
};

export default Kehadiran;
