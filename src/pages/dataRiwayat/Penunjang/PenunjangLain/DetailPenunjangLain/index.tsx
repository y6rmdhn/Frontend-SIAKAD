import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import DetailPenunjangLain from "@/components/view/DataRiwayat/Penunjang/PenunjangLain/DetailPenunjangLain/DetailPenunjangLain";
  import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
  import React from "react";
  import { MdGroups } from "react-icons/md";
  
  const DetailPenunjangLainUserPage = () => {
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
              <BreadcrumbLink href="">Penunjang</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="">Penunjang Lain</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail Penunjang Lain</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
  
        <DetailPenunjangLain/>
      </SimKepegawaianLayout>
    );
  };
  
  export default DetailPenunjangLainUserPage;
  