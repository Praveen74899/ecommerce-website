// import React, { useState } from "react";
// import { Bell, User, LogOut, Settings, Info, Truck } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function UserNavbar() {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const navigate = useNavigate();

//   const userName = "User";
//   const initial = userName.charAt(0).toUpperCase();

//   return (
//     <>
//       {/* ---------------- NAVBAR ---------------- */}
//       <nav className="bg-white sticky top-0 z-50 shadow-md  border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
//           {/* LEFT SIDE */}
//           <div className="flex items-center gap-3">
//             <div className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full  from-gray-700 to-black text-white font-bold text-lg shadow-sm">
//               {initial}
//             </div>

//             <h1 className="text-2xl font-bold bg-gradient-to-br from-yellow-600 to-gray-900 text-transparent bg-clip-text tracking-wide">
//               𝓶𝔂 𝗧𝗥𝗜𝗗𝗘𝗡𝗧
//             </h1>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex items-center gap-6">
//             <Info
//               size={24}
//               className="text-gray-700 cursor-pointer hover:text-gray-900 transition"
//               onClick={() => navigate("/about")}
//             />

//             <Truck
//               size={24}
//               className="text-gray-700 cursor-pointer hover:text-gray-900 transition"
//               onClick={() => navigate("/track-order")}
//             />

//             <Bell
//               size={24}
//               className="text-gray-700 cursor-pointer hover:text-gray-900 transition"
//             />

//             {/* PROFILE */}
//             <div className="relative">
//               <img
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 src="https://i.pravatar.cc/40"
//                 className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-gray-400 transition"
//               />

//               {profileOpen && (
//                 <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border overflow-hidden">
//                   <div className="px-4 py-2 text-gray-800 font-semibold bg-gray-50 border-b">
//                     My Account
//                   </div>

//                   <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-left text-gray-700">
//                     <User size={18} /> Profile
//                   </button>

//                   <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-left text-gray-700">
//                     <Settings size={18} /> Settings
//                   </button>

//                   <button
//                     onClick={() => {
//                       localStorage.removeItem("token");
//                       localStorage.removeItem("role");
//                       navigate("/");
//                     }}
//                     className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-left text-red-600 border-t"
//                   >
//                     <LogOut size={18} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
      

//       {/* ---------------- CATEGORY SECTION (MyTrident Style) ---------------- */}
//       <div className="w-full bg-white border-b">
//         <div className="flex overflow-x-auto no-scrollbar gap-6 justify-evenly py-3 px-4 text-sm font-semibold text-gray-800 whitespace-nowrap">

//           {/* Category Buttons */}
//           <button className="px-3 py-2 hover:text-yellow-600 transition">
//             Best Seller
//           </button>

//           <button className="px-3 py-2 hover:text-yellow-600 transition">
//             New Arrivals
//           </button>

//           <button
//             onClick={() => {
//                navigate("/user/shopbycategory");
//             }}
//           className="px-3 py-2 hover:text-yellow-600 transition">
//             Shop by Category
//           </button>

//           <button className="px-3 py-2 hover:text-yellow-600 transition">
//             Bed Sheets
//           </button>

//           <button className="px-3 py-2 hover:text-yellow-600 transition">
//             Blankets
//           </button>

//           <button className="px-3 py-2 hover:text-yellow-600 transition">
//             Curtains
//           </button>

//         </div>
//       </div>
//       </nav>
//     </>
//   );
// }
import React, { useState } from "react";
import { Bell, User, LogOut, Settings, Info, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* -------- LEFT SIDE -------- */}
          <h1
            onClick={() => navigate("/user/dashboard")}
            className="text-3xl font-bold cursor-pointer bg-gradient-to-r from-yellow-600 to-black 
            bg-clip-text text-transparent tracking-wide select-none"
          >
            myTRIDENT
          </h1>

          {/* -------- RIGHT SIDE ICONS -------- */}
          <div className="flex items-center gap-6 text-gray-700">

            <Info
              size={22}
              className="cursor-pointer hover:text-yellow-600 transition"
              onClick={() => navigate("/about")}
            />

            <Truck
              size={22}
              className="cursor-pointer hover:text-yellow-600 transition"
              onClick={() => navigate("/track-order")}
            />

            <Bell
              size={22}
              className="cursor-pointer hover:text-yellow-600 transition"
            />

            {/* -------- PROFILE DROPDOWN -------- */}
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 
                hover:ring-2 hover:ring-yellow-500 transition"
              />

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">

                  <div className="px-4 py-2 text-gray-700 font-semibold bg-gray-100">
                    My Account
                  </div>

                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                  >
                    <User size={18} /> Profile
                  </button>

                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                  >
                    <Settings size={18} /> Settings
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      navigate("/");
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-red-50 text-red-600 border-t"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ================= CATEGORY STRIP ================= */}
        <div className="w-full bg-white border-t border-gray-200">
          <div className="max-w-7xl justify-evenly mx-auto px-4 py-3 flex gap-6 overflow-x-auto no-scrollbar text-sm font-semibold whitespace-nowrap">

            <button className="hover:text-yellow-600 transition">
              Best Seller
            </button>

            <button className="hover:text-yellow-600 transition">
              New Arrivals
            </button>

            <button
              onClick={() => navigate("/user/shopbycategory")}
              className="hover:text-yellow-600 transition"
            >
              Shop by Category
            </button>

            <button className="hover:text-yellow-600 transition">
              Bed Sheets
            </button>

            <button className="hover:text-yellow-600 transition">
              Blankets
            </button>

            <button className="hover:text-yellow-600 transition">
              Curtains
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
