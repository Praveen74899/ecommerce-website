import React from "react";

export default function Settings() {
  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-600">

      <h2 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
        Settings
      </h2>

      <div className="space-y-6 text-gray-800">

        {/* Change Password */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg">Change Password</h3>
          <p className="text-gray-600 text-sm mt-1">
            Update your password for account security.
          </p>
        </div>

        {/* Delete Account */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg text-red-600">Delete Account</h3>
          <p className="text-gray-600 text-sm mt-1">
            Permanently delete your account and all data.
          </p>
        </div>

        {/* Notifications */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <p className="text-gray-600 text-sm mt-1">
            Manage your email and SMS alerts.
          </p>
        </div>

      </div>

    </div>
  );
}
