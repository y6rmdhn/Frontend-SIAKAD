import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import MonitoringSisaCuti from "@/view/admin/Operasional/cuti/MonitoringSisaCuti";
import React from "react";

const MonitoringSisaCutiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10 pl-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Operasional</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Cuti</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Monitoring Sisa Cuti</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <MonitoringSisaCuti />
    </SimKepegawaianLayout>
  );
};

export default MonitoringSisaCutiPage;
