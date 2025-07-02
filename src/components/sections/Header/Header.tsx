import { Button } from "@/components/ui/button";
import { MdPerson } from "react-icons/md";
import { IoIosHelpCircleOutline, IoMdArrowDropdown } from "react-icons/io";
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
import { useEffect, useState } from "react";
import { BsGrid3X2GapFill, BsPersonFill } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { useMutation, useQuery } from "@tanstack/react-query";
import authServices from "@/services/auth.services";
import { ILogout } from "@/types/auth";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { clearUserData } from "@/store/userSlice";
import HamburgerButton from "@/components/blocks/HamburgerMenu/Hamburger";
import AvatarMobile from "@/components/blocks/AvatarMobile/AvatarMobile";
import adminServices from "@/services/admin.services";
import dosenServices from "@/services/dosen.services";
import environment from "@/config/environments";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSelector = useSelector((state: RootState) => state.user);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [initials, setInitials] = useState<string>("");
  const role = useSelector((state: RootState) => state.user.role);

  const { data: profileData } = useQuery({
    queryKey: ["profile-header-desktop"],
    queryFn: async () => {
      if (!accessToken) return null;

      try {
        let response;
        if (role === "Admin") {
          response = await adminServices.getProfileAdmin();
        } else {
          response = await dosenServices.getProfileUser();
        }

        return response.data.data;
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        toast.error("Gagal memuat data profil.");
        return null;
      }
    },
  });

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

  useEffect(() => {
    if (userSelector.name) {
      const initials = userSelector.name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
      setInitials(initials);
    }
  }, [userSelector.name]);

  return (
    <header className="h-16 md:h-20 font-roboto grid grid-cols-[2fr_1fr] gap-4 justify-between items-center ">
      <div className="bg-green-uika h-full flex pl-3 items-center rounded-tr-[40px]">
        <div className="flex gap-2 md:gap-5 items-center">
          <img
            className="w-14 h-14 hidden md:block"
            src="/images/logo/uika-logo-2.png"
            alt="logo-uika"
          />

          <HamburgerButton />

          <div className="flex flex-col justify-center">
            <p className="text-white/30 md:text-white font-light md:text-sm text-[10px]">
              SIM Kepegawaian
            </p>
            <h1 className="font-semibold text-white md:text-sm text-[10px]">
              Universitas Ibn Khaldun
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
              className="hover:bg-[#fd801a] cursor-pointer hidden md:block"
            >
              <p className="text-white">ID</p>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#fd801a] cursor-pointer hidden md:block"
            >
              <FaBell className="h-4! w-4! text-white" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#fd801a] cursor-pointer hidden md:block"
            >
              <IoIosHelpCircleOutline className="h-5! w-5! text-white" />
            </Button>
          </div>

          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`gap-6 py-7 ring-0 focus-visible:ring-0 focus:outline-none cursor-pointer hidden md:flex ${
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
                  {/* --- START: FIX --- */}
                  {/* Conditionally render the image only when the URL is available */}
                  {profileData?.file_foto_url ? (
                    <img
                      src={`${environment.API_IMAGE_URL}${profileData.file_foto_url}`}
                      alt={profileData?.nama || "User Profile"}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-uika flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {initials}
                      </span>
                    </div>
                  )}
                  {/* --- END: FIX --- */}
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
                <Link to="/profil">
                  <DropdownMenuItem>
                    <BsPersonFill /> Profile
                  </DropdownMenuItem>
                </Link>
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

          <div className="flex md:hidden">
            <AvatarMobile
              logout={handleLogout}
              user={userSelector.name}
              initials={initials}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
