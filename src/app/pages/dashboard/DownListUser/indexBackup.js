import React, { useEffect, useState } from "react";
import {
  FaCircle,
  FaDownload,
  FaPencilAlt,
  FaUndo,
  FaUserPlus,
} from "react-icons/fa";
import Loader from "../../../component/common/Loader";
import Pagination from "../../../component/common/Pagination";
import Searching from "../../../component/form/Searching";
import {
  getDownLineUserData,
  getMyBalanceData,
} from "../../../redux/services/DownLineUser";
import AddPlayerModal from "./AddPlayerModal";
import ChangeStatusModal from "./ChangeStatusModal";
import CreditRefModal from "./CreditRefModal";
import EditExposureLimitModal from "./EditExposureLimitModal";
import { useNavigate } from "react-router-dom";
import { amountFormate } from "../../../utils/helper";

const DownLineUser = () => {
  const navigate = useNavigate();
  const [isVisibleEditCreditRef, setIsVisibleEditCreditRef] = useState(false);
  // const [isEnableBalanceView, setIsEnableBalanceView] = useState(false);
  const [isVisibleEditStatus, setIsVisibleEditStatus] = useState(false);
  const [isVisibleExposureLimit, setIsVisibleExposureLimit] = useState(false);
  const [isVisibleAddPlayer, setIsVisibleAddPlayer] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [myBalance, setMyBalance] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  useEffect(() => {
    getDownLineUser();
    getMyBalance();
  }, []);

  const getDownLineUser = async () => {
    const payload = {
      page: 1,
      limit: 10,
    };

    setIsLoadingTable(true);
    const data = await getDownLineUserData(payload);

    if (data) {
      setPageData(data?.data?.results);
    }
    setIsLoadingTable(false);
  };

  const getMyBalance = async () => {
    const data = await getMyBalanceData();

    if (data) {
      setMyBalance(data?.data);
    }
  };

  const onClickEditCreditRef = () => {
    setIsVisibleEditCreditRef(true);
  };

  const onCloseEditCreditRef = () => {
    setIsVisibleEditCreditRef(false);
  };

  // const onClickBalance = () => {
  //   setIsEnableBalanceView(!isEnableBalanceView);
  // };

  const onClickEditStatus = () => {
    setIsVisibleEditStatus(true);
  };

  const onCloseEditStatus = () => {
    setIsVisibleEditStatus(false);
  };

  const onClickEditExposureLimit = () => {
    setIsVisibleExposureLimit(true);
  };

  const onCloseExposureLimit = () => {
    setIsVisibleExposureLimit(false);
  };

  const onClickAddPlayer = () => {
    setIsVisibleAddPlayer(true);
  };

  const onCloseAddPlayer = () => {
    setIsVisibleAddPlayer(false);
  };

  const onClickMenu = (id, userId) => {
    navigate(`/down-list-master/details/${id}/${userId}`);
  };

  return (
    <div className="relative">
      <CreditRefModal
        isVisible={isVisibleEditCreditRef}
        onCloseMenu={onCloseEditCreditRef}
      />
      <ChangeStatusModal
        isVisible={isVisibleEditStatus}
        onCloseMenu={onCloseEditStatus}
      />
      <EditExposureLimitModal
        isVisible={isVisibleExposureLimit}
        onCloseMenu={onCloseExposureLimit}
      />

      <AddPlayerModal
        isVisible={isVisibleAddPlayer}
        onCloseMenu={onCloseAddPlayer}
      />

      <div className="grid grid-cols-12 gap-4 mt-2">
        <div className="col-span-3">
          <Searching />
        </div>
        <div className="col-span-2 flex items-center">
          <div className="text-[12px] font-black">Status: </div>
          <select className="ml-2 w-full h-[30px] border border-[#cdcdcd] uppercase text-[#2b2b2b] text-[12px] px-[5px]">
            <option value="0">ACTIVE</option>
            <option value="1">SUSPENDED</option>
            <option value="2">LOCKED</option>
            <option value="-1">ALL</option>
          </select>
        </div>
        <div className="col-span-2">
          <button className="common-button text-[#000000] rounded px-2 text-[12px] font-semibold flex items-center justify-center h-[31px] border border-[#cdcdcd]">
            <FaDownload color="#000000" size={10} className="mr-1" /> Download
            CSV
          </button>
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-2 flex items-center justify-end">
          <button
            onClick={onClickAddPlayer}
            className="common-button bg-[#FFFFFF] text-[#000000] rounded px-2 text-[12px] font-semibold flex items-center justify-center h-[31px] border border-[#cdcdcd]"
          >
            <FaUserPlus color="#000000" size={15} className="mr-1" /> Add Player
          </button>
          <button
            onClick={getDownLineUser}
            className="common-button bg-[#FFFFFF] text-[#000000] rounded px-2 text-[12px] font-semibold flex items-center justify-center h-[31px] border border-[#cdcdcd] ml-1"
          >
            <FaUndo color="#000000" size={15} className="mr-1" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 my-4 border-b border-[#7e97a7] h-[53px] bg-[#FFFFFF]">
        <div className="col-span-2 px-2 flex flex-col justify-center">
          <div className="text-[12px] text-[#9b9b9b]">Total Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR {amountFormate(myBalance?.totalBalance)}
          </div>
        </div>
        <div className="col-span-2 px-2 flex flex-col justify-center border-l border-[#7e97a7]">
          <div className="text-[12px] text-[#9b9b9b]">Total Exposure</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR{" "}
            <span className="text-[#d0021b]">
              ({amountFormate(myBalance?.totalExposure)})
            </span>
          </div>
        </div>
        <div className="col-span-2 px-2 flex flex-col justify-center border-l border-[#7e97a7]">
          <div className="text-[12px] text-[#9b9b9b]">Total Avail. bal.</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR{" "}
            {amountFormate(
              Number(myBalance?.totalBalance || 0) +
                Number(myBalance?.totalExposure || 0)
            )}
          </div>
        </div>
        <div className="col-span-2 px-2 flex flex-col justify-center border-l border-[#7e97a7]">
          <div className="text-[12px] text-[#9b9b9b]">Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR {amountFormate(myBalance?.balance)}
          </div>
        </div>
        <div className="col-span-2 px-2 flex flex-col justify-center border-l border-[#7e97a7]">
          <div className="text-[12px] text-[#9b9b9b]">Available Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR{" "}
            {amountFormate(
              Number(myBalance?.balance + myBalance?.totalBalance)
            )}
          </div>
        </div>
        <div className="col-span-2 px-2 flex flex-col justify-center border-l border-[#7e97a7]">
          <div className="text-[12px] text-[#9b9b9b]">Total Users</div>
          <div className="text-[#243a48] text-[15px] font-black">
            {myBalance?.totalUser}
          </div>
        </div>
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="">Account</th>
            <th className="">Credit Ref.</th>
            <th className="">Balance</th>
            <th className="">Exposure</th>
            <th className="">Avail. bal.</th>
            <th className="">Exposure Limit</th>
            <th className="">Ref. P/L</th>
            <th className="">Status</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {isLoadingTable && (
            <tr>
              <td className="h-[200px] text-center" colSpan={9}>
                <Loader color={"#FEBA11"} size={25} />
              </td>
            </tr>
          )}
          {!isLoadingTable && pageData?.length === 0 && (
            <tr>
              <td
                className="h-[200px] text-center text-[16px] font-black"
                colSpan={6}
              >
                No Record Found
              </td>
            </tr>
          )}
          {!isLoadingTable &&
            pageData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="flex items-center">
                      <span className="w-[30px]">1.</span>{" "}
                      {/* <div className="bg-[#568bc8] text-[10px] text-[#fff] uppercase w-[26px] h-[15px] flex justify-center items-center rounded mr-[5px]">
                      PL
                    </div> */}
                      {item?.username}
                    </div>
                  </td>
                  <td>
                    <div
                      className="flex items-center underline text-[#2789ce] cursor-pointer"
                      onClick={onClickEditCreditRef}
                    >
                      {amountFormate(item?.creditRef)}
                      <FaPencilAlt className="ml-1" />
                    </div>
                  </td>
                  <td>
                    <div
                      className="flex items-center"
                      // onClick={onClickBalance}
                    >
                      {amountFormate(item?.balance)}

                      {/* <FaPlusSquare className="ml-1" size={15} /> */}
                    </div>
                  </td>

                  <td>{item?.exposure}</td>
                  <td>
                    {amountFormate(Number(item?.balance + item?.exposure))}
                  </td>
                  <td>
                    <div
                      className="flex items-center underline text-[#2789ce] cursor-pointer"
                      onClick={onClickEditExposureLimit}
                    >
                      {amountFormate(item?.exposureLimit)}
                      <FaPencilAlt className="ml-1" />
                    </div>
                  </td>
                  <td>
                    {amountFormate(Number(item?.balance + item?.creditRef))}
                  </td>
                  <td>
                    {item?.status === "Active" ? (
                      <div className="border border-[#bedca7] text-[#508d0e] text-[11px] bg-[#e5f1dc] w-fit flex items-center font-black px-1 py-[2px] rounded">
                        <FaCircle size={8} className="mr-1" />
                        Active
                      </div>
                    ) : item?.status === "suspended" ? (
                      <div className="border border-[#deb6c0] text-[#d0021b] text-[11px] bg-[#f2e2e6] w-fit flex items-center font-black px-1 py-[2px] rounded">
                        <FaCircle size={8} className="mr-1" />
                        Suspended
                      </div>
                    ) : (
                      <div className="border border-[#b9c5cd] text-[#5a7384] text-[11px] bg-[#e3e8eb] w-fit flex items-center font-black px-1 py-[2px] rounded">
                        <FaCircle size={8} className="mr-1" />
                        Locked
                      </div>
                    )}

                    {/*  */}
                    {/* */}
                  </td>
                  <td className="text-right w-[100px]">
                    <div className="flex items-center justify-end">
                      <div
                        onClick={() => {
                          onClickMenu("beating-history", item?._id);
                        }}
                        className="h-[26px] w-[26px] cursor-pointer ml-1"
                      >
                        <img src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/p_l.png" />
                      </div>
                      <div
                        onClick={() => {
                          onClickMenu("beating-history", item?._id);
                        }}
                        className="h-[26px] w-[26px] cursor-pointer ml-1"
                      >
                        <img src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/betting_history.png" />
                      </div>
                      <div
                        className="h-[26px] w-[26px] cursor-pointer ml-1"
                        onClick={onClickEditStatus}
                      >
                        <img src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/status.png" />
                      </div>
                      <div
                        onClick={() => {
                          onClickMenu("account-summery", item?._id);
                        }}
                        className="h-[26px] w-[26px] cursor-pointer ml-1"
                      >
                        <img src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/person.png" />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex justify-center  my-7">
        <Pagination
          onChangePerPage={onChangePerPage}
          totalResults={totalResults}
          currentPage={currentPage || 1}
          itemsPerPage={totalPage || 1}
          perPage={perPage}
          onChange={onRefreshPagination}
        />
      </div>
      <div className="">
        <div className="fixed right-0 bottom-0 mt-2 w-full border-t border-[#d4d4d4] bg-[#eeeeee] py-2">
          <div className="flex justify-end container">
            <div className="ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/bank.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Bank
              </span>
            </div>
            <div className="ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/p_l.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Betting Profit & Loss
              </span>
            </div>
            <div className="ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/betting_history.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Betting History
              </span>
            </div>
            <div className="ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/status.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Profile
              </span>
            </div>
            <div className="ml-1 flex items-center mr-2">
              <img
                src="https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/icons/person.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Change Status
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownLineUser;
