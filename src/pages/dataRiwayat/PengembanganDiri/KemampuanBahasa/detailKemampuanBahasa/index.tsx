import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
  import DetailKemampuanBahasa from "@/view/DataRiwayat/PengembanganDiri/KemampuanBahasa/DetailKemampuanBahasa";
  import React from "react";
  import { MdGroups } from "react-icons/md";
  
  const DetailKemampuanBahasaUserPage = () => {
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
              <BreadcrumbLink href="">Kemampuan Bahasa</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail Kemampuan Bahasa</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
  
        <DetailKemampuanBahasa />
      </SimKepegawaianLayout>
    );
  };
  
  export default DetailKemampuanBahasaUserPage;
  