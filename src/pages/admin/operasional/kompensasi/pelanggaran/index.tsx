import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import Pelanggaran from "@/view/admin/Operasional/Kompensasi/Pelanggaran";
import React from "react";

const PelanggaranPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10 pl-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Operasional</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Kompensasi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pelanggaran</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Pelanggaran />
    </SimKepegawaianLayout>
  );
};

export default PelanggaranPage;
