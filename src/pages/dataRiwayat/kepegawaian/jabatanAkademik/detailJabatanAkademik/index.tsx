import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailJabatanAkademik from "@/components/view/DataRiwayat/Kepegawaian/JabatanAkademik/DetailJabatanAkademik/DetailJabatanAkademik";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import DetailJabatanAkademik from "@/view/DataRiwayat/Kepegawaian/JabatanAkademik/DetailJabatanAkademik/DetailJabatanAkademik";
import React from "react";
import { MdGroups } from "react-icons/md";

const DetailJabatanAkademikUserPage = () => {
  return (
    <SimKepegawaianLayout isNavbarUser={true}>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/dasboard"
              className="flex items-center gap-2"
            >
              <MdGroups className="w-6 h-6" />
              Pegawai
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Data Riwayat</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Kepegawaian</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Jabatan Akademik</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Jabatan Akademik</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailJabatanAkademik />
    </SimKepegawaianLayout>
  );
};

export default DetailJabatanAkademikUserPage;
