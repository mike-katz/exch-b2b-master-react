import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "../component/common/PrivateRoute";
import Login from "./auth/Login";
import BankingUser from "./dashboard/Banking/BankingUser";
import CreditRefLogs from "./dashboard/CreditRefLogs";
import DownListMaster from "./dashboard/Dashboard";
import DownLineMasterDetails from "./dashboard/Dashboard/DownLineMasterDetails";
import DownLineUser from "./dashboard/DownListUser";
import MyAccount from "./dashboard/MyAccount";
import BankingMaster from "./dashboard/Banking/BankingMaster";
import BankingLogs from "./dashboard/Banking/BankingLogs";
import AllBankingLogs from "./dashboard/Banking/AllBankingLogs";
import BetList from "./dashboard/BetList";
import MarketAnalytics from "./dashboard/MarketAnalytics";
import MarketAnalyticsDetail from "./dashboard/MarketAnalytics/detail";
import BetLock from "./dashboard/BetLock";
import AllBetHistory from "./dashboard/MarketAnalytics/AllBetHistory";
import News from "./dashboard/Extra/News";
import AllProfileLogs from "./dashboard/Dashboard/AllProfileLogs";
import ReportByMarket from "./dashboard/Report/ReportByMarket";
import ReportByUser from "./dashboard/Report/ReportByUser";
import BookHistory from "./dashboard/MarketAnalytics/BookHistory";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DownListMaster />
          </PrivateRoute>
        }
      />
      <Route
        path="/down-list-master"
        element={
          <PrivateRoute>
            <DownListMaster />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-account"
        element={
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        }
      />
      <Route
        path="/down-list-user"
        element={
          <PrivateRoute>
            <DownLineUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/down-list-master/details/:activeName/:userId"
        element={
          <PrivateRoute>
            <DownLineMasterDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/credit-ref-logs/:userId"
        element={
          <PrivateRoute>
            <CreditRefLogs />
          </PrivateRoute>
        }
      />
      <Route
        path="/banking-logs/:userId"
        element={
          <PrivateRoute>
            <BankingLogs />
          </PrivateRoute>
        }
      />
      <Route
        path="/banking-logs-all"
        element={
          <PrivateRoute>
            <AllBankingLogs />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile-logs-all/:userId"
        element={
          <PrivateRoute>
            <AllProfileLogs />
          </PrivateRoute>
        }
      />

      <Route
        path="/banking-user"
        element={
          <PrivateRoute>
            <BankingUser />
          </PrivateRoute>
        }
      />

      <Route
        path="/banking-master"
        element={
          <PrivateRoute>
            <BankingMaster />
          </PrivateRoute>
        }
      />

      <Route
        path="/bet-list"
        element={
          <PrivateRoute>
            <BetList />
          </PrivateRoute>
        }
      />

      <Route
        path="/market-analytics"
        element={
          <PrivateRoute>
            <MarketAnalytics />
          </PrivateRoute>
        }
      />
      <Route
        path="/bet-lock"
        element={
          <PrivateRoute>
            <BetLock />
          </PrivateRoute>
        }
      />

      <Route
        path="/market-analytics/:eventId"
        element={
          <PrivateRoute>
            <MarketAnalyticsDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/bet-history/:eventId"
        element={
          <PrivateRoute>
            <AllBetHistory />
          </PrivateRoute>
        }
      />

      <Route
        path="/news"
        element={
          <PrivateRoute>
            <News />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports-by-market"
        element={
          <PrivateRoute>
            <ReportByMarket />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports-by-user"
        element={
          <PrivateRoute>
            <ReportByUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/market-book-history/:exEventId/:exMarketId"
        element={
          <PrivateRoute>
            <BookHistory />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default CustomRoutes;
