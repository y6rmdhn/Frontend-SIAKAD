import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const DetailPangkat = () => {

    return (
        <div className="mt-10 mb-20">
            <Title title="Data Pangkat" subTitle="Detail Pangkat" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <Link
                                className="w-full md:w-auto"
                                to="/admin/validasi-data/kepegawaian/pangkat"
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
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Jenis SK
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Jenis Kenaikan Pangkat
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Nama Pangkat
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        TMT. Pangkat
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        No. SK
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Tanggal SK
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Pejabat Penetap
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                       
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Masa Kerja (Tahun)
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        Tahun
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Masa Kerja (Bulan)
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        Bulan
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Acuan Masa Kerja
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                            <FaCheck className="text-green-500 w-4 h-4" />
                                            <IoClose className="text-red-500 w-4 h-4" />
                                    </Label>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Status Pengajuan
                                    </Label>
                                    <Label className="text-xs sm:text-sm">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Tanggal Diajukan
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Tanggal Disetujui
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Dibuat Oleh
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        File Pendukung
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default DetailPangkat;
