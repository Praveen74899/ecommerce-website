// SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [forname, setForname] = useState("");  // First name
  const [surname, setSurname] = useState("");  // Last name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // ✅ Basic validations
    if (!forname || !surname || !email || !password) {
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
      // API call for sign-up
      const response = await axios.post("http://localhost:5000/api/v1/users/signup", {
        forname,
        surname,
        email,
        password,
        role,
      });
      console.log("Sign-up response:", response.data);

      if (response.data.success) {
        toast.success("Sign-up Successful!");

        // Save token & role in context/localStorage
        login(response.data.token, response.data.user.role);

        // After successful sign-up, directly navigate to the correct dashboard
        if (response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        toast.error(response.data.message || "Sign-up failed");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Try again!");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 items-center h-screen ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 ">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Enter First Name"
            value={forname}
            onChange={(e) => setForname(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
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
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4"></div>
          <span className="text-sm">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 underline"
          >
            Login
          </button>
      </div>

    </div>
  );
}
