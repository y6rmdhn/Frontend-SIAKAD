import Title from "@/components/blocks/Title"
import CustomCard from "@/components/blocks/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";

const DetailOrangtuaValidasi = () => {

    return (
        <div className="mt-10 mb-20">
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <Title title="Data Orang Tua" subTitle="Detail Orang Tua" />
                <Link
                    className="w-full md:w-auto"
                    to="/admin/validasi-data/keluarga"
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
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">Nama</Label>
                                <Label className="text-xs sm:text-sm"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">Jenis Orang Tua</Label>
                                <Label className="text-xs sm:text-sm"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">Tempat Lahir</Label>
                                <Label className="text-xs sm:text-sm"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">Tgl Lahir</Label>
                                <Label className="text-xs sm:text-sm">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">Telepon</Label>
                                <Label className="text-xs sm:text-sm"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">Alamat</Label>
                                <Label className="text-xs sm:text-sm"></Label>
                            </div>
                        </div>

                        {/* KANAN */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-38">Status Pengajuan</Label>
                                <Label className="text-xs sm:text-sm"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-38">Tanggal Diajukan</Label>
                                <Label className="text-xs sm:text-sm">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-38">Tanggal Disetujui</Label>
                                <Label className="text-xs sm:text-sm">
                                   
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-38">Dibuat Oleh</Label>
                                <Label className="text-xs sm:text-sm"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-38">
                                    File Pendukung
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    
                                </Label>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
};

export default DetailOrangtuaValidasi;