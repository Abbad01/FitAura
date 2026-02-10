// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// const FilterSidebar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [filters, setFilters] = useState({
//     category: "",
//     gender: "",
//     color: "",
//     size: [],
//     material: [],
//     brand: [],
//     minPrice: 0,
//     maxPrice: 100,
//   });

//   const [priceRange, setPriceRange] = useState([0, 100]);

//   const categories = ["Top Wear", "Bottom Wear"];
//   const colors = [
//     "Red",
//     "Blue",
//     "Black",
//     "Green",
//     "Yellow",
//     "Gray",
//     "White",
//     "Pink",
//     "Biege",
//     "Navy",
//   ];
//   const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
//   const materials = [
//     "Cotton",
//     "Wool",
//     "Denim",
//     "Polyester",
//     "Silk",
//     "Linen",
//     "Viscose",
//     "Fleece",
//   ];
//   const brands = [
//     "Urban Threads",
//     "Modern Fit",
//     "Street Style",
//     "Beach Breeze",
//     "Fashionista",
//     "ChicStyle",
//   ];
//   const genders = ["Male", "Female"];

//   /* ---------------- Sync state FROM URL ---------------- */
//   useEffect(() => {
//     const params = Object.fromEntries([...searchParams]);

//     setFilters({
//       category: params.category || "",
//       gender: params.gender || "",
//       color: params.color || "",
//       size: params.size ? params.size.split(",") : [],
//       material: params.material ? params.material.split(",") : [],
//       brand: params.brand ? params.brand.split(",") : [],
//       minPrice: Number(params.minPrice) || 0,
//       maxPrice: Number(params.maxPrice) || 100,
//     });

//     setPriceRange([0, Number(params.maxPrice) || 100]);
//   }, []);

//   /* ---------------- Update URL ---------------- */
//   const updateURLParams = (newFilters) => {
//     const params = new URLSearchParams();

//     Object.entries(newFilters).forEach(([key, value]) => {
//       if (Array.isArray(value) && value.length > 0) {
//         params.set(key, value.join(","));
//       } else if (!Array.isArray(value) && value) {
//         params.set(key, value);
//       }
//     });

//     setSearchParams(params, { replace: true });
//   };

//   /* ---------------- Inputs (radio / checkbox) ---------------- */
//   const handleFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     let updated = { ...filters };

//     if (type === "checkbox") {
//       updated[name] = checked
//         ? [...updated[name], value]
//         : updated[name].filter((v) => v !== value);
//     } else if (type === "radio") {
//       // For radio buttons, toggle off if clicking the same value
//       updated[name] = filters[name] === value ? "" : value;
//     } else {
//       updated[name] = value;
//     }

//     setFilters(updated);
//     updateURLParams(updated);
//   };

//   /* ---------------- Color Button ---------------- */
//   const handleColorSelect = (color) => {
//     const updated = { ...filters, color };
//     setFilters(updated);
//     updateURLParams(updated);
//   };

//   /* ---------------- Price ---------------- */
//   const handlePriceChange = (e) => {
//     const value = Number(e.target.value);
//     const updated = { ...filters, minPrice: 0, maxPrice: value };

//     setPriceRange([0, value]);
//     setFilters(updated);
//     updateURLParams(updated);
//   };

//   /* ---------------- Clear ---------------- */
//   const handleClearFilters = () => {
//     const cleared = {
//       category: "",
//       gender: "",
//       color: "",
//       size: [],
//       material: [],
//       brand: [],
//       minPrice: 0,
//       maxPrice: 100,
//     };

//     setFilters(cleared);
//     setPriceRange([0, 100]);
//     setSearchParams(new URLSearchParams(),{replace:true});
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-xl font-medium text-gray-800">Filters</h3>
//         <button
//           onClick={handleClearFilters}
//           className="text-sm text-blue-600 font-medium hover:cursor-pointer"
//         >
//           Clear All
//         </button>
//       </div>

//       {/* Category */}
//       <div>
//         <label className="block text-sm font-medium">Category</label>
//         {categories.map((c) => (
//           <label key={c} className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="category"
//               value={c}
//               checked={filters.category === c}
//               onChange={handleFilterChange}
//             />
//             {c}
//           </label>
//         ))}
//       </div>

