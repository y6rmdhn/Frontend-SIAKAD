import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import useLogin from "@/hooks/useLogin";
import { Link } from "react-router-dom";
import captchaServices from "@/services/captcha.services";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import SlideCaptcha from "@/components/blocks/Captcha";

const LoginPage = () => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [captchaId, setCaptchaId] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const {
    form,
    handleLogin,
    handleVisiblePassword,
    visiblePassword,
    setCaptchaVisible,
    captchaVisible,
  } = useLogin();

  const nip = form.watch("nip");
  const password = form.watch("password");
  const isFormFilled = nip && password;

  const { data, isLoading } = useQuery({
    queryKey: ["generate-captcha"],
    queryFn: async () => {
      try {
        const response = await captchaServices.generateCaptcha();
        if (response.data && response.data.data) {
          setCaptchaId(response.data.data.captcha_id);
          return response.data.data;
        }
        return null;
      } catch (error) {
        console.error("Error fetching captcha:", error);
        return null;
      }
    },
  });

  console.log(data);

  useEffect(() => {
    if (captchaId) {
      form.setValue("captcha_id", captchaId);
    }
  }, [captchaId, form]);

  useEffect(() => {
    form.setValue("slider_position", sliderPosition);
  }, [sliderPosition, form]);

  return (
    <div className="min-h-screen font-roboto flex overflow-x-hidden text-black-uika">
      {/* Bagian Gambar - Sebelah Kiri */}
      <div className="hidden md:flex md:w-[55%] bg-blue-800 relative items-center justify-center">
        <img
          src="/images/background/Simpeg_Uika_Masjid.webp"
          alt="Kampus UIKA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="/images/logo/Simpeg_Uika_Logo.webp"
          alt="Logo Kampus UIKA"
          className="absolute top-10 w-72 opacity-70"
        />
      </div>

      {/* Bagian Form - Sebelah Kanan */}
      <div className="w-full md:w-[45%] flex items-center relative justify-center p-6 sm:p-8 bg-white">
        <div className="absolute top-0 left-6 flex items-center">
          <img
            src="/images/logo/Simpeg_Uika_Logo.webp"
            alt="Logo Kampus UIKA"
            className="w-20"
          />
          <img
            src="/images/logo/uit (2) 1.webp"
            alt="Logo simpeg kepegawaian"
            className="w-16 h-16"
          />
        </div>
        <div className="w-full max-w-md">
          {/* Logo kecil di atas form */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo/logo-uika-login.webp"
              alt="Logo UIKA"
              className="object-contain w-20"
            />
          </div>

          <h1 className="text-2xl font-semibold text-center mb-8 text-[#1a1a1a]">
            Masuk dan Verifikasi
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">NIP</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#F9F9F9] h-12 placeholder:text-xs text-xs sm:text-sm sm:placeholder:text-sm"
                        type="text"
                        placeholder="Nomor Induk Pegawai"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Kata Sandi</FormLabel>
                    <FormControl className="relative">
                      <div className="flex items-center">
                        <Input
                          className="bg-[#F9F9F9] h-12 placeholder:text-xs text-xs sm:text-sm sm:placeholder:text-sm"
                          type={
                            visiblePassword.passwordConfirmation
                              ? "text"
                              : "password"
                          }
                          placeholder="Kata Sandi"
                          {...field}
                        />
                        <div className="absolute right-3 text-gray-500">
                          <div
                            onClick={() =>
                              handleVisiblePassword("passwordConfirmation")
                            }
                            className="cursor-pointer"
                          >
                            {visiblePassword.passwordConfirmation ? (
                              <FaLockOpen className="w-3! h-3! sm:w-4! sm:h-4!" />
                            ) : (
                              <FaLock className="w-3! h-3! sm:w-4! sm:h-4!" />
                            )}
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hidden fields for captcha data */}
              <FormField
                control={form.control}
                name="captcha_id"
                render={({ field }) => <Input type="hidden" {...field} />}
              />

              <FormField
                control={form.control}
                name="slider_position"
                render={({ field }) => <Input type="hidden" {...field} />}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-xs sm:text-sm text-gray-900"
                  >
                    Ingat Saya
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forget-password"
                    className="hover:underline text-xs sm:text-sm text-green-uika"
                  >
                    Lupa Kata Sandi?
                  </Link>
                </div>
              </div>

              {/* Captcha Component */}
              <div className="flex justify-center mb-6">
                {!captchaVisible ? (
                  <Button
                    disabled={!isFormFilled}
                    onClick={() => setCaptchaVisible(true)}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-800 hover:bg-green-800"
                  >
                    Verifikasi
                  </Button>
                ) : (
                  <div className="absolute top-52 z-50">
                    <SlideCaptcha
                      backgroundUrl={data?.background_url}
                      sliderUrl={data?.slider_url}
                      sliderY={data?.slider_y}
                      captchaId={data?.captcha_id}
                      onChangePosition={setSliderPosition}
                    />
                  </div>
                )}
              </div>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 mt-5 mb-5">
                  atau
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img
                  src="/images/logo/logo-google.png"
                  alt="Google Logo"
                  className="h-6 w-6 mr-2"
                />
                <span>Masuk dengan Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
