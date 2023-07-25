import React from "react";
import { FaUser } from "react-icons/fa";

const AccountSummary = () => {
  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black">
        Account Summary
      </div>
      <div className="flex items-center my-2">
        <FaUser className="mr-1" />
        12340ss
      </div>
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
            <td>13.00</td>
            <td>13.00</td>
            <td>0.00</td>
          </tr>
        </tbody>
      </table>
      <div className="text-[#243a48] text-[16px] font-black mt-4">Profile</div>
      <div className="grid grid-cols-12 gap-4 mt-2">
        <div className="col-span-6">
          <div className="bg-[#7e97a7] text-[#ffffff] px-[10px] text-[15px] font-black leading-[24px]">
            About You
          </div>
          <div className="bg-[#FFFFFF] flex w-full">
            <div className="mr-4">
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                E-Mail
              </div>
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
                skyid0080@gmail.com
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                9877899876
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
        <div className="col-span-6">
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
                200,000.00
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                2.0%
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
    </div>
  );
};

export default AccountSummary;
