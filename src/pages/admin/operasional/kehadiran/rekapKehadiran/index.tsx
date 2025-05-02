import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RekapKehadiran from "@/components/view/admin/Operasional/Kehadiran/RekapKehadiran";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import RekapKehadiran from "@/view/admin/Operasional/Kehadiran/RekapKehadiran";
import React from "react";

const RekapKehadiranPage = () => {
  return (
    <SimKepegawaianLayout>
      <div>
        <Breadcrumb className="mt-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/gate/pegawai">Operasional</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/gate/pegawai">Kehadiran</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Rekap Kehadiran</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <RekapKehadiran />
      </div>
    </SimKepegawaianLayout>
  );
};

export default RekapKehadiranPage;
