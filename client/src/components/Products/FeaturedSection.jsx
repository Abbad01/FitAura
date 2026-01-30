import React from "react";
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi2";

const FeaturedSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="conatiner mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center gap-3">
          {/* Icon wrapper */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <HiShoppingBag className="text-xl text-gray-900" />
          </div>
          {/* Title */}
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
            Free International Shipping
          </h4>
          {/* Subtitle */}
          <p className="text-sm text-gray-500">On all orders over $100.00</p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center gap-3">
          {/* Icon wrapper */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <HiArrowPathRoundedSquare className="text-xl text-gray-900" />
          </div>
          {/* Title */}
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
            45 DAYS RETURN
          </h4>
          {/* Subtitle */}
          <p className="text-sm text-gray-500">Money back guarantee</p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center gap-3">
          {/* Icon wrapper */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <HiOutlineCreditCard className="text-xl text-gray-900" />
          </div>
          {/* Title */}
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
            SECURE CHECKOUT
          </h4>
          {/* Subtitle */}
          <p className="text-sm text-gray-500">100% Secure checkout process</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
