import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LiveStreaming from "../../../component/common/LiveStriming";

const MarketAnalyticsDetail = (props) => {
  const navigate = useNavigate();
  const [activeStreamingDesktop, setActiveStreamingDesktop] = useState(false);
  const [activeStreamingMobile, setActiveStreamingMobile] = useState(false);

  const onClickBack = () => {
    navigate(`/market-analytics`);
  };

  const onChangeDesktopLiveStreaming = () => {
    setActiveStreamingDesktop(!activeStreamingDesktop);
  };

  const onChangeMobileLiveStreaming = () => {
    setActiveStreamingMobile(!activeStreamingMobile);
  };

  return (
    <div className="px-2">
      <div className="text-[#243a48] text-[16px] font-black mt-4 flex items-center">
        <FaChevronLeft
          color="#243a48"
          onClick={onClickBack}
          className="mr-2 cursor-pointer"
        />{" "}
        Market Analytics Detail
      </div>
      <div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 md:col-span-7 xl:col-span-8">
            <div
              className={`flex justify-between items-start md:items-center md:flex-row flex-col px-4 py-1 border-b border-[#FFFFFF] text-[#FFFFFF]`}
              style={{
                background: "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
              }}
            >
              <div className="text-[14px] font-bold">
                Northern Superchargers v Birmingham Phoenix
              </div>
              <div className="text-[12px] font-bold flex justify-between w-full md:w-auto mt-1 md:mt-0 items-center">
                <img
                  className="cursor-pointer ml-1 h-[18px] md:hidden"
                  onClick={onChangeMobileLiveStreaming}
                  src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/tv.svg"
                  style={{ filter: "invert(1)" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center mt-2">
                <div className="bg-[#E4E4E4] min-h-[37px] w-full lg:w-[50%] relative">
                  <div
                    style={{
                      background:
                        "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
                    }}
                    className="absolute left-0 w-[170px] z-[9] h-full flex items-center"
                  >
                    <div
                      style={{
                        clipPath:
                          "polygon(0 -1px, 100% -1px, 1px 100%, 0 100%)",
                        width: "18px",
                        height: "calc(100% + 0px)",
                        position: "absolute",
                        right: "-17px",
                        top: 0,
                        background:
                          "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
                      }}
                    ></div>
                    {/* <img src={props?.icon} className="ml-2 h-[20px] w-[20px]" /> */}
                    <span className="text-[#FFFFFF] text-[15px] ml-2 font-bold">
                      {"props?.title"}
                    </span>
                  </div>
                </div>
                <div className="bg-[#E4E4E4] min-h-[37px] w-[50%] hidden lg:flex items-center">
                  <div className="w-[33.33%] flex justify-center items-center h-full">
                    <div className="text-[#333] text-[15px] font-bold">1</div>
                  </div>
                  <div className="w-[33.33%] flex justify-center items-center h-full">
                    <div className="text-[15px] font-bold">x</div>
                  </div>
                  <div className="text-[#333] w-[33.33%] flex justify-center items-center h-full">
                    <div className="text-[#333] text-[15px] font-bold">2</div>
                  </div>
                </div>
              </div>
              <div className="text-base font-normal p-0">
                <div className="flex items-center border border-[#f2edf3] grid grid-cols-12">
                  <div
                    style={{ background: "#FFFFFF" }}
                    className="min-h-[37px] flex items-center col-span-6"
                  ></div>
                  <div
                    style={{ background: "#FFFFFF" }}
                    className="min-h-[37px] flex items-center col-span-6"
                  >
                    <div className="w-full sm:block hidden"></div>
                    <div className="w-full sm:block hidden"></div>
                    <div className="w-full font-bold text-[11px] text-center">
                      BACK
                    </div>
                    <div className="w-full font-bold text-[11px] text-center">
                      LAY
                    </div>
                    <div className="w-full sm:block hidden"></div>
                    <div className="w-full sm:block hidden"></div>
                  </div>
                </div>
                {/* {props?.data?.runnerData &&
                  Object.keys(props?.data?.runnerData).map((key, index) => {
                    const runners = props?.data?.runners?.find(
                      (item) => item?.selectionId == key
                    )?.exchange;

                    const selectionId = props?.data?.runners?.find(
                      (item) => item?.selectionId == key
                    )?.selectionId;

                    const status = props?.data?.runners?.find(
                      (item) => item?.selectionId == key
                    )?.state?.status;

                    let price = "";

                    if (key === props?.activeSubId) {
                      if (props?.activeType === "back") {
                        price = price =
                          (props?.currentBetRate - 1) * props?.currentBetValue;
                      } else {
                        price = price = Number(
                          -(props?.currentBetRate - 1) * props?.currentBetValue
                        );
                      }
                    } else {
                      if (props?.activeType === "back") {
                        price = Number(-props?.currentBetValue);
                      } else {
                        price = Number(props?.currentBetValue);
                      }
                    }

                    if (props?.oldPrice?.[key] && key && props?.activeSubId) {
                      price = price + props?.oldPrice?.[key];
                    }

                    const blinkValue = blinkData?.[index];

                    return (
                      <>
                        <div key={index} className="grid grid-cols-12">
                          <div
                            className={`bg-[#FFFFFF] border-[#f2edf3] min-h-[37px] col-span-6 flex justify-between px-2 py-1 min-h-[50px] ${
                              Object.keys(props?.data?.runnerData)?.length ===
                              index + 1
                                ? ""
                                : "border-b"
                            }`}
                          >
                            <div className="flex items-center w-full">
                              <div className="cursor-pointer flex justify-between flex-col md:flex-row w-full">
                                <div className="text-[#3B5160] text-[13px] font-bold text-ellipsis">
                                  {props?.data?.runnerData?.[key]}
                                </div>

                                <div className="flex items-center font-bold">
                                  {props?.oldPrice?.[key] ? (
                                    <span
                                      className={`text-[10px] mr-2 ${
                                        Number(props?.oldPrice?.[key]) > 0
                                          ? "text-[green]"
                                          : "text-[red]"
                                      }`}
                                    >
                                      {props?.oldPrice?.[key]}
                                    </span>
                                  ) : (
                                    <span
                                      className={`text-[10px] mr-2 text-[red]`}
                                    >
                                      0.0
                                    </span>
                                  )}

                                  {price !== "" &&
                                  props?.currentBetRate &&
                                  props?.currentBetValue ? (
                                    <FiArrowRight
                                      className={`text-[10px] mr-1 ${
                                        Number(price) > 0
                                          ? "text-[green]"
                                          : "text-[red]"
                                      }`}
                                    />
                                  ) : null}

                                  {price !== "" &&
                                  props?.currentBetRate &&
                                  props?.currentBetValue ? (
                                    <span
                                      className={`text-[10px] mr-2 ${
                                        Number(price) > 0
                                          ? "text-[green]"
                                          : "text-[red]"
                                      }`}
                                    >
                                      ({price?.toFixed(2)})
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="min-h-[37px] w-full flex items-center col-span-6 relative">
                            {status === "ACTIVE" || status === "OPEN" ? null : (
                              <div className="absolute capitalize text-[13px] text-[red] flex justify-center items-center bg-[#fff] border border-[#ff57222b] opacity-80 h-full w-full font-extrabold">
                                {status}
                              </div>
                            )}

                            <div className="w-full flex items-center sm:flex hidden">
                              <div
                                onMouseEnter={() => onBackMouseEnter(1, index)}
                                onMouseLeave={() => onBackMouseLeave(1, index)}
                                onClick={() => {
                                  if (runners?.availableToBack?.[2]?.price) {
                                    onClickBetData(
                                      props?.id,
                                      key,
                                      "back",
                                      props?.data?.betLimit?.split(" - ")?.[0],
                                      props?.data?.betLimit?.split(" - ")?.[1],
                                      runners?.availableToBack?.[2]?.price,
                                      selectionId,
                                      props?.data?.exEventId,
                                      props?.data?.exMarketId
                                    );
                                  }
                                }}
                                style={{
                                  background:
                                    backHoverColor &&
                                    activeIndex === `${1}-${index}`
                                      ? backHoverColor
                                      : "rgb(199, 238, 255)",
                                  borderColor: "#FFFFFF",
                                }}
                                className={`cursor-pointer w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                                  blinkValue?.[0] ? "blink_me" : ""
                                } ${
                                  Object.keys(props?.data?.runnerData)
                                    ?.length ===
                                  index + 1
                                    ? ""
                                    : "border-b"
                                } border-r`}
                              >
                                <div className="text-[#1e1e1e] text-[12px] font-bold text-center">
                                  {runners?.availableToBack?.[2]?.price || "-"}
                                </div>
                                <div className="text-[#1e1e1e] text-[10px] font-bold text-center mt-[-3px]">
                                  {runners?.availableToBack?.[2]?.size || "-"}
                                </div>
                              </div>
                              <div
                                onMouseEnter={() => onBackMouseEnter(2, index)}
                                onMouseLeave={() => onBackMouseLeave(2, index)}
                                onClick={() => {
                                  if (runners?.availableToBack?.[1]?.price) {
                                    onClickBetData(
                                      props?.id,
                                      key,
                                      "back",
                                      props?.data?.betLimit?.split(" - ")?.[0],
                                      props?.data?.betLimit?.split(" - ")?.[1],
                                      runners?.availableToBack?.[1]?.price,
                                      selectionId,
                                      props?.data?.exEventId,
                                      props?.data?.exMarketId
                                    );
                                  }
                                }}
                                style={{
                                  background:
                                    backHoverColor &&
                                    activeIndex === `${2}-${index}`
                                      ? backHoverColor
                                      : "rgb(199, 238, 255)",
                                  borderColor: "#FFFFFF",
                                }}
                                className={`cursor-pointer w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                                  blinkValue?.[1] ? "blink_me" : ""
                                } ${
                                  Object.keys(props?.data?.runnerData)
                                    ?.length ===
                                  index + 1
                                    ? ""
                                    : "border-b"
                                } border-r`}
                              >
                                <div className="text-[#1e1e1e] text-[12px] font-bold text-center">
                                  {runners?.availableToBack?.[1]?.price || "-"}
                                </div>
                                <div className="text-[#1e1e1e] text-[10px] font-bold text-center mt-[-3px]">
                                  {runners?.availableToBack?.[1]?.size || "-"}
                                </div>
                              </div>
                            </div>
                            <div className="w-full flex items-center">
                              <div
                                onMouseEnter={() => onBackMouseEnter(3, index)}
                                onMouseLeave={() => onBackMouseLeave(3, index)}
                                onClick={() => {
                                  if (runners?.availableToBack?.[0]?.price) {
                                    onClickBetData(
                                      props?.id,
                                      key,
                                      "back",
                                      props?.data?.betLimit?.split(" - ")?.[0],
                                      props?.data?.betLimit?.split(" - ")?.[1],
                                      runners?.availableToBack?.[0]?.price,
                                      selectionId,
                                      props?.data?.exEventId,
                                      props?.data?.exMarketId
                                    );
                                  }
                                }}
                                style={{
                                  background:
                                    backHoverColor &&
                                    activeIndex === `${3}-${index}`
                                      ? backHoverColor
                                      : "rgb(148, 223, 255)",
                                  borderColor: "#FFFFFF",
                                }}
                                className={`cursor-pointer w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                                  blinkValue?.[2] ? "blink_me" : ""
                                } ${
                                  Object.keys(props?.data?.runnerData)
                                    ?.length ===
                                  index + 1
                                    ? ""
                                    : "border-b"
                                } border-r`}
                              >
                                <div className="text-[#1e1e1e] text-[12px] font-bold text-center">
                                  {runners?.availableToBack?.[0]?.price || "-"}
                                </div>
                                <div className="text-[#1e1e1e] text-[10px] font-bold text-center mt-[-3px]">
                                  {runners?.availableToBack?.[0]?.size || "-"}
                                </div>
                              </div>
                              <div
                                onMouseEnter={() => onLayMouseEnter(4, index)}
                                onMouseLeave={() => onLayMouseLeave(4, index)}
                                onClick={() => {
                                  if (runners?.availableToLay?.[0]?.price) {
                                    onClickBetData(
                                      props?.id,
                                      key,
                                      "lay",
                                      props?.data?.betLimit?.split(" - ")?.[0],
                                      props?.data?.betLimit?.split(" - ")?.[1],
                                      runners?.availableToLay?.[0]?.price,
                                      selectionId,
                                      props?.data?.exEventId,
                                      props?.data?.exMarketId
                                    );
                                  }
                                }}
                                style={{
                                  background:
                                    layHoveColor &&
                                    activeIndex === `${4}-${index}`
                                      ? layHoveColor
                                      : "rgb(249, 200, 211)",
                                  borderColor: "#FFFFFF",
                                }}
                                className={`cursor-pointer w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                                  blinkValue?.[3] ? "blink_me" : ""
                                } ${
                                  Object.keys(props?.data?.runnerData)
                                    ?.length ===
                                  index + 1
                                    ? ""
                                    : "border-b"
                                } border-r`}
                              >
                                <div className="text-[#1e1e1e] text-[12px] font-bold text-center">
                                  {runners?.availableToLay?.[0]?.price || "-"}
                                </div>
                                <div className="text-[#1e1e1e] text-[10px] font-bold text-center mt-[-3px]">
                                  {runners?.availableToLay?.[0]?.size || "-"}
                                </div>
                              </div>
                            </div>
                            <div className="w-full flex items-center sm:flex hidden">
                              <div
                                onMouseEnter={() => onLayMouseEnter(5, index)}
                                onMouseLeave={() => onLayMouseLeave(5, index)}
                                onClick={() => {
                                  if (runners?.availableToLay?.[1]?.price) {
                                    onClickBetData(
                                      props?.id,
                                      key,
                                      "lay",
                                      props?.data?.betLimit?.split(" - ")?.[0],
                                      props?.data?.betLimit?.split(" - ")?.[1],
                                      runners?.availableToLay?.[1]?.price,
                                      selectionId,
                                      props?.data?.exEventId,
                                      props?.data?.exMarketId
                                    );
                                  }
                                }}
                                style={{
                                  background:
                                    layHoveColor &&
                                    activeIndex === `${5}-${index}`
                                      ? layHoveColor
                                      : "rgb(239 225 229)",
                                  borderColor: "#FFFFFF",
                                }}
                                className={`cursor-pointer w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                                  blinkValue?.[4] ? "blink_me" : ""
                                } ${
                                  Object.keys(props?.data?.runnerData)
                                    ?.length ===
                                  index + 1
                                    ? ""
                                    : "border-b"
                                } border-r`}
                              >
                                <div className="text-[#1e1e1e] text-[12px] font-bold text-center">
                                  {runners?.availableToLay?.[1]?.price || "-"}
                                </div>
                                <div className="text-[#1e1e1e] text-[10px] font-bold text-center mt-[-3px]">
                                  {runners?.availableToLay?.[1]?.size || "-"}
                                </div>
                              </div>
                              <div
                                onMouseEnter={() => onLayMouseEnter(6, index)}
                                onMouseLeave={() => onLayMouseLeave(6, index)}
                                onClick={() => {
                                  if (runners?.availableToLay?.[2]?.price) {
                                    onClickBetData(
                                      props?.id,
                                      key,
                                      "lay",
                                      props?.data?.betLimit?.split(" - ")?.[0],
                                      props?.data?.betLimit?.split(" - ")?.[1],
                                      runners?.availableToLay?.[2]?.price,
                                      selectionId,
                                      props?.data?.exEventId,
                                      props?.data?.exMarketId
                                    );
                                  }
                                }}
                                style={{
                                  background:
                                    layHoveColor &&
                                    activeIndex === `${6}-${index}`
                                      ? layHoveColor
                                      : "rgb(239 225 229)",
                                  borderColor: "#FFFFFF",
                                }}
                                className={`cursor-pointer w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                                  blinkValue?.[5] ? "blink_me" : ""
                                } ${
                                  Object.keys(props?.data?.runnerData)
                                    ?.length ===
                                  index + 1
                                    ? ""
                                    : "border-b"
                                }`}
                              >
                                <div className="text-[#1e1e1e] text-[12px] font-bold text-center">
                                  {runners?.availableToLay?.[2]?.price || "-"}
                                </div>
                                <div className="text-[#1e1e1e] text-[10px] font-bold text-center mt-[-3px]">
                                  {runners?.availableToLay?.[2]?.size || "-"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {props?.activeMainId === props?.id &&
                        props?.activeSubId === key ? (
                          <div className="md:hidden block">
                            <BetPlace
                              currentBetValue={props?.currentBetValue}
                              setBetValue={props?.setBetValue}
                              setRateValue={props?.setRateValue}
                              price={props?.price}
                              min={props?.data?.betLimit?.split(" - ")?.[0]}
                              max={props?.data?.betLimit?.split(" - ")?.[1]}
                              onClickCancelBet={props?.onClickCancelBet}
                              type={props?.activeType}
                              onClickPlaceBet={props?.onClickPlaceBet}
                              isLoadingBetPlace={props?.isLoadingBetPlace}
                            />
                          </div>
                        ) : null}
                      </>
                    );
                  })} */}
              </div>
            </div>
          </div>
          <div className="col-span-5 md:col-span-5 xl:col-span-4 hidden md:block">
            <div className="mb-2">
              <div
                style={{
                  background:
                    "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
                }}
                className={`flex items-center justify-between px-4 text-[#FFFFFF]  ${
                  activeStreamingDesktop ? "rounded-t-md" : "rounded-md"
                } `}
              >
                <div className="py-1">Live Streaming</div>
                <img
                  className="cursor-pointer h-[18px]"
                  onClick={onChangeDesktopLiveStreaming}
                  src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/tv.svg"
                  style={{ filter: "invert(1)" }}
                />
                {/* <div className="text-[#FFF]" onClick={onChangeLiveStreaming}>
                  LIVE
                </div> */}
              </div>
              {activeStreamingDesktop && (
                <div>
                  <LiveStreaming />
                </div>
              )}
              <div
                style={{
                  background:
                    "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
                }}
                className={`flex items-center justify-between px-4 text-[#FFFFFF] mt-1  ${
                  activeStreamingDesktop ? "rounded-t-md" : "rounded-md"
                } `}
              >
                <div className="py-1">Live Bets</div>
              </div>

              {/* <BetHistory
                renderBetPlace={rerenderBet}
                exEventId={pageData?.[0]?.exEventId}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalyticsDetail;
