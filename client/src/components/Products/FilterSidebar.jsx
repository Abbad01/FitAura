import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialize filters with ALL fields including color
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);
  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Biege",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders = ["Male", "Female"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });

    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    // console.log({ name, value, checked, type });
    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        //if unchecked
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    }
    //other than checkBox
    else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    // console.log(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    // Example newFilters:
    // { category: "Top Wear", size: ["XS", "S"], gender: "Male" }

    Object.keys(newFilters).forEach((key) => {
      // Handle array filters (size, material, brand)
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      }

      // Handle single value filters
      else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handleClearFilters = () => {
    //used in clear All button
    setFilters({
      category: "",
      gender: "",
      color: "",
      size: [],
      material: [],
      brand: [],
      minPrice: 0,
      maxPrice: 100,
    });
    setPriceRange([0, 100]);
    setSearchParams(new URLSearchParams());
  };
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(filters);
    updateURLParams(newFilters);
  };
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-gray-800">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="h-4 w-4"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        {genders.map((gender) => (
          <label
            key={gender}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="h-4 w-4"
            />
            {gender}
          </label>
        ))}
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Colors
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`px-4 py-4 h-4 w-4 text-xs border rounded-full
                       text-gray-600 hover:bg-gray-100 transition hover:cursor-pointer ${
                         filters.color === color ? "ring-2 ring-blue-500" : ""
                       }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <label
              key={size}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
            >
              <input
                type="checkbox"
                name="size"
                value={size}
                onChange={handleFilterChange}
                checked={filters.size.includes(size)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Material
        </label>
        {materials.map((material) => (
          <label
            key={material}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="h-4 w-4"
            />
            {material}
          </label>
        ))}
      </div>

      {/* Brands */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        {brands.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="h-4 w-4"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>

        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-black"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>$0</span>
          <span>$100</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
