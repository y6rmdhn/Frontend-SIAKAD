import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from '@/components/ui/breadcrumb'
import SimKepegawaianLayout from '@/layouts/SimKepegawaianLayout'
import Pegawai from '@/view/Pegawai'

const PegawaiPage = () => {
  return (
    <SimKepegawaianLayout title='Pegawai'>
      <div>
        <Breadcrumb className="mt-10 pl-4">
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Pegawai</BreadcrumbPage>
              </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pegawai />
      </div>
    </SimKepegawaianLayout>
  )
}

export default PegawaiPage
