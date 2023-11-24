import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../component/common/Loader";
import { getProfileLogData } from "../../../redux/services/DownLineUser";
import Pagination from "../../../component/common/Pagination";

const AllProfileLogs = () => {
  const { userId } = useParams();

  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  useEffect(() => {
    transactionsHistory();
  }, []);

  const transactionsHistory = async (payloadParams) => {
    setIsLoading(true);
    let payload = {};
    if (payloadParams) {
      payload = payloadParams;
    } else {
      payload = {
        page: currentPage,
        limit: perPage,
        userId: userId,
      };
    }

    const data = await getProfileLogData(payload);

    if (data?.username) {
      setUsername(data?.username);
    }

    if (data?.data) {
      setTotalPage(data?.data?.totalPages);
      setPerPage(data?.data?.limit);
      setCurrentPage(data?.data?.page);
      setPageData(data?.data?.results);
    }

    setIsLoading(false);
  };

  const onRefreshPagination = (count) => {
    setCurrentPage(count);
    const payload = {
      page: count,
      limit: perPage,
      userId: userId,
    };

    transactionsHistory(payload);
  };

  return (
    <div className="py-4">
      <div style={{ boxShadow: "0 4px 5px rgba(0,0,0,.5)" }}>
        <div className="flex items-center bg-[#1b2d38] h-[40px] px-[10px] py-[5px] justify-between">
          <div className="text-[18px] text-[#FFFFFF] font-black">
            Profile Logs
          </div>
          <div className="bg-[#fff] text-[#243a48] text-[15px] py-[1px] px-[8px] rounded mx-[5px] font-black">
            {username}
          </div>
        </div>

        <div>
          <div className="table-responsive">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="">Date/Time </th>
                  <th className="">Changed By</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td className="h-[200px] text-center" colSpan={6}>
                      <Loader color={"#FEBA11"} size={25} />
                    </td>
                  </tr>
                )}
                {!isLoading && pageData?.length === 0 && (
                  <tr>
                    <td
                      className="h-[200px] text-center text-[16px] font-black"
                      colSpan={6}
                    >
                      No Record Found
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  pageData?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {moment(item?.createdAt)?.format("DD-MM-YYYY")}
                          <br /> {moment(item?.createdAt)?.format("hh:mm:ss A")}
                        </td>
                        <td className="">{item?.fromUser || "-"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {!isLoading && pageData?.length !== 0 && totalPage ? (
        <div className="flex justify-center my-7 mb:pb-0 pb-20">
          <Pagination
            currentPage={currentPage || 1}
            itemsPerPage={totalPage || 1}
            onChange={onRefreshPagination}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AllProfileLogs;
