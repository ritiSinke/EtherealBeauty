import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { getBaseUrl } from "../../utils/baseURL";

// for add to cart button dispatch
const ProductCards = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => {
          // Define productImageUrl inside the map function correctly
          const productImageUrl = `${getBaseUrl()}${product?.image}`;

          return (
            <div key={index} className="product__card">
              <div className="relative">
                <Link to={`/product/${product.product_id}`}>
                  <img
                    src={productImageUrl || product.image} 
                    alt="product image"
                    className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
                  />
                </Link>

                <div className="hover:block absolute top-3 right-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
                  </button>
                </div>
              </div>

              {/* Product description */}
              <div className="product__card_content">
                <h4>{product.name}</h4>
                <p className=" text-primary"> NPR {product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductCards;
