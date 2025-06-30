import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const DetailDataJabatanStrukturalReferensi = () => {
  const { id } = useParams<{ id: string }>();

  const { data: queryData, isLoading } = useQuery({
    queryKey: ["jabatan-struktural-detail", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await adminServices.getJabatanStrukturalById(id);
      // Data utama berada di dalam properti 'data' dari respons API
      return response.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title
          title="Jabatan Struktural"
          subTitle="Detail Jabatan Struktural"
        />
        <CustomCard>
          <div className="flex justify-center items-center p-10">
            <p>Memuat data...</p>
          </div>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Struktural" subTitle="Detail Jabatan Struktural" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
              <div>
                {/* SearchInput dapat dibiarkan jika fungsionalitasnya relevan di halaman detail */}
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
                    to="/admin/referensi/kepegawaian/jabatan-struktural/tambah" // URL disesuaikan untuk menambah data baru
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                      <FaPlus /> Tambah Baru
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to={`/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural/edit-jabatan-struktural/${id}`}
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                      <MdEdit /> Edit
                    </Button>
                  </Link>
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
                    {queryData?.kode || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    Nama Jabatan Struktural
                    <span className="text-red-600">*</span>
                  </Label>
                  <Label className="text-xs sm:text-sm flex-1">
                    {queryData?.singkatan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    Jenis Jabatan Struktural
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {queryData?.jenis_jabatan_struktural
                      ?.jenis_jabatan_struktural || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    Singkatan
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {queryData?.singkatan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    Parent Jabatan Struktural
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {queryData?.parent?.singkatan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    Unit Kerja
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {queryData?.unit_kerja?.nama_unit || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    Alamat Email
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {queryData?.alamat_email || "-"}
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
                    {queryData?.eselon?.nama_eselon || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    Pangkat
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {queryData?.pangkat
                      ? `${queryData.pangkat.pangkat} - ${queryData.pangkat.nama_golongan}`
                      : "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    Beban Sks
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {queryData?.beban_sks || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    is Pimpinan?
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {queryData?.is_pimpinan ? "Ya" : "Tidak"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-43 shrink-0">
                    Keterangan
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {queryData?.keterangan || "-"}
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
