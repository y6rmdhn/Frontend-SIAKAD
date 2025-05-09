import authServices from "@/services/auth.services";
import captchaServices from "@/services/captcha.services";
import { ILogin } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  captcha_id: z.string().min(1, "Captcha ID wajib diisi"),
  slider_position: z.number().min(0, "Slider wajib diisi"),
});

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [captchaVisible, setCaptchaVisible] = useState(false);

  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    passwordConfirmation: false,
  });
  const [isChecked, setIsChecked] = useState(false);

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
    onError: (error) => {
      // On error, refresh the captcha
      queryClient.invalidateQueries({ queryKey: ["generate-captcha"] });
      // toast.error("CAPTCHA tidak valid atau sudah kadaluarsa");
      setCaptchaVisible(false);
      // Reset form but keep NIP
      const currentNip = form.getValues("nip");
      form.reset({
        nip: currentNip,
        password: "",
        captcha_id: "",
        slider_position: 0,
      });
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    console.log(values);
    mutate(values);
  };

  const form = useForm<LoginFormValues>({
    defaultValues: {
      nip: "",
      password: "",
      captcha_id: "",
      slider_position: 0,
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
    captchaVisible,
    setCaptchaVisible,
  };
};

export default useLogin;
