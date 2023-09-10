import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Loader from "../../../component/common/Loader";
import { betLockData, getBetLockData } from "../../../redux/services/BetLock";

const BetLock = () => {
  //   const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [openChildren, setOpenChildren] = useState([]);
  const [openChildrenMarket, setOpenChildrenMarket] = useState([]);

  useEffect(() => {
    getMarkets();
  }, []);

  const getMarkets = async () => {
    setIsLoading(true);
    const data = await getBetLockData();
    if (data?.data) {
      console.log({ data });
      setPageData(data?.data);
    }
    setIsLoading(false);
  };

  const onClickOpenChildren = (index, subIndex) => {
    if (openChildren?.[index]?.includes(subIndex)) {
      const customizeOpenChildren = [...openChildren];
      const filterData = customizeOpenChildren?.[index]?.filter(
        (item) => item !== subIndex
      );
      customizeOpenChildren[index] = filterData;
      setOpenChildren(customizeOpenChildren);
    } else {
      const customizeOpenChildren = [...openChildren];
      customizeOpenChildren[index] = [
        ...(customizeOpenChildren[index] || []),
        subIndex,
      ];
      setOpenChildren(customizeOpenChildren);
    }
  };

  const onClickOpenChildrenMarket = (index, subIndex) => {
    if (openChildrenMarket?.[index]?.includes(subIndex)) {
      const customizeOpenChildren = [...openChildrenMarket];
      const filterData = customizeOpenChildren?.[index]?.filter(
        (item) => item !== subIndex
      );
      customizeOpenChildren[index] = filterData;
      setOpenChildrenMarket(customizeOpenChildren);
    } else {
      const customizeOpenChildren = [...openChildrenMarket];
      customizeOpenChildren[index] = [
        ...(customizeOpenChildren[index] || []),
        subIndex,
      ];
      setOpenChildrenMarket(customizeOpenChildren);
    }
  };

  //   const onClickEvent = (id) => {
  //     navigate(`/market-analytics/${id}`);
  //   };

  const onClickLockBet = async (type, eventId, status) => {
    const payload = {
      type,
      eventId,
      status,
    };
    const data = await betLockData(payload);

    if (data?.data) {
      const lockData = await getBetLockData();
      if (lockData?.data) {
        setPageData(lockData?.data);
      }
    }
  };

  return (
    <div className="px-2">
      <div className="text-[#243a48] text-[16px] font-black mt-4">
        Market Analytics
      </div>
      {isLoading && (
        <div className="flex justify-center items-center h-[200px]">
          <Loader color={"#FEBA11"} size={25} />
        </div>
      )}
      {!isLoading && pageData?.length === 0 && (
        <div className="flex justify-center items-center h-[200px]">
          No Record Found
        </div>
      )}
      {!isLoading &&
        pageData?.map((item, index) => {
          return (
            <div key={index} className="table-responsive mt-4">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th
                      style={{
                        background:
                          "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
                      }}
                      className="uppercase"
                    >
                      <div className="flex items-center text-[14px] text-[#FFFFFF]">
                        <img
                          className="mr-2 h-[20px] w-[20px]"
                          src={item?.iconUrl}
                        />
                        {item?.name}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item?.children?.map((subItem, subIndex) => {
                    return (
                      <tr
                        key={subIndex}
                        onClick={() => {
                          // onClickEvent(subItem?.exEventId);
                        }}
                        className=""
                      >
                        <td className="border-[#00000000]">
                          <div className="flex items-center pb-3 border-b border-[#000000] font-black text-[green]">
                            <img
                              onClick={() => {
                                if (subItem?.children?.length > 0) {
                                  onClickOpenChildren(index, subIndex);
                                }
                              }}
                              style={{
                                transform: openChildren?.[index]?.includes(
                                  subIndex
                                )
                                  ? "rotate(0deg)"
                                  : "rotate(270deg)",
                              }}
                              className={`common-button ${
                                subItem?.children?.length > 0
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                              }`}
                              src={
                                "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/icon-open_odds.png"
                              }
                            />
                            <div className="ml-2"></div>
                            {subItem?.name}
                          </div>

                          {openChildren?.[index]?.includes(subIndex) &&
                            subItem?.children?.map((lastItem, lastIndex) => {
                              return (
                                <>
                                  <div
                                    key={lastIndex}
                                    className="flex items-center justify-between pl-10 py-3 border-b border-[#000000]"
                                  >
                                    <div
                                      className={`flex items-center font-black ${
                                        lastItem?.status === 1
                                          ? "text-[red]"
                                          : "text-[green]"
                                      }`}
                                    >
                                      <img
                                        onClick={() => {
                                          if (
                                            lastItem?.childrenMarket?.length > 0
                                          ) {
                                            onClickOpenChildrenMarket(
                                              subIndex,
                                              lastIndex
                                            );
                                          }
                                        }}
                                        className={
                                          lastItem?.childrenMarket?.length > 0
                                            ? "cursor-pointer"
                                            : ""
                                        }
                                        style={{
                                          transform: openChildrenMarket?.[
                                            subIndex
                                          ]?.includes(lastIndex)
                                            ? "rotate(0deg)"
                                            : "rotate(270deg)",
                                        }}
                                        src={
                                          "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/icon-open_odds.png"
                                        }
                                      />
                                      <div className="ml-2"></div>
                                      {lastItem?.name}
                                    </div>
                                    <button
                                      onClick={() => {
                                        onClickLockBet(
                                          "event",
                                          lastItem?.id,
                                          lastItem?.status === 1
                                            ? "unlock"
                                            : "lock"
                                        );
                                      }}
                                      className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black"
                                    >
                                      {lastItem?.status === 1
                                        ? "Unlock"
                                        : "Lock"}
                                    </button>
                                  </div>
                                  {openChildrenMarket?.[subIndex]?.includes(
                                    lastIndex
                                  ) &&
                                    lastItem?.childrenMarket?.map(
                                      (marketItem, marketIndex) => {
                                        return (
                                          <div
                                            key={lastIndex}
                                            className="flex items-center justify-between pl-20 py-3 border-b border-[#000000]"
                                          >
                                            <div
                                              className={`flex items-center font-black ${
                                                marketItem?.status === 1
                                                  ? "text-[red]"
                                                  : "text-[green]"
                                              }`}
                                            >
                                              {/* <img
                                              style={{
                                                transform: "rotate(270deg)",
                                              }}
                                              src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/icon-open_odds.png"
                                            /> */}
                                              <div className="ml-2"></div>
                                              <span className="font-black mr-2">
                                                -
                                              </span>
                                              {marketItem?.marketName}
                                            </div>
                                            <button
                                              onClick={() => {
                                                onClickLockBet(
                                                  "market",
                                                  marketItem?.exMarketId,
                                                  marketItem?.status === 1
                                                    ? "unlock"
                                                    : "lock"
                                                );
                                              }}
                                              className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black"
                                            >
                                              {marketItem?.status === 1
                                                ? "Unlock"
                                                : "Lock"}
                                            </button>
                                          </div>
                                        );
                                      }
                                    )}
                                </>
                              );
                            })}
                        </td>
                      </tr>
                    );
                  })}

                  {/* {item?.events?.map((subItem, subIndex) => {
              return (
                <tr
                  key={subIndex}
                  onClick={() => {
                    onClickEvent(subItem?.exEventId);
                  }}
                  className="text-[#568BC8] cursor-pointer"
                >
                  <td>{subItem?.eventName}</td>
                </tr>
              );
            })} */}
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
};

export default BetLock;
