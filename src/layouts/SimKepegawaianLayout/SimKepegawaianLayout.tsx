import Header from "@/components/commons/Header";
import Navigation from "@/components/commons/Navigation";
import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropsType {
  title?: string;
  children: ReactNode;
}

const SimKepegawaianLayout = (props: PropsType) => {
  const { children, title } = props;

  return (
    <>
      <PageHead title={title} />
      <Header />
      <main className="px-20">
        <Navigation />
        <div>{children}</div>
      </main>
    </>
  );
};

export default SimKepegawaianLayout;
