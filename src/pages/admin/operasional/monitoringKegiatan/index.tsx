import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RekapKehadiran from "@/components/view/admin/Operasional/MonitoringKegiatan/RekapKehadiran";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import RekapKehadiran from "@/view/admin/Operasional/MonitoringKegiatan/RekapKehadiran";
import React from "react";

const MonitoringRekapKehadiranPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Operasional</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Monitoring Kegiatan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RekapKehadiran />
    </SimKepegawaianLayout>
  );
};

export default MonitoringRekapKehadiranPage;
