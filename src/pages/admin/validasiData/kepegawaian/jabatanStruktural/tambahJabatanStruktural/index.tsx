import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SimKepegawaianLayout from "@/layouts/SimKepegawaianLayout";
import TambahJabatanStruktural from "@/components/view/admin/ValidasiData/Kepegawaian/JabatanStruktural/TambahJabatanStruktural";

const TambahJabatanStrukturalPage = () => {
    return (
        <SimKepegawaianLayout>
            <Breadcrumb className="mt-10">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Validasi Data</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Kepegawaian</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/gate/pegawai">Jabatan Struktural</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Tambah Jabatan Struktural</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <TambahJabatanStruktural />
        </SimKepegawaianLayout>
    );
};

export default TambahJabatanStrukturalPage;
