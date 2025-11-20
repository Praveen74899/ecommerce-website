import React from "react";
import UserNavbar from "../layout/UserNavbar";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../breadcrum";
const layout = () => {
  return (
    <>
      <UserNavbar />
      <div className="min-h-screen"> {/* navbar ki height adjust */}
        <Outlet />
      </div>
    </>
  );
};

export default layout;
