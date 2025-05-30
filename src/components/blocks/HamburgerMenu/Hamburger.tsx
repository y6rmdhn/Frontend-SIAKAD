import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Link} from "react-router-dom";
import kehadiran from "@/constant/NavbarMenuUser/kehadiran";
import operasional from "@/constant/NavbarMenuUser/operasional";
import dataRiwayat from "@/constant/NavbarMenuUser/dataRiwayat";

const HamburgerButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const topBarVariants = {
        closed: {rotate: 0, y: 0, backgroundColor: "#FFFFFF"},
        open: {rotate: 45, y: 0, width: "100%", backgroundColor: "#000000"},
    };

    const middleBarVariants = {
        closed: {y: 1, opacity: 1},
        open: {y: 1, width: "100%", opacity: 0},
    };

    const bottomBarVariants = {
        closed: {rotate: 0, y: 2, backgroundColor: "#FFFFFF"},
        open: {rotate: -45, y: 3, width: "100%", backgroundColor: "#000000"},
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
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
                    <motion.span className="block w-full h-[1px] origin-left" variants={topBarVariants} initial="closed"
                                 animate={isOpen ? "open" : "closed"} transition={{duration: 0.3}}/>
                    <motion.span className="block w-full h-[1px] bg-white origin-left" variants={middleBarVariants}
                                 initial="closed" animate={isOpen ? "open" : "closed"} transition={{duration: 0.2}}/>
                    <motion.span className="block w-full h-[1px] origin-left" variants={bottomBarVariants}
                                 initial="closed" animate={isOpen ? "open" : "closed"} transition={{duration: 0.3}}/>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-white z-40 pt-20 px-4 overflow-hidden flex flex-col min-h-screen"
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "100vh", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.4}}
                    >
                        {/* Bagian Atas - Logo */}
                        <motion.div
                            className="flex items-center mb-4"
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.5}}
                        >
                            <img src="/images/logo/logo-uika-login.webp" alt="logo-uika" className="w-12 h-12"/>
                            <div className="ml-4">
                                <p className="text-black/50 text-[10px] font-light">SIM Kepegawaian</p>
                                <h1 className="text-sm font-semibold text-black">Universitas Ibn Khaldun</h1>
                            </div>
                        </motion.div>

                        {/* Bagian Bawah - Konten Scrollable + Animated Accordion */}
                        <motion.div
                            className="flex-1 overflow-auto mt-4 pb-10"
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.5}}
                        >
                            <div className="flex flex-col gap-2">
                                <Link to="/dasboard">
                                    <Button className="w-full justify-start pl-0 py-0 text-xs"
                                            variant="ghost">Dasboard</Button>
                                </Link>
                                <Separator className="w-full h-1"/>
                                <Link to="/biodata">
                                    <Button className="w-full justify-start pl-0 py-0 text-xs"
                                            variant="ghost">Biodata</Button>
                                </Link>
                                <Separator className="w-full h-1"/>
                            </div>

                            <Accordion type="single" collapsible className="w-full mt-4">
                                {/* Kehadiran */}
                                <AccordionItem value="kehadiran">
                                    <AccordionTrigger className="text-xs">Kehadiran</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-2">
                                        {kehadiran.map((item, index) => (
                                            <Link
                                                key={index}
                                                to={item.href}
                                                className="text-xs text-gray-700 hover:underline block px-4 py-2 border-b border-gray-300 last:border-b-0"
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Operasional */}
                                <AccordionItem value="operasional">
                                    <AccordionTrigger className="text-xs">Operasional</AccordionTrigger>
                                    <AccordionContent>
                                        <Accordion type="single" collapsible className="pl-2">
                                            {operasional.map((item, index) => (
                                                <AccordionItem key={index} value={`operasional-${index}`}>
                                                    {item.childrenItems ? (
                                                        <>
                                                            <AccordionTrigger
                                                                className="text-xs font-medium pl-4">{item.title}</AccordionTrigger>
                                                            <AccordionContent className="pl-4">
                                                                <ul className="space-y-1 pl-2">
                                                                    {item.childrenItems.map((child, i) => (
                                                                        <li key={i}>
                                                                            <Link to={child.href}
                                                                                  className="text-xs text-gray-700 hover:underline block py-1">{child.title}</Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </AccordionContent>
                                                        </>
                                                    ) : (
                                                        <Link to={item.href}
                                                              className="text-xs text-gray-700 hover:underline block px-4 py-2">{item.title}</Link>
                                                    )}
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Data Riwayat */}
                                <AccordionItem value="data-riwayat">
                                    <AccordionTrigger className="text-xs">Data Riwayat</AccordionTrigger>
                                    <AccordionContent>
                                        <Accordion type="single" collapsible className="pl-2">
                                            {dataRiwayat.map((item, index) => (
                                                <AccordionItem key={index} value={`data-riwayat-${index}`}>
                                                    {item.childrenItems ? (
                                                        <>
                                                            <AccordionTrigger
                                                                className="text-xs font-medium pl-4">{item.title}</AccordionTrigger>
                                                            <AccordionContent className="pl-4">
                                                                <ul className="space-y-1 pl-2">
                                                                    {item.childrenItems.map((child, i) => (
                                                                        <li key={i}>
                                                                            <Link to={child.href}
                                                                                  className="text-xs text-gray-700 hover:underline block py-1">{child.title}</Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </AccordionContent>
                                                        </>
                                                    ) : (
                                                        <Link to={item.href}
                                                              className="text-xs text-gray-700 hover:underline block px-4 py-2">{item.title}</Link>
                                                    )}
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HamburgerButton;
