import React from "react";

const ProductFiltering = ({ filters, filtersState, handleFilterChange, clearFilters }) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>

      {/* Categories */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category" // Keep name consistent for radios
              value={category}
              checked={filtersState.category === category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* Brands */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Brand</h4>
        <hr />
        {filters.brands.map((brand) => (
          <label key={brand} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="brand" // Keep name consistent
              value={brand}
              checked={filtersState.brand === brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            />
            <span className="ml-1">{brand}</span>
          </label>
        ))}
      </div>

      {/* Skin Type */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Skin Type</h4>
        <hr />
        {filters.skinTypes.map((type) => (
          <label key={type} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="skinType"
              value={type}
              checked={filtersState.skinType === type}
              onChange={(e) => handleFilterChange("skinType", e.target.value)}
            />
            <span className="ml-1">{type}</span>
          </label>
        ))}
      </div>

      {/* Price Ranges */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
  <label key={range.label} className="capitalize cursor-pointer">
    <input
      type="radio"
      name="priceRange"
      value={range.label} // Store label instead of "min-max"
      checked={filtersState.priceRange === range.label}
      onChange={(e) => handleFilterChange("priceRange", e.target.value)}
    />
    <span className="ml-1">{range.label}</span>
  </label>
))}

      </div>

      <button onClick={clearFilters} className="bg-primary py-1 px-4 text-white rounded">
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFiltering;
