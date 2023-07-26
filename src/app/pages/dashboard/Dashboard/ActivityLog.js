import React from "react";
import Pagination from "../../../component/common/Pagination";

const ActivityLog = () => {
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
            <tr>
              <td className="">2023-07-17 17:50:06</td>
              <td className="text-right text-[#508d0e]">Login Success</td>
              <td className="text-right">152.58.34.25</td>
              <td className="text-right">Reliance Jio Infocomm Limited</td>
              <td className="text-right">Sikka, Gujarat, IN</td>
              <td className="text-right">Browser</td>
            </tr>
            <tr>
              <td className="">2023-07-17 17:50:06</td>
              <td className="text-right text-[#508d0e]">Login Success</td>
              <td className="text-right">152.58.34.25</td>
              <td className="text-right">Reliance Jio Infocomm Limited</td>
              <td className="text-right">Sikka, Gujarat, IN</td>
              <td className="text-right">Browser (mobile)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center  my-7">
        <Pagination itemsPerPage={4} />
      </div>
    </div>
  );
};

export default ActivityLog;
