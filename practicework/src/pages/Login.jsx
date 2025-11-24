import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const { login } = useAuth();


 

 const handleLogin = async (e) => {
  e.preventDefault();

  // ✅ Basic validations
  if (!email || !password) {
    toast.error("Please fill all fields");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return;
  }

  try {
    // 👇 API call
    const response = await axios.post("http://localhost:5000/api/v1/login", {
      email,
      password,
    });

    // 👇 Response handle
    if (response.data.success) {
      toast.success(response.data.message || "Login Successful!");

      // 👇 Save token & role in context/localStorage
      login(response.data.token, response.data.user.role);

      // 👇 Redirect according to role
      setTimeout(() => {
        if (response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 500);
    } else {
      toast.error(response.data.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error(
      error.response?.data?.message || "Something went wrong. Try again!"
    );
  }
};

  // return (
  //   <div className="flex justify-center items-center h-screen ">
  //     <div className="bg-white p-8 rounded-2xl shadow-md w-96 ">
  //       <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
  //       <form onSubmit={handleLogin}>
  //         <input
  //           type="email"
  //           placeholder="Enter Email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
  //         />
  //         <input
  //           type="password"
  //           placeholder="Enter Password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
  //         />
  //         <button
  //           type="submit"
  //           className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
  //         >
  //           Login
  //         </button>
  //       </form>
  //        <div className="text-center mt-4">
  //         <span className="text-sm">Don't have an account? </span>
  //         <button
  //           onClick={() => navigate("/signup")}
  //           className="text-blue-500 underline"
  //         >
  //           Sign Up
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
return (
  <div className="flex justify-center items-center h-screen bg-yellow-50">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border-t-4 border-yellow-600">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-5 text-yellow-700">
        Welcome Back
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Login to continue shopping
      </p>

      <form onSubmit={handleLogin}>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2.5 rounded-lg 
                     hover:bg-yellow-700 transition font-semibold shadow"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-5">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-2 text-gray-500 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Signup Link */}
      <div className="text-center mt-3">
        <span className="text-gray-600 text-sm">Don't have an account? </span>
        <button
          onClick={() => navigate("/signup")}
          className="text-yellow-700 font-semibold hover:underline"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
);

}
