import moment from "moment";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { getBetHistoryData } from "../../redux/services/MarketAnalytics";
import { Link, useParams } from "react-router-dom";

const BetHistory = (props) => {
  const { eventId } = useParams();

  const [activeMenu, setActiveMenu] = useState("matched");
  const [pageBackAllData, setPageBackAllData] = useState([]);
  // const [pageBackData, setPageBackData] = useState([]);
  // const [pageLayData, setPageLayData] = useState([]);
  const [pageData, setPageData] = useState([]);

  // const [betInfo, setBetInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeMenu && pageBackAllData?.length > 0) {
      let filterData = [];
      if (activeMenu === "matched") {
        filterData = pageBackAllData?.filter(
          (bet) => bet?.type === "lay" || bet?.type === "back"
        );
      } else {
        filterData = pageBackAllData?.filter(
          (bet) => bet?.type === "yes" || bet?.type === "no"
        );
      }
      setPageData(filterData);
    }
  }, [activeMenu, pageBackAllData]);

  useEffect(() => {
    if (eventId) {
      setIsLoading(true);

      const payload = {
        page: 1,
        limit: 20,
        eventId: eventId,
      };

      getBetHistory(payload);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      const interval = setInterval(() => {
        const payload = {
          page: 1,
          limit: 20,
          eventId: eventId,
        };
        getBetHistory(payload);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [eventId]);

  const getBetHistory = async (payload) => {
    const data = await getBetHistoryData(payload);

    if (data?.data) {
      const backData = [];
      const layData = [];
      data?.data?.results?.map((item) => {
        if (item?.type === "lay") {
          layData.push(item);
        } else {
          backData.push(item);
        }
      });
      setPageBackAllData(backData);
      setPageData(layData);
      setIsLoading(false);
    }
  };

  const onClickTab = (menu) => {
    setActiveMenu(menu);
  };

  // const onChangeBetInfo = (e) => {
  //   setBetInfo(e?.target?.checked);
  // };

  return (
    <div className="bg-[#FFFFFF] rounded-b mb-20">
      <div className="p-2">
        {/* <div className="flex justify-end"> */}
        <Link
          to={`/bet-history/${eventId}`}
          className="w-full text-[14px] cursor-pointer bg-[#000000] text-[#feba11] rounded px-2 h-[25px] font-black flex items-center justify-center"
        >
          View All
        </Link>
        {/* </div> */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              onClick={() => {
                onClickTab("matched");
              }}
              className={`border-b-2 ${
                activeMenu === "matched"
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
        <div className="table-responsive mt-2">
          <table className="w-full min-w-max table-auto text-left">
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
                          {Number(item?.odds)?.toFixed(2) || 0}
                        </td>
                        <td
                          className={`${
                            item?.type === "back"
                              ? "bg-[#c7eeff]"
                              : "bg-[#efe1e5]"
                          } `}
                        >
                          {Number(item?.stake)?.toFixed(2) || 0}
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
  );
};

export default BetHistory;
