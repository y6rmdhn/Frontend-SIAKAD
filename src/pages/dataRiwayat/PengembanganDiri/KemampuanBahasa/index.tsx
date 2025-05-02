import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import KemampuanBahasa from "@/components/view/DataRiwayat/PengembanganDiri/KemampuanBahasa";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import KemampuanBahasa from "@/view/DataRiwayat/PengembanganDiri/KemampuanBahasa";
import React from "react";
import { MdGroups } from "react-icons/md";

const KemampuanBahasaUserPage = () => {
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
            <BreadcrumbLink href="">Pengembangan Diri</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Kemampuan Bahasa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <KemampuanBahasa />
    </SimKepegawaianLayout>
  );
};

export default KemampuanBahasaUserPage;
