// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify'; // For toast notifications (if needed)
// import API from '../../utils/api';

// const AdminDashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     inactiveUsers: 0,
//   });
//   const [loading, setLoading] = useState(true); // To handle loading state

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const response = await API.get('/admin/dashboard/stats'); // Update with actual URL
//         if (response.data.success) {
//           setDashboardData(response.data.data); // Set data to state
//         } else {
//           toast.error('Failed to fetch dashboard data.');
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         toast.error('Something went wrong. Please try again later.');
//       } finally {
//         setLoading(false); // Stop loading when API call finishes
//       }
//     };
//     fetchDashboardStats();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Or a spinner/loading component
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//       {/* Total Users Card */}
//       <div className="bg-blue-50 shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
//         <p className="text-4xl text-blue-600 mt-2">{dashboardData.totalUsers}</p>
//       </div>

//       {/* Active Users Card */}
//       <div className="bg-green-50 shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-gray-800">Active Users</h2>
//         <p className="text-4xl text-green-600 mt-2">{dashboardData.activeUsers}</p>
//       </div>

//       {/* Inactive Users Card */}
//       <div className="bg-red-50 shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-gray-800">Inactive Users</h2>
//         <p className="text-4xl text-red-600 mt-2">{dashboardData.inactiveUsers}</p>
//       </div>
//     </div>
//   );
// };

// // export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import API from "../../utils/api";
// import { toast } from "react-toastify";

// const AdminDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch dashboard stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await API.get("/admin/dashboard/stats");

//         if (response.data.success) {
//           setDashboardData(response.data.data);
//         } else {
//           toast.error("Failed to fetch dashboard stats");
//         }
//       } catch (error) {
//         console.log("Dashboard Error:", error);
//         toast.error("Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading || !dashboardData) {
//     return <div className="p-6 text-[#4E342E]">Loading...</div>;
//   }

//   const { users, categories, bestSellers, products } = dashboardData;

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//       {/* USERS CARD */}
//       <DashboardCard
//         title="Total Users"
//         total={users.total}
//         active={users.active}
//         inactive={users.inactive}
//         color="bg-[#D7CCC8]"
//         text="text-[#4E342E]"
//       />

//       {/* CATEGORIES CARD */}
//       <DashboardCard
//         title="Total Categories"
//         total={categories.total}
//         active={categories.active}
//         inactive={categories.inactive}
//         color="bg-[#EFEBE9]"
//         text="text-[#4E342E]"
//       />

//       {/* BEST SELLERS CARD */}
//       <DashboardCard
//         title="Total Best Sellers"
//         total={bestSellers.total}
//         active={bestSellers.active}
//         inactive={bestSellers.inactive}
//         color="bg-[#D7CCC8]"
//         text="text-[#4E342E]"
//       />

//       {/* PRODUCTS CARD */}
//       <DashboardCard
//         title="Total Products"
//         total={products.total}
//         active={products.active}
//         inactive={products.inactive}
//         color="bg-[#EFEBE9]"
//         text="text-[#4E342E]"
//       />

//     </div>
//   );
// };

// // 🔥 Reusable Brown-Themed Dashboard Card Component
// const DashboardCard = ({ title, total, active, inactive, color, text }) => (
//   <div className={`${color} shadow-lg rounded-xl p-6 border border-[#BCAAA4]`}>
//     <h2 className={`text-xl font-semibold ${text}`}>{title}</h2>

//     <p className="text-4xl font-bold mt-3 text-[#3E2723]">{total}</p>

//     <div className="flex justify-between mt-4 text-[#5D4037]">
//       <span className="font-medium">Active: {active}</span>
//       <span className="font-medium">Inactive: {inactive}</span>
//     </div>
//   </div>
// );

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";
import { Users, Folder, Star, Package } from "lucide-react";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/admin/dashboard/stats");

        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          toast.error("Failed to fetch dashboard stats");
        }
      } catch (error) {
        console.log("Dashboard Error:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !dashboardData) {
    return <div className="p-6 text-[#4E342E]">Loading...</div>;
  }

  const { users, categories, bestSellers, products } = dashboardData;

  return (
    <div className="p-6 bg-[#F7F3EF] min-h-screen ">

  
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <DashboardCard
        title="Total Users"
        total={users.total}
        active={users.active}
        inactive={users.inactive}
        icon={<Users size={40} />}
      />

      <DashboardCard
        title="Categories"
        total={categories.total}
        active={categories.active}
        inactive={categories.inactive}
        icon={<Folder size={40} />}
      />

      <DashboardCard
        title="Best Sellers"
        total={bestSellers.total}
        active={bestSellers.active}
        inactive={bestSellers.inactive}
        icon={<Star size={40} />}
      />

      <DashboardCard
        title="Products"
        total={products.total}
        active={products.active}
        inactive={products.inactive}
        icon={<Package size={40} />}
      />

    </div>
      </div>
  );
};

// 🔥 UNIVERSAL BROWN THEMED CARD
const DashboardCard = ({ title, total, active, inactive, icon }) => (
  <div
    className="
      bg-gradient-to-br from-[#6D4C41] to-[#4E342E]
      text-white p-6 rounded-xl shadow-lg
      hover:scale-[1.03] hover:shadow-2xl
      transition-all duration-300 ease-in-out
    "
  >
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="opacity-80">{icon}</div>
    </div>

    <p className="text-5xl font-bold mt-4">{total}</p>

    <div className="flex justify-between mt-4 text-sm">
      <span className="bg-white/20 px-3 py-1 rounded-full">Active: {active}</span>
      <span className="bg-white/20 px-3 py-1 rounded-full">Inactive: {inactive}</span>
    </div>
  </div>
);

export default AdminDashboard;
