// import React from "react";
// import { Menu } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ setIsOpen }) => {
//   const { role, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header
//       className="
//       flex items-center justify-between 
//       bg-white 
//       p-4 
//       shadow-lg 
//       rounded-b-xl 
//       border-b 
//       border-gray-200 
//       sticky top-0 
//       z-50
//       "
//     >
//       {/* Mobile toggle button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="md:hidden text-gray-700"
//       >
//         <Menu size={24} />
//       </button>

//       <h1 className="text-lg md:text-xl font-semibold text-gray-800">
//         Welcome, Admin
//       </h1>

//       <div className="flex items-center space-x-4">
//         <button
//           className="bg-red-500 hidden md:block lg:block text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
//           onClick={() => {
//             handleLogout();
//             setIsOpen(false);
//           }}
//         >
//           Logout
//         </button>

//         {/* Round Avatar */}
//         <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
//           {role ? role.charAt(0).toUpperCase() : "A"}
//         </div>

//         {/* Role name */}
//         <span className="text-gray-700 font-medium hidden sm:block">
//           {role}
//         </span>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";
// import { Menu } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ setIsOpen }) => {
//   const { role, logout, email } = useAuth();
//   const navigate = useNavigate();

//   const [openProfile, setOpenProfile] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header
//       className="
//       flex items-center justify-between 
//       bg-white 
//       p-4 
//       shadow-lg 
//       rounded-b-xl 
//       border-b 
//       border-gray-200 
//       sticky top-0 
//       z-50
//       "
//     >
//       {/* Mobile toggle button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="md:hidden text-gray-700"
//       >
//         <Menu size={24} />
//       </button>

//       <h1 className="text-lg md:text-xl font-semibold text-gray-800">
//         Welcome, Admin
//       </h1>

//       {/* RIGHT SIDE: Role + Email + Profile Icon */}
//       <div className="relative flex items-center gap-3">

      

//         {/* Email */}
//         <p className="text-gray-500 text-xs">{email}</p>

//         {/* Profile Icon */}
//         <div
//           onClick={() => setOpenProfile(!openProfile)}
//           className="w-9 h-9 rounded-full bg-gray-700 cursor-pointer 
//           text-white flex items-center justify-center font-bold"
//         >
//           {role ? role.charAt(0).toUpperCase() : "A"}
//         </div>

//         {/* DROPDOWN */}
//         {openProfile && (
//           <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-md p-3 border">
//             <button
//               onClick={handleLogout}
//               className="w-full bg-red-500 text-white py-1.5 rounded-md text-sm hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsOpen }) => {
  const { role, logout, email } = useAuth();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    // <header className="flex items-center justify-between  bg-[#4E342E]  p-3 shadow-md border-b border-yellow-200 sticky top-0 z-50">

    //   {/* Mobile Menu Button */}
    //   <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-700">
    //     <Menu size={26} />
    //   </button>

    //   {/* Title */}
    //   <h1 className="text-lg md:text-xl font-semibold text-gray-800">Admin Dashboard</h1>

    //   {/* Right Side */}
    //   <div className="relative flex items-center gap-2">

    //     {/* Role + Email (ONLY DESKTOP) */}
    //     <div className="hidden md:block text-right">
    //       <p className="text-gray-800 font-medium text-sm">{role}</p>
    //       <p className="text-gray-500 text-xs">{email}</p>
    //     </div>

    //     {/* Avatar */}
    //     <div
    //       onClick={() => setOpenProfile(!openProfile)}
    //       className="w-9 h-9 bg-yellow-600 rounded-full text-white flex items-center justify-center cursor-pointer font-bold shadow-md"
    //     >
    //       {role ? role.charAt(0).toUpperCase() : "A"}
    //     </div>

    //     <ChevronDown
    //       size={18}
    //       onClick={() => setOpenProfile(!openProfile)}
    //       className="cursor-pointer text-gray-600"
    //     />

    //     {/* Dropdown */}
    //     {openProfile && (
    //       <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-4 border border-yellow-200 w-44">
    //         <button
    //           onClick={handleLogout}
    //           className="w-full bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-md text-sm"
    //         >
    //           Logout
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </header>

    <header className="
  flex items-center justify-between  
  bg-[#4E342E]  
  p-3 shadow-md 
  sticky top-0 
  z-50 
  text-white
">

  {/* Mobile Menu Button */}
  <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
    <Menu size={26} />
  </button>

  {/* Title */}
  <h1 className="text-lg md:text-xl font-semibold tracking-wide">
    Admin Dashboard
  </h1>

  {/* Right Side */}
  <div className="relative flex items-center gap-2">

    {/* Role + Email (Desktop Only) */}
    <div className="hidden md:block text-right">
      <p className="font-medium text-sm">{role}</p>
      <p className="text-xs opacity-80">{email}</p>
    </div>

    {/* Avatar */}
    <div
      onClick={() => setOpenProfile(!openProfile)}
      className="
        w-9 h-9 rounded-full 
        bg-[#6D4C41] 
        text-white 
        flex items-center justify-center cursor-pointer 
        font-bold shadow-lg
      "
    >
      {role ? role.charAt(0).toUpperCase() : "A"}
    </div>

    <ChevronDown
      size={18}
      onClick={() => setOpenProfile(!openProfile)}
      className="cursor-pointer text-white"
    />

    {/* Dropdown */}
    {openProfile && (
      <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-4 border border-[#4E342E] w-44 text-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    )}
  </div>
</header>

  );
};

export default Navbar;
