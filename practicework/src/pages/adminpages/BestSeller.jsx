// import React, { useState, useEffect } from "react";
// import API from "../../utils/api";
// import { Edit, Trash2 } from "lucide-react";
// import { toast } from "react-toastify";

// const BestSeller = () => {
//   const [bestSeller, setBestSeller] = useState([]);
//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [preview, setPreview] = useState(null);
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState("");
// const [error, setError] = useState("");

//   const fetchBestSeller = async () => {
//     try {
//       const res = await API.get("/admin/getbestseller");
//       setBestSeller(res.data.bestSellers);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchBestSeller();
//   }, []);

//   const filtered = bestSeller.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleImage = (e) => {
//     const selected = e.target.files[0];
//     setImage(selected);
//     setPreview(URL.createObjectURL(selected));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {

//       if (!name.trim()) return toast.error("Enter category name!");
//       if (!image) return toast.error("Select an image!");

//       const formData = new FormData();

//       formData.append("name", name);
//       formData.append("image", image);

//       const res = await API.post("/admin/bestseller", formData);
//       if (res.data.success) {
//         toast.success("BestSeller Added!");
//         fetchBestSeller();
//         setIsOpen(false);
//         setName("");
//         setImage(null);
//         setPreview(null);
//       }
//     } catch (err) {
//       toast.error("Something went wrong!");
//     }
//   };


//   function  deletehandler (id) {
//     API.delete(`/admin/deletebestseller/${id}`)
//       .then((res) => {
//         toast.success("BestSeller deleted successfully");
//         fetchBestSeller();
//       })
//       .catch((err) => {
//         toast.error("Failed to delete BestSeller");
//       });
//   }


//   const handleToggle = async (id, currentStatus) => {
//   try {
//     const res = await API.patch(`/admin/bestseller/status/${id}`, {
//       status: !currentStatus,
//     });

//     if (res.data.success) {
//       fetchBestSeller();  // Refresh table
//     }
//   } catch (err) {
//     console.log(err);
//     toast.error("Failed to update status!");
//   }
// };


//   return (
//     <div className="w-full mx-auto mt-10">

//       {/* TOP BAR – EXACT same as CATEGORY */}
//       <div className="flex flex-wrap justify-between items-center mb-5 gap-3">

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search BestSeller..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded-lg w-60 border-gray-300"
//         />

//         <div className="flex gap-3">

//           {/* Refresh */}
//           <button
//             onClick={fetchBestSeller}
//             className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
//           >
//             Refresh
//           </button>

//           {/* Add BestSeller */}
//           <button
//             className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
//             onClick={() => { setIsOpen(true) }}
//           >
//             + Add BestSeller
//           </button>
//         </div>
//       </div>

//       {/* TABLE – EXACT same style as CATEGORY */}
//       <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-200">
//         <table className="w-full border-collapse">

//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="p-3 text-center">Image</th>
//               <th className="p-3 text-center">Name</th>
//               <th className="p-3 text-center">Status</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((item) => (
//               <tr
//                 key={item._id}
//                 className="hover:bg-gray-50 transition text-center"
//               >

//                 {/* Image */}
//                 <td className=" p-3">
//                   <img
//                     src={item.image}
//                     className="w-14 h-14 object-cover rounded border shadow"
//                   />
//                 </td>

//                 {/* Name */}
//                 <td className=" p-3 font-medium text-gray-700">
//                   {item.name}
//                 </td>

//                 {/* Status */}
//               <td className="p-3">
//   <label className="inline-flex items-center cursor-pointer">
//     <input
//       type="checkbox"
//       className="sr-only peer"
//       checked={item.status}
//       onChange={() => handleToggle(item._id, item.status)}
//     />
//     <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer 
//         peer-checked:bg-green-500 transition-all"></div>
//     <div className="absolute w-5 h-5 bg-white rounded-full shadow 
//         peer-checked:translate-x-5 transform transition"></div>
//   </label>
// </td>


//                 {/* ACTION BUTTONS – same icons, same buttons */}
//                 <td className="p-3 flex justify-center gap-3">

//                   {/* Edit */}
//                   <button className="p-2 bg-gray-600 hover:bg-gray-700  text-white">
//                     <Edit size={18} />
//                   </button>

//                   {/* Delete */}
//                   <button 
//                   onClick={() => deletehandler(item._id)}
//                   className="p-2 bg-red-500 hover:bg-red-600  text-white">
//                     <Trash2 size={18} />
//                   </button>

//                 </td>

//               </tr>
//             ))}

//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="p-4 text-center text-gray-500">
//                   No best seller items found
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>

//       {isOpen && (
//         // <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
//         //   <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg relative">
//         <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg relative">

//             <h2 className="text-xl font-semibold mb-4">Add BestSeller</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder=" Product Name"
//                 className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
//               />

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImage}
//                 className="w-full border p-2 gap- rounded-lg bg-gray-100"
//               />

