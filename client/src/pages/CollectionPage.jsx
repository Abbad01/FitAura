import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Cards/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  // const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    //close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };
  useEffect(() => {
    if (!isSidebarOpen) return;

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border px-3 py-2 flex items-center gap-2 
                 rounded-md text-sm hover:bg-gray-100 transition mt-1 cursor-pointer"
      >
        <FaFilter className="h-4 w-4" />
        Filters
      </button>

      {/* DESKTOP FILTER SIDEBAR (STATIC) */}
      <div className="hidden lg:block w-65 border-r p-4">
        <FilterSidebar />
      </div>

      {/* MOBILE FILTER DRAWER */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full overflow-y-auto
      w-[75%] sm:w-[80%] md:w-95
      bg-white shadow-xl z-50
      transform transition-transform duration-300 ease-in-out
      lg:hidden
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <FilterSidebar onClose={toggleSidebar} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
