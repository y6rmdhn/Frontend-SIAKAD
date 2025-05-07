import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailOrasiIlmiah from "@/components/view/DataRiwayat/PelaksanaanPendidikan/OrasiIlmiah/DetailOrasiIlmiah";
import SimUserLayout from "@/layouts/SimUserLayout/SimUserLayout";
// import DetailOrasiIlmiah from "@/view/DataRiwayat/PelaksanaanPendidikan/OrasiIlmiah/DetailOrasiIlmiah/DetailOrasiIlmiah";
import React from "react";
import { MdGroups } from "react-icons/md";

const DetailOrasiIlmiahUserPage = () => {
  return (
    <SimUserLayout>
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
            <BreadcrumbLink href="">Pelaksanaan Pendidikan</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Orasi Ilmiah</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Orasi Ilmiah</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailOrasiIlmiah />
    </SimUserLayout>
  );
};

export default DetailOrasiIlmiahUserPage;
