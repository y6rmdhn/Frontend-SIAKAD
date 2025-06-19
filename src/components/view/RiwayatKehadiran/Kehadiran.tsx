import CustomCard from "@/components/blocks/Card";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {IoDocumentTextOutline, IoEyeOutline} from "react-icons/io5";
import {useQuery} from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {FiAlertCircle} from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";

// --- START DEFINISI TIPE ---

// Tipe untuk item data kehadiran bulanan
interface KehadiranItem {
    bulan: string;
    bulan_number: number;
    hari_kerja: number;
    hadir: number;
    hadir_libur: number;
    terlambat: number;
    pulang_awal: number;
    sakit: number;
    izin: number;
    alpa: number;
    cuti: number;
}

// Tipe untuk data detail kehadiran harian
interface DetailKehadiranItem {
    no: number;
    hari_tanggal: string;
    datang: string | null;
    pulang: string | null;
    lokasi_datang: string | null;
    lokasi_pulang: string | null;
    jenis_presensi: string;
    keterangan: string | null;
}

// Tipe untuk opsi tahun
interface YearOption {
    label: string;
    value: string;
}

// --- END DEFINISI TIPE ---


const Kehadiran = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [selectedBulan, setSelectedBulan] = useState<number | undefined>(undefined);
    const selectedTahun = searchParam.get('tahun') || new Date().getFullYear().toString();

    // get data riwayat bulanan
    const {data: riwayatData, isLoading: isRiwayatLoading} = useQuery({
        queryKey: ["riwayat-kehadiran-dosen", selectedTahun],
        queryFn: async () => {
            const response = await dosenServices.getDataRiwayatKehadiran(selectedTahun);
            return response.data;
        },
    });

    // get data detail harian
    const {data: detailDataRiwayatKehadiran, isLoading: isDetailLoading} = useQuery({
        queryKey: ["riwayat-kehadiran-dosen-detail", selectedTahun, selectedBulan],
        queryFn: async () => {
            if (!selectedBulan) return null; // Jangan fetch jika bulan tidak dipilih
            const response = await dosenServices.getDataDetailRiwayatKehadiran(selectedTahun, selectedBulan);
            return response.data;
        },
        enabled: !!selectedBulan, // Query hanya aktif jika selectedBulan ada nilainya
    });

    const generateYearOptions = (): YearOption[] => {
        const currentYear = new Date().getFullYear();
        const years: YearOption[] = [];
        for (let i = 0; i < 5; i++) {
            const year = currentYear - i;
            years.push({label: year.toString(), value: year.toString()});
        }
        return years;
    };

    const handleTahunChange = (tahun: string) => {
        searchParam.set("tahun", tahun);
        setSearchParam(searchParam);
    };

    const getJumlahHariDalamBulan = (namaBulan: string, tahun: string): number => {
        const daftarBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const bulanIndex = daftarBulan.indexOf(namaBulan);
        if (bulanIndex === -1) return 0;
        return new Date(parseInt(tahun), bulanIndex + 1, 0).getDate();
    };

    useEffect(() => {
        if (!searchParam.get('tahun')) {
            searchParam.set("tahun", selectedTahun)
            setSearchParam(searchParam)
        }
    }, [searchParam, setSearchParam, selectedTahun]);

    return (
        <div className="mt-10 mb-20">
            <Title title="Riwayat" subTitle="Presensi Pegawai"/>

            <CustomCard
                actions={
                    <div className=" ">
                        <div className="flex flex-col md:flex-row gap-4">
                            <Label className=" text-[#FDA31A] md:pr-30">Tahun</Label>
                            <SelectFilter
                                placeholder="Pilih Tahun"
                                classname="md:w-60"
                                options={generateYearOptions()}
                                value={selectedTahun}
                                onValueChange={handleTahunChange}
                            />
                        </div>
                    </div>
                }
            >
                <Table className="mt-10 table-auto text-xs lg:text-sm">
                    <TableHeader>
                        <TableRow className="bg-[#002E5A] hover:bg-[#002E5A]">
                            <TableHead className="text-center text-white">Bulan</TableHead>
                            <TableHead className="text-center text-white">Hari Kerja</TableHead>
                            <TableHead className="text-center text-white">Hadir</TableHead>
                            <TableHead className="text-center text-white">Hari Libur</TableHead>
                            <TableHead className="text-center text-white">Terlambat</TableHead>
                            <TableHead className="text-center text-white">Pulang Awal</TableHead>
                            <TableHead className="text-center text-white">Sakit</TableHead>
                            <TableHead className="text-center text-white">Izin</TableHead>
                            <TableHead className="text-center text-white">Alpha</TableHead>
                            <TableHead className="text-center text-white">Cuti</TableHead>
                            <TableHead className="text-center text-white">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200">
                        {isRiwayatLoading ? (
                            [...Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell colSpan={11}><Skeleton className="h-8 w-full" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            riwayatData?.data.map((item: KehadiranItem, index: number) => (
                                <TableRow key={index} className=" even:bg-gray-100 ">
                                    <TableCell className="text-center">{item.bulan}</TableCell>
                                    <TableCell className="text-center">{item.hari_kerja}</TableCell>
                                    <TableCell className="text-center">{item.hadir}</TableCell>
                                    <TableCell className="text-center">{item.hadir_libur}</TableCell>
                                    <TableCell className="text-center">{item.terlambat}</TableCell>
                                    <TableCell className="text-center">{item.pulang_awal}</TableCell>
                                    <TableCell className="text-center">{item.sakit}</TableCell>
                                    <TableCell className="text-center">{item.izin}</TableCell>
                                    <TableCell className="text-center">{item.alpa}</TableCell>
                                    <TableCell className="text-center">{item.cuti}</TableCell>
                                    <TableCell className="text-center">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="cursor-pointer"
                                                    onClick={() => setSelectedBulan(item.bulan_number)}
                                                >
                                                    <IoEyeOutline className="w-5 h-5 text-[#26A1F4]"/>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="max-w-4xl">
                                                <div className="w-full">
                                                    <div className="flex gap-4 items-center mb-4">
                                                        <FiAlertCircle/>
                                                        <span>Detail Presensi</span>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <h1>Daftar Presensi</h1>
                                                        {/* FIX: item.bulan sekarang pasti string */}
                                                        <p>Periode 01 s.d. {getJumlahHariDalamBulan(item.bulan, selectedTahun)} {item.bulan} {selectedTahun}</p>
                                                    </div>
                                                </div>
                                                <div className="relative max-h-[300px] overflow-y-auto border rounded-lg">
                                                    <Table className="table-auto">
                                                        <TableHeader className="sticky top-0 bg-background z-10">
                                                            <TableRow className="bg-[#002E5A] hover:bg-[#002E5A]">
                                                                <TableHead className="text-center text-white">No</TableHead>
                                                                <TableHead className="text-center text-white">Hari dan Tanggal</TableHead>
                                                                <TableHead className="text-center text-white">Datang</TableHead>
                                                                <TableHead className="text-center text-white">Pulang</TableHead>
                                                                <TableHead className="text-center text-white">Lokasi Datang</TableHead>
                                                                <TableHead className="text-center text-white">Lokasi Pulang</TableHead>
                                                                <TableHead className="text-center text-white">Jenis Presensi</TableHead>
                                                                <TableHead className="text-center text-white">Keterangan</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody className="divide-y divide-gray-200">
                                                            {isDetailLoading ? (
                                                                <TableRow>
                                                                    <TableCell colSpan={8} className="text-center">Memuat detail...</TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                detailDataRiwayatKehadiran?.data.map((detailItem: DetailKehadiranItem, detailIndex: number) => (
                                                                    <TableRow key={detailIndex} className=" even:bg-gray-100">
                                                                        <TableCell className="text-center">{detailItem.no}</TableCell>
                                                                        <TableCell className="text-center">{detailItem.hari_tanggal}</TableCell>
                                                                        <TableCell className="text-center">{detailItem.datang}</TableCell>
                                                                        <TableCell className="text-center">{detailItem.pulang}</TableCell>
                                                                        <TableCell className="text-center">{detailItem.lokasi_datang}</TableCell>
                                                                        <TableCell className="text-center">{detailItem.lokasi_pulang}</TableCell>
                                                                        <TableCell className="text-center">{detailItem.jenis_presensi}</TableCell>
                                                                        <TableCell className="text-center">{detailItem.keterangan}</TableCell>
                                                                    </TableRow>
                                                                ))
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Tutup</AlertDialogCancel>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <Button size="icon" variant="ghost" className="cursor-pointer">
                                            <IoDocumentTextOutline className="w-5 h-5 text-[#26A1F4]"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CustomCard>
        </div>
    );
};

export default Kehadiran;
