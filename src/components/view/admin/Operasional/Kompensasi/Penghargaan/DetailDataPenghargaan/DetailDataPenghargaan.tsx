import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/blocks/SearchInput";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DetailDataPenghargaan = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["detail-penghargaan-admin", params.id],
    queryFn: async () => {
      if (!params.id) return null;
      const response = await adminServices.getDetailPenghargaan(params.id);
      console.log(response.data);
      return response.data;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Penghargaan" subTitle="Detail Penghargaan" />
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
      <Title title="Penghargaan" subTitle="Detail Penghargaan" />

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
                    to="/admin/operasional/kompensasi/penghargaan"
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-[#329C59] text-white text-xs sm:text-sm">
                      <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to="/admin/operasional/kompensasi/detail-penghargaan"
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-[#329C59] text-white text-xs sm:text-sm">
                      <FaPlus /> Tambah Baru
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to={`/admin/operasional/kompensasi/edit-data-penghargaan/${params.id}`}
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-[#329C59] text-white text-xs sm:text-sm">
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
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Pegawai
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {`${data?.data.nip} - ${data?.data.nama_pegawai}` || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Tgl. Penghargaan
                  </Label>
                  <Label className="text-xs sm:text-sm flex-1">
                    {data?.data.tanggal_penghargaan_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Jenis Penghargaan
                  </Label>
                  <Label className="text-xs sm:text-sm flex-1">
                    {data?.data.jenis_penghargaan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Nama Penghargaan
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.data.nama_penghargaan || "-"}
                  </Label>
                </div>
              </div>

              {/* KANAN */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    No.SK
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.data.no_sk || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Tgl.SK
                  </Label>
                  <Label className="text-xs sm:text-sm flex-1">
                    {data?.data.tanggal_sk_formatted || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    Keterangan
                  </Label>
                  <Label className="text-xs sm:text-sm flex-1">
                    {data?.data.keterangan || "-"}
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                  <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                    File Penghargaan
                  </Label>
                  <Label className="text-xs sm:text-sm text-left flex-1">
                    {data?.data.file_penghargaan_url ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-blue-600 hover:underline hover:text-blue-800"
                          >
                            Lihat File
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Pratinjau File</DialogTitle>
                          </DialogHeader>

                          <div className="py-4">
                            {/\.(jpeg|jpg|png|gif)$/i.test(
                              data.data.file_penghargaan || ""
                            ) ? (
                              <img
                                src={data?.data.file_penghargaan_url}
                                alt="Pratinjau File"
                                className="w-full h-auto rounded-md object-contain max-h-[70vh]"
                              />
                            ) : (
                              <div className="text-center">
                                <p className="mb-4">
                                  Pratinjau tidak tersedia untuk tipe file ini.
                                  Silakan buka di tab baru.
                                </p>
                                <a
                                  href={data?.data.file_penghargaan_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button>Buka File</Button>
                                </a>
                              </div>
                            )}
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Tutup
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <span>-</span>
                    )}
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

export default DetailDataPenghargaan;
