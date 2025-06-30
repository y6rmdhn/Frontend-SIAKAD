import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
// import { Skeleton } from "@/components/ui/skeleton";
// import adminServices from "@/services/admin.services";
// import { useQuery } from "@tanstack/react-query";

const DetailDataOrganisasiAdmin = () => {
  // const params = useParams<{ id: string }>();

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["detail-organisasi-admin", params.id],
  //   queryFn: async () => {
  //     if (!params.id) {
  //       throw new Error("ID Organisasi tidak ditemukan di URL");
  //     }
  //     const response = await adminServices.getOrganisasiDetailAdmin(params.id);
  //     return response.data;
  //   },
  //   enabled: !!params.id,
  // });

  // if (isLoading) {
  //   return (
  //     <div className="mt-10 mb-20">
  //       <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />
  //       <CustomCard>
  //         <div className="p-6 space-y-6">
  //           <div className="space-y-2">
  //             <Skeleton className="h-6 w-1/2" />
  //             <Skeleton className="h-4 w-1/3" />
  //           </div>
  //           <div className="flex justify-end">
  //             <Skeleton className="h-10 w-48" />
  //           </div>
  //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
  //             <div className="space-y-4">
  //               <Skeleton className="h-8 w-full" />
  //               <Skeleton className="h-8 w-full" />
  //               <Skeleton className="h-8 w-full" />
  //               <Skeleton className="h-8 w-full" />
  //               <Skeleton className="h-8 w-full" />
  //             </div>
  //             <div className="space-y-4">
  //               <Skeleton className="h-8 w-full" />
  //               <Skeleton className="h-8 w-full" />
  //               <Skeleton className="h-8 w-full" />
  //               <Skeleton className="h-8 w-full" />
  //               <Skeleton className="h-8 w-full" />
  //             </div>
  //           </div>
  //         </div>
  //       </CustomCard>
  //     </div>
  //   );
  // }

  // // Menampilkan state error
  // if (isError) {
  //   return (
  //     <div className="mt-10 mb-20 text-center">
  //       <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />
  //       <CustomCard>
  //         <p className="p-10 text-red-500">
  //           Gagal memuat detail data kemampuan bahasa.
  //         </p>
  //       </CustomCard>
  //     </div>
  //   );
  // }

  return (
    <div className="mt-10 mb-20">
      <Title title="Data Organisasi" subTitle="Detail Organisasi" />

      <CustomCard
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/pengembangan-diri/organisasi"
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
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Tanggal Mulai
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Tanggal Selesai
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Nama Organisasi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Alamat Organisasi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Lingkup
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold capitalize"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Jabatan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    SK Penunjang
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold">-</Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Refleksi
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">
                    Website
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Status Pengajuan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Diajukan
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Tanggal Disetujui
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                  <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                    Dibuat Oleh
                  </Label>
                  <Label className="text-xs sm:text-sm font-semibold"></Label>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailDataOrganisasiAdmin;
