import React from "react";
import { Link } from "react-router-dom";

const ArrivalCard = ({ image, title, price, id }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="block relative overflow-hidden rounded-xl group"
    >
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-105 object-cover 
                   transition-transform duration-500 
                   group-hover:scale-105"
      />

      {/* Bottom Gradient Overlay */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 
                   bg-linear-to-t from-black/70 to-transparent"
      />

      {/* Text Content */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-sm font-medium leading-tight">
          {title}
        </h3>
        <p className="text-sm font-semibold mt-1">
          ${price}
        </p>
      </div>
    </Link>
  );
};

export default ArrivalCard;
