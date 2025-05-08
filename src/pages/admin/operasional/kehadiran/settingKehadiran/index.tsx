import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SettingKehadiran from "@/components/view/admin/Operasional/Kehadiran/SettingKehadiran";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import SettingKehadiran from "@/view/admin/Operasional/Kehadiran/SettingKehadiran";
import React from "react";

const SettingKehadiranPage = () => {
  return (
    <SimKepegawaianLayout>
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
            <BreadcrumbPage>Setting Kehadiran</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SettingKehadiran />
    </SimKepegawaianLayout>
  );
};

export default SettingKehadiranPage;
