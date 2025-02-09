import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "../products/ProductCards";

const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products from API
  const { data: products, isLoading, error } = useFetchAllProductsQuery();

  // Get skin type label from location state if available
  const { skinTypeLabel } = location.state || {};

  useEffect(() => {
    if (products) {
      let filtered = products;

      // Filter by skin type if provided
      if (skinTypeLabel) {
        setSearchQuery(skinTypeLabel);
        filtered = products.filter((product) =>
          product.skin_type_suitability.toLowerCase().includes(skinTypeLabel.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    }
  }, [products, skinTypeLabel]);

  const handleSearch = () => {
    if (!products) return;

    const queryLowerCase = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(queryLowerCase) ||
        product.brand.toLowerCase().includes(queryLowerCase) ||
        product.description.toLowerCase().includes(queryLowerCase) ||
        product.skin_type_suitability.toLowerCase().includes(queryLowerCase) ||
        product.category.toLowerCase().includes(queryLowerCase)
    );

    setFilteredProducts(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search Products</h2>
      </section>

      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products..."
            className="search-bar w-full max-w-4xl p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded"
          >
            Search
          </button>
        </div>
      </section>

      <div className="section__container">
        {isLoading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error fetching products.</p>
        ) : (
          <ProductCards products={filteredProducts} />
        )}
      </div>
    </>
  );
};

export default Search;
