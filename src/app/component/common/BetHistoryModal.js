import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { getBetHistoryDetailData } from "../../redux/services/MarketAnalytics";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Model from "./Modal";
import { FiX } from "react-icons/fi";
import moment from "moment";

const BetHistoryModal = ({ isVisible, onCloseMenu, sportId }) => {
  const { eventId } = useParams();
  const { themeColor } = useSelector((state) => state?.persist);

  const [activeMenu, setActiveMenu] = useState("other");
  // const [pageFancyAllData, setPageFancyAllData] = useState([]);
  // const [pageLayAllData, setPageLayAllData] = useState([]);
  // const [pageBackData, setPageBackData] = useState([]);
  // const [pageLayData, setPageLayData] = useState([]);
  const [pageData, setPageData] = useState([]);

  // const [betInfo, setBetInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (activeMenu) {
  //     let filterData = [];
  //     if (activeMenu === "other") {
  //       filterData = pageLayAllData?.filter(
  //         (bet) => bet?.type === "lay" || bet?.type === "back"
  //       );
  //     } else {
  //       filterData = pageFancyAllData?.filter(
  //         (bet) => bet?.type === "yes" || bet?.type === "no"
  //       );
  //     }
  //     setPageData(filterData);
  //   }
  // }, [activeMenu, pageLayAllData, pageFancyAllData]);

  useEffect(() => {
    if (eventId) {
      setIsLoading(true);

      const payload = {
        page: 1,
        limit: 20,
        eventId: eventId,
        flag: activeMenu,
        sportId: sportId,
      };

      if (window.innerWidth < 720) {
        getBetHistory(payload);
      }
    }
  }, [eventId, activeMenu]);

  useEffect(() => {
    if (eventId) {
      const interval = setInterval(() => {
        const payload = {
          page: 1,
          limit: 20,
          eventId: eventId,
          flag: activeMenu,
          sportId: sportId,
        };
        if (window.innerWidth < 720) {
          getBetHistory(payload);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [eventId, activeMenu]);

  const getBetHistory = async (payload) => {
    const data = await getBetHistoryDetailData(payload);

    if (data?.data) {
      // const backData = [];
      // const layData = [];
      // data?.data?.results?.map((item) => {
      //   if (item?.type === "lay") {
      //     layData.push(item);
      //   } else {
      //     backData.push(item);
      //   }
      // });

      // setPageFancyAllData(data?.data?.fancyResult);
      // setPageLayAllData(data?.data?.otherResult);
      setPageData(data?.data?.results);
    }
    setIsLoading(false);
  };

  const onClickTab = (menu) => {
    setActiveMenu(menu);
  };

  // const onChangeBetInfo = (e) => {
  //   setBetInfo(e?.target?.checked);
  // };

  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#FFFFFF] rounded-b">
        <div className="p-[16px] flex items-center justify-between border-b-2 border-[#dee2e6]">
          <div className="text-[20px]">Open Bets</div>
          <FiX className="cursor-pointer" size={20} onClick={onCloseMenu} />
        </div>

        <div className="bg-[#FFFFFF] rounded-b mb-20">
          <div className="p-2">
            {/* <div className="flex justify-end"> */}
            <Link
              // target="_blank"
              style={{
                background: themeColor?.headerBgColor,
                color: themeColor?.headerTextColor,
              }}
              to={`/bet-history/${eventId}`}
              className="w-full text-[14px] cursor-pointer rounded px-2 h-[25px] font-black flex items-center justify-center"
            >
              View All
            </Link>
            {/* </div> */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  onClick={() => {
                    onClickTab("other");
                  }}
                  className={`border-b-2 ${
                    activeMenu === "other"
                      ? "text-[#6D081D] border-[#6D081D]"
                      : "border-transparent"
                  } hover:text-[#6D081D] cursor-pointer px-[16px] py-[8px]`}
                >
                  <div className={`text-[13px]`}>Matched</div>
                </div>
                <div
                  onClick={() => {
                    onClickTab("fancy");
                  }}
                  className={`border-b-2 ${
                    activeMenu === "fancy"
                      ? "text-[#6D081D] border-[#6D081D]"
                      : "border-transparent"
                  } hover:text-[#6D081D] cursor-pointer px-[16px] py-[8px]`}
                >
                  <div className={`text-[13px]`}>Fancy</div>
                </div>
              </div>
              {/* <div className="flex items-center">
            <input
              onChange={onChangeBetInfo}
              checked={betInfo}
              type="checkbox"
              className="mr-2 cursor-pointer"
              id="bet-info"
            />
            <label className="text-[12px] cursor-pointer" htmlFor="bet-info">
              Bet Info
            </label>
          </div> */}
            </div>
            <div className="w-[calc(100vw-10px)] sm:w-full table-responsive mt-2">
              <table className=" min-w-max table-fixe text-left">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Market Name</th>
                    <th>Odds</th>
                    <th>Amount</th>
                    <th>Place Time</th>
                    <th>Match Time </th>
                  </tr>
                </thead>
                <tbody className="relative">
                  {isLoading && (
                    <tr>
                      <td colSpan={6}>
                        <div className="flex justify-center items-center h-[100px]">
                          <Loader size={25} color="#6D081D" />
                        </div>
                      </td>
                    </tr>
                  )}
                  {!isLoading && pageData?.length === 0 && (
                    <tr>
                      <td colSpan={6}>
                        <div className="flex justify-center items-center h-[100px]">
                          No Data Found
                        </div>
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
                              {Number(item?.odds)?.toFixed(2) || 0}
                            </td>
                            <td
                              className={`${
                                item?.type === "back" || item?.type === "yes"
                                  ? "bg-[#c7eeff]"
                                  : "bg-[#efe1e5]"
                              } `}
                            >
                              {Number(item?.stake)?.toFixed(2) || 0}
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
              {/* <table className="w-full min-w-max table-auto text-left mt-4">
            <thead>
              <tr>
                <th>Lay (Bet Against)</th>
                <th>Odds</th>
                <th>Stake</th>
                <th>PL</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={4}>
                    <div className="flex justify-center items-center h-[100px]">
                      <Loader size={25} color="#6D081D" />
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && pageLayData?.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="flex justify-center items-center h-[100px]">
                      No Data Found
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading &&
                pageLayData?.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td colSpan={4} className="bg-[#efe1e5] m-0 p-0">
                          <div className="flex items-center">
                            <div className="ml-2">
                              {moment(item?.createdAt)?.format("L h:mm:ss A")}
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr key={index} className="bg-[#efe1e5]">
                        <td>
                          <div className="flex items-center">
                            <div className="bg-[#f9c8d3] border border-[#00000040] px-2 py-1 rounded mr-2 text-[10px] font-black">
                              LAY
                            </div>
                            <div>
                              <span className="font-bold">
                                {item?.selectionName}
                              </span>
                              <br />
                              {item?.marketType}
                            </div>
                          </div>
                        </td>
                        <td>{Number(item?.odds)?.toFixed(2)}</td>
                        <td>{Number(item?.stake)?.toFixed(2)}</td>
                        <td>{Number(item?.pl)?.toFixed(2)}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table> */}
            </div>
          </div>
        </div>
      </div>
    </Model>
  );
};

export default BetHistoryModal;
