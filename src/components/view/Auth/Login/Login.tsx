import { useEffect } from "react";
import { useSsoLogin } from "@/hooks/useSSoLogin";
import environment from "@/config/environments";

const LoginPage = () => {
  const { isSsoLogin } = useSsoLogin();

  useEffect(() => {
    // Jika bukan proses SSO callback, redirect ke ePortal
    if (!isSsoLogin) {
      const eportalUrl = environment.EPORTAL_URL;
      if (eportalUrl) {
        window.location.href = eportalUrl;
      }
    }
  }, [isSsoLogin]);

  // Tampilkan loading spinner saat proses SSO atau redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-800/30 border-t-emerald-800 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-medium">
          {isSsoLogin ? "Memverifikasi sesi SSO..." : "Mengalihkan ke Portal Login..."}
        </p>
        <p className="text-gray-400 text-sm mt-1">Mohon tunggu sebentar</p>
      </div>
    </div>
  );
};

export default LoginPage;
