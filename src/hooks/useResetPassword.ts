import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const useResetPassword = () => {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const emailSchema = z.object({
    email: z.string().email("Format email tidak valid"),
  });

  const resetFormSchema = z
    .object({
      email: z.string().email("Format email tidak valid"),
      newPassword: z
        .string()
        .min(8, "Kata sandi tidak boleh kurang dari 8 karakter"),
      repeatPassword: z
        .string()
        .min(8, "Kata sandi tidak boleh kurang dari 8 karakter"),
    })
    .superRefine(({ newPassword, repeatPassword }, ctx) => {
      if (newPassword !== repeatPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Password tidak sama",
          path: ["repeatPassword"],
        });
      }
    });

  type EmailFormValues = z.infer<typeof emailSchema>;
  type ResetFormValues = z.infer<typeof resetFormSchema>;
  type FormValues = EmailFormValues | ResetFormValues;

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      ...(isEmailValid && { newPassword: "", repeatPassword: "" }),
    },
    resolver: zodResolver(isEmailValid ? resetFormSchema : emailSchema),
  });

  const handleSendEmail = (values: EmailFormValues) => {
    console.log("Email dikirim:", values);
    setIsEmailValid(true);
    form.reset({ email: values.email, newPassword: "", repeatPassword: "" });
  };

  const handleResetPassword = (values: ResetFormValues) => {
    console.log("Password direset:", values);
    setIsEmailValid(false);
    form.reset();
    toast.success("Password berhasil diubah");
    navigate("/login");
  };

  const handleSubmitForm = (values: FormValues) => {
    if (isEmailValid) {
      handleResetPassword(values as ResetFormValues);
    } else {
      handleSendEmail(values as EmailFormValues);
    }
  };

  return {
    handleSubmitForm,
    form,
    isEmailValid,
  };
};

export default useResetPassword;
