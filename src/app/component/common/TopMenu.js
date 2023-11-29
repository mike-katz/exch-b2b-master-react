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
import jwtDecode from "jwt-decode";

const TopMenu = () => {
  const [activeMenu, setActiveMenu] = useState("/");

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, themeColor } = useSelector((state) => state?.persist);

  {
    console.log({ themeColor });
  }

  const userData = jwtDecode(token);

  const role = userData?.roles?.toString();

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
        background: themeColor?.menuBgColor,
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
          {role === "Agent" ? (
            <div
              onClick={() => {
                onClickMenu("/down-list-user");
              }}
              style={{ color: themeColor?.menuTextColor }}
              className={`text-[12px] font-extrabold border-l border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${
                themeColor?.subHoverBgColor
              }] cursor-pointer ${
                activeMenu === "/down-list-user"
                  ? "bg-[rgba(255,255,255,.2)]"
                  : ""
              }`}
            >
              Downline List
            </div>
          ) : (
            <Menu placement="bottom-start">
              {role !== "Agent" && (
                <MenuHandler>
                  <Button
                    style={{ color: themeColor?.menuTextColor }}
                    className={`rounded-none bg-transparent text-[12px] font-extrabold border-0 border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${
                      themeColor?.subHoverBgColor
                    }] cursor-pointer py-0 capitalize ${
                      activeMenu === "/down-list-user" || activeMenu === "/"
                        ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                        : ""
                    }`}
                  >
                    Down List
                    <FaCaretDown
                      color={themeColor?.menuTextColor}
                      className="ml-1"
                    />
                  </Button>
                </MenuHandler>
              )}

              <MenuList
                className={`bg-[${themeColor?.subMenuBgColor}] rounded-none border-none mt-[-5px] p-0 text-[12px] font-extrabold text-[${themeColor?.subMenuTextColor}]`}
              >
                <MenuItem
                  onClick={() => {
                    onClickMenu("/down-list-master");
                  }}
                  className={`m-0 rounded-none hover:bg-[${
                    themeColor?.subHoverBgColor
                  }] focus:bg-transparent ${
                    activeMenu === "/down-list-master"
                      ? `bg-[${themeColor?.activeMenuBgColor}] text-[${themeColor?.activeMenuTextColor}] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]`
                      : ""
                  } border-t border-[rgba(0,0,0,.2)]`}
                >
                  Down List Master
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickMenu("/down-list-user");
                  }}
                  className={`m-0 rounded-none hover:bg-[${
                    themeColor?.subHoverBgColor
                  }] focus:bg-transparent ${
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
            style={{ color: themeColor?.menuTextColor }}
            className={`text-[12px] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${
              themeColor?.subHoverBgColor
            }] cursor-pointer ${
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
            style={{ color: themeColor?.menuTextColor }}
            className={`text-[12px] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${
              themeColor?.subHoverBgColor
            }] cursor-pointer ${
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
            style={{ color: themeColor?.menuTextColor }}
            className={`text-[12px] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${
              themeColor?.subHoverBgColor
            }] cursor-pointer ${
              activeMenu === "/bet-lock"
                ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                : ""
            }`}
          >
            Bet Lock
          </div>
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button
                style={{ color: themeColor?.menuTextColor }}
                className={`rounded-none bg-transparent text-[12px] font-extrabold border-0 border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${
                  themeColor?.subHoverBgColor
                }] cursor-pointer py-0 capitalize ${
                  activeMenu === "/down-list-user" || activeMenu === "/"
                    ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                    : ""
                }`}
              >
                My Reports
                <FaCaretDown color="#000000" className="ml-1" />
              </Button>
            </MenuHandler>
            <MenuList
              className={`bg-[${themeColor?.subMenuBgColor}] rounded-none border-none mt-[-5px] p-0 text-[12px] font-extrabold text-[${themeColor?.subMenuTextColor}]`}
            >
              <MenuItem
                onClick={() => {
                  onClickMenu("/reports-by-client");
                }}
                className={`m-0 rounded-none hover:bg-[${
                  themeColor?.subHoverBgColor
                }] focus:bg-transparent ${
                  activeMenu === "/down-list-client"
                    ? `bg-[${themeColor?.activeMenuBgColor}] text-[${themeColor?.activeMenuTextColor}] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]`
                    : ""
                } border-t border-[rgba(0,0,0,.2)]`}
              >
                Report by Client
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onClickMenu("/reports-by-user");
                }}
                className={`m-0 rounded-none hover:bg-[${
                  themeColor?.subHoverBgColor
                }] focus:bg-transparent ${
                  activeMenu === "/reports-by-user"
                    ? `bg-[${themeColor?.activeMenuBgColor}] text-[${themeColor?.activeMenuTextColor}] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]`
                    : ""
                } border-t border-[rgba(0,0,0,.2)]`}
              >
                Report by User
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onClickMenu("/reports-by-market");
                }}
                className={`m-0 rounded-none hover:bg-[${
                  themeColor?.subHoverBgColor
                }] focus:bg-transparent ${
                  activeMenu === "/reports-by-market"
                    ? "bg-[#ffdc7a]  shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                    : ""
                } border-t border-[rgba(0,0,0,.2)]`}
              >
                Report by Market
              </MenuItem>
            </MenuList>
          </Menu>
          <div
            onClick={() => {
              onClickMenu("/market-analytics");
            }}
            style={{ color: themeColor?.menuTextColor }}
            className={`text-[12px] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${
              themeColor?.subHoverBgColor
            }] cursor-pointer ${
              activeMenu === "/market-analytics"
                ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                : ""
            }`}
          >
            Market Analytics
          </div>
          {role === "Agent" ? (
            <div
              onClick={() => {
                onClickMenu("/banking-user");
              }}
              style={{ color: themeColor?.menuTextColor }}
              className="text-[12px] font-extrabold border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${themeColor?.subHoverBgColor}] cursor-pointer"
            >
              Banking
            </div>
          ) : (
            <Menu placement="bottom-start">
              <MenuHandler>
                <Button
                  style={{ color: themeColor?.menuTextColor }}
                  className={`rounded-none bg-transparent text-[12px] font-extrabold border-0 border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${
                    themeColor?.subHoverBgColor
                  }] cursor-pointer py-0 capitalize ${
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
              <MenuList
                className={`bg-[${themeColor?.subMenuBgColor}] rounded-none border-none mt-[-5px] p-0 text-[12px] font-extrabold text-[${themeColor?.subMenuTextColor}]`}
              >
                <MenuItem
                  onClick={() => {
                    onClickMenu("/banking-master");
                  }}
                  className={`m-0 rounded-none hover:bg-[${
                    themeColor?.subHoverBgColor
                  }] focus:bg-transparent ${
                    activeMenu === "/banking-master"
                      ? `bg-[${themeColor?.activeMenuBgColor}] text-[${themeColor?.activeMenuTextColor}] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]`
                      : ""
                  } border-t border-[rgba(0,0,0,.2)]`}
                >
                  Banking Master
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickMenu("/banking-user");
                  }}
                  className={`m-0 rounded-none hover:bg-[${
                    themeColor?.subHoverBgColor
                  }] focus:bg-transparent ${
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

          <Menu placement="bottom-start">
            <MenuHandler>
              <Button
                style={{ color: themeColor?.menuTextColor }}
                className={`rounded-none bg-transparent text-[12px] font-extrabold border-0 border-r border-[rgba(0,0,0,.2)] px-2 flex items-center hover:bg-[${
                  themeColor?.subHoverBgColor
                }] cursor-pointer py-0 capitalize ${
                  activeMenu === "/news"
                    ? "bg-[rgba(255,255,255,.2)] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]"
                    : ""
                }`}
              >
                Extra
                <FaCaretDown color="#000000" className="ml-1" />
              </Button>
            </MenuHandler>
            <MenuList
              className={`bg-[${themeColor?.subMenuBgColor}] rounded-none border-none mt-[-5px] p-0 text-[12px] font-extrabold text-[${themeColor?.subMenuTextColor}]`}
            >
              <MenuItem
                onClick={() => {
                  onClickMenu("/news");
                }}
                className={`m-0 rounded-none hover:bg-[${
                  themeColor?.subHoverBgColor
                }] focus:bg-transparent ${
                  activeMenu === "/news"
                    ? `bg-[${themeColor?.activeMenuBgColor}] text-[${themeColor?.activeMenuTextColor}] shadow-[inset_0_0px_5px_0_rgba(83,33,33,0.5)]`
                    : ""
                } border-t border-[rgba(0,0,0,.2)]`}
              >
                News
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="flex items-center">
          <div
            style={{ color: themeColor?.menuTextColor }}
            onClick={onClickLogout}
            className="text-[12px] font-extrabold border-l border-r border-[rgba(0,0,0,.2)] px-2 ml-2 flex items-center hover:bg-[${themeColor?.subHoverBgColor}] cursor-pointer"
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
