import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex">
      {/* Bagian Gambar - Sebelah Kiri */}
      <div className="md:w-[57%] bg-blue-800 relative hidden md:flex items-center justify-center">
        <img
          src="/images/UIKAFIX1.png"
          alt="Kampus UIKA"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
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
      <div className="w-full md:w-[43%] flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo kecil di atas form */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo/uika-logo.jpg"
              alt="Logo UIKA"
              className="h-50 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-center mb-30">
            Masuk dan Verifikasi
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Email / NIM / NIP
              </label>
              <input
                type="text"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email/NIM/NIP"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700"
              >
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
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

            <div className="pt-4 mt-10 border-gray-200">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-800 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Masuk
              </button>
            </div>
          </form>

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
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img
                  src="/images/logo/logo-google.png"
                  alt="Google Logo"
                  className="h-6 mr-2"
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
