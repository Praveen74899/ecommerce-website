



// import React, { useState, useEffect } from "react";
// import {
//   Bell, User, LogOut, Settings, Info, Truck, Heart, LogIn, UserPlus
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import API from "../../utils/api";
// const menu = [
//   { name: "HOME", path: "/" },
//   { name: "BEST SELLER", path: "/shopbybestseller" },
//   { name: "NEW ARRIVALS", path: "/newarrivals" },
//   { name: "SHOP BY CATEGORY", path: "/shopbycategory" },

// ];


// export default function UserNavbar() {
//   const [profileOpen, setProfileOpen] = useState(false);
//   //  const [search, setSearch] = useState("");
//   //  const [searchData, setSearchData] = useState([]);
//   const navigate = useNavigate();
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [categories, setCategories] = useState([]);

//   const token = localStorage.getItem("token");


//   const handleSearch = async (value) => {
//     if (!value.trim()) {
//       setSearchData([]);
//       return;
//     }

//     try {
//       const res = await API.get(`/user/searchproduct/${value}`);
//       setSearchData(res.data.product);
//     } catch (err) {
//       console.log(err);
//     }
//   };




//   useEffect(() => {
//     API.get("/user/categories")
//       .then((res) => {
//         setCategories(res.data.categories);
//         console.log("Category Data:", res.data.categories);
//       })
//       .catch((err) => {
//         console.error("Category Fetch Error:", err);
//       });
//   }, []);


//   return (
 
//     <>
//   <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
//     <div className="max-w-7xl mx-auto px-6 py-[24px] flex items-center justify-between">

//       {/* BRAND NAME — EXACT SADYASKA STYLE */}
//       <h1
//         onClick={() => navigate("/")}
//         className="text-[23px] font-medium tracking-[4px] uppercase cursor-pointer text-[#1A1A1A] hover:text-[#333] transition-all"
//         style={{ fontFamily: "serif" }}
//       >
//         SOFT HOME ESSENTIALS
//       </h1>

//       {/* RUNNING TEXT */}
//       <div className="hidden md:flex items-center w-1/3 overflow-hidden ml-1">
//         <p className="text-[#1A1A1A] text-[13px] whitespace-nowrap animate-marquee tracking-wide">
//           Welcome to Soft Home Essentials – Premium Home Furnishing Collections – Shop Now!
//         </p>
//       </div>

//       {/* ICONS */}
//       <div className="flex items-center gap-7 text-[#1A1A1A]">

//         <Heart size={20} className="cursor-pointer hover:text-[#333] transition" />
//         <Bell size={20} className="cursor-pointer hover:text-[#333] transition" />

//         {/* PROFILE */}
//         <div className="relative">
//           <User
//             size={22}
//             className="cursor-pointer hover:text-[#333] transition"
//             onClick={() => setProfileOpen(!profileOpen)}
//           />

//           {/* PROFILE DROPDOWN — SADYASKA STYLE */}
//           {profileOpen && (
//             <div className="absolute right-0 mt-3 w-60 bg-white shadow-lg border border-gray-200 rounded-sm">

//               <div className="px-4 py-3 text-[#1A1A1A] font-medium bg-gray-50 uppercase tracking-wide text-sm">
//                 MY ACCOUNT
//               </div>

//               <button className="dropdown-item" onClick={() => navigate("/profile")}>
//                 <User size={18} /> Profile
//               </button>

//               <button className="dropdown-item" onClick={() => navigate("/settings")}>
//                 <Settings size={18} /> Settings
//               </button>

//               {!token && (
//                 <>
//                   <button className="dropdown-item" onClick={() => navigate("/signup")}>
//                     <UserPlus size={18} /> Signup
//                   </button>
//                   <button className="dropdown-item" onClick={() => navigate("/login")}>
//                     <LogIn size={18} /> Login
//                   </button>
//                 </>
//               )}

//               <button
//                 className="dropdown-item text-red-600 hover:bg-red-50"
//                 onClick={() => {
//                   localStorage.removeItem("token");
//                   localStorage.removeItem("role");
//                   navigate("/login");
//                 }}
//               >
//                 <LogOut size={18} /> Logout
//               </button>

//             </div>
//           )}
//         </div>
//       </div>
//     </div>

//     {/* CATEGORY BAR — EXACT SADYASKA LOOK */}
//     <div className="w-full bg-[#EDE6D8] border-t border-gray-300">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

//         {/* LEFT MENU */}
//         <div className="flex gap-10 font-medium text-[#1A1A1A] uppercase tracking-[2px] text-[13px]">

//           {menu.map((item) => (
//             <div key={item.name} className="relative">

