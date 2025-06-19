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
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import kehadiran from "@/constant/NavbarMenuUser/kehadiran";
import operasional from "@/constant/NavbarMenuUser/operasional";
import dataRiwayat from "@/constant/NavbarMenuUser/dataRiwayat";

interface MenuItem {
  title: string;
  href: string;
  childrenItems?: {
    title: string;
    href: string;
  }[];
}

interface MenuGroupProps {
  title: string;
  items: MenuItem[];
  path: string;
}


const NavigationUser = () => {
  const location = useLocation();

  const navItems = [
    { to: "/dasboard", label: "Dasboard" },
    { to: "/biodata", label: "Biodata" },
  ];

  return (
      <NavigationMenu
          className="bg-[#eeeeee] relative rounded-md mt-10 hidden md:block"
          viewport={false}
      >
        <NavigationMenuList>
          {navItems.map((item) => (
              <NavigationMenuItem key={item.to}>
                <Link to={item.to}>
                  <NavigationMenuLink
                      className={cn(
                          "bg-[#eeeeee] px-5",
                          location.pathname === item.to &&
                          "bg-[#FDA31A] text-white hover:bg-[#FDA31A] hover:text-white"
                      )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
          ))}

          <MenuGroup title="Kehadiran" items={kehadiran} path="/kehadiran" />
          <MenuGroup
              title="Operasional"
              items={operasional}
              path="/operasional"
          />
          <MenuGroup
              title="Data Riwayat"
              items={dataRiwayat}
              path="/data-riwayat"
          />
        </NavigationMenuList>
      </NavigationMenu>
  );
};

const MenuGroup = ({ title, items, path }: MenuGroupProps) => {
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
            {items.map((component: MenuItem) => (
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

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & {
  title: string;
  href: string;
  childrenItems?: { title: string; href: string }[];
}
>(({ className, title, children, href, childrenItems, ...props }, ref) => {
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

  return (
      <li>
        <NavigationMenuLink asChild>
          <Link
              ref={ref}
              to={href}
              className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  isActive && "font-bold bg-gray-100",
                  className
              )}
              {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {children && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
                </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
  );
});
ListItem.displayName = "ListItem";

export default NavigationUser;
