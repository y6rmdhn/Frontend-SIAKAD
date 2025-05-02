import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import HubunganKerjaPegawai from "@/components/view/admin/Operasional/HubunganKerjaPegawai";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import HubunganKerjaPegawai from "@/view/admin/Operasional/HubunganKerjaPegawai";
import React from "react";

const HubunganKerjaPegawaiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Operasional</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Hubungan Kerja Pegawai</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <HubunganKerjaPegawai />
    </SimKepegawaianLayout>
  );
};

export default HubunganKerjaPegawaiPage;
