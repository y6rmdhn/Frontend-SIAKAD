import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { X } from "lucide-react";
import { CiGrid41 } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoExit } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

interface AvatarMobileProps {
    initials: string;
    user: string;
    logout: () => void;
}

const AvatarMobile = ({ initials, user, logout }: AvatarMobileProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Avatar Trigger Button */}
            <Button
                onClick={() => setIsOpen(true)}
                variant="ghost"
                size="icon"
                className="flex gap-2 hover:bg-gray-100/30"
            >
                <Avatar className="border-black/30 border-2">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <IoMdArrowDropdown className="w-4 h-4 text-white" />
            </Button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Close Button (fixed position) */}
                        <motion.div
                            className="fixed left-4 top-4 z-80"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button
                                onClick={() => setIsOpen(false)}
                                variant="ghost"
                                size="icon"
                                className="bg-white shadow-sm hover:bg-gray-100"
                            >
                                <X className="w-5 h-5 text-gray-800" />
                            </Button>
                        </motion.div>

                        {/* Menu Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-white z-65 pt-20 px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Scrollable Menu Content */}
                            <div className="h-[calc(100vh-5rem)] overflow-y-auto pb-8">
                                {/* User Profile Section */}
                                <motion.div
                                    className="mb-6"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="flex justify-start items-center">
                                        <Avatar className="border-black/30 border-2 w-12 h-12">
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback>{initials}</AvatarFallback>
                                        </Avatar>

                                        <div className="flex ml-3 items-center w-full justify-between">
                                            <Link to="/profil" onClick={() => setIsOpen(false)}>
                                                <div className="flex flex-col">
                                                    <h1 className="font-semibold text-black text-sm text-wrap">
                                                        {user}
                                                    </h1>
                                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                                        Lihat Profil
                                                        <FaArrowRightLong className="ml-1" />
                                                    </span>
                                                </div>
                                            </Link>
                                            <Button
                                                onClick={() => {
                                                    navigate("/");
                                                    setIsOpen(false);
                                                }}
                                                className="w-8 h-8 bg-white shadow-md flex justify-center items-center rounded-full"
                                                variant="ghost"
                                                size="icon"
                                            >
                                                <CiGrid41 className="text-blue-950 w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Menu Items */}
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Separator className="w-full h-[1px] my-4" />

                                    <Button
                                        onClick={() => {
                                            logout();
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-red-500 justify-start px-0 py-3 text-sm"
                                        variant="ghost"
                                    >
                                        <IoExit className="mr-2 w-5 h-5" />
                                        Keluar
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AvatarMobile;