import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RiwayatPenghargaan from "@/components/view/admin/Operasional/Kompensasi/Penghargaan/RiwayatPenghargaan";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import RiwayatPenghargaan from "@/view/admin/Operasional/Kompensasi/Penghargaan/RiwayatPenghargaan";
import React from "react";

const RiwayatPenghargaanPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
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
            <BreadcrumbPage>Penghargaan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RiwayatPenghargaan />
    </SimKepegawaianLayout>
  );
};

export default RiwayatPenghargaanPage;
