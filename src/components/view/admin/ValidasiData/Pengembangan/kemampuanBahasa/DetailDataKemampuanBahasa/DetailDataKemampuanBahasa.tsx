import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";


const DetailDataKemampuanBahasaAdmin = () => {

  return (
    <div className="mt-10 mb-20">
      <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/admin/validasi-data/pengembangan/kemampuan-bahasa"
              >
                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-[#329C59] text-white">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
              {/* KIRI */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Tahun
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Bahasa
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Nama Lembaga
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Kemampuan Mendengar
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Kemampuan Berbicara
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-42">
                    Kemampuan Menulis
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    Status Pengajuan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-42">
                    File Pendukung
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">
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

export default DetailDataKemampuanBahasaAdmin;
