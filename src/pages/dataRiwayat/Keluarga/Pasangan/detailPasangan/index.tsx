import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailPasangan from "@/components/view/DataRiwayat/Keluarga/Pasangan/DetailPasangan";
import SimUserLayout from "@/layouts/SimUserLayout/SimUserLayout";
import { MdGroups } from "react-icons/md";

const DetailPasanganUserPage = () => {
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
            <BreadcrumbLink href="">Keluarga</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Pasangan</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Pasangan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailPasangan />
    </SimUserLayout>
  );
};

export default DetailPasanganUserPage;
