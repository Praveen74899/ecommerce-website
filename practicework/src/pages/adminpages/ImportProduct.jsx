
// import React, { useState, useEffect, useRef } from "react";
// import API from "../../utils/api";
// import { toast } from "react-toastify";
// import { Edit, Trash2 } from "lucide-react";
// const ImportProduct = () => {

//   // ---------------------------- STATES ----------------------------
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
// const [collapsed, setCollapsed] = useState({});

//   const [mainImage, setMainImage] = useState(null);
//   const [mainPreview, setMainPreview] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const[bestSellers, setBestSellers] = useState([]);
//   const [subImages, setSubImages] = useState([]);

//   const mainImageRef = useRef(null);

//   const fabricOptions = ["Cotton", "Silk", "Satin", "PolyCotton", "MicroFiber"];
//   const bedsheetSizeOptions = ["Single", "Double", "King", "Queen"];
//   const colorOptions = ["Red", "Blue", "Black", "White", "Yellow", "Green"];

//   const [formData, setFormData] = useState({
//     name: "",
//     title: "",
//     price: "",
//     description: "",
//     fabric: "",
//     bedsheetSize: "",
//     colors: [],
//     categoryId: "",
//       bestSellerId: "",
//   });

//   // ---------------------------- FETCH PRODUCTS ----------------------------
//   const fetchProducts = async () => {
//     try {
//       const res = await API.get("/admin/getallproducts");
//       setProducts(res.data.products);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Fetch products + categories
//   useEffect(() => {
//     fetchProducts();

//     API.get("/admin/categories")
//       .then((res) => setCategories(res.data.categories))
//       .catch((err) => console.log(err));

//       API.get("/admin/getbestseller")
//     .then((res) => setBestSellers(res.data.bestSellers || res.data))
//     .catch((err) => console.log(err));

//   }, []);

//   // ---------------------------- HANDLERS ----------------------------
//   const handleChange = (e) => {
//   const { name, value } = e.target;

//   // If user selects a category, clear bestSellerId.
//   if (name === "categoryId") {
//     setFormData((prev) => ({ ...prev, categoryId: value, bestSellerId: "" }));
//     return;
//   }

//   // If user selects a bestseller, clear categoryId.
//   if (name === "bestSellerId") {
//     setFormData((prev) => ({ ...prev, bestSellerId: value, categoryId: "" }));
//     return;
//   }

//   setFormData((prev) => ({ ...prev, [name]: value }));
// };

//   const toggleColor = (color) => {
//     if (formData.colors.includes(color)) {
//       setFormData({
//         ...formData,
//         colors: formData.colors.filter((c) => c !== color),
//       });
//     } else {
//       setFormData({
//         ...formData,
//         colors: [...formData.colors, color],
//       });
//     }
//   };

//   const handleMainImage = (e) => {
//     const file = e.target.files[0];
//     setMainImage(file);
//     setMainPreview(URL.createObjectURL(file));
//   };

//   const handleSubImages = (e) => {
//     const selected = Array.from(e.target.files);
//     setSubImages([...subImages, ...selected]);
//   };

//   const removeSubImage = (index) =>
//     setSubImages(subImages.filter((_, i) => i !== index));

//   // ---------------------------- SUBMIT FORM ----------------------------
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // validation: require either category or bestseller
//   if (!formData.categoryId && !formData.bestSellerId) {
//     return toast.error("Select either a Category or a Bestseller.");
//   }

//   try {
//     const data = new FormData();

//     // append scalar fields
//     data.append("name", formData.name);
//     data.append("title", formData.title);
//     data.append("price", formData.price);
//     data.append("description", formData.description);
//     data.append("fabric", formData.fabric);
//     data.append("bedsheetSize", formData.bedsheetSize);

//     // append colors array
//     formData.colors.forEach((c) => data.append("colors", c));

//     // append only one of categoryId or bestSellerId
//     if (formData.categoryId) data.append("categoryId", formData.categoryId);
//     if (formData.bestSellerId) data.append("bestSellerId", formData.bestSellerId);

//     if (!mainImage) return toast.error("Main image required");
//     data.append("mainImage", mainImage);
//     subImages.forEach((img) => data.append("subImages", img));

