import Title from "@/components/blocks/Title"
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/blocks/SearchInput";

const DetailDataDokumenInternal = () => {

    return (
        <div className="mt-10 mb-20">
            <Title title="Dokumen Internal" subTitle="Detail Dokumen Internal" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
                            <div>
                                <SearchInput />
                            </div>
                            <div className="w-full flex flex-col lg:flex-row justify-end gap-2">
                                <div>
                                    <Link
                                        className="w-full xl:w-auto"
                                        to="/admin/operasional/kompensasi/dokumen-internal"
                                    >
                                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                            <IoIosArrowBack /> Kembali ke Daftar
                                        </Button>
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        className="w-full xl:w-auto"
                                        to="/admin/operasional/kompensasi/detail-dokumen-internal"
                                    >
                                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                            <FaPlus /> Tambah Baru
                                        </Button>
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        className="w-full xl:w-auto"
                                        to="/admin/operasional/kompensasi/edit-data-dokumen-internal"
                                    >
                                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                            <MdEdit className="bg-black rounded-full" /> Edit
                                        </Button>
                                    </Link>
                                </div>
                                <div>
                                    <Button className="bg-[#F56954] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                        <FaRegTrashAlt /> Hapus
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                            {/* KIRI */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">No Dokumen</Label>
                                    <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">Nama Dokumen</Label>
                                    <Label className="text-xs sm:text-sm  flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">Uraian Singkat</Label>
                                    <Label className="text-xs sm:text-sm flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">URL Dokumen</Label>
                                    <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">Tgl Dokumen</Label>
                                    <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">Jenis Dokumen</Label>
                                    <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">Menu Referensi</Label>
                                    <Label className="text-xs sm:text-sm  flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">File</Label>
                                    <Label className="text-xs sm:text-sm flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">Status Dokumen</Label>
                                    <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">Tingkat</Label>
                                    <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">Nama Pejabat Penetap</Label>
                                    <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                                </div>
                                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">Nama Validator</Label>
                                    <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
};

export default DetailDataDokumenInternal;