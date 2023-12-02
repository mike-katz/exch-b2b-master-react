import moment from "moment";
import React, { useEffect, useState } from "react";
import Loader from "../../../component/common/Loader";
import Pagination from "../../../component/common/Pagination";
import { useParams } from "react-router-dom";
import { getReportUserListData } from "../../../redux/services/report";
import { numberOppositeConvert } from "../../../utils/helper";
import { useSelector } from "react-redux";

const ReportByUser = (props) => {
  const { themeColor } = useSelector((state) => state?.persist);
  const { userId } = useParams();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions(); // eslint-disable-line
  const [pageData, setPageData] = useState([]);

  const [fromDate, setFromDate] = useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [usernameValue, setUsernameValue] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const [isLoading, setIsLoading] = useState(false);

  const onRefreshPagination = (count) => {
    setCurrentPage(count);
    const payload = {
      limit: perPage,
      page: count,
      from: `${fromDate} ${moment().format("HH:mm:ss")}`,
      to: `${toDate} ${moment().format("HH:mm:ss")}`,
      timeZone: timeZone,
      userName: usernameValue,
    };

    getAllPl(payload);
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
        limit: perPage,
        page: currentPage,
        from: `${fromDate} ${moment().format("HH:mm:ss")}`,
        to: `${toDate} ${moment().format("HH:mm:ss")}`,
        userName: usernameValue,
        timeZone: timeZone,
      };
    }

    setIsLoading(true);

    const data = await getReportUserListData(payload);

    if (data) {
      setTotalPage(data?.data?.totalPages);
      setPerPage(data?.data?.limit);
      setCurrentPage(Number(data?.data?.page));
      setPageData(data?.data?.results);
      setTotalResults(data?.data?.totalResults);
    }

    setIsLoading(false);
  };

  const onChangeFromDate = (e) => {
    setFromDate(e?.target?.value);
  };

  const onChangeToDate = (e) => {
    setToDate(e?.target?.value);
  };

  const onChangeUsername = (e) => {
    setUsernameValue(e?.target?.value);
  };

  const onClickSubmit = () => {
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: perPage,
      from: fromDate,
      to: toDate,
      userName: usernameValue,
      timeZone: timeZone,
      userId,
    };

    getAllPl(payload);
  };

  const onChangePerPage = (value) => {
    setPerPage(value);
    setCurrentPage(1);
    const payload = {
      page: 1,
      limit: value,
      from: fromDate,
      to: toDate,
      userName: usernameValue,
      timeZone: timeZone,
      userId,
    };

    getAllPl(payload);
  };

  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black mt-4 flex items-center">
        Profit/Lost Report by User
      </div>
      <div className="grid grid-cols-12 gap-4 items-end mb-4 mt-4 bg-[#e0e6e6] p-3 pt-2 rounded">
        <div className="col-span-6 lg:col-span-2">
          <div className="text-[#000] text-[12px]">Username :</div>
          <input
            value={usernameValue}
            onChange={onChangeUsername}
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] w-full h-[25px] rounded px-2"
            placeholder="Username"
          />
        </div>
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
      <div className="table-responsive">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              <th className="text-left">Username</th>
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
            {!isLoading && pageData?.length === 0 && (
              <tr>
                <td className="h-[200px] text-[16px] font-black" colSpan={10}>
                  No Record Found
                </td>
              </tr>
            )}
            {!isLoading &&
              pageData?.map((item, index) => {
                return (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="text-left">{item?.username}</td>
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
          </tbody>
        </table>
        {pageData?.length > 0 && (
          <div className="flex justify-center my-7 mb:pb-0 pb-20">
            <Pagination
              onChangePerPage={onChangePerPage}
              totalResults={totalResults}
              currentPage={currentPage || 1}
              itemsPerPage={totalPage || 1}
              perPage={perPage}
              onChange={onRefreshPagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportByUser;
