import Login from "@/components/view/Auth/Login";
import AuthLayout from "@/layouts/AuthLayout";
// import Login from "@/view/Auth/Login";

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
