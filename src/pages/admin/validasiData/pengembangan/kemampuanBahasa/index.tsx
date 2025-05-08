import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import KemampuanBahasa from "@/components/view/admin/ValidasiData/Pengembangan/kemampuanBahasa";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import KemampuanBahasa from "@/view/admin/ValidasiData/Pengembangan/kemampuanBahasa";
import React from "react";

const KemampuanBahasaPage = () => {
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
            <BreadcrumbPage>Kemampuan Bahasa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <KemampuanBahasa />
    </SimKepegawaianLayout>
  );
};

export default KemampuanBahasaPage;
