import React, { useState } from "react";
import {
  FaCircle,
  FaDownload,
  FaPencilAlt,
  // FaPlusSquare,
  FaUndo,
  FaUserPlus,
} from "react-icons/fa";
// import Pagination from "../../../component/common/Pagination";
import Searching from "../../../component/form/Searching";
import CreditRefModal from "./CreditRefModal";
import ChangeStatusModal from "./ChangeStatusModal";
import EditExposureLimitModal from "./EditExposureLimitModal";
import AddPlayerModal from "./AddPlayerModal";
import { useNavigate } from "react-router-dom";

const DownListMaster = () => {
  const navigate = useNavigate();
  const [isVisibleEditCreditRef, setIsVisibleEditCreditRef] = useState(false);
  // const [isEnableBalanceView, setIsEnableBalanceView] = useState(false);
  const [isVisibleEditStatus, setIsVisibleEditStatus] = useState(false);
  const [isVisibleExposureLimit, setIsVisibleExposureLimit] = useState(false);
  const [isVisibleAddPlayer, setIsVisibleAddPlayer] = useState(false);

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

  const onClickMenu = (id) => {
    navigate(`/down-list-master/details/${id}`);
  };

  return (
    <div className="relative px-2">
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
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Searching />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-2 flex items-center">
          <div className="text-[12px] font-black">Status: </div>
          <select className="ml-2 w-full h-[30px] border border-[#cdcdcd] uppercase text-[#2b2b2b] text-[12px] px-[5px]">
            <option value="0">ACTIVE</option>
            <option value="1">SUSPENDED</option>
            <option value="2">LOCKED</option>
            <option value="-1">ALL</option>
          </select>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <button className="common-button text-[#000000] rounded px-2 text-[12px] font-semibold flex items-center justify-center h-[31px] border border-[#cdcdcd]">
            <FaDownload color="#000000" size={10} className="mr-1" /> Download
            CSV
          </button>
        </div>
        <div className="hidden md:block md:col-span-6 lg:col-span-3"></div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 flex items-center justify-end">
          <button
            onClick={onClickAddPlayer}
            className="common-button bg-[#FFFFFF] text-[#000000] rounded px-2 text-[12px] font-semibold flex items-center justify-center h-[31px] border border-[#cdcdcd]"
          >
            <FaUserPlus color="#000000" size={15} className="mr-1" /> Add Player
          </button>
          <button className="common-button bg-[#FFFFFF] text-[#000000] rounded px-2 text-[12px] font-semibold flex items-center justify-center h-[31px] border border-[#cdcdcd] ml-1">
            <FaUndo color="#000000" size={15} className="mr-1" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 my-4">
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Total Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR 1,119,779.92
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Total Exposure</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR <span className="text-[#d0021b]">(1,119,779.92)</span>
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Total Avail. bal.</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR 752,903.92
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR 3,387,364.67
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Available Balance</div>
          <div className="text-[#243a48] text-[15px] font-black">
            IR 4,140,268.59
          </div>
        </div>
        <div className="xl:col-span-2 md:col-span-4 col-span-6 px-2 flex flex-col justify-center bg-[#FFFFFF] border border-[#7e97a7] min-h-[53px]">
          <div className="text-[12px] text-[#9b9b9b]">Total Users</div>
          <div className="text-[#243a48] text-[15px] font-black">2525</div>
        </div>
      </div>
      <div className="table-responsive">
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
            <tr>
              <td>
                <div className="flex items-center">
                  <span className="w-[30px]">1.</span>{" "}
                  <div className="bg-[#568bc8] text-[10px] text-[#fff] uppercase w-[26px] h-[15px] flex justify-center items-center rounded mr-[5px]">
                    PL
                  </div>
                  12340ss
                </div>
              </td>
              <td>
                <div
                  className="flex items-center underline text-[#2789ce] cursor-pointer"
                  onClick={onClickEditCreditRef}
                >
                  0.00
                  <FaPencilAlt className="ml-1" />
                </div>
              </td>
              <td>
                <div
                  className="flex items-center"
                  // onClick={onClickBalance}
                >
                  13.00
                  {/* <FaPlusSquare className="ml-1" size={15} /> */}
                </div>
              </td>

              <td>0.00</td>
              <td>13.00</td>
              <td>
                <div
                  className="flex items-center underline text-[#2789ce] cursor-pointer"
                  onClick={onClickEditExposureLimit}
                >
                  200,000.00
                  <FaPencilAlt className="ml-1" />
                </div>
              </td>
              <td>13.00</td>
              <td>
                <div className="border border-[#bedca7] text-[#508d0e] text-[11px] bg-[#e5f1dc] w-fit flex items-center font-black px-1 py-[2px] rounded">
                  <FaCircle size={8} className="mr-1" />
                  Active
                </div>
                {/* <div className="border border-[#deb6c0] text-[#d0021b] text-[11px] bg-[#f2e2e6] w-fit flex items-center font-black px-1 py-[2px] rounded">
                <FaCircle size={8} className="mr-1" />
                Suspended
              </div> */}
                {/* <div className="border border-[#b9c5cd] text-[#5a7384] text-[11px] bg-[#e3e8eb] w-fit flex items-center font-black px-1 py-[2px] rounded">
                <FaCircle size={8} className="mr-1" />
                Locked
              </div> */}
              </td>
              <td className="text-right w-[100px]">
                <div className="flex items-center justify-end">
                  <div
                    onClick={() => {
                      onClickMenu("beating-history");
                    }}
                    className="h-[26px] w-[26px] cursor-pointer ml-1"
                  >
                    <img src="https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/icons/p_l.png" />
                  </div>
                  <div
                    onClick={() => {
                      onClickMenu("beating-history");
                    }}
                    className="h-[26px] w-[26px] cursor-pointer ml-1"
                  >
                    <img src="https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/icons/betting_history.png" />
                  </div>
                  <div
                    className="h-[26px] w-[26px] cursor-pointer ml-1"
                    onClick={onClickEditStatus}
                  >
                    <img src="https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/icons/status.png" />
                  </div>
                  <div
                    onClick={() => {
                      onClickMenu("account-summery");
                    }}
                    className="h-[26px] w-[26px] cursor-pointer ml-1"
                  >
                    <img src="https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/icons/person.png" />
                  </div>
                </div>
              </td>
            </tr>
            {/* {isEnableBalanceView && (
              <tr className="">
                <td className="bg-[#e2e8ed]" colSpan="3"></td>
                <td className="bg-[#e2e8ed] p-0" colSpan="6">
                  <table className="border-l border-[#7e97a7] w-full">
                    <tr className="border-b  border-[#7e97a7]">
                      <th width="12%" className="font-black px-[10px] py-[8px]">
                        Game
                      </th>
                      <th
                        width="13%"
                        className="font-black px-[10px] py-[8px ] text-right"
                      >
                        Balance
                      </th>
                      <th width="8%" className="px-[10px] py-[8px] text-right">
                        <div className="text-[#3b5160] bg-[rgba(94,190,255,.15)] border border-[#7e97a7] font-extrabold rounded text-[11px] flex justify-center items-center w-[70px] h-[25px] whitespace-nowrap">
                          Recall All
                        </div>
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th width="12%" className="px-[10px] py-[8px]">
                        Royal Gaming
                      </th>
                      <th width="13%" className="px-[10px] py-[8px] text-right">
                        0
                      </th>
                      <th width="8%" className="px-[10px] py-[8px] text-right">
                        <div className="text-[#3b5160] bg-[rgba(94,190,255,.15)] border border-[#7e97a7] font-extrabold rounded text-[11px] flex justify-center items-center w-[70px] h-[25px] whitespace-nowrap">
                          Recall
                        </div>
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th width="12%" className="px-[10px] py-[8px]">
                        SABA
                      </th>
                      <th width="13%" className="px-[10px] py-[8px] text-right">
                        0
                      </th>
                      <th width="8%" className="px-[10px] py-[8px] text-right">
                        <div className="text-[#3b5160] bg-[rgba(94,190,255,.15)] border border-[#7e97a7] font-extrabold rounded text-[11px] flex justify-center items-center w-[70px] h-[25px] whitespace-nowrap">
                          Recall
                        </div>
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th width="12%" className="px-[10px] py-[8px]">
                        BPoker
                      </th>
                      <th width="13%" className="px-[10px] py-[8px] text-right">
                        0
                      </th>
                      <th width="8%" className="px-[10px] py-[8px] text-right">
                        <div className="text-[#3b5160] bg-[rgba(94,190,255,.15)] border border-[#7e97a7] font-extrabold rounded text-[11px] flex justify-center items-center w-[70px] h-[25px] whitespace-nowrap">
                          Recall
                        </div>
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th width="12%" className="px-[10px] py-[8px]">
                        Sky Trader
                      </th>
                      <th width="13%" className="px-[10px] py-[8px] text-right">
                        0
                      </th>
                      <th width="8%" className="px-[10px] py-[8px] text-right">
                        <div className="text-[#3b5160] bg-[rgba(94,190,255,.15)] border border-[#7e97a7] font-extrabold rounded text-[11px] flex justify-center items-center w-[70px] h-[25px] whitespace-nowrap">
                          Recall
                        </div>
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th width="12%" className="px-[10px] py-[8px]">
                        Casino
                      </th>
                      <th width="13%" className="px-[10px] py-[8px] text-right">
                        0
                      </th>
                      <th width="8%" className="px-[10px] py-[8px] text-right">
                        <div className="text-[#3b5160] bg-[rgba(94,190,255,.15)] border border-[#7e97a7] font-extrabold rounded text-[11px] flex justify-center items-center w-[70px] h-[25px] whitespace-nowrap">
                          Recall
                        </div>
                      </th>
                      <th></th>
                    </tr>
                  </table>
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-7 mb:pb-0 pb-20">
        {/* <Pagination itemsPerPage={4} /> */}
      </div>
      <div className="">
        <div className="fixed right-0 bottom-0 mt-2 w-full border-t border-[#d4d4d4] bg-[#eeeeee] py-2 overflow-hidden overflow-x-auto">
          <div className="flex md:justify-end container flex-wrap">
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/icons/bank.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Bank
              </span>
            </div>
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/icons/p_l.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Betting Profit & Loss
              </span>
            </div>
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/icons/betting_history.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Betting History
              </span>
            </div>
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/icons/status.png"
                className="h-[26px] w-[26px]"
              />
              <span className="text-[11px] whitespace-nowrap ml-1 text-[#000000]">
                Profile
              </span>
            </div>
            <div className="mt-1 ml-1 flex items-center mr-2">
              <img
                src="https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/icons/person.png"
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

export default DownListMaster;
