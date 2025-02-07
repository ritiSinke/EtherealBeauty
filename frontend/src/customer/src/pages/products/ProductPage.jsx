import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import ProductFiltering from "./ProductFiltering"; 
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "skincare", "makeup", "bodycare", "haircare", "fragrance"],
  brands: ["all", "Brand A", "Brand B", "Brand C", "Brand D"],
  skinTypes: ["all", "dry", "oily", "combination", "sensitive"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ProductPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    brand: "all",
    skinType: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { category, brand, skinType, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const { data = [], error, isLoading } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    brand: brand !== "all" ? brand : "",
    skinType: skinType !== "all" ? skinType : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  // If your API returns an array of products, you don't need the `products` destructuring anymore
  const products = data;
  const totalPages = Math.ceil(data.length / productsPerPage);  // You can calculate totalPages based on the length of `data` if needed
  const totalProducts = data.length;

  // Debugging logs
  console.log("Products:", products);
  console.log("Total Pages:", totalPages);

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      brand: "all",
      skinType: "all",
      priceRange: "",
    });
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

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

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
          {/* Filtering section */}
          <ProductFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* Products display section */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              {totalProducts > 0
                ? `Showing ${startProduct} to ${endProduct} of ${totalProducts} products.`
                : "No products available."}
            </h3>
            <ProductCards products={products} />

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