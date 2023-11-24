import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../component/common/Loader";
import { getUserDetailData } from "../../../redux/services/DownLineUser";
import { amountFormate } from "../../../utils/helper";
import ChangePasswordModal from ".//ChangePasswordModal";
import EditCasinoEnable from "./EditCasinoEnable";
import EditCommissionModal from "./EditCommissionModal";
import EditExposureLimitModal from "./EditExposureLimitModal";
import EditMobileNumberModal from "./EditMobileNumberModal";

const AccountSummary = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleExposureLimit, setIsVisibleExposureLimit] = useState(false);
  const [isVisibleCommission, setIsVisibleCommission] = useState(false);
  const [isVisibleMobileNumber, setIsVisibleMobileNumber] = useState(false);
  const [isVisibleEnableCasino, setIsVisibleEnableCasino] = useState(false);
  const [pageData, setPageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    getUserDetail(userId);
  }, [userId]);

  const getUserDetail = async (userId) => {
    const payload = {
      userId,
    };
    setIsLoading(true);
    const data = await getUserDetailData(payload);

    if (data?.data) {
      setPageData(data?.data);
    }
    setIsLoading(false);
  };

  const onShowChangePassword = () => {
    setIsVisiblePassword(true);
  };

  const onCloseChangePassword = () => {
    setIsVisiblePassword(false);
  };

  const onRefreshTable = () => {
    getUserDetail(userId);
  };

  const onCloseExposureLimit = () => {
    setIsVisibleExposureLimit(false);
  };

  const onCloseCommission = () => {
    setIsVisibleCommission(false);
  };

  const onCloseMobileNumber = () => {
    setIsVisibleMobileNumber(false);
  };

  const onCloseCasinoEnable = () => {
    setIsVisibleEnableCasino(false);
  };

  const enableLength = [];

  if (pageData?.isCasino) {
    enableLength.push(1);
  }

  if (pageData?.isIntCasino) {
    enableLength.push(1);
  }

  if (pageData?.isAviator) {
    enableLength.push(1);
  }

  if (pageData?.isSportBook) {
    enableLength.push(1);
  }

  return (
    <div>
      <ChangePasswordModal
        userId={userId}
        isVisible={isVisiblePassword}
        onCloseMenu={onCloseChangePassword}
      />

      <EditExposureLimitModal
        activeId={userId}
        activeExposureLimit={pageData?.exposureLimit}
        onRefreshTable={onRefreshTable}
        isVisible={isVisibleExposureLimit}
        onCloseMenu={onCloseExposureLimit}
      />

      <EditCommissionModal
        activeId={userId}
        activeCommission={pageData?.commission}
        onRefreshTable={onRefreshTable}
        isVisible={isVisibleCommission}
        onCloseMenu={onCloseCommission}
      />

      <EditMobileNumberModal
        activeId={userId}
        activeMobileNumber={pageData?.mobile}
        onRefreshTable={onRefreshTable}
        isVisible={isVisibleMobileNumber}
        onCloseMenu={onCloseMobileNumber}
      />

      <EditCasinoEnable
        activeId={userId}
        isCasino={pageData?.isCasino}
        isAviator={pageData?.isAviator}
        isIntCasino={pageData?.isIntCasino}
        isSportBook={pageData?.isSportBook}
        onRefreshTable={onRefreshTable}
        isVisible={isVisibleEnableCasino}
        onCloseMenu={onCloseCasinoEnable}
      />

      <div className="flex items-center justify-between">
        <div className="text-[#243a48] text-[16px] font-black">
          Account Summary
        </div>
        {/* <div className="text-[#243a48] text-[16px] font-black">Logs</div> */}
        <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[11px] h-[28px] font-black w-[58px]">
          <Link target="_blank" to={`/profile-logs-all/${userId}`} className="">
            All Log
          </Link>
        </button>
      </div>

      {isLoading ? (
        <div className="h-[200px] flex justify-center items-center">
          <Loader size={30} color={"#FEBA11"} />
        </div>
      ) : (
        <>
          <div className="flex items-center my-2">
            <FaUser color="#7e97a6" className="mr-1" />
            {pageData?.username}
          </div>
          <div className="table-responsive">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="">Wallet</th>
                  <th className="">Available to Bet </th>
                  <th className="">Funds available to withdraw</th>
                  <th className="">Current exposure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Main wallet</td>
                  <td>{amountFormate(pageData?.balance)}</td>
                  <td>{amountFormate(pageData?.balance)}</td>
                  <td>{amountFormate(pageData?.exposure)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-[#243a48] text-[16px] font-black mt-4">
            Profile
          </div>
          <div className="grid grid-cols-12 gap-4 mt-2">
            <div className="md:col-span-6 col-span-12">
              <div className="bg-[#7e97a7] text-[#ffffff] px-[10px] text-[15px] font-black leading-[24px]">
                About You
              </div>
              <div className="bg-[#FFFFFF] flex w-full">
                <div className="mr-4">
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                    Phone
                  </div>
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                    Password
                  </div>
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                    Time Zone
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] flex items-center justify-between">
                    {pageData?.mobile || "-"}
                    <div
                      onClick={() => {
                        setIsVisibleMobileNumber(true);
                      }}
                      className="text-[#2789ce] flex items-center cursor-pointer"
                    >
                      Edit
                      <FaPencilAlt className="ml-1" />
                    </div>
                  </div>
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] flex items-center justify-between">
                    <div>********************************</div>
                    <div
                      onClick={onShowChangePassword}
                      className="text-[#2789ce] flex items-center cursor-pointer"
                    >
                      Edit
                      <FaPencilAlt className="ml-1" />
                    </div>
                  </div>
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                    IST
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div className="bg-[#7e97a7] text-[#ffffff] px-[10px] text-[15px] font-black leading-[24px]">
                Limits & Commission
              </div>
              <div className="bg-[#FFFFFF] flex w-full">
                <div className="mr-4">
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                    Exposure Limit
                  </div>
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                    Commission
                  </div>
                  {pageData?.roles?.toString() === "WhiteLabel" && (
                    <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                      Enabled
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] flex items-center justify-between">
                    {amountFormate(pageData?.exposureLimit) || "-"}
                    <div
                      onClick={() => {
                        setIsVisibleExposureLimit(true);
                      }}
                      className="text-[#2789ce] flex items-center cursor-pointer"
                    >
                      Edit
                      <FaPencilAlt className="ml-1" />
                    </div>
                  </div>
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] flex items-center justify-between">
                    {pageData?.commission || "-"}
                    <div
                      onClick={() => {
                        setIsVisibleCommission(true);
                      }}
                      className="text-[#2789ce] flex items-center cursor-pointer"
                    >
                      Edit
                      <FaPencilAlt className="ml-1" />
                    </div>
                  </div>
                  {pageData?.roles?.toString() === "WhiteLabel" && (
                    <div
                      className={`text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] flex items-center ${
                        enableLength?.length > 0
                          ? "justify-between"
                          : "justify-end"
                      }`}
                    >
                      {pageData?.isCasino
                        ? enableLength?.length > 0
                          ? "Casino, "
                          : "Casino."
                        : ""}
                      {pageData?.isIntCasino
                        ? enableLength?.length > 1
                          ? "Int Casino, "
                          : "Int Casino."
                        : ""}
                      {pageData?.isSportBook
                        ? enableLength?.length > 2
                          ? "Sport Book, "
                          : "Sport Book."
                        : ""}
                      {pageData?.isAviator
                        ? enableLength?.length > 3
                          ? "Aviator, "
                          : "Aviator."
                        : ""}
                      <div
                        onClick={() => {
                          setIsVisibleEnableCasino(true);
                        }}
                        className="text-[#2789ce] flex items-center cursor-pointer"
                      >
                        Edit
                        <FaPencilAlt className="ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSummary;
