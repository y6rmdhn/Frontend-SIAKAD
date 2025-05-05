import {
<<<<<<< HEAD
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import DetailPengelolaJurnal from "@/components/view/DataRiwayat/PelaksanaanPengabdian/PengelolaJurnal/DetailPengelolaJurnal/DetailPengelolaJurnal";
import React from "react";
import { MdGroups } from "react-icons/md";

const DetailPengelolaJurnalUserPage = () => {
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
            <BreadcrumbLink href="">Pelaksanaan Pengabdian</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Pengelola Jurnal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Pengelola Jurnal</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailPengelolaJurnal />
    </SimKepegawaianLayout>
  );
};

export default DetailPengelolaJurnalUserPage;
=======
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import DetailPengelolaJurnal from "@/view/DataRiwayat/PelaksanaanPengabdian/PengelolaJurnal/DetailPengelolaJurnal/DetailPengelolaJurnal";
  import React from "react";
  import { MdGroups } from "react-icons/md";
  
  const DetailPengelolaJurnalUserPage = () => {
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
              <BreadcrumbLink href="">Pelaksanaan Pengabdian</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="">Pengelola Jurnal</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail Pengelola Jurnal</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
  
        <DetailPengelolaJurnal/>
      </SimKepegawaianLayout>
    );
  };
  
  export default DetailPengelolaJurnalUserPage;
  
>>>>>>> 3f4a1e5 (your message)
