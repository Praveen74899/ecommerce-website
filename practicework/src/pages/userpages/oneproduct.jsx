import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OneProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();


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


const handleAddToCart = () => {
  console.log("Add to cart logic chalu hai...");
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  console.log("Add to cart logic chalu hai...");
};
const handleBuyNow = () => {
  console.log("Buy now logic chalu hai...");
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  console.log("Buy now logic chalu hai...");
};


  return (
    <div className="bg-[#F9F6F1] py-16">

  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">

    {/* ================= LEFT IMAGES ================= */}
    <div>

      {/* MAIN IMAGE */}
      <div className="overflow-hidden rounded-sm">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-[480px] object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* SUB IMAGES */}
      <div className="flex gap-3 mt-5">
        {[product.mainImage, ...product.subImages].map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setMainImage(img)}
            className={`
              w-24 h-24 object-cover rounded-sm cursor-pointer transition-all
              ${mainImage === img 
                ? "ring-2 ring-[#1A1A1A] scale-105" 
                : "opacity-80 hover:opacity-100"}
            `}
          />
        ))}
      </div>

    </div>

    {/* ================= RIGHT PRODUCT DETAILS ================= */}
   <div >



      {/* TITLE SECTION */}
      <p className="text-[13px] tracking-[3px] uppercase text-gray-700">
        Premium Collection
      </p>

      <h1 className="text-[30px] font-semibold tracking-[3px] uppercase text-[#1A1A1A] mt-1">
        {product.name}
      </h1>

      <p className="text-gray-600 tracking-wide mt-1 text-[14px]">
        {product.title}
      </p>

      {/* PRICE */}
      <p className="text-[28px] font-semibold text-[#1A1A1A] mt-5">
        ₹{product.price}
      </p>

      {/* DESCRIPTION */}
      <p className="text-gray-700 leading-relaxed mt-4 text-[15px]">
        {product.description}
      </p>

      {/* ================= SIZE OPTIONS ================= */}
      {product.sizes?.length > 0 && (
        <div className="mt-8">
          <h3 className="uppercase text-[13px] tracking-[2px] text-[#1A1A1A] mb-3">
            Select Size
          </h3>

          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                  px-5 py-2 border rounded-sm text-[13px] uppercase tracking-[1px] transition
                  ${selectedSize === size
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white border-gray-300 hover:border-black"}
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= COLOR OPTIONS ================= */}
      {product.colors?.length > 0 && (
        <div className="mt-10">
          <h3 className="uppercase text-[13px] tracking-[2px] text-[#1A1A1A] mb-3">
            Select Color
          </h3>

          <div className="flex gap-4 flex-wrap">
            {product.colors.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className={`
                  w-10 h-10 rounded-full cursor-pointer transition
                  ${selectedColor === color ? "ring-2 ring-black scale-110" : "ring-1 ring-gray-300"}
                `}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="mt-12 flex gap-5">

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="
            w-40 py-3 border border-[#1A1A1A] text-[#1A1A1A] 
            uppercase tracking-[2px] text-[13px]
            hover:bg-[#1A1A1A] hover:text-white transition
          "
        >
          Add To Cart
        </button>

        {/* BUY NOW */}
        <button
          onClick={handleBuyNow}
          className="
            w-40 py-3 bg-[#1A1A1A] text-white 
            uppercase tracking-[2px] text-[13px]
            hover:bg-black transition
          "
        >
          Buy Now
        </button>

      </div>

    </div>

  </div>
</div>

  );
};

export default OneProduct;
