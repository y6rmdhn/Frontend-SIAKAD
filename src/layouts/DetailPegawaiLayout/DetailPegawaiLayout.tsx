import CustomCard from "@/components/commons/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HiPencil } from "react-icons/hi";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import accordionContent from "@/constant/arccodionContent/arccodionContent";
import { Link, useParams, useLocation } from "react-router-dom";

interface PropsType {
  children: ReactNode;
  title: string;
  subTitile?: string;
}

const DetailPegawaiLayout = (props: PropsType) => {
  const { children, title, subTitile } = props;
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );
  const form = useForm();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">
        {title}{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          {subTitile}
        </span>
      </h1>

      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex justify-between">
                <div className="flex gap-6">
                  <div className="relative">
                    <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                    <Input placeholder="Search" className="w-80 pr-8" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="cursor-pointer bg-[#00C0EF] hover:bg-[#00A3D1]">
                    <IoIosArrowBack className="w-5! h-5! text-white" />
                    Kembali ke Daftar
                  </Button>
                  <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                    <FaPlus className="w-5! h-5! text-white" />
                    Tambah Data
                  </Button>
                  <Button className="cursor-pointer bg-[#FDA31A] hover:bg-[#D78A1F]">
                    <HiPencil className="w-5! h-5! text-white" />
                    Edit
                  </Button>
                  <Button variant="destructive" className="cursor-pointer ">
                    <FaRegTrashAlt className="w-5! h-5! text-white" />
                    Hapus
                  </Button>
                </div>
              </div>
            }
          >
            <div className="flex flex-row gap-4 mt-14">
              <div className="bg-[#F0F6FA] p-4 flex flex-col items-center justify-center rounded-lg">
                <IoPersonCircleOutline className="text-8xl text-muted-foreground" />
                <div className="flex flex-col w-full gap-1">
                  <Link to={"/admin/detail-pegawai/biodata/" + params.id}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-0 rounded-none transition-all duration-300 hover:underline hover:bg-[#F0F6FA] cursor-pointer ${
                        location.pathname ===
                          "/admin/detail-pegawai/biodata/" + params.id &&
                        "text-[#169EF4] border-l-2 border-l-[#169EF4] pl-1"
                      }`}
                    >
                      Biodata
                    </Button>
                  </Link>
                  <Separator className="my-1" />
                  <Link to={"/admin/detail-pegawai/keluarga/" + params.id}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-0 transition-all duration-300 hover:underline hover:bg-[#F0F6FA] cursor-pointer ${
                        location.pathname ===
                          "/admin/detail-pegawai/keluarga/" + params.id &&
                        "text-[#169EF4] border-l-2 border-l-[#169EF4] rounded-none pl-1"
                      }`}
                    >
                      Keluarga
                    </Button>
                  </Link>
                  <Separator className="my-1" />
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  value={openAccordion}
                  onValueChange={setOpenAccordion}
                >
                  {accordionContent.map((section, index) => (
                    <AccordionItem value={index.toString()} key={index}>
                      <AccordionTrigger>{section.title}</AccordionTrigger>
                      <div className="flex flex-col">
                        {section.items.map((item, idx) => {
                          const isActive =
                            location.pathname === item.href + params.id;
                          return (
                            <Link
                              key={idx}
                              to={item.href + params.id}
                              className={`text-left text-sm rounded-md hover:bg-gray-200 ${
                                isActive
                                  ? "border-l-2 border-l-[#169EF4] rounded-none text-[#169EF4]"
                                  : ""
                              }`}
                            >
                              <AccordionContent className="pb-2 pt-2 pl-2">
                                {item.label}
                              </AccordionContent>
                            </Link>
                          );
                        })}
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              {children}
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailPegawaiLayout;