//     await API.post("/admin/importproduct", data);

//     toast.success("Product Uploaded Successfully!");
//     setShowModal(false);
//     fetchProducts();

//     // reset form (same as before)
//     setMainImage(null);
//     setMainPreview(null);
//     setSubImages([]);
//     mainImageRef.current.value = "";
//     setFormData({
//       name: "",
//       title: "",
//       price: "",
//       description: "",
//       fabric: "",
//       bedsheetSize: "",
//       colors: [],
//       categoryId: "",
//       bestSellerId: "",
//     });
//   } catch (err) {
//     toast.error("Failed to upload product");
//     console.log(err);
//   }
// };




//   function handleDelete(id){
//     API.delete(`/admin/deleteproduct/${id}`)
//     .then((res) => {
//       toast.success("Product Deleted!");
//       fetchProducts();
//     })
//     .catch((err) => {
//       toast.error("Something went wrong!");
//       console.log(err);
//     });
//   }

//   // ---------------------------- UI RETURN ----------------------------
//   return (
//     <div className="p-6">

//       {/* ------------------ HEADER ------------------ */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">All Products</h1>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-yellow-600 text-white px-5 py-2 rounded-lg"
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* ------------------ PRODUCT TABLE ------------------ */}
//      {/* CATEGORY WISE UI */}
// <div className="space-y-4">

//   {categories.map((cat) => {
//     const filteredProducts = products.filter(
//       (p) => p.categoryId && p.categoryId._id === cat._id
//     );

//     const isOpen = collapsed?.[cat._id] ?? true;

//     return (
//       <div key={cat._id} className="rounded-xl shadow bg-white">

//         {/* CATEGORY HEADER */}
//         <div
//           className="flex justify-between items-center px-5 py-4 bg-gray-100 cursor-pointer rounded-xl"
//           onClick={() =>
//             setCollapsed((prev) => ({ ...prev, [cat._id]: !isOpen }))
//           }
//         >
//           <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>

//           <span className="text-xl transition-transform duration-200"
//             style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
//           >
//             ▶
//           </span>
//         </div>

//         {/* PRODUCT LIST */}
//         {isOpen && (
//           filteredProducts.length > 0 ? (
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left text-gray-600 bg-gray-50">
//                   <th className="p-3">Image</th>
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Price</th>
//                   <th className="p-3">Colors</th>
//                   <th className="p-3">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredProducts.map((p) => (
//                   <tr key={p._id} className="hover:bg-gray-50 shadow-md">
//                     <td className="p-3">
//                       <img
//                         src={p.mainImage}
//                         className="w-14 h-14 object-cover rounded-md"
//                       />
//                     </td>
//                     <td className="p-3">{p.name}</td>
//                     <td className="p-3">₹{p.price}</td>
//                     <td className="p-3">
//                       {p.colors?.length > 0 ? p.colors.join(", ") : "--"}
//                     </td>
//                     <td>

//                       <button
//                         onClick={() => handleEdit()}
//                         className="p-3 text-blue-600"
//                       >
//                       <Edit />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(p._id)}
//                         className="p-3 text-red-600"
//                       >
//                       <Trash2 />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className="p-4 text-gray-500 italic">
//               No products in this category
//             </div>
//           )
//         )}
//       </div>
//     );
//   })}
// </div>

























//       {/* ------------------ MODAL ------------------ */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white w-[600px] rounded-xl p-6 max-h-[90vh] overflow-y-auto relative">

//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-2 right-3 text-xl font-semibold"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-semibold text-center mb-4">
//               Add New Product
//             </h2>

//             {/* ---------------- FORM ---------------- */}
//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* Category */}
//               <select
//                 name="categoryId"
//                 value={formData.categoryId}
//                 onChange={handleChange}
//                 className="border p-3 rounded-lg w-full"
//               >
//                 <option>Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat._id} value={cat._id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <select
//   name="bestSellerId"
//   value={formData.bestSellerId}
//   onChange={handleChange}
//   className="border p-3 rounded-lg w-full"
// >
//   <option value="">Select Bestseller (Optional)</option>
//   {bestSellers.map((b) => (
//     <option key={b._id} value={b._id}>
//       {b.name}
//     </option>
//   ))}
// </select>