//               {item.name === "SHOP BY CATEGORY" ? (
//                 <div
//                   className="relative"
//                   onMouseEnter={() => setCategoryOpen(true)}
//                   onMouseLeave={() => setCategoryOpen(false)}
//                 >
//                   <button className="hover:text-[#333] transition">
//                     {item.name}
//                   </button>

//                   {categoryOpen && (
//                     <div className="
//                       absolute left-0 w-48 bg-[#F4EFE6]
//                       shadow-[0_4px_20px_rgba(0,0,0,0.15)]
//                       border border-gray-200 
//                       py-2 rounded-sm z-50
//                     ">
//                       {categories
//                         .filter(c => c.status)
//                         .map((cat) => (
//                           <button
//                             key={cat._id}
//                             onClick={() => {
//                               navigate(`/getallcategory/${cat._id}`);
//                               setCategoryOpen(false);
//                             }}
//                             className="
//                               block w-full text-left px-4 py-2 
//                               text-[#1A1A1A] uppercase tracking-[1px] text-[13px]
//                               hover:bg-[#efe7da] transition
//                             "
//                           >
//                             {cat.name}
//                           </button>
//                         ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => navigate(item.path)}
//                   className="hover:text-[#333] transition"
//                 >
//                   {item.name}
//                 </button>
//               )}

//             </div>
//           ))}

//         </div>

//         {/* RIGHT BUTTONS */}
//         <div className="flex gap-8 items-center text-[#1A1A1A] font-medium uppercase tracking-[2px] text-[13px]">

//           <button onClick={() => navigate("/track-order")} className="hover:text-[#333] flex items-center gap-1">
//             <Truck size={18} /> ORDERS
//           </button>

//           <button onClick={() => navigate("/about")} className="hover:text-[#333] flex items-center gap-1">
//             <Info size={18} /> ABOUT
//           </button>

//         </div>
//       </div>
//     </div>
//   </nav>
// </>

//   );
// }






import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Bell, User, LogOut, Settings, Info, Truck, Heart, LogIn, UserPlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { jwtDecode } from "jwt-decode";

const menu = [
  { name: "HOME", path: "/" },
  { name: "BEST SELLER", path: "/shopbybestseller" },
  { name: "NEW ARRIVALS", path: "/newarrivals" },
  { name: "SHOP BY CATEGORY", path: "/shopbycategory" },

];


export default function UserNavbar() {
  const [profileOpen, setProfileOpen] = useState(false);
const location = useLocation();
const isWishlistPage = location.pathname === "/wishlist";

const [heartActive, setHeartActive] = useState(false);

    const token = localStorage.getItem("token");
    const decoded = token ? jwtDecode(token) : null;
    const userId = decoded?.id;
  
 
  const navigate = useNavigate();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);


  const [bestsellerOpen, setBestsellerOpen] = useState(false);
