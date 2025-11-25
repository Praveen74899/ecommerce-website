

// import React, { useState, useEffect } from "react";
// import API from "../../utils/api";
// import { toast } from "react-toastify";
// import { Edit, Trash2 } from "lucide-react";

// const AddCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [search, setSearch] = useState("");
// const [loading, setLoading] = useState(false);

//   // FETCH CATEGORIES
//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/admin/categories");
//       setCategories(res.data.categories);
//     } catch (err) {
//       console.log(err);
//     }
//     finally {
//     setLoading(false);  // Stop loading
//   }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // IMAGE HANDLER
//   const handleImage = (e) => {
//     const selected = e.target.files[0];
//     setImage(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   // ADD CATEGORY
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim()) return toast.error("Enter category name!");
//     if (!image) return toast.error("Select an image!");

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("image", image);

//     try {
//       const res = await API.post("/admin/addcategory", formData);

//       if (res.data.success) {
//         toast.success("Category Added!");
//         fetchCategories();
//         setOpenModal(false);
//         setName("");
//         setImage(null);
//         setPreview(null);
//       }
//     } catch (err) {
//       toast.error("Something went wrong!");
//     }
//   };

//   // DELETE
// const handleDelete = async (id) => {
//   try {
//     const res = await API.delete(`/admin/categoryid/${id}`);

//     if (res.data.success) {
//       toast.success("Category Deleted!");
//       fetchCategories();
//     }
//   } catch (err) {
//     toast.error("Something went wrong!");
//   }
// };



//   // SEARCH FILTER
//   const filteredData = categories.filter((cat) =>
//     cat.name.toLowerCase().includes(search.toLowerCase())
//   );


//   const toggleStatus = async (id, currentStatus) => {
//   try {
//     const res = await API.patch(`/admin/category/status/${id}`, {
//       status: !currentStatus
//     });

//     if (res.data.success) {
//       toast.success("Category updated!");
//       fetchCategories();
//     }
//   } catch (err) {
//     toast.error("Failed to update status");
//   }
// };


// function handleEdit(category) {
//   // Handle edit logic here

// }


//   return (
//     <div className="max-w-4xl mx-auto mt-10">

//       {/* TOP BAR */}
//       <div className="flex flex-wrap justify-between items-center mb-5 gap-3">

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded-lg w-60 border-gray-300"
//         />

//         <div className="flex gap-3">

//           {/* Refresh */}
//           <button
//             onClick={fetchCategories}
//             className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
//           >
//             Refresh
//           </button>

//           {/* Add */}
//           <button
//             onClick={() => setOpenModal(true)}
//             className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
//           >
//             + Add Category
//           </button>
//         </div>
//       </div>

// {loading && (
//   <div className="flex mt-48 justify-center h-screen">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2  border-gray-900"></div>
//   </div>
// )}

//       {/* TABLE */}
//      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-200">

//   <table className="w-full text-left">
//     <thead className="bg-gray-100 border-b">
//       <tr>
//         <th className="p-3">Image</th>
//         <th className="p-3">Name</th>
//          <th className="p-3">Status</th>
//         <th className="p-3 text-right">Actions</th>   {/* RIGHT SIDE */}
//       </tr>
//     </thead>

//   <tbody>
//   {filteredData.map((cat) => (
//     <tr key={cat._id} className="shadow-sm hover:bg-gray-50">

//       {/* IMAGE */}
//       <td className="p-3">
//         <img
//           src={cat.image}
//           className="w-14 h-14 object-cover rounded border"
//         />
//       </td>

//       {/* NAME */}
//       <td className="p-3 font-medium text-gray-700">
//         {cat.name}
//       </td>

//       {/* STATUS TOGGLE */}
//       <td className="p-3">
//         <label className="inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             checked={cat.status === true}
//             onChange={() => toggleStatus(cat._id, cat.status)}
//             className="hidden"
//           />

