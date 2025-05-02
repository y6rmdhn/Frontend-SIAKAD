import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RiwayatPekerjaan from "@/components/view/DataRiwayat/Kualifikasi/RiwayatPekerjaan/RiwayatPekerjaan";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import RiwayatPekerjaan from "@/view/DataRiwayat/Kualifikasi/RiwayatPekerjaan/RiwayatPekerjaan";
import React from "react";
import { MdGroups } from "react-icons/md";

const RiwayatPekerjaanUserPage = () => {
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
            <BreadcrumbLink href="">Kualifikasi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Riwayat Pekerjaan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RiwayatPekerjaan />
    </SimKepegawaianLayout>
  );
};

export default RiwayatPekerjaanUserPage;
