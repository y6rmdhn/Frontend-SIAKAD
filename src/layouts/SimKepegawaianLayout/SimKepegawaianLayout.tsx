import Header from "@/components/commons/Header";
import Navigation from "@/components/commons/Navigation";
import NavigationUser from "@/components/commons/NavigationUser";
import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropsType {
  title?: string;
  children: ReactNode;
  isNavbarUser?: boolean;
}

const SimKepegawaianLayout = (props: PropsType) => {
  const { children, title, isNavbarUser } = props;

  return (
    <>
      <PageHead title={title} />
      <Header />
      <main className="px-20 font-roboto">
        {isNavbarUser ? <NavigationUser /> : <Navigation />}
        <section>{children}</section>
      </main>
    </>
  );
};

export default SimKepegawaianLayout;
