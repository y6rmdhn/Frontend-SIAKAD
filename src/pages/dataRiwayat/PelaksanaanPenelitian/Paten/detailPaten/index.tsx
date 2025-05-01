import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
  import DetailPaten from "@/view/DataRiwayat/PelaksanaanPenelitian/Paten/DetailPaten";
  import React from "react";
  import { MdGroups } from "react-icons/md";
  
  const DetailPatenUserPage = () => {
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
              <BreadcrumbLink href="">Pelaksanaan Penelitian</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="">Paten</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail Paten</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
  
        <DetailPaten />
      </SimKepegawaianLayout>
    );
  };
  
  export default DetailPatenUserPage;
  