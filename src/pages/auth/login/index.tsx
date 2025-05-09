import Login from "@/components/view/Auth/Login";
import AuthLayout from "@/layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
