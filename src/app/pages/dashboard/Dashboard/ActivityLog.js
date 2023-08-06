import React, { useEffect, useState } from "react";
import { getActivityLogData } from "../../../redux/services/DownLineUser";
import { useParams } from "react-router-dom";
import Loader from "../../../component/common/Loader";

const ActivityLog = () => {
  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    const payload = {
      userId,
    };
    setIsLoading(true);
    const data = await getActivityLogData(payload);

    if (data?.data) {
      setPageData(data?.data);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div className="text-[#243a48] text-[16px] font-black">Activity Log</div>

      <div className="table-responsive">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="">2023-07-17 19:25:19</th>
              <th className="text-right">Login Status</th>
              <th className="text-right">IP Address</th>
              <th className="text-right">ISP</th>
              <th className="text-right">City/State/Country</th>
              <th className="text-right">User Agent Type</th>
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
                    <td className="">2023-07-17 17:50:06</td>
                    <td className="text-right text-[#508d0e]">Login Success</td>
                    <td className="text-right">152.58.34.25</td>
                    <td className="text-right">
                      Reliance Jio Infocomm Limited
                    </td>
                    <td className="text-right">Sikka, Gujarat, IN</td>
                    <td className="text-right">Browser</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* <div className="flex justify-center  my-7">
        <Pagination itemsPerPage={4} />
      </div> */}
    </div>
  );
};

export default ActivityLog;
