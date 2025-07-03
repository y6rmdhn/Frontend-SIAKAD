import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// UI Components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Custom Components
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

// Services
import adminServices from "@/services/admin.services";

// --- Sub-Component untuk Pratinjau File ---
const FilePreviewDialog = ({
  fileUrl,
  fileName,
}: {
  fileUrl?: string;
  fileName?: string;
}) => {
  if (!fileUrl) {
    return <span>-</span>;
  }

  const isImage = /\.(jpeg|jpg|png|gif)$/i.test(fileName || fileUrl);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-auto text-blue-600 hover:underline hover:text-blue-800 text-sm font-medium"
        >
          Lihat File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Pratinjau File</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isImage ? (
            <img
              src={fileUrl}
              alt="Pratinjau File"
              className="w-full h-auto rounded-md object-contain max-h-[70vh]"
            />
          ) : (
            <div className="text-center">
              <p className="mb-4">
                Pratinjau tidak tersedia. Silakan unduh untuk melihat file.
              </p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button>Unduh File</Button>
              </a>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// --- Komponen Utama ---
const DetailPermohonanCutiAdmin = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["permohonan-cuti-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak ditemukan");
      const response = await adminServices.getPermohonanCutiDetail(id);
      return response.data;
    },
    enabled: !!id,
  });

  const cutiData = responseData?.data;
  const timelineData = responseData?.timeline || [];

  const getStatusColor = (color?: string) => {
    switch (color) {
      case "success":
        return "bg-green-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Detail Permohonan Cuti" />
        <CustomCard>
          <Skeleton className="h-10 w-48 float-right mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-40 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </CustomCard>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Detail Permohonan Cuti" />
        <p className="text-red-500">
          Gagal memuat data: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title
        title="Detail Permohonan Cuti"
        subTitle={`No. Urut: ${cutiData?.detail_data.no_urut_cuti || "-"}`}
      />

      <CustomCard>
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <Link to="/admin/operasional/cuti/permohonan-cuti">
              <Button className="bg-[#3ABC67] hover:bg-[#32a95c]">
                <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* KOLOM KIRI & TENGAH: DETAIL DATA */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 border border-gray-200 rounded-lg p-4">
              {/* Kolom Kiri */}
              <div className="space-y-2">
                <InfoItem label="Nama Pegawai" value={cutiData?.nama_pegawai} />
                <InfoItem label="Unit Kerja" value={cutiData?.unit_kerja} />
                <InfoItem label="Jenis Cuti" value={cutiData?.jenis_cuti} />
                <InfoItem label="Lama Cuti" value={cutiData?.lama_cuti} />
                <InfoItem
                  label="Tanggal Mulai"
                  value={cutiData?.detail_data.tgl_mulai}
                />
                <InfoItem
                  label="Tanggal Selesai"
                  value={cutiData?.detail_data.tgl_selesai}
                />
              </div>
              {/* Kolom Kanan */}
              <div className="space-y-2">
                <InfoItem label="Keperluan Cuti" value={cutiData?.keperluan} />
                <InfoItem
                  label="Alamat Selama Cuti"
                  value={cutiData?.detail_data.alamat}
                />
                <InfoItem
                  label="No. Telepon"
                  value={cutiData?.detail_data.no_telp}
                />
                <InfoItem label="Status Pengajuan">
                  <span
                    className={`capitalize px-2 py-1 text-xs rounded-md text-white ${getStatusColor(
                      cutiData?.status_info.color
                    )}`}
                  >
                    {cutiData?.status_info.label}
                  </span>
                </InfoItem>
                <InfoItem
                  label="Disetujui Oleh"
                  value={cutiData?.detail_data.approved_by_name}
                />
                <InfoItem label="File Pendukung">
                  <FilePreviewDialog
                    fileUrl={cutiData?.detail_data.file_cuti.url}
                    fileName={cutiData?.detail_data.file_cuti.nama_file}
                  />
                </InfoItem>
              </div>
            </div>

            {/* KOLOM KANAN: TIMELINE */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4 text-center text-gray-700">
                Timeline Proses
              </h3>
              <div className="relative pl-4">
                {/* Garis vertikal */}
                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                {timelineData.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 mb-5 relative"
                  >
                    <div
                      className={`z-10 flex-shrink-0 w-4 h-4 rounded-full mt-1 ${
                        item.is_completed ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      {item.is_completed && (
                        <FaCheckCircle className="text-white text-xs" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500">{item.tanggal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

// Komponen kecil untuk menampilkan item info
const InfoItem = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | null;
  children?: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row gap-2 justify-between border-b py-2">
    <Label className="font-semibold text-sm text-[#2572BE] shrink-0 w-48">
      {label}
    </Label>
    {children ? (
      <div className="text-sm font-medium text-right">{children}</div>
    ) : (
      <Label className="text-sm font-medium text-right">{value || "-"}</Label>
    )}
  </div>
);

export default DetailPermohonanCutiAdmin;
