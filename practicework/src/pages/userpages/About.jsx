import React from "react";

export default function About() {
  return (
    <div className="w-full bg-[#F9F6F1]">

      {/* ================= HERO SECTION ================= */}
      <div className="w-full h-64 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6580223/pexels-photo-6580223.jpeg')",
        }}
      >
        <div className="w-full h-full bg-black/30 flex items-center justify-center">
          <h1
            className="text-3xl md:text-5xl text-white font-semibold tracking-[5px] uppercase"
            style={{ fontFamily: "serif" }}
          >
            About Us
          </h1>
        </div>
      </div>

      {/* ================= BRAND STORY ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2
          className="text-[28px] md:text-[32px] font-semibold tracking-[3px] uppercase text-[#1A1A1A] mb-6"
          style={{ fontFamily: "serif" }}
        >
          Our Story
        </h2>

        <p className="text-[16px] text-gray-700 leading-relaxed">
          Soft Home Essentials was created with one vision — to bring elegance,
          warmth and modern comfort into every home. Starting from a small
          curated collection, today we are a trusted name for premium home
          furnishing essentials across India.
        </p>

        <p className="text-[16px] text-gray-700 leading-relaxed mt-4">
          Every product reflects craftsmanship, thoughtful design and
          long-lasting comfort. From soft bed sheets to luxurious quilts,
          elegant curtains to premium towels — we ensure your home feels
          beautiful and comforting.
        </p>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          <div>
            <h3 className="text-[26px] font-semibold tracking-[2px] uppercase text-[#1A1A1A] mb-3">
              Our Mission
            </h3>
            <p className="text-gray-700 text-[16px] leading-relaxed">
              To offer premium-quality home essentials that blend luxury with
              daily comfort — making every home beautifully livable.
            </p>
          </div>

          <div>
            <h3 className="text-[26px] font-semibold tracking-[2px] uppercase text-[#1A1A1A] mb-3">
              Our Vision
            </h3>
            <p className="text-gray-700 text-[16px] leading-relaxed">
              To become India’s most loved home furnishing brand through quality,
              craftsmanship, and customer trust.
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2
          className="text-[28px] md:text-[32px] font-semibold tracking-[3px] uppercase text-[#1A1A1A] mb-10"
          style={{ fontFamily: "serif" }}
        >
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {[
            "Premium Fabrics",
            "Modern Elegant Designs",
            "Affordable Luxury",
            "Trusted Quality",
            "Customer First",
            "Eco-Friendly Practices",
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
            >
              <h4 className="text-lg font-semibold text-[#1A1A1A] mb-2 tracking-wide">
                {item}
              </h4>
              <p className="text-gray-700 text-sm">
                High-quality materials, beautiful designs — built to enhance every
                corner of your home.
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= IMAGE + CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

        <img
          src="https://images.pexels.com/photos/6580223/pexels-photo-6580223.jpeg"
          alt="Furnishing"
          className="rounded-xl shadow-lg w-full object-cover"
        />

        <div className="flex flex-col justify-center">
          <h2
            className="text-[28px] md:text-[32px] font-semibold tracking-[3px] uppercase text-[#1A1A1A] mb-4"
            style={{ fontFamily: "serif" }}
          >
            Crafted With Care
          </h2>

          <p className="text-[16px] text-gray-700 leading-relaxed">
            Each piece goes through careful design and quality checks to ensure
            excellence. Our craftsmen bring passion and skill together to make
            products you’ll love for years.
          </p>
        </div>
      </section>

      {/* ================= FOOTER THANK YOU ================= */}
      <section className="text-center py-12 bg-white">
        <p className="text-lg text-gray-700 tracking-wide">
          Thank you for choosing
          <span className="font-semibold text-[#1A1A1A]"> Soft Home Essentials </span>.
          We feel honored to be a part of your beautiful home.
        </p>
      </section>

    </div>
  );
}
