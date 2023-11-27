import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  getAuraBetListPlData,
  getAuraEventPlData,
  getAuraMarketPlData,
  getBetListData,
} from "../../../redux/services/pl";
import Loader from "../../../component/common/Loader";
import Pagination from "../../../component/common/Pagination";
import { useParams } from "react-router-dom";
import {
  apiReportIntCasinoTotalPLData,
  getReportAviatorListData,
  getReportAviatorTotalPLData,
  getReportCasinoTotalPLData,
  getReportIntCasinoListData,
  getReportSportListData,
  getReportSportTotalPLData,
} from "../../../redux/services/report";
import { numberOppositeConvert } from "../../../utils/helper";
import { useSelector } from "react-redux";

const ReportByMarket = (props) => {
  const { themeColor } = useSelector((state) => state?.persist);
  const { userId } = useParams();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions(); // eslint-disable-line
  const [pageData, setPageData] = useState([]);
  const [aviatorData, setAviatorData] = useState([]);
  const [st8Data, setSt8Data] = useState([]);
  const [auraData, setAuraData] = useState([]);
  const [currentTotalItem, setCurrentTotalItem] = useState();

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

  const onRefreshPagination = (count) => {
    setCurrentPage(count);

    const lastRecord = navigationData?.[navigationData?.length - 1];

    onClickPl(
      lastRecord?.item,
      lastRecord?.id,
      lastRecord?.sportId,
      lastRecord?.name,
      lastRecord?.type,
      navigationData,
      count
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
      };
    }

    setIsLoading(true);

    // const data = await getSportPlData(payload);
    // const plData = await getAviatorSportData(payload);
    // const st8Data = await getCategoryTotalPLData(payload);
    // const auraData = await getAuraSportPlData(payload);

    const [data, plData, st8Data, auraData] = await Promise.all([
      getReportSportTotalPLData(payload),
      getReportAviatorTotalPLData(payload),
      apiReportIntCasinoTotalPLData(payload),
      getReportCasinoTotalPLData(payload),
    ]);

    if (auraData) {
      setAuraData(auraData?.data);
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
      setCurrentTotalItem();
      // setTotalPage(data?.data?.totalPages);
      // setPerPage(data?.data?.limit);
      // setCurrentPage(Number(data?.data?.page));
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
      userId,
    };

    getAllPl(payload);
  };

  const onClickPl = async (
    item,
    id,
    sportId,
    name,
    type = false,
    navigation = [],
    currentPage = 1
  ) => {
    setCurrentTotalItem(item);
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
        developerCode: id,
      };

      setIsLoading(true);

      const data = await getReportIntCasinoListData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            item,
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
    } else if (customType === "Int Casino") {
      const payload = {
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
      };

      setIsLoading(true);

      const data = await getReportIntCasinoListData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            item,
            type: "Int Casino",
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
        setCurrentType("Int Casino");
      }
      setIsLoading(false);
    } else if (customType === "Aviator") {
      const payload = {
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
      };

      setIsLoading(true);

      const data = await getReportAviatorListData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            item,
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
        sportName: name,
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
      };

      setIsLoading(true);

      const data = await getReportSportListData(payload);
      console.log({ data });
      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            item,
            type: "Sports",
            payload,
            name,
            id,
            sportId,
          });
        }

        console.log({ customizeNavigation });
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
        exEventId: id,
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
      };

      console.log({ payload });

      setIsLoading(true);

      const data = await getReportSportListData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            item,
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
        userId,
      };

      setIsLoading(true);

      const data = await getBetListData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            item,
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
    } else if (customType === "Casino") {
      const payload = {
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        userId,
      };

      setIsLoading(true);

      const data = await getAuraEventPlData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            item,
            type: "Casino",
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
        matchName: id,
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        timeZone: timeZone,
        userId,
      };

      setIsLoading(true);

      const data = await getAuraMarketPlData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            item,
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
        userId,
      };

      setIsLoading(true);

      const data = await getAuraBetListPlData(payload);

      if (data) {
        if (navigation?.length === 0) {
          customizeNavigation.push({
            item,
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
      lastRecord?.item,
      lastRecord?.id,
      lastRecord?.sportId,
      lastRecord?.name,
      lastRecord?.type,
      customizeNavigation
    );
  };

  let totalStack = 0;
  let totalPL = 0;
  let totalCommission = 0;

  if (currentTotalItem) {
    totalStack += Number(currentTotalItem?.stack || 0) || 0;
    totalPL += Number(currentTotalItem?.pl || 0) || 0;
    totalCommission += Number(currentTotalItem?.commission || 0) || 0;
  }

  if (currentType === "Sports") {
    pageData?.map((item) => {
      totalStack += Number(item?.stack || 0) || 0;
      totalPL += Number(item?.pl || 0) || 0;
      totalCommission += Number(item?.commission || 0) || 0;
    });

    aviatorData?.map((item) => {
      totalStack += Number(item?.stack || 0) || 0;
      totalPL += Number(item?.pl || 0) || 0;
      totalCommission += Number(item?.commission || 0) || 0;
    });

    st8Data?.map((item) => {
      totalStack += Number(item?.stack || 0) || 0;
      totalPL += Number(item?.pl || 0) || 0;
      totalCommission += Number(item?.commission || 0) || 0;
    });

    auraData?.map((item) => {
      totalStack += Number(item?.stack || 0) || 0;
      totalPL += Number(item?.pl || 0) || 0;
      totalCommission += Number(item?.commission || 0) || 0;
    });
  }

  console.log({ totalPL });

  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black mt-4 flex items-center">
        Profit/Lost Report by Market
      </div>
      <div className="grid grid-cols-12 gap-4 items-end mb-4 mt-4 bg-[#e0e6e6] p-3 pt-2 rounded">
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
            style={{
              background: themeColor?.headerBgColor,
              color: themeColor?.headerTextColor,
            }}
            className="rounded px-2 text-[13px] h-[25px] font-black w-[140px]"
          >
            SUBMIT
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center mb-2">
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
            <tr>
              <th className="text-left">Name</th>
              <th>Stack</th>
              <th>Profit/Lost</th>
              <th>Commission</th>
              <th>Upline PL</th>
            </tr>
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
              aviatorData?.length === 0 &&
              st8Data?.length === 0 &&
              auraData?.length === 0 && (
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
                          onClickPl(item, item?.id, null, item?.name);
                        }}
                        className="text-left underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.name}
                      </td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else if (currentType === "Events") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td
                        onClick={() => {
                          onClickPl(
                            item,
                            item?.exEventId,
                            null,
                            item?.eventName
                          );
                        }}
                        className="text-left underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.eventName}
                      </td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else if (currentType === "Markets") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="text-left">{item?.marketName}</td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else if (currentType === "BetList") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td
                        onClick={() => {
                          onClickPl(item, false, false, "Aviator", "Aviator");
                        }}
                        className=" underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.name}
                      </td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else if (currentType === "Aviator") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td
                        onClick={() => {
                          onClickPl(item, false, false, "Aviator", "Aviator");
                        }}
                        className="text-left"
                      >
                        {item?.sportName}
                      </td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else if (currentType === "Int Casino") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td
                        onClick={() => {
                          onClickPl(
                            item,
                            item?.developer_code,
                            null,
                            item?.categoryName,
                            "St8Category"
                          );
                        }}
                        className="text-left underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.categoryName}
                      </td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else if (currentType === "St8Category") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="text-left">{item?.gameName}</td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else if (currentType === "AuraEvent") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td
                        onClick={() => {
                          onClickPl(item, item?.eventId, null, item?.eventName);
                        }}
                        className=" underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.name}
                      </td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else if (currentType === "AuraMarket") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td
                        onClick={() => {
                          onClickPl(
                            item,
                            item?.marketName,
                            item?.sportId,
                            item?.marketName
                          );
                        }}
                        className=" underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.name}
                      </td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else if (currentType === "AuraBetList") {
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td
                        onClick={() => {
                          onClickPl(item, false, false, "Aviator", "Aviator");
                        }}
                        className=" underline text-[#568bc8] cursor-pointer"
                      >
                        {item?.name}
                      </td>
                      <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                      <td
                        className={` font-black ${
                          Number(item?.pl) === 0
                            ? ""
                            : Number(item?.pl) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(item?.pl)?.toFixed(2)}
                      </td>
                      <td className="">
                        {Number(item?.commission || 0)?.toFixed(2) || "-"}
                      </td>
                      <td
                        className={` font-black ${
                          Number(numberOppositeConvert(item?.pl)) === 0
                            ? ""
                            : Number(numberOppositeConvert(item?.pl)) > 0
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                      </td>
                    </tr>
                  );
                } else {
                  return false;
                }
              })}
            {!isLoading &&
              currentType === "Sports" &&
              aviatorData?.map((item, index) => {
                return (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td
                      onClick={() => {
                        onClickPl(item, false, false, "Aviator", "Aviator");
                      }}
                      className="text-left underline text-[#568bc8] cursor-pointer"
                    >
                      {item?.name}
                    </td>
                    <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                    <td
                      className={` font-black ${
                        Number(item?.pl) === 0
                          ? ""
                          : Number(item?.pl) > 0
                          ? "text-[green]"
                          : "text-[red]"
                      }`}
                    >
                      {Number(item?.pl)?.toFixed(2)}
                    </td>
                    <td className="">
                      {Number(item?.commission || 0)?.toFixed(2) || "-"}
                    </td>
                    <td
                      className={` font-black ${
                        Number(numberOppositeConvert(item?.pl)) === 0
                          ? ""
                          : Number(numberOppositeConvert(item?.pl)) > 0
                          ? "text-[green]"
                          : "text-[red]"
                      }`}
                    >
                      {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            {!isLoading &&
              currentType === "Sports" &&
              st8Data?.map((item, index) => {
                return (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td
                      onClick={() => {
                        onClickPl(
                          item,
                          false,
                          false,
                          "Int Casino",
                          "Int Casino"
                        );
                      }}
                      className="text-left underline text-[#568bc8] cursor-pointer"
                    >
                      {item?.name}
                    </td>
                    <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                    <td
                      className={` font-black ${
                        Number(item?.pl) === 0
                          ? ""
                          : Number(item?.pl) > 0
                          ? "text-[green]"
                          : "text-[red]"
                      }`}
                    >
                      {Number(item?.pl)?.toFixed(2)}
                    </td>
                    <td className="">
                      {Number(item?.commission || 0)?.toFixed(2) || "-"}
                    </td>
                    <td
                      className={` font-black ${
                        Number(numberOppositeConvert(item?.pl)) === 0
                          ? ""
                          : Number(numberOppositeConvert(item?.pl)) > 0
                          ? "text-[green]"
                          : "text-[red]"
                      }`}
                    >
                      {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            {!isLoading &&
              currentType === "Sports" &&
              auraData?.map((item, index) => {
                return (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td
                      onClick={() => {
                        onClickPl(item, false, false, "Aviator", "Aviator");
                      }}
                      className="text-left underline text-[#568bc8] cursor-pointer"
                    >
                      {item?.name}
                    </td>
                    <td>{Number(item?.stack || 0)?.toFixed(2)}</td>
                    <td
                      className={` font-black ${
                        Number(item?.pl) === 0
                          ? ""
                          : Number(item?.pl) > 0
                          ? "text-[green]"
                          : "text-[red]"
                      }`}
                    >
                      {Number(item?.pl)?.toFixed(2)}
                    </td>
                    <td className="">
                      {Number(item?.commission || 0)?.toFixed(2) || "-"}
                    </td>
                    <td
                      className={` font-black ${
                        Number(numberOppositeConvert(item?.pl)) === 0
                          ? ""
                          : Number(numberOppositeConvert(item?.pl)) > 0
                          ? "text-[green]"
                          : "text-[red]"
                      }`}
                    >
                      {Number(numberOppositeConvert(item?.pl))?.toFixed(2)}
                    </td>
                  </tr>
                );
              })}

            {!isLoading && (
              <tr className="even:bg-blue-gray-50/50">
                <td className="bg-[#e0e6e6] text-left font-black">Total</td>
                <td className="bg-[#e0e6e6]">
                  {Number(totalStack || 0)?.toFixed(2)}
                </td>
                <td
                  className={`bg-[#e0e6e6] font-black ${
                    Number(totalPL) === 0
                      ? ""
                      : Number(totalPL) > 0
                      ? "text-[green]"
                      : "text-[red]"
                  }`}
                >
                  {Number(totalPL)?.toFixed(2)}
                </td>
                <td className="bg-[#e0e6e6] ">
                  {Number(totalCommission || 0)?.toFixed(2) || "-"}
                </td>
                <td
                  className={`bg-[#e0e6e6] font-black ${
                    Number(numberOppositeConvert(totalPL)) === 0
                      ? ""
                      : Number(numberOppositeConvert(totalPL)) > 0
                      ? "text-[green]"
                      : "text-[red]"
                  }`}
                >
                  {Number(numberOppositeConvert(totalPL))?.toFixed(2)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {navigationData?.length > 0 && (
          <div className="flex justify-center my-7 mb:pb-0 pb-20">
            <Pagination
              currentPage={currentPage || 1}
              itemsPerPage={totalPage || 1}
              onChange={onRefreshPagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportByMarket;
