import { collection, onSnapshot, query, where } from "@firebase/firestore";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { fireStoreCricket } from "../../../../firebaseSetup/firebaseCricket";
import { fireStoreSoccer } from "../../../../firebaseSetup/firebaseSoccer";
import { fireStoreTennis } from "../../../../firebaseSetup/firebaseTennis";
import { fireStoreOthers } from "../../../../firebaseSetup/firebaseOthers";
import BetHistory from "../../../component/common/BetHistory";
import DetailGameCard from "../../../component/common/DetailGameCard";
import FancyGameCard from "../../../component/common/FancyGameCard";
import LineGameCard from "../../../component/common/LineGameCard";
import LiveStreaming from "../../../component/common/LiveStriming";
import Loader from "../../../component/common/Loader";
import {
  getBetHistoryLPData,
  getMarketDetailData,
  getMarketSpreadexIdData,
} from "../../../redux/services/MarketAnalytics";
import BetHistoryModal from "../../../component/common/BetHistoryModal";

const MarketAnalyticsDetail = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [activeStreamingDesktop, setActiveStreamingDesktop] = useState(false);
  const [activeStreamingMobile, setActiveStreamingMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [pageRunnersData, setPageRunnersData] = useState([]);
  const [pageCustomizeData, setPageCustomizeData] = useState([]);
  const [pageRunnersFancyData, setPageRunnersFancyData] = useState([]);
  const [pageCustomizeFancyData, setPageCustomizeFancyData] = useState([]);
  const [pageRunnersLineData, setPageRunnersLineData] = useState([]);
  const [pageCustomizeLineData, setPageCustomizeLineData] = useState([]);
  const [pagePlData, setPagePlData] = useState([]);
  const [fancyPageData, setFancyPageData] = useState([]);
  const [linePageData, setLinePageData] = useState([]);
  const [fancyPlData, setFancyPlData] = useState([]);
  const [fancyPlArray, setFancyPlArray] = useState([]);
  const [linePlData, setLinePlData] = useState([]);
  const [linePlArray, setLinePlArray] = useState([]);

  const [isVisibleScore, setIsVisibleScore] = useState(false);
  const [isVisibleSportScore, setIsVisibleSportScore] = useState(false);
  const [spredexId, setSpredexId] = useState("");

  const [visibleBestHistoryModal, setVisibleBestHistoryModal] = useState(false);

  const liveValue = useRef([]);
  const liveFancyValue = useRef([]);
  const liveLineValue = useRef([]);

  const liveFancyOdds = useRef();
  const liveLineOdds = useRef();

  const unsubscribeFromMessagesRef = useRef();
  const unsubscribeScoreBoardRef = useRef();

  const firstTimeRender = useRef(true);

  useEffect(() => {
    liveValue.current = pageRunnersData;
  }, [pageRunnersData]);

  useEffect(() => {
    liveFancyValue.current = pageRunnersFancyData;
  }, [pageRunnersFancyData]);

  useEffect(() => {
    liveLineValue.current = pageRunnersLineData;
  }, [pageRunnersLineData]);

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
    setPageData([]);
    getEventMarkets(eventId);

    return () => {
      unsubscribeFromMessagesRef.current &&
        unsubscribeFromMessagesRef.current();
    };
  }, [eventId, unsubscribeFromMessagesRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      getBetPl(eventId);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getFirebaseData = async (eventId, sportsId) => {
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
      const q = query(
        citiesRef,
        where("exEventId", "==", eventId),
        where("state.status", "!=", "CLOSED")
      );
      unsubscribeFromMessagesRef.current = onSnapshot(q, (docsSnap) => {
        const data = [];
        const fancyMarket = [];
        const lineMarket = [];
        const runnerData = [];
        const customizeData = [];

        const runnerFancyData = [];
        const customizeFancyData = [];
        const runnerLineData = [];
        const customizeLineData = [];

        const fancyMarketOdds = [];
        const lineMarketOdds = [];

        docsSnap.forEach((doc) => {
          if (doc.data()?.state?.status !== "SUPERCLOSED") {
            if (doc?.data()?.type === "fancy") {
              fancyMarket.push(doc.data());

              fancyMarketOdds.push({
                exMarketId: doc.data().exMarketId,
                odds:
                  doc.data()?.runners?.[0]?.exchange?.availableToLay?.[0]
                    ?.Price ||
                  doc.data()?.runners?.[0]?.exchange?.availableToLay?.[0]
                    ?.price,
              });
            } else if (doc?.data()?.type === "line_market") {
              lineMarket.push(doc.data());
              lineMarketOdds.push({
                exMarketId: doc?.data().exMarketId,
                odds:
                  doc?.data()?.runners?.[0]?.exchange?.availableToLay?.[0]
                    ?.Price ||
                  doc?.data()?.runners?.[0]?.exchange?.availableToLay?.[0]
                    ?.price,
              });
            } else {
              data?.push(doc.data());
            }
          }
        });

        const sortedData = fancyMarket.sort(
          (a, b) =>
            Number(a?.sequence || 100000) - Number(b?.sequence || 100000)
        );

        setFancyPageData(sortedData);
        setLinePageData(lineMarket);
        // setPageRunnersData(runnerData);
        // setPageCustomizeData(customizeData);

        sortedData?.map((item, mainIndex) => {
          const runnersList = [];
          const newData = [];
          // const sortedData = data.sort((a, b) => a?.sequence - b?.sequence);

          const sortedData = item?.runners?.sort(
            (a, b) => a?.state?.sortPriority - b?.state?.sortPriority
          );

          const sortRunnerObject = [];
          sortedData?.map((item) => {
            sortRunnerObject.push(item?.selectionId);
          });

          sortRunnerObject?.map((key, index) => {
            const runners = item?.runners?.find(
              (item) => item?.selectionId == key
            )?.exchange;
            runnersList.push([
              {
                size: runners?.availableToLay?.[0]?.size || "-",
                price: runners?.availableToLay?.[0]?.price || "-",
              },
              {
                size: runners?.availableToBack?.[0]?.size || "-",
                price: runners?.availableToBack?.[0]?.price || "-",
              },
            ]);

            const oldData = liveFancyValue?.current?.[mainIndex]?.[index];

            if (oldData) {
              newData?.push([
                oldData?.[0]?.size !==
                  (runners?.availableToLay?.[0]?.size || "-") ||
                oldData?.[0]?.price !==
                  (runners?.availableToLay?.[0]?.price || "-")
                  ? true
                  : false,
                oldData?.[1]?.size !==
                  (runners?.availableToBack?.[0]?.size || "-") ||
                oldData?.[1]?.price !==
                  (runners?.availableToBack?.[0]?.price || "-")
                  ? true
                  : false,
              ]);
            }
          });

          customizeFancyData.push(newData);
          runnerFancyData.push(runnersList);
        });

        lineMarket?.map((item, mainIndex) => {
          const runnersList = [];
          const newData = [];
          const sortedData = item?.runners?.sort(
            (a, b) => a?.state?.sortPriority - b?.state?.sortPriority
          );

          const sortRunnerObject = [];
          sortedData?.map((item) => {
            sortRunnerObject.push(item?.selectionId);
          });

          sortRunnerObject?.map((key, index) => {
            const runners = item?.runners?.find(
              (item) => item?.selectionId == key
            )?.exchange;

            runnersList.push([
              {
                size: runners?.availableToLay?.[0]?.size || "-",
                price: runners?.availableToLay?.[0]?.price || "-",
              },
              {
                size: runners?.availableToBack?.[0]?.size || "-",
                price: runners?.availableToBack?.[0]?.price || "-",
              },
            ]);

            const oldData = liveLineValue?.current?.[mainIndex]?.[index];

            if (oldData) {
              newData?.push([
                oldData?.[0]?.size !==
                  (runners?.availableToLay?.[0]?.size || "-") ||
                oldData?.[0]?.price !==
                  (runners?.availableToLay?.[0]?.price || "-")
                  ? true
                  : false,
                oldData?.[1]?.size !==
                  (runners?.availableToBack?.[0]?.size || "-") ||
                oldData?.[1]?.price !==
                  (runners?.availableToBack?.[0]?.price || "-")
                  ? true
                  : false,
              ]);
            }
          });

          customizeLineData.push(newData);
          runnerLineData.push(runnersList);
        });

        const desiredStatuses = ["match_odds", "bookmaker", "sportbook"];

        const sortMarket = data.sort((a, b) => {
          const statusA = desiredStatuses.indexOf(a.type);
          const statusB = desiredStatuses.indexOf(b.type);
          return statusA - statusB;
        });

        sortMarket?.map((item, mainIndex) => {
          const runnersList = [];
          const newData = [];
          const sortedData = item?.runners?.sort(
            (a, b) => a?.state?.sortPriority - b?.state?.sortPriority
          );

          const sortRunnerObject = [];
          sortedData?.map((item) => {
            sortRunnerObject.push(item?.selectionId);
          });

          sortRunnerObject?.map((key, index) => {
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

        liveFancyOdds.current = fancyMarketOdds;

        liveLineOdds.current = lineMarketOdds;

        if (firstTimeRender?.current) {
          firstTimeRender.current = false;
          getBetPl(eventId);
        }

        setPageData(sortMarket);
        setPageRunnersData(runnerData);
        setPageCustomizeData(customizeData);

        setPageRunnersFancyData(runnerFancyData);
        setPageCustomizeFancyData(customizeFancyData);

        setPageRunnersLineData(runnerLineData);
        setPageCustomizeLineData(customizeLineData);
        setIsLoading(false);
      });
    } catch (err) {
      console.warn(err);
      setIsLoading(false);
    }
  };

  // const getMarketSpreadexId = async () => {
  //   setIsLoading(true);
  //   const data = await getMarketSpreadexIdData(eventId);
  //   if (data?.spreadexId) {
  //     setSpredexId(data?.spreadexId);
  //   } else {
  //     setSpredexId("");
  //   }
  //   setIsLoading(false);
  // };ʼ

  const getBetPl = async (exEventId) => {
    const payload = {
      exEventId,
    };

    const data = await getBetHistoryLPData(payload);

    if (data?.data) {
      const cusData = [];
      const cusFancyData = [];
      const cusLineData = [];
      const cusSelectionIdArray = [];
      const cusLineSelectionIdArray = [];

      const sortedAllData = data?.data?.sort(
        (a, b) => a?.sequence - b?.sequence
      );

      sortedAllData?.map((item) => {
        const selectionId = {};
        const fancySelectionId = {};
        const lineSelectionId = {};
        const selectionIdArray = [];

        item?.selectionId?.map((si, index) => {
          if (item?.type === "fancy") {
            const fancyOdds = liveFancyOdds.current?.find(
              (odds) => odds?.exMarketId === item?.exMarketId
            );

            if (index >= fancyOdds?.odds - 5 && index <= fancyOdds?.odds + 5) {
              selectionIdArray.push({ odds: index, si });
            }
            Object.assign(fancySelectionId, {
              [item?.exMarketId]: item?.selectionId.reduce((a, b) =>
                Math.min(a, b)
              ),
            });
          } else if (item?.type === "line_market") {
            const lineOdds = liveLineOdds.current?.find(
              (odds) => odds?.exMarketId === item?.exMarketId
            );

            if (index >= lineOdds?.odds - 5 && index <= lineOdds?.odds + 5) {
              selectionIdArray.push({ odds: index, si });
            }
            Object.assign(lineSelectionId, {
              [item?.exMarketId]: item?.selectionId.reduce((a, b) =>
                Math.min(a, b)
              ),
            });
          } else {
            Object.assign(selectionId, si);
          }
        });

        cusData?.push({
          exMarketId: item?.exMarketId,
          runnerData: selectionId,
        });

        if (Object.keys(fancySelectionId)?.length > 0) {
          cusFancyData?.push({
            exMarketId: item?.exMarketId,
            runnerData: fancySelectionId,
          });
          cusSelectionIdArray.push({
            exMarketId: item?.exMarketId,
            runnerData: selectionIdArray,
          });
        }

        if (Object.keys(lineSelectionId)?.length > 0) {
          cusLineData?.push({
            exMarketId: item?.exMarketId,
            runnerData: lineSelectionId,
          });
          cusLineSelectionIdArray.push({
            exMarketId: item?.exMarketId,
            runnerData: selectionIdArray,
          });
        }
      });

      setPagePlData(cusData);
      setFancyPlData(cusFancyData);
      setFancyPlArray(cusSelectionIdArray);

      setLinePlData(cusLineData);
      setLinePlArray(cusLineSelectionIdArray);
    }
  };

  const getEventMarkets = async (eventId, isLoggedIn) => {
    setIsLoading(true);
    let data = await getMarketDetailData(eventId);
    data = data?.data;

    if (data) {
      if (data?.[0]?.sportsId === "4") {
        getFirebaseSportScoreData(data?.[0]?.eventId);
      } else {
        getFirebaseScoreData(spredexId);
      }

      if (data?.length === 0) {
        navigate("/market-analytics");
        return false;
      }
      const fancyMarket = [];
      const lineMarket = [];
      const fancyMarketOdds = [];
      const lineMarketOdds = [];
      const market = [];

      const sortedAllData = data?.sort(
        (a, b) => Number(a?.sequence || 100000) - Number(b?.sequence || 100000)
      );

      sortedAllData?.map((item) => {
        if (item?.type === "fancy") {
          fancyMarket.push(item);
          fancyMarketOdds.push({
            exMarketId: item.exMarketId,
            odds:
              item?.runners?.[0]?.exchange?.availableToLay?.[0]?.price ||
              item?.runners?.[0]?.exchange?.availableToLay?.[0]?.Price,
          });
        } else if (item?.type === "line_market") {
          lineMarket.push(item);
          lineMarketOdds.push({
            exMarketId: item.exMarketId,
            odds:
              item?.runners?.[0]?.exchange?.availableToLay?.[0]?.price ||
              item?.runners?.[0]?.exchange?.availableToLay?.[0]?.Price,
          });
        } else {
          market.push(item);
        }
      });

      liveFancyOdds.current = fancyMarketOdds;
      liveLineOdds.current = lineMarketOdds;

      if (isLoggedIn && firstTimeRender?.current) {
        firstTimeRender.current = false;
        getBetPl(eventId);
      }

      const desiredStatuses = ["match_odds", "bookmaker", "sportbook"];

      const sortMarket = market.sort((a, b) => {
        const statusA = desiredStatuses.indexOf(a.type);
        const statusB = desiredStatuses.indexOf(b.type);
        return statusA - statusB;
      });

      unsubscribeFromMessagesRef.current &&
        unsubscribeFromMessagesRef.current();
      getFirebaseData(eventId, sortMarket?.[0]?.sportsId);
      if (data?.[0]?.sportsId !== "4") {
        getMarketSpreadexId();
      }

      setPageData(sortMarket);

      const sortedData = fancyMarket.sort(
        (a, b) =>
          a?.runners?.[0]?.state?.sortPriority -
          b?.runners?.[0]?.state?.sortPriority
      );

      setFancyPageData(sortedData);
      setLinePageData(lineMarket);
    }
    setIsLoading(false);
  };

  const onCloseBetsHistoryModal = () => {
    setVisibleBestHistoryModal(false);
  };

  const onOpenBetsHistoryModal = () => {
    setVisibleBestHistoryModal(true);
  };

  const getFirebaseScoreData = async (spredexId) => {
    try {
      setIsLoading(true);
      const citiesRef = collection(fireStoreOthers, "scoreBoard");
      const q = query(citiesRef, where("leagueSpEventId", "==", spredexId));
      unsubscribeScoreBoardRef.current = onSnapshot(q, (docsSnap) => {
        const data = [];
        docsSnap.forEach((doc) => {
          data?.push(doc.data());
        });

        setIsVisibleScore(data?.length > 0 ? true : false);
        setIsLoading(false);
      });
    } catch (err) {
      console.warn(err);
      setIsLoading(false);
    }
  };

  const getFirebaseSportScoreData = async (spredexId) => {
    try {
      setIsLoading(true);
      const citiesRef = collection(fireStoreOthers, "scoreBoard");
      const q = query(citiesRef, where("eventId", "==", spredexId));
      unsubscribeScoreBoardRef.current = onSnapshot(q, (docsSnap) => {
        const data = [];
        docsSnap.forEach((doc) => {
          data?.push(doc.data());
        });

        setIsVisibleSportScore(data?.[0]?.html ? true : false);
        setIsLoading(false);
      });
    } catch (err) {
      console.warn(err);
      setIsLoading(false);
    }
  };

  const getMarketSpreadexId = async () => {
    setIsLoading(true);

    const payload = {
      eventId,
    };

    const data = await getMarketSpreadexIdData(payload);
    if (data?.spreadexId) {
      setSpredexId(data?.spreadexId);
    } else {
      setSpredexId("");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (spredexId) {
      unsubscribeScoreBoardRef.current && unsubscribeScoreBoardRef.current();
      getFirebaseScoreData(spredexId);
    }
  }, [spredexId]);

  return (
    <div className="px-2">
      <div className="block xl:hidden">
        <BetHistoryModal
          isVisible={visibleBestHistoryModal}
          onCloseMenu={onCloseBetsHistoryModal}
        />
      </div>
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
            {isLoading && (
              <div className="flex justify-center items-center my-4">
                <Loader color="#C10930" size={25} />
              </div>
            )}

            {!isLoading &&
              (pageData?.length > 0 ||
                linePageData?.length > 0 ||
                fancyPageData?.length > 0) && (
                <>
                  <div
                    className={`flex justify-between items-start md:items-center md:flex-row flex-col px-4 py-1 border-b border-[#FFFFFF] text-[#FFFFFF]`}
                    style={{
                      background:
                        "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
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
                          onClick={onOpenBetsHistoryModal}
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
                  </div>
                  <div className="md:hidden mb-2">
                    {activeStreamingMobile && (
                      <LiveStreaming eventId={pageData?.[0]?.eventId} />
                    )}
                  </div>
                  {!isLoading &&
                  pageData?.length > 0 &&
                  pageData?.[0]?.sportsId === "4" &&
                  isVisibleSportScore ? (
                    <iframe
                      className={`w-full ${
                        pageData?.[0]?.sportsId === "4" ? "max-h-[110px]" : ""
                      }`}
                      src={`https://iframe.cbtfturbo247.com/cricket-score-new/${pageData?.[0]?.eventId}`}
                    />
                  ) : !isLoading && pageData?.length > 0 && isVisibleScore ? (
                    <div className="aspect-auto">
                      <iframe
                        className={`w-full ${
                          pageData?.[0]?.sportsId === "4" ? "h-[110px]" : ""
                        }`}
                        src={`https://iframe.cbtfturbo247.com/${
                          pageData?.[0]?.sportsId === "4"
                            ? "cricket-score-new"
                            : pageData?.[0]?.sportsId === "1"
                            ? "soccer-score"
                            : pageData?.[0]?.sportsId === "2"
                            ? "tennis-score"
                            : ""
                        }/${spredexId}`}
                      />
                    </div>
                  ) : (
                    ""
                  )}
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

                    {linePageData?.length > 0 && (
                      <LineGameCard
                        linePlArray={linePlArray}
                        oldPrice={linePlData}
                        oldData={pageCustomizeLineData}
                        data={linePageData}
                      />
                    )}

                    {fancyPageData?.length > 0 && (
                      <FancyGameCard
                        fancyPlArray={fancyPlArray}
                        oldPrice={fancyPlData}
                        oldData={pageCustomizeFancyData}
                        data={fancyPageData}
                      />
                    )}
                  </div>
                </>
              )}
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

              <div className="xl:block hidden">
                <BetHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalyticsDetail;
