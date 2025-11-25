import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";


const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
const isPage = location.pathname === "/shopbycategory";
  useEffect(() => {
    API.get("/user/categories")
      .then((res) => {
        setCategories(res.data.categories); // change according to backend
        console.log("data hai ", res.data.categories);
      })
      .catch((err) => {
        console.error("Category Fetch Error:", err);
      });
  }, []);


useEffect(() => {
  window.scrollTo(0, 0);   // instant jump to top
}, []);

  return (
    <>
    <div className="w-full bg-[#F4EFE6] py-12">
    <div className="max-w-7xl mx-auto px-4 md:px-6">

      {/* TOP SECTION LIKE SADYASKA */}
      <div className="flex justify-between items-start mb-10">

        <div>
          <p className="text-[13px] uppercase tracking-[3px] text-gray-700">
            Explore Our Collection
          </p>

          <h2 className="text-[26px] font-semibold tracking-[3px] uppercase text-[#1A1A1A] mt-1">
            Shop By Category
          </h2>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-[#E4DCD3] hover:bg-[#d9d1c8] rounded-sm 
                     text-gray-800 tracking-[1px] uppercase text-[13px] transition"
        >
          ← Back
        </button>
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {categories
          .filter((cat) => cat.status === true)
          .map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate(`/getallcategory/${cat._id}`)}
              className="bg-white rounded-sm shadow-sm hover:shadow-md 
                         transition duration-300 cursor-pointer overflow-hidden group"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-48 w-full object-cover transition-transform duration-500 
                             group-hover:scale-110"
                />
              </div>

              {/* Category Name */}
              <p className="text-center py-4 text-[#1A1A1A] text-[13px] font-medium 
                            uppercase tracking-[2px]">
                {cat.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  </div>
    {isPage && <Footer />}

    </>
  );
};

export default ShopByCategory;
