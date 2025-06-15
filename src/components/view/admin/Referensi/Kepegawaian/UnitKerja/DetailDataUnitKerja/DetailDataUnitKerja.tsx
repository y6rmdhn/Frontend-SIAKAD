import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/blocks/SearchInput";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";

const DetailDataUnitKerja = () => {
  const params = useParams();

  // get data
  const { data } = useQuery({
    queryKey: ["jabatan-akademik-detail-referensi-kepegawaian"],
    queryFn: async () => {
      const response = await adminServices.getDetailUnitKerja(params.id);
      return response.data.data;
    },
  });

  return (
    <div className="mt-10 mb-20">
      <Title title="Unit Kerja" subTitle="Detail Unit kerja" />

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
                    to="/admin/referensi/kepegawaian/unit-kerja"
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                      <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to="/admin/referensi/kepegawaian/unit-kerja/detail-unit-kerja"
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                      <FaPlus /> Tambah Baru
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to="/admin/referensi/kepegawaian/unit-kerja/edit-data-unit-kerja"
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
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Kode Unit <span className="text-red-600">*</span>
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.kode_unit}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Nama Unit <span className="text-red-600">*</span>
                  </Label>
                  <Label className="text-xs sm:text-sm  flex-1">
                    {data?.nama_unit}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Parent Unit
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.parent_unit_id ? data?.parent_unit_id : "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Jenis Unit
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    Fakultas
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    TK. Pendidikan
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    --Pilih Tk. Pendidikan--
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Alamat
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    Jl.KH Sholeh Iskandar KM 2 Kedung Badak Bogor
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Telepon
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Website
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Alamat Email
                  </Label>
                  <Label className="text-xs sm:text-sm  flex-1"></Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Akreditasi
                  </Label>
                  <Label className="text-xs sm:text-sm flex-1"></Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    No. SK Akreditasi
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Tanggal Akreditasi
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    No. SK Pendirian
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Tanggal. SK Pendirian
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Gedung
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Akademik
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-38 shrink-0">
                    Aktif
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1"></Label>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailDataUnitKerja;
