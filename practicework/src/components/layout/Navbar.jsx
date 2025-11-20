import React from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsOpen }) => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className="
      flex items-center justify-between 
      bg-white 
      p-4 
      shadow-lg 
      rounded-b-xl 
      border-b 
      border-gray-200 
      sticky top-0 
      z-50
      "
    >
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-gray-700"
      >
        <Menu size={24} />
      </button>

      <h1 className="text-lg md:text-xl font-semibold text-gray-800">
        Welcome, Admin
      </h1>

      <div className="flex items-center space-x-4">
        <button
          className="bg-red-500 hidden md:block lg:block text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => {
            handleLogout();
            setIsOpen(false);
          }}
        >
          Logout
        </button>

        {/* Round Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
          {role ? role.charAt(0).toUpperCase() : "A"}
        </div>

        {/* Role name */}
        <span className="text-gray-700 font-medium hidden sm:block">
          {role}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
