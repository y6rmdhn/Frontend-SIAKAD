import authServices from "@/services/auth.services";
import { ILogin } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const loginFormSchema = z.object({
  nip: z
    .string()
    .min(1, "Nomor Induk Pegawai tidak boleh kosong")
    .regex(/^\d+$/, "Nomor Induk Pegawai harus berupa angka")
    .max(20, "Nomor Induk Pegawai tidak boleh lebih dari 20 digit"),
  password: z.string().min(8, "Kata Sandi tidak boleh kurang dari 8 karakter"),
});

const useLogin = () => {
  const navigate = useNavigate();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    passwordConfirmation: false,
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  type LoginFormValues = z.infer<typeof loginFormSchema>;

  const authLogin = (payload: ILogin) => {
    return authServices.login(payload);
  };

  const handleLogin = async (values: LoginFormValues) => {
    try {
      console.log(values);
      await authLogin(values);

      toast.success("Login berhasil!");
      form.reset();
      navigate("/");
    } catch (error: any) {
      const err =
        error.response?.data.message || "Terjadi kesalahan pada server.";
      toast.error(err);
      form.reset();
    }
  };

  const form = useForm<LoginFormValues>({
    defaultValues: {
      nip: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const handleVisiblePassword = (key: "password" | "passwordConfirmation") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  return {
    handleLogin,
    form,
    handleVisiblePassword,
    isChecked,
    setIsChecked,
    visiblePassword,
  };
};

export default useLogin;
