import React, { useEffect, useState } from "react";
// import Pagination from "../../../component/common/Pagination";
import { getActivityLogData } from "../../../redux/services/DownLineUser";
import Loader from "../../../component/common/Loader";
import moment from "moment";

const ActivityLog = () => {
  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    setIsLoading(true);
    const data = await getActivityLogData();

    if (data?.data) {
      setPageData(data?.data);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black">Activity Log</div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="">No</th>
            <th className="">Date And Time</th>
            <th className="text-right">Login Status</th>
            <th className="text-right">IP Address</th>
            <th className="text-right">ISP</th>
            <th className="text-right">City/State/Country</th>
            {/* <th className="text-right">User Agent Type</th> */}
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
              const ip = JSON.parse(item?.detail);
              let ipData = [];

              if (Object.keys(ip).length > 0) {
                ipData = JSON.parse(ip);
              }

              return (
                <tr key={index}>
                  <td className="p-4">{index + 1}</td>
                  <td className="">
                    {moment(item?.createdAt).format("DD-MM-YYYY hh:mm:ss A")}
                  </td>
                  <td
                    className={`p-4 uppercase ${
                      item?.status === "success" ? "text-[green]" : "text-[red]"
                    }`}
                  >
                    {item?.status}
                  </td>
                  <td className="text-right">{ipData?.query}</td>
                  <td className="text-right">{ipData?.isp}</td>
                  <td className="text-right">
                    {ipData?.city}, {ipData?.regionName}, {ipData?.country}
                  </td>
                  {/* <td className="text-right">Browser</td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* <div className="flex justify-center  my-7">
        <Pagination itemsPerPage={4} />
      </div> */}
    </div>
  );
};

export default ActivityLog;
