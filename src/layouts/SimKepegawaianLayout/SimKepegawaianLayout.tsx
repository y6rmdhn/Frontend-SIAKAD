import Header from "@/components/sections/Header";
import Navigation from "@/components/blocks/NavigationAdmin";
import NavigationUser from "@/components/blocks/NavigationUser";
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
