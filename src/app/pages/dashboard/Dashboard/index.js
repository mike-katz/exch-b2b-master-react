import React, { useEffect, useState } from "react";
import {
  FaCircle,
  FaDownload,
  FaPencilAlt,
  // FaPlusSquare,
  FaUndo,
  FaUserPlus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../component/common/Loader";
import Pagination from "../../../component/common/Pagination";
import Searching from "../../../component/form/Searching";
import { updateBalance } from "../../../redux/actions/persistAction";
import {
  exportCSVFileData,
  getDownLineMasterData,
  getMyBalanceData,
} from "../../../redux/services/DownLineUser";
import { USER_STATUS } from "../../../utils/dropdown";
import { amountFormate, roleStatus } from "../../../utils/helper";
import AddPlayerModal from "./AddPlayerModal";
import ChangeStatusModal from "./ChangeStatusModal";
import CreditRefModal from "./CreditRefModal";
import EditExposureLimitModal from "./EditExposureLimitModal";
import jwtDecode from "jwt-decode";
import { FaArrowDownShortWide } from "react-icons/fa6";
import BalanceModel from "../../../component/common/BalanceModel";

const DownListMaster = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData, token } = useSelector((state) => state?.persist);
  const [isVisibleEditCreditRef, setIsVisibleEditCreditRef] = useState(false);
  // const [isEnableBalanceView, setIsEnableBalanceView] = useState(false);
  const [isVisibleEditStatus, setIsVisibleEditStatus] = useState(false);
  const [isVisibleExposureLimit, setIsVisibleExposureLimit] = useState(false);
  const [isVisibleAddPlayer, setIsVisibleAddPlayer] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [myBalance, setMyBalance] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const [activeId, setActiveId] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [activeRole, setActiveRole] = useState("");
  const [activeExposureLimit, setActiveExposureLimit] = useState("");
  const [activeCreditRef, setActiveCreditRef] = useState("");

  const [searchParams, setSearchParams] = useState("");
  const [statusParams, setStatusParams] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const [activePageId, setActivePageId] = useState("");
  const [activePageRole, setActivePageRole] = useState([]);
  const [isVisibleBalanceModal, setIsVisibleBalanceModal] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(false);

  const [sortConfig, setSortConfig] = useState({
    balance: "",
    direction: "1",
  });

  const userDataJWT = jwtDecode(token);

  const role = userDataJWT?.roles?.toString();

  useEffect(() => {
    getDownLineMaster();
    getMyBalance();
    if (activePageRole?.length === 0) {
      const customizeActivePageRole = [...activePageRole];
      customizeActivePageRole.push({
        role: role,
        username: userData?.username,
      });
      setActivePageRole(customizeActivePageRole);
    }
  }, []);

  const getDownLineMaster = async (payloadParams = false) => {
    let payload = {};
    if (payloadParams) {
      payload = payloadParams;
    } else {
      payload = {
        page: currentPage,
        limit: perPage,
        search: searchParams,
        status: statusParams,
        userId: activePageId,
      };
    }
    setIsLoadingTable(true);
    const data = await getDownLineMasterData(payload);

    if (data) {
      setTotalPage(data?.data?.totalPages);
      setPerPage(data?.data?.limit);
      setCurrentPage(data?.data?.page);
      setPageData(data?.data?.results);
      setTotalResults(data?.data?.totalResults);
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
      userId: activePageId,
      sortBy: sortConfig?.key ? sortConfig?.key : undefined,
      order: sortConfig?.key ? sortConfig?.direction : undefined,
    };

    getDownLineMaster(payload);
  };

  const onRefreshPagination = (count) => {
    setCurrentPage(count);
    const payload = {
      page: count,
      limit: perPage,
      search: searchParams,
      status: statusParams,
      userId: activePageId,
      sortBy: sortConfig?.key ? sortConfig?.key : undefined,
      order: sortConfig?.key ? sortConfig?.direction : undefined,
    };

    getDownLineMaster(payload);
  };

  const onChangeSearch = (e) => {
    setSearchParams(e?.target?.value);
  };

  const onSubmitSearch = () => {
    setSortConfig({
      balance: "",
      direction: "1",
    });

    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: perPage,
      search: searchParams,
      status: statusParams,
      userId: activePageId,
    };

    getDownLineMaster(payload);
  };

  const onChangeStatus = (e) => {
    setStatusParams(e?.target?.value);

    const payload = {
      page: currentPage,
      limit: perPage,
      search: searchParams,
      status: e?.target?.value,
      userId: activePageId,
      sortBy: sortConfig?.key ? sortConfig?.key : undefined,
      order: sortConfig?.key ? sortConfig?.direction : undefined,
    };

    getDownLineMaster(payload);
  };

  const onSubmitRefresh = () => {
    setSortConfig({
      balance: "",
      direction: "1",
    });

    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: perPage,
      search: searchParams,
      status: statusParams,
      userId: activePageId,
    };

    getDownLineMaster(payload);
  };

  const onClickDownloadCSV = async () => {
    const payload = {
      status: statusParams || undefined,
      search: searchParams || undefined,
      userId: activePageId,
      type: "master",
      sortBy: sortConfig?.key ? sortConfig?.key : undefined,
      order: sortConfig?.key ? sortConfig?.direction : undefined,
    };

    const data = await exportCSVFileData(payload);
    if (data) {
      window.open(data?.data, "_blank");
    }
  };

  const onClickChildren = (item) => {
    setSortConfig({
      balance: "",
      direction: "1",
    });

    if (item?.roles?.toString() !== "User") {
      setActivePageId(item?._id);

      const customizeActivePageRole = [...activePageRole];
      customizeActivePageRole.push({
        role: item?.roles?.toString(),
        username: item?.username,
        _id: item?._id,
      });
      setActivePageRole(customizeActivePageRole);

      const payload = {
        page: 1,
        limit: perPage,
        search: searchParams,
        status: statusParams,
        userId: item?._id,
      };

      getDownLineMaster(payload);
    }
  };

  const onClickUserManage = ({ role, _id }) => {
    setSortConfig({
      balance: "",
      direction: "1",
    });

    if (userData?.roles?.toString() === role) {
      setActivePageId("");
    }

    const customizeActivePageRole = [];

    let lastData = false;
    let remove = false;
    activePageRole?.map((item, index) => {
      if (!remove) {
        customizeActivePageRole.push(item);
      }

      if (role === item?.role) {
        if (activePageRole?.length === index + 1) {
          lastData = true;
        }
        remove = true;
      }
    });

    setActivePageRole(customizeActivePageRole);

    if (lastData) {
      return false;
    }

    const payload = {
      page: 1,
      limit: perPage,
      search: searchParams,
      status: statusParams,
      userId: _id,
    };

    getDownLineMaster(payload);
  };

  const currentStatusActive = userData?.status === "Active";
  const findUser = pageData?.find((item) => item?.roles?.toString() === "User");

  const handleSort = (key) => {
    let direction = "1";
    if (sortConfig.key === key && sortConfig.direction === "1") {
      direction = "-1";
    }
    setSortConfig({ key, direction });
  };

  const onClickExposer = (userId, exposure) => {
    const payload = {
      userId,
      exposure,
    };

    setCurrentUserData(payload);
    setIsVisibleBalanceModal(true);
  };

  const onCloseBalanceModal = () => {
    setIsVisibleBalanceModal(false);
    setCurrentUserData(false);
  };

  useEffect(() => {
    if (sortConfig?.key) {
      const payload = {
        page: currentPage,
        limit: perPage,
        search: searchParams,
        status: statusParams,
        userId: activePageId,
        sortBy: sortConfig?.key ? sortConfig?.key : undefined,
        order: sortConfig?.key ? sortConfig?.direction : undefined,
      };
      getDownLineMaster(payload);
    }
  }, [sortConfig]);

  const onChangePerPage = (value) => {
    setPerPage(value);
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: value,
      search: searchParams,
      status: statusParams,
      userId: activePageId,
      sortBy: sortConfig?.key ? sortConfig?.key : undefined,
      order: sortConfig?.key ? sortConfig?.direction : undefined,
    };

    getDownLineMaster(payload);
  };

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

      <BalanceModel
        isVisible={isVisibleBalanceModal}
        onCloseMenu={onCloseBalanceModal}
        currentUserData={currentUserData}
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
        {/* <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR {amountFormate(myBalance?.balance) || 0}
          </div>
        </div> */}
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Available Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR{" "}
            {amountFormate(
              Number(myBalance?.balance || 0) +
                Number(myBalance?.totalBalance || 0)
            )}
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Total Users</div>
          <div className="text-[#243a48] text-[15px] font-black">
            {myBalance?.totalUser || 0}
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Upper Line PL</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR{" "}
            <span
              className={`${
                Number(
                  Number(myBalance?.creditRef || 0) -
                    (Number(myBalance?.balance || 0) +
                      Number(myBalance?.totalBalance || 0))
                ) > 0
                  ? "text-[#508d0e]"
                  : "text-[#d0021b]"
              }`}
            >
              {amountFormate(
                Number(myBalance?.creditRef || 0) -
                  (Number(myBalance?.balance || 0) +
                    Number(myBalance?.totalBalance || 0))
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center border border-[#7e97a7] w-fit mb-4">
        {activePageRole?.map((item, index) => {
          return (
            <div
              onClick={() => {
                onClickUserManage(item);
              }}
              key={index}
              className={`w-fit rounded px-[15px] flex items-center ${
                activePageRole?.length === index + 1 ? "" : "cursor-pointer"
              } ${activePageRole?.length === index + 1 ? "" : "agent_path-L"}`}
            >
              {roleStatus(item?.role)}
              <div className="text-[#1e1e1e] text-[16px] font-black leading-[30px]">
                {item?.username}
              </div>
            </div>
          );
        })}
      </div>
      <div className="table-responsive">
        <table className="w-full min-w-max table-auto text-left font-bold">
          <thead>
            <tr>
              <th className="">Account</th>
              <th className="text-right">Credit Ref.</th>
              <th className="text-right">
                <div
                  className="flex justify-end items-center cursor-pointer"
                  onClick={() => {
                    handleSort("balance");
                  }}
                >
                  Balance
                  <FaArrowDownShortWide className="ml-2" />
                </div>
              </th>
              <th className="text-right">
                <div
                  className="flex justify-end items-center cursor-pointer"
                  onClick={() => {
                    handleSort("exposure");
                  }}
                >
                  Exposure
                  <FaArrowDownShortWide className="ml-2" />
                </div>
              </th>
              <th className="text-right">Avail. bal.</th>
              {findUser ? <th className="text-right">Exposure Limit</th> : null}
              <th className="text-right">Ref. P/L</th>
              <th className="text-right">Status</th>
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
                  <tr key={index}>
                    <td>
                      <div
                        onClick={() => {
                          onClickChildren(item);
                        }}
                        className={`flex items-center ${
                          item?.roles?.toString() === "User"
                            ? ""
                            : "text-[#568bc8] cursor-pointer"
                        }`}
                      >
                        <span className="w-[30px]">
                          {(currentPage - 1) * perPage + index + 1}.
                        </span>{" "}
                        {roleStatus(item?.roles?.toString())}
                        <span
                          className={`${
                            item?.roles?.toString() === "User"
                              ? ""
                              : "underline"
                          }`}
                        >
                          {item?.username}
                        </span>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex w-full justify-end">
                        <div
                          className={`flex items-center ${
                            activePageId || !currentStatusActive
                              ? ""
                              : "underline text-[#2789ce]"
                          } cursor-pointer w-fit`}
                          onClick={() => {
                            if (!activePageId && currentStatusActive) {
                              onClickEditCreditRef(item?.creditRef, item?._id);
                            }
                          }}
                        >
                          {amountFormate(item?.creditRef)}
                          {activePageId || !currentStatusActive ? null : (
                            <FaPencilAlt className="ml-1" />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <div>
                        {amountFormate(Number(item?.balance + item?.exposure))}
                      </div>
                    </td>
                    <td className="text-right">
                      <span
                        onClick={() => {
                          if (item?.roles?.toString() === "User") {
                            onClickExposer(item?._id, item?.exposure);
                          }
                        }}
                        className={`text-[#d0021b] ${
                          item?.roles?.toString() === "User"
                            ? "cursor-pointer"
                            : ""
                        }`}
                      >
                        (
                        {amountFormate(
                          Number(item?.exposure || 0) +
                            Number(item?.downlineExposure || 0)
                        ) || 0}
                        )
                      </span>
                    </td>
                    <td className="text-right">
                      {amountFormate(
                        Number(item?.balance || 0) +
                          Number(item?.downlineBalance || 0)
                      )}
                    </td>
                    {findUser ? (
                      <td className="text-right">
                        {activePageId ? (
                          <div>{amountFormate(item?.exposureLimit)}</div>
                        ) : (
                          <div className="flex w-full justify-end">
                            <div
                              className="flex items-center underline text-[#2789ce] cursor-pointer w-fit"
                              onClick={() => {
                                onClickEditExposureLimit(
                                  item?.exposureLimit,
                                  item?._id
                                );
                              }}
                            >
                              {amountFormate(item?.exposureLimit)}
                              <FaPencilAlt className="ml-1" />
                            </div>
                          </div>
                        )}
                      </td>
                    ) : null}
                    <td className="text-right">
                      {Number(item?.balance || 0) +
                        Number(item?.downlineBalance || 0) -
                        Number(item?.creditRef || 0) >=
                      0 ? (
                        <span className="text-[#508d0e]">
                          {amountFormate(
                            Number(item?.balance || 0) +
                              Number(item?.downlineBalance || 0) -
                              Number(item?.creditRef || 0)
                          )}
                        </span>
                      ) : (
                        <span className="text-[#d0021b]">
                          (
                          {amountFormate(
                            Number(item?.balance || 0) +
                              Number(item?.downlineBalance || 0) -
                              Number(item?.creditRef || 0)
                          )}
                          )
                        </span>
                      )}
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end w-full">
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
                      </div>
                    </td>
                    <td className="text-right w-[100px]">
                      <div className="flex items-center justify-end">
                        {item?.roles?.toString() === "User" && (
                          <>
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
                          </>
                        )}

                        {activePageId || !currentStatusActive ? null : (
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
                        )}

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
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-7 mb:pb-0 pb-20">
        <Pagination
          onChangePerPage={onChangePerPage}
          totalResults={totalResults}
          currentPage={currentPage || 1}
          itemsPerPage={totalPage || 1}
          perPage={perPage}
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
