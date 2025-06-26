import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const DetailDataJabatanFungsionalReferensi = () => {

  return (
      <div className="mt-10 mb-20">
        <Title title="Jabatan Fungsional" subTitle="Detail Jabatan Fungsional" />

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
                          to="/admin/referensi/kepegawaian/jabatan-fungsional"
                      >
                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                          <IoIosArrowBack /> Kembali ke Daftar
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link
                          className="w-full xl:w-auto"
                          to="/admin/referensi/kepegawaian/jabatan-fungsional/detail-jabatan-fungsional"
                      >
                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                          <FaPlus /> Tambah Baru
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link
                          className="w-full xl:w-auto"
                          to={`/admin/referensi/kepegawaian/jabatan-fungsional/detail-jabatan-fungsional/edit-jabatan-fungsional`}
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
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                        Kode Jabatan<span className="text-red-600">*</span>
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        GB
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                        Jabatan Fungsional<span className="text-red-600">*</span>
                      </Label>
                      <Label className="text-xs sm:text-sm flex-1">
                        Guru Besar
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                        Jabatan Akademik<span className="text-red-600">*</span>
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        Guru Besar
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                        Golongan Pangkat
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        Pembina Utama Madya (IV/D)
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                        Angka Kredit<span className="text-red-600">*</span>
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        850
                      </Label>
                    </div>
                  </div>

                  {/* KANAN */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                        Usia Pensiun<span className="text-red-600">*</span>
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        70
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                        SKS Maksimal
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                        Referensi SIAKAD
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        Profesor 850
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                        Referensi SISTER
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
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

export default DetailDataJabatanFungsionalReferensi;
