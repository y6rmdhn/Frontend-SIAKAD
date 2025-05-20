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
      <main className="px-5 lg:px-20 sm:px-20 md:px-20 xl:px-20 2xl:px-20 font-roboto">
        <Navigation />
        <section>{children}</section>
      </main>
    </>
  );
};

export default SimKepegawaianLayout;
