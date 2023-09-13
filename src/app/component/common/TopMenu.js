import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/persistAction";
import MobileMenu from "./MobileMenu";

const TopMenu = () => {
  const [activeMenu, setActiveMenu] = useState("/");
  const { userData } = useSelector((state) => state?.persist);

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const onClickMenu = (menu) => {
    navigate(menu);
  };

  useEffect(() => {
    setActiveMenu(location?.pathname);
  }, [location]);

  const onCloseDrawer = () => {
    setIsVisibleDrawer(false);
  };

  const onOpenDrawer = () => {
    setIsVisibleDrawer(true);
  };

  const onClickLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(180deg, #ffcc2e 0%, #ffbd14 100%)",
      }}
      className="leading-[30px] flex items-center px-4"
    >
      <MobileMenu
        isMenuVisible={isVisibleDrawer}
        onCloseDrawer={onCloseDrawer}
      />
      <div className="container flex justify-between items-center">
        <div className="flex lg:hidden">
          <FiMenu onClick={onOpenDrawer} size={25} />
        </div>
        <div className="items-center lg:flex hidden">
          {userData?.roles?.toString() === "Agent" ? (
            <div
              onClick={() => {
                onClickMenu("/down-list-user");
              }}
              className={`text-[12px] text-[#000000] font-extrabold border-l border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer ${
                activeMenu === "/down-list-user"
                  ? "bg-[rgba(255,255,255,.2)]"
                  : ""
              }`}
            >
              Downline List
            </div>
          ) : (
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
                    onClickMenu("/down-list-master");
                  }}
                  className={`m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent ${
                    activeMenu === "/down-list-master"
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
          )}
          <div
            onClick={() => {
              onClickMenu("/my-account");
            }}
            className={`text-[12px] text-[#000000] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer ${
              activeMenu === "/my-account"
                ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                : ""
            }`}
          >
            My Account
          </div>
          <div
            onClick={() => {
              onClickMenu("/bet-list");
            }}
            className={`text-[12px] text-[#000000] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer ${
              activeMenu === "/bet-list"
                ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                : ""
            }`}
          >
            Bet List
          </div>
          <div
            onClick={() => {
              onClickMenu("/bet-lock");
            }}
            className={`text-[12px] text-[#000000] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer ${
              activeMenu === "/bet-lock"
                ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                : ""
            }`}
          >
            Bet Lock
          </div>
          <div
            onClick={() => {
              onClickMenu("/market-analytics");
            }}
            className={`text-[12px] text-[#000000] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer ${
              activeMenu === "/market-analytics"
                ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                : ""
            }`}
          >
            Market Analytics
          </div>
          {userData?.roles?.toString() === "Agent" ? (
            <div
              onClick={() => {
                onClickMenu("/banking-user");
              }}
              className="text-[12px] text-[#000000] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer"
            >
              Banking
            </div>
          ) : (
            <Menu placement="bottom-start">
              <MenuHandler>
                <Button
                  className={`rounded-none bg-transparent text-[12px] text-[#000000] font-extrabold border-0 border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer py-0 capitalize ${
                    activeMenu === "/banking-master" ||
                    activeMenu === "/banking-user"
                      ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                      : ""
                  }`}
                >
                  Banking
                  <FaCaretDown color="#000000" className="ml-1" />
                </Button>
              </MenuHandler>
              <MenuList className="bg-[#ffbd14] rounded-none border-none mt-[-5px] p-0 text-[12px] text-[#000000] font-extrabold">
                <MenuItem
                  onClick={() => {
                    onClickMenu("/banking-master");
                  }}
                  className={`m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent ${
                    activeMenu === "/banking-master"
                      ? "bg-[#ffdc7a] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                      : ""
                  } border-t border-[rgba(0,0,0,.2)]`}
                >
                  Banking Master
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickMenu("/banking-user");
                  }}
                  className={`m-0 rounded-none hover:bg-[rgba(255,255,255,.2)] focus:bg-transparent ${
                    activeMenu === "/banking-user"
                      ? "bg-[#ffdc7a]  shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                      : ""
                  } border-t border-[rgba(0,0,0,.2)]`}
                >
                  Banking User
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          {/* <Menu placement="bottom-start">
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
          </Menu> */}
        </div>
        <div className="flex items-center">
          {/* <div className="text-[12px] text-[#000000] font-extrabold">
            <span className="text-[rgba(0,0,0,.6)]  font-normal">
              Time Zone :
            </span>
            GMT+5:30
          </div> */}
          <div
            onClick={onClickLogout}
            className="text-[12px] text-[#000000] font-extrabold border-l border-r border-[rgba(0,0,0,.2)] px-2 ml-2 flex items-center hover:bg-[rgba(255,255,255,.2)] cursor-pointer"
          >
            Logout
            <FaSignOutAlt className="ml-1" color="#000000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
