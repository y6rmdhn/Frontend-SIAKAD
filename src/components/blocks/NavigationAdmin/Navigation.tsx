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
    { to: "/admin/dasboard", label: "Dasboard" },
    { to: "/admin/pegawai", label: "Pegawai" },
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
                  location.pathname === item.to &&
                    "bg-[#FDA31A] text-white hover:bg-[#FDA31A] hover:text-white"
                )}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}

        <MenuGroup title="Operasional" items={operasional} />
        <MenuGroup title="Validasi Data" items={validasiData} />
        <MenuGroup title="Referensi" items={referensi} />

        {/* <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-[#eeeeee]">
            Laporan
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MenuGroup = ({ title, items }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="bg-[#eeeeee]">
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

// ListItem tetap sama
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
                location.pathname === href && "font-bold text-underline",
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
                    className="block px-2 py-1 text-sm rounded hover:bg-accent"
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ",
            location.pathname === href && "font-bold text-underline",
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

export default Navigation;
