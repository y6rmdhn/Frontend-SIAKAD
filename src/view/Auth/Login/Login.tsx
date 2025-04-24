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

const LoginPage = () => {
  const { form, handleLogin, handleVisiblePassword, visiblePassword } =
    useLogin();

  return (
    <main className="min-h-screen flex overflow-x-hidden">
      {/* Bagian Gambar - Sebelah Kiri */}
      <div className="hidden md:flex md:w-[57%] bg-blue-800 relative items-center justify-center">
        <img
          src="/images/UIKAFIX1.png"
          alt="Kampus UIKA"
          className="absolute inset-0 w-full h-full object-cover opacity-80 max-w-full"
        />
        <div className="relative z-10 p-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Selamat Datang</h2>
          <p className="text-xl mb-2">
            Sistem Informasi Management Kepegawaian
          </p>
          <p className="text-lg">Universitas Ibn Khaldun Bogor</p>
        </div>
      </div>

      {/* Bagian Form - Sebelah Kanan */}
      <div className="w-full md:w-[43%] flex items-center justify-center p-6 sm:p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo kecil di atas form */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo/uika-logo.jpg"
              alt="Logo UIKA"
              className="h-20 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-center mb-8">
            Masuk dan Verifikasi
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="nomorIndukPegawai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Induk Pegawai</FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>Kata Sandi</FormLabel>
                    <FormControl className="relative">
                      <div className="flex items-center">
                        <Input
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
                              <FaLockOpen />
                            ) : (
                              <FaLock />
                            )}
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    // checked={rememberMe}
                    // onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Ingat Saya
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Lupa Kata Sandi?
                  </a>
                </div>
              </div>

              <div className="pt-4 mt-6 border-gray-200">
                <Button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-800 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Masuk
                </Button>
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
    </main>
  );
};

export default LoginPage;
