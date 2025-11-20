// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";
// import { useAuth } from "../context/AuthContext";
// const AddUserForm = ({ onClose, onUserAdded }) => {
//   const { role } = useAuth();
//   const navigate = useNavigate();
//   const [forname, setForName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
//   const isValidPassword = (pwd) => pwd.length >= 6;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!forname || !surname || !email || !password) {
//       toast.error("All fields are required");
//       return;
//     }

//     if (!isValidEmail(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     if (!isValidPassword(password)) {
//       toast.error("Password must be at least 6 characters long");
//       return;
//     }

//     try {
//       setLoading(true);
//      const response = await API.post(
//   "/createusers",
//   {
//     forname: forname,
//     surname: surname,
//     email,
//     password,
//     role: role
//   },
//   {
//     headers: {
//       "Content-Type": "application/json"
      
//     }
//   }
// );


//       if (response.data.success) {
//        toast.success(response.data.message || "User added successfully", {
//   autoClose: 1000,  
// });

//         // Reset fields
//         setForName("");
//         setSurname("");
//         setEmail("");
//         setPassword("");
//         onUserAdded(); // Notify parent component
//         onClose();
//         navigate("/admin/dashboard");
//       } else {
//         toast.error(response.data.message || "Failed to add user");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-gray-100 shadow-lg bg-opacity-30 backdrop-blur-sm z-40"
//         onClick={onClose}
//       ></div>

//       {/* Modal */}
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-2/3 lg:w-[40vw] max-h-[90vh] overflow-y-auto relative">
//           <h3 className="text-2xl font-bold mb-6 text-center">
//             Add New User
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="forName"
//               value={forname}
//               onChange={(e) => setForName(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
//             />
//             <input
//               type="text"
//               placeholder="Surname"
//               value={surname}
//               onChange={(e) => setSurname(e.target.value)}
//                             className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
//             />
//             <div className="flex justify-end gap-3 mt-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 rounded"
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddUserForm;

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

const AddUserForm = ({ onClose, onUserAdded }) => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [forname, setForName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation state
  const [errors, setErrors] = useState({
    forname: "",
    surname: "",
    email: "",
    password: "",
  });

  // Validations
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (pwd) => pwd.length >= 6;

  const validate = () => {
    let tempErrors = {};
    tempErrors.forname = forname ? "" : "Forname is required";
    tempErrors.surname = surname ? "" : "Surname is required";
    tempErrors.email = isValidEmail(email) ? "" : "Please enter a valid email address";
    tempErrors.password = isValidPassword(password)
      ? ""
      : "Password must be at least 6 characters long";

    setErrors(tempErrors);

    // Return true if no errors
    return !Object.values(tempErrors).some((x) => x !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


      const adminEmail = "admin@gmail.com"; // Replace with actual admin email
  if (email === adminEmail) {
    toast.error("You cannot use the admin's email address.");
    return;
  }

    if (!validate()) {
      return; // Stop submission if validation fails
    }

    try {
      setLoading(true);
      const response = await API.post(
        "/createusers",
        {
          forname: forname,
          surname: surname,
          email,
          password,
          role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "User added successfully", {
          autoClose: 1000,
        });

        // Reset fields
        setForName("");
        setSurname("");
        setEmail("");
        setPassword("");

        // Notify parent component to refresh the user list
        onUserAdded();
        onClose();
        navigate("/admin/users");
      } else {
        toast.error(response.data.message || "Failed to add user");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-100 shadow-lg bg-opacity-30 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-2/3 lg:w-[40vw] max-h-[90vh] overflow-y-auto relative">
          <h3 className="text-2xl font-bold mb-6 text-center">Add New User</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Forname */}
            <div>
              <label htmlFor="forname" className="text-sm font-semibold text-gray-700">
                Forname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="forname"
                placeholder="Forname"
                value={forname}
                onChange={(e) => setForName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              {errors.forname && (
                <p className="text-red-500 text-xs mt-1">{errors.forname}</p>
              )}
            </div>

            {/* Surname */}
            <div>
              <label htmlFor="surname" className="text-sm font-semibold text-gray-700">
                Surname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="surname"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              {errors.surname && (
                <p className="text-red-500 text-xs mt-1">{errors.surname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 rounded"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUserForm;

