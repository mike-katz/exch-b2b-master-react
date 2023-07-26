import React from "react";

const TransactionHistory = () => {
  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black">
        Transaction History
      </div>
      <div className="table-responsive">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="">Date/Time</th>
              <th className="text-right">Deposit</th>
              <th className="text-right">Withdraw</th>
              <th className="text-right">Balance</th>
              <th className="text-right">Remark</th>
              <th className="text-right">From/To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-07-26 18:21:36 </td>
              <td className="text-right">200.00</td>
              <td className="text-right">-</td>
              <td className="text-right">200.72</td>
              <td className="text-right">2%</td>
              <td className="text-right">
                Master Agent
                {/* <span className="fromto absolute"></span> */}
                <span className="ml-4">abhishek35s</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
