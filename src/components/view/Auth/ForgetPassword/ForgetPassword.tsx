import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import useResetPassword from "@/hooks/useResetPassword";
import React from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const { form, handleSubmitForm, isEmailValid } = useResetPassword();

  return (
    <div className="w-full lg:max-w-[600px] mx-auto h-[100vh] flex flex-col justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)}>
          <CustomCard
            cardFooter={
              <div className="flex flex-col gap-5 w-full justify-center items-center">
                <Button
                  type="submit"
                  className="w-full mt-10 bg-blue-800 hover:bg-blue-700"
                >
                  {isEmailValid ? "Simpan" : "Kirimkan"}
                </Button>
                <Link
                  to="/login"
                  className="text-blue-800 hover:underline text-sm"
                >
                  Kembali ke Login
                </Link>
              </div>
            }
            cardStyle="border-none shadow-none"
            actions={
              <div className="flex flex-col justify-center gap-3 items-center h-full">
                <div className="flex items-center h-full">
                  <img
                    src="/images/logo/uika-logo.jpg"
                    alt="logo"
                    className="w-14"
                  />
                  <Separator orientation="vertical" className="mx-4 h-full" />
                  <h1 className="font-semibold text-black-uika">
                    Universitas Ibn Khaldun
                  </h1>
                </div>
                <h1 className="text-2xl mt-16 text-black-uika font-semibold">
                  Pemulihan Akun
                </h1>
                <p className="text-center text-sm text-muted-foreground">
                  Masukkan email akun Anda yang sudah terdaftar kemudian ikuti
                  langkah pada email yang kami kirimkan
                </p>
              </div>
            }
          >
            {isEmailValid ? (
              <div className="mt-2 flex flex-col gap-4">
                <FormFieldInput
                  form={form}
                  label="Email"
                  name="email"
                  required={true}
                  position={true}
                  placeholder="Masukan Email"
                />
                <FormFieldInput
                  form={form}
                  label="New Password"
                  name="newPassword"
                  type="password"
                  required={true}
                  position={true}
                  placeholder="Masukan Password Baru"
                />
                <FormFieldInput
                  form={form}
                  label="Repeat Password"
                  name="repeatPassword"
                  type="password"
                  required={true}
                  position={true}
                  placeholder="Konfirmasi Password"
                />
              </div>
            ) : (
              <FormFieldInput
                form={form}
                label="Email"
                name="email"
                required={true}
                position={true}
                placeholder="Masukan Email"
              />
            )}
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPassword;
