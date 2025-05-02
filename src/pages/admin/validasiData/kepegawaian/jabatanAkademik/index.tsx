import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JabatanAkademik from "@/components/view/admin/ValidasiData/Kepegawaian/JabatanAkademik/JabatanAkademik";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JabatanAkademik from "@/view/admin/ValidasiData/Kepegawaian/JabatanAkademik/JabatanAkademik";
import React from "react";

const JabatanAkademikPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Kepegawaian</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jabatan Akademik</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JabatanAkademik />
    </SimKepegawaianLayout>
  );
};

export default JabatanAkademikPage;
