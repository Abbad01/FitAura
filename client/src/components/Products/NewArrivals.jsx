import React, { useEffect, useRef, useState } from "react";
import ArrivalCard from "../Cards/ArrivalCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);

  // Fetch new arrivals
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  // Scroll handler
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Enable / disable scroll buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollWidth > container.scrollLeft + container.clientWidth
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, [newArrivals]);

  return (
    <section className="py-10 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0 top-full mt-2 flex gap-3 z-10">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-11 h-11 rounded-full flex items-center justify-center
              ${
                canScrollLeft
                  ? "bg-white hover:bg-black hover:text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-11 h-11 rounded-full flex items-center justify-center
              ${
                canScrollRight
                  ? "bg-white hover:bg-black hover:text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="container mx-auto pt-5 flex gap-6 overflow-x-auto scroll-smooth"
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-70 sm:min-w-[320px] md:min-w-90"
          >
            <ArrivalCard
              image={product.images?.[0]?.url}
              title={product.name}
              price={product.price}
              id={product._id}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
