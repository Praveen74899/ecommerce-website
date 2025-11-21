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

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 ">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
          >
            Login
          </button>
        </form>
         <div className="text-center mt-4">
          <span className="text-sm">Don't have an account? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
