import { Button } from "@/components/ui/button";
import { MdPerson } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { BsGrid3X2GapFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/auth.services";
import { ILogout } from "@/types/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "@/store/userSlice";

const Header = () => {
  const userSelector = useSelector((state: RootState) => state.user);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data: ILogout) => authServices.logout(data),
    onSuccess: (response) => {
      localStorage.removeItem("user");
      dispatch(clearUserData());
      navigate("/login");
      toast.success(response.data.message);
    },
  });

  const handleLogout = () => {
    if (!accessToken || typeof accessToken !== "string") {
      toast.error("Please login again.");
      return;
    }

    mutate({ accessToken });
  };

  return (
    <header className="h-20 font-roboto grid grid-cols-[2fr_1fr] gap-4 justify-between items-center ">
      <div className="bg-green-uika h-full flex pl-3 items-center rounded-tr-[40px]">
        <div className="flex gap-5">
          <img
            className="w-14 h-14"
            src="/images/logo/uika-logo-2.png"
            alt="logo-uika"
          />

          <div className="flex flex-col justify-center">
            <p className="text-white font-light text-sm">SIM KEPEGAWAIAN</p>
            <h1 className="font-semibold text-white">
              UNIVERSITAS IBN KHALDUN{" "}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-yellow-uika h-full rounded-bl-[40px] px-10">
        <div className="w-full flex justify-end items-center h-full">
          <div className="flex justify-center items-center">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#fd801a] cursor-pointer"
            >
              <p className="text-white">ID</p>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#fd801a] cursor-pointer"
            >
              <FaBell className="h-4! w-4! text-white" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#fd801a] cursor-pointer"
            >
              <IoIosHelpCircleOutline className="h-5! w-5! text-white" />
            </Button>
          </div>

          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`flex gap-6 py-7 ring-0 focus-visible:ring-0 focus:outline-none cursor-pointer ${
                  open ? "bg-hover-yellow-uika" : "hover:bg-hover-yellow-uika"
                }`}
              >
                <MdPerson className="h-5 w-5 text-white" />
                <div className="flex flex-col text-start text-white">
                  <p className="font-medium text-sm">
                    {userSelector.name.toUpperCase()}
                  </p>
                  <p className="text-xs">{userSelector.role}</p>
                </div>
                <IoMdArrowDropdown
                  className={`text-white transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex flex-col justify-center items-center">
                <div className="w-20 h-20 overflow-hidden rounded-full mt-2 border-4 border-black/10">
                  <img
                    src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                    alt=""
                    className="object-center"
                  />
                </div>

                <div className="my-5 text-center">
                  <h1>{userSelector.name}</h1>
                  <p className="mt-2 text-muted-foreground">
                    {userSelector.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex gap-2">
                <DropdownMenuItem>
                  <BsPersonFill /> Profile
                </DropdownMenuItem>
                <Link to="/">
                  <DropdownMenuItem className="cursor-pointer">
                    <BsGrid3X2GapFill /> Menu
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline /> Keluar
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
