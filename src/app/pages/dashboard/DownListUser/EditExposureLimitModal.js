import React from "react";
import { FaWindowClose } from "react-icons/fa";
import Model from "../../../component/common/Modal";

const EditExposureLimitModal = ({ isVisible, onCloseMenu }) => {
  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded">
        <div className="p-[15px] flex items-center justify-between min-w-[400px]">
          <div className="text-[16px] text-[#3b5160] font-black">
            Change Exposure Limit
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
              Exposure Limit
            </div>
            <div className="col-span-9 flex items-center justify-between">
              <div className="text-[16px] text-[#1e1e1e] font-black">
                200,000.00
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-3 items-center mb-[10px]">
            <div className="col-span-3 text-[12px] text-[#1e1e1e] font-semibold">
              Exposure
            </div>
            <div className="col-span-9 flex">
              <input
                placeholder="Enter"
                style={{ boxShadow: "inset 0px 1px 0px rgba(0,0,0,.5)" }}
                className="w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-bold"
              />
              <div className="text-[red] text-[18px] ml-2">*</div>
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
              <div className="text-[red] text-[18px] ml-2">*</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-[15px]">
          <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px]">
            Change
          </button>
        </div>
      </div>
    </Model>
  );
};

export default EditExposureLimitModal;
