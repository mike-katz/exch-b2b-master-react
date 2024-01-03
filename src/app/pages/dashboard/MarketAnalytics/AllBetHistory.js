import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
// import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../component/common/Loader";
import Pagination from "../../../component/common/Pagination";
import { getBetHistoryData } from "../../../redux/services/MarketAnalytics";
import { amountFormate } from "../../../utils/helper";
import { BOOK_MARKET_TYPE } from "../../../utils/dropdown";

const AllBetHistory = () => {
  const { eventId, sportId } = useParams();
  const navigate = useNavigate();
  // const { themeColor } = useSelector((state) => state?.persist);

  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [username, setUsername] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const [marketType, setMarketType] = useState("");
  const [amountValue, setAmountValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      transactionsHistory(false, currentPage, perPage);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentPage, perPage, amountValue, marketType]);

  useEffect(() => {
    setIsLoading(true);
    transactionsHistory(false, currentPage, perPage);
  }, [currentPage, perPage]);

  const transactionsHistory = async (payloadParams, currentPage, perPage) => {
    let payload = {};
    if (payloadParams) {
      payload = payloadParams;
    } else {
      payload = {
        page: currentPage,
        limit: perPage,
        eventId: eventId,
        amount: amountValue,
        flag: marketType,
        sportId,
      };
    }

    const data = await getBetHistoryData(payload);

    // if (data?.username) {
    //   setUsername(data?.username);
    // }

    if (data?.data) {
      setTotalPage(data?.data?.totalPages);
      setPerPage(data?.data?.limit);
      setCurrentPage(data?.data?.page);
      setPageData(data?.data?.results);
      setTotalResults(data?.data?.totalResults);
    }

    setIsLoading(false);
  };

  const onRefreshPagination = (count) => {
    setCurrentPage(count);
    const payload = {
      page: count,
      limit: perPage,
      eventId: eventId,
      amount: amountValue,
      flag: marketType,
      sportId,
    };

    transactionsHistory(payload);
  };

  const onClickBack = () => {
    navigate(`/market-analytics/${eventId}`);
  };

  const onChangePerPage = (value) => {
    setPerPage(value);
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: value,
      eventId: eventId,
      amount: amountValue,
      flag: marketType,
      sportId,
    };

    transactionsHistory(payload);
  };

  const onChangeMarketType = (e) => {
    setMarketType(e?.target?.value);
  };

  const onChangeAmount = (e) => {
    setAmountValue(e?.target?.value);
  };

  // const onClickSubmit = () => {};

  return (
    <div className="px-2">
      <div>
        <div className="text-[#243a48] text-[16px] font-black mt-4 flex items-center">
          <FaChevronLeft
            size={20}
            color="#243a48"
            onClick={onClickBack}
            className="mr-2 cursor-pointer"
          />{" "}
          Bet List
        </div>
        <div className="grid grid-cols-12 gap-4 items-end mb-4 mt-4 bg-[#e0e6e6] p-3 pt-2 rounded">
          <div className="col-span-6 lg:col-span-2">
            <div className="text-[#000] text-[12px]">Market Type: </div>
            <select
              value={marketType}
              onChange={onChangeMarketType}
              className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
            >
              {BOOK_MARKET_TYPE?.map((item, index) => {
                return (
                  <option key={index} value={item?.value}>
                    {item?.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-span-6 lg:col-span-2">
            <div className="text-[#000] text-[12px]">Amount :</div>
            <input
              value={amountValue}
              onChange={onChangeAmount}
              type="number"
              className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
              placeholder="Amount"
            />
          </div>
          {/* <div className="col-span-6 lg:col-span-2">
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
          </div> */}
        </div>
        {/* <div className="flex items-center bg-[#1b2d38] h-[40px] px-[10px] py-[5px]">
          <FaChevronLeft
            size={20}
            color="#FFFFFF"
            onClick={onClickBack}
            className="mr-2 cursor-pointer"
          />
          <div className="text-[18px] text-[#FFFFFF] font-black">
            Bet History
          </div>
        </div> */}

        <div>
          <div className="table-responsive">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="">Username</th>
                  <th className="">Market Name</th>
                  <th className="">Odds</th>
                  <th className="">Amount</th>
                  <th className="">Place Time</th>
                  <th className="">Match Time</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td className="h-[200px] text-center" colSpan={6}>
                      <Loader color={"#FEBA11"} size={25} />
                    </td>
                  </tr>
                )}
                {!isLoading && pageData?.length === 0 && (
                  <tr>
                    <td
                      className="h-[200px] text-center text-[16px] font-black"
                      colSpan={6}
                    >
                      No Record Found
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  pageData?.map((item, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td
                            className={`${
                              item?.type === "back" || item?.type === "yes"
                                ? "bg-[#c7eeff]"
                                : "bg-[#efe1e5]"
                            } `}
                            style={{
                              padding: "4px 10px 4px 10px",
                            }}
                          >
                            <div className="flex items-center">
                              <div>
                                <span className="font-bold">
                                  {item?.username}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td
                            className={`${
                              item?.type === "back" || item?.type === "yes"
                                ? "bg-[#c7eeff]"
                                : "bg-[#efe1e5]"
                            } `}
                          >
                            <span className="font-bold">
                              {item?.selectionName}
                            </span>
                            <br />
                            {item?.marketType}
                          </td>
                          <td
                            className={`${
                              item?.type === "back" || item?.type === "yes"
                                ? "bg-[#c7eeff]"
                                : "bg-[#efe1e5]"
                            } `}
                          >
                            {amountFormate(Number(item?.odds)?.toFixed(2) || 0)}
                            {(item?.size || item?.size === 0) &&
                              `/${
                                item?.mrktType === "line_market"
                                  ? "100"
                                  : item?.size
                              }`}
                          </td>
                          <td
                            className={`${
                              item?.type === "back" || item?.type === "yes"
                                ? "bg-[#c7eeff]"
                                : "bg-[#efe1e5]"
                            } `}
                          >
                            {amountFormate(
                              Number(item?.stake)?.toFixed(2) || 0
                            )}
                          </td>
                          <td
                            className={`${
                              item?.type === "back" || item?.type === "yes"
                                ? "bg-[#c7eeff]"
                                : "bg-[#efe1e5]"
                            } `}
                          >
                            {moment(item?.createdAt)?.format("DD/MM/YYYY")}
                            <br />
                            {moment(item?.createdAt)?.format("h:mm:ss A")}
                          </td>
                          <td
                            className={`${
                              item?.type === "back" || item?.type === "yes"
                                ? "bg-[#c7eeff]"
                                : "bg-[#efe1e5]"
                            } `}
                          >
                            {moment(
                              item?.matchedTime || item?.createdAt
                            )?.format("DD/MM/YYYY")}
                            <br />
                            {moment(
                              item?.matchedTime || item?.createdAt
                            )?.format("h:mm:ss A")}
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {!isLoading && pageData?.length !== 0 && totalPage ? (
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
      ) : null}
    </div>
  );
};

export default AllBetHistory;
