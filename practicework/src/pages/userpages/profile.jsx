import React from "react";

export default function Profile() {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-600">

      <h2 className="text-3xl font-bold text-yellow-700 mb-4 text-center">
        My Profile
      </h2>

      {!user ? (
        <p className="text-center text-gray-600">No user data found</p>
      ) : (
        <div className="space-y-4 text-gray-700">

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Name:</span>
            <span>{user.forname} {user.surname}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Role:</span>
            <span className="capitalize">{user.role}</span>
          </div>

        </div>
      )}
    </div>
  );
}
