import React, { useEffect, useState } from "react";
// import Pagination from "../../../component/common/Pagination";
import Searching from "../../../component/form/Searching";
import {
  addBankTransactionData,
  getDownLineUserData,
  getMyBalanceData,
  getUserSt8BalanceData,
  withdrawUserSt8BalanceData,
} from "../../../redux/services/DownLineUser";
import Loader from "../../../component/common/Loader";
import Pagination from "../../../component/common/Pagination";
import { amountFormate, roleStatus } from "../../../utils/helper";
import { Link } from "react-router-dom";
import { USER_STATUS } from "../../../utils/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from "../../../redux/actions/persistAction";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

const BankingMaster = () => {
  const { userData } = useSelector((state) => state?.persist);
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pageSubmitData, setPageSubmitData] = useState([]);
  const [changeCount, setChangeCount] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [casinoBalance, setCasinoBalance] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isLoadingRecall, setIsLoadingRecall] = useState(false);
  const [isEnableBalanceView, setIsEnableBalanceView] = useState(false);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const [searchParams, setSearchParams] = useState("");
  const [statusParams, setStatusParams] = useState("");

  const [isLoadingTable, setIsLoadingTable] = useState(false);

  // useEffect(() => {
  //   onClickClearAll();
  // }, []);

  useEffect(() => {
    getDownLineUser();
  }, []);

  const getDownLineUser = async (payloadParams = false) => {
    let payload = {};
    if (payloadParams) {
      payload = payloadParams;
    } else {
      payload = {
        page: currentPage,
        limit: perPage,
        search: searchParams,
        status: statusParams,
      };
    }
    setIsLoadingTable(true);
    const data = await getDownLineUserData(payload);

    if (data) {
      const clearData = [];
      data?.data?.results?.map((item) => {
        clearData?.push({
          userId: item?._id,
          dw: "",
          creditRef: "",
          remark: "",
          type: "",
          isVisibleCreditRef: false,
        });
      });
      setPageSubmitData(clearData);

      setTotalPage(data?.data?.totalPages);
      setPerPage(data?.data?.limit);
      setCurrentPage(data?.data?.page);
      setPageData(data?.data?.results);
      setPageData(data?.data?.results);
    }
    setIsLoadingTable(false);
  };

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
    pageData?.map((item) => {
      data?.push({
        userId: item?._id,
        dw: "",
        creditRef: "",
        remark: "",
        type: "",
        isVisibleCreditRef: false,
      });
    });
    setPageSubmitData(data);
  };

  const onSubmitPayment = async () => {
    if (!password) {
      setPasswordError("Please enter password");
      return false;
    }

    const submitData = [];

    pageSubmitData?.map((item) => {
      if (item?.dw || item?.creditRef || item?.remark) {
        submitData.push({
          userId: item?.userId,
          balance: Number(item?.dw) ? Number(item?.dw) : "",
          type:
            item?.type === "D"
              ? "deposit"
              : item?.type === "W"
              ? "withdraw"
              : "",
          remark: item?.remark,
          creditRef: Number(item?.creditRef) ? Number(item?.creditRef) : "",
        });
      }
    });

    if (submitData?.length > 0) {
      const payload = {
        password: password,
        data: submitData,
      };

      const data = await addBankTransactionData(payload);

      if (data) {
        setPassword("");
        setPasswordError("");
        setChangeCount(0);
        const balanceData = await getMyBalanceData();

        if (balanceData) {
          dispatch(updateBalance(balanceData?.data));
        }
        getDownLineUser();
      }
    }
  };

  const onClickD = (value, index) => {
    const customizeData = [...pageSubmitData];
    customizeData[index].type = value;
    setPageSubmitData(customizeData);

    let count = 0;

    customizeData?.map((item) => {
      if (item?.dw || item?.creditRef || item?.remark) {
        count += 1;
      }
    });

    setChangeCount(count);
  };

  const onClickW = (value, index) => {
    const customizeData = [...pageSubmitData];
    customizeData[index].type = value;
    setPageSubmitData(customizeData);

    let count = 0;

    customizeData?.map((item) => {
      if (item?.dw || item?.creditRef || item?.remark) {
        count += 1;
      }
    });

    setChangeCount(count);
  };

  const onClickEnableEdit = (value, index) => {
    const customizeData = [...pageSubmitData];

    if (value) {
      customizeData[index].isVisibleCreditRef = value;
    } else {
      customizeData[index].isVisibleCreditRef = value;
      customizeData[index].creditRef = "";
    }

    setPageSubmitData(customizeData);

    let count = 0;

    customizeData?.map((item) => {
      if (item?.dw || item?.creditRef || item?.remark) {
        count += 1;
      }
    });

    setChangeCount(count);
  };

  const onClickFull = (value, index) => {
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

  const onRefreshPagination = (count) => {
    setCurrentPage(count);
    const payload = {
      page: count,
      limit: perPage,
      search: searchParams,
      status: statusParams,
      // userId: activePageId,
    };

    getDownLineUser(payload);
  };

  const onChangeSearch = (e) => {
    setSearchParams(e?.target?.value);
  };

  const onSubmitSearch = () => {
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: perPage,
      search: searchParams,
      status: statusParams,
      // userId: activePageId,
    };

    getDownLineUser(payload);
  };

  const onChangeStatus = (e) => {
    setStatusParams(e?.target?.value);

    const payload = {
      page: currentPage,
      limit: perPage,
      search: searchParams,
      status: e?.target?.value,
      // userId: activePageId,
    };

    getDownLineUser(payload);
  };

  const onClickBalance = async (username) => {
    if (username === isEnableBalanceView) {
      setIsEnableBalanceView(false);
    } else {
      setIsLoadingBalance(username);
      const payload = {
        username,
      };
      const data = await getUserSt8BalanceData(payload);

      if (data?.data) {
        setCasinoBalance(data?.data?.balance);
      }

      setIsLoadingBalance(false);

      setIsEnableBalanceView(username);
    }
  };

  const onClickRecallCasino = async (username) => {
    if (Number(casinoBalance)) {
      setIsLoadingRecall(true);
      const payload = {
        username,
      };
      const data = await withdrawUserSt8BalanceData(payload);

      if (data?.data) {
        const payload = {
          page: currentPage,
          limit: perPage,
          search: searchParams,
          status: statusParams,
        };

        getDownLineUser(payload);
        setIsEnableBalanceView(false);
      }
      setIsLoadingRecall(false);
    }
  };

  return (
    <div className="relative px-2">
      <div className="grid grid-cols-12 gap-4 mt-2">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Searching
            onChange={onChangeSearch}
            onSubmitSearch={onSubmitSearch}
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-2 flex items-center">
          <div className="text-[12px] font-black">Status: </div>
          <select
            onChange={onChangeStatus}
            className="ml-2 w-full h-[30px] border border-[#cdcdcd] uppercase text-[#2b2b2b] text-[12px] px-[5px]"
          >
            {USER_STATUS?.map((item) => {
              return (
                <option
                  key={item?.value}
                  value={item?.value}
                  selected={item?.value === statusParams}
                >
                  {item?.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="bg-[#e0e6e6] w-full py-4 px-2 mt-4 border-b border-[#7e97a7]">
        <div className="text-[#3b5160] text-[13px] font-black">
          Your Balance:{" "}
          <span className="font-normal">
            IR{" "}
            <span className="text-[23px] font-black">
              {amountFormate(userData?.balance)}
            </span>
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
              {/* <th className="text-right border-l border-r border-[#7e97a7]">
                Check Balance
              </th> */}
              <th className="text-center border-r border-l border-[#7e97a7]">
                Deposit / Withdraw
              </th>
              <th className="text-right">Credit Reference</th>
              <th className="text-right border-r border-[#7e97a7]">
                Reference P/L
              </th>
              <th className="text-right border-r border-[#7e97a7]">Remark</th>
              <th className="text-center">
                <button className="bg-[#000000] text-[#feba11] rounded px-2 text-[11px] h-[28px] font-black w-[58px]">
                  <Link target="_blank" to={`/banking-logs-all`} className="">
                    All Log
                  </Link>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoadingTable && (
              <tr>
                <td className="h-[200px] text-center" colSpan={9}>
                  <Loader color={"#FEBA11"} size={25} />
                </td>
              </tr>
            )}
            {!isLoadingTable && pageData?.length === 0 && (
              <tr>
                <td
                  className="h-[200px] text-center text-[16px] font-black"
                  colSpan={9}
                >
                  No Record Found
                </td>
              </tr>
            )}
            {pageData?.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>
                      <div className="flex items-center">
                        <span className="w-[30px]">
                          {(currentPage - 1) * perPage + index + 1}.
                        </span>{" "}
                        {roleStatus(item?.roles?.toString())}
                        {item?.username}
                      </div>
                    </td>
                    <td className="text-right">
                      <td>
                        <div
                          className="flex items-center text-[#2789ce] cursor-pointer"
                          onClick={() => {
                            onClickBalance(item?.username);
                          }}
                        >
                          {amountFormate(
                            Number(item?.balance + item?.exposure)
                          )}
                          {isLoadingBalance === item?.username ? (
                            <Loader
                              color={"#2789ce"}
                              className="ml-1"
                              size={10}
                            />
                          ) : isEnableBalanceView === item?.username ? (
                            <FaMinusSquare className="ml-1" size={15} />
                          ) : (
                            <FaPlusSquare className="ml-1" size={15} />
                          )}
                        </div>
                      </td>
                    </td>
                    <td className="text-right">
                      {amountFormate(Number(item?.balance + item?.exposure))}
                    </td>
                    <td className="text-right">{item?.exposure}</td>
                    {/* <td
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
                  </td> */}
                    <td className="text-center border-r border-l border-r-[#7e97a7] border-l-[#7e97a7] flex items-center justify-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            onClickD("D", index);
                          }}
                          className={`w-[30px] h-[30px] text-[14px] text-[#3b5160] flex justify-center items-center font-black border-r-0 border border-[#bbb] rounded-l ${
                            pageSubmitData?.[index]?.type === "D"
                              ? "deposit-button-active"
                              : "deposit-withdraw-button"
                          }`}
                        >
                          D
                        </button>
                        <button
                          onClick={() => {
                            onClickW("W", index);
                          }}
                          className={`w-[30px] h-[30px] text-[14px] text-[#3b5160] flex justify-center items-center font-black  border border-[#bbb] rounded-r ${
                            pageSubmitData?.[index]?.type === "W"
                              ? "withdraw-button-active"
                              : "deposit-withdraw-button"
                          }`}
                        >
                          W
                        </button>
                      </div>
                      <div className="mx-2 relative">
                        <input
                          readOnly={!pageSubmitData?.[index]?.type}
                          type="number"
                          onChange={(e) => {
                            onChangeDW(e?.target?.value, index);
                          }}
                          value={pageSubmitData?.[index]?.dw || ""}
                          placeholder="0"
                          style={{
                            boxShadow: "inset 0px 2px 0px rgba(0,0,0,.1)",
                          }}
                          className="text-right w-full rounded p-[5px] text-[#1e1e1e] border border-[#aaa] font-black text-[14px]"
                        />
                        {pageSubmitData?.[index]?.type === "D" ? (
                          <div className="absolute left-2 top-[4px] text-[15px] text-[#5bab03]">
                            +
                          </div>
                        ) : pageSubmitData?.[index]?.type === "W" ? (
                          <div className="absolute left-2 top-[4px] text-[15px] text-[#d0021b]">
                            -
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            onClickFull(item?.balance, index);
                          }}
                          disabled={pageSubmitData?.[index]?.type !== "W"}
                          className="w-[45px] h-[30px] text-[12px] text-[#3b5160] flex justify-center items-center font-black border border-[#bbb] rounded"
                        >
                          Full
                        </button>
                      </div>
                    </td>
                    <td className="text-right w-[200px]">
                      <div className="flex items-center justify-end">
                        {pageSubmitData?.[index]?.isVisibleCreditRef ? (
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
                        ) : (
                          <Link
                            target="_blank"
                            to={`/credit-ref-logs/${item?._id}`}
                            className="flex items-center underline text-[#2789ce] cursor-pointer w-fit mr-2"
                          >
                            {amountFormate(item?.creditRef)}
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            onClickEnableEdit(
                              !pageSubmitData?.[index]?.isVisibleCreditRef,
                              index
                            );
                          }}
                          className="w-[48px] h-[30px] text-[12px] text-[#3b5160] flex justify-center items-center font-black border border-[#bbb] rounded"
                        >
                          {pageSubmitData?.[index]?.isVisibleCreditRef
                            ? "Cancel"
                            : "Edit"}
                        </button>
                      </div>
                    </td>
                    <td className="text-right border-r border-r-[#7e97a7]">
                      {amountFormate(Number(item?.balance + item?.creditRef))}
                    </td>
                    <td className="text-right border-r border-r-[#7e97a7]">
                      <input
                        type="text"
                        onChange={(e) => {
                          onChangeRemark(e?.target?.value, index);
                        }}
                        value={pageSubmitData?.[index]?.remark || ""}
                        placeholder="Remark"
                        style={{
                          boxShadow: "inset 0px 2px 0px rgba(0,0,0,.1)",
                        }}
                        className="rounded p-[5px] text-[#1e1e1e] border border-[#aaa] mr-2 text-right w-[100px]"
                      />
                    </td>
                    <td className="text-center">
                      <button className="common-button h-[28px] font-black w-[58px]">
                        <Link
                          target="_blank"
                          to={`/banking-logs/${item?._id}`}
                          className=""
                        >
                          Log
                        </Link>
                      </button>
                    </td>
                  </tr>
                  {isEnableBalanceView === item?.username && (
                    <tr className="">
                      <td className="bg-[#e2e8ed]" colSpan="3"></td>
                      <td className="bg-[#e2e8ed] p-0" colSpan="6">
                        <table className="border-l border-[#7e97a7] w-full">
                          <tr className="border-b  border-[#7e97a7]">
                            <th
                              width="12%"
                              className="font-black px-[10px] py-[8px]"
                            >
                              Game
                            </th>
                            <th
                              width="13%"
                              className="font-black px-[10px] py-[8px ] text-right"
                            >
                              Balance
                            </th>
                            <th
                              width="8%"
                              className="px-[10px] py-[8px] text-right"
                            ></th>
                            <th></th>
                          </tr>

                          <tr>
                            <th width="12%" className="px-[10px] py-[8px]">
                              Int Casino
                            </th>
                            <th
                              width="13%"
                              className="px-[10px] py-[8px] text-right"
                            >
                              {casinoBalance}
                            </th>
                            <th
                              width="8%"
                              className="px-[10px] py-[8px] text-right"
                            >
                              <button
                                disabled={!Number(casinoBalance)}
                                onClick={() => {
                                  onClickRecallCasino(item?.username);
                                }}
                                className="text-[#3b5160] bg-[rgba(94,190,255,.15)] border border-[#7e97a7] font-extrabold rounded text-[11px] flex justify-center items-center w-[70px] h-[25px] whitespace-nowrap cursor-pointer"
                              >
                                {isLoadingRecall && (
                                  <Loader
                                    color={"#2789ce"}
                                    className="ml-1"
                                    size={10}
                                  />
                                )}
                                Recall
                              </button>
                            </th>
                            <th></th>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-7 mb:pb-0 pb-20">
        <Pagination
          currentPage={currentPage || 1}
          itemsPerPage={totalPage || 1}
          onChange={onRefreshPagination}
        />
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

export default BankingMaster;
