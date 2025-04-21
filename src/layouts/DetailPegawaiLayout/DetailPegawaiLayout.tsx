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
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

interface PropsType {
  children: ReactNode;
  title: string;
  subTitile?: string;
}

const DetailPegawaiLayout = (props: PropsType) => {
  const { children, title, subTitile } = props;
  const form = useForm();

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-normal">
        {title}{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          {subTitile}
        </span>
      </h1>

      <Form {...form}>
        <form>
          <CustomCard>
            <div className="flex justify-between mt-10">
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
                <Button className="cursor-pointer bg-[#FDA31A]">
                  <HiPencil className="w-5! h-5! text-white" />
                  Edit
                </Button>
                <Button variant="destructive" className="cursor-pointer ">
                  <FaRegTrashAlt className="w-5! h-5! text-white" />
                  Hapus
                </Button>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-14">
              <div className="bg-[#F0F6FA] p-4 flex flex-col items-center justify-center rounded-lg">
                <IoPersonCircleOutline className="text-8xl text-muted-foreground" />
                <Button
                  variant="ghost"
                  className="w-full justify-start px-0 mt-6"
                >
                  Biodata
                </Button>
                <Button variant="ghost" className="w-full justify-start px-0">
                  Keluarga
                </Button>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Kepegawaian</AccordionTrigger>
                    <AccordionContent>Homebase</AccordionContent>
                    <AccordionContent>Pangkat</AccordionContent>
                    <AccordionContent>Jabatan Akademik</AccordionContent>
                    <AccordionContent>Jabatan Fungsional</AccordionContent>
                    <AccordionContent>Jabatan Struktural</AccordionContent>
                    <AccordionContent>Hubungan Kerja</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Presensi</AccordionTrigger>
                    <AccordionContent>Riwayat Kehadiran</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Kualifikasi</AccordionTrigger>
                    <AccordionContent>Pendidikan Forrmal</AccordionContent>
                    <AccordionContent>Diklat</AccordionContent>
                    <AccordionContent>Riwayat Pekerjaan</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Kompetensi</AccordionTrigger>
                    <AccordionContent>Sertifikasi</AccordionContent>
                    <AccordionContent>Tes</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Pelaksanaan Pendidikan</AccordionTrigger>
                    <AccordionContent>Pengajar</AccordionContent>
                    <AccordionContent>Bimbingan Mahasiswa</AccordionContent>
                    <AccordionContent>Pengujian Mahasiswa</AccordionContent>
                    <AccordionContent>Visiting Scientist</AccordionContent>
                    <AccordionContent>Pembinaan Mahasiswa</AccordionContent>
                    <AccordionContent>Datasering</AccordionContent>
                    <AccordionContent>Bahan Ajar</AccordionContent>
                    <AccordionContent>Orasi Ilmiah</AccordionContent>
                    <AccordionContent>Pembimbing Dosen</AccordionContent>
                    <AccordionContent>Tugas Tambahan</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Pelaksanaan Penelitian</AccordionTrigger>
                    <AccordionContent>Penelitian</AccordionContent>
                    <AccordionContent>Publikasi</AccordionContent>
                    <AccordionContent>Paten/HKI</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger>Pelaksanaan Pengabdian</AccordionTrigger>
                    <AccordionContent>Pengelola Junal</AccordionContent>
                    <AccordionContent>Pemicara</AccordionContent>
                    <AccordionContent>Jabatan Tugas</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8">
                    <AccordionTrigger>Penunjang</AccordionTrigger>
                    <AccordionContent>Anggota Profesi</AccordionContent>
                    <AccordionContent>Penghargaan</AccordionContent>
                    <AccordionContent>Penunjang Lain</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8">
                    <AccordionTrigger>Pengembangan</AccordionTrigger>
                    <AccordionContent>Organisasi</AccordionContent>
                    <AccordionContent>Kemampuan Bahasa</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9">
                    <AccordionTrigger>Kompensasi</AccordionTrigger>
                    <AccordionContent>Pelanggaran</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10">
                    <AccordionTrigger>Permohonan</AccordionTrigger>
                    <AccordionContent>Cuti</AccordionContent>
                    <AccordionContent>Izin</AccordionContent>
                  </AccordionItem>
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
