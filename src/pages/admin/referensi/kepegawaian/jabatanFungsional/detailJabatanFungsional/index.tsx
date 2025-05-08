import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailJabatanFungsional from "@/components/view/admin/Referensi/Kepegawaian/JabatanFungsional/DetailJabatanFungsional";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import DetailJabatanFungsional from "@/view/admin/Referensi/Kepegawaian/JabatanFungsional/DetailJabatanFungsional";
import React from "react";

const DetailJabatanFungsionalReferensiPage = () => {
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
            <BreadcrumbLink href="/gate/pegawai">
              Jabatan Fungsional
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Jabatan Fungsional</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailJabatanFungsional />
    </SimKepegawaianLayout>
  );
};

export default DetailJabatanFungsionalReferensiPage;
