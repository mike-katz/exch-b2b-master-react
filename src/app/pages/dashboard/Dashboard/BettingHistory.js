import React, { useState } from "react";
import { FaMinusSquare, FaPlusSquare, FaUser } from "react-icons/fa";

const BettingHistory = () => {
  const [isVisibleHistory, setIsVisibleHistory] = useState(false);

  const onClickHideHistory = () => {
    setIsVisibleHistory(false);
  };

  const onClickShowHistory = () => {
    setIsVisibleHistory(true);
  };

  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black">
        Betting History
      </div>
      <div className="flex items-center my-2">
        <FaUser color="#7e97a6" className="mr-1" />
        12340ss
      </div>
      <div className="grid grid-cols-12 gap-4 items-end mb-4 mt-4 bg-[#e0e6e6] p-3 pt-2 rounded">
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">Betting Type :</div>
          <select className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2">
            <option value="all">All</option>
            <option value="settled">Exchange</option>
            <option value="unsettled">Fancy Bet</option>
            <option value="voided_bets">Sports Book</option>
            <option value="voided_bets">Book Maker</option>
            <option value="voided_bets">Binary</option>
          </select>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">Bet Status :</div>
          <select className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2">
            <option value="all">All</option>
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
          </select>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">From Date :</div>
          <input
            type="date"
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
            placeholder="Start Date"
          />
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">To Date :</div>
          <input
            type="date"
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
            placeholder="End Date"
          />
        </div>
        <div className="col-span-6 lg:col-span-2">
          <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px]">
            SUBMIT
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="">Bet ID</th>
              <th className="">PL ID</th>
              <th className="">Market</th>
              <th className="text-right">Selection</th>
              <th className="text-right">Type</th>
              <th className="text-right">Bet placed</th>
              <th className="text-right">Odds req.</th>
              <th className="text-right">Stake</th>
              <th className="text-right">Avg. odds matched</th>
              <th className="text-right">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center">
                  {isVisibleHistory ? (
                    <FaMinusSquare
                      onClick={onClickHideHistory}
                      fill="#4c5e6d"
                      className="mr-1"
                    />
                  ) : (
                    <FaPlusSquare
                      onClick={onClickShowHistory}
                      fill="#4c5e6d"
                      className="mr-1"
                    />
                  )}

                  <div className="text-[#2789ce] font-semibold">1288446886</div>
                </div>
              </td>
              <td>amit800sk</td>
              <td className="max-w-[200px]">
                CRICKET
                <span className="fromto absolute"></span>
                <strong className="ml-4">
                  Pretoria Capitals S d sd s RL T20 v Paarl Royals SRL T20
                </strong>
                <span className="fromto absolute"></span>
                <span className="ml-4">FANCY BET</span>
              </td>
              <td className="text-right">50 Over PAK</td>
              <td className="text-right">Yes</td>
              <td className="text-right">2023-07-26 10:32:23</td>
              <td className="text-right">216/100</td>
              <td className="text-right">100.00</td>
              <td className="text-right">216/100</td>
              <td className="text-right">100.00</td>
            </tr>
            {isVisibleHistory && (
              <tr className="">
                <td className="bg-[#e2e8ed]" colSpan="3"></td>
                <td className="bg-[#e2e8ed] p-0" colSpan="7">
                  <table className="border-l border-[#7e97a7] w-full">
                    <tr className="border-b  border-[#7e97a7]">
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Bet taken
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Odds req.
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Stake
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Liability
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Odds matched
                      </th>
                    </tr>
                    <tr className="bg-[#FFFFFF]">
                      <th className="px-[10px] py-[8px] text-right">
                        2023-07-26 13:53:31
                      </th>
                      <th className="px-[10px] py-[8px] text-right">9.4</th>
                      <th className="px-[10px] py-[8px] text-right">100.00</th>
                      <th className="px-[10px] py-[8px] text-right">-</th>
                      <th className="px-[10px] py-[8px] text-right">9.4</th>
                    </tr>
                  </table>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BettingHistory;
