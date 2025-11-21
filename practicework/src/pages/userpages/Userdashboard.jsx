import React, { useEffect, useState } from "react";
import API from "../../utils/api"
import UserDashboardNavbar from "../../components/Userlayout/UserNavbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Footer from "../../components/Footer";
import { jwtDecode } from "jwt-decode";
import ShopByCategory from "./ShopByCategory";
import GetAllBestSeller from "./GetAllBestSeller";

const bannerImages = [
  "/bedsheet.jpg",
  "/image.png",

];
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id;


  const [currentIndex, setCurrentIndex] = useState(0);


  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === bannerImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = async (productId) => {
    try {


      // const token = localStorage.getItem("token");

      console.log("DECODED USER ID:", userId);

      const res = await API.post(
        `/user/products/like/${productId}`,
        {},   // body empty hai
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("LIKE RESPONSE:", res);  // ✔ AB SAFE HAI

      // update UI
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId
            ? { ...p, likedBy: res.data.likedBy }
            : p
        )
      );

    } catch (err) {
      console.log(err);
      toast.error("Error liking product");
    }
  };


  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/user/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setProducts(response.data.product);
        } else {
          toast.error("Failed to load products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, []);


  return (
    <div>

      {/* BANNER CAROUSEL */}
      <div className="w-full relative overflow-hidden mb-6">

        {/* Banner Image */}
        <img
          src={bannerImages[currentIndex]}
          alt="Banner"
          className="w-full h-52 md:h-72 lg:h-122 object-cover"
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* TEXT ON TOP */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-2xl md:text-4xl font-bold">Premium Home Furnishings</h2>
          <p className="text-sm md:text-lg mt-2">
            Comfort, Style & Luxury Now at Your Home
          </p>

          <button className="mt-4 px-5 py-2 bg-white text-gray-800 font-semibold rounded-lg">
            Shop Now
          </button>
        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full"
        >
          ❮
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full"
        >
          ❯
        </button>

      </div>


      <ShopByCategory />

      <GetAllBestSeller/>

      {/* Dashboard Content */}


      <div className="max-w-7xl mx-auto px-4 md:px-6 my-10">

        <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-4 border-yellow-500 inline-block pb-1">
          All Products
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-50 p-4 rounded-xl shadow cursor-pointer"
                onClick={() => navigate(`/oneproduct/${product._id}`)}
              >

                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.title}</p>


                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-gray-800">₹{product.price}</p>

                  <Heart
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(product._id);
                    }}
                    className={`cursor-pointer transition-all ${product.likedBy?.includes(userId)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-500"
                      }`}
                  />



                </div>


                <p className="text-xs text-gray-500 mt-1">
                  {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                    <>Sizes: {product.sizes.join(", ")}</>
                  )}
                </p>

                <p className="text-xs text-gray-500">
                  {Array.isArray(product.colors) && product.colors.length > 0 && (
                    <>Colors: {product.colors.join(", ")}</>
                  )}
                </p>

              </div>

            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>


  );
};

export default Dashboard;
