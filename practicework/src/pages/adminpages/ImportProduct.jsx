
import React, { useState, useEffect, useRef } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";
const ImportProduct = () => {

  // ---------------------------- STATES ----------------------------
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [collapsed, setCollapsed] = useState({});
 
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subImages, setSubImages] = useState([]);

  const mainImageRef = useRef(null);

  const fabricOptions = ["Cotton", "Silk", "Satin", "PolyCotton", "MicroFiber"];
  const bedsheetSizeOptions = ["Single", "Double", "King", "Queen"];
  const colorOptions = ["Red", "Blue", "Black", "White", "Yellow", "Green"];

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    price: "",
    description: "",
    fabric: "",
    bedsheetSize: "",
    colors: [],
    categoryId: "",
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
  }, []);

  // ---------------------------- HANDLERS ----------------------------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((v) => data.append(key, v));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (!mainImage) return toast.error("Main image required");

      data.append("mainImage", mainImage);
      subImages.forEach((img) => data.append("subImages", img));

      await API.post("/admin/importproduct", data);

      toast.success("Product Uploaded Successfully!");

      setShowModal(false); // close modal
      fetchProducts(); // refresh table

      // reset form
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
        bedsheetSize: "",
        colors: [],
        categoryId: "",
      });
    } catch (err) {
      toast.error("Failed to upload product");
      console.log(err);
    }
  };



  function handleDelete(id){
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
     {/* CATEGORY WISE UI */}
<div className="space-y-4">

  {categories.map((cat) => {
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
</div>

  























      {/* ------------------ MODAL ------------------ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
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
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Category */}
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              >
                <option>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Name */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-3 rounded-lg w-full"
              />

              {/* Title */}
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Product Title"
                className="border p-3 rounded-lg w-full"
              />

              {/* Price */}
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-3 rounded-lg w-full"
              />

              {/* Description */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-3 rounded-lg w-full"
              />

              {/* Fabric */}
              <select
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              >
                <option>Select Fabric</option>
                {fabricOptions.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>

              {/* Bedsheet Size */}
              <select
                name="bedsheetSize"
                value={formData.bedsheetSize}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              >
                <option>Select Size</option>
                {bedsheetSizeOptions.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>

              {/* Colors */}
              <div>
                <h3 className="font-semibold mb-2">Select Colors</h3>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => {
                    const selected = formData.colors.includes(color);
                    return (
                      <div
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`px-4 py-1 rounded-full cursor-pointer border ${
                          selected
                            ? "bg-black text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {color}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Main Image */}
              <input
                type="file"
                ref={mainImageRef}
                onChange={handleMainImage}
                className="border p-3 rounded-lg w-full"
              />
              {mainPreview && (
                <img
                  src={mainPreview}
                  className="w-24 h-24 object-cover rounded-lg mt-2"
                />
              )}

              {/* Sub Images */}
              <input
                type="file"
                multiple
                onChange={handleSubImages}
                className="border p-3 rounded-lg w-full"
              />

              {subImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {subImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-white text-red-600 px-1 rounded text-xs"
                        onClick={() => removeSubImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit */}
              <button className="bg-yellow-600 text-white py-3 rounded-lg w-full">
                Upload Product
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ImportProduct;
