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
      <section className="w-full md:px-20 pt-10 pb-6 font-roboto min-h-[100vh] relative flex justify-center items-start ">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
