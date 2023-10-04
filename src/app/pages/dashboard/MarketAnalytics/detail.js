import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import LiveStreaming from "../../../component/common/LiveStriming";
import {
  getBetHistoryLPData,
  getMarketDetailData,
} from "../../../redux/services/MarketAnalytics";
import moment from "moment";
import DetailGameCard from "../../../component/common/DetailGameCard";
import BetHistory from "../../../component/common/BetHistory";
import { fireStoreCricket } from "../../../../firebaseSetup/firebaseCricket";
import { fireStoreSoccer } from "../../../../firebaseSetup/firebaseSoccer";
import { fireStoreTennis } from "../../../../firebaseSetup/firebaseTennis";

const MarketAnalyticsDetail = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [activeStreamingDesktop, setActiveStreamingDesktop] = useState(false);
  const [activeStreamingMobile, setActiveStreamingMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageRunnersData, setPageRunnersData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [pageCustomizeData, setPageCustomizeData] = useState([]);
  const [pagePlData, setPagePlData] = useState([]);

  const liveValue = useRef([]);

  useEffect(() => {
    liveValue.current = pageRunnersData;
  }, [pageRunnersData]);

  const onClickBack = () => {
    navigate(`/market-analytics`);
  };

  const onChangeDesktopLiveStreaming = () => {
    setActiveStreamingDesktop(!activeStreamingDesktop);
  };

  const onChangeMobileLiveStreaming = () => {
    setActiveStreamingMobile(!activeStreamingMobile);
  };

  useEffect(() => {
    getEventMarkets();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getBetPl(eventId);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getFirebaseData = async (sportsId) => {
    let currentFireStore;

    if (sportsId === "4") {
      currentFireStore = fireStoreCricket;
    } else if (sportsId === "1") {
      currentFireStore = fireStoreSoccer;
    } else if (sportsId === "2") {
      currentFireStore = fireStoreTennis;
    }

    try {
      setIsLoading(true);
      const citiesRef = collection(currentFireStore, "marketRates");
      const q = query(citiesRef, where("exEventId", "==", eventId));
      onSnapshot(q, (docsSnap) => {
        const data = [];
        const runnerData = [];
        const customizeData = [];
        docsSnap.forEach((doc) => {
          if (doc.data()?.state?.status !== "CLOSED") {
            data?.push(doc.data());
          }
        });

        data?.map((item, mainIndex) => {
          const runnersList = [];
          const newData = [];

          Object.keys(item?.runnerData).map((key, index) => {
            const runners = item?.runners?.find(
              (item) => item?.selectionId == key
            )?.exchange;

            runnersList.push([
              {
                size: runners?.availableToBack?.[2]?.size || "-",
                price: runners?.availableToBack?.[2]?.price || "-",
              },
              {
                size: runners?.availableToBack?.[1]?.size || "-",
                price: runners?.availableToBack?.[1]?.price || "-",
              },
              {
                size: runners?.availableToBack?.[0]?.size || "-",
                price: runners?.availableToBack?.[0]?.price || "-",
              },
              {
                size: runners?.availableToLay?.[0]?.size || "-",
                price: runners?.availableToLay?.[0]?.price || "-",
              },
              {
                size: runners?.availableToLay?.[1]?.size || "-",
                price: runners?.availableToLay?.[1]?.price || "-",
              },
              {
                size: runners?.availableToLay?.[2]?.size || "-",
                price: runners?.availableToLay?.[2]?.price || "-",
              },
            ]);

            const oldData = liveValue?.current?.[mainIndex]?.[index];

            if (oldData) {
              newData?.push([
                oldData?.[0]?.size !==
                  (runners?.availableToBack?.[2]?.size || "-") ||
                oldData?.[0]?.price !==
                  (runners?.availableToBack?.[2]?.price || "-")
                  ? true
                  : false,
                oldData?.[1]?.size !==
                  (runners?.availableToBack?.[1]?.size || "-") ||
                oldData?.[1]?.price !==
                  (runners?.availableToBack?.[1]?.price || "-")
                  ? true
                  : false,
                oldData?.[2]?.size !==
                  (runners?.availableToBack?.[0]?.size || "-") ||
                oldData?.[2]?.price !==
                  (runners?.availableToBack?.[0]?.price || "-")
                  ? true
                  : false,
                oldData?.[3]?.size !==
                  (runners?.availableToLay?.[0]?.size || "-") ||
                oldData?.[3]?.price !==
                  (runners?.availableToLay?.[0]?.price || "-")
                  ? true
                  : false,
                oldData?.[4]?.size !==
                  (runners?.availableToLay?.[1]?.size || "-") ||
                oldData?.[4]?.price !==
                  (runners?.availableToLay?.[1]?.price || "-")
                  ? true
                  : false,
                oldData?.[5]?.size !==
                  (runners?.availableToLay?.[2]?.size || "-") ||
                oldData?.[5]?.price !==
                  (runners?.availableToLay?.[2]?.price || "-")
                  ? true
                  : false,
              ]);
            }
          });

          customizeData.push(newData);
          runnerData.push(runnersList);
        });

        setPageData(data);
        setPageRunnersData(runnerData);
        setPageCustomizeData(customizeData);
        setIsLoading(false);
      });
    } catch (err) {
      setIsLoading(false);
    }
  };

  const getBetPl = async (exEventId) => {
    const payload = {
      exEventId,
    };

    const data = await getBetHistoryLPData(payload);

    if (data?.data) {
      const cusData = [];
      data?.data?.map((item) => {
        const selectionId = {};
        item?.selectionId?.map((si) => {
          Object.assign(selectionId, si);
        });

        cusData?.push({
          exMarketId: item?.exMarketId,
          runnerData: selectionId,
        });
      });

      setPagePlData(cusData);
    }
  };

  const getEventMarkets = async () => {
    setIsLoading(true);
    const data = await getMarketDetailData(eventId);

    if (data?.data) {
      if (pageData?.length === 0) {
        setPageData(data?.data);
      }
      // console.log(data?.data?.[0]?.sportsId);

      getFirebaseData(data?.data?.[0]?.sportsId);
    }
    setIsLoading(false);
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
                {pageData?.[0]?.eventName}
              </div>
              <div
                // style={{ color: themeColor?.commonTextColor }}
                className="text-[12px] font-bold flex justify-between w-full md:w-auto mt-1 md:mt-0 items-center"
              >
                <div className="flex items-center">
                  <div
                    // onClick={onClickBetsHistoryModal}
                    className="bg-[#ECAD17] uppercase mr-2 rounded p-[3px] md:hidden"
                  >
                    Bets
                  </div>
                  <img
                    className="cursor-pointer ml-1 h-[18px] md:hidden"
                    onClick={onChangeMobileLiveStreaming}
                    src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/tv.svg"
                    style={{ filter: "invert(1)" }}
                  />
                </div>
                <div className="flex items-center">
                  (
                  {moment
                    .utc(pageData?.[0]?.marketTime)
                    .utcOffset(moment().utcOffset())
                    .format("DD/MM/YYYY LTS")}
                  )
                </div>
              </div>
              {/* <div className="text-[12px] font-bold flex justify-between w-full md:w-auto mt-1 md:mt-0 items-center">
                (
                {moment
                  .utc(pageData?.[0]?.marketTime)
                  .utcOffset(moment().utcOffset())
                  .format("DD/MM/YYYY LTS")}
                )
                <img
                  className="cursor-pointer ml-1 h-[18px] hidden"
                  onClick={onChangeMobileLiveStreaming}
                  src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/tv.svg"
                  style={{ filter: "invert(1)" }}
                />
              </div> */}
            </div>
            <div className="md:hidden mb-2">
              {activeStreamingMobile && (
                <LiveStreaming eventId={pageData?.[0]?.eventId} />
              )}
            </div>
            <div>
              {!isLoading &&
                pageData?.map((item, index) => {
                  const runnerData = pagePlData?.find(
                    (pl) => pl?.exMarketId === item?.exMarketId
                  );
                  return (
                    <DetailGameCard
                      oldPrice={runnerData?.runnerData}
                      // oldPrice={[122, -100]}
                      oldData={pageCustomizeData?.[index]}
                      data={item}
                      key={index}
                    />
                  );
                })}
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
                  <LiveStreaming eventId={pageData?.[0]?.eventId} />
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

              <BetHistory
                // renderBetPlace={rerenderBet}
                exEventId={pageData?.[0]?.exEventId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalyticsDetail;
