import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JabatanFungsional from "@/components/view/admin/Referensi/Kepegawaian/JabatanFungsional/JabatanFungsional";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JabatanFungsional from "@/view/admin/Referensi/Kepegawaian/JabatanFungsional/JabatanFungsional";
import React from "react";

const JabatanAkademikReferensiPage = () => {
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
            <BreadcrumbPage>Jabatan Fungsional</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JabatanFungsional />
    </SimKepegawaianLayout>
  );
};

export default JabatanAkademikReferensiPage;
