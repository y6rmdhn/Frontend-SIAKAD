import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailJabatanFungsional from "@/components/view/DataRiwayat/Kepegawaian/JabatanFungsional/DetailJabatanFungsional/DetailJabatanFungsional";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import DetailJabatanFungsional from "@/view/DataRiwayat/Kepegawaian/JabatanFungsional/DetailJabatanFungsional/DetailJabatanFungsional";
import React from "react";
import { MdGroups } from "react-icons/md";

const DetailJabatanFungsionalUserPage = () => {
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
            <BreadcrumbLink href="">Jabatan Fungsional</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Jabatan Fungsional</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailJabatanFungsional />
    </SimKepegawaianLayout>
  );
};

export default DetailJabatanFungsionalUserPage;
