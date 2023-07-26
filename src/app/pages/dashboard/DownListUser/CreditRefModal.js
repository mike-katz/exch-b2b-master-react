import React from "react";
import { FaWindowClose } from "react-icons/fa";
import Model from "../../../component/common/Modal";

const CreditRefModal = ({ isVisible, onCloseMenu }) => {
  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded">
        <div className="p-[15px] flex items-center justify-between w-full sm:min-w-[400px]">
          <div className="text-[16px] text-[#3b5160] font-black">
            Credit Reference Edit
          </div>
          <FaWindowClose
            onClick={onCloseMenu}
            size={20}
            className="cursor-pointer"
          />
        </div>
        <div className="border-b border-t border-[#ccc] px-[40px] pt-[15px]">
          <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
            <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
              Current
            </div>
            <div className="col-span-9 flex items-center justify-between">
              <div className=" text-[16px] text-[#1e1e1e] font-black">0</div>
              <div className=" ">
                <button className="common-button px-2 leading-[26px]">
                  Log
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
            <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
              New
            </div>
            <div className="col-span-9 flex">
              <input
                placeholder="Enter"
                style={{ boxShadow: "inset 0px 1px 0px rgba(0,0,0,.5)" }}
                className="w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-bold"
              />
              <div className="col-span-9 flex"></div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
            <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
              Password
            </div>
            <div className="col-span-9 flex">
              <input
                type="password"
                placeholder="Enter"
                style={{ boxShadow: "inset 0px 1px 0px rgba(0,0,0,.5)" }}
                className="w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-black"
              />
              <div className="col-span-9 flex"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-[15px]">
          <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px]">
            Submit
          </button>
        </div>
      </div>
    </Model>
  );
};

export default CreditRefModal;
