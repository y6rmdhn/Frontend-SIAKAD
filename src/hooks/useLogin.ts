// External dependencies
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

// Internal imports
import authServices from "@/services/auth.services";
import captchaServices from "@/services/captcha.services";
import { ILogin } from "@/types/auth";
import { setUserData } from "@/store/userSlice";

// Form validation schema
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

// Define type from schema
type LoginFormValues = z.infer<typeof loginFormSchema>;

/**
 * Custom hook for handling login functionality
 */
const useLogin = () => {
  // Router and state management hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // UI state
  const [captchaVisible, setCaptchaVisible] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [captchaId, setCaptchaId] = useState<string>("");
  const [sliderPosition, setSliderPosition] = useState<number>(0);

  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    passwordConfirmation: false,
  });

  // Form setup
  const form = useForm<LoginFormValues>({
    defaultValues: {
      nip: "",
      password: "",
      captcha_id: "",
      slider_position: 0,
    },
    resolver: zodResolver(loginFormSchema),
  });

  // Watch form fields
  const nip = form.watch("nip");
  const password = form.watch("password");
  const isFormFilled = nip && password;
  const { errors } = form.formState;

  // Captcha data query
  const { data: captchaData } = useQuery({
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

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setCaptchaVisible(false);
    }
  }, [errors]);

  // Update form values when captchaId changes
  useEffect(() => {
    if (captchaId) {
      form.setValue("captcha_id", captchaId);
    }
  }, [captchaId, form]);

  // Update form values when sliderPosition changes
  useEffect(() => {
    form.setValue("slider_position", sliderPosition);
  }, [sliderPosition, form]);

  // Login mutation
  const { isPending, mutate } = useMutation({
    mutationFn: (data: ILogin) => authServices.login(data),
    onSuccess: (response) => {
      // Handle successful login
      const userData = {
        id: response.data.user.id,
        name: response.data.user.nama,
        role: response.data.role,
        accessToken: response.data.access_token,
      };

      // Store user data and update state
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUserData(userData));

      // Show success message and navigate
      toast.success("Berhasil Login");
      form.reset();
      navigate("/");
    },
    onError: () => {
      // Handle login error
      queryClient.invalidateQueries({ queryKey: ["generate-captcha"] });
      setCaptchaVisible(false);

      // Reset form but keep NIP value
      const currentNip = form.getValues("nip");
      form.reset({
        nip: currentNip,
        password: "",
        captcha_id: "",
        slider_position: 0,
      });
    },
  });

  /**
   * Handle form submission
   */
  const handleLogin = (values: LoginFormValues) => {
    console.log(values);
    mutate(values);
  };

  /**
   * Toggle password visibility
   */
  const handleVisiblePassword = (key: "password" | "passwordConfirmation") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  return {
    form,
    handleLogin,
    handleVisiblePassword,
    visiblePassword,
    isChecked,
    setIsChecked,
    isPending,
    captchaVisible,
    setCaptchaVisible,
    captchaData,
    nip,
    password,
    isFormFilled,
    captchaId,
    setCaptchaId,
    sliderPosition,
    setSliderPosition,
  };
};

export default useLogin;
