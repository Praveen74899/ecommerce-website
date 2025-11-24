import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";


const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
const isPage = location.pathname === "/shopbycategory";
  useEffect(() => {
    API.get("/admin/categories")
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
    <div className="max-w-7xl mx-auto px-4 md:px-6 my-10">
     <div className="flex justify-between">
       <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-4 border-yellow-500 inline-block pb-1">
        Shop By Category
      </h2>
      <button
  onClick={() => navigate(-1)}
  className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium flex items-center gap-2"
>
  ← Back
</button>

     </div>


      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 gap-4">
        {categories
          .filter((cat) => cat.status === true)
          .map((cat) => (

            <div
              // onClick={() => navigate(`//${cat._id}`)}
              onClick={() => {
                navigate(`/getallcategory/${cat._id}`);

              }}
              key={cat._id}
              className="bg-white rounded-xl shadow transition transform hover:-translate-y-2 hover:shadow-xl duration-300 cursor-pointer overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-40 w-full object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
              />
              <p className="text-center py-2 text-gray-700 font-medium">
                {cat.name}
              </p>
            </div>
          ))}
      </div>

    </div>
    {isPage && <Footer />}

    </>
  );
};

export default ShopByCategory;
