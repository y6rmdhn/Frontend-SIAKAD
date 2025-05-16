// src/components/layouts/DetailSidebar.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import accordionContent from "@/constant/arccodionContent/arccodionContent";
import { useState } from "react";

const DetailSidebar = ({ pegawaiID }: { pegawaiID: string | null }) => {
  const location = useLocation();
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="bg-[#F0F6FA] p-4 flex flex-col items-center justify-center rounded-lg">
      <IoPersonCircleOutline className="text-8xl text-muted-foreground" />
      <div className="flex flex-col w-full gap-1">
        <Link to={`/admin/detail-pegawai/biodata/${pegawaiID}`}>
          <Button
            variant="ghost"
            className={`w-full justify-start px-0 rounded-none transition-all duration-300 hover:underline hover:bg-[#F0F6FA] cursor-pointer ${
              location.pathname ===
                `/admin/detail-pegawai/biodata/${pegawaiID}` &&
              "text-[#169EF4] border-l-2 border-l-[#169EF4] pl-1"
            }`}
          >
            Biodata
          </Button>
        </Link>
        <Separator className="my-1" />
        <Link to={`/admin/detail-pegawai/keluarga/${pegawaiID}`}>
          <Button
            variant="ghost"
            className={`w-full justify-start px-0 transition-all duration-300 hover:underline hover:bg-[#F0F6FA] cursor-pointer ${
              location.pathname ===
                `/admin/detail-pegawai/keluarga/${pegawaiID}` &&
              "text-[#169EF4] border-l-2 border-l-[#169EF4] rounded-none pl-1"
            }`}
          >
            Keluarga
          </Button>
        </Link>
        <Separator className="my-1" />
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={openAccordion}
        onValueChange={setOpenAccordion}
      >
        {accordionContent.map((section, index) => (
          <AccordionItem value={index.toString()} key={index}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <div className="flex flex-col">
              {section.items.map((item, idx) => {
                const isActive = location.pathname === item.href + pegawaiID;
                return (
                  <Link
                    key={idx}
                    to={item.href + pegawaiID}
                    className={`text-left text-sm rounded-md hover:bg-gray-200 ${
                      isActive
                        ? "border-l-2 border-l-[#169EF4] rounded-none text-[#169EF4]"
                        : ""
                    }`}
                  >
                    <AccordionContent className="pb-2 pt-2 pl-2">
                      {item.label}
                    </AccordionContent>
                  </Link>
                );
              })}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DetailSidebar;
