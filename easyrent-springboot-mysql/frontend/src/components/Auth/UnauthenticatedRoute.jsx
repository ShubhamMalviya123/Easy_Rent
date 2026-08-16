import { Navigate, Outlet } from "react-router-dom";

const UnauthenticatedRoute = () => {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default UnauthenticatedRoute;
