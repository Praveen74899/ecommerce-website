import React, { useState } from "react";

export default function SettingPage() {
  const [profile, setProfile] = useState({
    name: "Praveen Patel",
    email: "praveen@example.com",
    phone: "9876543210",
  });

  const [password, setPassword] = useState({
    old: "",
    newPass: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [theme, setTheme] = useState("light");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <h1 className="text-3xl font-semibold">Settings</h1>

        {/* 1. PROFILE SETTINGS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputBox
              label="Full Name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
            <InputBox
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
            <InputBox
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
            />
          </div>

          <button className="mt-4 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800">
            Save Profile
          </button>
        </div>

        {/* 2. PASSWORD SETTINGS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputBox
              label="Old Password"
              name="old"
              type="password"
              value={password.old}
              onChange={handlePasswordChange}
            />
            <InputBox
              label="New Password"
              name="newPass"
              type="password"
              value={password.newPass}
              onChange={handlePasswordChange}
            />
            <InputBox
              label="Confirm Password"
              name="confirm"
              type="password"
              value={password.confirm}
              onChange={handlePasswordChange}
            />
          </div>

          <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Update Password
          </button>
        </div>

        {/* 3. NOTIFICATION SETTINGS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>

          <ToggleRow
            label="Email Notifications"
            value={notifications.email}
            onToggle={() => handleToggle("email")}
          />
          <ToggleRow
            label="SMS Alerts"
            value={notifications.sms}
            onToggle={() => handleToggle("sms")}
          />
          <ToggleRow
            label="Push Notifications"
            value={notifications.push}
            onToggle={() => handleToggle("push")}
          />

          <button className="mt-4 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800">
            Save Notification Settings
          </button>
        </div>

        {/* 4. THEME SETTINGS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Theme</h2>

          <div className="flex items-center gap-6">
            <ThemeButton
              label="Light"
              value="light"
              current={theme}
              onClick={() => setTheme("light")}
            />
            <ThemeButton
              label="Dark"
              value="dark"
              current={theme}
              onClick={() => setTheme("dark")}
            />
          </div>
        </div>

        {/* 5. DELETE ACCOUNT */}
        <div className="bg-white p-6 rounded-xl shadow border border-red-300">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Danger Zone
          </h2>
          <p className="text-gray-600 mb-4">
            Once you delete your account, all your data will be permanently removed.
          </p>

          <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

/* SMALL REUSABLE UI COMPONENTS */
function InputBox({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        {...props}
        className="border p-2 rounded-lg focus:ring focus:ring-gray-300"
      />
    </div>
  );
}

function ToggleRow({ label, value, onToggle }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-800">{label}</span>
      <button
        onClick={onToggle}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          value ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
            value ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
}

function ThemeButton({ label, value, current, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg border ${
        current === value
          ? "bg-black text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}
