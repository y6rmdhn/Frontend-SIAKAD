import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailDokumenInternal from "@/components/view/admin/Operasional/Kompensasi/DetailDokumenInternal";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import DetailDokumenInternal from "@/view/admin/Operasional/Kompensasi/DetailDokumenInternal";
import React from "react";

const DetailDokumenInternalPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Operasional</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dokumen Internal</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailDokumenInternal />
    </SimKepegawaianLayout>
  );
};

export default DetailDokumenInternalPage;
