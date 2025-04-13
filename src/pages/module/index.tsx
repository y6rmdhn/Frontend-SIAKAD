import Module from "@/view/Module";
import React from "react";

const ModulePage = () => {
  return (
    <main className="relative min-h-screen">
      <img
        src="/images/background/UIKA 2.png"
        alt="uika-background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <Module />
    </main>
  );
};

export default ModulePage;