//               {preview && (
//                 <img
//                   src={preview}
//                   className="w-32 h-32 mt-4 items-start flex object-cover rounded-lg border shadow mx-auto"
//                 />
//               )}

//               <div className="flex gap-4 justify-end">
//                 <button
//                   type="submit"
//                   className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"

//                 >
//                   Add BestSeller
//                 </button>

//                 <button
//                   type="button"
//                   className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
//                   onClick={() => {
//                     setIsOpen(false);
//                     setName("");
//                     setImage(null);
//                     setPreview(null);
//                   }}

//                 >
//                   Cancel
//                 </button>

//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default BestSeller;

import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);     // Add Modal
  const [isEditOpen, setIsEditOpen] = useState(false); // Edit Modal

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");

  const [editId, setEditId] = useState(null); // for edit modal
  const [editPreview, setEditPreview] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchBestSeller = async () => {
    try {
      const res = await API.get("/admin/getbestseller");
      setBestSeller(res.data.bestSellers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBestSeller();
  }, []);

  const filtered = bestSeller.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ------------------- ADD IMAGE ------------------
  const handleImage = (e) => {
    const selected = e.target.files[0];
    setImage(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // ------------------- EDIT IMAGE ------------------
  const handleEditImage = (e) => {
    const selected = e.target.files[0];
    setEditImage(selected);
    setEditPreview(URL.createObjectURL(selected));
  };

  // --------------------- ADD SUBMIT -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim()) return toast.error("Enter product name!");
      if (!image) return toast.error("Select an image!");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const res = await API.post("/admin/bestseller", formData);

      if (res.data.success) {
        toast.success("BestSeller added!");
        fetchBestSeller();
        setIsOpen(false);
        setName("");
        setImage(null);
        setPreview(null);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // ---------------------- DELETE --------------------
  const deleteHandler = (id) => {
    

    API.delete(`/admin/deletebestseller/${id}`)
      .then(() => {
        toast.success("BestSeller deleted");
        fetchBestSeller();
      })
      .catch(() => toast.error("Delete failed"));
  };

  // ---------------------- STATUS TOGGLE --------------
  const handleToggle = async (id, currentStatus) => {
    try {
      const res = await API.patch(`/admin/bestseller/status/${id}`, {
        status: !currentStatus,
      });

      if (res.data.success) fetchBestSeller();
    } catch {
      toast.error("Status update failed");
    }
  };

  // ---------------------- OPEN EDIT MODAL ------------
  const openEditModal = (item) => {
    setEditId(item._id);
    setEditName(item.name);
    setEditPreview(item.image);
    setIsEditOpen(true);
  };

  // ---------------------- UPDATE SUBMIT ---------------
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!editName.trim()) return toast.error("Enter product name!");

      const formData = new FormData();
      formData.append("name", editName);

      if (editImage) formData.append("image", editImage);
      else formData.append("existingImage", editPreview);

      const res = await API.put(`/admin/editbestseller/${editId}`, formData);

      if (res.data.success) {
        toast.success("BestSeller updated!");
        fetchBestSeller();
        setIsEditOpen(false);
        setEditImage(null);
        setEditPreview(null);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="w-full mx-auto mt-10">

      {/* TOP BAR */}
      <div className="flex flex-wrap justify-between items-center mb-5 gap-3">

        <input
          type="text"
          placeholder="Search BestSeller..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg w-60 border-gray-300"
        />

        <div className="flex gap-3">
          <button
            onClick={fetchBestSeller}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Refresh
          </button>

          <button
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
            onClick={() => setIsOpen(true)}
          >
            + Add BestSeller
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full border-collapse">

          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-center">Image</th>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition text-center">

                <td className="p-3">
                  <img src={item.image} className="w-14 h-14 object-cover rounded border shadow" />
                </td>

                <td className="p-3 font-medium">{item.name}</td>

                {/* STATUS SWITCH */}
                <td className="p-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.status}
                      onChange={() => handleToggle(item._id, item.status)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition"></div>
                  </label>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => deleteHandler(item._id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No best sellers found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* ADD MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg relative">

            <h2 className="text-xl font-semibold mb-4">Add BestSeller</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                className="w-full border p-3 rounded-lg"
              />

              <input type="file" accept="image/*" onChange={handleImage} className="border p-2 rounded-lg w-full" />

              {preview && <img src={preview} className="w-32 h-32 rounded mx-auto border" />}

              <div className="flex justify-end gap-3">
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg">Add</button>
                <button
                  type="button"
                  onClick={() => { setIsOpen(false); setName(""); setPreview(null); }}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg relative">

            <h2 className="text-xl font-semibold mb-4">Edit BestSeller</h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />

              <input type="file" accept="image/*" onChange={handleEditImage} className="border p-2 rounded-lg w-full" />

              {editPreview && <img src={editPreview} className="w-32 h-32 rounded mx-auto border" />}

              <div className="flex justify-end gap-3">
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg">Update</button>
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default BestSeller;
