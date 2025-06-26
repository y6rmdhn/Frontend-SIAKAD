import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const DetailDataJabatanStrukturalReferensi = () => {

  return (
      <div className="mt-10 mb-20">
        <Title title="Jabatan Struktural" subTitle="Detail Jabatan Struktural" />

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
                          to="/admin/referensi/kepegawaian/jabatan-struktural"
                      >
                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                          <IoIosArrowBack /> Kembali ke Daftar
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link
                          className="w-full xl:w-auto"
                          to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural"
                      >
                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                          <FaPlus /> Tambah Baru
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link
                          className="w-full xl:w-auto"
                          to={`/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural/edit-jabatan-struktural`}
                      >
                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                          <MdEdit /> Edit
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
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Kode<span className="text-red-600">*</span>
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        007
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Nama Jabatan Struktural<span className="text-red-600">*</span>
                      </Label>
                      <Label className="text-xs sm:text-sm flex-1">
                        Staff Ahli Rektor Bidang Akademik dan Publikasi Ilmiah
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Jenis Jabatan Struktural
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Singkatan
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Parenet Jabatan Strukral
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        Wakil Rektor Bidang Akademik
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Unit Kerja
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        Universitas Ibn Khaldun
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Alamat Email
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                  </div>

                  {/* KANAN */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Eselon
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Pangkat Min
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Pangkat Max
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Beban Sks
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        is Pimpinan?
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                        Keterangan
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
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

export default DetailDataJabatanStrukturalReferensi;
