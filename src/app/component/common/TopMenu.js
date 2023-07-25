import React, { useEffect, useState } from "react";
import { FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

const TopMenu = () => {
  const [activeMenu, setActiveMenu] = useState("/");
  console.log({ activeMenu });
  const navigate = useNavigate();
  const location = useLocation();
  const onClickMenu = (menu) => {
    navigate(menu);
  };

  useEffect(() => {
    setActiveMenu(location?.pathname);
  }, [location]);

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(180deg, #ffcc2e 0%, #ffbd14 100%)",
      }}
      className="leading-[30px] flex items-center"
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button
                className={`rounded-none bg-transparent text-[12px] text-[#000000] font-extrabold border-0 border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer py-0 capitalize ${
                  activeMenu === "/down-list-user" || activeMenu === "/"
                    ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                    : ""
                }`}
              >
                Down List
                <FaCaretDown color="#000000" className="ml-1" />
              </Button>
            </MenuHandler>
            <MenuList className="bg-[#ffbd14] rounded-none border-none mt-[-5px] p-0 text-[12px] text-[#000000] font-extrabold">
              <MenuItem
                onClick={() => {
                  onClickMenu("/");
                }}
                className={`m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent ${
                  activeMenu === "/"
                    ? "bg-[#ffdc7a] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                    : ""
                } border-t border-[rgba(0,0,0,.2)]`}
              >
                Down List Master
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onClickMenu("/down-list-user");
                }}
                className={`m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent ${
                  activeMenu === "/down-list-user"
                    ? "bg-[#ffdc7a]  shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                    : ""
                } border-t border-[rgba(0,0,0,.2)]`}
              >
                Down List User
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <div
            onClick={() => {
              onClickMenu("/");
            }}
            className={`text-[12px] text-[#000000] font-extrabold border-l border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer ${
              activeMenu === "/" ? "bg-[rgba(255,255,255,.2)]" : ""
            }`}
          >
            Downline List
          </div> */}
          <div
            onClick={() => {
              onClickMenu("/my-account");
            }}
            className={`text-[12px] text-[#000000] font-extrabold border-l border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer ${
              activeMenu === "/my-account" ? "bg-[rgba(255,255,255,.2)]" : ""
            }`}
          >
            My Account
          </div>
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button className="rounded-none bg-transparent text-[12px] text-[#000000] font-extrabold border-0 border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer py-0 capitalize">
                My Reports
                <FaCaretDown color="#000000" className="ml-1" />
              </Button>
            </MenuHandler>
            <MenuList className="bg-[#ffbd14] rounded-none border-none mt-[-5px] p-0 text-[12px] text-[#000000] font-extrabold">
              <MenuItem className="m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent active:bg-transparent border-t border-[rgba(0,0,0,.2)]">
                Profit/Loss Report by Downline
              </MenuItem>
              <MenuItem className="m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent active:bg-transparent border-t border-b border-[rgba(0,0,0,.2)]">
                Profit/Loss Report by Market
              </MenuItem>
            </MenuList>
          </Menu>
          <div className="text-[12px] text-[#000000] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer">
            Bet List
          </div>
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button
                style={{ fontWeight: 800 }}
                className="rounded-none bg-transparent text-[12px] text-[#000000] border-0 border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer py-0 capitalize"
              >
                Risk
                <FaCaretDown color="#000000" className="ml-1" />
              </Button>
            </MenuHandler>
            <MenuList className="bg-[#ffbd14] rounded-none border-none mt-[-5px] p-0 text-[12px] text-[#000000] font-extrabold">
              <MenuItem className="m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent active:bg-transparent border-t border-[rgba(0,0,0,.2)]">
                Risk Management
              </MenuItem>
            </MenuList>
          </Menu>
          <div className="text-[12px] text-[#000000] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer">
            Banking
          </div>
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button className="rounded-none bg-transparent text-[12px] text-[#000000] font-extrabold border-0 border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer py-0 capitalize">
                Player Log & Report
                <FaCaretDown color="#000000" className="ml-1" />
              </Button>
            </MenuHandler>
            <MenuList className="bg-[#ffbd14] rounded-none border-none mt-[-5px] p-0 text-[12px] text-[#000000] font-extrabold">
              <MenuItem className="m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent active:bg-transparent border-t border-[rgba(0,0,0,.2)]">
                Balance Log
              </MenuItem>
              <MenuItem className="m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent active:bg-transparent border-t border-[rgba(0,0,0,.2)]">
                Player Betting History
              </MenuItem>
              <MenuItem className="m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent active:bg-transparent border-t border-[rgba(0,0,0,.2)]">
                Player Profit and Loss
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="flex items-center">
          <div className="text-[12px] text-[#000000] font-extrabold">
            <span className="text-[rgba(0,0,0,.6)]  font-normal">
              Time Zone :
            </span>
            GMT+5:30
          </div>
          <div className="text-[12px] text-[#000000] font-extrabold border-l border-r border-[rgba(0,0,0,.2)] px-2 ml-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer">
            Logout
            <FaSignOutAlt className="ml-1" color="#000000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
