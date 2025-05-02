import PageHead from "@/components/commons/PageHead";
import Module from "@/components/view/Module";
// import Module from "@/view/Module";
import React from "react";

const ModulePage = () => {
  return (
    <>
      <PageHead title="Daftar Module" />
      <main className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <img
            src="/images/background/UIKA 2.png"
            alt="uika-background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <section className="relative z-10">
          <Module />
        </section>
      </main>
    </>
  );
};

export default ModulePage;
