import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from "../../redux/features/products/productsApi";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { getBaseUrl } from "../../utils/baseURL";
const SingleProduct = () => {
  const { id } = useParams();
  console.log("Product ID:", id); 
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  console.log("Product ID:", id); // Debugging log
  console.log("Fetched Product:", data); // Debugging log
  // Directly use `data` as the product object
  const product = data;
  const productImageUrl = `${getBaseUrl()}${product?.image}`;
  console.log(productImageUrl);


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{product?.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <div className="md:w-1/2 w-full">
            <img
              src={productImageUrl}
              alt={product?.name}
              className="rounded-md w-full h-auto"
            />
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">{product?.name}</h3>
            <p className="text-xl text-primary mb-4">
              NPR {product?.price}
            </p>
            <p className="text-gray-400 mb-4">{product?.description}</p>

            <div className="flex flex-col space-y-2">
              <p>
                <strong>Category:</strong> {product?.category}
              </p>
              <p>
                <strong>Brand:</strong> {product?.brandname}
              </p>
              <p>
                <strong>Stock:</strong> {product?.stock}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;

//   const singleProduct = data?.product || {};

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//   };
//   if (!data || !singleProduct) return <p>Product not found.</p>;


//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading product details.</p>;

//   return (
//     <>
//       <section className="section__container bg-primary-light">
//         <h2 className="section__header capitalize">Shop</h2>
//         <div className="section__subheader space-x-2">
//           <span className="hover:text-primary">
//             <Link to="/">home</Link>
//           </span>
//           <i className="ri-arrow-right-s-line"></i>
//           <span className="hover:text-primary">
//             <Link to="/shop">shop</Link>
//           </span>
//           <i className="ri-arrow-right-s-line"></i>
//           <span className="hover:text-primary">{singleProduct?.name}</span>
//         </div>
//       </section>
//       <section className="section__container mt-8">
//         <div className="flex flex-col items-center md:flex-row gap-8">
//           <div className="md:w-1/2 w-full">
//             <img
//               src={singleProduct?.image}
//               alt=""
//               className="rounded-md w-full h-auto"
//             />
//           </div>

//           <div className="md:w-1/2 w-full">
//             <h3 className="text-2xl font-semibold mb-4">
//               {singleProduct?.name}
//             </h3>
//             <p className="text-xl text-primary mb-4">
//               ${singleProduct?.price}
//               {singleProduct?.oldPrice && (
//                 <s className="ml-2">${singleProduct?.oldPrice}</s>
//               )}
//             </p>
//             <p className="text-gray-400 mb-4">{singleProduct?.description}</p>

//             <div className="flex flex-col space-y-2">
//               <p>
//                 <strong>Category:</strong> {singleProduct?.category}
//               </p>
//               <p>
//                 <strong>Color:</strong> {singleProduct?.color}
//               </p>
              
//             </div>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleAddToCart(singleProduct);
//               }}
//               className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </section>
    
//     </>
//   );
// };

// export default SingleProduct;