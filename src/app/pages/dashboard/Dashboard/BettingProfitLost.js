import React, { useState } from "react";
import { FaMinusSquare, FaPlusSquare, FaUser } from "react-icons/fa";

const BettingProfitLost = () => {
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
        Betting Profit & Loss : Main wallet
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
            <option value="unsettled">Casino</option>
            <option value="voided_bets">Sports Book</option>
            <option value="voided_bets">Book Maker</option>
            <option value="voided_bets">BPoker</option>
            <option value="voided_bets">Binary</option>
            <option value="voided_bets">SABA</option>
            <option value="voided_bets">Sky Trader</option>
            <option value="voided_bets">Mini Game</option>
            <option value="voided_bets">Royal</option>
          </select>
        </div>
        {/* <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">Bet Status :</div>
          <select className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2">
            <option value="all">All</option>
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
          </select>
        </div> */}
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
              <th className="">Market</th>
              <th className="text-right">Start Time</th>
              <th className="text-right">Settled date</th>
              <th className="text-right">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                CRICKET
                <span className="fromto absolute"></span>
                <strong className="ml-4">
                  Pretoria Capitals S d sd s RL T20 v Paarl Royals SRL T20
                </strong>
                <span className="fromto absolute"></span>
                <span className="ml-4">FANCY BET</span>
              </td>
              <td className="text-right">2023-07-26 10:32:23</td>
              <td className="text-right">2023-07-26 10:32:23</td>
              <td className="text-right">
                <div className="flex items-center justify-end">
                  <div className="font-semibold">1288446886</div>
                  {isVisibleHistory ? (
                    <FaMinusSquare
                      onClick={onClickHideHistory}
                      fill="#4c5e6d"
                      className="ml-1"
                    />
                  ) : (
                    <FaPlusSquare
                      onClick={onClickShowHistory}
                      fill="#4c5e6d"
                      className="ml-1"
                    />
                  )}
                </div>
              </td>
            </tr>
            {isVisibleHistory && (
              <tr className="">
                <td
                  className="bg-[#e2e8ed] p-0 border-b border-[#7e97a7]"
                  colSpan="4"
                >
                  <table className="border-l border-r border-[#7e97a7] w-[78%] ml-[20%] ">
                    <tr className="border-b  border-[#7e97a7]">
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Bet ID
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Selection
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Odds
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Stake
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Type
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Placed
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Profit/Loss
                      </th>
                    </tr>
                    <tr className="bg-[#f2f4f7]">
                      <th className="text-right font-normal">1288566533</th>
                      <th className="text-right font-normal">-</th>
                      <th className="text-right font-normal">21/90</th>
                      <th className="text-right font-normal">100.00</th>
                      <th className="text-right font-normal">Yes</th>
                      <th className="text-right font-normal">
                        2023-07-26 16:26:20
                      </th>
                      <th className="px-[10px] py-[8px] text-right">
                        (100.00)
                      </th>
                    </tr>
                    <tr className="bg-[aliceblue] border-t border-[#7e97a7]">
                      <th colSpan={6} className="text-right font-normal">
                        <div>Total Stakes</div>
                        <div>Yes Subtotal</div>
                        <div>No Subtotal</div>
                        <div>Market Subtotal</div>
                        <div className="border-t border-[#7e97a7] py-1 mt-1">
                          Net Market Total
                        </div>
                      </th>
                      <th className="text-right font-normal pr-2">
                        <div>300.00</div>
                        <div>255.00</div>
                        <div>0.00</div>
                        <div>255.00</div>
                        <div className="border-t border-[#7e97a7] py-1 mt-1">
                          255.00
                        </div>
                      </th>
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

export default BettingProfitLost;
