import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import {
  getAuraBetListPlData,
  getAuraEventPlData,
  getAuraMarketPlData,
  getAuraSportPlData,
  getAviatorPlData,
  getAviatorSportData,
  getBetListData,
  getCategoryTotalPLData,
  getEventPlData,
  getMarketPlData,
  getSportPlData,
  getSt8CategoriesData,
  getSt8GameListData,
} from "../../../redux/services/pl";
import Loader from "../../../component/common/Loader";
import { IconButton, Typography } from "@material-tailwind/react";

const BettingProfitLost = () => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions(); // eslint-disable-line
  const [pageData, setPageData] = useState([]);
  const [aviatorData, setAviatorData] = useState();
  const [st8Data, setSt8Data] = useState([]);
  const [auraData, setAuraData] = useState([]);

  const [currentType, setCurrentType] = useState("Sports");
  const [navigationData, setNavigationData] = useState([]);

  const [fromDate, setFromDate] = useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const [isLoading, setIsLoading] = useState(false);

  const next = () => {
    if (currentPage === totalPage) return;
    // const payload = {
    //   limit: perPage,
    //   page: currentPage + 1,
    //   from: fromDate,
    //   to: toDate
    // };

    const lastRecord = navigationData?.[navigationData?.length - 1];
    setCurrentPage(currentPage + 1);

    onClickPl(
      lastRecord?.id,
      lastRecord?.sportId,
      lastRecord?.name,
      lastRecord?.type,
      navigationData,
      currentPage + 1
    );
    // getAllPl(payload);
  };

  const prev = () => {
    if (currentPage === 1) return;
    // const payload = {
    //   limit: perPage,
    //   page: currentPage - 1,
    //   from: fromDate,
    //   to: toDate
    // };
    // getAllPl(payload);
    // setCurrentPage(currentPage - 1);
    const lastRecord = navigationData?.[navigationData?.length - 1];
    setCurrentPage(currentPage - 1);

    onClickPl(
      lastRecord?.id,
      lastRecord?.sportId,
      lastRecord?.name,
      lastRecord?.type,
      navigationData,
      currentPage - 1,
      true
    );
  };

  useEffect(() => {
    getAllPl();
  }, []);

  const getAllPl = async (getPayload) => {
    let payload = {};
    if (getPayload) {
      payload = getPayload;
    } else {
      payload = {
        // limit: perPage,
        // page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        username: "am",
      };
    }

    setIsLoading(true);

    // const data = await getSportPlData(payload);
    // const plData = await getAviatorSportData(payload);
    // const st8Data = await getCategoryTotalPLData(payload);
    // const auraData = await getAuraSportPlData(payload);

    const [data, plData, st8Data, auraData] = await Promise.all([
      getSportPlData(payload),
      getAviatorSportData(payload),
      getCategoryTotalPLData(payload),
      getAuraSportPlData(payload),
    ]);

    if (auraData) {
      setAuraData(auraData?.data?.[0]);
    }

    if (st8Data) {
      setSt8Data(st8Data?.data);
    }

    if (plData) {
      setAviatorData(plData?.data);
    }

    if (data) {
      setCurrentType("Sports");
      setNavigationData([]);
      // setTotalPage(data?.data?.totalPages);
      // setPerPage(data?.data?.limit);
      // setCurrentPage(Number(data?.data?.page));
      // setPaginationPage(data?.data?.data?.totalPages);
      setPageData(data?.data);
    }

    setIsLoading(false);
  };

  const onChangeFromDate = (e) => {
    setFromDate(e?.target?.value);
  };

  const onChangeToDate = (e) => {
    setToDate(e?.target?.value);
  };

  const onClickSubmit = () => {
    setCurrentPage(1);
    const payload = {
      // page: 1,
      // limit: perPage,
      from: fromDate,
      to: toDate,
      timeZone: timeZone,
      username: "am",
    };

    getAllPl(payload);
  };

  const onClickPl = async (
    id,
    sportId,
    name,
    type = false,
    navigation = [],
    currentPage = 1
  ) => {
    let customizeNavigation = [];
    let customType = "";
    if (type) {
      customType = type;
    } else {
      customType = currentType;
    }

    if (navigation?.length > 0) {
      customizeNavigation = [...navigation];
    } else {
      customizeNavigation = [...navigationData];
    }

    if (customType === "St8Category") {
      const payload = {
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        category: id,
        timeZone: timeZone,
        username: "am",
      };

      setIsLoading(true);

      const data = await getSt8GameListData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            type: "St8Category",
            payload,
            name,
            id,
            sportId,
          });
        }
        setNavigationData(customizeNavigation);

        setTotalPage(data?.data?.totalPages);
        setPerPage(data?.data?.limit);
        setCurrentPage(Number(data?.data?.page));
        setPageData(data?.data?.results);
        setCurrentType("St8Category");
      }
      setIsLoading(false);
    } else if (customType === "St8") {
      const payload = {
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        username: "am",
      };

      setIsLoading(true);

      const data = await getSt8CategoriesData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({ type: "St8", payload, name, id, sportId });
        }
        setNavigationData(customizeNavigation);

        setTotalPage(data?.data?.totalPages);
        setPerPage(data?.data?.limit);
        setCurrentPage(Number(data?.data?.page));
        setPageData(data?.data?.results);
        setCurrentType("St8");
      }
      setIsLoading(false);
    } else if (customType === "Aviator") {
      const payload = {
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        username: "am",
      };

      setIsLoading(true);

      const data = await getAviatorPlData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            type: "Aviator",
            payload,
            name,
            id,
            sportId,
          });
        }
        setNavigationData(customizeNavigation);

        setTotalPage(data?.data?.totalPages);
        setPerPage(data?.data?.limit);
        setCurrentPage(Number(data?.data?.page));
        setPageData(data?.data?.results);
        setCurrentType("Aviator");
      }
      setIsLoading(false);
    } else if (customType === "Sports") {
      const payload = {
        sportId: id,
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        username: "am",
      };

      setIsLoading(true);

      const data = await getEventPlData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            type: "Sports",
            payload,
            name,
            id,
            sportId,
          });
        }
        setNavigationData(customizeNavigation);

        setTotalPage(data?.data?.totalPages);
        setPerPage(data?.data?.limit);
        setCurrentPage(Number(data?.data?.page));
        setPageData(data?.data?.results);
        setCurrentType("Events");
      }
      setIsLoading(false);
    } else if (customType === "Events") {
      const payload = {
        eventId: id,
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        username: "am",
      };

      setIsLoading(true);
      const data = await getMarketPlData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            type: "Events",
            payload,
            name,
            id,
            sportId,
          });
        }
        setNavigationData(customizeNavigation);

        setTotalPage(data?.data?.totalPages);
        setPerPage(data?.data?.limit);
        setCurrentPage(Number(data?.data?.page));
        setPageData(data?.data?.results);
        setCurrentType("Markets");
      }

      setIsLoading(false);
    } else if (customType === "Markets") {
      const payload = {
        sportId: sportId,
        marketId: id,
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        username: "am",
      };

      setIsLoading(true);

      const data = await getBetListData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            type: "Markets",
            payload,
            name,
            id,
            sportId,
          });
        }
        setNavigationData(customizeNavigation);

        setTotalPage(data?.data?.totalPages);
        setPerPage(data?.data?.limit);
        setCurrentPage(Number(data?.data?.page));
        setPageData(data?.data?.results);
        setCurrentType("BetList");
      }
      setIsLoading(false);
    } else if (customType === "Aura") {
      const payload = {
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        username: "am",
      };

      setIsLoading(true);

      const data = await getAuraEventPlData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            type: "Aura",
            payload,
            name,
            id,
            sportId,
          });
        }
        setNavigationData(customizeNavigation);

        setTotalPage(data?.data?.totalPages);
        setPerPage(data?.data?.limit);
        setCurrentPage(Number(data?.data?.page));
        setPageData(data?.data?.results);
        setCurrentType("AuraEvent");
      }
      setIsLoading(false);
    } else if (customType === "AuraEvent") {
      const payload = {
        eventName: id,
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        username: "am",
      };

      setIsLoading(true);

      const data = await getAuraMarketPlData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            type: "AuraEvent",
            payload,
            name,
            id,
            sportId,
          });
        }
        setNavigationData(customizeNavigation);

        setTotalPage(data?.data?.totalPages);
        setPerPage(data?.data?.limit);
        setCurrentPage(Number(data?.data?.page));
        setPageData(data?.data?.results);
        setCurrentType("AuraMarket");
      }
      setIsLoading(false);
    } else if (customType === "AuraMarket") {
      const payload = {
        roundId: id,
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        username: "am",
      };

      setIsLoading(true);

      const data = await getAuraBetListPlData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            type: "AuraMarket",
            payload,
            name,
            id,
            sportId,
          });
        }
        setNavigationData(customizeNavigation);

        setTotalPage(data?.data?.totalPages);
        setPerPage(data?.data?.limit);
        setCurrentPage(Number(data?.data?.page));
        setPageData(data?.data?.results);
        setCurrentType("AuraBetList");
      }
      setIsLoading(false);
    }
  };

  const onClickNavigation = (value) => {
    const customizeNavigation = [];

    let lastData = false;
    let remove = false;
    navigationData?.map((item, index) => {
      if (!remove) {
        customizeNavigation.push(item);
      }

      if (value?.name === item?.name) {
        if (navigationData?.length === index + 1) {
          lastData = true;
        }
        remove = true;
      }
    });

    if (lastData) {
      return false;
    }

    const lastRecord = customizeNavigation?.[customizeNavigation?.length - 1];

    onClickPl(
      lastRecord?.id,
      lastRecord?.sportId,
      lastRecord?.name,
      lastRecord?.type,
      customizeNavigation
    );
  };

  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black">
        Betting Profit & Loss : Main wallet
      </div>
      <div className="flex items-center my-2">
        <FaUser color="#7e97a6" className="mr-1" />
        12340ss
      </div>
      <div className="grid grid-cols-12 gap-4 items-end mb-4 mt-4 bg-[#e0e6e6] p-3 pt-2 rounded">
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">Betting Type :</div>
          <select className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2">
            <option value="all">All</option>
            <option value="settled">Exchange</option>
            <option value="unsettled">Fancy Bet</option>
            <option value="unsettled">Casino</option>
            <option value="voided_bets">Sports Book</option>
            <option value="voided_bets">Book Maker</option>
            <option value="voided_bets">BPoker</option>
            <option value="voided_bets">Binary</option>
            <option value="voided_bets">SABA</option>
            <option value="voided_bets">Sky Trader</option>
            <option value="voided_bets">Mini Game</option>
            <option value="voided_bets">Royal</option>
          </select>
        </div>
        {/* <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">Bet Status :</div>
          <select className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2">
            <option value="all">All</option>
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
          </select>
        </div> */}
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">From Date :</div>
          <input
            min={moment().subtract(1, "months").format("YYYY-MM-DD")}
            max={moment().format("YYYY-MM-DD")}
            value={fromDate}
            onChange={onChangeFromDate}
            type="date"
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
            placeholder="Start Date"
          />
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">To Date :</div>
          <input
            min={moment().subtract(1, "months").format("YYYY-MM-DD")}
            max={moment().format("YYYY-MM-DD")}
            value={toDate}
            onChange={onChangeToDate}
            type="date"
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
            placeholder="End Date"
          />
        </div>
        <div className="col-span-6 lg:col-span-2">
          <button
            onClick={onClickSubmit}
            className="bg-[#000000] text-[#feba11] rounded px-2 text-[13px] h-[25px] font-black w-[140px]"
          >
            SUBMIT
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <div className="text-[#568bc8] flex items-center">
          <div
            onClick={() => {
              if (navigationData?.length > 0) {
                getAllPl();
              }
            }}
            className={`${
              navigationData?.length > 0 ? "cursor-pointer" : "text-[#000]"
            }`}
          >
            Home
          </div>
          {navigationData?.length > 0 && <span className="mx-2">/</span>}
        </div>

        {navigationData?.map((item, index) => {
          return (
            <div key={index} className="text-[#568bc8] flex items-center">
              <div
                onClick={() => {
                  onClickNavigation(item);
                }}
                className={`${
                  navigationData?.length === index + 1
                    ? "text-[#000]"
                    : "cursor-pointer"
                }`}
              >
                {item?.name}
              </div>
              {navigationData?.length !== index + 1 && (
                <span className="mx-2">/</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="table-responsive">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            {currentType === "Sports" ? (
              <tr>
                <th>Sport Name</th>
                <th>Profit/Lost</th>
                <th>Commission</th>
                <th>Total P&L</th>
              </tr>
            ) : currentType === "Events" ? (
              <tr>
                <th>Sport Name</th>
                <th>Event Name</th>
                <th>Profit/Lost</th>
                <th>Commission</th>
                <th>Total P&L</th>
                <th>Event Time</th>
              </tr>
            ) : currentType === "Markets" ? (
              <tr>
                <th>Sport Name</th>
                <th>Event Name</th>
                <th>Market Name</th>
                <th>Result</th>
                <th>Profit/Lost</th>
                <th>Commission</th>
                <th>Settle Time</th>
              </tr>
            ) : currentType === "BetList" ? (
              <tr>
                <th>Sport Name</th>
                <th>Event Name</th>
                <th>Market Name</th>
                <th>Selection Name</th>
                <th>Type</th>
                <th>User Price</th>
                <th>Amount</th>
                <th>Profit/Lost</th>
                <th>Place Date</th>
                <th>Match Date</th>
              </tr>
            ) : currentType === "Aviator" ? (
              <tr>
                <th>Game Name</th>
                <th>Amount</th>
                <th>Profit/Lost</th>
                <th>Date/Time</th>
              </tr>
            ) : currentType === "St8" ? (
              <tr>
                <th>Sport Name</th>
                <th>Game Category</th>
                <th>Profit/Lost</th>
                <th>Commission</th>
                <th>Total P&L</th>
                <th>Settle Time</th>
              </tr>
            ) : currentType === "St8Category" ? (
              <tr>
                <th>Sport Name</th>
                <th>Game Category</th>
                <th>Game Name</th>
                <th>Profit/Lost</th>
                <th>Commission</th>
                <th>Total P&L</th>
                <th>Settle Time</th>
              </tr>
            ) : currentType === "AuraEvent" ? (
              <tr>
                <th>Sport Name</th>
                <th>Event Name</th>
                <th>Profit/Lost</th>
                <th>Commission</th>
                <th>Total P&L</th>
              </tr>
            ) : currentType === "AuraMarket" ? (
              <tr>
                <th>Sport Name</th>
                <th>Event Name</th>
                <th>Market Name</th>
                <th>Result</th>
                <th>Profit/Lost</th>
                <th>Commission</th>
                <th>Settle Time</th>
              </tr>
            ) : currentType === "AuraBetList" ? (
              <tr>
                <th>Sport Name</th>
                <th>Event Name</th>
                <th>Market Name</th>
                <th>Selection Name</th>
                <th>Type</th>
                <th>User Price</th>
                <th>Amount</th>
                <th>Profit/Lost</th>
                <th>Place Date</th>
                <th>Match Date</th>
              </tr>
            ) : (
              ""
            )}
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="h-[200px]" colSpan={10}>
                  <Loader color={"#8B0000"} size={25} />
                </td>
              </tr>
            )}
            {!isLoading &&
              pageData?.length === 0 &&
              Number(aviatorData?.total) <= 0 &&
              !st8Data?.totalPL &&
              !auraData?.pl && (
                <tr>
                  <td className="h-[200px] text-[16px] font-black" colSpan={10}>
                    No Record Found
                  </td>
                </tr>
              )}

            {!isLoading &&
              pageData?.map((item, index) => {
                if (currentType === "Sports") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td
                        onClick={() => {
                          onClickPl(item?.sportId, null, item?.sportName);
                        }}
                        className="underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.sportName}
                      </td>
                      <td
                        className={`font-black ${
                          item?.pl === 0
                            ? ""
                            : item?.pl > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.pl}
                      </td>
                      <td>{item?.commission || "-"}</td>
                      <td
                        className={`font-black ${
                          item?.pl === 0
                            ? ""
                            : item?.totalPl > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.pl}
                      </td>
                    </tr>
                  );
                } else if (currentType === "Events") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="">{item?.sportName}</td>
                      <td
                        onClick={() => {
                          onClickPl(item?.eventId, null, item?.eventName);
                        }}
                        className="p-4 underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.eventName}
                      </td>
                      <td
                        className={`p-4 font-black ${
                          item?.pl === 0
                            ? ""
                            : item?.pl > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.pl}
                      </td>
                      <td className="">{item?.commission || "-"}</td>
                      <td
                        className={`p-4 font-black ${
                          item?.pl === 0
                            ? ""
                            : item?.totalPl > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.pl}
                      </td>
                      <td className="">
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                    </tr>
                  );
                } else if (currentType === "Markets") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="">{item?.sportName}</td>
                      <td className="">{item?.eventName}</td>
                      <td
                        onClick={() => {
                          onClickPl(
                            item?.exMarketId,
                            item?.sportId,
                            item?.marketName
                          );
                        }}
                        className="p-4 underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.marketName}
                      </td>
                      <td className="">{item?.result || "-"}</td>
                      <td
                        className={`p-4 font-black ${
                          item?.pl === 0
                            ? ""
                            : item?.pl > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.pl}
                      </td>
                      <td className="">{item?.commission || "-"}</td>
                      <td className="">
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                    </tr>
                  );
                } else if (currentType === "BetList") {
                  return (
                    <tr
                      key={index}
                      className={`${
                        item?.type === "back" ? "bg-[#93e9ff]" : "bg-[#f8c8d3]"
                      }`}
                    >
                      <td className="">{item?.sportName}</td>
                      <td className="">{item?.eventName}</td>
                      <td className="">{item?.marketName}</td>
                      <td className="">{item?.selectionName}</td>
                      <td
                        className={` capitalize font-black ${
                          item?.type === "back"
                            ? "text-[#024f99]"
                            : "text-[#6D081D]"
                        }`}
                      >
                        {item?.type}
                      </td>
                      <td className="">{item?.oddsPrice}</td>
                      <td className="">{item?.stake}</td>
                      <td className="p-4">
                        <span
                          className={`mr-1 font-black ${
                            item?.pl1 === 0
                              ? ""
                              : item?.pl1 > 0
                              ? "text-[green]"
                              : "text-[red]"
                          }`}
                        >
                          {item?.pl1}
                        </span>
                        <span
                          className={`font-black ${
                            item?.pl2 === 0
                              ? ""
                              : item?.pl2 > 0
                              ? "text-[green]"
                              : "text-[red]"
                          }`}
                        >
                          ({item?.pl2})
                        </span>
                      </td>
                      <td className="">
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                      <td className="">
                        {moment
                          .utc(item?.matchedTime)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                    </tr>
                  );
                } else if (currentType === "Aviator") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className=" capitalize">{item?.sportName}</td>
                      <td className="">{item?.stack}</td>
                      <td
                        className={`p-4 font-black ${
                          item?.pl === 0 ? "text-[red]" : "text-[green]"
                        }`}
                      >
                        {item?.pl === 0 ? item?.stack : item?.pl}
                      </td>
                      <td className="">
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                    </tr>
                  );
                } else if (currentType === "St8") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className=" capitalize">{item?.sportName}</td>
                      <td
                        onClick={() => {
                          onClickPl(
                            item?.developerCode,
                            null,
                            item?.categoryName,
                            "St8Category"
                          );
                        }}
                        className=" underline text-[#568bc8] cursor-pointer capitalize"
                      >
                        {item?.categoryName}
                      </td>
                      <td
                        className={`p-4 font-black ${
                          item?.totalPL === 0
                            ? ""
                            : item?.totalPL > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.totalPL}
                      </td>
                      <td className="p-4">{item?.commission || "-"}</td>
                      <td
                        className={`p-4 font-black ${
                          item?.totalPL === 0
                            ? ""
                            : item?.totalPL > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.totalPL}
                      </td>
                      <td className="">
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                    </tr>
                  );
                } else if (currentType === "St8Category") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className=" capitalize">{item?.sportName}</td>
                      <td className=" capitalize">{item?.categoryName}</td>
                      <td className="">{item?.gameName}</td>
                      <td
                        className={`p-4 font-black ${
                          item?.totalPL === 0
                            ? ""
                            : item?.totalPL > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.totalPL}
                      </td>
                      <td className="p-4">{item?.commission || "-"}</td>
                      <td
                        className={`p-4 font-black ${
                          item?.totalPL === 0
                            ? ""
                            : item?.totalPL > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.totalPL}
                      </td>
                      <td className=" ">
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                    </tr>
                  );
                } else if (currentType === "AuraEvent") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className=" capitalize">{item?.sportName}</td>
                      <td
                        onClick={() => {
                          onClickPl(item?.eventName, null, item?.eventName);
                        }}
                        className="p-4 underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.eventName}
                      </td>

                      <td
                        className={`p-4 font-black ${
                          item?.pl === 0
                            ? ""
                            : item?.pl > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.pl}
                      </td>
                      <td className="p-4">{item?.commission || "-"}</td>
                      <td
                        className={`p-4 font-black ${
                          item?.pl === 0
                            ? ""
                            : item?.pl > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.pl}
                      </td>
                      {/* <td className=" ">
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format('DD/MM/YYYY')}
                        <br />
                        {moment.utc(item?.createdAt).utcOffset(moment().utcOffset()).format('LTS')}
                      </td> */}
                    </tr>
                  );
                } else if (currentType === "AuraMarket") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="">{item?.sportName}</td>
                      <td className="">{item?.eventName}</td>
                      <td
                        onClick={() => {
                          onClickPl(
                            item?.roundId,
                            item?.sportId,
                            item?.marketName
                          );
                        }}
                        className="p-4 underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.marketName}
                      </td>
                      <td className="">{item?.result || "-"}</td>
                      <td
                        className={`p-4 font-black ${
                          item?.pl === 0
                            ? ""
                            : item?.pl > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {item?.pl}
                      </td>
                      <td className="">{item?.commission || "-"}</td>
                      <td className="">
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                    </tr>
                  );
                } else if (currentType === "AuraBetList") {
                  return (
                    <tr
                      key={index}
                      className={`${
                        item?.type === "back" ? "bg-[#93e9ff]" : "bg-[#f8c8d3]"
                      }`}
                    >
                      <td className="">{item?.sportName}</td>
                      <td className="">{item?.eventName}</td>
                      <td className="">{item?.marketName}</td>
                      <td className="">{item?.selectionName}</td>
                      <td
                        className={` capitalize font-black ${
                          item?.type === "back"
                            ? "text-[#024f99]"
                            : "text-[#6D081D]"
                        }`}
                      >
                        {item?.type}
                      </td>
                      <td className="">{item?.oddsPrice}</td>
                      <td className="">{item?.stake}</td>
                      <td className="p-4">
                        <span
                          className={`mr-1 font-black ${
                            item?.pl1 === 0
                              ? ""
                              : item?.pl1 > 0
                              ? "text-[green]"
                              : "text-[red]"
                          }`}
                        >
                          {item?.pl1}
                        </span>
                        <span
                          className={`font-black ${
                            item?.pl2 === 0
                              ? ""
                              : item?.pl2 > 0
                              ? "text-[green]"
                              : "text-[red]"
                          }`}
                        >
                          ({item?.pl2})
                        </span>
                      </td>
                      <td className="">
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                      <td className="">
                        {moment
                          .utc(item?.matchedTime)
                          .utcOffset(moment().utcOffset())
                          .format("DD/MM/YYYY")}
                        <br />
                        {moment
                          .utc(item?.createdAt)
                          .utcOffset(moment().utcOffset())
                          .format("LTS")}
                      </td>
                    </tr>
                  );
                } else {
                  return false;
                }
              })}

            {!isLoading &&
              currentType === "Sports" &&
              Number(aviatorData?.total) > 0 && (
                <tr className="even:bg-blue-gray-50/50">
                  <td
                    onClick={() => {
                      onClickPl(false, false, "Aviator", "Aviator");
                    }}
                    className=" underline text-[#568bc8] cursor-pointer"
                  >
                    Aviator
                  </td>
                  <td
                    className={` font-black ${
                      Number(aviatorData?.total) === 0
                        ? ""
                        : Number(aviatorData?.total) > 0
                        ? "text-[green]"
                        : "text-[red]"
                    }`}
                  >
                    {Number(aviatorData?.total)?.toFixed(2)}
                  </td>
                  <td className="">{aviatorData?.commission || "-"}</td>
                  <td
                    className={` font-black ${
                      Number(aviatorData?.total) === 0
                        ? ""
                        : Number(aviatorData?.total) > 0
                        ? "text-[green]"
                        : "text-[red]"
                    }`}
                  >
                    {Number(aviatorData?.total)?.toFixed(2)}
                  </td>
                </tr>
              )}

            {!isLoading && currentType === "Sports" && st8Data?.totalPL && (
              <tr className="even:bg-blue-gray-50/50">
                <td
                  onClick={() => {
                    onClickPl(false, false, "St8", "St8");
                  }}
                  className=" underline text-[#568bc8] cursor-pointer"
                >
                  St8
                </td>
                <td
                  className={` font-black ${
                    Number(st8Data?.totalPL) === 0
                      ? ""
                      : Number(st8Data?.totalPL) > 0
                      ? "text-[green]"
                      : "text-[red]"
                  }`}
                >
                  {Number(st8Data?.totalPL)?.toFixed(2)}
                </td>
                <td className="">{st8Data?.commission || "-"}</td>
                <td
                  className={` font-black ${
                    Number(st8Data?.totalPL) === 0
                      ? ""
                      : Number(st8Data?.totalPL) > 0
                      ? "text-[green]"
                      : "text-[red]"
                  }`}
                >
                  {Number(st8Data?.totalPL)?.toFixed(2)}
                </td>
              </tr>
            )}

            {!isLoading && currentType === "Sports" && auraData?.pl && (
              <tr className="even:bg-blue-gray-50/50">
                <td
                  onClick={() => {
                    onClickPl(false, false, "Aura", "Aura");
                  }}
                  className=" underline text-[#568bc8] cursor-pointer"
                >
                  Aura
                </td>
                <td
                  className={` font-black ${
                    Number(auraData?.pl) === 0
                      ? ""
                      : Number(auraData?.pl) > 0
                      ? "text-[green]"
                      : "text-[red]"
                  }`}
                >
                  {Number(auraData?.pl)?.toFixed(2)}
                </td>
                <td className="">{auraData?.commission || "-"}</td>
                <td
                  className={` font-black ${
                    Number(auraData?.pl) === 0
                      ? ""
                      : Number(auraData?.pl) > 0
                      ? "text-[green]"
                      : "text-[red]"
                  }`}
                >
                  {Number(auraData?.pl)?.toFixed(2)}
                </td>
              </tr>
            )}

            {/* <tr className="even:bg-blue-gray-50/50">
              <td className="">1</td>
              <td className="">02-02-2222 TO 02-02-2222</td>
              <td className="">50000</td>
              <td className="">20000</td>
              <td className="">20000</td>
              <td className="">Test test test test</td>
              <td className="">Test test test test</td>
              <td className=" w-[150px]">
                <button
                  onClick={onShowBetDetail}
                  className="bg-[#000000] text-[#ffffff] uppercase text-[11px] w-full h-[30px] rounded">
                  show bet
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      {pageData?.length > 0 && (
        <div className="flex items-center gap-8 mt-4 justify-center">
          <IconButton
            size="sm"
            variant="outlined"
            color="blue-gray"
            onClick={prev}
            disabled={currentPage === 1}
          >
            {/* <FiArrowLeft strokeWidth={2} className="h-4 w-4" /> */}
          </IconButton>
          <Typography color="gray" className="font-normal">
            Page <strong className="text-blue-gray-900">{currentPage}</strong>{" "}
            of <strong className="text-blue-gray-900">{totalPage}</strong>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            color="blue-gray"
            onClick={next}
            disabled={currentPage === totalPage}
          >
            {/* <FiArrowRight strokeWidth={2} className="h-4 w-4" /> */}
          </IconButton>
        </div>
      )}
      {/* <div className="table-responsive">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="">Market</th>
              <th className="text-right">Start Time</th>
              <th className="text-right">Settled date</th>
              <th className="text-right">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                CRICKET
                <span className="fromto absolute"></span>
                <strong className="ml-4">
                  Pretoria Capitals S d sd s RL T20 v Paarl Royals SRL T20
                </strong>
                <span className="fromto absolute"></span>
                <span className="ml-4">FANCY BET</span>
              </td>
              <td className="text-right">2023-07-26 10:32:23</td>
              <td className="text-right">2023-07-26 10:32:23</td>
              <td className="text-right">
                <div className="flex items-center justify-end">
                  <div className="font-semibold">1288446886</div>
                  {isVisibleHistory ? (
                    <FaMinusSquare
                      onClick={onClickHideHistory}
                      fill="#4c5e6d"
                      className="ml-1"
                    />
                  ) : (
                    <FaPlusSquare
                      onClick={onClickShowHistory}
                      fill="#4c5e6d"
                      className="ml-1"
                    />
                  )}
                </div>
              </td>
            </tr>
            {isVisibleHistory && (
              <tr className="">
                <td
                  className="bg-[#e2e8ed] p-0 border-b border-[#7e97a7]"
                  colSpan="4"
                >
                  <table className="border-l border-r border-[#7e97a7] w-[78%] ml-[20%] ">
                    <tr className="border-b  border-[#7e97a7]">
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Bet ID
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Selection
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Odds
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Stake
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Type
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Placed
                      </th>
                      <th className="font-black px-[10px] py-[8px] text-right">
                        Profit/Loss
                      </th>
                    </tr>
                    <tr className="bg-[#f2f4f7]">
                      <th className="text-right font-normal">1288566533</th>
                      <th className="text-right font-normal">-</th>
                      <th className="text-right font-normal">21/90</th>
                      <th className="text-right font-normal">100.00</th>
                      <th className="text-right font-normal">Yes</th>
                      <th className="text-right font-normal">
                        2023-07-26 16:26:20
                      </th>
                      <th className="px-[10px] py-[8px] text-right">
                        (100.00)
                      </th>
                    </tr>
                    <tr className="bg-[aliceblue] border-t border-[#7e97a7]">
                      <th colSpan={6} className="text-right font-normal">
                        <div>Total Stakes</div>
                        <div>Yes Subtotal</div>
                        <div>No Subtotal</div>
                        <div>Market Subtotal</div>
                        <div className="border-t border-[#7e97a7] py-1 mt-1">
                          Net Market Total
                        </div>
                      </th>
                      <th className="text-right font-normal pr-2">
                        <div>300.00</div>
                        <div>255.00</div>
                        <div>0.00</div>
                        <div>255.00</div>
                        <div className="border-t border-[#7e97a7] py-1 mt-1">
                          255.00
                        </div>
                      </th>
                    </tr>
                  </table>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default BettingProfitLost;
