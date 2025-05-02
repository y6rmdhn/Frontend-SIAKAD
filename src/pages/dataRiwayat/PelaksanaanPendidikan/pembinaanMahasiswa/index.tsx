import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PembinaanMahasiswa from "@/components/view/DataRiwayat/PelaksanaanPendidikan/PembinaanMahasiswa";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
// import PembinaanMahasiswa from "@/view/DataRiwayat/PelaksanaanPendidikan/PembinaanMahasiswa";
import React from "react";
import { MdGroups } from "react-icons/md";

const PembinaanMahasiswaUserPage = () => {
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
            <BreadcrumbLink href="">Pelaksanaan Pendidikan</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pembinaan Mahasiswa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PembinaanMahasiswa />
    </SimKepegawaianLayout>
  );
};

export default PembinaanMahasiswaUserPage;
