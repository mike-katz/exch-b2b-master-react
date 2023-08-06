import React from "react";
import { useSelector } from "react-redux";
import { amountFormate } from "../../../utils/helper";

const AccountSummary = () => {
  const { userData } = useSelector((state) => state?.persist);
  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black">
        Account Summary
      </div>
      <div className="bg-[#FFFFFF] p-3 mt-4">
        <div className="text-[15px] text-[#3b5160] font-black">
          Your Balances
        </div>
        <div className="text-[#2789ce] text-[30px] font-black">
          {amountFormate(userData?.balance)}
          <span className="text-[#7e97a7] text-[12px] font-semibold ml-2">
            IR
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
