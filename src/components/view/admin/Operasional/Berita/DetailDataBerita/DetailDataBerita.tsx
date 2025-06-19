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
import { ReadOnlyRichText } from "@/components/blocks/ReadOnlyRichText/ReadOnlyRichText";

const DetailDataBerita = () => {
  const params = useParams();

  // get data
  const { data } = useQuery({
    queryKey: ["detail-berita-operasional"],
    queryFn: async () => {
      const response = await adminServices.getBeritaSelectwithParams(
        Number(params.id)
      );

      return response.data.data;
    },
  });

  return (
    <div className="mt-10 mb-20">
      <Title title="Berita" subTitle="Detail Berita" />

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
                    to="/admin/operasional/berita"
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                      <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to="/admin/operasional/detail-berita"
                  >
                    <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                      <FaPlus /> Tambah Baru
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full xl:w-auto"
                    to="/admin/operasional/edit-data-berita"
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
            <div className="mt-5">
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                  Unit
                </Label>
                <Label className="text-xs sm:text-sm text-left flex-1"></Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                  Judul
                </Label>
                <Label className="text-xs sm:text-sm  flex-1">
                  {data?.judul}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                  Isi Berita
                </Label>
                <Label className="text-xs sm:text-sm flex-1">
                  {data?.konten && <ReadOnlyRichText content={data.konten} />}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                  Tgl. Posting
                </Label>
                <Label className="text-xs sm:text-sm text-left flex-1"></Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                  Tgl. Expired
                </Label>
                <Label className="text-xs sm:text-sm  flex-1"></Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                  Prioritas
                </Label>
                <Label className="text-xs sm:text-sm flex-1"></Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                  Gambar Berita
                </Label>
                <Label className="text-xs sm:text-sm text-left flex-1"></Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                  File Berita
                </Label>
                <Label className="text-xs sm:text-sm flex-1"></Label>
              </div>
              <div className="flex flex-col sm:flex-row border-b p-2 gap-4">
                <Label className="text-[#2572BE] text-xs sm:text-sm w-35 shrink-0">
                  Penerima Berita
                </Label>
                <Label className="text-xs sm:text-sm flex-1"></Label>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailDataBerita;
