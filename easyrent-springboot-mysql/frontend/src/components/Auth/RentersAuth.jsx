import React from "react";
import { Outlet } from "react-router-dom";
import PageNotFound from "../../pages/PageNotFound";

const RentersAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.userType === "renter" ? <Outlet /> : <PageNotFound />;
};

export default RentersAuth;