//       {/* Gender */}
//       <div>
//         <label className="block text-sm font-medium">Gender</label>
//         {genders.map((g) => (
//           <label key={g} className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="gender"
//               value={g}
//               checked={filters.gender === g}
//               onChange={handleFilterChange}
//             />
//             {g}
//           </label>
//         ))}
//       </div>

//       {/* Colors */}
//       <div>
//         <label className="block text-sm font-medium">Colors</label>
//         <div className="flex gap-2 flex-wrap">
//           {colors.map((c) => (
//             <button
//               key={c}
//               onClick={() => handleColorSelect(c)}
//               className={`h-6 w-6 rounded-full border ${
//                 filters.color === c ? "ring-2 ring-blue-500" : ""
//               }`}
//               style={{ backgroundColor: c.toLowerCase() }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Size */}
//       <div>
//         <label className="block text-sm font-medium">Size</label>
//         {sizes.map((s) => (
//           <label key={s} className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="size"
//               value={s}
//               checked={filters.size.includes(s)}
//               onChange={handleFilterChange}
//             />
//             {s}
//           </label>
//         ))}
//       </div>

//       {/* Price */}
//       <div>
//         <label className="block text-sm font-medium">Price</label>
//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={priceRange[1]}
//           onChange={handlePriceChange}
//           className="w-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;





import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  /* ---------------- Sync state FROM URL ---------------- */
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });

    setPriceRange([0, Number(params.maxPrice) || 100]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- Update URL ---------------- */
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (!Array.isArray(value) && value) {
        params.set(key, value);
      }
    });

    setSearchParams(params, { replace: true });
  };

  /* ---------------- Inputs (radio / checkbox) ---------------- */
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updated = { ...filters };

    if (type === "checkbox") {
      updated[name] = checked
        ? [...updated[name], value]
        : updated[name].filter((v) => v !== value);
    } else if (type === "radio") {
      // For radio buttons, toggle off if clicking the same value
      updated[name] = filters[name] === value ? "" : value;
    } else {
      updated[name] = value;
    }

    setFilters(updated);
    updateURLParams(updated);
  };

  /* ---------------- Color Button ---------------- */
  const handleColorSelect = (color) => {
    // Toggle color off if clicking the same color
    const updated = { ...filters, color: filters.color === color ? "" : color };
    setFilters(updated);
    updateURLParams(updated);
  };

  /* ---------------- Price ---------------- */
  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    const updated = { ...filters, minPrice: 0, maxPrice: value };

    setPriceRange([0, value]);
    setFilters(updated);
    updateURLParams(updated);
  };

  /* ---------------- Clear ---------------- */
  const handleClearFilters = () => {
    const cleared = {
      category: "",
      gender: "",
      color: "",
      size: [],
      material: [],
      brand: [],
      minPrice: 0,
      maxPrice: 100,
    };

    setFilters(cleared);
    setPriceRange([0, 100]);
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-gray-800">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 font-medium hover:cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        {categories.map((c) => (
          <label key={c} className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              value={c}
              checked={filters.category === c}
              onChange={handleFilterChange}
            />
            {c}
          </label>
        ))}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium mb-2">Gender</label>
        {genders.map((g) => (
          <label key={g} className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={filters.gender === g}
              onChange={handleFilterChange}
            />
            {g}
          </label>
        ))}
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-medium mb-2">Colors</label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => handleColorSelect(c)}
              className={`h-6 w-6 rounded-full border ${
                filters.color === c ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: c.toLowerCase() }}
              aria-label={c}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium mb-2">Size</label>
        {sizes.map((s) => (
          <label key={s} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="size"
              value={s}
              checked={filters.size.includes(s)}
              onChange={handleFilterChange}
            />
            {s}
          </label>
        ))}
      </div>

      {/* Material */}
      <div>
        <label className="block text-sm font-medium mb-2">Material</label>
        {materials.map((m) => (
          <label key={m} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="material"
              value={m}
              checked={filters.material.includes(m)}
              onChange={handleFilterChange}
            />
            {m}
          </label>
        ))}
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-medium mb-2">Brand</label>
        {brands.map((b) => (
          <label key={b} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="brand"
              value={b}
              checked={filters.brand.includes(b)}
              onChange={handleFilterChange}
            />
            {b}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Price: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;