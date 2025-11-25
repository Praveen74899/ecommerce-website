import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const GetAllBestSeller = () => {
  const { id } = useParams(); // bestSellerId
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get(`/user/getallbestsellerproductbyid/${id}`);

        if (res.data.success) {
          setProducts(res.data.products || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  return (
    
    <div className="pb-16 bg-[#F9F6F1]">

  {/* ===================== TITLE + BACK BUTTON ===================== */}
  <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 mb-10 flex justify-between items-start">

    {/* LEFT SIDE — TITLE + COUNT */}
    <div>
      <p className="text-[13px] tracking-[3px] uppercase text-gray-700">
        Explore Collection
      </p>

      <h2 className="text-[26px] font-semibold tracking-[4px] uppercase text-[#1A1A1A] mt-1">
        Best Seller Products
      </h2>

      <p className="text-gray-600 mt-2 text-sm">
        {products.length} products found
      </p>
    </div>

    {/* RIGHT SIDE — BACK BUTTON */}
    <button
      onClick={() => navigate(-1)}
      className="px-5 py-2 bg-[#E4DCD3] hover:bg-[#d9d1c8] rounded-sm 
                 text-gray-800 tracking-[1px] uppercase text-[13px] transition"
    >
      ← Back
    </button>

  </div>

  {/* ===================== PRODUCT GRID ===================== */}
  <div className="max-w-7xl mx-auto px-4 md:px-6 mb-9">

    {products.length === 0 ? (
      <p className="text-gray-500 text-center">No products available.</p>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/oneproduct/${product._id}`)}
            className="cursor-pointer group"
          >
            {/* IMAGE */}
            <div className="overflow-hidden rounded-sm">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-56 object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* PRODUCT NAME */}
            <h3 className="mt-4 text-[14px] uppercase tracking-[2px] text-[#1A1A1A] font-medium">
              {product.name}
            </h3>

            {/* TITLE */}
            <p className="text-[12px] text-gray-500 mt-1 line-clamp-1">
              {product.title}
            </p>

            {/* PRICE */}
            <p className="mt-2 font-semibold text-[#1A1A1A] text-[16px]">
              ₹{product.price}
            </p>

          </div>
        ))}

      </div>
    )}

  </div>

  {/* ===================== FOOTER ===================== */}
  <Footer />

</div>

  );
};

export default GetAllBestSeller;
