import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DetailOrganisasi from "@/components/view/DataRiwayat/PengembanganDiri/Organisasi/DetailOrganisasi/DetailOrganisasi";
import SimUserLayout from "@/layouts/SimUserLayout/SimUserLayout";
import { MdGroups } from "react-icons/md";

const DetailOrganisasiUserPage = () => {
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
            <BreadcrumbLink href="">Pengembangan Diri</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="">Organisasi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Organisasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailOrganisasi />
    </SimUserLayout>
  );
};

export default DetailOrganisasiUserPage;
