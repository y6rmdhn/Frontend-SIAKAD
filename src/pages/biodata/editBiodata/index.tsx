import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EditBiodataUser from "@/components/view/Biodata/editBiodata/editBiodata";
import SimUserLayout from "@/layouts/SimUserLayout/SimUserLayout";

const EditBiodataPageUser = () => {
  return (
    <SimUserLayout>
      <Breadcrumb className="mt-10 pl-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dasboard">Pegawai</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Pegawai</BreadcrumbPage>
          </BreadcrumbItem>
            <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Data Pegawai</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EditBiodataUser />
    </SimUserLayout>
  );
};

export default EditBiodataPageUser;