//               {/* Name */}
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Product Name"
//                 className="border p-3 rounded-lg w-full"
//               />

//               {/* Title */}
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Product Title"
//                 className="border p-3 rounded-lg w-full"
//               />

//               {/* Price */}
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="Price"
//                 className="border p-3 rounded-lg w-full"
//               />

//               {/* Description */}
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Description"
//                 className="border p-3 rounded-lg w-full"
//               />

//               {/* Fabric */}
//               <select
//                 name="fabric"
//                 value={formData.fabric}
//                 onChange={handleChange}
//                 className="border p-3 rounded-lg w-full"
//               >
//                 <option>Select Fabric</option>
//                 {fabricOptions.map((f) => (
//                   <option key={f}>{f}</option>
//                 ))}
//               </select>

//               {/* Bedsheet Size */}
//               <select
//                 name="bedsheetSize"
//                 value={formData.bedsheetSize}
//                 onChange={handleChange}
//                 className="border p-3 rounded-lg w-full"
//               >
//                 <option>Select Size</option>
//                 {bedsheetSizeOptions.map((size) => (
//                   <option key={size}>{size}</option>
//                 ))}
//               </select>

//               {/* Colors */}
//               <div>
//                 <h3 className="font-semibold mb-2">Select Colors</h3>
//                 <div className="flex gap-2 flex-wrap">
//                   {colorOptions.map((color) => {
//                     const selected = formData.colors.includes(color);
//                     return (
//                       <div
//                         key={color}
//                         onClick={() => toggleColor(color)}
//                         className={`px-4 py-1 rounded-full cursor-pointer border ${
//                           selected
//                             ? "bg-black text-white"
//                             : "bg-gray-200 text-black"
//                         }`}
//                       >
//                         {color}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Main Image */}
//               <input
//                 type="file"
//                 ref={mainImageRef}
//                 onChange={handleMainImage}
//                 className="border p-3 rounded-lg w-full"
//               />
//               {mainPreview && (
//                 <img
//                   src={mainPreview}
//                   className="w-24 h-24 object-cover rounded-lg mt-2"
//                 />
//               )}

//               {/* Sub Images */}
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleSubImages}
//                 className="border p-3 rounded-lg w-full"
//               />

//               {subImages.length > 0 && (
//                 <div className="grid grid-cols-3 gap-3 mt-3">
//                   {subImages.map((img, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={URL.createObjectURL(img)}
//                         className="w-full h-24 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         className="absolute top-1 right-1 bg-white text-red-600 px-1 rounded text-xs"
//                         onClick={() => removeSubImage(index)}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Submit */}
//               <button className="bg-yellow-600 text-white py-3 rounded-lg w-full">
//                 Upload Product
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default ImportProduct;



import React, { useState, useEffect, useRef } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";
 import EditImportProduct from "../../components/EditImportProduct";
