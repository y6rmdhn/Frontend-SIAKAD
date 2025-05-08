import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import GelarAkademik from "@/components/view/admin/Referensi/Kepegawaian/GelarAkademik";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import GelarAkademik from "@/view/admin/Referensi/Kepegawaian/GelarAkademik";
import React from "react";

const GelarAkademikPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Referensi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Kepegawaian</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Gelar Akademik</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <GelarAkademik />
    </SimKepegawaianLayout>
  );
};

export default GelarAkademikPage;
