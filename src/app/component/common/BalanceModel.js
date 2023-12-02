import React, { useEffect, useState } from "react";
import { getExposerData } from "../../redux/services/persist";
import PlaceholderLoading from "react-placeholder-loading";
import Model from "./Modal";
import { FaWindowClose } from "react-icons/fa";
// import { getBalance } from "../../redux/actions/balanceAction";

const BalanceModel = ({ isVisible, onCloseMenu, currentUserData }) => {
  // const dispatch = useDispatch();

  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUserData) {
      getExposer(currentUserData);
    }
  }, [currentUserData]);

  const getExposer = async (currentUserData) => {
    setIsLoading(true);
    const data = await getExposerData(currentUserData);

    if (data) {
      setPageData(data || []);
    }

    setIsLoading(false);
  };

  return (
    <Model isVisible={isVisible} onCloseMenu={onCloseMenu} center>
      <div className="bg-[#eee] rounded w-[400px]">
        <div className="p-[15px] flex items-center justify-between min-w-[200px]">
          <div className="text-[16px] text-[#3b5160] font-black">
            Exposer List
          </div>
          <FaWindowClose
            onClick={onCloseMenu}
            size={20}
            className="cursor-pointer"
          />
        </div>
        <div className="modal rounded md:min-w-[400px] p-4">
          <div className="border border-[#000] rounded">
            <div className="flex items-center justify-between p-2 border-b border-[#000000]">
              <div className="text-[14px] font-black">Total Exposer</div>
              {isLoading ? (
                <PlaceholderLoading shape="rect" width={30} height={20} />
              ) : (
                <div className="text-[18px] font-black">
                  {Number(currentUserData?.exposure)?.toFixed(2)}
                </div>
              )}
            </div>
            {isLoading &&
              [1, 1, 1, 1]?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border-b border-[#00000030]"
                  >
                    <div>
                      <PlaceholderLoading
                        shape="rect"
                        width={150}
                        height={10}
                      />
                      <div className="mt-1">
                        <PlaceholderLoading
                          shape="rect"
                          width={150}
                          height={10}
                        />
                      </div>
                    </div>
                    <PlaceholderLoading shape="rect" width={30} height={20} />
                  </div>
                );
              })}

            {!isLoading &&
              pageData?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border-b border-[#00000030]"
                  >
                    <div>
                      <div className="text-[12px] font-black">
                        {item?.eventName}
                      </div>
                      <div className="text-[12px]">{item?.marketName}</div>
                    </div>
                    <div className="text-[14px] font-black">
                      {Number(Math.abs(item?.exposure))?.toFixed(2)}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Model>
  );
};

export default BalanceModel;
