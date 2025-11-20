import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // For toast notifications (if needed)
import API from '../../utils/api';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await API.get('/admin/dashboard/stats'); // Update with actual URL
        if (response.data.success) {
          setDashboardData(response.data.data); // Set data to state
        } else {
          toast.error('Failed to fetch dashboard data.');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Something went wrong. Please try again later.');
      } finally {
        setLoading(false); // Stop loading when API call finishes
      }
    };
    fetchDashboardStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading component
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* Total Users Card */}
      <div className="bg-blue-50 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
        <p className="text-4xl text-blue-600 mt-2">{dashboardData.totalUsers}</p>
      </div>

      {/* Active Users Card */}
      <div className="bg-green-50 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Active Users</h2>
        <p className="text-4xl text-green-600 mt-2">{dashboardData.activeUsers}</p>
      </div>

      {/* Inactive Users Card */}
      <div className="bg-red-50 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Inactive Users</h2>
        <p className="text-4xl text-red-600 mt-2">{dashboardData.inactiveUsers}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
