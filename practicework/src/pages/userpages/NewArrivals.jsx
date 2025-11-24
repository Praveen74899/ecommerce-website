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
    <div>
    <div 
  className="w-full h-56 md:h-72 lg:h-110 relative bg-cover bg-center"
  style={{ backgroundImage: "url('/newarrivals.png')" }}
>
  <button
    onClick={() => navigate("/newarrivals")}
    className="absolute 
               bottom-6 md:bottom-10 lg:bottom-30  /* adjust according to your image */
               right-6 md:right-12 lg:right-52  /* adjust according to your image */
               w-32 md:w-40 lg:w-56 h-12 md:h-14 lg:h-16 bg-yellow-100 text-white-800 
               font-semibold shadow 
               cursor-pointer transition"
  >
    SHOP NOW
  </button>
</div>


   
    <div className="pb-10">

      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 my-8 flex justify-between items-start">

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-yellow-500 inline-block pb-1">
            New Arrivals
          </h2>

          <p className="text-gray-600 mt-1">
            {products.length} products found
          </p>
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
          <p className="text-gray-500 text-center">No new arrivals available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/oneproduct/${product._id}`)}
              >
                <img
                  src={product.mainImage}
                  className="w-full h-52 object-cover rounded-t-xl"
                  alt={product.name}
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>

                  <p className="text-sm text-gray-500 line-clamp-1">
                    {product.title}
                  </p>

                  <p className="mt-2 font-bold text-gray-900 text-lg">
                    ₹{product.price}
                  </p>
                </div>
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
