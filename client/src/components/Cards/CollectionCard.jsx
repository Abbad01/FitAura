import { Link } from "react-router-dom";

const CollectionCard = ({ image, title, link }) => {
  return (
    <div className="relative overflow-hidden group rounded-xl">
      
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-175 object-cover transform group-hover:scale-105 transition-transform duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/30 transition-colors duration-500" />

      {/* Content */}
      <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-6 rounded-md max-w-xs">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          {title}
        </h2>

        <Link
          to={link}
          className="text-sm font-medium text-gray-900 underline underline-offset-4 
                     hover:text-gray-600 transition-colors"
        >
          Shop Now
        </Link>
      </div>

    </div>
  );
};

export default CollectionCard;
