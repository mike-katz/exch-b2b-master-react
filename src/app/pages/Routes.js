import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import MyAccount from "./dashboard/MyAccount";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/my-account" element={<MyAccount />} />
    </Routes>
  );
};

export default CustomRoutes;
