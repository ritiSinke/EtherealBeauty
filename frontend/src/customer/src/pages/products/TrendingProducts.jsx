import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
const TrendingProducts = () => {
  const { data: products = [], isLoading, isError } = useFetchAllProductsQuery();
  const [randomProducts, setRandomProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    if (products.length > 0 && randomProducts.length === 0) {
      // Shuffle products randomly once
      const shuffled = [...products].sort(() => Math.random() - 0.5).slice(0, 20); // Limit to 20 random products
      setRandomProducts(shuffled);
    }
  }, [products, randomProducts]);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => Math.min(prevCount + 4, randomProducts.length));
  };

  if (isLoading) return <p>Loading trending products...</p>;
  if (isError) return <p>Error fetching products.</p>;

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>

      {/* Product card */}
      <div className="mt-12">
        <ProductCard products={randomProducts.slice(0, visibleProducts)} />
      </div>

      {/* Load more button */}
      {visibleProducts < randomProducts.length && (
        <div className="product__btn">
          <button className="btn" onClick={loadMoreProducts}>Load More</button>
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;