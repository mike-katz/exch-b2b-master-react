import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Searching = ({ onChange, onSubmitSearch }) => {
  const { themeColor } = useSelector((state) => state?.persist);
  return (
    <div className="flex items-center border border-[#cdcdcd] bg-[#FFFFFF] p-[2px] rounded">
      <FaSearch color="#000000" size={15} className="ml-1" />
      <input
        autoComplete="off"
        type="text"
        onChange={onChange}
        className="h-[25px] pl-2 text-[12px] w-[100%]"
        placeholder="Find member..."
      />
      <button
        onClick={onSubmitSearch}
        style={{
          background: themeColor?.headerBgColor,
          color: themeColor?.headerTextColor,
        }}
        className="rounded px-2 text-[13px] h-[25px] font-black"
      >
        Search
      </button>
    </div>
  );
};

export default Searching;
