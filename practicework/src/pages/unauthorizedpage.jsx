import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied 🚫</h1>
    <p className="text-gray-600 mb-6">You are not authorized to view this page.</p>
    <Link
      to="/login"
      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
    >
      Go to Login
    </Link>
  </div>
);

export default Unauthorized;
