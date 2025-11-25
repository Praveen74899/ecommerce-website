import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';

const AddEditForm = ({ onClose, onUserAdded, user }) => {

  const [formData, setFormData] = useState({
    forname: '',
    surname: '',
    email: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.put(`/users/${user ? user._id : ''}`, formData);
      toast.success(response.data.message || "User updated successfully");

      onUserAdded();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">

      {/* Background blur + light dim */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Modal Box */}
      <div className="bg-white rounded-xl shadow-2xl w-96 p-6 relative z-50 border border-gray-300">

        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-">
            {user ? "Edit User" : "Add User"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Name</label>
            <input
              type="text"
              value={formData.forname}
              onChange={(e) => setFormData({ ...formData, forname: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Surname</label>
            <input
              type="text"
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-md text-white ${
              loading ? 'bg-[#4E342E] hover:bg-[#3E2723] text-white cursor-not-allowed' : 'bg-[#4E342E] hover:bg-[#3E2723] text-white'
            } transition`}
          >
            {loading ? 'Saving...' : user ? 'Update User' : 'Add User'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AddEditForm;
