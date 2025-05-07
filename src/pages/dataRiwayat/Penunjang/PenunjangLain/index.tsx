import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
  import PenunjangLain from "@/components/view/DataRiwayat/Penunjang/PenunjangLain/PenunjangLain";
  import React from "react";
  import { MdGroups } from "react-icons/md";
  
  const PenunjangLainUserPage = () => {
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
              <BreadcrumbPage>Penunjang Lain</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
  
        <PenunjangLain />
      </SimKepegawaianLayout>
    );
  };
  
  export default PenunjangLainUserPage;
  