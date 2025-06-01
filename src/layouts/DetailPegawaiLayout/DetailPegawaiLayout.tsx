import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { HiPencil } from "react-icons/hi";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";

interface PropsType {
  children: ReactNode;
  title: string;
  subTitile?: string;
}

const DetailPegawaiLayout = (props: PropsType) => {
  const { children, title, subTitile } = props;
  const form = useForm();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="mt-10 mb-20">
      <Title title={title} subTitle={subTitile} />

      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex flex-col min-[1064px]:flex-row gap-4 justify-between">
                <div className="flex w-full md:w-auto gap-6">
                  <SearchInput />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <Link className="w-full md:w-auto" to="/admin/pegawai">
                    <Button className="cursor-pointer w-full md:w-auto bg-[#00C0EF] hover:bg-[#00A3D1] text-xs md:text-sm">
                      <IoIosArrowBack className="w-4! h-4! md text-white" />
                      Kembali ke Daftar
                    </Button>
                  </Link>
                  <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] text-xs md:text-sm">
                    <FaPlus className="w-4! h-4! text-white" />
                    Tambah Data
                  </Button>
                  <Button className="cursor-pointer bg-[#FDA31A] hover:bg-[#D78A1F]text-xs md:text-sm">
                    <HiPencil className="w-4! h-4! text-white" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="cursor-pointer text-xs md:text-sm"
                  >
                    <FaRegTrashAlt className="w-4! h-4! text-white" />
                    Hapus
                  </Button>
                </div>
              </div>
            }
          >
            <div className="flex flex-row gap-4 mt-14">{children}</div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailPegawaiLayout;
