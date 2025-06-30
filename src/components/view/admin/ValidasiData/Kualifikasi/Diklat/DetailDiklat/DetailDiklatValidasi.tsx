import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";

const DetailDiklatValidasi = () => {

    return (
        <div className="mt-10 mb-20">
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <Title title="Diklat" subTitle="Detail Diklat" />
                <Link className="w-full md:w-auto" to="/admin/validasi-data/kualifikasi/diklat">
                    <Button className="bg-[#00C0EF] w-full md:w-auto hover:bg-hover-blue-200">
                        <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                </Link>
            </div>

            <CustomCard
                actions={
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-black rounded-lg p-4">
                        {/* KIRI */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Nama Diklat
                                </Label>
                                <Label className="text-xs sm:text-sm text-right"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Jenis Diklat
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Kategori Diklat
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tingkat Diklat
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Penyelenggara
                                </Label>
                                <Label className="text-xs sm:text-sm text-right"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tempat
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Peran
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Keterangan
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                        </div>

                        {/* KANAN */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                    Jumlah Jam
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                    Tanggal Sertifikasi
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tanggal Mulai
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tanggal Selesai
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    SK Penugasan
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                    Status Pengajuan
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tanggal Diajukan
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                   
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tanggal Disetujui
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                   
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                    Dibuat Oleh
                                </Label>
                                <Label className="text-xs sm:text-sm text-right">
                                    
                                </Label>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default DetailDiklatValidasi;
