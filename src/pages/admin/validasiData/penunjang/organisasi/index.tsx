import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import OrganisasiPenunjang from "@/components/view/admin/ValidasiData/Penunjang/Organisasi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import OrganisasiPenunjang from "@/view/admin/ValidasiData/Penunjang/Organisasi";
import React from "react";

const OrganisasiPenunjangPage = () => {
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
            <BreadcrumbPage>Anggota Profesi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <OrganisasiPenunjang />
    </SimKepegawaianLayout>
  );
};

export default OrganisasiPenunjangPage;
