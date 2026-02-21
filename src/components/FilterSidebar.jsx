import React from "react";

const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  allProducts,
}) => {
  const Categories = [...new Set(allProducts.map((p) => p.category))];
  const Brands = [...new Set(allProducts.map((p) => p.brand))];

  const UniqueCategory = ["All", ...Categories];
  const UniqueBrand = ["All", ...Brands];

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 200000]); // Full Price
  };

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />

      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategory.map((item, index) => (
          <label key={index} className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              checked={category === item}
              onChange={() => setCategory(item)}
            />
            <span className="uppercase">{item}</span>
          </label>
        ))}
      </div>

      {/* Brand */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        <option value="All">ALL</option>
        {UniqueBrand.map((item, index) => (
          <option key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <p className="text-sm font-medium">
        ₹{priceRange[0]} - ₹{priceRange[1]}
      </p>
      <input
        type="range"
        min="0"
        max="200000"
        value={priceRange[1]}
        onChange={(e) =>
          setPriceRange([priceRange[0], Number(e.target.value)])
        }
        className="w-full"
      />

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="bg-pink-600 text-white rounded-md px-3 py-2 mt-5 cursor-pointer w-full font-semibold"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
