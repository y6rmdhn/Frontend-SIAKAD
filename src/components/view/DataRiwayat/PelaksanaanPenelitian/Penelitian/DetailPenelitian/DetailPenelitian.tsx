import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
const DetailPenelitian = () => {
    return (
        <div className="mt-10 mb-20">
            <Title title="Penelitian" subTitle="Detail Penelitian" />
            <CustomCard
                actions={
                    <div>
                        <div className="flex justify-end gap-2">
                            <Link to="/data-riwayat/pelaksanaan-penelitian/penelitian">
                                <Button className="bg-green-light-uika hover:bg-hover-green-uika">
                                    <IoIosArrowBack /> Kembali ke Daftar
                                </Button>
                            </Link>
                            <Link to="">
                                <Button className="bg-[#FDA31A] text-white cursor-pointer">
                                    <MdOutlineFileDownload />
                                    Simpan
                                </Button>
                            </Link>
                        </div>

                        <div className="w-full border-l-2 border-[#6AAEF1] grid grid-cols-2 gap-96 mt-10 bg-[#D6E8F9] p-4 ">
                            <div className="flex flex-col gap-2 text-[#2572BE]">
                                <p>NIP</p>
                                <p>Nama</p>
                                <p>Unit Kerja</p>
                                <p>Status</p>
                            </div>
                            <div className="flex flex-col gap-2 text-[#2572BE]">
                                <p>Jab. Akademik</p>
                                <p>Jab. Fungsional</p>
                                <p>Jab. Struktural</p>
                                <p>Pendidikan</p>
                            </div>
                        </div>

                        <div className="space-y-4 mt-20">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Kolom Kiri */}
                                <div className="space-y-6">
                                    <div className="flex gap-1">
                                        <Label className="w-70 text-[#2572BE]">
                                            Perguruan Tinggi Afiliasi<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            placeholder="Cari Perguruan Tinggi Afiliasi" />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Jenis SKIM<span className="text-red-500">*</span>
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="- - Pilih Jenis SKIM - -" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sk">Jenis 1</SelectItem>
                                                <SelectItem value="sk">Jenis 2</SelectItem>
                                                <SelectItem value="lain">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Judul Penelitian<span className="text-red-500">*</span>
                                        </Label>
                                        <Input/>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Tahun Susulan<span className="text-red-500">*</span>
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="- - Pilih Tahun Susulan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sk">Kategori 1</SelectItem>
                                                <SelectItem value="sk">Kategori 2</SelectItem>
                                                <SelectItem value="lain">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Tahun Pelaksanaan Ke<span className="text-red-500">*</span>
                                        </Label>
                                        <Input />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Lingkup Pengabdian
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="- - Pilih Lingkup Pengabdian - -" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sk">Kategori 1</SelectItem>
                                                <SelectItem value="sk">Kategori 2</SelectItem>
                                                <SelectItem value="lain">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Sesuai Roadmap
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="- - Pilih Sesuai Roadmap - -" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sk">Kategori 1</SelectItem>
                                                <SelectItem value="sk">Kategori 2</SelectItem>
                                                <SelectItem value="lain">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-7">
                                        <Label className="w-60 text-[#2572BE]">
                                            Tanggal SK Penugasan
                                        </Label>
                                        <Input type="date" placeholder="dd - mm - yyyy" />
                                    </div>

                                </div>

                                {/* Kolom Kanan */}
                                <div className="space-y-6">

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Kelompok Bidang<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            placeholder="Cari Kelompok Bidang" />
                                    </div>

                                    <div className="flex gap-8">
                                        <Label className="w-60 text-[#2572BE]">
                                            Litabmas Sebelumnya
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="- - Pilih Litabmas Sebelumnya - -" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="br">sk 1</SelectItem>
                                                <SelectItem value="lm">sk 2</SelectItem>
                                                <SelectItem value="lain">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Lokasi Kegiatan
                                        </Label>
                                        <Input/>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Tahun Kegiatan<span className="text-red-500">*</span>
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="- - Pilih Tahun Kegiatan - -" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="br">sk 1</SelectItem>
                                                <SelectItem value="lm">sk 2</SelectItem>
                                                <SelectItem value="lain">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Tanggal Mulai<span className="text-red-500">*</span>
                                        </Label>
                                        <Input type="date" placeholder="dd - mm - yyyy" />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Tanggal Selesai
                                        </Label>
                                        <Input type="date" placeholder="dd - mm - yyyy" />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Nomor SK Penugasan
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="- - Pilih Tingkat Penghargaan - -" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="br">sk 1</SelectItem>
                                                <SelectItem value="lm">sk 2</SelectItem>
                                                <SelectItem value="lain">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Tanggal Input
                                        </Label>
                                        <Input
                                            placeholder="22 April 2025" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default DetailPenelitian;