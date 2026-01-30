import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [sort, setSort] = useState("latest");
  const [searchParams, setSearchParams]=useSearchParams()
    const handleSortChange=(e)=>{
        const sortBy=e.target.value
        searchParams.set("sortBy", sortBy)
        setSearchParams(searchParams)
    }
  return (
    <div className="flex justify-end mb-4">
      <select
        value={searchParams.get("sortBy"|| "")}
        onChange={handleSortChange}
        className="border px-3 py-2 text-sm rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-gray-400"
      >
        <option value="latest">Latest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
};

export default SortOptions;
