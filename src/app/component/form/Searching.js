import React from "react";
import { FaSearch } from "react-icons/fa";

const Searching = () => {
  return (
    <div className="flex items-center border border-[#cdcdcd] bg-[#FFFFFF] p-[2px] rounded">
      <FaSearch color="#000000" size={15} className="ml-1" />
      <input
        className="h-[25px] pl-2 text-[12px] w-[100%]"
        placeholder="Find member..."
      />
      <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black">
        Search
      </button>
    </div>
  );
};

export default Searching;
