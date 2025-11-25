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

  {/* TOP BANNER (LIKE SADYASKA COLLECTION PAGE) */}
  {isPage && (
    <div className="w-full">
      <img
        src="/banner.png"
        alt="Banner"
        className="w-full h-56 md:h-72 lg:h-[420px] object-cover"
      />
    </div>
  )}

  {/* SECTION WRAPPER */}
  <div className="max-w-7xl mx-auto px-4 py-10">

    {/* HEADING LIKE SADYASKA */}
    <div className="mb-10">
      <p className="text-[13px] tracking-[3px] uppercase text-gray-700">
        Explore Our Best Picks
      </p>

      <h2 className="text-[26px] font-semibold tracking-[4px] uppercase text-[#1A1A1A] mt-1">
        Best Sellers
      </h2>
    </div>

    {/* GRID */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-10">

      {data
        .filter((item) => item.status === true)
        .map((item) => (
          <div
            key={item._id}
            className="cursor-pointer group overflow-hidden"
            onClick={() => navigate(`/getallbestseller/${item._id}`)}
          >

            {/* IMAGE BOX (Sadyaska style) */}
            <div className="overflow-hidden rounded-sm">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* CATEGORY NAME RIGHT-ALIGNED */}
            <div className="mt-4 flex justify-center">
              <h3 className="text-[13px] uppercase tracking-[2px] text-[#1A1A1A]">
                {item.name}
              </h3>
            </div>
          </div>
        ))}

      {/* EMPTY */}
      {data.length === 0 && (
        <p className="text-gray-500 text-center col-span-full">
          No Bestsellers found
        </p>
      )}

    </div>
  </div>

  {/* FOOTER */}
  {isPage && <Footer />}

</div>

  );
};

export default ShopByBestseller;
