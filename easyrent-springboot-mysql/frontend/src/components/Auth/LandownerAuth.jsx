import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import PageNotFound from "../../pages/PageNotFound";

const LandownerAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.userType !== "landowner") {
    return <PageNotFound />;
  }

  return <Outlet />;
};

export default LandownerAuth;
