import React, { useState } from "react";
import { FaCircle, FaWindowClose } from "react-icons/fa";
import Loader from "../../../component/common/Loader";
import Model from "../../../component/common/Modal";
import { changeStatusData } from "../../../redux/services/DownLineUser";
import { roleStatus } from "../../../utils/helper";

const ChangeStatusModal = ({
  isVisible,
  onCloseMenu,
  initialActiveStatus,
  activeId,
  onRefreshTable,
  activeUser,
  activeRole,
}) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSelectStatus = (status) => {
    setActiveStatus(status);
  };

  const onChangePassword = (e) => {
    setPassword(e?.target?.value);

    if (e?.target?.value) {
      setPasswordError("");
    } else {
      setPasswordError("Please enter password");
    }
  };

  const onSubmitStatus = async () => {
    if (!password) {
      setPasswordError("Please enter password");
      return false;
    }

    const payload = {
      status: activeStatus,
      password: password,
      userId: activeId,
    };

    setIsLoading(true);
    const data = await changeStatusData(payload);

    if (data) {
      setActiveStatus("");
      setPassword("");
      setPasswordError("");
      onRefreshTable();
      onCloseMenu();
    }

    setIsLoading(false);
  };

  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded w-full">
        <div className="p-[15px] flex items-center justify-between sm:min-w-[500px]">
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
              {roleStatus(activeRole)}
              {activeUser}
            </div>
            {initialActiveStatus === "active" ? (
              <div className="text-[#508d0e] text-[11px] w-fit flex items-center font-black px-1 py-[2px] rounded">
                <FaCircle size={8} className="mr-1" />
                Active
              </div>
            ) : initialActiveStatus === "suspend" ? (
              <div className="text-[#d0021b] text-[11px] w-fit flex items-center font-black px-1 py-[2px] rounded">
                <FaCircle size={8} className="mr-1" />
                Suspended
              </div>
            ) : (
              <div className="text-[#5a7384] text-[11px] w-fit flex items-center font-black px-1 py-[2px] rounded">
                <FaCircle size={8} className="mr-1" />
                Locked
              </div>
            )}
          </div>
          <div className="flex items-center sm:justify-center justify-around py-4 px-[5px] sm:flex-row flex-col">
            <div
              onClick={() => {
                if (initialActiveStatus !== "active") {
                  onSelectStatus("active");
                }
              }}
              className={`but_active ${
                initialActiveStatus === "active" ? "disabled_button" : ""
              } ${activeStatus === "active" ? "active_open" : ""}`}
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={
                    initialActiveStatus === "active"
                      ? "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_active_gray.png"
                      : activeStatus === "active"
                      ? "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_active_open.png"
                      : "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_active.png"
                  }
                  className="h-[33px] w-[33px]"
                />
                <div>Active</div>
              </div>
            </div>
            <div
              onClick={() => {
                if (initialActiveStatus !== "suspend") {
                  if (initialActiveStatus !== "locked") {
                    onSelectStatus("suspend");
                  }
                }
              }}
              className={`but_suspend ${
                initialActiveStatus === "suspend" ||
                initialActiveStatus === "locked"
                  ? "disabled_button"
                  : ""
              } ${activeStatus === "suspend" ? "suspend_open" : ""}`}
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={
                    initialActiveStatus === "suspend" ||
                    initialActiveStatus === "locked"
                      ? "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_suspend_gray.png"
                      : activeStatus === "suspend"
                      ? "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_suspend_open.png"
                      : "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_suspend.png"
                  }
                  className="h-[33px] w-[33px]"
                />
                <div>Suspend</div>
              </div>
            </div>
            <div
              onClick={() => {
                if (initialActiveStatus !== "locked") {
                  onSelectStatus("locked");
                }
              }}
              className={`but_locked ${
                initialActiveStatus === "locked" ? "disabled_button" : ""
              } ${activeStatus === "locked" ? "locked_open" : ""}`}
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={
                    initialActiveStatus === "locked"
                      ? "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_locked_gray.png"
                      : activeStatus === "locked"
                      ? "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_locked_open.png"
                      : "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/ico_lock.png"
                  }
                  className="h-[33px] w-[33px]"
                />
                <div>Locked</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-4 sm:flex-row flex-col">
          <div className="flex items-center mr-4">
            <div className="col-span-3 text-[12px] text-[#1e1e1e] mr-2">
              Password:
            </div>
            <div className="col-span-9">
              <input
                onChange={onChangePassword}
                value={password}
                type="password"
                placeholder="Enter"
                style={{ boxShadow: "inset 0px 1px 0px rgba(0,0,0,.5)" }}
                className="w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-black"
              />
              {passwordError && (
                <div className="text-[12px] text-[red] mt-[1px]">
                  {passwordError}
                </div>
              )}
            </div>
          </div>
          <button
            disabled={isLoading}
            onClick={onSubmitStatus}
            className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px] flex items-center justify-center"
          >
            {isLoading && <Loader color="#feba11" size={10} />} Change
          </button>
        </div>
      </div>
    </Model>
  );
};

export default ChangeStatusModal;
