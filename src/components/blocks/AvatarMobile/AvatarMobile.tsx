import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { X } from "lucide-react";
import { CiGrid41 } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AvatarMobile = ({ initials, user, logout }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="icon"
        className="flex gap-2"
      >
        <Avatar className="border-black/30 border-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <IoMdArrowDropdown className="w-4! h-4! text-white" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="relative">
            <motion.div
              className="absolute -top-10 right-58 z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.04, 0.04, 0.12, 0.96] }}
            >
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
              >
                <X className="w-5! h-5!" />
              </Button>
            </motion.div>

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
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="ghost"
                    size="icon"
                    className="flex gap-2 ml-3"
                  >
                    <Avatar className="border-black/30 border-2 w-12 h-12">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <IoMdArrowDropdown className="w-4! h-4! text-white" />
                  </Button>

                  <div className="flex ml-2 items-center w-full justify-between">
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-black text-sm text-wrap">
                        {user}
                      </h1>

                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        Lihat Profil
                        <FaArrowRightLong />
                      </span>
                    </div>
                    <Button
                      onClick={() => navigate("/")}
                      className="w-8 h-8 bg-white shadow-md flex justify-center items-center rounded-full"
                      variant="ghost"
                      size="icon"
                    >
                      <CiGrid41 className="text-blue-950 w-6! h-6!" />
                    </Button>
                  </div>
                </div>

                <div className="overflow-y-scroll w-full h-full mt-10">
                  <div className="flex flex-col gap-2">
                    <Separator
                      className="w-full h-1"
                      orientation="horizontal"
                    />
                    <Button
                      onClick={logout}
                      className="w-full text-red-500 justify-start pl-0 py-0 text-xs"
                      variant="ghost"
                    >
                      <IoExit />
                      Keluar
                    </Button>
                  </div>
                </div>
              </motion.nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarMobile;
