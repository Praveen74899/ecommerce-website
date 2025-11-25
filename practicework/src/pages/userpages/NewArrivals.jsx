import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const NewArrivals = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // fetch new arrivals
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await API.get(`/user/getallnewarrival`);

        if (res.data.success) {
          setProducts(res.data.newArrival || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F9F6F1]">

  {/* ================= HERO BANNER ================= */}
  <div 
    className="w-full h-56 md:h-72 lg:h-96 relative bg-cover bg-center"
    style={{ backgroundImage: "url('/newarrivals.png')" }}
  >

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/30"></div>

    {/* TEXT ON IMAGE */}
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
      
      <p className="text-[12px] md:text-[14px] tracking-[3px] uppercase">
        Explore Latest Trends
      </p>

      <h2 className="text-2xl md:text-4xl font-semibold tracking-[4px] uppercase mt-1">
        New Arrivals
      </h2>

      {/* CTA BUTTON */}
      <button
        onClick={() => navigate("/newarrivals")}
        className="mt-5 px-8 py-2 border border-white uppercase tracking-[2px]
                   text-sm hover:bg-white hover:text-black transition duration-300"
      >
        Shop Now
      </button>

    </div>
  </div>

  {/* ================== MAIN SECTION ================== */}
  <div className="pb-16">

    {/* TITLE + BACK BUTTON */}
    <div className="max-w-7xl mx-auto px-4 md:px-6 my-10 flex justify-between items-start">

      <div>
        <p className="text-[12px] tracking-[3px] uppercase text-gray-600">
          Fresh & Trending
        </p>

        <h2 className="text-[26px] font-semibold tracking-[4px] uppercase text-[#1A1A1A] border-b-4 border-yellow-500 pb-1 inline-block mt-1">
          New Arrivals
        </h2>

        <p className="text-gray-600 mt-2">{products.length} products found</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium flex items-center gap-2"
      >
        ← Back
      </button>

    </div>

    {/* PRODUCT GRID */}
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

          {products.map((product) => (
            <div
              key={product._id}
              className="cursor-pointer group"
              onClick={() => navigate(`/oneproduct/${product._id}`)}
            >
              {/* IMAGE */}
              <div className="overflow-hidden rounded-sm">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-56 object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* NAME */}
              <h3 className="mt-4 text-[14px] uppercase tracking-[2px] font-medium text-[#1A1A1A]">
                {product.name}
              </h3>

              {/* TITLE */}
              <p className="text-[12px] text-gray-500 mt-1 line-clamp-1">
                {product.title}
              </p>

              {/* PRICE */}
              <p className="font-semibold text-[#1A1A1A] text-lg mt-2">
                ₹{product.price}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>

  </div>

  <Footer />
</div>

  );
};

export default NewArrivals;
