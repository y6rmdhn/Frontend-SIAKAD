import { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";

type FormValues = {
  latitude: number | null;
  longitude: number | null;
  foto: File | null;
};

interface AbsensiModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  absenType?: "masuk" | "keluar";
  onAbsenSuccess: () => void;
  settingAbsensiId?: string; // opsional, kalau tidak ada → auto-detect
}

const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error("Invalid data URL");
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};

export function AbsensiModal({
  open,
  onOpenChange,
  absenType = "masuk",
  onAbsenSuccess,
  settingAbsensiId,
}: AbsensiModalProps) {
  const { handleSubmit, setValue, watch, reset } = useForm<FormValues>({
    defaultValues: { latitude: null, longitude: null, foto: null },
  });

  const webcamRef = useRef<Webcam>(null);
  const [locationError, setLocationError] = useState("");

  const { mutate: absenMasuk, isPending: isMasukPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataAbsensiMasuk(formData),
    onSuccess: () => {
      toast.success("Berhasil Melakukan Absensi Masuk");
      onAbsenSuccess();
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal absen masuk.");
    },
  });

  const { mutate: absenKeluar, isPending: isKeluarPending } = useMutation({
    mutationFn: (formData: FormData) =>
      postDosenServices.addDataAbsensiKeluar(formData),
    onSuccess: () => {
      toast.success("Berhasil Melakukan Absensi Keluar");
      onAbsenSuccess();
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal absen keluar.");
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.latitude || !data.longitude) {
      toast.error("Lokasi tidak terdeteksi", {
        description: "Harap tunggu atau aktifkan izin lokasi.",
      });
      return;
    }

    if (!data.foto) {
      toast.error("Foto belum diambil", {
        description: "Silakan ambil foto terlebih dahulu.",
      });
      return;
    }

    const formData = new FormData();

    // Hanya kirim setting_absensi_id kalau ada nilainya
    if (settingAbsensiId) {
      formData.append("setting_absensi_id", settingAbsensiId);
    }

    formData.append("latitude", data.latitude.toString());
    formData.append("longitude", data.longitude.toString());
    formData.append(
      absenType === "masuk" ? "foto_masuk" : "foto_keluar",
      data.foto,
      "absensi.jpg"
    );

    if (absenType === "masuk") {
      absenMasuk(formData);
    } else {
      absenKeluar(formData);
    }
  };

  const getLocation = () => {
    setLocationError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("latitude", position.coords.latitude);
          setValue("longitude", position.coords.longitude);
        },
        () => setLocationError("Gagal mendapatkan lokasi. Izinkan akses lokasi.")
      );
    } else {
      setLocationError("Geolocation tidak didukung browser ini.");
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setValue("foto", dataURLtoFile(imageSrc, "absensi.jpg"), {
          shouldValidate: true,
        });
      }
    }
  }, [setValue]);

  const { latitude, longitude, foto } = watch();
  const isProcessing = isMasukPending || isKeluarPending;

  useEffect(() => {
    if (open) {
      reset({ latitude: null, longitude: null, foto: null });
      getLocation();
    }
  }, [open, absenType]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Presensi {absenType === "masuk" ? "Masuk" : "Keluar"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 text-center my-4">
            <div>
              <p className="text-sm text-gray-500">
                Jam {absenType === "masuk" ? "Masuk" : "Keluar"}
              </p>
              <p className="font-semibold">
                {new Date().toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lokasi</p>
              {latitude && longitude ? (
                <p className="font-semibold text-xs">
                  {`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
                </p>
              ) : (
                <p className="font-semibold text-xs text-red-500">
                  {locationError || "Mencari lokasi..."}
                </p>
              )}
            </div>
          </div>

          <div className="w-full aspect-video bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
            {foto ? (
              <img
                src={URL.createObjectURL(foto)}
                alt="Captured"
                className="w-full h-full object-cover"
              />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                mirrored={true}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex justify-center mt-2 mb-4">
            {foto ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setValue("foto", null)}
              >
                Ambil Ulang
              </Button>
            ) : (
              <Button type="button" onClick={capture}>
                Ambil Foto
              </Button>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isProcessing || !foto}>
              {isProcessing ? "Menyimpan..." : "Simpan Presensi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}