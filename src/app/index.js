import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CustomRoutes from "./pages/Routes";
// import Header from './component/common/Header';
// import TopMenu from './component/common/TopMenu';
// import SideMenu from "./component/common/SideMenu";
import { ToastContainer } from "react-toastify";
// import WPSupport from './component/common/WPSupport';
import "react-toastify/dist/ReactToastify.css";

import Header from "./component/common/Header";
import TopMenu from "./component/common/TopMenu";
import News from "./component/common/News";
import { useDispatch, useSelector } from "react-redux";
import { getThemeColorData } from "./redux/services/themeColor";
import { GET_THEME_COLOR_RESPONSE } from "./redux/actions/themeColor";
import { Helmet } from "react-helmet";

const MainApp = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, themeColor } = useSelector((state) => state?.persist);

  // const DISABLE_MENU_ROUTE_LIST = [""];
  // useEffect(() => {
  //   setRouteList()
  // }, [location]);

  useEffect(() => {
    setThemeData();
  }, []);

  const setThemeData = async () => {
    const hours = 12;

    const now = new Date().getTime();
    const themeColor = localStorage.getItem("themeColor");
    // const themeColor = null;

    if (themeColor == null) {
      const data = await getThemeColorData();
      // const data = [];
      if (data?.data) {
        if (data?.data?.length === 0) {
          dispatch({
            type: GET_THEME_COLOR_RESPONSE,
            data: {
              headerBgColor:
                "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
              headerTextColor: "#ecad17",
              menuBgColor:
                "linear-gradient(rgb(255, 204, 46) 0%, rgb(255, 189, 20) 100%)",
              subMenuBgColor: "#ffbd14",
              subMenuTextColor: "#000000",
              subHoverBgColor: "rgba(255,255,255,.2)",
              menuTextColor: "#000000",
              activeMenuBgColor: "#ffdc7a",
              activeMenuTextColor: "#000000",
              origin: "http://localhost:3001",
            },
          });
          localStorage.setItem("themeColor", now);
        } else {
          dispatch({
            type: GET_THEME_COLOR_RESPONSE,
            data: data?.data?.[0],
          });
          localStorage.setItem("themeColor", now);
        }
      } else {
        dispatch({
          type: GET_THEME_COLOR_RESPONSE,
          data: {
            headerBgColor: "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
            headerTextColor: "#ecad17",
            menuBgColor:
              "linear-gradient(rgb(255, 204, 46) 0%, rgb(255, 189, 20) 100%)",
            subMenuBgColor: "#ffbd14",
            subMenuTextColor: "#000000",
            subHoverBgColor: "rgba(255,255,255,.2)",
            menuTextColor: "#000000",
            activeMenuBgColor: "#ffdc7a",
            activeMenuTextColor: "#000000",
            origin: "http://localhost:3001",
          },
        });
        localStorage.setItem("themeColor", now);
      }
    } else {
      if (now - themeColor > hours * 60 * 60 * 1000) {
        localStorage.clear();
        const data = await getThemeColorData();
        if (data?.data) {
          if (data?.data?.length === 0) {
            dispatch({
              type: GET_THEME_COLOR_RESPONSE,
              data: {
                headerBgColor:
                  "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
                headerTextColor: "#ecad17",
                menuBgColor:
                  "linear-gradient(rgb(255, 204, 46) 0%, rgb(255, 189, 20) 100%)",
                subMenuBgColor: "#ffbd14",
                subMenuTextColor: "#000000",
                subHoverBgColor: "rgba(255,255,255,.2)",
                menuTextColor: "#000000",
                activeMenuBgColor: "#ffdc7a",
                activeMenuTextColor: "#000000",
                origin: "http://localhost:3001",
              },
            });
            localStorage.setItem("themeColor", now);
          } else {
            dispatch({
              type: GET_THEME_COLOR_RESPONSE,
              data: data?.data?.[0],
            });
            localStorage.setItem("themeColor", now);
          }
        } else {
          dispatch({
            type: GET_THEME_COLOR_RESPONSE,
            data: {
              headerBgColor:
                "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
              headerTextColor: "#ecad17",
              menuBgColor:
                "linear-gradient(rgb(255, 204, 46) 0%, rgb(255, 189, 20) 100%)",
              subMenuBgColor: "#ffbd14",
              subMenuTextColor: "#000000",
              subHoverBgColor: "rgba(255,255,255,.2)",
              menuTextColor: "#000000",
              activeMenuBgColor: "#ffdc7a",
              activeMenuTextColor: "#000000",
              origin: "http://localhost:3001",
            },
          });
          localStorage.setItem("themeColor", now);
        }
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: isLoggedIn ? "#eeeeee" : "",
        minHeight: isLoggedIn ? "100vh" : "unset",
      }}
    >
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Helmet>
          <link rel="icon" href={themeColor?.faviconUrl} />
          <link rel="apple-touch-icon" href={themeColor?.faviconUrl} />
        </Helmet>
        <div>
          {!isLoggedIn ||
          window.location?.pathname?.includes("/credit-ref-logs/") ||
          window.location?.pathname?.includes("/banking-logs/") ||
          window.location?.pathname?.includes("/banking-logs-all") ||
          window.location?.pathname?.includes("/profile-logs-all") ? null : (
            <>
              <Header />
              <TopMenu />
              <div className="container px-2">
                <News />
              </div>
            </>
          )}
        </div>
        <div>
          <div className="xl:block hidden">
            <div className="fixed top-[147px] xl:top-[105px] left-0 w-[240px]">
              {/* <SideMenu /> */}
            </div>
          </div>
          {/* <div className="block lg:hidden">
          <MobileMenu />
        </div> */}
          {/* <div className="fixed top-[147px] xl:top-[105px] xl:left-[240px] z-[9] overflow-hidden overflow-y-auto">
          <div className="h-[calc(100vh-105px)] w-[100vw] xl:w-[calc(100vw-240px)]"> */}
          <div className="container">
            <CustomRoutes />
          </div>
          {/* </div>
        </div> */}
        </div>
      </Router>
    </div>
  );
};

export default MainApp;
