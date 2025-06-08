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
import {IoIosDocument} from "react-icons/io";
import {IoEyeOutline} from "react-icons/io5";
import {useQuery} from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {FiAlertCircle} from "react-icons/fi";

const Kehadiran = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const [selectedBulan, setSelectedBulan] = useState<number | undefined>(undefined);
    const selectedTahun = searchParam.get('tahun') || new Date().getFullYear().toString();

    // get data
    const {data} = useQuery({
        queryKey: ["riwayat-kehadiran-dosen", selectedTahun],
        queryFn: async () => {
            const response = await dosenServices.getDataRiwayatKehadiran(selectedTahun);

            return response.data;
        },
    });

    // get data
    const {data: detailDataRiwayatKehadiran} = useQuery({
        queryKey: ["riwayat-kehadiran-dosen-detail", selectedBulan],
        queryFn: async () => {
            const response = await dosenServices.getDataDetailRiwayatKehadiran(selectedTahun, selectedBulan);

            return response.data;
        },
    });

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 5; i++) {
            const year = currentYear - i;
            years.push({label: year.toString(), value: year.toString()});
        }
        return years;
    };

    const handleTahunChange = (tahun: string) => {
        searchParam.set("tahun", tahun)

        setSearchParam(searchParam)
    };

    const getJumlahHariDalamBulan = (namaBulan: string, tahun: string): number => {
        const daftarBulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        const bulanIndex = daftarBulan.indexOf(namaBulan);

        if (bulanIndex === -1) {
            return 0;
        }

        const tanggal = new Date(parseInt(tahun), bulanIndex + 1, 0);

        return tanggal.getDate();
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
                        <TableRow className="bg-[#002E5A] ">
                            <TableHead className="text-center text-white">Bulan</TableHead>
                            <TableHead className="text-center text-white">Hari Kerja</TableHead>
                            <TableHead className="text-center text-white">
                                Hadir
                            </TableHead>
                            <TableHead className="text-center text-white">
                                Hari Libur
                            </TableHead>
                            <TableHead className="text-center text-white">
                                Terlambat
                            </TableHead>
                            <TableHead className="text-center text-white">
                                Pulang Awal
                            </TableHead>
                            <TableHead className="text-center text-white">
                                Sakit
                            </TableHead>
                            <TableHead className="text-center text-white">
                                Izin
                            </TableHead>
                            <TableHead className="text-center text-white">
                                Alpha
                            </TableHead>
                            <TableHead className="text-center text-white">
                                Cuti
                            </TableHead>
                            <TableHead className="text-center text-white">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200">
                        {data?.data.map((item) => (
                            <TableRow className=" even:bg-gray-100 ">
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
                                <TableCell className="flex justify-center items-center w-full h-full">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="cursor-pointer"
                                                onClick={() => setSelectedBulan(item.bulan_number)}
                                            >
                                                <IoEyeOutline className="w-5! h-5! text-[#26A1F4]"/>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <div className="w-full">
                                                <div className="flex gap-4 items-center">
                                                    <FiAlertCircle/>
                                                    <span>Detail Presensi</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <h1>Daftar Presensi</h1>
                                                    <p>Periode 01 s.d. {getJumlahHariDalamBulan(item.bulan, selectedTahun)} {item.bulan} {selectedTahun}</p>
                                                </div>
                                            </div>
                                            <div className="relative max-h-[300px] overflow-y-auto border rounded-lg">
                                                <Table className="table-auto">
                                                    <TableHeader>
                                                        <TableRow className="bg-[#002E5A] ">
                                                            <TableHead className="text-center text-white">No</TableHead>
                                                            <TableHead className="text-center text-white">
                                                                Hari dan Tanggal
                                                            </TableHead>
                                                            <TableHead className="text-center text-white">
                                                                Datang
                                                            </TableHead>
                                                            <TableHead className="text-center text-white">
                                                                Pulang
                                                            </TableHead>
                                                            <TableHead className="text-center text-white">
                                                                Lokasi Datang
                                                            </TableHead>
                                                            <TableHead className="text-center text-white">
                                                                Lokasi Pulang
                                                            </TableHead>
                                                            <TableHead className="text-center text-white">
                                                                Jenis Presensi
                                                            </TableHead>
                                                            <TableHead className="text-center text-white">
                                                                Keterangan
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody className="divide-y divide-gray-200">
                                                        {detailDataRiwayatKehadiran?.data.map((item) => (
                                                            <TableRow className=" even:bg-gray-100">
                                                                <TableCell className="text-center">{item.no}</TableCell>
                                                                <TableCell
                                                                    className="text-center">{item.hari_tanggal}</TableCell>
                                                                <TableCell
                                                                    className="text-center">{item.datang}</TableCell>
                                                                <TableCell
                                                                    className="text-center">{item.pulang}</TableCell>
                                                                <TableCell
                                                                    className="text-center">{item.lokasi_datang}</TableCell>
                                                                <TableCell
                                                                    className="text-center">{item.lokasi_pulang}</TableCell>
                                                                <TableCell
                                                                    className="text-center">{item.jenis_presensi}</TableCell>
                                                                <TableCell
                                                                    className="text-center">{item.keterangan}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Tutup</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Button size="icon" variant="ghost" className="cursor-pointer">
                                        <IoIosDocument className="w-5! h-5! text-[#26A1F4]"/>
                                    </Button>
                                </TableCell>
                                <TableCell className="h-full align-top text-center"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CustomCard>
        </div>
    )
        ;
};

export default Kehadiran;
