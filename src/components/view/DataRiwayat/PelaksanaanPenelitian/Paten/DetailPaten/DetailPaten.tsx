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
const DetailPaten = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Paten" subTitle="Detail Paten" />
      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2">
              <Link to="/data-riwayat/pelaksanaan-penelitian/paten">
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
                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Jenis Paten<span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="- - Pilih Jenis Paten - -" />
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
                      Aktivitas Litabmas
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="- - Pilih Aktivitas Litabmas - -" />
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
                      Judul Karya<span className="text-red-500">*</span>
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Tanggal Terbit<span className="text-red-500">*</span>
                    </Label>
                    <Input type="date" placeholder="dd - mm - yyyy" />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">Penerbit</Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Jumlah Halaman
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-7">
                    <Label className="w-60 text-[#2572BE]">
                      Keterangan / Petunjuk Akses
                    </Label>
                    <Input />
                  </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-6">
                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Kategori Capaian
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="- - Pilih Kategori Capaian - -" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="br">sk 1</SelectItem>
                        <SelectItem value="lm">sk 2</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">Nomor Paten</Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Lembaga Pemberi Paten
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">ISBN</Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Tautan Eksternal
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">Tanggal Input</Label>
                    <Input placeholder="22 April 2025" />
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

export default DetailPaten;
