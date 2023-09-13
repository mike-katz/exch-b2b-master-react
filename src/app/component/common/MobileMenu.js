import React from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Drawer } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const MobileMenu = ({ isMenuVisible, onCloseDrawer }) => {
  const navigate = useNavigate();
  const themeColor = useSelector((state) => state?.persist?.themeColor);

  const onClickMenu = (menu) => {
    onCloseDrawer();
    navigate(menu);
  };

  return (
    <>
      <div className="overflow-hidden overflow-y-auto top-0 left-0 z-[9999] xl:hidden">
        <Drawer open={isMenuVisible} onClose={onCloseDrawer}>
          <div
            style={{ backgroundColor: themeColor?.topHeaderBgColor }}
            className="h-full"
          >
            <div className="h-[50px] flex justify-center items-center">
              <img src={themeColor?.logoUrl} className="h-[40px] mr-5" />
            </div>

            <Sidebar rootStyles={{ minWidth: "auto", width: "100%" }}>
              <Menu
                menuItemStyles={{
                  root: {
                    width: "100%",
                  },
                  button: {
                    height: "fit-content",
                    minHeight: "30px",
                    paddingLeft: "5px !important",
                    color: "#000000",
                  },
                  label: {
                    fontSize: "13px",
                    whiteSpace: "normal",
                  },
                }}
              >
                <SubMenu
                  label={
                    <div className="flex w-full min-h-[30px]">
                      <div className="flex items-center justify-between w-full ml-2">
                        <span className="text-[13px] font-semibold py-1">
                          {"Down Line"}
                        </span>
                      </div>
                    </div>
                  }
                >
                  <MenuItem
                    onClick={() => {
                      onClickMenu("/down-list-master");
                    }}
                    rootStyles={{ paddingLeft: 5 }}
                  >
                    <div className="flex w-full min-h-[30px]">
                      <div className="flex items-center justify-between w-full border-b ml-2">
                        <span className="text-[13px] font-semibold py-1">
                          {"Down Line Master"}
                        </span>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onClickMenu("/down-list-user");
                    }}
                    rootStyles={{ paddingLeft: 5 }}
                  >
                    <div className="flex w-full min-h-[30px]">
                      <div className="flex items-center justify-between w-full border-b ml-2">
                        <span className="text-[13px] font-semibold py-1">
                          {"Down Line User"}
                        </span>
                      </div>
                    </div>
                  </MenuItem>
                </SubMenu>
                <MenuItem
                  onClick={() => {
                    onClickMenu("/my-account");
                  }}
                >
                  <div className="flex w-full min-h-[30px]">
                    <div className="flex items-center justify-between w-full border-b ml-2">
                      <span className="text-[13px] font-semibold py-1">
                        {"My Account"}
                      </span>
                    </div>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickMenu("/bet-list");
                  }}
                >
                  <div className="flex w-full min-h-[30px]">
                    <div className="flex items-center justify-between w-full border-b ml-2">
                      <span className="text-[13px] font-semibold py-1">
                        {"Bet List"}
                      </span>
                    </div>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickMenu("/bet-lock");
                  }}
                >
                  <div className="flex w-full min-h-[30px]">
                    <div className="flex items-center justify-between w-full border-b ml-2">
                      <span className="text-[13px] font-semibold py-1">
                        {"Bet Lock"}
                      </span>
                    </div>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickMenu("/market-analytics");
                  }}
                >
                  <div className="flex w-full min-h-[30px]">
                    <div className="flex items-center justify-between w-full border-b ml-2">
                      <span className="text-[13px] font-semibold py-1">
                        {"Market Analytics"}
                      </span>
                    </div>
                  </div>
                </MenuItem>
                <SubMenu
                  label={
                    <div className="flex w-full min-h-[30px]">
                      <div className="flex items-center justify-between w-full ml-2">
                        <span className="text-[13px] font-semibold py-1">
                          {"Banking"}
                        </span>
                      </div>
                    </div>
                  }
                >
                  <MenuItem
                    onClick={() => {
                      onClickMenu("/banking-master");
                    }}
                    rootStyles={{ paddingLeft: 5 }}
                  >
                    <div className="flex w-full min-h-[30px]">
                      <div className="flex items-center justify-between w-full border-b ml-2">
                        <span className="text-[13px] font-semibold py-1">
                          {"Banking Master"}
                        </span>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onClickMenu("/banking-user");
                    }}
                    rootStyles={{ paddingLeft: 5 }}
                  >
                    <div className="flex w-full min-h-[30px]">
                      <div className="flex items-center justify-between w-full border-b ml-2">
                        <span className="text-[13px] font-semibold py-1">
                          {"Banking User"}
                        </span>
                      </div>
                    </div>
                  </MenuItem>
                </SubMenu>
              </Menu>
            </Sidebar>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default MobileMenu;
