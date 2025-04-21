import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import kehadiran from "@/constant/NavbarMenuUser/kehadiran";

const NavigationUser = () => {
  return (
    <NavigationMenu
      className="bg-[#eeeeee] relative rounded-md mt-10"
      viewport={false}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/dasboard">
            <NavigationMenuLink className="bg-[#eeeeee] px-5">
              Dasboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/biodata">
            <NavigationMenuLink className="bg-[#eeeeee] px-5">
              Biodata
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-[#eeeeee]">
            Kehadiran
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <ul className="grid w-52 gap-3 grid-cols-1">
              {kehadiran.map((component) => (
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
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-[#eeeeee]">
            Operasional
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <ul className="grid w-52 gap-3 grid-cols-1">
              {/* {validasiData.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  childrenItems={component.childrenItems}
                />
              ))} */}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-[#eeeeee]">
            Data Riwayat
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {/* {operasional.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                />
              ))} */}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-[#eeeeee]">
            Laporan
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"></ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// Komponen ListItem yang mendukung submenu
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href: string;
    childrenItems?: { title: string; href: string }[];
  }
>(({ className, title, children, href, childrenItems, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleMouseEnter = () => {
    if (childrenItems && childrenItems.length > 0) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  if (childrenItems && childrenItems.length > 0) {
    return (
      <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Link
              to={href}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground",
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
