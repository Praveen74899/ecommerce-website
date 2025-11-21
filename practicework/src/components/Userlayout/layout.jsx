import React from "react";
import UserNavbar from "./UserNavbar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumb from "../breadcrum";

export default function Layout() {
  const location = useLocation();

  // Hide breadcrumb on "/" and "/dashboard"
  const hideBreadcrumb =
    location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <>
      <UserNavbar />

      {/* Show breadcrumb only when NOT home or dashboard */}
      {!hideBreadcrumb && (
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Breadcrumb />
        </div>
      )}

      <div className="min-h-screen  mx-auto ">
        <Outlet />
      </div>
    </>
  );
}
