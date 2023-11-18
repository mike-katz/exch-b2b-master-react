import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { TbLadder } from "react-icons/tb";
import { formatCashRound } from "../../utils/helper";
import Model from "./Modal";

const DATA = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];

const LineGameCard = (props) => {
  // const onClickSportDetail = () => {
  //   navigate('/sports/details/123');
  // };

  const [blinkData, setBlinkData] = useState([]);
  const [plModalData, setPlModalData] = useState([]);
  const [isVisiblePlData, setIsVisiblePlData] = useState(false);

  useEffect(() => {
    if (props?.oldData) {
      console.log(props?.oldData);
      setBlinkData(props?.oldData);

      setTimeout(() => {
        const customizeBlinkData = [];
        props?.oldData?.map((item) => {
          customizeBlinkData.push([false, false]);
        });
        // console.log(customizeBlinkData);
        setBlinkData(customizeBlinkData);
      }, 200);
    }
  }, [props?.oldData]);

  // const [activeDataId, setActiveDataId] = useState('');

  const onClickPl = (plArray, marketName, odds) => {
    setIsVisiblePlData(true);
    setPlModalData({ marketName, plArray, odds });
  };

  const onCLosePlModal = () => {
    setIsVisiblePlData(false);
  };

  return (
    <div className="mb-2">
      <Model isVisible={isVisiblePlData} onCloseMenu={onCLosePlModal}>
        <div className="w-full md:min-w-[300px] pt-3">
          <div className="flex items-center justify-between px-2">
            <div className="text-[14px]">{plModalData?.marketName}</div>
            <FiX
              onClick={onCLosePlModal}
              className="cursor-pointer"
              size={20}
            />
          </div>
          <div className="table-responsive mt-2">
            <table className="w-full min-w-max table-auto text-left font-bold">
              <thead className="bg-[#e9eff8] uppercase">
                <tr>
                  <th>Runes</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {plModalData?.plArray?.length === 0 && (
                  <tr>
                    <td
                      className="h-[100px] text-center text-[14px] font-bold"
                      colSpan={2}
                    >
                      No Record Found
                    </td>
                  </tr>
                )}
                {plModalData?.plArray?.map((item, index) => {
                  if (item?.odds >= 0) {
                    return (
                      <tr key={index}>
                        <td>{item?.odds}</td>
                        <td
                          className={`${
                            Number(item?.si) > 0 ? "text-[green]" : "text-[red]"
                          }`}
                        >
                          {item?.si}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Model>
      <div
        style={{
          background: "#e9eff8",
          color: "#FFFFFF",
        }}
        className={`flex w-full justify-between items-center p-0`}
      >
        <div className="flex items-center">
          <div className="min-h-[37px] w-full relative">
            <div
              style={{
                background: "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
              }}
              className="bg-cross min-h-[37px] left-0 z-[9] h-full flex items-center pl-1 pr-8 md:min-w-[200px]"
            >
              <span className="text-[15px] ml-1 font-bold">Line Market</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center border grid grid-cols-12 border-[#f2edf3]">
        <div
          style={{ background: "#FFFFFF" }}
          className="min-h-[37px] flex items-center md:col-span-7 col-span-8"
        ></div>
        <div
          style={{ background: "#FFFFFF" }}
          className="min-h-[37px] flex items-center md:col-span-2 col-span-4"
        >
          <div className="w-full font-bold text-[11px] text-center">NO</div>
          <div className="w-full font-bold text-[11px] text-center">YES</div>
        </div>
        <div
          style={{ background: "#FFFFFF" }}
          className="min-h-[37px] flex items-center col-span-3 md:block hidden"
        ></div>
      </div>
      {props?.data.map((item, index) => {
        const runners = item?.runners?.[0]?.exchange;
        const key = item?.runners?.[0]?.selectionId;

        const status = item?.runners?.find((item) => item?.selectionId == key)
          ?.state?.status;

        const price =
          props?.oldPrice?.find(
            (plData) => plData?.exMarketId === item?.exMarketId
          )?.runnerData?.[item?.exMarketId] || 0;

        const blinkValue = blinkData?.[index]?.[0];

        const plArray =
          props?.linePlArray?.find(
            (plArray) => plArray?.exMarketId === item?.exMarketId
          )?.runnerData || [];

        return (
          <>
            <div key={index} className="grid grid-cols-12">
              <div
                className={`bg-[#FFFFFF] border-[#f2edf3] min-h-[37px] md:col-span-7 col-span-8 flex justify-between px-2 py-1 min-h-[50px] ${
                  DATA?.length === index + 1 ? "" : "border-b"
                }`}
              >
                <div className="flex items-center w-full">
                  <div
                    className="flex flex-col md:flex-row w-full"
                    // onClick={onClickSportDetail}
                  >
                    <div className="text-[#3B5160] text-[13px] font-bold text-ellipsis">
                      {item?.marketName}
                    </div>
                  </div>
                  {Number(price) !== 0 && (
                    <div
                      onClick={() => {
                        onClickPl(
                          plArray,
                          item?.marketName,
                          runners?.availableToBack?.[0]?.price
                        );
                      }}
                      className="flex justify-between w-[50px] cursor-pointer"
                    >
                      <TbLadder />
                      <div className="flex items-center font-bold">
                        <span
                          className={`text-[10px] mr-2 ${
                            Number(price) > 0 ? "text-[green]" : "text-[red]"
                          }`}
                        >
                          {price}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="min-h-[37px] w-full flex items-center md:col-span-2 col-span-4 relative">
                {item?.state?.status === "ACTIVE" ||
                item?.state?.status === "OPEN" ? (
                  status === "ACTIVE" || status === "OPEN" ? null : (
                    <div className="absolute capitalize text-[13px] text-[red] flex justify-center items-center bg-[#fff] border border-[#ff57222b] opacity-80 h-full w-full font-extrabold">
                      {status}
                    </div>
                  )
                ) : (
                  <div className="absolute capitalize text-[13px] text-[red] flex justify-center items-center bg-[#fff] border border-[#ff57222b] opacity-80 h-full w-full font-extrabold">
                    {item?.state?.status}
                  </div>
                )}
                {/* <div className="absolute capitalize text-[13px] text-[red] flex justify-center items-center bg-[#fff] border border-[#ff57222b] opacity-80 h-full w-full font-extrabold">
                  suspended
                </div> */}
                <div className="w-full flex items-center">
                  <div
                    style={{
                      background: "rgb(249, 200, 211)",
                      borderColor: "#FFFFFF",
                    }}
                    className={`cursor-pointer w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                      blinkValue?.[0] ? "blink_me" : ""
                    } ${DATA?.length === index + 1 ? "" : "border-b"} border-r`}
                  >
                    <div className="text-[#1e1e1e] text-[12px] font-bold text-center">
                      {runners?.availableToLay?.[0]?.price || "-"}
                    </div>
                    <div className="text-[#1e1e1e] text-[10px] font-bold text-center mt-[-3px]">
                      {runners?.availableToLay?.[0]?.size || "-"}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgb(148, 223, 255)",
                      borderColor: "#FFFFFF",
                    }}
                    className={`cursor-pointer w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                      blinkValue?.[1] ? "blink_me" : ""
                    } ${DATA?.length === index + 1 ? "" : "border-b"} border-r`}
                  >
                    <div className="text-[#1e1e1e] text-[12px] font-bold text-center">
                      {runners?.availableToBack?.[0]?.price || "-"}
                    </div>
                    <div className="text-[#1e1e1e] text-[10px] font-bold text-center mt-[-3px]">
                      {runners?.availableToBack?.[0]?.size || "-"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFFFFF] min-h-[37px] w-full flex items-center col-span-3 justify-end px-[6px] my-[1px] md:block hidden">
                <div className="flex flex-col justify-center h-full">
                  <div className="text-[#43444a] text-[10px] text-right">
                    Min Bet:{" "}
                    {formatCashRound(item?.betLimit?.split(" - ")?.[0])}
                  </div>
                  <div className="text-[#43444a] text-[10px] text-right">
                    Max Bet:{" "}
                    {formatCashRound(item?.betLimit?.split(" - ")?.[1])}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default LineGameCard;
