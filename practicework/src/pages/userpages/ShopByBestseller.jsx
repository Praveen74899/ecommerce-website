import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { ArrowRight } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
const ShopByBestseller = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
const location = useLocation();
const isPage = location.pathname === "/shopbybestseller";

  const fetchData = async () => {
    try {
      const res = await API.get("/user/getbestseller");
      setData(res.data.bestSellers); // store array
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);   // instant jump to top
  }, []);

  return (
    <div>

{isPage && (
  <div className="w-full">
    <img src="/banner.png" alt="Banner" className="w-full h-56 md:h-72 lg:h-110 "/>
  </div>
)}

   <div className="max-w-7xl mx-auto p-4">

  {/* Heading */}
  <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-yellow-500 inline-block mb-6">
    Best Sellers
  </h2>

  {/* Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">

 { data.filter((item) => item.status === true)
      .map((item) => (
      <div 
        key={item._id}
        className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-3"
        onClick={() => navigate(`/getallbestseller/${item._id}`)}
    >
        {/* IMAGE */}
        <img 
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-lg"
        />

        {/* NAME right aligned */}
        <div className="mt-3 flex justify-end">
          <h3 className="text-lg font-medium text-gray-700">
            {item.name}
          </h3>
        </div>
      </div>
    ))}

    {/* Empty fallback */}
    {data.length === 0 && (
      <p className="text-gray-500 text-center col-span-full">No Bestsellers found</p>
    )}
  </div>
</div>
  <div>
    {isPage && <Footer />}

  </div>
</div>
  );
};

export default ShopByBestseller;
