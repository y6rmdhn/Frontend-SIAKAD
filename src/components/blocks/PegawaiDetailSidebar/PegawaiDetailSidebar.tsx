// DetailPegawaiSidebar.tsx
import React, {
  useState,
  useEffect,
  useRef,
  useCallback, // Import useCallback
} from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface AccordionItemData {
  label: string;
  href: string;
}

interface AccordionSectionData {
  title: string;
  items: AccordionItemData[];
}

interface DetailPegawaiSidebarProps {
  currentPegawaiId: string | undefined;
  accordionData: AccordionSectionData[];
}

const DIM_DELAY = 3000; // 3 detik hingga meredup
const DIMMED_OPACITY = 0.4; // Opacity saat redup
const FULL_OPACITY = 1.0; // Opacity normal

const DetailPegawaiSidebar: React.FC<DetailPegawaiSidebarProps> = ({
  currentPegawaiId,
  accordionData,
}) => {
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const sidebarContentRef = useRef<HTMLDivElement>(null);

  // State dan Ref untuk opacity tombol toggle
  const [buttonOpacity, setButtonOpacity] = useState(FULL_OPACITY);
  const dimTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pegawaiIdForNavigation = currentPegawaiId || "";
  const sidebarWidth = "18rem";

  useEffect(() => {
    let sectionToOpenBasedOnUrl: string | undefined = undefined;
    accordionData.forEach((section, index) => {
      if (
        section.items.some((item) => location.pathname.startsWith(item.href))
      ) {
        sectionToOpenBasedOnUrl = `section-${index}`;
      }
    });
    setOpenAccordion(sectionToOpenBasedOnUrl);
  }, [location.pathname, accordionData]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const toggleButton = document.getElementById("sidebar-toggle-button");
      if (toggleButton && toggleButton.contains(event.target as Node)) {
        return;
      }
      if (
        sidebarContentRef.current &&
        !sidebarContentRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  // Fungsi untuk memulai timer meredupkan tombol
  const startDimTimer = useCallback(() => {
    clearTimeout(dimTimerRef.current!);
    dimTimerRef.current = setTimeout(() => {
      // Hanya meredup jika menu tidak sedang terbuka
      if (!isMobileMenuOpen) {
        setButtonOpacity(DIMMED_OPACITY);
      }
    }, DIM_DELAY);
  }, [isMobileMenuOpen]); // isMobileMenuOpen sebagai dependency

  // Efek untuk mengatur opacity tombol berdasarkan status menu mobile dan interaksi
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Jika menu terbuka, tombol kembali ke opacity penuh dan batalkan timer
      setButtonOpacity(FULL_OPACITY);
      clearTimeout(dimTimerRef.current!);
    } else {
      // Jika menu tertutup, tombol kembali ke opacity penuh lalu mulai timer untuk meredup
      setButtonOpacity(FULL_OPACITY);
      startDimTimer();
    }
    // Cleanup timer saat komponen unmount atau isMobileMenuOpen berubah
    return () => {
      clearTimeout(dimTimerRef.current!);
    };
  }, [isMobileMenuOpen, startDimTimer]);

  const handleButtonMouseEnter = () => {
    clearTimeout(dimTimerRef.current!);
    setButtonOpacity(FULL_OPACITY);
  };

  const handleButtonMouseLeave = () => {
    // Jika menu tidak terbuka, mulai ulang timer untuk meredup
    if (!isMobileMenuOpen) {
      startDimTimer();
    }
  };

  const biodataBasePath = "/admin/detail-pegawai/biodata/";
  const keluargaBasePath = "/admin/detail-pegawai/keluarga/";

  const sidebarPanelVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const toggleButtonVariants = {
    closed: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: {
      x: sidebarWidth,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const sidebarContent = (isMobile: boolean = false) => (
    <>
      <motion.div variants={itemVariants} className="mb-8 md:mb-10">
        <div className="w-36 h-36 md:w-44 md:h-44 overflow-hidden rounded-md border border-gray-200">
          <img
            src="https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg"
            className="object-cover w-full h-full"
            alt="profil-pegawai"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col w-full gap-1"
      >
        <Link
          to={`${biodataBasePath}${pegawaiIdForNavigation}`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Button
            variant="ghost"
            type="button"
            className={`w-full justify-start px-3 py-2.5 text-sm rounded-md transition-all duration-300 hover:bg-gray-200/70 cursor-pointer ${
              location.pathname.startsWith(biodataBasePath)
                ? "text-[#169EF4] border-l-4 border-l-[#169EF4] font-semibold bg-blue-100/60"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Biodata
          </Button>
        </Link>
        <Separator className="my-1.5" />
        <Link
          to={`${keluargaBasePath}${pegawaiIdForNavigation}`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Button
            variant="ghost"
            type="button"
            className={`w-full justify-start px-3 py-2.5 text-sm rounded-md transition-all duration-300 hover:bg-gray-200/70 cursor-pointer ${
              location.pathname.startsWith(keluargaBasePath)
                ? "text-[#169EF4] border-l-4 border-l-[#169EF4] font-semibold bg-blue-100/60"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Keluarga
          </Button>
        </Link>
        <Separator className="my-1.5" />
      </motion.div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={openAccordion}
        onValueChange={setOpenAccordion}
      >
        {accordionData.map((section, index) => {
          const sectionIdentifier = `section-${index}`;
          const isAnyItemInSectionActive = section.items.some((item) =>
            location.pathname.startsWith(item.href)
          );

          return (
            <motion.div variants={itemVariants} key={section.title + index}>
              <AccordionItem value={sectionIdentifier}>
                <AccordionTrigger
                  className={`w-full text-sm hover:no-underline px-3 py-3 transition-colors duration-300 rounded-md hover:bg-gray-200/70 ${
                    isAnyItemInSectionActive
                      ? "text-[#169EF4] font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-1 overflow-hidden">
                  <div className="flex flex-col pl-3 border-l-2 border-gray-300 ml-3 my-1">
                    {section.items.map((item) => {
                      const navigationPath = item.href + pegawaiIdForNavigation;
                      const isActive = location.pathname.startsWith(item.href);

                      return (
                        <Link
                          key={item.label}
                          to={navigationPath}
                          onClick={() => isMobile && setIsMobileMenuOpen(false)}
                          className={`block text-left text-sm py-2.5 px-3 rounded-r-md transition-all duration-200 relative ${
                            isActive
                              ? "text-[#169EF4] font-semibold bg-blue-100 border-l-4 border-l-[#169EF4] -ml-0.5"
                              : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/70"
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          );
        })}
      </Accordion>
    </>
  );

  return (
    <>
      {/* Sidebar Toggle Button - Only on mobile */}
      <motion.button
        id="sidebar-toggle-button"
        type="button"
        variants={toggleButtonVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        style={{ opacity: buttonOpacity }} // Terapkan state opacity di sini
        transition={{ opacity: { duration: 0.3 } }} // Tambahkan transisi untuk opacity
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onMouseEnter={handleButtonMouseEnter} // Handler saat mouse masuk
        onMouseLeave={handleButtonMouseLeave} // Handler saat mouse keluar
        className="min-[1013px]:hidden fixed left-0 top-1/2 -translate-y-1/2 z-[60] bg-[#169EF4] text-white px-1 py-3 rounded-r-md shadow-lg focus:outline-none"
        aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
      >
        {isMobileMenuOpen ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </motion.button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 min-[1013px]:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel for Mobile (Animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={sidebarContentRef}
            variants={sidebarPanelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 h-full bg-[#F0F6FA] p-4 flex flex-col items-center w-72 shadow-lg z-75 overflow-y-auto min-[1013px]:hidden"
          >
            {sidebarContent(true)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for Desktop (Static) */}
      <div className="hidden min-[1013px]:flex bg-[#F0F6FA] p-4 flex-col items-center rounded-lg w-64 lg:w-72 shadow-sm h-fit sticky top-4">
        {sidebarContent()}
      </div>
    </>
  );
};

export default DetailPegawaiSidebar;
