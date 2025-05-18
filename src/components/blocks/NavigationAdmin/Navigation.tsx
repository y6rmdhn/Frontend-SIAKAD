import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import operasional from "@/constant/NavbarMenu/operasional";
import validasiData from "@/constant/NavbarMenu/validasiData";
import referensi from "@/constant/NavbarMenu/referensi";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      to: "/admin/dasboard",
      label: "Dasboard",
      match: ["/admin/dasboard"],
    },
    {
      to: "/admin/pegawai",
      label: "Pegawai",
      match: ["/admin/pegawai", "/admin/detail-pegawai"],
    },
  ];

  return (
    <NavigationMenu
      className="bg-[#eeeeee] relative rounded-md mt-10"
      viewport={false}
    >
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.to}>
            <Link to={item.to}>
              <NavigationMenuLink
                  className={cn(
                      "bg-[#eeeeee] px-5",
                      item.match.some((path) => location.pathname.startsWith(path)) &&
                      "bg-[#FDA31A] text-white hover:bg-[#FDA31A] hover:text-white"
                  )}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}

        <MenuGroup
          title="Operasional"
          items={operasional}
          path="/admin/operasional"
        />
        <MenuGroup
          title="Validasi Data"
          items={validasiData}
          path="/admin/validasi-data"
        />
        <MenuGroup
          title="Referensi"
          items={referensi}
          path="/admin/referensi"
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MenuGroup = ({ title, items, path }) => {
  const location = useLocation();

  const isActive = location.pathname.includes(path);
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={isActive ? "bg-yellow-uika text-white" : "bg-[#eeeeee]"}
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="z-50">
        <ul className="grid w-52 gap-3 grid-cols-1">
          {items.map((component) => (
            <ListItem
              key={component.title}
              title={component.title}
              href={component.href}
              childrenItems={component.childrenItems}
            />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

// ListItem tetap sama
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href: string;
    childrenItems?: { title: string; href: string }[];
  }
>(({ className, title, href, childrenItems, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const isActive =
    location.pathname === href ||
    childrenItems?.some((child) => location.pathname === child.href);

  const handleMouseEnter = () => childrenItems?.length && setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  if (childrenItems?.length) {
    return (
      <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Link
              to={href}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive && "font-bold bg-gray-100",
                className
              )}
            >
              <div className="text-sm font-medium leading-none flex justify-between items-center">
                {title} <span className="ml-1">▸</span>
              </div>
            </Link>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="start"
            className="w-48 bg-white p-2 shadow-lg rounded-md -ml-1"
          >
            <ul className="space-y-1">
              {childrenItems.map((child) => (
                <li key={child.title}>
                  <Link
                    to={child.href}
                    className={cn(
                      "block px-2 py-1 text-sm rounded hover:bg-accent",
                      location.pathname === child.href &&
                        "bg-gray-100 text-black"
                    )}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </li>
    );
  }

  // Jika tidak ada childrenItems
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            isActive && "font-bold bg-gray-100",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default Navigation;
