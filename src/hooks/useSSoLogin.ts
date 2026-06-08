import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userSlice";
import { toast } from "sonner";
import environment from "@/config/environments";

export function useSsoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const token = queryParams.get("token") || "";
  const role_id = queryParams.get("role_id") || "";
  const appModule_id = queryParams.get("appModule_id") || "";
  const isSsoLogin = !!token && !!role_id && !!appModule_id;

  useEffect(() => {
    if (!isSsoLogin) return;

    const doSso = async () => {
      try {
        const { data } = await axios.get(
          `${environment.API_URL}/sso/callback`,
          { params: { token, role_id, appModule_id } },
        );

        if (data.status !== 200) {
          toast.error("SSO gagal, silakan coba lagi.");
          navigate("/login", { replace: true });
          return;
        }

        const userData = {
          id: data.data.user.id,
          name: data.data.user.nama,
          nip: data.data.user.nip,
          pegawai_id: data.data.user.pegawai_id,
          role: data.data.user.role,
          accessToken: data.data.accessToken,
          refreshToken: "",
        };

        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(setUserData(userData));

        toast.success("Login SSO berhasil!");
        navigate("/", { replace: true });
      } catch (error: any) {
        console.error("[SSO Error]", error.response?.data || error.message);
        const msg = error.response?.data?.message || "Sesi tidak valid.";
        toast.error(msg);
        navigate("/login", { replace: true });
      }
    };

    doSso();
  }, [isSsoLogin, token, role_id, appModule_id, navigate, dispatch]);

  return { isSsoLogin };
}
