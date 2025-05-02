import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PenunjangLain from "@/components/view/admin/ValidasiData/Penunjang/PenunjangLain";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import PenunjangLain from "@/view/admin/ValidasiData/Penunjang/PenunjangLain";
import React from "react";

const PenunjangLainPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Pengembangan</BreadcrumbLink>
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

export default PenunjangLainPage;
