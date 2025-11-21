import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OneProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState("");

  // 👉 User selected size & color
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user/products/${id}`
        );

        setProduct(res.data);
        setMainImage(res.data.mainImage);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  
  useEffect(() => {
  window.scrollTo(0, 0);   // instant jump to top
}, []);

  if (loading) return <p className="p-5 text-lg">Loading...</p>;
  if (!product) return <p className="p-5 text-lg">Product not found</p>;



  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* LEFT SIDE */}
      <div>
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg shadow-lg bg-gray-100"
        />

        <div className="flex gap-3 mt-4">
          {[product.mainImage, ...product.subImages].map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 object-cover rounded-md border cursor-pointer transition-all
                ${mainImage === img ? "border-black scale-105 shadow" : "border-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-gray-600 mt-1">{product.title}</p>

        <p className="text-2xl font-bold text-green-700 mt-3">
          ₹{product.price}
        </p>

        <p className="text-gray-700 mt-4">{product.description}</p>

        {/* SIZE SELECTION */}
        {product.sizes?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-lg text-gray-800">Select Size:</h3>

            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border font-medium transition-all 
                    ${selectedSize === size
                      ? "bg-black text-white border-black scale-105"
                      : "bg-gray-200 text-gray-800 border-gray-400 hover:bg-gray-300"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {selectedSize && (
              <p className="text-sm mt-1 text-green-600">
                Selected size: {selectedSize}
              </p>
            )}
          </div>
        )}

        {/* COLOR SELECTION */}
        {product.colors?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-lg text-gray-800">Select Color:</h3>

            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer shadow 
                    transition-all
                    ${selectedColor === color ? "border-black scale-110" : "border-gray-300"}`}
                ></div>
              ))}
            </div>

            {selectedColor && (
              <p className="text-sm mt-1 text-green-600">
                Selected color: {selectedColor}
              </p>
            )}
          </div>
        )}

        {/* BUTTONS */}
        <div className="mt-8 flex gap-5">
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 shadow">
            Add to Cart
          </button>
          <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 shadow">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
