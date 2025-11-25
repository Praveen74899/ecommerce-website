import { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import React from "react";

const EditImportProduct = ({ selectedProduct, setIsEditOpen, fetchProducts,  }) => {

  const [form, setForm] = useState({
    name: selectedProduct.name,
    title: selectedProduct.title,
    price: selectedProduct.price,
    description: selectedProduct.description,
    fabric: selectedProduct.fabric,
    colors: selectedProduct.colors || [],
    categoryId: selectedProduct.categoryId ? selectedProduct.categoryId._id : "",
    bestSellerId: selectedProduct.bestSellerId || "",
  });

  const colorOptions = ["Red", "Blue", "Black", "White", "Yellow", "Green"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleColor = (color) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/admin/editproduct/${selectedProduct._id}`, form);
      toast.success("Product Updated!");
      fetchProducts();
      setIsEditOpen(false);
    } catch (err) {
      toast.error("Update failed");
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[600px] rounded-xl p-6 max-h-[90vh] overflow-y-auto relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsEditOpen(false)}
          className="absolute top-3 right-4 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Edit Product</h2>

        <form onSubmit={handleUpdate} className="space-y-6">

          {/* NAME */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
              placeholder="Enter product name"
            />
          </div>

          {/* TITLE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
              placeholder="Enter title"
            />
          </div>

          {/* PRICE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
              placeholder="Enter price"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full h-20"
              placeholder="Enter description"
            />
          </div>

          {/* FABRIC */}
            <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-gray-600">Fabric</label>
                    <select
                      name="fabric"
                      value={form.fabric}
                      onChange={handleChange}
                      className="p-3 rounded-lg w-full bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                    >
                      <option value="">Select Fabric</option>
                      { ["Cotton", "Silk", "Leather", "Denim", "Other"].map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                  </div>

          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Colors</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <span
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`px-4 py-1 rounded-full border cursor-pointer ${
                    form.colors.includes(color)
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button className="bg-[#4E342E] hover:bg-[#3E2723] text-white w-full py-3 rounded-lg font-semibold">
            Update Product
          </button>

        </form>

      </div>
    </div>
  );
};

export default EditImportProduct;
