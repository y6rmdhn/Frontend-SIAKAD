import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JabatanStruktural from "@/components/view/admin/Referensi/Kepegawaian/JabatanStruktural";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JabatanStruktural from "@/view/admin/Referensi/Kepegawaian/JabatanStruktural";
import React from "react";

const JabatanStrukturalReferensiPage = () => {
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
            <BreadcrumbPage>Jabatan Struktural</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JabatanStruktural />
    </SimKepegawaianLayout>
  );
};

export default JabatanStrukturalReferensiPage;