const ImportProduct = () => {

  // ---------------------------- STATES ----------------------------
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);

  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [subImages, setSubImages] = useState([]);

  const mainImageRef = useRef(null);

  const [viewType, setViewType] = useState("category"); // 'category' OR 'bestseller'
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
const [isEditOpen, setIsEditOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

  const fabricOptions = ["Cotton", "Silk", "Satin", "PolyCotton", "MicroFiber"];
  const colorOptions = ["Red", "Blue", "Black", "White", "Yellow", "Green"];

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    price: "",
    description: "",
    fabric: "",
    colors: [],
    categoryId: "",
    bestSellerId: "",
  });

  // ---------------------------- FETCH PRODUCTS ----------------------------
  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/getallproducts");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch products + categories
  useEffect(() => {
    fetchProducts();

    API.get("/admin/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err));

    API.get("/admin/getbestseller")
      .then((res) => setBestSellers(res.data.bestSellers || res.data))
      .catch((err) => console.log(err));

  }, []);

  // ---------------------------- HANDLERS ----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If user selects a category, clear bestSellerId.
    if (name === "categoryId") {
      setFormData((prev) => ({ ...prev, categoryId: value, bestSellerId: "" }));
      return;
    }

    // If user selects a bestseller, clear categoryId.
    if (name === "bestSellerId") {
      setFormData((prev) => ({ ...prev, bestSellerId: value, categoryId: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleColor = (color) => {
    if (formData.colors.includes(color)) {
      setFormData({
        ...formData,
        colors: formData.colors.filter((c) => c !== color),
      });
    } else {
      setFormData({
        ...formData,
        colors: [...formData.colors, color],
      });
    }
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  };

  const handleSubImages = (e) => {
    const selected = Array.from(e.target.files);
    setSubImages([...subImages, ...selected]);
  };

  const removeSubImage = (index) =>
    setSubImages(subImages.filter((_, i) => i !== index));

  // ---------------------------- SUBMIT FORM ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation: require either category or bestseller
    if (!formData.categoryId && !formData.bestSellerId) {
      return toast.error("Select either a Category or a Bestseller.");
    }

    if (!mainImage) return toast.error("Main image required");
    if (!formData.name.trim()) return toast.error("Enter product name!");
    if (!formData.title.trim()) return toast.error("Enter product title!");
    if (!formData.price) return toast.error("Enter product price!");
    if (!formData.description.trim()) return toast.error("Enter product description!");
    if (!formData.fabric) return toast.error("Select product fabric!");
    if (!formData.colors.length) return toast.error("Select product colors!");

    try {
      const data = new FormData();

      // append scalar fields
      data.append("name", formData.name);
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("fabric", formData.fabric);
    

      // append colors array
      formData.colors.forEach((c) => data.append("colors", c));

      // append only one of categoryId or bestSellerId
      if (formData.categoryId) data.append("categoryId", formData.categoryId);
      if (formData.bestSellerId) data.append("bestSellerId", formData.bestSellerId);

      if (!mainImage) return toast.error("Main image required");
      data.append("mainImage", mainImage);
      subImages.forEach((img) => data.append("subImages", img));

      await API.post("/admin/importproduct", data);

      toast.success("Product Uploaded Successfully!");
      setShowModal(false);
      fetchProducts();

      // reset form (same as before)
      setMainImage(null);
      setMainPreview(null);
      setSubImages([]);
      mainImageRef.current.value = "";
      setFormData({
        name: "",
        title: "",
        price: "",
        description: "",
        fabric: "",
  
        colors: [],
        categoryId: "",
        bestSellerId: "",
      });
    } catch (err) {
      toast.error("Failed to upload product");
      console.log(err);
    }
  };




  function handleDelete(id) {
    API.delete(`/admin/deleteproduct/${id}`)
      .then((res) => {
        toast.success("Product Deleted!");
        fetchProducts();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  }


  const fetchBestSellerProducts = async () => {
    try {
      const res = await API.get("/admin/getallproducts"); // SAME API

      // Filter only bestSeller items
      const onlyBestSellers = res.data.products.filter(
        (p) => p.bestSellerId !== null
      );
      console.log("data hai ", onlyBestSellers);

      setBestSellerProducts(onlyBestSellers);
    } catch (err) {
      console.log(err);
    }
  };


 
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  // ---------------------------- UI RETURN ----------------------------
  return (
    <div className="p-6">

      {/* ------------------ HEADER ------------------ */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Products</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* ------------------ PRODUCT TABLE ------------------ */}
      {/* VIEW FILTER */}
      <div className="mb-6">
        <select
          className="border p-3 rounded-lg bg-white shadow"
          value={viewType}
          onChange={(e) => {
            setViewType(e.target.value);

            if (e.target.value === "bestseller") {
              fetchBestSellerProducts();
            }
          }}
        >
          <option value="category">Category View</option>
          <option value="bestseller">Best Seller View</option>
        </select>
      </div>

      {/* CATEGORY WISE UI */}
      {/* <div className="space-y-4">

  {categories.map((cat) => {
    const filteredProducts = products.filter(
      (p) => p.categoryId && p.categoryId._id === cat._id
    );

    const isOpen = collapsed?.[cat._id] ?? true;

    return (
      <div key={cat._id} className="rounded-xl shadow bg-white">

        <div
          className="flex justify-between items-center px-5 py-4 bg-gray-100 cursor-pointer rounded-xl"
          onClick={() =>
            setCollapsed((prev) => ({ ...prev, [cat._id]: !isOpen }))
          }
        >
          <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>

          <span className="text-xl transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▶
          </span>
        </div>

        {isOpen && (
          filteredProducts.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 bg-gray-50">
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Colors</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 shadow-md">
                    <td className="p-3">
                      <img
                        src={p.mainImage}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">₹{p.price}</td>
                    <td className="p-3">
                      {p.colors?.length > 0 ? p.colors.join(", ") : "--"}
                    </td>
                    <td>
                      
                      <button
                        onClick={() => handleEdit()}
                        className="p-3 text-blue-600"
                      >
                      <Edit />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-3 text-red-600"
                      >
                      <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-4 text-gray-500 italic">
              No products in this category
            </div>
          )
        )}
      </div>
    );
  })}
</div> */}

      <div className="space-y-4">

        {/* CATEGORY VIEW */}
        {viewType === "category" &&
          categories.map((cat) => {
            const filteredProducts = products.filter(
              (p) => p.categoryId && p.categoryId._id === cat._id
            );

            const isOpen = collapsed?.[cat._id] ?? true;

            return (
              <div key={cat._id} className="rounded-xl shadow bg-white">

                {/* CATEGORY HEADER */}
                <div
                  className="flex justify-between items-center px-5 py-4 bg-gray-100 cursor-pointer rounded-xl"
                  onClick={() =>
                    setCollapsed((prev) => ({ ...prev, [cat._id]: !isOpen }))
                  }
                >
                  <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>

                  <span className="text-xl transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                  >
                    ▶
                  </span>
                </div>

                {/* PRODUCT LIST */}
                {isOpen && (
                  filteredProducts.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-600 bg-gray-50">
                          <th className="p-3">Image</th>
                          <th className="p-3">Title</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">Price</th>
                             <th className="p-3">Description</th>
                        <th className="p-3">fabric</th>
                          <th className="p-3">Colors</th>
                          <th className="p-3">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredProducts.map((p) => (
                          <tr key={p._id} className="hover:bg-gray-50 shadow-md">
                            <td className="p-3">
                              <img
                                src={p.mainImage}
                                className="w-14 h-14 object-cover rounded-md"
                              />
                            </td>
                            <td className="p-3">{p.title}</td>
                            <td className="p-3">{p.name}</td>
                            <td className="p-3">INR{p.price}</td>
                            <td className="p-3">{p.description}</td>
                            <td className="p-3">{p.fabric}</td>
                            <td className="p-3">
                              {p.colors?.length > 0 ? p.colors.join(", ") : "--"}
                            </td>
                            <td>

                              <button
                                onClick={() => handleEdit(p)}
                                className="p-3 text-blue-600"
                              >
                                <Edit />
                              </button>

                              <button
                                onClick={() => handleDelete(p._id)}
                                className="p-3 text-red-600"
                              >
                                <Trash2 />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-4 text-gray-500 italic">
                      No products in this category
                    </div>
                  )
                )}
              </div>
            );
          })
        }

        {/* BEST SELLER VIEW */}
        {viewType === "bestseller" &&
  bestSellers.map((bs) => {
    const filtered = products.filter((p) => p.bestSellerId === bs._id);

    const isOpen = collapsed?.[bs._id] ?? true;

    return (
      <div key={bs._id} className="rounded-xl shadow bg-white">

        {/* HEADER WITH COLLAPSE ICON */}
        <div
          className="flex justify-between items-center px-5 py-4 bg-gray-100 cursor-pointer rounded-xl"
          onClick={() =>
            setCollapsed((prev) => ({ ...prev, [bs._id]: !isOpen }))
          }
        >
          <h2 className="text-lg font-semibold">{bs.name}</h2>

          <span
            className="text-xl transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▶
          </span>
        </div>

        {/* TABLE */}
        {isOpen && (
          filtered.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Fabric</th>
                  <th className="p-3">Colors</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 shadow-md">
                    <td className="p-3">
                      <img src={p.mainImage} className="w-14 h-14 rounded-md" />
                    </td>
                    <td className="p-3">{p.title}</td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">₹{p.price}</td>
                    <td className="p-3">{p.description}</td>
                    <td className="p-3">{p.fabric}</td>
                    <td className="p-3">{p.colors?.join(", ")}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-3 text-blue-600"
                      >
                        <Edit />
                      </button>
                      <button
                        className="text-red-600 p-3"
                        onClick={() => handleDelete(p._id)}
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-4 text-gray-500">No items</div>
          )
        )}

      </div>
    );
  })
}
        

      </div>
























      {/* ------------------ MODAL ------------------ */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] rounded-xl p-6 max-h-[90vh] overflow-y-auto relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-xl font-semibold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">
              Add New Product
            </h2>

            {/* ---------------- FORM ---------------- */}
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* ---------------- BASIC DETAILS ---------------- */}
              <div className="relative rounded-xl p-6 shadow-lg bg-[#fafafa] border border-gray-200">

                {/* LEFT COLOR LINE */}
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-pink-400 to-yellow-400 rounded-l-xl"></div>

                <h2 className="text-lg font-semibold mb-4 text-gray-700 tracking-wide">
                  Basic Details
                </h2>

                <div className="space-y-4">

                  {/* CATEGORY */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Category</label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                    >
                      <option value="">Choose Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* BESTSELLER */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Best Seller </label>
                    <select
                      name="bestSellerId"
                      value={formData.bestSellerId}
                      onChange={handleChange}
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                    >
                      <option value="">Select Best Seller</option>
                      {bestSellers.map((b) => (
                        <option key={b._id} value={b._id}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* NAME */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                  </div>

                  {/* TITLE */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter product title"
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                  </div>

                  {/* PRICE */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="₹ Enter price"
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ---------------- PRODUCT DETAILS ---------------- */}
              <div className="relative rounded-xl p-6 shadow-lg bg-[#fafafa] border border-gray-200">

                {/* LEFT COLOR LINE */}
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-blue-400 to-green-400 rounded-l-xl"></div>

                <h2 className="text-lg font-semibold mb-4 text-gray-700 tracking-wide">
                  Product Details
                </h2>

                <div className="space-y-4">

                  {/* DESCRIPTION */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description..."
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm h-24 focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                  </div>

                  {/* FABRIC */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Fabric</label>
                    <select
                      name="fabric"
                      value={formData.fabric}
                      onChange={handleChange}
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                    >
                      <option value="">Select Fabric</option>
                      {fabricOptions.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                  </div>


                  {/* COLORS */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2 text-gray-600">Colors</label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => {
                        const selected = formData.colors.includes(color);
                        return (
                          <span
                            key={color}
                            onClick={() => toggleColor(color)}
                            className={`px-4 py-1 rounded-full cursor-pointer border shadow-sm transition
                  ${selected ? "bg-gray-900 text-white" : "bg-gray-200 text-black"}`}
                          >
                            {color}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* MAIN IMAGE */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Main Image</label>
                    <input
                      type="file"
                      ref={mainImageRef}
                      onChange={handleMainImage}
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm"
                    />

                    {mainPreview && (
                      <img
                        src={mainPreview}
                        className="w-24 h-24 rounded-lg mt-2 object-cover border shadow"
                      />
                    )}
                  </div>

                  {/* SUB IMAGES */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Sub Images</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleSubImages}
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm"
                    />

                    {subImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {subImages.map((img, i) => (
                          <div key={i} className="relative">
                            <img
                              src={URL.createObjectURL(img)}
                              className="w-full h-24 object-cover rounded-lg border shadow"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-white text-red-600 px-1 rounded text-xs shadow"
                              onClick={() => removeSubImage(i)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <button className="bg-gradient-to-r from-yellow-600 to-orange-500 w-full py-3 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition">
                Upload Product
              </button>

            </form>

          </div>
        </div>
      )}


   
    {isEditOpen && (
  <EditImportProduct
    selectedProduct={selectedProduct}
    setIsEditOpen={setIsEditOpen}
    fetchProducts={fetchProducts}
  />
)}




    </div>
  );
};

export default ImportProduct;
