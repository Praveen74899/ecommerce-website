// components/ViewUserForm.js
import React from 'react';

const ViewUserForm = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">

      {/* Background blur + light dim */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Modal Box */}
      <div className="bg-white shadow-2xl p-6 rounded-xl w-96 ml-4 border border-gray-300 relative z-50">

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">
          User Details
        </h2>

        {/* Details */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm">Name</label>
          <p className="text-gray-900 font-medium mt-1">{user.forname} {user.surname}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 text-sm">Email</label>
          <p className="text-gray-900 font-medium mt-1">{user.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 text-sm">Role</label>
          <p className="text-gray-900 font-medium mt-1 capitalize">{user.role}</p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-[#4E342E] hover:bg-[#3E2723] text-white px-5 py-2 rounded-md  transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewUserForm;
