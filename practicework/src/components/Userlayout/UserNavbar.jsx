
// import React, { useState } from "react";
// import { 
//   Bell, User, LogOut, Settings, Info, Truck, Heart, LogIn, UserPlus 
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const menu = [
//    {name:"Home",path:"/"},
//   { name: "Best Seller", path: "/shopbybestseller" },
//   { name: "New Arrivals", path: "/newarrivals" },
//   { name: "Shop by Category", path: "/shopbycategory" },

// ];


// export default function UserNavbar() {
//   const [profileOpen, setProfileOpen] = useState(false);

//   const navigate = useNavigate();

//   return (
//     <>
//       <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

//           {/* BRAND */} 
//           <h1
//             onClick={() => navigate("/")}
//             className="text-2xl font-bold text-yellow-800 cursor-pointer hover:text-yellow-600 transition"
//           >
//             Soft Home Essentials
//           </h1>

//           {/* RUNNING TEXT */}
//            <div className="hidden md:flex items-center w-1/3 overflow-hidden ml-1">

//             <p className="text-yellow-900 font-semibold whitespace-nowrap animate-marquee">
//               Welcome to   Soft Home Essentials – Premium Home Furnishing Collections – Shop Now!
//             </p>
//           </div>

//           {/* RIGHT ICONS */}
//           <div className="flex items-center gap-6 text-gray-700">

//             {/* WISHLIST */}
//             <Heart size={20} className="cursor-pointer hover:text-yellow-600 transition" />

//             {/* NOTIFICATION */}
//             <Bell size={20} className="cursor-pointer hover:text-yellow-600 transition" />

//             {/* PROFILE */}
//             <div className="relative">
//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="flex items-center gap-2"
//               >
//                 <User size={22} className="cursor-pointer" />
//               </button>

//               {/* DROPDOWN */}
//               {profileOpen && (
//                 <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl 
//                 border border-gray-100 overflow-hidden">

//                   <div className="px-4 py-2 text-gray-800 font-semibold bg-gray-100">
//                     My Account
//                   </div>

//                   <button 
//                     onClick={() => navigate("/profile")}
//                     className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
//                   >
//                     <User size={18} /> Profile
//                   </button>

//                   <button 
//                     onClick={() => navigate("/settings")}
//                     className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
//                   >
//                     <Settings size={18} /> Settings
//                   </button>

//                   {/* SIGNUP */}
//                   <button
//                     onClick={() => navigate("/signup")}
//                     className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800"
//                   >
//                     <UserPlus size={18} className="text-olive" /> 
//                     Signup
//                   </button>

//                   {/* LOGIN */}
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800"
//                   >
//                     <LogIn size={18} className="text-olive" /> 
//                     Login
//                   </button>

//                   {/* LOGOUT */}
//                   <button
//                     onClick={() => {
//                       localStorage.removeItem("token");
//                       localStorage.removeItem("role");
//                       navigate("/");
//                     }}
//                     className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 
//                     text-red-600 border-t"
//                   >
//                     <LogOut size={18} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>

//         {/* CATEGORY BAR */}
//        {/* <div className="w-full bg-gray-50 border-t border-gray-200">
//   <div className="max-w-7xl mx-auto px-4 py-3 flex gap-8 overflow-x-auto no-scrollbar 
//     font-semibold whitespace-nowrap text-gray-800">

//     {menu.map((item, i) => (
//       <button
//         key={i}
//         onClick={() => navigate(item.path)}
//         className="relative hover:text-yellow-600 transition group"
//       >
//         {item.name}
//         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-600 
//         group-hover:w-full transition-all"></span>
//       </button>
//     ))}
//   </div>
// </div> */}
// {/* CATEGORY BAR */}
// <div className="w-full bg-gray-50 border-t border-gray-200">
//   <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

//     {/* LEFT SIDE MENU */}
//     <div className="flex gap-8 overflow-x-auto no-scrollbar font-semibold whitespace-nowrap text-gray-800">
//       {menu.map((item, i) => (
//         <button
//           key={i}
//           onClick={() => navigate(item.path)}
//           className="relative hover:text-yellow-600 cursor-pointer transition group"
//         >
//           {item.name}

//         </button>
//       ))}
//     </div>

//     {/* RIGHT SIDE BUTTONS */}
//     <div className="flex gap-6 items-center text-gray-900 font-semibold">



//       {/* ORDERS */}
//       <button
//         onClick={() => navigate("/track-order")}
//         className="flex items-center gap-1 hover:text-yellow-600 transition"
//       >
//         <Truck size={20} />
//         <span>Orders</span>
//       </button>


//       {/* ABOUT */}
//       <button
//         onClick={() => navigate("/about")}
//         className="flex items-center gap-1 hover:text-yellow-600 transition"
//       >
//         <Info size={20} />
//         <span>About</span>
//       </button>

//     </div>

//   </div>
// </div>



//       </nav>
//     </>
//   );
// }



import React, { useState } from "react";
import {
  Bell, User, LogOut, Settings, Info, Truck, Heart, LogIn, UserPlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Home", path: "/" },
  { name: "Best Seller", path: "/shopbybestseller" },
  { name: "New Arrivals", path: "/newarrivals" },
  { name: "Shop by Category", path: "/shopbycategory" },

];


export default function UserNavbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  //  const [search, setSearch] = useState("");
  //  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  const handleSearch = async (value) => {
    if (!value.trim()) {
      setSearchData([]);
      return;
    }

    try {
      const res = await API.get(`/user/searchproduct/${value}`);
      setSearchData(res.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* BRAND */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-yellow-800 cursor-pointer hover:text-yellow-600 transition"
          >
            Soft Home Essentials
          </h1>

          {/* RUNNING TEXT */}
          <div className="hidden md:flex items-center w-1/3 overflow-hidden ml-1">

            <p className="text-yellow-900 font-semibold whitespace-nowrap animate-marquee">
              Welcome to   Soft Home Essentials – Premium Home Furnishing Collections – Shop Now!
            </p>
          </div>
          {/* <div className="relative">
  <input
    type="search"
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      handleSearch(e.target.value);
    }}
    placeholder="Search"
    className="hidden md:block w-40 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-600"
  />

  {searchData.length > 0 && (
    <div className="absolute top-10 w-64 bg-white shadow-lg rounded-lg border p-3 z-50">
      {searchData.map((item) => (
        <div
          key={item._id}
          onClick={() => {
            navigate(`/oneproduct/${item._id}`);
            setSearch("");
            setSearchData([]);
          }}
          className="cursor-pointer p-2 hover:bg-gray-100 rounded"
        >
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-gray-600">{item.title}</p>
        </div>
      ))}
    </div>
  )}
</div> */}



          {/* RIGHT ICONS */}
          <div className="flex items-center gap-6 text-gray-700">

            {/* WISHLIST */}
            <Heart size={20} className="cursor-pointer hover:text-yellow-600 transition" />

            {/* NOTIFICATION */}
            <Bell size={20} className="cursor-pointer hover:text-yellow-600 transition" />

            {/* PROFILE */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <User size={22} className="cursor-pointer" />
              </button>

              {/* DROPDOWN */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl 
                border border-gray-100 overflow-hidden">

                  <div className="px-4 py-2 text-gray-800 font-semibold bg-gray-100">
                    My Account
                  </div>

                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <User size={18} /> Profile
                  </button>

                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <Settings size={18} /> Settings
                  </button>

                  {/* SIGNUP */}

                  {!token && (
                    <button
                      onClick={() => navigate("/signup")}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800"
                    >
                      <UserPlus size={18} className="text-olive" />
                      Signup
                    </button>
                  )}
                  {/* LOGIN */}
                 {!token && (
  <button
    onClick={() => navigate("/login")}
    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800"
  >
    <LogIn size={18} className="text-olive" />
    Login
  </button>
)}


                  {/* LOGOUT */}
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      navigate("/login");
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 
                    text-red-600 border-t"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* CATEGORY BAR */}
        {/* <div className="w-full bg-gray-50 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-3 flex gap-8 overflow-x-auto no-scrollbar 
    font-semibold whitespace-nowrap text-gray-800">

    {menu.map((item, i) => (
      <button
        key={i}
        onClick={() => navigate(item.path)}
        className="relative hover:text-yellow-600 transition group"
      >
        {item.name}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-600 
        group-hover:w-full transition-all"></span>
      </button>
    ))}
  </div>
</div> */}
        {/* CATEGORY BAR */}
        <div className="w-full bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

            {/* LEFT SIDE MENU */}
            <div className="flex gap-8 overflow-x-auto no-scrollbar font-semibold whitespace-nowrap text-gray-800">
              {menu.map((item, i) => (
                <button
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="relative hover:text-yellow-600 cursor-pointer transition group"
                >
                  {item.name}

                </button>
              ))}
            </div>

            {/* RIGHT SIDE BUTTONS */}
            <div className="flex gap-6 items-center text-gray-900 font-semibold">



              {/* ORDERS */}
              <button
                onClick={() => navigate("/track-order")}
                className="flex items-center gap-1 hover:text-yellow-600 transition"
              >
                <Truck size={20} />
                <span>Orders</span>
              </button>


              {/* ABOUT */}
              <button
                onClick={() => navigate("/about")}
                className="flex items-center gap-1 hover:text-yellow-600 transition"
              >
                <Info size={20} />
                <span>About</span>
              </button>

            </div>

          </div>
        </div>



      </nav>
    </>
  );
}
