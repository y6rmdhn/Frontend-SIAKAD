import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

// --- START DEFINISI TIPE ---
// Interface ini sudah disesuaikan dengan semua data dari API response
interface DetailUnitKerja {
  id: string;
  kode_unit: string;
  nama_unit: string;
  parent_unit_id: string | null;
  jenis_unit_id: string;
  tk_pendidikan_id: string;
  alamat: string;
  telepon: string;
  website: string;
  alamat_email: string;
  akreditasi_id: string;
  no_sk_akreditasi: string;
  tanggal_akreditasi: string;
  no_sk_pendirian: string;
  tanggal_sk_pendirian: string;
  gedung: string;
  // created_at, updated_at, deleted_at bisa ditambahkan jika perlu ditampilkan
}
// --- END DEFINISI TIPE ---

const DetailDataUnitKerja = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<DetailUnitKerja>({
    queryKey: ["detail-unit-kerja", params.id],
    queryFn: async () => {
      if (!params.id) {
        throw new Error("ID Unit Kerja tidak ditemukan di URL.");
      }
      const response = await adminServices.getDetailUnitKerja(
        Number(params.id)
      );
      return response.data.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Unit Kerja" subTitle="Detail Unit kerja" />
        <CustomCard>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        </CustomCard>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center text-red-500">
        Gagal memuat data unit kerja.
      </div>
    );
  }

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
                    to={`/admin/referensi/kepegawaian/unit-kerja/edit-data-unit-kerja/${params.id}`}
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
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Kode Unit <span className="text-red-600">*</span>
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.kode_unit || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Nama Unit <span className="text-red-600">*</span>
                  </Label>
                  <Label className="text-xs sm:text-sm flex-1">
                    {data?.nama_unit || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Parent Unit
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.parent_unit_id || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Alamat
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.alamat || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Gedung
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.gedung || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    No SK Pendirian
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.no_sk_pendirian || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Tanggal SK Pendirian
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.tanggal_sk_pendirian || "-"}
                  </Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Telepon
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.telepon || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Website
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.website || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Alamat Email
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.alamat_email || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Akreditasi
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.akreditasi_id || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    No SK Akreditasi
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.no_sk_akreditasi || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-40 shrink-0">
                    Tanggal Akreditasi
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.tanggal_akreditasi || "-"}
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

export default DetailDataUnitKerja;
