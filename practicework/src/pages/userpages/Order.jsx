import React from "react";

export default function Orders() {
  return (
    <div className="w-full bg-[#F9F6F1] py-16">

      {/* ================= PAGE TITLE ================= */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <h1
          className="text-[28px] md:text-[32px] font-semibold tracking-[3px] uppercase text-[#1A1A1A]"
          style={{ fontFamily: "serif" }}
        >
          My Orders
        </h1>
        <p className="text-gray-600 mt-2 text-sm tracking-wide">
          Track your order status & view details
        </p>
      </div>

      {/* ================= ORDER LIST ================= */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-6">

        {/* ======= SINGLE ORDER CARD ======= */}
        <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
          
          {/* ORDER TOP SECTION */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                Order ID: <span className="font-medium text-[#1A1A1A]">#12458931</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Placed on: 25 Nov 2025
              </p>
            </div>

            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium tracking-wide">
              Delivered
            </span>
          </div>

          {/* PRODUCT ROW */}
          <div className="flex gap-5 mt-6">
            <img
              src="https://images.pexels.com/photos/6580223/pexels-photo-6580223.jpeg"
              alt="product"
              className="w-28 h-28 object-cover rounded-md"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-[#1A1A1A] text-lg">
                Cotton Luxury Bedsheet
              </h3>
              <p className="text-sm text-gray-600 mt-1">Color: Blue</p>
              <p className="text-sm text-gray-600">Size: King</p>
              <p className="mt-2 font-bold text-[#1A1A1A]">₹1499</p>
            </div>
          </div>

          {/* ORDER FOOTER */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            
            <button className="px-5 py-2 border border-[#1A1A1A] text-[#1A1A1A] text-sm rounded-md tracking-[2px] uppercase hover:bg-[#1A1A1A] hover:text-white transition">
              View Details
            </button>

            <button className="px-5 py-2 bg-[#1A1A1A] text-white text-sm rounded-md tracking-[2px] uppercase hover:bg-black transition">
              Track Order
            </button>

          </div>
        </div>

        {/* ======= SECOND STATIC ORDER ======= */}
        <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
          
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                Order ID: <span className="font-medium text-[#1A1A1A]">#12458932</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Placed on: 18 Nov 2025
              </p>
            </div>

            <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium tracking-wide">
              In Transit
            </span>
          </div>

          <div className="flex gap-5 mt-6">
            <img
              src="https://images.pexels.com/photos/6580223/pexels-photo-6580223.jpeg"
              alt="product"
              className="w-28 h-28 object-cover rounded-md"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-[#1A1A1A] text-lg">
                Ultra Soft Blanket
              </h3>
              <p className="text-sm text-gray-600 mt-1">Color: Gray</p>
              <p className="text-sm text-gray-600">Size: Large</p>
              <p className="mt-2 font-bold text-[#1A1A1A]">₹1999</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <button className="px-5 py-2 border border-[#1A1A1A] text-[#1A1A1A] text-sm rounded-md tracking-[2px] uppercase hover:bg-[#1A1A1A] hover:text-white transition">
              View Details
            </button>

            <button className="px-5 py-2 bg-[#1A1A1A] text-white text-sm rounded-md tracking-[2px] uppercase hover:bg-black transition">
              Track Order
            </button>
          </div>
        </div>

        {/* ======= THIRD STATIC ORDER ======= */}
        <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
          
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                Order ID: <span className="font-medium text-[#1A1A1A]">#12458933</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Placed on: 12 Nov 2025
              </p>
            </div>

            <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-600 font-medium tracking-wide">
              Cancelled
            </span>
          </div>

          <div className="flex gap-5 mt-6">
            <img
              src="https://images.pexels.com/photos/6580223/pexels-photo-6580223.jpeg"
              alt="product"
              className="w-28 h-28 object-cover rounded-md"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-[#1A1A1A] text-lg">
                Soft Cushion Cover Set
              </h3>
              <p className="text-sm text-gray-600 mt-1">Color: Beige</p>
              <p className="text-sm text-gray-600">Set: 4 pcs</p>
              <p className="mt-2 font-bold text-[#1A1A1A]">₹899</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <button className="px-5 py-2 border border-[#1A1A1A] text-[#1A1A1A] text-sm rounded-md tracking-[2px] uppercase hover:bg-[#1A1A1A] hover:text-white transition">
              View Details
            </button>

            <button className="px-5 py-2 bg-[#1A1A1A] text-white text-sm rounded-md tracking-[2px] uppercase hover:bg-black transition">
              Track Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
