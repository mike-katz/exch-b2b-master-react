import React, { useEffect, useState } from "react";
// import Pagination from "../../../component/common/Pagination";
import Searching from "../../../component/form/Searching";

const DATA = [1, 1, 1, 1];

const BankingUser = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pageSubmitData, setPageSubmitData] = useState([]);
  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    onClickClearAll();
  }, []);

  const onChangePassword = (e) => {
    setPassword(e?.target?.value);

    if (e?.target?.value) {
      setPasswordError("");
    } else {
      setPasswordError("Please enter password");
    }
  };

  const onChangeDW = (value, index) => {
    const customizeData = [...pageSubmitData];
    customizeData[index].dw = value;
    setPageSubmitData(customizeData);

    let count = 0;

    customizeData?.map((item) => {
      if (item?.dw || item?.creditRef || item?.remark) {
        count += 1;
      }
    });

    setChangeCount(count);
  };

  const onChangeCreditRef = (value, index) => {
    const customizeData = [...pageSubmitData];
    customizeData[index].creditRef = value;
    setPageSubmitData(customizeData);

    let count = 0;

    customizeData?.map((item) => {
      if (item?.dw || item?.creditRef || item?.remark) {
        count += 1;
      }
    });

    setChangeCount(count);
  };

  const onChangeRemark = (value, index) => {
    const customizeData = [...pageSubmitData];
    customizeData[index].remark = value;
    setPageSubmitData(customizeData);

    let count = 0;

    customizeData?.map((item) => {
      if (item?.dw || item?.creditRef || item?.remark) {
        count += 1;
      }
    });

    setChangeCount(count);
  };

  const onClickClearAll = () => {
    const data = [];
    DATA?.map((item) => {
      data?.push({ dw: "", creditRef: "", remark: "" });
    });
    setPageSubmitData(data);
  };

  const onSubmitPayment = () => {};

  const onClickD = () => {};

  const onClickW = () => {};

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
            {DATA?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="flex items-center">
                      <span className="w-[30px] text-[#999] text-center">
                        1.
                      </span>{" "}
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
                      <button
                        onClick={onClickD}
                        className="w-[30px] h-[30px] text-[14px] text-[#3b5160] flex justify-center items-center font-black border-r-0 border border-[#bbb] rounded-l deposit-withdraw-button"
                      >
                        D
                      </button>
                      <button
                        onClick={onClickW}
                        className="w-[30px] h-[30px] text-[14px] text-[#3b5160] flex justify-center items-center font-black  border border-[#bbb] rounded-r deposit-withdraw-button"
                      >
                        W
                      </button>
                    </div>
                    <div className="mx-2">
                      <input
                        type="number"
                        onChange={(e) => {
                          onChangeDW(e?.target?.value, index);
                        }}
                        value={pageSubmitData?.[index]?.dw || ""}
                        placeholder="0"
                        style={{
                          boxShadow: "inset 0px 2px 0px rgba(0,0,0,.1)",
                        }}
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
                        type="number"
                        onChange={(e) => {
                          onChangeCreditRef(e?.target?.value, index);
                        }}
                        value={pageSubmitData?.[index]?.creditRef || ""}
                        placeholder="0"
                        style={{
                          boxShadow: "inset 0px 2px 0px rgba(0,0,0,.1)",
                        }}
                        className="w-full rounded p-[5px] text-[#1e1e1e] border border-[#aaa] mr-2 text-right font-black text-[14px]"
                      />

                      <button className="w-[48px] h-[30px] text-[12px] text-[#3b5160] flex justify-center items-center font-black border border-[#bbb] rounded">
                        Edit
                      </button>
                    </div>
                  </td>
                  <td className="text-right border-r border-[#7e97a7]">
                    13.00
                  </td>
                  <td className="text-right border-r border-[#7e97a7]">
                    <input
                      onChange={(e) => {
                        onChangeRemark(e?.target?.value, index);
                      }}
                      value={pageSubmitData?.[index]?.remark || ""}
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
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-7 mb:pb-0 pb-20">
        {/* <Pagination itemsPerPage={4} /> */}
      </div>
      <div className="fixed right-0 bottom-0 mt-2 w-full border-t border-[#d4d4d4] bg-[#eeeeee] py-2 overflow-hidden overflow-x-auto">
        <div className="flex items-center justify-center">
          <button
            onClick={onClickClearAll}
            className="common-button w-[130px] h-[35px] font-black text-[14px]"
          >
            Clear All
          </button>
          <div className="flex items-center bg-[#c5d0d7] rounded p-[5px] ml-[10px]">
            <div>
              <input
                onChange={onChangePassword}
                value={password}
                type="password"
                placeholder="Password"
                style={{ boxShadow: "inset 0px 1px 0px rgba(0,0,0,.5)" }}
                className="w-full rounded p-[5px] text-[12px] text-[#1e1e1e] font-black h-[35px] text-center"
              />
              {passwordError && (
                <div className="text-[12px] text-[red] mt-[1px]">
                  {passwordError}
                </div>
              )}
            </div>
            <button
              onClick={onSubmitPayment}
              className="bg-[#000000] text-[#feba11] rounded px-2 w-[228px] h-[35px] font-black text-[14px] whitespace-nowrap ml-[10px] flex items-center justify-center"
            >
              Submit{" "}
              <div className="bg-[rgba(255,255,255,.2)] w-[24px] h-[24px] rounded-full text-[12px] font-normal text-center text-[#FFFFFF] leading-[24px] mx-2">
                {changeCount}
              </div>{" "}
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingUser;
