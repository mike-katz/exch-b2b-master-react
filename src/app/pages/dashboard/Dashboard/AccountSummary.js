import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { getUserDetailData } from "../../../redux/services/DownLineUser";
import { useParams } from "react-router-dom";
import { amountFormate } from "../../../utils/helper";
import Loader from "../../../component/common/Loader";

const AccountSummary = () => {
  const [pageData, setPageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
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

  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black">
        Account Summary
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
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                    {pageData?.mobile || "-"}
                  </div>
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] flex items-center justify-between">
                    <div>********************************</div>
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
                </div>
                <div className="w-full">
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                    {amountFormate(pageData?.exposureLimit) || "-"}
                  </div>
                  <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                    {pageData?.commission || "-"}
                  </div>
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
