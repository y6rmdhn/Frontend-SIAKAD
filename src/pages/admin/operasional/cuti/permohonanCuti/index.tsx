import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import PermohonanCuti from "@/view/admin/Operasional/cuti/PermohonanCuti";
import React from "react";

const PermohonanCutiPage = () => {
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
            <BreadcrumbPage>Permohonan Cuti</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PermohonanCuti />
    </SimKepegawaianLayout>
  );
};

export default PermohonanCutiPage;
