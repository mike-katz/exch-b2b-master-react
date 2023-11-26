import React, { useEffect, useState } from "react";
import {
  FaCircle,
  FaDownload,
  FaMinusSquare,
  FaPencilAlt,
  FaPlusSquare,
  // FaPlusSquare,
  FaUndo,
  FaUserPlus,
} from "react-icons/fa";
import Pagination from "../../../component/common/Pagination";
import Searching from "../../../component/form/Searching";
import CreditRefModal from "../Dashboard/CreditRefModal";
import ChangeStatusModal from "../Dashboard/ChangeStatusModal";
import EditExposureLimitModal from "../Dashboard/EditExposureLimitModal";
import AddPlayerModal from "./AddPlayerModal";
import { useNavigate } from "react-router-dom";
import {
  exportCSVFileData,
  getDownLineUserData,
  getMyBalanceData,
  getUserSt8BalanceData,
  withdrawUserSt8BalanceData,
} from "../../../redux/services/DownLineUser";
import Loader from "../../../component/common/Loader";
import { amountFormate, roleStatus } from "../../../utils/helper";
import { USER_STATUS } from "../../../utils/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from "../../../redux/actions/persistAction";

const DownListMaster = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.persist);

  const [isVisibleEditCreditRef, setIsVisibleEditCreditRef] = useState(false);
  const [isEnableBalanceView, setIsEnableBalanceView] = useState(false);
  const [isVisibleEditStatus, setIsVisibleEditStatus] = useState(false);
  const [isVisibleExposureLimit, setIsVisibleExposureLimit] = useState(false);
  const [isVisibleAddPlayer, setIsVisibleAddPlayer] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [myBalance, setMyBalance] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [casinoBalance, setCasinoBalance] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isLoadingRecall, setIsLoadingRecall] = useState(false);

  const [activeId, setActiveId] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [activeRole, setActiveRole] = useState("");
  const [activeExposureLimit, setActiveExposureLimit] = useState("");
  const [activeCreditRef, setActiveCreditRef] = useState("");

  const [searchParams, setSearchParams] = useState("");
  const [statusParams, setStatusParams] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  useEffect(() => {
    getDownLineUser();
    getMyBalance();
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
      setTotalPage(data?.data?.totalPages);
      setPerPage(data?.data?.limit);
      setCurrentPage(data?.data?.page);
      setPageData(data?.data?.results);
      setPageData(data?.data?.results);
    }
    setIsLoadingTable(false);
  };

  const getMyBalance = async () => {
    const data = await getMyBalanceData();

    if (data) {
      dispatch(updateBalance(data?.data));
      setMyBalance(data?.data);
    }
  };

  const onClickEditCreditRef = (creditRef, id) => {
    setActiveCreditRef(creditRef);
    setActiveId(id);
    setIsVisibleEditCreditRef(true);
  };

  const onCloseEditCreditRef = () => {
    setIsVisibleEditCreditRef(false);
  };

  const onClickEditStatus = (status, id, username, role) => {
    setActiveStatus(status);
    setActiveId(id);
    setActiveUser(username);
    setActiveRole(role);
    setIsVisibleEditStatus(true);
  };

  const onCloseEditStatus = () => {
    setIsVisibleEditStatus(false);
  };

  const onClickEditExposureLimit = (limit, id) => {
    setActiveExposureLimit(limit);
    setActiveId(id);
    setIsVisibleExposureLimit(true);
  };

  const onCloseExposureLimit = () => {
    setIsVisibleExposureLimit(false);
  };

  const onClickAddPlayer = () => {
    setIsVisibleAddPlayer(true);
  };

  const onCloseAddPlayer = () => {
    setIsVisibleAddPlayer(false);
  };

  const onClickMenu = (id, userId) => {
    navigate(`/down-list-master/details/${id}/${userId}`);
  };

  const onRefreshTable = () => {
    const payload = {
      page: currentPage,
      limit: perPage,
      search: searchParams,
      status: statusParams,
    };

    getDownLineUser(payload);
  };

  const onRefreshPagination = (count) => {
    setCurrentPage(count);
    const payload = {
      page: count,
      limit: perPage,
      search: searchParams,
      status: statusParams,
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
    };

    getDownLineUser(payload);
  };

  const onSubmitRefresh = () => {
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: perPage,
      search: searchParams,
      status: statusParams,
    };

    getDownLineUser(payload);
  };

  const onClickDownloadCSV = async () => {
    const payload = {
      type: "user",
      status: statusParams || undefined,
      search: searchParams || undefined,
    };

    const data = await exportCSVFileData(payload);

    if (data) {
      window.open(data?.data, "_blank");
    }
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

  const currentStatusActive = userData?.status === "Active";

  return (
    <div className="relative px-2">
      <CreditRefModal
        activeId={activeId}
        activeCreditRef={activeCreditRef}
        onRefreshTable={onRefreshTable}
        isVisible={isVisibleEditCreditRef}
        onCloseMenu={onCloseEditCreditRef}
      />
      <ChangeStatusModal
        initialActiveStatus={activeStatus}
        activeId={activeId}
        activeUser={activeUser}
        activeRole={activeRole}
        onRefreshTable={onRefreshTable}
        isVisible={isVisibleEditStatus}
        onCloseMenu={onCloseEditStatus}
      />
      <EditExposureLimitModal
        activeId={activeId}
        activeExposureLimit={activeExposureLimit}
        onRefreshTable={onRefreshTable}
        isVisible={isVisibleExposureLimit}
        onCloseMenu={onCloseExposureLimit}
      />

      <AddPlayerModal
        onRefreshTable={onRefreshTable}
        isVisible={isVisibleAddPlayer}
        onCloseMenu={onCloseAddPlayer}
      />

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
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <button
            onClick={onClickDownloadCSV}
            className="common-button text-[#000000] rounded px-2 text-[12px] font-semibold flex items-center justify-center h-[31px] border border-[#cdcdcd]"
          >
            <FaDownload color="#000000" size={10} className="mr-1" /> Download
            CSV
          </button>
        </div>
        <div className="hidden md:block md:col-span-6 lg:col-span-3"></div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 flex items-center justify-end">
          <button
            disabled={!currentStatusActive}
            onClick={() => {
              if (currentStatusActive) {
                onClickAddPlayer();
              }
            }}
            className="common-button bg-[#FFFFFF] text-[#000000] rounded px-2 text-[12px] font-semibold flex items-center justify-center h-[31px] border border-[#cdcdcd]"
          >
            <FaUserPlus color="#000000" size={15} className="mr-1" /> Add Player
          </button>
          <button
            onClick={onSubmitRefresh}
            className="common-button bg-[#FFFFFF] text-[#000000] rounded px-2 text-[12px] font-semibold flex items-center justify-center h-[31px] border border-[#cdcdcd] ml-1"
          >
            <FaUndo color="#000000" size={15} className="mr-1" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 my-4">
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Total Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR {amountFormate(myBalance?.totalBalance) || 0}
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Total Exposure</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR{" "}
            <span className="text-[#d0021b]">
              ({amountFormate(myBalance?.totalExposure) || 0})
            </span>
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Total Avail. bal.</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR{" "}
            {amountFormate(
              Number(myBalance?.totalBalance || 0) +
                Number(myBalance?.totalExposure || 0)
            )}
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR {amountFormate(myBalance?.balance) || 0}
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Available Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR{" "}
            {amountFormate(
              Number(myBalance?.balance + myBalance?.totalExposure || 0)
            )}
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Total Users</div>
          <div className="text-[#243a48] text-[15px] font-black">
            {myBalance?.totalUser || 0}
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="w-full min-w-max table-auto text-left font-bold">
          <thead>
            <tr>
              <th className="">Account</th>
              <th className="">Credit Ref.</th>
              <th className="">Balance</th>
              <th className="">Exposure</th>
              <th className="">Avail. bal.</th>
              <th className="">Exposure Limit</th>
              <th className="">Ref. P/L</th>
              <th className="">Status</th>
              <th className="text-right">Action</th>
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

            {!isLoadingTable &&
              pageData?.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>
                        <div className="flex items-center">
                          <span className="w-[30px]">
                            {/* {index + 1} */}
                            {(currentPage - 1) * perPage + index + 1}.
                          </span>{" "}
                          {roleStatus(item?.roles?.toString())}
                          {item?.username}
                        </div>
                      </td>
                      <td>
                        <div
                          className={`flex items-center ${
                            currentStatusActive
                              ? "underline text-[#2789ce]"
                              : ""
                          } cursor-pointer w-fit`}
                          onClick={() => {
                            if (currentStatusActive) {
                              onClickEditCreditRef(item?.creditRef, item?._id);
                            }
                          }}
                        >
                          {amountFormate(item?.creditRef)}
                          {currentStatusActive ? (
                            <FaPencilAlt className="ml-1" />
                          ) : null}
                        </div>
                      </td>
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
                      <td>
                        <span className="text-[#d0021b]">
                          ({amountFormate(item?.exposure) || 0})
                        </span>
                      </td>
                      <td>{amountFormate(Number(item?.balance))}</td>
                      <td>
                        <div
                          className={`flex items-center ${
                            currentStatusActive
                              ? "underline text-[#2789ce] cursor-pointer"
                              : ""
                          } w-fit`}
                          onClick={() => {
                            if (currentStatusActive) {
                              onClickEditExposureLimit(
                                item?.exposureLimit,
                                item?._id
                              );
                            }
                          }}
                        >
                          {amountFormate(item?.exposureLimit)}
                          {currentStatusActive ? (
                            <FaPencilAlt className="ml-1" />
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td>
                        {Number(item?.balance - item?.creditRef) >= 0 ? (
                          <span className="text-[#508d0e]">
                            {amountFormate(
                              Number(item?.balance - item?.creditRef)
                            )}
                          </span>
                        ) : (
                          <span className="text-[#d0021b]">
                            (
                            {amountFormate(
                              Number(item?.balance - item?.creditRef)
                            )}
                            )
                          </span>
                        )}
                      </td>
                      <td>
                        {item?.status === "Active" ? (
                          <div className="border border-[#bedca7] text-[#508d0e] text-[11px] bg-[#e5f1dc] w-fit flex items-center font-black px-1 py-[2px] rounded">
                            <FaCircle size={8} className="mr-1" />
                            Active
                          </div>
                        ) : item?.status === "Suspend" ? (
                          <div className="border border-[#deb6c0] text-[#d0021b] text-[11px] bg-[#f2e2e6] w-fit flex items-center font-black px-1 py-[2px] rounded">
                            <FaCircle size={8} className="mr-1" />
                            Suspended
                          </div>
                        ) : (
                          <div className="border border-[#b9c5cd] text-[#5a7384] text-[11px] bg-[#e3e8eb] w-fit flex items-center font-black px-1 py-[2px] rounded">
                            <FaCircle size={8} className="mr-1" />
                            Locked
                          </div>
                        )}
                      </td>
                      <td className="text-right w-[100px]">
                        <div className="flex items-center justify-end">
                          <div
                            onClick={() => {
                              onClickMenu("beating-profit-lost", item?._id);
                            }}
                            className="h-[26px] w-[26px] cursor-pointer ml-1"
                          >
                            <img src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/p_l.png" />
                          </div>
                          <div
                            onClick={() => {
                              onClickMenu("beating-history", item?._id);
                            }}
                            className="h-[26px] w-[26px] cursor-pointer ml-1"
                          >
                            <img src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/betting_history.png" />
                          </div>
                          {currentStatusActive ? (
                            <div
                              className="h-[26px] w-[26px] cursor-pointer ml-1"
                              onClick={() => {
                                onClickEditStatus(
                                  item?.status,
                                  item?._id,
                                  item?.username,
                                  item?.roles?.toString()
                                );
                              }}
                            >
                              <img src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/status.png" />
                            </div>
                          ) : null}

                          <div
                            onClick={() => {
                              onClickMenu("account-summery", item?._id);
                            }}
                            className="h-[26px] w-[26px] cursor-pointer ml-1"
                          >
                            <img src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/person.png" />
                          </div>
                        </div>
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
      <div className="">
        <div className="fixed right-0 bottom-0 mt-2 w-full border-t border-[#d4d4d4] bg-[#eeeeee] py-2 overflow-hidden overflow-x-auto">
          <div className="flex md:justify-end container flex-wrap">
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/bank.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Bank
              </span>
            </div>
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/p_l.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Betting Profit & Loss
              </span>
            </div>
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/betting_history.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Betting History
              </span>
            </div>
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/status.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Profile
              </span>
            </div>
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/person.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Change Status
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownListMaster;
