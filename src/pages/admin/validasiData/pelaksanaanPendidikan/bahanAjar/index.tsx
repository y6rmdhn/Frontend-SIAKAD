import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BahanAjar from "@/components/view/admin/ValidasiData/PelaksanaanPendidikan/BahanAjar";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import BahanAjar from "@/view/admin/ValidasiData/PelaksanaanPendidikan/BahanAjar";
import React from "react";

const BahanAjarPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">
              Pelaksanaan Pendidikan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Bahan Ajar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <BahanAjar />
    </SimKepegawaianLayout>
  );
};

export default BahanAjarPage;
