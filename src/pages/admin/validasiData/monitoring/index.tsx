import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Monitoring from "@/components/view/admin/ValidasiData/Monitoring";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import Monitoring from "@/view/admin/ValidasiData/Monitoring";
import React from "react";

const MonitoringPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Monitoring</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Monitoring />
    </SimKepegawaianLayout>
  );
};

export default MonitoringPage;
