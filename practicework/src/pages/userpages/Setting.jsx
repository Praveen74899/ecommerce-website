import React from "react";

export default function Settings() {
  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-600">

      <h2 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
        Settings
      </h2>

      <div className="space-y-6 text-gray-800">

        {/* PROFILE INFO */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg">Account Information</h3>
          <p className="text-gray-600 text-sm mt-1">
            View and update your name, email, and personal details.
          </p>
        </div>

        {/* ADDRESS BOOK */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg">Address Book</h3>
          <p className="text-gray-600 text-sm mt-1">
            Manage your saved delivery addresses for faster checkout.
          </p>
        </div>

        {/* ORDER PREFERENCES */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg">Order Preferences</h3>
          <p className="text-gray-600 text-sm mt-1">
            Choose your default delivery options and save preferences.
          </p>
        </div>

        {/* NOTIFICATIONS */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <p className="text-gray-600 text-sm mt-1">
            Manage your email and SMS alerts.
          </p>
        </div>

        {/* THEME */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg">Theme & Appearance</h3>
          <p className="text-gray-600 text-sm mt-1">
            Switch between light and dark mode for your dashboard.
          </p>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg">Change Password</h3>
          <p className="text-gray-600 text-sm mt-1">
            Update your password for account security.
          </p>
        </div>

        {/* PRIVACY SETTINGS */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg">Privacy & Security</h3>
          <p className="text-gray-600 text-sm mt-1">
            Control visibility and secure your account.
          </p>
        </div>

        {/* DELETE ACCOUNT */}
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
          <h3 className="font-semibold text-lg text-red-600">Delete Account</h3>
          <p className="text-gray-600 text-sm mt-1">
            Permanently delete your account and all data.
          </p>
        </div>

      </div>

    </div>
  );
}
