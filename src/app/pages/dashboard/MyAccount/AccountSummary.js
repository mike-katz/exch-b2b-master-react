import React from "react";

const AccountSummary = () => {
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
          4,154,551.63
          <span className="text-[#7e97a7] text-[12px] font-semibold ml-2">
            IR
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
