import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropsType {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropsType) => {
  const { children, title } = props;

  return (
    <div>
      <PageHead title={title} />
      <section>{children}</section>
    </div>
  );
};

export default AuthLayout;
