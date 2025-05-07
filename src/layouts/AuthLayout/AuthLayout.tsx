import PageHead from "@/components/commons/PageHead";
import { RootState } from "@/store/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PropsType {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropsType) => {
  const { children, title } = props;
  const userSelector = useSelector((state: RootState) => state.user);

  if (userSelector.accessToken) return <Navigate to="/" />;

  return (
    <div>
      <PageHead title={title} />
      <section>{children}</section>
    </div>
  );
};

export default AuthLayout;
