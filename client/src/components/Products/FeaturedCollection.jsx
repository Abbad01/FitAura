import React from "react";
import { Link } from "react-router-dom";


const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0 ">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 bg-green-50 rounded-3xl overflow-hidden">
        
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 lg:p-12 text-center lg:text-left">
          <h3 className="text-lg font-semibold text-gray-600 mb-2 tracking-wide">
            Comfort and Style
          </h3>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Apparel made for your everyday life
          </h2>

          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Discover high-quality, comfortable clothing that effortlessly
            blends fashion and function. Designed to make you look and feel
            great every day.
          </p>

          <Link
            to="/collections/all"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg text-lg
                       hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 w-full h-80 lg:h-120">
          <img
            src="https://picsum.photos/500/500?random=23"
            alt="Featured Collection"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
