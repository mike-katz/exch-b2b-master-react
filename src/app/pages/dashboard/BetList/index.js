import React, { useEffect, useState } from "react";
import { getSportListData } from "../../../redux/services/DownLineUser";
import Pagination from "../../../component/common/Pagination";
import Loader from "../../../component/common/Loader";
import moment from "moment";
import { useParams } from "react-router-dom";
import { BET_STATUS, MARKET_TYPE } from "../../../utils/dropdown";
import { getBetListData } from "../../../redux/services/BetList";
import { useSelector } from "react-redux";
import { FaArrowDownShortWide } from "react-icons/fa6";

const BetList = () => {
  const { userId } = useParams();
  // const [isVisibleHistory, setIsVisibleHistory] = useState(false);
  const [sportListDropdown, setSportListDropdown] = useState([]);

  const [sportType, setSportType] = useState("Cricket");
  const [betStatus, setBetStatus] = useState("");
  const [marketType, setMarketType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState(
    moment().subtract(5, "days").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const { themeColor } = useSelector((state) => state?.persist);

  const [pageData, setPageData] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const [totalPage, setTotalPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState({
    balance: null,
    direction: "asc",
  });

  useEffect(() => {
    getSportList();
    getBetHistory(false, userId);
  }, [userId]);

  const getSportList = async () => {
    const data = await getSportListData();

    if (data?.data) {
      setSportListDropdown(data?.data);
    }
  };

  const getBetHistory = async (payloadParams = false, userId) => {
    let payload = {};
    if (payloadParams) {
      payload = payloadParams;
    } else {
      payload = {
        page: currentPage,
        limit: perPage,
        sportName: sportType,
        status: betStatus,
        marketType: marketType,
        from: fromDate,
        to: toDate,
        search: searchValue,
      };
    }

    setIsLoadingTable(true);
    const data = await getBetListData(payload);

    if (data) {
      setTotalPage(data?.data?.totalPages);
      setPerPage(data?.data?.limit);
      setCurrentPage(data?.data?.page);
      setPageData(data?.data?.results);
      setTotalResults(data?.data?.totalResults);
    }
    setIsLoadingTable(false);
  };

  // const onClickHideHistory = () => {
  //   setIsVisibleHistory(false);
  // };

  // const onClickShowHistory = () => {
  //   setIsVisibleHistory(true);
  // };

  const onChangeSportType = (e) => {
    setSportType(e?.target?.value);
  };

  const onChangeBetStatus = (e) => {
    setBetStatus(e?.target?.value);
  };

  const onChangeMarketStatus = (e) => {
    setMarketType(e?.target?.value);
  };

  const onChangeFromDate = (e) => {
    setFromDate(e?.target?.value);
  };

  const onChangeToDate = (e) => {
    setToDate(e?.target?.value);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e?.target?.value);
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: perPage,
      sportName: sportType,
      status: betStatus,
      marketType: marketType,
      from: fromDate,
      to: toDate,
      search: e?.target?.value,
    };

    getBetHistory(payload);
  };

  const onRefreshPagination = (count) => {
    setCurrentPage(count);
    const payload = {
      page: count,
      limit: perPage,
      sportName: sportType,
      status: betStatus,
      marketType: marketType,
      from: fromDate,
      to: toDate,
      search: searchValue,
    };

    getBetHistory(payload);
  };

  const onClickSubmit = () => {
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: perPage,
      sportName: sportType,
      status: betStatus,
      marketType: marketType,
      from: fromDate,
      to: toDate,
      search: searchValue,
    };

    getBetHistory(payload);
  };

  const onChangePerPage = (value) => {
    setPerPage(value);
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: value,
      sportName: sportType,
      status: betStatus,
      marketType: marketType,
      from: fromDate,
      to: toDate,
      search: searchValue,
    };

    getBetHistory(payload);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const sortedData = [...pageData].sort((a, b) => {
      if (sortConfig.direction === "asc") {
        const eventA = a?.[sortConfig.key]?.toLowerCase();
        const eventB = b?.[sortConfig.key]?.toLowerCase();

        return eventA.localeCompare(eventB);
      } else {
        const eventA = a?.[sortConfig.key]?.toLowerCase();
        const eventB = b?.[sortConfig.key]?.toLowerCase();

        return eventB.localeCompare(eventA);
      }
    });

    setPageData(sortedData);
  }, [sortConfig]);

  return (
    <div className="px-2">
      <div className="text-[#243a48] text-[16px] font-black mt-4">Bet List</div>
      <div className="grid grid-cols-12 gap-4 items-end mb-4 mt-4 bg-[#e0e6e6] p-3 pt-2 rounded">
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">Sport Type: </div>
          <select
            value={sportType}
            onChange={onChangeSportType}
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
          >
            {sportListDropdown?.map((item, index) => {
              return (
                <option key={index} value={item?.sportName}>
                  {item?.sportName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">Bet Status: </div>
          <select
            value={betStatus}
            onChange={onChangeBetStatus}
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
          >
            {BET_STATUS?.map((item, index) => {
              return (
                <option key={index} value={item?.value}>
                  {item?.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">Market Type: </div>
          <select
            value={marketType}
            onChange={onChangeMarketStatus}
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
          >
            {MARKET_TYPE?.map((item, index) => {
              return (
                <option key={index} value={item?.value}>
                  {item?.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">From Date :</div>
          <input
            value={fromDate}
            onChange={onChangeFromDate}
            type="date"
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
            placeholder="Start Date"
          />
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">To Date :</div>
          <input
            value={toDate}
            onChange={onChangeToDate}
            type="date"
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
            placeholder="End Date"
          />
        </div>
        <div className="col-span-6 lg:col-span-2">
          <button
            onClick={onClickSubmit}
            style={{
              background: themeColor?.headerBgColor,
              color: themeColor?.headerTextColor,
            }}
            className="rounded px-2 text-[13px] h-[25px] font-black w-[140px]"
          >
            SUBMIT
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end mb-4">
        <input
          className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2 w-48"
          placeholder="Search..."
          value={searchValue}
          onChange={onChangeSearch}
        />
      </div>
      <div className="table-responsive">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="">Username</th>
              <th className="">Sport Name</th>
              <th className="">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    handleSort("eventName");
                  }}
                >
                  Event Name
                  <FaArrowDownShortWide className="ml-2" />
                </div>
              </th>
              <th className="">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    handleSort("marketType");
                  }}
                >
                  Market Name
                  <FaArrowDownShortWide className="ml-2" />
                </div>
              </th>
              <th className="">Selection</th>
              <th className="">Type</th>
              <th className="">Odd Req.</th>
              <th className="">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    handleSort("stake");
                  }}
                >
                  Stake
                  <FaArrowDownShortWide className="ml-2" />
                </div>
              </th>
              <th className="">Place Time</th>
              <th className="">Matched Time</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingTable && (
              <tr>
                <td className="h-[200px] text-center" colSpan={10}>
                  <Loader color={"#FEBA11"} size={25} />
                </td>
              </tr>
            )}
            {!isLoadingTable && pageData?.length === 0 && (
              <tr>
                <td
                  className="h-[200px] text-center text-[16px] font-black"
                  colSpan={10}
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
                      <div className="flex items-center">
                        {/* {isVisibleHistory ? (
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
                        )} */}

                        <div className="font-semibold">{item?.username}</div>
                      </div>
                    </td>
                    <td>{item?.sportName}</td>
                    <td>{item?.eventName}</td>
                    <td className="">{item?.marketType}</td>
                    {/* <td className="max-w-[200px]">
                      CRICKET
                      <span className="fromto absolute"></span>
                      <strong className="ml-4">
                        Pretoria Capitals S d sd s RL T20 v Paarl Royals SRL T20
                      </strong>
                      <span className="fromto absolute"></span>
                      <span className="ml-4">FANCY BET</span>
                    </td> */}
                    <td className="">{item?.selectionName}</td>
                    <td
                      className={`capitalize font-black ${
                        item?.type === "back" || item?.type === "yes"
                          ? "text-[#024f99]"
                          : "text-[#6D081D]"
                      }`}
                    >
                      {item?.type}
                    </td>
                    <td className="">
                      {item?.odds?.$numberDecimal || item?.odds}
                    </td>
                    <td className="font-black">{item?.stake}</td>
                    <td className="">
                      {moment(item?.createdAt).format("DD/MM/YYYY")}
                      <br />
                      {moment(item?.createdAt).format("hh:mm:ss A")}
                    </td>
                    <td className="">
                      {moment(item?.matchedTime || item?.createdAt).format(
                        "DD/MM/YYYY"
                      )}
                      <br />
                      {moment(item?.matchedTime || item?.createdAt).format(
                        "hh:mm:ss A"
                      )}
                    </td>
                  </tr>
                );
              })}

            {/* {isVisibleHistory && (
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
            )} */}
          </tbody>
        </table>
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
      </div>
    </div>
  );
};

export default BetList;
