import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SettingValidasi from "@/components/view/admin/ValidasiData/SettingValidasi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import SettingValidasi from "@/view/admin/ValidasiData/SettingValidasi";
import React from "react";

const SettingValidasiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Setting Validasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SettingValidasi />
    </SimKepegawaianLayout>
  );
};

export default SettingValidasiPage;
