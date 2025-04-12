import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import ShiftKerja from "@/view/admin/Operasional/Kehadiran/ShiftKerja";
import React from "react";

const ShiftKerjaPage = () => {
  return (
    <SimKepegawaianLayout>
      <div>
        <Breadcrumb className="mt-10 pl-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/gate/pegawai">Operasional</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/gate/pegawai">Kehadiran</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Shift Kerja</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ShiftKerja />
      </div>
    </SimKepegawaianLayout>
  );
};

export default ShiftKerjaPage;
