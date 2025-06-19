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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";

// Tipe untuk data form
type FormValues = {
  latitude: number | null;
  longitude: number | null;
  foto: File | null;
  keterangan: string;
};

// Tipe untuk props komponen
interface AbsensiModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  absenType?: "masuk" | "keluar";
  onAbsenSuccess: () => void;
}

// Tipe untuk koordinat
type Coords = {
  lat: number;
  lng: number;
};

const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid data URL");
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const getDistanceInMeters = (coords1: Coords, coords2: Coords): number => {
  const R = 6371e3; // Radius bumi dalam meter
  const lat1 = (coords1.lat * Math.PI) / 180;
  const lat2 = (coords2.lat * Math.PI) / 180;
  const deltaLat = ((coords2.lat - coords1.lat) * Math.PI) / 180;
  const deltaLon = ((coords2.lng - coords1.lng) * Math.PI) / 180;
  const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export function AbsensiModal({
                               open,
                               onOpenChange,
                               absenType = "masuk",
                               onAbsenSuccess,
                             }: AbsensiModalProps) {
  const { handleSubmit, setValue, watch, reset } = useForm<FormValues>({
    defaultValues: {
      latitude: null,
      longitude: null,
      foto: null,
      keterangan: "Melakukan Absensi di area Universitas Ibn Khaldun Bogor",
    },
  });

  const webcamRef = useRef<Webcam>(null);
  const [locationError, setLocationError] = useState("");

  const targetLocation: Coords = { lat: -6.55989, lng: 106.79296 };
  const allowedRadius = 200; // dalam meter

  const { mutate: absenMasuk, isPending: isMasukPending } = useMutation({
    mutationFn: (formData: FormData) =>
        postDosenServices.addDataAbsensiMasuk(formData),
    onSuccess: () => {
      toast.success("Berhasil Melakukan Absensi Masuk");
      onAbsenSuccess();
      onOpenChange(false);
    },
    onError: (error: any) => {
      const errorMessage =
          error.response?.data?.message || "Gagal absen masuk.";
      toast.error(errorMessage);
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
      const errorMessage =
          error.response?.data?.message || "Gagal absen keluar.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.latitude || !data.longitude) {
      toast.error("Lokasi tidak terdeteksi", {
        description: "Harap tunggu atau aktifkan izin lokasi.",
      });
      return;
    }

    const userLocation: Coords = { lat: data.latitude, lng: data.longitude };
    const distance = getDistanceInMeters(targetLocation, userLocation);

    if (distance > allowedRadius) {
      toast.error("Gagal Absen", { description: `Anda berada di luar radius presensi (${Math.round(distance)} meter).` });
      return;
    }

    if (!data.foto) {
      toast.error("Foto belum diambil", {
        description: "Silakan ambil foto terlebih dahulu.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("latitude", data.latitude.toString());
    formData.append("longitude", data.longitude.toString());
    formData.append("foto", data.foto);
    formData.append("keterangan", data.keterangan);

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
          (_error) => { // Menggunakan _error untuk menandakan parameter tidak digunakan
            setLocationError("Gagal mendapatkan lokasi. Izinkan akses lokasi.");
          }
      );
    } else {
      setLocationError("Geolocation tidak didukung browser ini.");
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) { // Pemeriksaan null untuk webcamRef.current
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const imageFile = dataURLtoFile(imageSrc, "absensi.jpg");
        setValue("foto", imageFile, { shouldValidate: true });
      }
    }
  }, [webcamRef, setValue]);

  const { latitude, longitude, keterangan, foto } = watch();
  const isProcessing = isMasukPending || isKeluarPending;

  useEffect(() => {
    if (open) {
      const defaultKeterangan =
          absenType === "masuk"
              ? "Melakukan Absensi di area Universitas Ibn Khaldun Bogor"
              : "Selesai mengajar";

      reset({
        latitude: null,
        longitude: null,
        foto: null,
        keterangan: defaultKeterangan,
      });
      getLocation();
    }
  }, [open, reset, absenType]); // Menyatukan dua useEffect menjadi satu

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
                <p className="text-sm text-gray-500">Jam Masuk</p>
                <p className="font-semibold">
                  {new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lokasi</p>
                {latitude && longitude ? ( // Memeriksa latitude dan longitude
                    <p className="font-semibold text-xs">{`${latitude.toFixed(
                        4
                    )}, ${longitude.toFixed(4)}`}</p>
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

            <div className="flex justify-center mt-2">
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

            <div className="mt-4">
              <label htmlFor="keterangan" className="text-sm font-medium">
                Keterangan
              </label>
              <Input id="keterangan" value={keterangan} readOnly={true} />
            </div>

            <DialogFooter className="mt-4">
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