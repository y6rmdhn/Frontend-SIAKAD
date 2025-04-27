import Module from "@/view/Module";
import React from "react";

const ModulePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <img
          src="/images/background/UIKA 2.png"
          alt="uika-background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10">
        <Module />
      </div>
    </main>
  );
};

export default ModulePage;
