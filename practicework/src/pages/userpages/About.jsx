import React from "react";

export default function About() {
  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
     

      {/* ================= BRAND STORY ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-olive mb-6">Our Story</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Trident was born with a simple vision — to make every home a place of 
          warmth, comfort, and beauty. We started with a small collection of 
          premium home furnishing products, focusing on elegant designs and 
          long-lasting quality. Today, Trident has grown into a trusted name 
          for modern home essentials that blend luxury with everyday usability.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Every product we create reflects passion, craftsmanship, and attention 
          to detail. From soft bed sheets to cozy blankets and stylish curtains, 
          our mission is to make your home feel like a sanctuary.
        </p>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          <div>
            <h3 className="text-3xl font-bold text-olive mb-4">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To deliver premium-quality home furnishing products that elevate 
              your comfort while staying affordable and accessible for every home.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-olive mb-4">Our Vision</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become India’s most trusted home furnishing brand by blending 
              craftsmanship, modern design, and unmatched comfort.
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-olive mb-8">Why Choose Trident?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-olive mb-2">Premium Fabrics</h4>
            <p className="text-gray-700">
              Soft, durable, high-thread count fabrics designed for maximum comfort.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-olive mb-2">Modern Designs</h4>
            <p className="text-gray-700">
              Trendy patterns and elegant designs that match every home interior.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-olive mb-2">Affordable Luxury</h4>
            <p className="text-gray-700">
              Luxury-level products at prices that fit every budget.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-olive mb-2">Trusted Quality</h4>
            <p className="text-gray-700">
              Rigorously tested products to ensure long-lasting satisfaction.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-olive mb-2">Customer First</h4>
            <p className="text-gray-700">
              Fast delivery, easy returns, and dedicated customer support.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-olive mb-2">Eco-Friendly</h4>
            <p className="text-gray-700">
              We use sustainable materials and responsible manufacturing practices.
            </p>
          </div>

        </div>
      </section>

      {/* ================= IMAGE + CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div>
          <img
            src="https://images.pexels.com/photos/6580223/pexels-photo-6580223.jpeg"
            alt="Home Furnishing"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-olive mb-4">Crafted With Care</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            From fabric selection to stitching, every step of production undergoes strict 
            quality checks to ensure you receive the best. Our expert craftsmen put their 
            heart into creating products that feel as good as they look.
          </p>
        </div>

      </section>

      {/* ================= FOOTER THANK YOU ================= */}
      <section className="text-center py-12 bg-gray-50">
        <p className="text-lg text-gray-700">
          Thank you for choosing <span className="font-semibold text-olive">Trident</span>.  
          We’re honored to be a part of your home.
        </p>
      </section>

    </div>
  );
}
