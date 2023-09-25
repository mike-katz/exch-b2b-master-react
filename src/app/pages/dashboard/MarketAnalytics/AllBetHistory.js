import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../component/common/Loader";
import { amountFormate } from "../../../utils/helper";
import Pagination from "../../../component/common/Pagination";
import { getBetHistoryData } from "../../../redux/services/MarketAnalytics";
import { FaChevronLeft } from "react-icons/fa";

const AllBetHistory = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [username, setUsername] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [paginationPage, setPaginationPage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      transactionsHistory();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    transactionsHistory();
  }, []);

  const transactionsHistory = async (payloadParams) => {
    let payload = {};
    if (payloadParams) {
      payload = payloadParams;
    } else {
      payload = {
        page: currentPage,
        limit: perPage,
        eventId: eventId,
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
      setPaginationPage(data?.data?.totalPages);
      setPageData(data?.data?.results);
    }

    setIsLoading(false);
  };

  const onRefreshPagination = (count) => {
    setCurrentPage(count);
    const payload = {
      page: count,
      limit: perPage,
      eventId: eventId,
    };

    transactionsHistory(payload);
  };

  const onClickBack = () => {
    navigate(`/market-analytics/${eventId}`);
  };

  return (
    <div className="py-4">
      <div style={{ boxShadow: "0 4px 5px rgba(0,0,0,.5)" }}>
        <div className="flex items-center bg-[#1b2d38] h-[40px] px-[10px] py-[5px]">
          <FaChevronLeft
            size={20}
            color="#FFFFFF"
            onClick={onClickBack}
            className="mr-2 cursor-pointer"
          />
          <div className="text-[18px] text-[#FFFFFF] font-black">
            Bet History
          </div>
          {/* <div className="bg-[#fff] text-[#243a48] text-[15px] py-[1px] px-[8px] rounded mx-[5px] font-black">
            {username}
          </div> */}
        </div>

        <div>
          <div className="table-responsive">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="">Date/Time </th>
                  <th className="text-right">Deposit</th>
                  <th className="text-right">Withdraw</th>
                  <th className="text-right">Balance</th>
                  <th className="text-right">Remark</th>
                  <th className="text-right">From/To</th>
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
                              item?.type === "back"
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
                              item?.type === "back"
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
                              item?.type === "back"
                                ? "bg-[#c7eeff]"
                                : "bg-[#efe1e5]"
                            } `}
                          >
                            {amountFormate(Number(item?.odds)?.toFixed(2) || 0)}
                          </td>
                          <td
                            className={`${
                              item?.type === "back"
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
                              item?.type === "back"
                                ? "bg-[#c7eeff]"
                                : "bg-[#efe1e5]"
                            } `}
                          >
                            {moment(item?.createdAt)?.format("DD/MM/YYYY")}
                            <br />
                            {moment(item?.updatedAt)?.format("h:mm:ss A")}
                          </td>
                          <td
                            className={`${
                              item?.type === "back"
                                ? "bg-[#c7eeff]"
                                : "bg-[#efe1e5]"
                            } `}
                          >
                            {moment(item?.updatedAt)?.format("DD/MM/YYYY")}
                            <br />
                            {moment(item?.updatedAt)?.format("h:mm:ss A")}
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
      {!isLoading && pageData?.length !== 0 && paginationPage ? (
        <div className="flex justify-center my-7 mb:pb-0 pb-20">
          <Pagination
            itemsPerPage={paginationPage}
            totalPage={totalPage}
            onChange={onRefreshPagination}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AllBetHistory;