import Title from "@/components/blocks/Title"
import CustomCard from "@/components/blocks/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";

const DetailDataOrangtua = () => {
    return (
        <div className="mt-10 mb-20">
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <Title title="Data Orang Tua" subTitle="Detail Orang Tua" />
                <Link
                    className="w-full md:w-auto"
                    to="/data-riwayat/keluarga/orangtua"
                >
                    <Button className="bg-[#00C0EF] w-full md:w-auto hover:bg-hover-blue-200">
                        <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                </Link>
            </div>

            <CustomCard
                actions={
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-3 rounded-lg p-4">
                        {/* KIRI */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm">Nama</Label>
                                <Label className="text-xs sm:text-sm">Azka Fadilah Rahman</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm">Jenis Orang Tua</Label>
                                <Label className="text-xs sm:text-sm">Ayah</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm">Tempat Lahir</Label>
                                <Label className="text-xs sm:text-sm">Bogor</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm">Tgl Lahir</Label>
                                <Label className="text-xs sm:text-sm">08 Februari 2004</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm">Telepon</Label>
                                <Label className="italic text-gray-400 text-xs sm:text-sm">[Nullable]</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm">Alamat</Label>
                                <Label className="italic text-gray-400 text-xs sm:text-sm">[Nullable]</Label>
                            </div>
                        </div>

                        {/* KANAN */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-medium text-xs sm:text-sm">Status Pengajuan</Label>
                                <Label className="text-xs sm:text-sm">Disetujui</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-medium text-xs sm:text-sm">Tanggal Diajukan</Label>
                                <Label className="text-xs sm:text-sm">29 Mei 2025</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-medium text-xs sm:text-sm">Tanggal Disetujui</Label>
                                <Label className="text-xs sm:text-sm">29 Mei 2025</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-medium text-xs sm:text-sm">Dibuat Oleh</Label>
                                <Label className="text-xs sm:text-sm">Azka Fadilah Rahman</Label>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
};

export default DetailDataOrangtua;