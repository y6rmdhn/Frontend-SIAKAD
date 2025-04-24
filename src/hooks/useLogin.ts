import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const loginFormSchema = z.object({
  nomorIndukPegawai: z
    .string()
    .regex(/^\d+$/, "Nomor Induk Pegawai harus berupa angka")
    .min(1, "Nomor Induk Pegawai tidak boleh kosong")
    .max(20, "Nomor Induk Pegawai tidak boleh lebih dari 20 karakter"),
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

  const handleLogin = (values: LoginFormValues) => {
    console.log(values);
    toast.success("Login berhasil!");
    navigate("/");
  };

  const form = useForm<LoginFormValues>({
    defaultValues: {
      nomorIndukPegawai: "",
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