//           <span
//             className={`w-12 h-6 rounded-full inline-block relative transition-all duration-300 
//             ${cat.status ? "bg-green-600" : "bg-gray-400"}`}
//           >
//             <span
//               className={`w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-all duration-300 transform
//               ${cat.status ? "translate-x-6" : "translate-x-0"}`}
//             ></span>
//           </span>
//         </label>
//       </td>

//       {/* ACTIONS */}
//       <td className="p-3 flex justify-end gap-3">

//         {/* Edit */}
//         <button
//           onClick={() => handleEdit(cat)}
//         className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
//           <Edit size={18} />
//         </button>

//         {/* Delete */}
//         <button
//           onClick={() => handleDelete(cat._id)}
//           className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
//         >
//           <Trash2 size={18} />
//         </button>

//       </td>
//     </tr>
//   ))}

//   {filteredData.length === 0 && (
//     <tr>
//       <td colSpan="4" className="p-4 text-center text-gray-500">
//         No categories found
//       </td>
//     </tr>
//   )}
// </tbody>

//   </table>
// </div>

//       {/* ----------- MODAL --------------- */}
//       {openModal && (
//   <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center">
//     <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg">

//       <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           type="text"
//           placeholder="Category name..."
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border p-2 rounded-lg"
//         />

//         <input
//           type="file"
//           onChange={handleImage}
//           className="w-full border p-2 rounded-lg bg-gray-100"
//         />

//         {preview && (
//           <img
//             src={preview}
//             className="w-32 h-32 object-cover rounded-lg border shadow mx-auto"
//           />
//         )}

//         <button
//           type="submit"
//           className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
//         >
//           Add
//         </button>
//       </form>

//       <button
//         onClick={() => setOpenModal(false)}
//         className="w-full text-gray-700 mt-3 underline"
//       >
//         Cancel
//       </button>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default AddCategory;


