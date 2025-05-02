import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import OutputPenelitian from "@/components/view/admin/Referensi/Aktifitas/OutputPenelitian";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import OutputPenelitian from "@/view/admin/Referensi/Aktifitas/OutputPenelitian";
import React from "react";

const OutputPenelitianReferensiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Referensi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Aktivitas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Output Penelitian</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <OutputPenelitian />
    </SimKepegawaianLayout>
  );
};

export default OutputPenelitianReferensiPage;
