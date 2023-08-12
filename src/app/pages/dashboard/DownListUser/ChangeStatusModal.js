import React, { useState } from "react";
import { FaCircle, FaWindowClose } from "react-icons/fa";
import Model from "../../../component/common/Modal";

const ChangeStatusModal = ({ isVisible, onCloseMenu }) => {
  const [activeStatus, setActiveStatus] = useState("");

  const onSelectStatus = (status) => {
    setActiveStatus(status);
  };

  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded">
        <div className="p-[15px] flex items-center justify-between min-w-[500px]">
          <div className="text-[16px] text-[#3b5160] font-black">
            Change Status
          </div>
          <FaWindowClose
            onClick={onCloseMenu}
            size={20}
            className="cursor-pointer"
          />
        </div>
        <div className="mx-[10px] py-[5px] bg-[#FFFFFF]">
          <div className="flex items-center justify-between border-b border-[#ccc] py-[5px] px-[5px] pb-[10px]">
            <div className="flex items-center">
              <div className="bg-[#568bc8] text-[10px] text-[#fff] uppercase w-[26px] h-[15px] flex justify-center items-center rounded mr-[5px]">
                PL
              </div>
              12340ss
            </div>
            <div className="text-[#508d0e] text-[11px] w-fit flex items-center font-black px-1 py-[2px] rounded">
              <FaCircle size={8} className="mr-1" />
              Active
            </div>
            {/* <div className="text-[#d0021b] text-[11px] w-fit flex items-center font-black px-1 py-[2px] rounded">
                <FaCircle size={8} className="mr-1" />
                Suspended
              </div> */}
            {/* <div className="text-[#5a7384] text-[11px] w-fit flex items-center font-black px-1 py-[2px] rounded">
                <FaCircle size={8} className="mr-1" />
                Locked
              </div> */}
          </div>
          <div className="flex items-center justify-around py-4 px-[5px]">
            <div
              onClick={() => {
                onSelectStatus("active");
              }}
              className={`but_active disabled_button ${
                activeStatus === "active" ? "active_open" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  // src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_active.png"
                  src={
                    activeStatus === "active"
                      ? "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_active_open.png"
                      : "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_active_gray.png"
                  }
                  className="h-[33px] w-[33px]"
                />
                <div>Active</div>
              </div>
            </div>
            <div
              onClick={() => {
                onSelectStatus("suspend");
              }}
              className={`but_suspend ${
                activeStatus === "suspend" ? "suspend_open" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={
                    activeStatus === "suspend"
                      ? "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_suspend_open.png"
                      : "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_suspend.png"
                  }
                  // src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_suspend_gray.png"
                  className="h-[33px] w-[33px]"
                />
                <div>Suspend</div>
              </div>
            </div>
            <div
              onClick={() => {
                onSelectStatus("locked");
              }}
              className={`but_locked ${
                activeStatus === "locked" ? "locked_open" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={
                    activeStatus === "locked"
                      ? "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_locked_open.png"
                      : "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_lock.png"
                  }
                  // src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_locked_gray.png"
                  className="h-[33px] w-[33px]"
                />
                <div>Locked</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center mr-4">
            <div className="col-span-3 text-[12px] text-[#1e1e1e] mr-2">
              Password:
            </div>
            <div className="col-span-9">
              <input
                type="password"
                placeholder="Enter"
                style={{ boxShadow: "inset 0px 1px 0px rgba(0,0,0,.5)" }}
                className="w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-black"
              />
            </div>
          </div>
          <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px]">
            Change
          </button>
        </div>
      </div>
    </Model>
  );
};

export default ChangeStatusModal;
