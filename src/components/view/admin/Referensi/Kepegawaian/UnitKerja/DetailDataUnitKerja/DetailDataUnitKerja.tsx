import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

// --- START DEFINISI TIPE ---

// Tipe untuk data detail unit kerja dari API
interface DetailUnitKerja {
  id: number;
  kode_unit: string;
  nama_unit: string;
  parent_unit_id: string | null;
  // Tambahkan properti lain sesuai respons API Anda
  // contoh:
  // jenis_unit: string;
  // tk_pendidikan: string;
  // alamat: string;
  // ... dan seterusnya
}

// --- END DEFINISI TIPE ---

const DetailDataUnitKerja = () => {
  // Menambahkan tipe pada useParams agar lebih jelas
  const params = useParams<{ id: string }>();

  // get data
  const { data, isLoading, isError } = useQuery<DetailUnitKerja>({
    queryKey: ["detail-unit-kerja", params.id],
    queryFn: async () => {
      // FIX: Memastikan params.id ada dan mengonversinya ke number
      if (!params.id) {
        throw new Error("ID Unit Kerja tidak ditemukan di URL.");
      }
      const response = await adminServices.getDetailUnitKerja(Number(params.id));
      return response.data.data;
    },
    // Query hanya akan berjalan jika params.id ada
    enabled: !!params.id,
  });

  // Menampilkan state loading
  if (isLoading) {
    return (
        <div className="mt-10 mb-20">
          <Title title="Unit Kerja" subTitle="Detail Unit kerja" />
          <CustomCard>
            <div className="space-y-4 p-4">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </CustomCard>
        </div>
    );
  }

  // Menampilkan state error
  if (isError) {
    return (
        <div className="mt-10 mb-20 text-center text-red-500">
          Gagal memuat data unit kerja.
        </div>
    )
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
                        {data?.kode_unit || "-"}
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                        Nama Unit <span className="text-red-600">*</span>
                      </Label>
                      <Label className="text-xs sm:text-sm flex-1">
                        {data?.nama_unit || "-"}
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                      <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                        Parent Unit
                      </Label>
                      <Label className="text-xs sm:text-sm text-left flex-1">
                        {data?.parent_unit_id || "-"}
                      </Label>
                    </div>
                    {/* Tambahkan field lain dengan cara yang sama */}
                  </div>

                  {/* KANAN */}
                  <div className="space-y-2">
                    {/* Tambahkan field lain dengan cara yang sama */}
                  </div>
                </div>
              </div>
            }
        />
      </div>
  );
};

export default DetailDataUnitKerja;
