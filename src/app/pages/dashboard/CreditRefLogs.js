import React, { useEffect, useState } from "react";
import { creditRefListData } from "../../redux/services/DownLineUser";
import Loader from "../../component/common/Loader";
import { useParams } from "react-router-dom";
import moment from "moment";
import { amountFormate } from "../../utils/helper";

const CreditRefLogs = () => {
  const { userId } = useParams();

  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    creditRefList();
  }, []);

  const creditRefList = async () => {
    setIsLoading(true);

    const payload = {
      userId: userId,
    };

    const data = await creditRefListData(payload);

    if (data?.data) {
      setPageData(data?.data);
    }

    setIsLoading(false);
  };

  return (
    <div className="py-4">
      <div style={{ boxShadow: "0 4px 5px rgba(0,0,0,.5)" }}>
        <div className="flex items-center bg-[#1b2d38] h-[40px] px-[10px] py-[5px] justify-between">
          <div className="text-[18px] text-[#FFFFFF] font-black">
            Credit Reference Logs
          </div>
          <div className="bg-[#fff] text-[#243a48] text-[15px] py-[1px] px-[8px] rounded mx-[5px] font-black">
            12340ss
          </div>
        </div>

        <div>
          <div className="table-responsive">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="">Date/Time </th>
                  <th className="text-right">Old Value</th>
                  <th className="text-right">New Value</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td className="h-[200px] text-center" colSpan={3}>
                      <Loader color={"#FEBA11"} size={25} />
                    </td>
                  </tr>
                )}
                {!isLoading && pageData?.length === 0 && (
                  <tr>
                    <td
                      className="h-[200px] text-center text-[16px] font-black"
                      colSpan={3}
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
                        <td className="text-right">
                          {amountFormate(item?.old)}
                        </td>
                        <td className="text-right">
                          {amountFormate(item?.new)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditRefLogs;
