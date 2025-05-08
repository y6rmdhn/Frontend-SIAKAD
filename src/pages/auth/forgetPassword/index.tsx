import ForgetPassword from "@/components/view/Auth/ForgetPassword";
import AuthLayout from "@/layouts/AuthLayout";
// import ForgetPassword from "@/view/Auth/ForgetPassword";
import React from "react";

const ForgetPasswordPage = () => {
  return (
    <AuthLayout title="Lupa Password">
      <ForgetPassword />
    </AuthLayout>
  );
};

export default ForgetPasswordPage;
