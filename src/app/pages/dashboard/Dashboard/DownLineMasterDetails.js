import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountSummary from "./AccountSummary";
import BettingHistory from "./BettingHistory";
import BettingProfitLost from "./BettingProfitLost";
import TransactionHistory from "./TransactionHistory";
import ActivityLog from "./ActivityLog";
import { getUserParentListData } from "../../../redux/services/DownLineUser";
import { roleStatus } from "../../../utils/helper";
// import AccountStatement from "./AccountStatement";
// import Profile from "./Profile";
// import ActivityLog from "./ActivityLog";

const DownLineMasterDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [parentListData, setParentListData] = useState([]);

  const { activeName, userId } = useParams();

  useEffect(() => {
    getUserParentList(userId);
  }, [userId]);

  const getUserParentList = async () => {
    const payload = { userId };

    const data = await getUserParentListData(payload);

    if (data?.data) {
      setParentListData(data?.data);
    }
  };

  // const onClickTab = (tab) => {
  //   setActiveTab(tab);
  // };

  useEffect(() => {
    setActiveTab(activeName);
  }, [activeName]);

  const onClickMenu = (id) => {
    navigate(`/down-list-master/details/${id}/${userId}`);
  };

  const onClickUser = (id) => {
    navigate(`/down-list-master/details/${activeName}/${id}`);
  };

  return (
    <div className="px-2 mt-2">
      <div className="flex items-center border border-[#7e97a7] w-fit">
        {parentListData?.map((item, index) => {
          return (
            <div
              onClick={() => {
                if (index !== 0) {
                  onClickUser(item?._id);
                }
              }}
              key={index}
              className={`w-fit rounded px-[15px] flex items-center ${
                index === 0
                  ? "agent_path-L"
                  : parentListData?.length === index + 1
                  ? ""
                  : "agent_path-L cursor-pointer"
              }`}
            >
              {roleStatus(item?.roles?.toString())}
              <div className="text-[#1e1e1e] text-[16px] font-black leading-[30px]">
                {item?.username}
              </div>
            </div>
          );
        })}
        {/* <div className="w-fit rounded px-[15px] flex items-center agent_path-L">
          <div className="bg-[#85b352] uppercase text-[#FFFFFF] text-[10px] rounded px-1 mr-2">
            MA
          </div>
          <div className="text-[#1e1e1e] text-[16px] font-black leading-[30px]">
            skyid0080
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 lg:col-span-2 font-semibold">
          <div>
            <div className="bg-[#243a48] text-[#FFFFFF] px-[10px] border-b border-[#eee1c0] leading-[25px]">
              Position
            </div>
            <div
              onClick={() => {
                onClickMenu("account-summery");
              }}
              className={` px-[10px] border-b border-[#eee1c0] leading-[25px] cursor-pointer ${
                activeTab === "account-summery"
                  ? "bg-[rgba(0,0,0,.6)] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] hover:bg-[rgba(238,225,192,.4)]"
              }`}
            >
              Account Summary
            </div>
          </div>
          <div>
            <div className="bg-[#243a48] text-[#FFFFFF] px-[10px] border-b border-[#eee1c0] leading-[25px]">
              Performance
            </div>
            {parentListData[parentListData?.length - 1]?.roles?.toString() ===
            "User" ? (
              <>
                <div
                  onClick={() => {
                    onClickMenu("beating-history");
                  }}
                  className={` px-[10px] border-b border-[#eee1c0] leading-[25px] cursor-pointer ${
                    activeTab === "beating-history"
                      ? "bg-[rgba(0,0,0,.6)] text-[#FFFFFF]"
                      : "bg-[#FFFFFF] hover:bg-[rgba(238,225,192,.4)]"
                  }`}
                >
                  Beating History
                </div>
                <div
                  onClick={() => {
                    onClickMenu("beating-profit-lost");
                  }}
                  className={` px-[10px] border-b border-[#eee1c0] leading-[25px] cursor-pointer ${
                    activeTab === "beating-profit-lost"
                      ? "bg-[rgba(0,0,0,.6)] text-[#FFFFFF]"
                      : "bg-[#FFFFFF] hover:bg-[rgba(238,225,192,.4)]"
                  }`}
                >
                  Beating Profit & Lost
                </div>
              </>
            ) : null}

            <div
              onClick={() => {
                onClickMenu("transactions-history");
              }}
              className={` px-[10px] border-b border-[#eee1c0] leading-[25px] cursor-pointer ${
                activeTab === "transactions-history"
                  ? "bg-[rgba(0,0,0,.6)] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] hover:bg-[rgba(238,225,192,.4)]"
              }`}
            >
              Transactions History
            </div>
            <div
              onClick={() => {
                onClickMenu("activity-log");
              }}
              className={` px-[10px] border-b border-[#eee1c0] leading-[25px] cursor-pointer ${
                activeTab === "activity-log"
                  ? "bg-[rgba(0,0,0,.6)] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] hover:bg-[rgba(238,225,192,.4)]"
              }`}
            >
              Activity Log
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-10 pb-4">
          {activeTab === "account-summery" && <AccountSummary />}
          {parentListData[parentListData?.length - 1]?.roles?.toString() ===
          "User" ? (
            <>
              {activeTab === "beating-history" && (
                <BettingHistory
                  username={
                    parentListData[parentListData?.length - 1]?.username
                  }
                />
              )}
              {activeTab === "beating-profit-lost" && <BettingProfitLost />}
            </>
          ) : null}
          {activeTab === "transactions-history" && <TransactionHistory />}
          {activeTab === "activity-log" && <ActivityLog />}
          {/* {activeTab === 2 && <AccountStatement />}
          {activeTab === 3 && <Profile />}
          {activeTab === 4 && <ActivityLog />} */}
        </div>
      </div>
    </div>
  );
};

export default DownLineMasterDetails;
