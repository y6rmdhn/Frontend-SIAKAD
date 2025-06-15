import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MdGroups } from "react-icons/md";
import DetailDataIzin from "@/components/view/Operasional/Pengajuan/Izin/DetailDataIzin";
import SimUserLayout from "@/layouts/SimUserLayout/SimUserLayout";

const DetailDataIzinUserPage = () => {
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
            <BreadcrumbLink href="/gate/pegawai">Operasional</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gate/pegawai">
              Izin
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Permohonan Izin</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailDataIzin />
    </SimUserLayout>
  );
};

export default DetailDataIzinUserPage;
