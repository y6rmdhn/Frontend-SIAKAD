import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";
import { MdOutlineViewModule } from "react-icons/md";
import { HiX } from "react-icons/hi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearUserData } from "@/store/userSlice";
import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/auth.services";
import { toast } from "sonner";
import { ILogout } from "@/types/auth";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa6";

const Profil = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: (data: ILogout) => authServices.logout(data),
    onSuccess: (response) => {
      localStorage.removeItem("user");
      dispatch(clearUserData());
      navigate("/login");
      toast.success(response.data.message);
    },
  });

  if (!accessToken) return <Navigate to="/login" />;

  const handleLogout = () => {
    if (!accessToken || typeof accessToken !== "string") {
      toast.error("Please login again.");
      return;
    }

    mutate({ accessToken });
  };

  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      if (photo) URL.revokeObjectURL(photo);
      setPhoto(photoURL);
    }
  };

  const handlePhotoRemove = () => {
    if (!photo) {
      return;
    }
    URL.revokeObjectURL(photo);
    setPhoto(null);
  };

  return (
    <div className="w-full md:px-20 pt-10 pb-6 font-roboto min-h-[100vh] relative flex justify-center items-start">
      <div className="w-full max-w-[700px] md:bg-white/40 rounded-lg sm:mx-4">
        <div className="bg-white md:m-5 rounded-lg overflow-hidden lg:max-h-auto">
          <div className="relative">
            <div className="h-44 md:h-36 flex overflow-hidden bg-[#FDA31A]" />

            <div className="absolute flex-col py-5 md:py-0 md:flex-row top-0 w-full h-full px-4 sm:px-10 flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="bg-white p-2 rounded-2xl sm:rounded-3xl overflow-hidden">
                  <img
                    src="/images/logo/logo-uika-login.webp"
                    alt="logo-uika"
                    className="w-10 md:w-14 lg:w-16"
                  />
                </div>
                <div className="flex flex-col text-white">
                  <Label className="text-sm">Sistem Informasi Akademik</Label>
                  <Label className="text-sm font-bold">
                    UNIVERSITAS IBN KHALDUN
                  </Label>
                </div>
              </div>

              <div className="flex gap-3 items-center md:flex-col md:items-end lg:flex-row lg:items-center">
                <Link to={"/"}>
                  <Button className="bg-[#00325B]/50 hover:bg-[#00325B]/70 cursor-pointer">
                    <MdOutlineViewModule className="text-2xl text-white" />{" "}
                    Daftar Modul
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className="bg-[#00325B]/50 hover:bg-[#00325B]/70 cursor-pointer"
                >
                  <IoExit className="text-2xl text-white" /> Keluar
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-[#F4F3F3] h-full">
            <div className="grid grid-rows px-4 sm:px-7 pb-8 lg:mb-0 lg:grid-cols h-full">
              <div className="w-full h-full pt-5 order-2 lg:order-1 flex flex-col gap-3">
                <Label className="font-semibold text-base sm:text-xl">
                  Foto Profile
                </Label>
                <div className="sm:px-7">
                  <div className="ml-3 sm:ml-14 w-[120px] h-[120px] rounded-full bg-gray-300 flex items-center justify-center text-4xl text-white mb-3 overflow-hidden">
                    {photo ? (
                      <img
                        src={photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="w-15 h-15" />
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handlePhotoChange}
                    />

                    <Button
                      className="bg-[#3A6BF2] text-xs sm:text-sm"
                      onClick={triggerFileInput}
                    >
                      <MdOutlinePhotoLibrary />
                      Ganti Foto
                    </Button>

                    <Button
                      className="bg-[#E72D30] text-xs sm:text-sm"
                      onClick={handlePhotoRemove}
                    >
                      <HiX />
                      Hapus Foto
                    </Button>
                  </div>
                </div>
                <Label className="font-semibold text-sm sm:text-base">
                  Email Anda Sudah diverifikasi
                </Label>
                <Label className="text-xs sm:text-sm">
                  jika ingin mengubah email, silahkan hubungi admin perguruan
                  tinggi
                </Label>
                <div className="flex flex-col sm:flex-row items-start gap-3 my-2">
                  <Label className="pt-2 whitespace-nowrap text-xs sm:text-sm">
                    Email Pribadi <span className="text-red-600">*</span>
                  </Label>
                  <div className="flex flex-col w-full sm:w-70">
                    <Input
                      type="email"
                      value="azkanyan@gmail.com"
                      readOnly
                      className="border border-gray-300 p-2 rounded focus:outline-none bg-gray-100 w-full sm:w-70 text-xs sm:text-sm"
                    />
                    <Label className="text-[#11A60F] mt-1 text-xs sm:text-sm">
                      Email sudah diverifikasi
                    </Label>
                  </div>
                </div>
                <div>
                  <Label className="text-base font-semibold text-sm sm:text-base">
                    Ganti Kata Sandi
                  </Label>
                  <Link to="/forget-password">
                    <Button className="bg-[#23CD0C] text-white px-4 py-2 rounded-md hover:bg-green-700 transition p-2 mt-2 text-xs sm:text-sm">
                      ✔ Ganti Kata Sandi
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
