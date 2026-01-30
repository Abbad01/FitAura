import React from "react";
import heroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Rabbit"
        className="w-full h-100 md:h-150 lg:h-187.5 object-cover "
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-4 leading-tight">
            Vacation
            <br />
            Ready
          </h1>

          <p className="text-sm md:text-lg text-gray-200 mb-8 leading-relaxed">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>

          <Link
            to="#"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md text-lg font-medium 
                 hover:bg-gray-200 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
