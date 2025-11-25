import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ShowLikeProduct() {
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const fetchLikes = async () => {
      try {
        const res = await API.get(`/user/getlikeproduct/${userId}`);
        setLikedProducts(res.data.product || []);
      } catch (error) {
        console.log("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, []);

  return (
    <div className="bg-[#F9F6F1] min-h-screen pt-7 pb-10">

      {/* ===================== PAGE HEADING ===================== */}
      <div className="max-w-6xl mx-auto px-6">
        
        <p className="text-[13px] uppercase tracking-[3px] text-gray-700">
          Your Wishlist
        </p>

        <h2 className="text-[28px] font-semibold uppercase tracking-[4px] text-[#1A1A1A] mt-1">
          Liked Products ❤️
        </h2>

        <p className="text-gray-600 mt-1 text-[14px]">
          {likedProducts.length} products saved
        </p>

        <div className="h-[2px] bg-yellow-500 w-20 mt-3"></div>
      </div>

      {/* ===================== PRODUCT GRID ===================== */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        
        {likedProducts.length === 0 ? (
          <p className="text-gray-600 text-center text-lg mt-20">
            No liked products yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">

            {likedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/oneproduct/${product._id}`)}
                className="cursor-pointer group"
              >
                {/* IMAGE */}
                <div className="overflow-hidden rounded-sm shadow-sm">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-60 object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                {/* PRODUCT NAME */}
                <h3 className="mt-4 text-[14px] uppercase tracking-[2px] font-medium text-[#1A1A1A]">
                  {product.name}
                </h3>

                {/* PRODUCT TITLE */}
                <p className="text-[12px] text-gray-500 mt-1 line-clamp-1">
                  {product.title}
                </p>

                {/* PRICE */}
                <p className="text-lg font-semibold text-[#1A1A1A] mt-2">
                  INR: {product.price}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}
