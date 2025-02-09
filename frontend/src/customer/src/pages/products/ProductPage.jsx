import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import ProductFiltering from "./ProductFiltering";
import { useFetchFilteredProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "facewash", "moisturizer", "sunscreen", "toner", "lipbalm", "serum"],
  brands: ["all", "dermaco", "cetaphil", "aqualogica", "mamaearth"],
  skinTypes: ["all", "dry", "oily", "normal"],
  priceRanges: [
    { label: "All", min: "", max: "" },
    { label: "Under 500", min: 0, max: 500 },
    { label: "500 - 1000", min: 500, max: 1000 },
    { label: "1000 - 2000", min: 1000, max: 2000 },
    { label: "2000 and above", min: 2000, max: 999999 },
  ],
};

const ProductPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    brand: "all",
    skinType: "all",
    priceRange: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const { category, brand, skinType, priceRange } = filtersState;
  const selectedPrice = filters.priceRanges.find((p) => p.label === priceRange) || {};
  const minPriceValue = selectedPrice.min !== "" ? Number(selectedPrice.min) : 0; 
  const maxPriceValue = selectedPrice.max !== "" ? Number(selectedPrice.max) : Infinity;

  const { data, error, isLoading, refetch } = useFetchFilteredProductsQuery({
    category: category !== "all" ? category : "",
    brand: brand !== "all" ? brand : "",
    skinType: skinType !== "all" ? skinType : "",
    minPrice: minPriceValue,
    maxPrice: maxPriceValue,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filtersState]);

  const products = Array.isArray(data) ? data : data?.products || [];
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      brand: "all",
      skinType: "all",
      priceRange: "",
    });
  };

  const handleFilterChange = (name, value) => {
    setFiltersState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products.</div>;
  }

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop</h2>
        <p className="section__subheader">
          Discover products tailored to your needs, including skincare, makeup, and more!
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          <ProductFiltering
            filters={filters}
            filtersState={filtersState}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
          />

          <div>
            <h3 className="text-xl font-medium mb-4">
              {totalProducts > 0
                ? `Showing ${startIndex + 1} to ${Math.min(endIndex, totalProducts)} of ${totalProducts} products.`
                : "No products available."}
            </h3>
            <ProductCards products={displayedProducts} />

            <div className="mt-6 flex justify-center">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  onClick={() => handlePageChange(index + 1)}
                  key={index}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;