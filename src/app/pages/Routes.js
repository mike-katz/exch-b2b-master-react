import React from "react";
import { Route, Routes } from "react-router-dom";
// import Dashboard from "./dashboard/Dashboard";
import MyAccount from "./dashboard/MyAccount";
import Login from "./auth/Login";
import { AuthRoute, PrivateRoute } from "../component/common/PrivateRoute";
import DownLineMasterDetails from "./dashboard/Dashboard/DownLineMasterDetails";
import Banking from "./dashboard/Banking";
import DownListMaster from "./dashboard/Dashboard";
import DownLineUser from "./dashboard/DownListUser";
import CreditRefLogs from "./dashboard/CreditRefLogs";

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
        path="/banking"
        element={
          <PrivateRoute>
            <Banking />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default CustomRoutes;
