import React from "react";
import { useParams } from "react-router-dom";
import { useFetchProductsByBrandQuery } from "../../redux/features/products/productsApi";
import ProductCards from "../products/ProductCards";

const BrandPage = () => {
  const { brandName } = useParams();
  const { data: products, isLoading, isError } = useFetchProductsByBrandQuery(brandName);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products for {brandName}</p>;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{brandName}</h2>
      </section>

      {/* Product Cards */}
      <div className="section__container">
        <ProductCards products={products || []} />
      </div>
    </>
  );
};

export default BrandPage;
