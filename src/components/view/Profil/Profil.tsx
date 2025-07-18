import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MdOutlineViewModule, MdOutlinePhotoLibrary } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";

import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearUserData } from "@/store/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authServices from "@/services/auth.services";
import { toast } from "sonner";
import { ILogout } from "@/types/auth";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import dosenServices from "@/services/dosen.services";
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";
import postDosenServices from "@/services/create.dosen.services";

import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { fileSchemaNew } from "../DataRiwayat/Kualifikasi/PendidikanFormal/DetailPendidikanFormal/DetailPendidikanFormal";
import environment from "@/config/environments";

const passwordChangeSchema = z
  .object({
    password_lama: z.string().min(1, "Password lama harus diisi."),
    password_baru: z.string().min(6, "Password baru minimal 6 karakter."),
    password_baru_confirmation: z
      .string()
      .min(1, "Konfirmasi password baru harus diisi."),
  })
  .refine((data) => data.password_baru === data.password_baru_confirmation, {
    message: "Konfirmasi password baru tidak cocok.",
    path: ["password_baru_confirmation"],
  });

const profileUpdateSchema = z.object({
  email_pegawai: z
    .string()
    .email("Email tidak valid.")
    .or(z.literal(""))
    .optional(),
  file_foto_url: fileSchemaNew.optional(),
});
interface UserProfile {
  email: string;
  name?: string;
  photo_url?: string;
  file_foto?: string;
  file_foto_url?: string;
  email_pribadi?: string;
}

