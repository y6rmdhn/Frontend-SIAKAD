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
const DetailPermohonanIzinAdmin = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["permohonan-izin-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak ditemukan");
      const response = await adminServices.getPermohonanIzinDetail(id);
      return response.data;
    },
    enabled: !!id,
  });

  const izinData = responseData?.data;

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
        <Title title="Detail Permohonan Izin" />
        <CustomCard>
          <Skeleton className="h-10 w-48 float-right mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
          </div>
        </CustomCard>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Detail Permohonan Izin" />
        <p className="text-red-500">
          Gagal memuat data: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title
        title="Detail Permohonan Izin"
        subTitle={`No. Izin: ${izinData?.detail_data.no_izin || "-"}`}
      />

      <CustomCard>
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <Link to="/admin/operasional/cuti/permohonan-izin">
              <Button className="bg-[#3ABC67] hover:bg-[#32a95c]">
                <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 border border-gray-200 rounded-lg p-4">
            {/* Kolom Kiri */}
            <div className="space-y-2">
              <InfoItem label="Nama Pegawai" value={izinData?.nama_pegawai} />
              <InfoItem label="Unit Kerja" value={izinData?.unit_kerja} />
              <InfoItem label="Jenis Izin" value={izinData?.jenis_izin} />
              <InfoItem label="Lama Izin" value={izinData?.lama_izin} />
              <InfoItem
                label="Keperluan"
                value={izinData?.detail_data.keterangan_pemohon}
              />
              <InfoItem label="File Pendukung">
                <FilePreviewDialog
                  fileUrl={izinData?.detail_data.file_pendukung.url}
                  fileName={izinData?.detail_data.file_pendukung.nama_file}
                />
              </InfoItem>
            </div>
            {/* Kolom Kanan */}
            <div className="space-y-2">
              <InfoItem
                label="Tanggal Mulai"
                value={izinData?.detail_data.tgl_mulai}
              />
              <InfoItem
                label="Tanggal Selesai"
                value={izinData?.detail_data.tgl_selesai}
              />
              <InfoItem label="Status Pengajuan">
                <span
                  className={`capitalize px-2 py-1 text-xs rounded-md text-white ${getStatusColor(
                    izinData?.status_info.color
                  )}`}
                >
                  {izinData?.status_info.label}
                </span>
              </InfoItem>
              <InfoItem
                label="Tanggal Diajukan"
                value={izinData?.detail_data.tgl_diajukan}
              />
              <InfoItem
                label="Tanggal Disetujui"
                value={izinData?.detail_data.tgl_disetujui}
              />
              <InfoItem
                label="Disetujui Oleh"
                value={izinData?.detail_data.approved_by_name}
              />
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

export default DetailPermohonanIzinAdmin;
