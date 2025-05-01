import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailAnggotaProfesi from "@/components/view/DataRiwayat/Penunjang/AnggotaProfesi/DetailAnggotaProfesi/DetailAnggotaProfesi";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import React from "react";
import { MdGroups } from "react-icons/md";

const DetailAnggotaProfesiUserPage = () => {
  return (
    <SimKepegawaianLayout isNavbarUser={true}>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/dasboard"
              className="flex items-center gap-2"
            >
              <MdGroups className="w-6 h-6" />
              Pegawai
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Data Riwayat</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Penunjang</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Anggota Profesi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Anggota Profesi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailAnggotaProfesi/>
    </SimKepegawaianLayout>
  );
};

export default DetailAnggotaProfesiUserPage;