const Profil = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const role = useSelector((state: RootState) => state.user.role);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChangeProfileModalOpen, setIsChangeProfileModalOpen] =
    useState(false);

  const passwordForm = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      password_lama: "",
      password_baru: "",
      password_baru_confirmation: "",
    },
  });

  const profileForm = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      email_pegawai: "",
      file_foto_url: undefined,
    },
  });

  const { data: profileData, isLoading: isProfileLoading } =
    useQuery<UserProfile | null>({
      queryKey: ["profile"],
      queryFn: async () => {
        if (!accessToken) return null;

        try {
          let response;
          if (role === "Admin") {
            response = await adminServices.getProfileAdmin();
          } else {
            response = await dosenServices.getProfileUser();
          }
          console.log(response.data);

          return response.data.data;
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
          toast.error("Gagal memuat data profil.");
          return null;
        }
      },
    });

  useEffect(() => {
    if (profileData) {
      profileForm.reset({
        email_pegawai: profileData.email,
        file_foto_url: undefined,
      });
    }
  }, [profileData, profileForm]);

  // Mutation untuk ganti password
  const { mutate: changePasswordMutation, isPending: isChangingPassword } =
    useMutation({
      mutationFn: async (data: z.infer<typeof passwordChangeSchema>) => {
        if (role === "admin") {
          return potsReferensiServices.changePasswordAdmin(data);
        } else if (role === "dosen") {
          return postDosenServices.changePasswordUser(data);
        }
        throw new Error("Peran tidak valid untuk mengganti kata sandi.");
      },
      onSuccess: (response) => {
        toast.success(response.data.message || "Kata sandi berhasil diubah.");
        setIsChangePassword(false);
        passwordForm.reset();
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Gagal mengganti kata sandi."
        );
      },
    });

  // Mutation untuk update profil
  const { mutate: updateProfileMutation, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: async (data: FormData) => {
        if (role === "Admin") {
          return potsReferensiServices.updateProfileAdmin(data);
        } else {
          return postDosenServices.updateProfileUser(data);
        }
      },
      onSuccess: (response) => {
        toast.success(response.data.message || "Profil berhasil diperbarui.");
        setIsChangeProfileModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        queryClient.invalidateQueries({ queryKey: ["profile-header"] });
        queryClient.invalidateQueries({ queryKey: ["profile-header-desktop"] });
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Gagal memperbarui profil."
        );
        console.log(error);
      },
    });

  // Mutation untuk logout
  const { mutate: logoutMutation, isPending: isLoggingOut } = useMutation({
    mutationFn: (data: ILogout) => authServices.logout(data),
    onSuccess: (response) => {
      localStorage.removeItem("user");
      dispatch(clearUserData());
      navigate("/login");
      toast.success(response.data.message || "Berhasil keluar.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal keluar.");
    },
  });

  if (!accessToken) return <Navigate to="/login" />;

  const handleLogout = () => {
    if (!accessToken || typeof accessToken !== "string") {
      toast.error("Token akses tidak valid. Silakan login kembali.");
      return;
    }
    logoutMutation({ accessToken });
  };

  const onSubmitPasswordChange = (
    values: z.infer<typeof passwordChangeSchema>
  ) => {
    changePasswordMutation(values);
  };

  const onSubmitProfileUpdate = (
    values: z.infer<typeof profileUpdateSchema>
  ) => {
    const formData = new FormData();

    if (values.email_pegawai) {
      formData.append("email_pegawai", values.email_pegawai);
    }

    if (values.file_foto_url && values.file_foto_url.length > 0) {
      formData.append("file_foto", values.file_foto_url[0]);
    }

    if (!formData.entries().next().done) {
      updateProfileMutation(formData);
    } else {
      toast.info("Tidak ada perubahan untuk disimpan.");
      return;
    }
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
                    src="/images/logo/uika-logo.jpg"
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
                  <Button className="bg-[#00325B]/50 hover:bg-[#00325B]/70 cursor-pointer rounded-md px-4 py-2 flex items-center gap-2">
                    <MdOutlineViewModule className="text-2xl text-white" />{" "}
                    Daftar Modul
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className="bg-[#00325B]/50 hover:bg-[#00325B]/70 cursor-pointer rounded-md px-4 py-2 flex items-center gap-2"
                  disabled={isLoggingOut}
                >
                  <IoExit className="text-2xl text-white" />{" "}
                  {isLoggingOut ? "Keluar..." : "Keluar"}
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
                  <div className="ml-2 w-[120px] h-[120px] rounded-full bg-gray-300 flex items-center justify-center text-4xl text-white mb-3 overflow-hidden">
                    {/* --- START: FIX 5 --- */}
                    {/* Menggunakan file_foto_url dan pengecekan yang aman */}
                    {profileData?.file_foto_url ? (
                      <img
                        src={`${environment.API_IMAGE_URL}${profileData.file_foto_url}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/120x120/cccccc/333333?text=User";
                          e.currentTarget.className =
                            "w-full h-full object-cover";
                        }}
                      />
                    ) : (
                      <FaUser className="w-15 h-15" />
                    )}
                    {/* --- END: FIX 5 --- */}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Dialog
                      open={isChangeProfileModalOpen}
                      onOpenChange={setIsChangeProfileModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-[#3A6BF2] text-xs sm:text-sm text-white hover:bg-[#3A6BF2]/90"
                          onClick={() => {
                            profileForm.reset({
                              email_pegawai: profileData?.email || "",
                              file_foto_url: undefined,
                            });
                          }}
                        >
                          <MdOutlinePhotoLibrary />
                          Ganti Foto Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Update Profile Photo</DialogTitle>
                          <DialogDescription>
                            Upload a new profile picture.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...profileForm}>
                          <form
                            onSubmit={profileForm.handleSubmit(
                              onSubmitProfileUpdate
                            )}
                            className="grid gap-4 py-4"
                          >
                            <FormFieldInput
                              inputStyle="w-full"
                              position={true}
                              label="Email Pegawai"
                              placeholder="optional"
                              form={profileForm}
                              name="email_pegawai"
                              required={false}
                            />
                            {/* --- START: FIX 6 --- */}
                            {/* Mengubah nama field menjadi file_foto_url */}
                            <FormFieldInputFile
                              label="File Foto"
                              name="file_foto_url"
                              description="Masukan Foto"
                            />
                            {/* --- END: FIX 6 --- */}
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="outline">
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button
                                type="submit"
                                disabled={isUpdatingProfile}
                                className="bg-[#00325B] hover:bg-[#00325B]/90 text-white"
                              >
                                {isUpdatingProfile
                                  ? "Saving..."
                                  : "Save changes"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
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
                      value={
                        profileData?.email_pribadi ||
                        (isProfileLoading ? "Memuat..." : "Tidak tersedia")
                      }
                      readOnly
                      className="border border-gray-300 p-2 rounded focus:outline-none bg-gray-100 w-full sm:w-70 text-xs sm:text-sm"
                    />
                    {profileData?.email_pribadi ? (
                      <Label className="text-[#11A60F] mt-1 text-xs sm:text-sm">
                        Email sudah diverifikasi
                      </Label>
                    ) : (
                      <Label className="text-red-500 mt-1 text-xs sm:text-sm">
                        Email belum diverifikasi
                      </Label>
                    )}
                  </div>
                </div>
                <div>
                  <Label className=" font-semibold text-sm sm:text-base">
                    Ganti Kata Sandi
                  </Label>
                  <Button
                    onClick={() => setIsChangePassword(!isChangePassword)}
                    className="bg-[#23CD0C] text-white px-4 py-2 rounded-md hover:bg-green-700 transition p-2 mt-2 text-xs sm:text-sm flex items-center gap-1"
                  >
                    ✔ Ganti Kata Sandi
                  </Button>
                </div>
                {isChangePassword && (
                  <Form {...passwordForm}>
                    <form
                      onSubmit={passwordForm.handleSubmit(
                        onSubmitPasswordChange
                      )}
                      className="flex flex-col gap-4 mt-4"
                    >
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        label="Password Lama"
                        form={passwordForm}
                        name="password_lama"
                        type="password"
                        required={true}
                      />
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        label="Password Baru"
                        form={passwordForm}
                        name="password_baru"
                        type="password"
                        required={true}
                      />
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        label="Konfirmasi Password Baru"
                        form={passwordForm}
                        name="password_baru_confirmation"
                        type="password"
                        required={true}
                      />
                      <Button
                        type="submit"
                        disabled={isChangingPassword}
                        className="bg-[#00325B] hover:bg-[#00325B]/90 text-white rounded-md px-4 py-2"
                      >
                        {isChangingPassword
                          ? "Mengganti..."
                          : "Simpan Kata Sandi"}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
