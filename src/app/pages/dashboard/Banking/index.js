import React from "react";
// import Pagination from "../../../component/common/Pagination";
import Searching from "../../../component/form/Searching";

const Banking = () => {
  return (
    <div className="relative px-2">
      <div className="grid grid-cols-12 gap-4 mt-2">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Searching />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-2 flex items-center">
          <div className="text-[12px] font-black">Status: </div>
          <select className="ml-2 w-full h-[30px] border border-[#cdcdcd] uppercase text-[#2b2b2b] text-[12px] px-[5px]">
            <option value="0">ACTIVE</option>
            <option value="1">SUSPENDED</option>
            <option value="2">LOCKED</option>
            <option value="-1">ALL</option>
          </select>
        </div>
      </div>
      <div className="bg-[#e0e6e6] w-full py-4 px-2 mt-4 border-b border-[#7e97a7]">
        <div className="text-[#3b5160] text-[13px] font-black">
          Your Balance:{" "}
          <span className="font-normal">
            IR <span className="text-[23px] font-black">3,855,346.46</span>
          </span>
        </div>
      </div>
      <div className="table-responsive mt-4">
        <table className="w-full min-w-max table-auto text-left font-medium">
          <thead>
            <tr>
              <th className="">UID</th>
              <th className="text-right">Balance</th>
              <th className="text-right">Available D/W</th>
              <th className="text-right">Exposure</th>
              <th className="text-right border-l border-r border-[#7e97a7]">
                Check Balance
              </th>
              <th className="text-center border-r border-[#7e97a7]">
                Deposit / Withdraw
              </th>
              <th className="text-right">Credit Reference</th>
              <th className="text-right border-r border-[#7e97a7]">
                Reference P/L
              </th>
              <th className="text-right border-r border-[#7e97a7]">Remark</th>
              <th className="text-center">
                <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[11px] h-[28px] font-black w-[58px]">
                  All Log
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center">
                  <span className="w-[30px] text-[#999] text-center">1.</span>{" "}
                  12340ss
                </div>
              </td>
              <td className="text-right">13.00</td>
              <td className="text-right">13.00</td>
              <td className="text-right">0.00</td>
              <td
                className="text-right border-l border-r border-[#7e97a7]"
                width={200}
              >
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-[#7e97a7] flex flex-col items-start items-start">
                    <span>2023-07-29</span>
                    <span>15:33:51</span>
                  </div>
                  <div>13</div>
                </div>
              </td>
              <td className="text-center border-r border-[#7e97a7] flex items-center justify-center">
                <div className="flex items-center">
                  <button className="w-[30px] h-[30px] text-[14px] text-[#3b5160] flex justify-center items-center font-black border-r-0 border border-[#bbb] rounded-l deposit-withdraw-button">
                    D
                  </button>
                  <button className="w-[30px] h-[30px] text-[14px] text-[#3b5160] flex justify-center items-center font-black  border border-[#bbb] rounded-r deposit-withdraw-button">
                    W
                  </button>
                </div>
                <div className="mx-2">
                  <input
                    placeholder="0"
                    style={{ boxShadow: "inset 0px 2px 0px rgba(0,0,0,.1)" }}
                    className="w-full rounded p-[5px] text-[#1e1e1e] border border-[#aaa] font-black text-[14px]"
                  />
                </div>
                <div>
                  <button className="w-[45px] h-[30px] text-[12px] text-[#3b5160] flex justify-center items-center font-black border border-[#bbb] rounded">
                    Full
                  </button>
                </div>
              </td>
              <td className="text-right w-[200px]">
                <div className="flex items-center justify-end">
                  <input
                    placeholder="0"
                    style={{ boxShadow: "inset 0px 2px 0px rgba(0,0,0,.1)" }}
                    className="w-full rounded p-[5px] text-[#1e1e1e] border border-[#aaa] mr-2 text-right font-black text-[14px]"
                  />
                  {/* <div className="flex items-center underline text-[#2789ce] cursor-pointer mr-1">
                    0.00
                  </div> */}
                  <button className="w-[48px] h-[30px] text-[12px] text-[#3b5160] flex justify-center items-center font-black border border-[#bbb] rounded">
                    Edit
                  </button>
                </div>
              </td>
              <td className="text-right border-r border-[#7e97a7]">13.00</td>
              <td className="text-right border-r border-[#7e97a7]">
                <input
                  placeholder="Remark"
                  style={{ boxShadow: "inset 0px 2px 0px rgba(0,0,0,.1)" }}
                  className="rounded p-[5px] text-[#1e1e1e] border border-[#aaa] mr-2 text-right w-[100px]"
                />
              </td>
              <td className="text-center">
                <button className="common-button h-[28px] font-black w-[58px]">
                  Log
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-7 mb:pb-0 pb-20">
        {/* <Pagination itemsPerPage={4} /> */}
      </div>
      <div className="">
        <div className="fixed right-0 bottom-0 mt-2 w-full border-t border-[#d4d4d4] bg-[#eeeeee] py-2 overflow-hidden overflow-x-auto">
          <button className="common-button w-[130px] h-[33px] font-black text-[14px]">
            Clear All
          </button>
          <button className="bg-[#000000] text-[#feba11] rounded px-2 w-[228px] h-[33px] font-black text-[14px]">
            Submit <span>0</span> Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banking;
