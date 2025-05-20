import Header from "@/components/sections/Header";
import Navigation from "@/components/blocks/NavigationAdmin";
import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Navigate } from "react-router-dom";

interface PropsType {
  title?: string;
  children: ReactNode;
}

const SimKepegawaianLayout = (props: PropsType) => {
  const { children, title } = props;

  const userSelector = useSelector((state: RootState) => state.user);

  if (!userSelector.accessToken) {
    return <Navigate to="/login" />;
  }

  if (userSelector.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHead title={title} />
      <Header />
      <main className="md:px-20 px-5 font-roboto overflow-hidden w-full">
        <Navigation />
        <section className="w-full ">{children}</section>
      </main>
    </>
  );
};

export default SimKepegawaianLayout;
