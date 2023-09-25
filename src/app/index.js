import React from "react";
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
import { useSelector } from "react-redux";

const MainApp = () => {
  const { isLoggedIn } = useSelector((state) => state?.persist);

  // const DISABLE_MENU_ROUTE_LIST = [""];
  // useEffect(() => {
  //   setRouteList()
  // }, [location]);

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
        <div>
          {!isLoggedIn ||
          window.location?.pathname?.includes("/credit-ref-logs/") ||
          window.location?.pathname?.includes("/banking-logs/") ||
          window.location?.pathname?.includes("/banking-logs-all") ? null : (
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
