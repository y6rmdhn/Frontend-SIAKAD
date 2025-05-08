import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JenisSertifikasi from "@/components/view/admin/Referensi/Aktifitas/JenisSertifikasi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JenisSertifikasi from "@/view/admin/Referensi/Aktifitas/JenisSertifikasi";
import React from "react";

const JenisSertifikasiReferensiPage = () => {
  return (
    <SimKepegawaianLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Referensi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">Aktivitas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jenis Sertifikasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JenisSertifikasi />
    </SimKepegawaianLayout>
  );
};

export default JenisSertifikasiReferensiPage;
