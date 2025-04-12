import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import PermohonanIzin from "@/view/admin/Operasional/cuti/PermohonanIzin/PermohonanIzin";
import React from "react";

const PermohonanIzinPage = () => {
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

      <PermohonanIzin />
    </SimKepegawaianLayout>
  );
};

export default PermohonanIzinPage;
