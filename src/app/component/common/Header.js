import React from "react";
import { FiRotateCcw } from "react-icons/fi";
import { useSelector } from "react-redux";
import { amountFormate, roleStatusWithoutColor } from "../../utils/helper";

const Header = () => {
  const { userData } = useSelector((state) => state?.persist);
  return (
    <div
      style={{ backgroundImage: "linear-gradient(#353535, #111111)" }}
      className="h-[60px] flex items-center"
    >
      <div className="container flex justify-between items-center px-2">
        <img
          src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/Logo/CBTF-logo.png"
          className="h-[40px]"
        />
        <div className="flex sm:flex-row flex-col items-center justify-center">
          <div className="flex items-center">
            <div className="px-[3px] bg-[#000000] rounded text-[10px] text-[#FFFFFF] uppercase font-bold">
              {roleStatusWithoutColor(userData?.roles?.toString())}
            </div>
            <div className="text-[#ecad17] text-[12px] font-black ml-2">
              {userData?.username}
            </div>
          </div>
          <div className="flex items-center ml-4">
            <div className="px-[3px] bg-[#000000] rounded text-[10px] text-[#FFFFFF] capitalize font-bold">
              main
            </div>
            <div className="text-[#ecad17] text-[12px] font-black ml-2">
              IR {amountFormate(userData?.balance)}
            </div>
          </div>
          <div
            style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,.5)" }}
            className="bg-[#3e3e3e] mx-4 sm:block hidden"
          >
            <div className="bg-[rgba(255,255,255,.1)] p-1">
              <FiRotateCcw color="#ecad17" size={13} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