import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
const [oldImage, setOldImage] = useState("");



  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);


  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/categories");
      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);  // Stop loading
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // IMAGE HANDLER
  const handleImage = (e) => {
    const selected = e.target.files[0];
    setImage(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // ADD CATEGORY
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Enter category name!");
    if (!image) return toast.error("Select an image!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const res = await API.post("/admin/addcategory", formData);

      if (res.data.success) {
        toast.success("Category Added!");
        fetchCategories();
        setOpenModal(false);
        setName("");
        setImage(null);
        setPreview(null);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/admin/categoryid/${id}`);

      if (res.data.success) {
        toast.success("Category Deleted!");
        fetchCategories();
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };



  // SEARCH FILTER
  const filteredData = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );


  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await API.patch(`/admin/category/status/${id}`, {
        status: !currentStatus
      });

      if (res.data.success) {
        toast.success("Category updated!");
        fetchCategories();
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };


  function handleEdit(cat) {
    setEditId(cat._id);
    setEditName(cat.name);
      setOldImage(cat.image);    
    setEditPreview(cat.image); // already uploaded image
    setEditImage(null); // new image optional
    setEditModal(true);
  }



  const handleEditImage = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
    setEditPreview(URL.createObjectURL(file));
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editName.trim()) return toast.error("Name is required!");

    const form = new FormData();
    form.append("name", editName);
    if (editImage) {
    form.append("image", editImage);
  } else {
    // ⭐ NO NEW IMAGE → SEND OLD IMAGE PATH
    form.append("oldImage", oldImage);
  }
    try {
      const res = await API.put(`/admin/editcategory/${editId}`, form);

      if (res.data.success) {
        toast.success("Category Updated!");
        setEditModal(false);
        fetchCategories();
      }
    } catch (err) {
      toast.error("Update failed!");
    }
  };



  return (
    <div className="p-6 bg-[#F7F3EF] min-h-screen">
      <div className="w-full mx-auto ">

        {/* TOP BAR */}
        <div className="flex flex-wrap justify-between items-center mb-5 gap-3">

          <h1 className="text-2xl font-semibold text-[#4E342E]">
            Categories
        </h1>

          {/* Search */}
         
          <div className="flex gap-3">
             <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg w-60 border-[#4E342E]"
          />


            {/* Refresh */}
            <button
              onClick={fetchCategories}
              className="bg-[#4E342E] hover:bg-[#3E2723] text-white px-4 py-2 rounded-lg "
            >
              Refresh
            </button>

            {/* Add */}
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#4E342E] hover:bg-[#3E2723] text-white px-4 py-2 rounded-lg"
            >
              + Add Category
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex mt-48 justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2  border-gray-900"></div>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white shadow rounded-xl overflow-hidden border border-[#D7CCC8]">

          <table className="w-full text-left">
            <thead className=" bg-[#D7CCC8] border-b">
              <tr>
                <th className="p-3 ">#</th>

                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>

                <th className="p-3 ">Actions</th>   {/* RIGHT SIDE */}
              </tr>
            </thead>

            <tbody>
              {filteredData.map((cat,index) => (
                <tr key={cat._id} className="shadow-sm hover:bg-gray-50">
                     
                               {/* SERIAL NUMBER */}
          <td className="p-3 text-[#4E342E] font-semibold">
            {index + 1}
          </td>


                  {/* IMAGE */}
                  <td className="p-3">
                    <img
                      src={cat.image}
                      className="w-14 h-14 object-cover rounded border"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-3 font-medium text-gray-700">
                    {cat.name}
                  </td>

                  {/* STATUS TOGGLE */}
                  <td className="p-3">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cat.status === true}
                        onChange={() => toggleStatus(cat._id, cat.status)}
                        className="hidden"
                      />

                      <span
                        className={`w-12 h-6 rounded-full inline-block relative transition-all duration-300 
            ${cat.status ? "bg-amber-900" : "bg-gray-500"}`}
                      >
                        <span
                          className={`w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-all duration-300 transform
              ${cat.status ? "translate-x-6" : "translate-x-0"}`}
                        ></span>
                      </span>
                    </label>
                  </td>
                   {/* DATE */}
          <td className="p-3 text-gray-600">
            {cat.createdAt
              ? new Date(cat.createdAt).toLocaleDateString("en-IN")
              : "--"}
          </td>

                  {/* ACTIONS */}
                  <td className="p-3 flex  gap-3">

                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-2 bg-amber-900 hover:bg-amber-950 text-white rounded">
                      <Edit size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* ----------- MODAL --------------- */}
        {openModal && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg">

              <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  type="text"
                  placeholder="Category name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />

                <input
                  type="file"
                  onChange={handleImage}
                  className="w-full border p-2 rounded-lg bg-gray-100"
                />

                {preview && (
                  <img
                    src={preview}
                    className="w-32 h-32 object-cover rounded-lg border shadow mx-auto"
                  />
                )}

                <button
                  type="submit"
                  className="w-full bg-[#4E342E] hover:bg-[#3E2723] text-white  py-2 rounded-lg "
                >
                  Add
                </button>
              </form>

              <button
                onClick={() => setOpenModal(false)}
                className="w-full text-right cursor-pointer mt-3 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}



        {editModal && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg relative">

              <h2 className="text-xl font-semibold mb-4">Edit Category</h2>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setEditModal(false)}
                className="absolute top-2 right-3 text-xl font-bold"
              >
                ✕
              </button>

              <form onSubmit={handleUpdate} className="space-y-4">

                {/* NAME */}
                <input
                  type="text"
                  placeholder="Category name..."
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />

                {/* IMAGE UPLOAD */}
                <input
                  type="file"

                  onChange={handleEditImage}
                  className="w-full border p-2 rounded-lg bg-gray-100"
                />

                {/* PREVIEW */}
                {editPreview && (
                  <img
                    src={editPreview}
                    className="w-32 h-32 object-cover rounded-lg border shadow mx-auto"
                  />
                )}

                <button
                  type="submit"
                  className="w-full  bg-[#4E342E] hover:bg-[#3E2723] text-white py-2 rounded-lg "
                >
                  Update
                </button>
              </form>

            </div>
          </div>
        )}


      </div>
      </div>
      );
      
};

      export default AddCategory;
