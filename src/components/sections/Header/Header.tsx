import { Button } from "@/components/ui/button";
import { MdPerson } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaBell } from "react-icons/fa";

const Header = () => {
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
        <div className="w-full flex justify-between items-center h-full">
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

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#fd801a] cursor-pointer"
            >
              <MdPerson className="h-5! w-5! text-white" />
            </Button>
          </div>

          <div className="text-white">
            <p className="font-semibold text-[12px]">AZKA FADILAH RAHMAN</p>
            <p className="text-[12px]">kasubag Kepegawaian BASK</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
