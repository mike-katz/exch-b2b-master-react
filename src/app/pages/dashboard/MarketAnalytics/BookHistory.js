import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../component/common/Loader";
import { amountFormate } from "../../../utils/helper";
import Pagination from "../../../component/common/Pagination";
import { getUserPlByMarketData } from "../../../redux/services/MarketAnalytics";

const BookHistory = () => {
  const { exEventId, exMarketId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [tableRow, setTableRow] = useState([]);
  const [eventName, setEventName] = useState("");
  const [marketName, setMarketName] = useState("");

  const onClickBack = () => {
    navigate(`/market-analytics/${exEventId}`);
  };

  useEffect(() => {
    getUserPlByMarket();
  }, []);

  const getUserPlByMarket = async (payloadParams = false) => {
    setIsLoading(true);

    let payload = {};
    if (payloadParams) {
      payload = payloadParams;
    } else {
      payload = {
        page: currentPage,
        limit: perPage,
        marketId: exMarketId,
      };
    }

    const data = await getUserPlByMarketData(payload);

    if (data?.data?.results?.length > 0) {
      const tableSelections = [];
      // data?.data?.results?.[0]?.selectionId?.map((item) => {
      //   const [key] = Object.entries(item)[0];
      //   tableSelections?.push(data?.runnerData?.[key]);
      // });

      // Object.keys(data?.runnerData)?.map((key) => {
      //   tableSelections?.push(data?.runnerData?.[key]);
      // });

      console.log({ tableSelections });

      setTableRow(data?.runnerData);
      setTotalPage(data?.data?.totalPages);
      setPerPage(data?.data?.limit);
      setCurrentPage(data?.data?.page);
      setPageData(data?.data?.results);
      setTotalResults(data?.data?.totalResults);
      setEventName(data?.eventName);
      setMarketName(data?.marketName);
    }
    setIsLoading(false);
  };

  const onChangePerPage = (value) => {
    setPerPage(value);
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: value,
      marketId: exMarketId,
    };

    getUserPlByMarket(payload);
  };

  const onRefreshPagination = (count) => {
    setCurrentPage(count);
    const payload = {
      page: count,
      limit: perPage,
      marketId: exMarketId,
    };

    getUserPlByMarket(payload);
  };

  //   const onClickChildren = (item) => {};

  return (
    <div className="py-4">
      <div style={{ boxShadow: "0 4px 5px rgba(0,0,0,.5)" }}>
        <div className="flex items-center justify-between bg-[#1b2d38] h-[40px] px-[10px] py-[5px]">
          <div className="flex items-center">
            <FaChevronLeft
              size={20}
              color="#FFFFFF"
              onClick={onClickBack}
              className="mr-2 cursor-pointer"
            />

            <div className="text-[18px] text-[#FFFFFF] font-black">Book</div>
          </div>
          <div className="bg-[#fff] text-[#243a48] text-[15px] py-[1px] px-[8px] rounded mx-[5px] font-semibold">
            <span className="font-black">{eventName}:</span> {marketName}
          </div>
        </div>

        <div>
          <div className="table-responsive">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="">Username</th>
                  {Object.keys(tableRow)?.map((key, index) => {
                    return (
                      <th key={key} className="w-36">
                        {tableRow?.[key]}
                      </th>
                    );
                  })}
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
                          <td>
                            <div
                              // onClick={() => {
                              //   onClickChildren(item);
                              // }}
                              className={`flex items-center font-bold h-full ${
                                item?.roles?.toString() === "User"
                                  ? ""
                                  : "text-[#568bc8] cursor-pointer"
                              }`}
                            >
                              <span className="w-[30px]">
                                {(currentPage - 1) * perPage + index + 1}.
                              </span>{" "}
                              {/* {roleStatus(item?.roles?.toString())} */}
                              <Link
                                to={`/down-list-master/details/beating-history/${item?.username?._id}`}
                                className={`${
                                  item?.roles?.toString() === "User"
                                    ? ""
                                    : "underline"
                                }`}
                              >
                                {item?.username?.username}
                              </Link>
                            </div>
                          </td>
                          {Object.keys(tableRow)?.map((key) => {
                            const keys = item?.selectionId?.find(
                              (sl) => Object.keys(sl)[0] === key
                            );
                            return (
                              <td
                                key={key}
                                className={`text-[${
                                  keys?.[key] > 0 ? "green" : "red"
                                }]`}
                              >
                                {amountFormate(
                                  Number(keys?.[key])?.toFixed(2) || 0
                                )}
                              </td>
                            );
                          })}
                          {/* {item?.selectionId?.map((item) => {
                            const [key, value] = Object.entries(item)[0];
                            return (
                              <td
                                key={key}
                                className={`text-[${
                                  value > 0 ? "green" : "red"
                                }]`}
                              >
                                {amountFormate(Number(value)?.toFixed(2) || 0)}
                              </td>
                            );
                          })} */}
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

export default BookHistory;
