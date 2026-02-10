import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiSearch, FiX } from "react-icons/fi";
import { HiBars3 } from "react-icons/hi2";
import Searchbar from "./Searchbar";
import { useState } from "react";
import Cartdrawer from "../Layout/CartDrawer";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [ishamburgerOpen, setHamburgerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  //  console.log("REDUX CART STATE 👉", cart);
  const { user } = useSelector((state) => state.auth);
  const cartItemCount = cart?.products?.reduce(
    (total, product) => total + product.quantity,
    0 || 0
  );
  const toggleHamburger = () => {
    setHamburgerOpen(!ishamburgerOpen);
  };

  const [isdrawerOpen, setDrawerOpen] = useState(false);
  const toggleCartDrawer = () => {
    setDrawerOpen(!isdrawerOpen);
  };

  return (
    <>
      <nav className="bg-white text-black border-b border-gray-400">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="text-xl font-bold tracking-wide">
              <Link to="/" className="hover:text-gray-700">
                Rabbit
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 font-medium">
              <Link
                to="/collections/all?gender=Men"
                className="hover:text-gray-600"
              >
                MEN
              </Link>
              <Link
                to="/collections/all?gender=Women"
                className="hover:text-gray-600"
              >
                WOMEN
              </Link>
              <Link
                to="/collections/all?category=Top Wear"
                className="hover:text-gray-600"
              >
                TOPWEAR
              </Link>
              <Link
                to="/collections/all?category=Bottom Wear"
                className="hover:text-gray-600"
              >
                BOTTOMWEAR
              </Link>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center space-x-6">
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="rounded block text-sm bg-black text-white px-2 py-0.5"
                >
                  Admin
                </Link>
              )}
              <Link to="/profile" className="hover:text-gray-600">
                <FiUser className="h-5 w-5" />
              </Link>

              <button
                onClick={toggleCartDrawer}
                className="relative hover:text-gray-600 hover:cursor-pointer"
              >
                <FiShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                  w-4 h-4 flex items-center justify-center rounded-full"
                  >
                    {cartItemCount}
                  </span>
                )}
              </button>

              <Searchbar />

              <button
                className="md:hidden hover:cursor-pointer"
                onClick={toggleHamburger}
              >
                <HiBars3 className="h-6 w-6" />
              </button>

              {/**************  Mobile Menu ****************/}

              <div
                className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50
                  ${ishamburgerOpen ? "translate-x-0" : "-translate-x-full"}`}
              >
                {/* clase button */}
                <div className=" pt-4 pl-4 ">
                  <button
                    className="hover:cursor-pointer"
                    onClick={toggleHamburger}
                  >
                    <FiX className="h-5 w-5 text-gray-600 hover:text-gray-800 transition" />
                  </button>
                </div>

                <div className="pt-4">
                  <h2 className="text-sm font-semibold tracking-wide text-gray-500 mb-4 text-center uppercase">
                    Menu
                  </h2>

                  <div className="flex flex-col divide-y">
                    <Link
                      to="/collections/all?gender=Men"
                      className="py-3 px-2 text-base font-medium text-gray-900 
                         hover:bg-gray-100 transition rounded-md"
                    >
                      MEN
                    </Link>

                    <Link
                      to="/collections/all?gender=Women"
                      className="py-3 px-2 text-base font-medium text-gray-900 
                         hover:bg-gray-100 transition rounded-md"
                    >
                      WOMEN
                    </Link>

                    <Link
                      to="/collections/all?category=Top Wear"
                      className="py-3 px-2 text-base font-medium text-gray-900 
                         hover:bg-gray-100 transition rounded-md"
                    >
                      TOPWEAR
                    </Link>

                    <Link
                      to="/collections/all?Category=Bottom Wear"
                      className="py-3 px-2 text-base font-medium text-gray-900 
                         hover:bg-gray-100 transition rounded-md"
                    >
                      BOTTOMWEAR
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Cartdrawer
        drawerOpen={isdrawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />
    </>
  );
};

export default Navbar;
