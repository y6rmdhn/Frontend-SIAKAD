import Title from "@/components/blocks/Title"
import CustomCard from "@/components/blocks/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";

const DetailDataPenelitian = () => {

    return (
        <div className="mt-10 mb-20">
            <Title title="Penelitian" subTitle="Detail Penelitian" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <Link
                                className="w-full md:w-auto"
                                to="/data-riwayat/pelaksanaan-penelitian/penelitian"
                            >
                                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-hover-blue-200">
                                    <IoIosArrowBack /> Kembali ke Daftar
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-black rounded-lg p-4">
                            {/* KIRI */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Perguruan Tinggi Afiliasi</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Kelompok Bidang</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Jenis SKIM</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">Ipteks</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Judul Penelitian</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Lokasi Kegiatan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">[Nullable]</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Tahun Usulan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">2024</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Tahun Kegiatan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">2025</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Tahun Pelaksanaan Ke</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Tanggal Mulai</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Tanggal Selesai</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Lingkup Penelitian</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">Lokal</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Sesuai Roadmap</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">Sesuai</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Nomor SK Penugasan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">Tanggal SK Penugasan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Status Pengajuan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">Disetujui</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Tanggal Diajukan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">29 Mei 2025</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Tanggal Disetujui</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">29 Mei 2025</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Dibuat Oleh</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">Azka Fadillah Rahman</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
};

export default DetailDataPenelitian;