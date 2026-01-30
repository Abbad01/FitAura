import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../../redux/slices/productSlice";

const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // update redux filters
    dispatch(setFilters({ search: searchTerm }));

    // navigate correctly
    navigate(`/collections/all?search=${searchTerm}`);

    setIsOpen(false);
  };

  return (
    <div className="relative">
      {isOpen ? (
        <div className="absolute right-0 top-10 bg-white border rounded-md shadow-md p-3 md:w-80 w-64 z-50">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border pl-3 py-2 pr-16 rounded-md
                         focus:outline-none focus:ring-1 focus:ring-black"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="absolute right-9 top-1/2 -translate-y-1/2 
                         text-gray-500 hover:text-black cursor-pointer"
            >
              <FiSearch className="h-5 w-5" />
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                handleSearchToggle();
                setSearchTerm("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 
                         text-gray-500 hover:text-black cursor-pointer"
            >
              <FiX className="h-5 w-5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          className="hover:text-gray-600 cursor-pointer"
          onClick={handleSearchToggle}
        >
          <FiSearch className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
