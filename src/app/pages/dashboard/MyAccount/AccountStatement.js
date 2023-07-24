import React from "react";
import { FaCaretRight } from "react-icons/fa";
import Pagination from "../../../component/common/Pagination";

const AccountStatement = () => {
  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black">
        Account Statement
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th className="text-right">Deposit</th>
            <th className="text-right">Withdraw</th>
            <th className="text-right">Balance</th>
            <th className="text-right">Remark</th>
            <th className="text-right">From/To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-07-17 17:50:06</td>
            <td className="text-right">300.00</td>
            <td className="text-right text-[#d0021b]">(500.00) </td>
            <td className="text-right">300.00</td>
            <td className="text-right">2%</td>
            <td className="text-right w-[100px]">
              <div className="flex items-center justify-end">
                skyid0080 <FaCaretRight className="mx-1" /> babli44q
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center  my-7">
        <Pagination itemsPerPage={4} />
      </div>
    </div>
  );
};

export default AccountStatement;