const [bestsellers, setBestsellers] = useState([]);

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




  useEffect(() => {
    API.get("/user/categories")
      .then((res) => {
        setCategories(res.data.categories);
        console.log("Category Data:", res.data.categories);
      })
      .catch((err) => {
        console.error("Category Fetch Error:", err);
      });
  }, []);


  useEffect(() => {
  // Option A: if API provides /user/bestsellers
  API.get("/user/getbestseller")
    .then(res => {
      setBestsellers(res.data.bestSellers || []);
    })
    .catch(err => {
       console.error("Error fetching bestsellers:", err);
    });
}, []);






  return (
 
    <>
  <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-6 py-[24px] flex items-center justify-between">

      {/* BRAND NAME — EXACT SADYASKA STYLE */}
      <h1
        onClick={() => navigate("/")}
        className="text-[23px] font-medium tracking-[4px] uppercase cursor-pointer text-[#1A1A1A] hover:text-[#333] transition-all"
        style={{ fontFamily: "serif" }}
      >
        SOFT HOME ESSENTIALS
      </h1>

      {/* RUNNING TEXT */}
      <div className="hidden md:flex items-center w-1/3 overflow-hidden ml-1">
        <p className="text-[#1A1A1A] text-[13px] whitespace-nowrap animate-marquee tracking-wide">
          Welcome to Soft Home Essentials – Premium Home Furnishing Collections – Shop Now!
        </p>
      </div>

      {/* ICONS */}
      <div className="flex items-center gap-7 text-[#1A1A1A]">
<Heart
  size={20}
  onClick={() => navigate("/wishlist")}
  className={`cursor-pointer transition
    ${isWishlistPage ? "text-red-500 fill-red-500" : "text-gray-700"}
  `}
/>



        <Bell size={20} className="cursor-pointer hover:text-[#333] transition" />

        {/* PROFILE */}
        <div className="relative">
          <User
            size={22}
            className="cursor-pointer hover:text-[#333] transition"
            onClick={() => setProfileOpen(!profileOpen)}
          />

          {/* PROFILE DROPDOWN — SADYASKA STYLE */}
         {profileOpen && (
  <div className="absolute right-0 mt-3 w-64 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] border border-gray-200 rounded-sm overflow-hidden z-50">

    {/* Header */}
    <div className="px-5 py-3 bg-[#F5F2EB] border-b border-gray-300">
      <p className="text-[13px] text-[#1A1A1A] font-semibold tracking-[2px] uppercase">
        My Account
      </p>
    </div>

    {/* Menu Items */}
    <div className="flex flex-col">

      {/* PROFILE */}
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-3 px-5 py-3 text-[14px] text-[#1A1A1A] hover:bg-[#EFE8DD] transition uppercase tracking-[1px]"
      >
        <User size={18} /> Profile
      </button>

      {/* SETTINGS */}
      <button
        onClick={() => navigate("/settings")}
        className="flex items-center gap-3 px-5 py-3 text-[14px] text-[#1A1A1A] hover:bg-[#EFE8DD] transition uppercase tracking-[1px]"
      >
        <Settings size={18} /> Settings
      </button>

      {/* SHOW SIGNUP + LOGIN IF NOT LOGGED IN */}
      {!token && (
        <>
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-3 px-5 py-3 text-[14px] text-[#1A1A1A] hover:bg-[#EFE8DD] transition uppercase tracking-[1px]"
          >
            <UserPlus size={18} /> Signup
          </button>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 px-5 py-3 text-[14px] text-[#1A1A1A] hover:bg-[#EFE8DD] transition uppercase tracking-[1px]"
          >
            <LogIn size={18} /> Login
          </button>
        </>
      )}

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
        }}
        className="flex items-center gap-3 px-5 py-3 text-[14px] text-red-600 hover:bg-red-50 transition uppercase tracking-[1px]"
      >
        <LogOut size={18} /> Logout
      </button>

    </div>
  </div>
)}

        </div>
      </div>
    </div>

    {/* CATEGORY BAR — EXACT SADYASKA LOOK */}
    <div className="w-full bg-[#EDE6D8] border-t border-gray-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* LEFT MENU */}
        <div className="flex gap-15 font-medium text-[#1A1A1A] uppercase tracking-[2px] text-[13px]">

          {menu.map((item) => (
            <div key={item.name} className="relative">

             {item.name === "SHOP BY CATEGORY" ? (
  // CATEGORY DROPDOWN
  <div
    className="relative"
    onMouseEnter={() => setCategoryOpen(true)}
    onMouseLeave={() => setCategoryOpen(false)}
  >
    <button className="hover:text-[#333] transition">{item.name}</button>

    {categoryOpen && (
      <div className="absolute left-0 w-40 bg-[#F4EFE6] shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-200 py-2 rounded-sm z-50">
        {categories
          .filter(c => c.status)
          .map((cat) => (
            <button
              key={cat._id}
              onClick={() => {
                navigate(`/getallcategory/${cat._id}`);
                setCategoryOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-[#1A1A1A] uppercase tracking-[1px] text-[13px] hover:bg-[#efe7da] transition"
            >
              {cat.name}
            </button>
          ))}
      </div>
    )}
  </div>
) : item.name === "BEST SELLER" ? (
  // BEST SELLER DROPDOWN
  <div
    className="relative"
    onMouseEnter={() => setBestsellerOpen(true)}
    onMouseLeave={() => setBestsellerOpen(false)}
  >
    <button className="hover:text-[#333] transition">{item.name}</button>

    {bestsellerOpen && (
      <div className="absolute left-0 w-30 bg-[#F4EFE6] shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-200 py-3 rounded-sm z-50">
        
        {bestsellers.length === 0 ? (
          <div className="px-4 py-2 text-sm">No items</div>
        ) : (
          bestsellers.slice(0, 8).map((bs) => (
            <button
              key={bs._id}
              onClick={() => {
                navigate(`/getallbestseller/${bs._id}`);
                setBestsellerOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-[#1A1A1A] uppercase tracking-[1px] text-[13px] hover:bg-[#efe7da] transition"
            >
              {bs.name}
            </button>
          ))
        )}
      </div>
    )}
  </div>
) : (
  // OTHER MENU ITEMS
  <button onClick={() => navigate(item.path)} className="hover:text-[#333] transition">
    {item.name}
  </button>
)}


            </div>
          ))}

        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-8 items-center text-[#1A1A1A] font-medium uppercase tracking-[2px] text-[13px]">

          <button onClick={() => navigate("/orders")} className="hover:text-[#333] flex items-center gap-1">
            <Truck size={18} /> ORDERS
          </button>

          <button onClick={() => navigate("/about")} className="hover:text-[#333] flex items-center gap-1">
            <Info size={18} /> ABOUT
          </button>

        </div>
      </div>
    </div>
  </nav>
</>

  );
}
