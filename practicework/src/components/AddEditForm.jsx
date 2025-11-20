import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';

const AddEditForm = ({ onClose, onUserAdded, user }) => {
  
  
  // Initial form data state
  const [formData, setFormData] = useState({
    forname: '',
    surname: '',
    email: '',
    role: '', // Default role is 'user'
  });

  // Loading state to handle button disable
  const [loading, setLoading] = useState(false);

  // Pre-fill the form with user data when the user prop changes (for editing)
  useEffect(() => {
    if (user) {
      setFormData({
        forname: user.forname || '',
        surname: user.surname || '',
        email: user.email || '',
        role: user.role || '',
      });
    }
  }, [user]);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      const response = await API.put(`/users/${user ? user._id : ''}`, formData);
      toast.success(response.data.message || "User update successfully");

      onUserAdded(); // Re-fetch users after adding or editing
      onClose(); // Close the modal
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false); // Hide loading state after submission
    }
  };

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Name</label>
        <input
          type="text"
          value={formData.forname}
          onChange={(e) => setFormData({ ...formData, forname: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Surname</label>
        <input
          type="text"
          value={formData.surname}
          onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading} // Disable button when submitting
        className={`w-full py-2 mt-4 rounded-md ${loading ? 'bg-gray-300' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
      >
        {loading ? 'Saving...' : (user ? 'Update' : 'Add')} User
      </button>
    </form>

    {/* Close Button */}
    <button
      onClick={onClose}
      className="mt-4 text-gray-500 hover:text-gray-700 font-medium"
    >
      Close
    </button>
  </div>
</div>

  );
};

export default AddEditForm;
