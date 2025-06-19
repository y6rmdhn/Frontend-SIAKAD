import Title from "@/components/blocks/Title"
import CustomCard from "@/components/blocks/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";

const DetailDataPembicara = () => {

    return (
        <div className="mt-10 mb-20">
            <Title title="Pembicara" subTitle="Detail Pembicara" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <Link
                                className="w-full md:w-auto"
                                to="/data-riwayat/pelaksanaan-pengabdian/pembicara"
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
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Judul Makalah</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Kategori Pembicara</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">Pembicara Kunci</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Nama Pertemuan Ilmiah</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Tingkat Pertemuan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">Lokal</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Penyelenggara</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Tanggal Pelaksanaan </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">[Nullable]</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Kategori Capaian Luar</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Bahasa</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">SK Penugasan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Litabmas</Label>
                                    <Label className="text-xs sm:text-sm font-semibold"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Kategori Kegiatan</Label>
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

export default DetailDataPembicara;