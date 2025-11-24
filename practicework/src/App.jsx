
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Admindashboard from "./pages/adminpages/Admindashboard";
import DashboardHome from "./pages/adminpages/DashboardHome";
import Users from "./pages/adminpages/Users";
import ImportProduct from "./pages/adminpages/ImportProduct";
import Reports from "./pages/adminpages/Reports";
import Settings from "./pages/adminpages/Settings";
import Login from "./pages/Login";
import Userdashboard from "./pages/userpages/Userdashboard";
import OneProduct from "./pages/userpages/oneproduct";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./components/Userlayout/layout";
import Signup from "./pages/Signup";
import Category from "./pages/adminpages/AddCategory";
import GetAllCategory  from "./pages/userpages/GetAllCategory"
import ShopByCategory from "./pages/userpages/ShopByCategory";
import About from "./pages/userpages/About";
import BestSeller from "./pages/adminpages/BestSeller";
import GetAllBestSeller from "./pages/userpages/GetAllBestSeller";
import ShopByBestseller from "./pages/userpages/ShopByBestseller";
import NewArrivals from "./pages/userpages/NewArrivals";
import Profile from "./pages/userpages/profile";
import UserSettings from "./pages/userpages/Setting";
function App() {
  return (
<BrowserRouter>
  <Routes>

    {/* 🌎 Public User Layout */}
    <Route path="/" element={<UserLayout />}>
      <Route index element={<Userdashboard />} />
      <Route path="dashboard" element={<Userdashboard />} />
      <Route path="oneproduct/:id" element={<OneProduct />} />
      <Route path="shopbycategory" element={<ShopByCategory />} />
      <Route path="shopbybestseller" element={<ShopByBestseller />} />
      <Route path="getallcategory/:id" element={<GetAllCategory />} />
      <Route path="getallbestseller/:id" element={<GetAllBestSeller />} />

<Route path="newarrivals" element={<NewArrivals  />} />

       <Route path="about" element={<About />} />
    </Route>

    {/* 🔐 Login / Signup */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

<Route path="/profile" element={<Profile />} />
<Route path="/settings" element={<UserSettings />} />


    {/* 🔐 Admin Protected */}
   <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
    <Route path="/admin" element={<Admindashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="users" element={<Users />} />
        <Route path="importproduct" element={<ImportProduct />} />
        <Route path="category" element={<Category />} />
        <Route path="bestseller" element={<BestSeller />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
    </Route>
</Route>


    {/* 404 */}
    <Route path="*" element={<div>404 Page Not Found</div>} />
  </Routes>
</BrowserRouter>

  );
}

export default App;
