import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JenisPengabdian from "@/components/view/admin/Referensi/Aktifitas/JenisPengabdian";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import JenisPengabdian from "@/view/admin/Referensi/Aktifitas/JenisPengabdian";
import React from "react";

const JenisPengabdianReferensiPage = () => {
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
            <BreadcrumbPage>Jenis Pengabdian</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <JenisPengabdian />
    </SimKepegawaianLayout>
  );
};

export default JenisPengabdianReferensiPage;
