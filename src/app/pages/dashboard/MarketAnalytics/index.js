import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMarketData } from "../../../redux/services/MarketAnalytics";
import Loader from "../../../component/common/Loader";

const MarketAnalytics = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    getMarkets();
  }, []);

  const getMarkets = async () => {
    setIsLoading(true);
    const data = await getMarketData();

    if (data?.data) {
      const desiredStatuses = ["Cricket", "Soccer", "Tennis"];

      const orderedData = data?.data.sort((a, b) => {
        const statusA = desiredStatuses.indexOf(a.sportName);
        const statusB = desiredStatuses.indexOf(b.sportName);
        return statusA - statusB;
      });

      setPageData(orderedData);
    }
    setIsLoading(false);
  };

  const onClickEvent = (id) => {
    navigate(`/market-analytics/${id}`);
  };

  return (
    <div className="px-2">
      <div className="text-[#243a48] text-[16px] font-black mt-4">
        Market Analytics
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-[200px]">
          <Loader color={"#FEBA11"} size={25} />
        </div>
      )}
      {!isLoading && pageData?.length === 0 && (
        <div className="flex justify-center items-center h-[200px]">
          No Record Found
        </div>
      )}
      {!isLoading &&
        pageData?.map((item, index) => {
          return (
            <div key={index} className="table-responsive mt-4">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th
                      style={{
                        background:
                          "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
                      }}
                      className="uppercase"
                    >
                      <div className="flex items-center text-[14px] text-[#FFFFFF]">
                        <img
                          className="mr-2 h-[20px] w-[20px]"
                          src={item?.iconUrl}
                        />
                        {item?.sportName}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item?.events?.map((subItem, subIndex) => {
                    return (
                      <tr
                        key={subIndex}
                        onClick={() => {
                          onClickEvent(subItem?.exEventId);
                        }}
                        className="text-[#568BC8] cursor-pointer"
                      >
                        <td>{subItem?.eventName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
};

export default MarketAnalytics;
