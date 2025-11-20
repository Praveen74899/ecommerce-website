
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admindashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} /> {/* Default admin home */}
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="importproduct" element={<ImportProduct />} />
          <Route path="category" element={<Category />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />

        </Route>



        {/* ✅ User Protected Routes */}
       <Route
  path="/user"
  element={
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout />   
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<Userdashboard />} />
  <Route path="shopbycategory" element={<ShopByCategory />} />
  <Route path="oneproduct/:id" element={<OneProduct />} />
  <Route path="getallcategory/:id" element={<GetAllCategory />} />

</Route>
            
        {/* 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
