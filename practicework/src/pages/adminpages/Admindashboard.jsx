import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import { Outlet } from "react-router-dom";

const Admindashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Navbar setIsOpen={setIsOpen} />
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          <Outlet /> {/* 👈 Yaha routes ka content load hoga */}
        </main>
      </div>
    </div>
  );
};

export default Admindashboard;
