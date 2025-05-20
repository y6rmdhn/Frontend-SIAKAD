import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const HamburgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Variants untuk animasi 2 garis
  const topBarVariants = {
    closed: { rotate: 0, y: 0, backgroundColor: "#FFFFFF" },
    open: { rotate: 45, y: 0, width: "100%", backgroundColor: "#000000" },
  };

  const middleBarVariants = {
    closed: { y: 1, opacity: 1 },
    open: { y: 1, width: "100%", opacity: 0 },
  };

  const bottomBarVariants = {
    closed: { rotate: 0, y: 2, backgroundColor: "#FFFFFF" },
    open: { rotate: -45, y: 3, width: "100%", backgroundColor: "#000000" },
  };

  // Block scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        className="relative z-50 w-10 h-10 focus:outline-none mt-1 scale-90"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 space-y-1.5">
          {/* Baris atas */}
          <motion.span
            className="block w-full h-[1px] origin-left"
            variants={topBarVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3, ease: [0.04, 0.04, 0.12, 0.96] }}
          />

          {/* Baris tengah */}
          <motion.span
            className="block w-full h-[1px] bg-white origin-left"
            variants={middleBarVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.2, ease: [0.04, 0.04, 0.12, 0.96] }}
          />

          {/* Baris bawah */}
          <motion.span
            className="block w-full h-[1px] origin-left"
            variants={bottomBarVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3, ease: [0.04, 0.04, 0.12, 0.96] }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* White background animation */}
            <motion.div
              className="fixed inset-0 bg-white z-40 pt-20 px-4 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.04, 0.12, 0.96] }}
            >
              {/* Menu content */}
              <motion.nav
                className="mt-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="flex justify-start items-center mb-4">
                  <img
                    className="w-12 h-12 md:block"
                    src="/images/logo/logo-uika-login.webp"
                    alt="logo-uika"
                  />

                  <div className="flex ml-4 flex-col justify-center">
                    <p className="text-black/50 font-light text-[10px]">
                      SIM Kepegawaian
                    </p>
                    <h1 className="font-semibold text-black text-sm">
                      Universitas Ibn Khaldun
                    </h1>
                  </div>
                </div>

                <div className="overflow-y-scroll w-full h-full mt-10">
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full justify-start pl-0 py-0 text-xs"
                      variant="ghost"
                    >
                      Dasboard
                    </Button>
                    <Separator
                      className="w-full h-1"
                      orientation="horizontal"
                    />
                    <Button
                      className="w-full justify-start pl-0 py-0 text-xs"
                      variant="ghost"
                    >
                      Pegawai
                    </Button>
                    <Separator
                      className="w-full h-1"
                      orientation="horizontal"
                    />
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-xs">
                        Is it accessible?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-xs">
                        Is it styled?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-xs">
                        Is it animated?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes. It's animated by default, but you can disable it if
                        you prefer.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerButton;
