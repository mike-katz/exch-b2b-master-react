import React, { useState } from "react";
import { FiRotateCcw } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { amountFormate, roleStatusWithoutColor } from "../../utils/helper";
import { getMyBalanceData } from "../../redux/services/DownLineUser";
import { updateBalance } from "../../redux/actions/persistAction";
import Loader from "./Loader";
import jwtDecode from "jwt-decode";

const Header = () => {
  const dispatch = useDispatch();
  const { userData, themeColor } = useSelector((state) => state?.persist);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state?.persist);

  const userDataJWT = jwtDecode(token);

  const role = userDataJWT?.roles?.toString();

  const onRefreshBalance = async () => {
    setIsLoading(true);

    const balanceData = await getMyBalanceData();

    if (balanceData) {
      dispatch(updateBalance(balanceData?.data));
    }

    setIsLoading(false);
  };

  return (
    <div
      style={{ background: themeColor?.headerBgColor }}
      className="h-[60px] flex items-center"
    >
      <div className="container flex justify-between items-center px-2">
        <img src={themeColor?.logoUrl} className="h-[40px]" />
        <div className="flex sm:flex-row flex-col items-center justify-center">
          <div className="flex items-center">
            <div className="px-[3px] bg-[#000000] rounded text-[10px] text-[#FFFFFF] uppercase font-bold">
              {roleStatusWithoutColor(role)}
            </div>
            <div
              style={{ color: themeColor?.headerTextColor }}
              className="text-[12px] font-black ml-2"
            >
              {userData?.username}
            </div>
          </div>
          <div className="flex items-center ml-4">
            <div className="px-[3px] bg-[#000000] rounded text-[10px] text-[#FFFFFF] capitalize font-bold">
              main
            </div>
            <div
              style={{ color: themeColor?.headerTextColor }}
              className="text-[12px] font-black ml-2"
            >
              IR {amountFormate(userData?.balance)}
            </div>
          </div>
          <div
            style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,.5)" }}
            className="bg-[#3e3e3e] mx-4 sm:block hidden"
          >
            <div
              onClick={onRefreshBalance}
              className="bg-[rgba(255,255,255,.1)] p-1 cursor-pointer"
            >
              {isLoading ? (
                <Loader className="mr-0 -mb-[2px]" size={13} color="#ecad17" />
              ) : (
                <FiRotateCcw color="#ecad17" size={13} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
