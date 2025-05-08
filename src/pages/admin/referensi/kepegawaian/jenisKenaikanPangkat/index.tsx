import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JenisKenaikanPangkat from "@/components/view/admin/Referensi/Kepegawaian/JenisKenaikanPangkat";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JenisKenaikanPangkat from "@/view/admin/Referensi/Kepegawaian/JenisKenaikanPangkat";
import React from "react";

const JenisKenaikanPangkatReferensiPage = () => {
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
            <BreadcrumbPage>Jenis Kenaikan Pangkat</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JenisKenaikanPangkat />
    </SimKepegawaianLayout>
  );
};

export default JenisKenaikanPangkatReferensiPage;
