import authServices from "@/services/auth.services";
import { ILogin } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/userSlice";

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
  const dispatch = useDispatch();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    passwordConfirmation: false,
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  type LoginFormValues = z.infer<typeof loginFormSchema>;

  const { isPending, mutate } = useMutation({
    mutationFn: (data: ILogin) => authServices.login(data),
    onSuccess: (response) => {
      const userData = {
        id: response.data.user.id,
        name: response.data.user.nama,
        role: response.data.role,
        accessToken: response.data.access_token,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUserData(userData));
      toast.success("Berhasil Login");
      form.reset();
      navigate("/");
    },
    onError: () => form.reset(),
  });

  const handleLogin = async (values: LoginFormValues) => {
    mutate(values);
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
    isPending,
  };
};

export default useLogin;
