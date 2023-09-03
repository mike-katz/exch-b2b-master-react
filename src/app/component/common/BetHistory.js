import moment from "moment";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { getBetHistoryData } from "../../redux/services/MarketAnalytics";

const BetHistory = (props) => {
  const [activeMenu, setActiveMenu] = useState("matched");
  const [pageBackData, setPageBackData] = useState([]);
  const [pageLayData, setPageLayData] = useState([]);
  const [betInfo, setBetInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props?.exEventId) {
      getBetHistory(props?.exEventId);
    }
  }, [props?.exEventId]);

  const getBetHistory = async (exEventId) => {
    const payload = {
      exEventId: exEventId,
    };

    setIsLoading(true);
    const data = await getBetHistoryData(payload);
    console.log(data?.data);
    if (data?.data) {
      const backData = [];
      const layData = [];
      data?.data?.map((item) => {
        if (item?.type === "lay") {
          layData.push(item);
        } else {
          backData.push(item);
        }
      });
      setPageBackData(backData);
      setPageLayData(layData);
      setIsLoading(false);
      // setPageData(data);
    }
  };

  console.log({ isLoading });

  const onClickTab = (menu) => {
    setActiveMenu(menu);
  };

  const onChangeBetInfo = (e) => {
    setBetInfo(e?.target?.checked);
  };

  return (
    <div className="bg-[#FFFFFF] rounded-b mb-20">
      <div className="p-2">
        <div className="flex items-center mt-2 justify-between">
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
          <div className="flex items-center">
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
          </div>
        </div>
        <div className="table-responsive mt-2">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th>Back (Bet for)</th>
                <th>Odds</th>
                <th>Stake</th>
                <th>PL</th>
              </tr>
            </thead>
            <tbody className="relative">
              {isLoading && (
                <tr>
                  <td colSpan={4}>
                    <div className="flex justify-center items-center h-[100px]">
                      <Loader size={25} color="#6D081D" />
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && pageBackData?.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="flex justify-center items-center h-[100px]">
                      No Data Found
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading &&
                pageBackData?.map((item, index) => {
                  return (
                    <>
                      {betInfo && (
                        <tr>
                          <td
                            style={{
                              borderWidth: "0",
                              padding: "4px 10px 0px 10px",
                            }}
                            colSpan={4}
                            className="bg-[#c7eeff]"
                          >
                            <div className="flex items-center">
                              <span className="font-bold mr-[1px]">BetId:</span>{" "}
                              {item?._id}
                              <div className="ml-2">
                                {moment(item?.createdAt)?.format("L h:mm:ss A")}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                      <tr key={index} className="bg-[#c7eeff]">
                        <td
                          style={{
                            padding: betInfo
                              ? "0px 10px 0px 10px"
                              : "4px 10px 4px 10px",
                          }}
                        >
                          <div className="flex items-center">
                            <div className="bg-[#94dfff] border border-[#00000040] px-2 py-1 rounded mr-2 text-[10px] font-black">
                              BACK
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
          </table>
          <table className="w-full min-w-max table-auto text-left mt-4">
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
                      {betInfo && (
                        <tr>
                          <td colSpan={4} className="bg-[#efe1e5] m-0 p-0">
                            <div className="flex items-center">
                              <span className="font-bold mr-[1px]">BetId:</span>{" "}
                              {item?._id}
                              <div className="ml-2">
                                {moment(item?.createdAt)?.format("L h:mm:ss A")}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default BetHistory;
