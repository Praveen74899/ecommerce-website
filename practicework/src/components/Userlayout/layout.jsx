import React from "react";
import UserNavbar from "./UserNavbar";
import { Outlet, useLocation } from "react-router-dom";


export default function Layout() {
  const location = useLocation();



  return (
    <>
      <UserNavbar />

      <div className="min-h-screen  mx-auto ">
        <Outlet />
      </div>
    </>
  );
}
