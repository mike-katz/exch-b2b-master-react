import React from "react";
import { FiRotateCcw } from "react-icons/fi";

const Header = () => {
  return (
    <div
      style={{ backgroundImage: "linear-gradient(#353535, #111111)" }}
      className="h-[60px] flex items-center"
    >
      <div className="container flex justify-between items-center">
        <img />
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="px-[3px] bg-[#000000] rounded text-[10px] text-[#FFFFFF] uppercase font-bold">
              ma
            </div>
            <div className="text-[#ecad17] text-[12px] font-black ml-2">
              skyid0080
            </div>
          </div>
          <div className="flex items-center ml-4">
            <div className="px-[3px] bg-[#000000] rounded text-[10px] text-[#FFFFFF] capitalize font-bold">
              main
            </div>
            <div className="text-[#ecad17] text-[12px] font-black ml-2">
              IR 4,186,782.10
            </div>
          </div>
          <div
            style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,.5)" }}
            className="bg-[#3e3e3e] mx-4"
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
