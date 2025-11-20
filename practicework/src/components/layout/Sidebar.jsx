// import React from "react";
// import { X } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// const Sidebar = ({ isOpen, setIsOpen }) => {
//    const { logout } = useAuth();
//     const navigate = useNavigate();
//    const handleLogout = () => {
//     logout();           // clear token
//     navigate("/"); // go to login page
//   };
//   return (
//     <>
//   {/* Desktop Sidebar */}
//   <div className="hidden md:flex md:flex-col w-64 bg-gray-100 text-gray-700 p-6 h-screen shadow-lg lg:shadow-lg">
//     <h2 className="text-2xl font-semibold text-gray-800 mb-8">Admin Panel</h2>
//     <nav className="space-y-4">
//       <Link to="/admin/dashboard" className="block hover:bg-gray-100 text-gray-700 font-semibold p-3 rounded-md text-lg transition duration-300">Dashboard</Link>
//       <Link to="/admin/users" className="block hover:bg-gray-100 text-gray-700 p-3 rounded-md text-lg transition duration-300">Users</Link>
//       <Link to="/admin/importproduct" className="block hover:bg-gray-100 text-gray-700 p-3 rounded-md text-lg transition duration-300">ImportProduct</Link>
//       <Link to="/admin/reports" className="block hover:bg-gray-100 text-gray-700 p-3 rounded-md text-lg transition duration-300">Reports</Link>
//       <Link to="/admin/settings" className="block hover:bg-gray-100 text-gray-700 p-3 rounded-md text-lg transition duration-300">Settings</Link>
      
//     </nav>
//   </div>

//   {/* Mobile Sidebar */}
//   <div
//     className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-700 p-6 transform ${
//       isOpen ? "translate-x-0" : "-translate-x-full"
//     } transition-transform duration-300 md:hidden z-50 shadow-lg`}
//   >
//     <div className="flex justify-between items-center mb-6">
//       <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
//       <button onClick={() => setIsOpen(false)} className="text-gray-700">
//         <X size={24} />
//       </button>
//     </div>
//     <nav className="space-y-2">
//       <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block hover:bg-gray-100 text-gray-700 p-3 rounded-md text-lg transition duration-300">Dashboard</Link>
//       <Link to="/admin/users" onClick={() => setIsOpen(false)} className="block hover:bg-gray-100 text-gray-700 p-3 rounded-md text-lg transition duration-300">Users</Link>
//       <Link to="/admin/projects" onClick={() => setIsOpen(false)} className="block hover:bg-gray-100 text-gray-700 p-3 rounded-md text-lg transition duration-300">Projects</Link>
//       <Link to="/admin/reports" onClick={() => setIsOpen(false)} className="block hover:bg-gray-100 text-gray-700 p-3 rounded-md text-lg transition duration-300">Reports</Link>
//       <Link to="/admin/settings" onClick={() => setIsOpen(false)} className="block hover:bg-gray-100 text-gray-700 p-3 rounded-md text-lg transition duration-300">Settings</Link>
// <button
//         onClick={() => {
//           handleLogout();
//           setIsOpen(false); // mobile sidebar close
//         }}
//         className="block w-full text- text-gray-900 hover:bg-red-600 p-3 rounded-md bg-red-500 text-lg transition duration-300"
//       >
//         Logout
//       </button>
//     </nav>
//   </div>

//   {/* Overlay */}
//   {isOpen && (
//     <div
//       onClick={() => setIsOpen(false)}
//       className="fixed inset-0 bg-black opacity-40 md:hidden"
//     ></div>
//   )}
// </>



//   );
// };

// export default Sidebar;
import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
const location = useLocation();
const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Import Product", path: "/admin/importproduct" },
    {name:"Category",path:"/admin/category"},
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <>
      {/* ==================== DESKTOP SIDEBAR ==================== */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r shadow-lg z-50 border-gray-200 text-gray-700 p-6 h-screen ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Admin Panel</h2>

        <nav className="space-y-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`block p-3 rounded-md text-lg transition 
  ${isActive(item.path) ? "bg-gray-200 font-semibold text-yellow-600" : "hover:bg-gray-100 text-gray-700"}
`}
>
              {item.name}
            </Link>
          ))}

         
        </nav>
      </div>

      {/* ==================== MOBILE SIDEBAR ==================== */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-700 p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden z-50 shadow-lg`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block hover:bg-gray-100 p-3 rounded-md text-lg transition"
            >
              {item.name}
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="block w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-md text-lg transition"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* ==================== OVERLAY ==================== */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
