import React, { useState } from "react";
import AccountSummary from "./AccountSummary";
import AccountStatement from "./AccountStatement";
import Profile from "./Profile";
import ActivityLog from "./ActivityLog";
import { useSelector } from "react-redux";
import { roleStatus } from "../../../utils/helper";

const MyAccount = () => {
  const { userData } = useSelector((state) => state?.persist);
  const [activeTab, setActiveTab] = useState(1);

  const onClickTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="px-2 mt-2">
      <div className="border border-[#7e97a7] w-fit rounded px-[15px] flex items-center">
        {roleStatus(userData?.roles?.toString())}
        <div className="text-[#1e1e1e] text-[16px] font-black leading-[30px]">
          {userData?.username}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 lg:col-span-2 font-semibold">
          <div>
            <div className="bg-[#243a48] text-[#FFFFFF] px-[10px] border-b border-[#eee1c0] leading-[25px]">
              Position
            </div>
            <div
              onClick={() => {
                onClickTab(1);
              }}
              className={` px-[10px] border-b border-[#eee1c0] leading-[25px] cursor-pointer ${
                activeTab === 1
                  ? "bg-[rgba(0,0,0,.6)] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] hover:bg-[rgba(238,225,192,.4)]"
              }`}
            >
              Account Summary
            </div>
            <div
              onClick={() => {
                onClickTab(2);
              }}
              className={` px-[10px] border-b border-[#eee1c0] leading-[25px] cursor-pointer ${
                activeTab === 2
                  ? "bg-[rgba(0,0,0,.6)] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] hover:bg-[rgba(238,225,192,.4)]"
              }`}
            >
              Account Statement
            </div>
          </div>
          <div>
            <div className="bg-[#243a48] text-[#FFFFFF] px-[10px] border-b border-[#eee1c0] leading-[25px]">
              Account Details
            </div>
            <div
              onClick={() => {
                onClickTab(3);
              }}
              className={` px-[10px] border-b border-[#eee1c0] leading-[25px] cursor-pointer ${
                activeTab === 3
                  ? "bg-[rgba(0,0,0,.6)] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] hover:bg-[rgba(238,225,192,.4)]"
              }`}
            >
              Profile
            </div>
            <div
              onClick={() => {
                onClickTab(4);
              }}
              className={` px-[10px] border-b border-[#eee1c0] leading-[25px] cursor-pointer ${
                activeTab === 4
                  ? "bg-[rgba(0,0,0,.6)] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] hover:bg-[rgba(238,225,192,.4)]"
              }`}
            >
              Activity Log
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-10 py-4">
          {activeTab === 1 && <AccountSummary />}
          {activeTab === 2 && <AccountStatement />}
          {activeTab === 3 && <Profile />}
          {activeTab === 4 && <ActivityLog />}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
