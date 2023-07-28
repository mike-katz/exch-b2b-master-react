import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import MyAccount from "./dashboard/MyAccount";
import Login from "./auth/Login";
import { AuthRoute, PrivateRoute } from "../component/common/PrivateRoute";
import DownListUser from "./dashboard/Dashboard";
import DownLineMasterDetails from "./dashboard/Dashboard/DownLineMasterDetails";
import Banking from "./dashboard/Banking";

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
            <Dashboard />
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
            <DownListUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/down-list-master/details/:activeName"
        element={
          <PrivateRoute>
            <DownLineMasterDetails />
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
