import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../component/common/Loader";
import { getBankTransactionData } from "../../../redux/services/DownLineUser";
import { amountFormate } from "../../../utils/helper";
import Pagination from "../../../component/common/Pagination";

const BankingLogs = () => {
  const { userId } = useParams();

  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [paginationPage, setPaginationPage] = useState(1);

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

    const data = await getBankTransactionData(payload);

    if (data?.username) {
      setUsername(data?.username);
    }

    if (data?.data) {
      setTotalPage(data?.data?.totalPages);
      setPerPage(data?.data?.limit);
      setCurrentPage(data?.data?.page);
      setPaginationPage(data?.data?.totalPages);
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
            Banking Logs
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
                  <th className="text-right">Deposit</th>
                  <th className="text-right">Withdraw</th>
                  <th className="text-right">Balance</th>
                  <th className="text-right">Remark</th>
                  <th className="text-right">From/To</th>
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
                          {moment(item?.createdAt)?.format("DD-YY-MM")}
                          <br /> {moment(item?.createdAt)?.format("hh:MM:ss A")}
                        </td>
                        <td className="text-right">
                          {item?.type === "deposit"
                            ? amountFormate(item?.balance)
                            : "-"}
                        </td>
                        <td className="text-right">
                          {item?.type === "deposit" ? (
                            "-"
                          ) : (
                            <span className="text-[red]">
                              ({amountFormate(item?.balance)})
                            </span>
                          )}
                        </td>
                        <td className="text-right">{item?.remark || "-"}</td>
                        <td className="text-right">{item?.remark || "-"}</td>
                        <td className="text-right">
                          <strong className="ml-4">
                            {item?.fromId?.username}
                          </strong>
                          <span className="fromto absolute"></span>
                          <strong className="ml-4">
                            {item?.toId?.username}
                          </strong>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {!isLoading && pageData?.length !== 0 && paginationPage ? (
        <div className="flex justify-center my-7 mb:pb-0 pb-20">
          <Pagination
            itemsPerPage={paginationPage}
            totalPage={totalPage}
            onChange={onRefreshPagination}
          />
        </div>
      ) : null}
    </div>
  );
};

export default BankingLogs;