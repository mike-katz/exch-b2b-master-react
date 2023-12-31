import React, { useEffect, useState } from "react";
import { FiChevronUp, FiInfo } from "react-icons/fi";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DetailGameCard = (props) => {
  const [blinkData, setBlinkData] = useState([]);
  const [sortRunners, setSortRunners] = useState([]);
  const { themeColor } = useSelector((state) => state?.persist);

  useEffect(() => {
    if (props?.oldData) {
      setBlinkData(props?.oldData);

      setTimeout(() => {
        const customizeBlinkData = [];
        props?.oldData?.map((item) => {
          customizeBlinkData.push([false, false, false, false, false, false]);
        });

        setBlinkData(customizeBlinkData);
      }, 200);
    }
  }, [props?.oldData]);

  useEffect(() => {
    if (props?.data?.runners) {
      const sortedData = props?.data?.runners?.sort(
        (a, b) => a?.state?.sortPriority - b?.state?.sortPriority
      );

      const sortRunnerObject = [];
      sortedData?.map((item) => {
        sortRunnerObject.push(item?.selectionId);
      });

      setSortRunners(sortRunnerObject);
    }
  }, [props?.data?.runners]);

  return (
    <div className="mb-1">
      <Accordion
        style={{ position: "unset" }}
        icon={
          <>
            <div className="flex items-center">
              <div className="mr-4">
                <Link
                  to={`/market-book-history/${props?.data?.exEventId}/${props?.data?.exMarketId}`}
                  style={{
                    background: themeColor?.headerBgColor,
                    color: themeColor?.headerTextColor,
                  }}
                  className="text-[14px] cursor-pointer rounded px-2 h-[25px] font-black flex items-center justify-center"
                >
                  BOOK
                </Link>
              </div>
              <div className="text-[#43444a] text-[10px] font-semibold mr-2 md:hidden">
                Min: {props?.data?.betLimit?.split(" - ")?.[0]} <br /> Max:{" "}
                {props?.data?.betLimit?.split(" - ")?.[1]}
              </div>

              <div className="text-[#43444a] text-[10px] font-semibold mr-2 hidden md:flex">
                Min: {props?.data?.betLimit?.split(" - ")?.[0]} | Max:{" "}
                {props?.data?.betLimit?.split(" - ")?.[1]}
              </div>
              <FiInfo
                fill="#6D081D"
                color="#FFFFFF"
                size={12}
                className="mr-2"
              />
              <FiChevronUp
                className={`text-[#C1095A] ${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5`}
              />
            </div>
          </>
        }
        // key={index}
        open={true}
        className="border border-blue-gray-100 rounded-lg mb-2"
      >
        <AccordionHeader
          style={{
            background: "#e9eff8",
            color: "#FFFFFF",
          }}
          className={`flex w-full justify-between items-center p-0`}
        >
          <div className="flex items-center">
            <div className="bg-[#e9eff8] min-h-[37px] w-full relative">
              <div
                style={{
                  background:
                    "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
                }}
                className="bg-cross min-h-[37px] left-0 z-[9] h-full flex items-center pl-1 pr-8 md:min-w-[200px]"
              >
                <span className="text-[#FFFFFF] text-[15px] ml-1 font-bold">
                  {props?.data?.marketName}
                </span>
              </div>
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody className="text-base font-normal p-0">
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

          {sortRunners.length > 0 &&
            sortRunners?.map((key, index) => {
              const runners = props?.data?.runners?.find(
                (item) => item?.selectionId == key
              )?.exchange;

              const status = props?.data?.runners?.find(
                (item) => item?.selectionId == key
              )?.state?.status;

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
                          <span
                            className={`text-[10px] mr-2 ${
                              Number(props?.oldPrice?.[key]) > 0
                                ? "text-[green]"
                                : "text-[red]"
                            }`}
                          >
                            {props?.oldPrice?.[key]
                              ? Number(props?.oldPrice?.[key])?.toFixed(2)
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="min-h-[37px] w-full flex items-center col-span-6 relative">
                      {status === "ACTIVE" || status === "OPEN" ? (
                        props?.data?.state?.status === "ACTIVE" ||
                        props?.data?.state?.status === "OPEN" ? null : (
                          <div className="absolute capitalize text-[13px] text-[red] flex justify-center items-center bg-[#fff] border border-[#ff57222b] opacity-80 h-full w-full font-extrabold">
                            {props?.data?.state?.status}
                          </div>
                        )
                      ) : (
                        <div className="absolute capitalize text-[13px] text-[red] flex justify-center items-center bg-[#fff] border border-[#ff57222b] opacity-80 h-full w-full font-extrabold">
                          {status}
                        </div>
                      )}

                      {runners?.availableToBack?.[0]?.price ||
                      runners?.availableToBack?.[0]?.Price ||
                      runners?.availableToBack?.[1]?.price ||
                      runners?.availableToBack?.[1]?.Price ||
                      runners?.availableToBack?.[2]?.price ||
                      runners?.availableToBack?.[2]?.Price ||
                      runners?.availableToLay?.[0]?.price ||
                      runners?.availableToLay?.[0]?.Price ||
                      runners?.availableToLay?.[1]?.price ||
                      runners?.availableToLay?.[1]?.Price ||
                      runners?.availableToLay?.[2]?.price ||
                      runners?.availableToLay?.[2]?.Price ? null : (
                        <div className="absolute capitalize text-[13px] text-[red] flex justify-center items-center bg-[#fff] border border-[#ff57222b] opacity-80 h-full w-full font-extrabold">
                          SUSPENDED
                        </div>
                      )}

                      <div className="w-full flex items-center sm:flex hidden">
                        <div
                          className={`bg-[#c7eeff] w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                            blinkValue?.[0] ? "blink_me" : ""
                          } ${
                            Object.keys(props?.data?.runnerData)?.length ===
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
                          className={`bg-[#c7eeff] w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                            blinkValue?.[1] ? "blink_me" : ""
                          } ${
                            Object.keys(props?.data?.runnerData)?.length ===
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
                          className={`bg-[#94dfff] w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                            blinkValue?.[2] ? "blink_me" : ""
                          } ${
                            Object.keys(props?.data?.runnerData)?.length ===
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
                          className={`bg-[#f9c8d3] w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                            blinkValue?.[3] ? "blink_me" : ""
                          } ${
                            Object.keys(props?.data?.runnerData)?.length ===
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
                          className={`bg-[#efe1e5] w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                            blinkValue?.[4] ? "blink_me" : ""
                          } ${
                            Object.keys(props?.data?.runnerData)?.length ===
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
                          className={`bg-[#efe1e5] w-[50%] flex flex-col justify-center items-center min-h-[50px] ${
                            blinkValue?.[5] ? "blink_me" : ""
                          } ${
                            Object.keys(props?.data?.runnerData)?.length ===
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
                </>
              );
              // tifOptions.push(<option value={key}>{tifs[key]}</option>);
            })}
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default DetailGameCard;
