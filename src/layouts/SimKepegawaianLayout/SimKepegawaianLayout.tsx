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
      <section className="px-20 font-roboto">
        <Navigation />
        <div>{children}</div>
      </section>
    </>
  );
};

export default SimKepegawaianLayout;
