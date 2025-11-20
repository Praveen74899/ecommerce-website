// components/ViewUserForm.js
import React from 'react';

const ViewUserForm = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50">
      <div className="bg-white shadow-lg p-6 rounded-md w-96 ml-4 border-l-4 border-gray-600"> {/* Added left border */}
        <h2 className="text-2xl font-semibold mb-4 shadow-md p-3">User Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <p>{user.forname} {user.surname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <p>{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <p>{user.role}</p>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserForm;
