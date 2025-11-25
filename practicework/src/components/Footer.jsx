import React from 'react'

const Footer = () => {
  return (
    <div><footer className="bg-[#EDE6D8] text-gray-900 pt-12 pb-8 px-6">

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* COLUMN 1 */}
    <div>
      <h2 className="text-black font-semibold text-lg mb-4">TRIDENT GROUP</h2>
      <ul className="space-y-2 text-sm">
        <li>About Us</li>
        <li>Raise Return/Exchange</li>
        <li>Return/Refund Policy</li>
        <li>Track Order</li>
        <li>Locate our Store</li>
        <li>Contact Us</li>
        <li>Partner Companies</li>
        <li>Our Exclusive Stores</li>
        <li>Blogs</li>
        <li>Shop All Products</li>
      </ul>
    </div>

    {/* COLUMN 2 */}
    <div>
      <h2 className="text-black e font-semibold text-lg mb-4">CATEGORIES</h2>
      <ul className="space-y-2 text-sm">
        <li>Bedding</li>
        <li>Towels</li>
        <li>AC Comforters & Dohars</li>
        <li>Pillows & Cushions</li>
        <li>Rugs & Baskets</li>
      </ul>
    </div>

    {/* COLUMN 3 - SOCIAL + CONTACT */}
    <div>
      <h2 className="text-black font-semibold text-lg mb-4">FOLLOW US</h2>

      <div className="flex gap-4 mb-6">
        <i className="fa-brands fa-facebook text-2xl hover:text-white"></i>
        <i className="fa-brands fa-instagram text-2xl hover:text-white"></i>
        <i className="fa-brands fa-x-twitter text-2xl hover:text-white"></i>
        <i className="fa-brands fa-pinterest text-2xl hover:text-white"></i>
      </div>

      <h2 className="text-black  font-semibold text-lg mb-3">Contact Us</h2>

      <p className="text-sm">E-MAIL:</p>
      <p className="text-sm mb-2">care@mytrident.com</p>

      <p className="text-sm">CALL US AT:</p>
      <p className="text-sm mb-2">18001802999</p>

      <p className="text-sm">WHATSAPP US AT:</p>
      <p className="text-sm">+91 9878997181</p>
    </div>

    {/* COLUMN 4 - NEWSLETTER */}
    <div>
      <h2 className="text-black  font-semibold text-lg mb-4">JOIN OUR NEWSLETTER</h2>

      <p className="text-sm mb-4">
        Get updates about new products and exclusive discounts.
      </p>

      <div className="flex bg-white rounded overflow-hidden">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 w-full text-gray-900 outline-none"
        />
        <button className="bg-gray-800 text-white px-4 hover:bg-gray-700">
          Subscribe
        </button>
      </div>

     

    
    </div>
  </div>

  {/* Bottom line */}
  <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
    © {new Date().getFullYear()} TRIDENT GROUP — All Rights Reserved.
  </div>
</footer>
</div>
  )
}

export default Footer