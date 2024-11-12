import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  let token = localStorage.getItem("token");
  return <div>{token ? <Outlet /> : <Navigate to={"/"} />}</div>;
};

export default ProtectedRoutes;
