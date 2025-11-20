
// import React, { useEffect, useState } from "react";
// import API from "../utils/api";
// import { toast } from "react-toastify";
// import AddUserForm from "../components/AddUserForm";
// import { Edit, Trash, Eye, User } from "lucide-react"; 
// import AddEditForm from "../components/AddEditForm";
// import ViewModal from "../components/ViewModal";
// const Users = () => {
//   const [users, setUsers] = useState([]); // All users
// const [allUsers, setAllUsers] = useState([]); 
//   const [currentPage, setCurrentPage] = useState(1); // Current page
//   const [totalPages, setTotalPages] = useState(1); // Total pages
//   const [usersPerPage] = useState(8); // Number of users per page
//   const [loading, setLoading] = useState(true); // Loading state
//   const [isModalOpen, setIsModalOpen] = useState(false);
// const [selectedUser, setSelectedUser] = useState(null); // To hold the user data for editing
//  const [isEditOpen, setIsEditOpen] = useState(false); // To control edit modal visibility
//    const [isViewOpen, setIsViewOpen] = useState(false); 
//   // Fetch all users once
//   const fetchUsers = async () => {
//     try {
//       const data = await API.get("/getallusers");
//       setUsers(data.data.users || []); // Store all users in state
//       setTotalPages(Math.ceil(data.data.users.length / usersPerPage)); // Calculate total pages
//       toast.success("Users fetched successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Get users for current page
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   // Handle previous page
//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Handle next page
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleUserAdded = () => {
//     fetchUsers(); // Re-fetch users after adding a new one
//   };

//   if (loading) return <div className="p-6">Loading users...</div>;

// const handleEdit = (user) => {
//   setSelectedUser(user);  // Set the user to be edited
//   setIsEditOpen(true);     // Open the edit modal
// };

//  const handleView = (user) => {
//     setSelectedUser(user);
//     setIsViewOpen(true); // Open view modal
//   };

//  function deletehandler(id){
//   API.delete(`/users/delete/${id}`).then((res)=>{
//     toast.success("User deleted successfully");
//      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
//   }).catch((err)=>{
//     toast.error("Failed to delete user");
//   });
//  }

// function searchhandler(e) {
//   const query = e.target.value.toLowerCase();

//   // Clear any previous timeout
//   if (searchTimeout) clearTimeout(searchTimeout);

//   searchTimeout = setTimeout(() => {
//     if (!query) {
//       fetchUsers(); // Call the fetch API when search is cleared
//     } else {
//       const filteredUsers = users.filter((user) => {
//         const name = `${user.forname} ${user.surname} ${user.email}`.toLowerCase();

//         // Check if query is part of the name anywhere
//         return name.startsWith(query) || name.includes(query);
//       });
//       setUsers(filteredUsers);
//     }
//   }, 500); // Adjust debounce delay as needed (in milliseconds)
// }

// let searchTimeout = null;


//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-5">
//         <h2 className="text-2xl lg:text-3xl font-bold mb-4">All Users</h2>
//               <div className="">
//                  <input
//           onChange={searchhandler}
//           type="text"
//           placeholder="Search users..."
//           className="border border-gray-300 rounded-md px-1 py-1 mr-2"
//         />
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-gray-700 hover:bg-gray-800 text-white h-9 px-3 rounded "
//         >
//           Add User
//         </button>
//               </div>
//       </div>

//       {currentUsers.length === 0 ? (
//         <p>No users found.</p>
//       ) : (

// <div className="sm:overflow-x-auto">
//   <table className="min-w-full table-auto shadow-lg rounded-lg overflow-x-auto">
//     <thead>
//       <tr className="bg-gray-200 text-gray-800">
//         <th className="py-3 px-4 text-left">Name</th>
//         <th className="py-3 px-4 text-left">Surname</th>
//         <th className="py-3 px-4 text-left">Email</th>
//         <th className="py-3 px-4 text-left">Role</th>
//         <th className="py-3 px-4 text-left">Actions</th> {/* New column for action buttons */}
//       </tr>
//     </thead>
//     <tbody>
//       {currentUsers.map((u, index) => (
//         <tr key={index} className="hover:bg-gray-100 bg-white">
//           <td className="py-3 px-4">{u.forname}</td>
//           <td className="py-3 px-4">{u.surname}</td>
//           <td className="py-3 px-4">{u.email}</td>
//           <td className="py-3 px-4 capitalize">{u.role}</td>
//           <td className="py-3 px-4 flex space-x-2 lg:space-x-3"> {/* Flex container for buttons */}
//             {/* View Button */}
//             <button 
//               onClick={() => handleView(u)}  // Implement handleView function
//               className="cursor-pointer"
//               >
//               <Eye size={20} />
//             </button>

//             {/* Edit Button */}
//            <button 
//   onClick={() => handleEdit(u)} 
//   className="cursor-pointer"
// >
//   <Edit size={20} />
// </button>


//             {/* Delete Button */}
//             <button 
//             onClick={() => deletehandler(u._id)} // Implement handleDelete function
//               className="text-red-500 hover:text-red-700 cursor-pointer">
//               <Trash size={20}  />
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-center md:justify-between mt-5 items-center">
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="bg-gray-600 text-white px-4 py-2 rounded-md"
//         >
//           Previous
//         </button>
//         <span className="text-sm self-center mx-4">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="bg-gray-600 text-white px-4 py-2 rounded-md"
//         >
//           Next
//         </button>
//       </div>

//       {isModalOpen && (
//         <AddUserForm onClose={() => setIsModalOpen(false)} onUserAdded={handleUserAdded} />
//       )}

//    {isEditOpen && (
//   <AddEditForm
//     onClose={() => setIsEditOpen(false)} 
//     onUserAdded={handleUserAdded} 
//     user={selectedUser}
//   />
// )}

//  {isViewOpen && (
//         <ViewModal
//           user={selectedUser}
//           onClose={() => setIsViewOpen(false)}
//         />
//       )}

//     </div>
//   );
// };

// export default Users;
// Users.jsx
import React, { useEffect, useState, useRef } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";
import AddUserForm from "../../components/AddUserForm";
import { Edit, Trash, Eye, User } from "lucide-react";
import AddEditForm from "../../components/AddEditForm";
import ViewModal from "../../components/ViewModal";

const Users = () => {
  const [users, setUsers] = useState([]); // displayed users (after search/filter/pagination)
  const [allUsers, setAllUsers] = useState([]); // master list from server
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usersPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // UI filter: "all" | "active" | "inactive"
  const [statusFilter, setStatusFilter] = useState("all");

  // debounce ref for search
  const searchTimeoutRef = useRef(null);

  // store last query to apply search+filter together
  const lastQueryRef = useRef("");

  // Fetch all users once
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await API.get("/getallusers");
      const fetched = data.data.users || [];
      // Normalize active field: ensure it's 0/1 or boolean consistently
      const normalized = data.data.users.map((u) => ({
      ...u,
      active: u.status === 1 || u.status === true || String(u.status) === "1" ? 1 : 0,
    }));
      setAllUsers(normalized);
      // apply current filters/search to initialize displayed users
      const filtered = applySearchAndFilter(normalized, lastQueryRef.current, statusFilter);
      setUsers(filtered);
      setTotalPages(Math.max(1, Math.ceil(filtered.length / usersPerPage)));
      toast.success("Users fetched successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Utility: apply search + status filter on a list
  function applySearchAndFilter(sourceList, query, status) {
    const q = (query || "").trim().toLowerCase();
    let list = sourceList;

    if (status === "active") {
      list = list.filter((u) => u.active === 1);
    } else if (status === "inactive") {
      list = list.filter((u) => u.active === 0);
    }

    if (!q) return list;

    return list.filter((user) => {
      const name = `${user.forname || ""} ${user.surname || ""} ${user.email || ""}`.toLowerCase();
      // match anywhere or prefix — your original logic used both; includes is enough but keeping startsWith for stronger match
      return name.startsWith(q) || name.includes(q);
    });
  }

  // Update displayed users when statusFilter changes
  useEffect(() => {
    lastQueryRef.current = lastQueryRef.current || "";
    const filtered = applySearchAndFilter(allUsers, lastQueryRef.current, statusFilter);
    setUsers(filtered);
    setCurrentPage(1);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / usersPerPage)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, allUsers]);

  // Get users for current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handleUserAdded = () => {
    fetchUsers();
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  // Delete user — update both lists
  function deletehandler(id) {
    API.delete(`/users/delete/${id}`)
      .then((res) => {
        toast.success("User deleted successfully");
        setAllUsers((prev) => prev.filter((u) => u._id !== id));
        setUsers((prev) => prev.filter((u) => u._id !== id));
        // adjust pages
        setTotalPages((prevTotal) => {
          const remaining = Math.max(0, users.length - 1);
          return Math.max(1, Math.ceil(remaining / usersPerPage));
        });
      })
      .catch((err) => {
        toast.error("Failed to delete user");
      });
  }

  // Toggle active/inactive status
// const toggleActive = async (user) => {
//   const id = user._id;
//   const newStatus = user.status === 1 ? 0 : 1;
//      console.log("Toggling status for user ID:", id, "to", newStatus);
//   // Optimistically update UI
//   setAllUsers((prev) =>
//     prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
//   );
//   setUsers((prev) =>
//     prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
//   );

//   try {
//     const response = await API.put(`/users/${id}/status`, { status: newStatus });
//         console.log("Toggle status response:", response.data);
//     if (!response.data.success) {
//       // If backend responds with an error, revert the status update in the UI
//       setAllUsers((prev) =>
//         prev.map((u) => (u._id === id ? { ...u, active: !newStatus } : u))
//       );
//       setUsers((prev) =>
//         prev.map((u) => (u._id === id ? { ...u, active: !newStatus } : u))
//       );
//       toast.error("Failed to update status. Try again!");
//     }
//   } catch (error) {
//     // Revert the UI update on error
//     setAllUsers((prev) =>
//       prev.map((u) => (u._id === id ? { ...u, active: !newStatus } : u))
//     );
//     setUsers((prev) =>
//       prev.map((u) => (u._id === id ? { ...u, active: !newStatus } : u))
//     );
//     toast.error("Something went wrong. Please try again!");
//   }
// };

// Toggle active/inactive status
const toggleActive = async (user) => {
  const id = user._id;
  const newStatus = user.status === 1 ? 0 : 1;  // Toggle status
  console.log("Toggling status for user ID:", id, "to", newStatus);

  // Optimistically update the UI (before the API call)
  setAllUsers((prev) =>
    prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
  );
  setUsers((prev) =>
    prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
  );

  try {
    // Make API request to update the status on the server
    const response = await API.put(`/users/${id}/status`, { status: newStatus });
    console.log("Toggle status response:", response.data);
    if (!response.data.success) {
      // If the backend responds with an error, revert the status change
      setAllUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: !newStatus } : u))
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: !newStatus } : u))
      );
      toast.error("Failed to update status. Try again!");
    } else {
      // Re-fetch the users list to sync with the server after status update
      fetchUsers();
    }
  } catch (error) {
    // Revert the UI update on error (if the API call fails)
    setAllUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, status: !newStatus } : u))
    );
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, status: !newStatus } : u))
    );
    toast.error("Something went wrong. Please try again!");
  }
};



  // Search handler (debounced) — uses allUsers as source so clearing search restores full list
  function searchhandler(e) {
    const query = e.target.value || "";
    lastQueryRef.current = query;

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      const filtered = applySearchAndFilter(allUsers, query, statusFilter);
      setUsers(filtered);
      setCurrentPage(1);
      setTotalPages(Math.max(1, Math.ceil(filtered.length / usersPerPage)));
    }, 400);
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-3">
        <h2 className="text-2xl lg:text-3xl font-bold mb-0">All Users</h2>

        <div className="flex items-center gap-2">
          {/* Status filter dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Search input */}
          <input
            onChange={searchhandler}
            type="text"
            placeholder="Search users..."
            className="border border-gray-300 rounded-md px-2 py-1"
          />

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700 hover:bg-gray-800 text-white h-9 px-3 rounded"
          >
            Add User
          </button>
        </div>
      </div>

      {currentUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="sm:overflow-x-auto">
          <table className="min-w-full table-auto shadow-lg rounded-lg overflow-x-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="py-3 px-4 text-left">#</th>   {/* NEW */}
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Surname</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((u, index) => (
                <tr key={u._id || index} className="hover:bg-gray-100 bg-white">
                  <td className="py-3 px-4 font-semibold">{index + 1}</td>
                  <td className="py-3 px-4">{u.forname}</td>
                  <td className="py-3 px-4">{u.surname}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4 capitalize">{u.role}</td>

                  {/* Active toggle */}
                  <td className="py-3 px-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={u.status === 1}
                        onChange={() => toggleActive(u)} // Handle toggle active/inactive
                        className="hidden"
                      />
                      <span
                        className={`w-12 h-6 bg-gray-500 rounded-full inline-block relative transition-all duration-300 ease-in-out ${u.active === 1 ? 'bg-green-600' : 'bg-gray-400'
                          }`}
                      >
                        <span
                          className={`w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-all duration-300 ease-in-out transform ${u.active === 1 ? 'translate-x-6' : 'translate-x-0'
                            }`}
                        ></span>
                      </span>
                    </label>
                  </td>

                  <td className="py-3 px-4 flex space-x-2 lg:space-x-3">
                    <button onClick={() => handleView(u)} className="cursor-pointer">
                      <Eye size={20} />
                    </button>

                    <button onClick={() => handleEdit(u)} className="cursor-pointer">
                      <Edit size={20} />
                    </button>

                    <button
                      onClick={() => deletehandler(u._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center md:justify-between mt-5 items-center gap-3">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm self-center mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <AddUserForm onClose={() => setIsModalOpen(false)} onUserAdded={handleUserAdded} />
      )}

      {isEditOpen && (
        <AddEditForm onClose={() => setIsEditOpen(false)} onUserAdded={handleUserAdded} user={selectedUser} />
      )}

      {isViewOpen && <ViewModal user={selectedUser} onClose={() => setIsViewOpen(false)} />}
    </div>
  );
};

export default Users;
