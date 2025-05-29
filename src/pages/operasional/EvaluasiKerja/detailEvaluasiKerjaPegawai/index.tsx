import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MdGroups } from "react-icons/md";
import DetailEvaluasiKerjaPegawai from "@/components/view/Operasional/EvaluasiKerja/DetailEvaluasiKerjaPegawai";
import SimUserLayout from "@/layouts/SimUserLayout/SimUserLayout";

const DetailEvaluasiKerjaPegawaiUserPage = () => {
  return (
    <SimUserLayout>
      <Breadcrumb className="mt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/gate/pegawai"
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
              Evaluasi Kerja
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Form Evaluasi Kerja</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailEvaluasiKerjaPegawai />
    </SimUserLayout>
  );
};

export default DetailEvaluasiKerjaPegawaiUserPage;
