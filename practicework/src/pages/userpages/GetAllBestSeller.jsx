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
          setProducts(res.data.product || []);
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
    
    <div className="pb-10">

      {/* TITLE + BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 my-8 flex justify-between items-start">
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-yellow-500 inline-block pb-1">
            Best Seller Products
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

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center">No products available.</p>
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

      <Footer />
    </div>
  );
};

export default GetAllBestSeller;
