import React from "react";
import { useNavigate } from "react-router-dom";

const MarketAnalytics = () => {
  const navigate = useNavigate();

  const onClickEvent = () => {
    navigate(`/market-analytics/${123}`);
  };

  return (
    <div className="px-2">
      <div className="text-[#243a48] text-[16px] font-black mt-4">
        Market Analytics
      </div>
      <div className="table-responsive mt-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="">CRICKET</th>
            </tr>
          </thead>
          <tbody>
            {[1, 1, 1, 1, 1, 1]?.map((item, index) => {
              return (
                <tr
                  key={index}
                  onClick={onClickEvent}
                  className="text-[#568BC8] cursor-pointer"
                >
                  <td>Dambulla Aura v Jaffna Kings</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="w-full min-w-max table-auto text-left mt-4">
          <thead>
            <tr>
              <th className="">TENNIS</th>
            </tr>
          </thead>
          <tbody>
            {[1, 1, 1, 1, 1, 1]?.map((item, index) => {
              return (
                <tr
                  key={index}
                  onClick={onClickEvent}
                  className="text-[#568BC8] cursor-pointer"
                >
                  <td>Dambulla Aura v Jaffna Kings</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center my-7 mb:pb-0 pb-20">
          {/* <Pagination
            itemsPerPage={paginationPage}
            totalPage={totalPage}
            onChange={onRefreshPagination}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default MarketAnalytics;
