import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";



const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // ✅ Fetch all products
    fetchAllProducts: builder.query({
      query: () => `/allProducts`,
      providesTags: ["Products"],
    }),

    // ✅ Fetch product by ID
    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // ✅ Fetch products by brand
    fetchProductsByBrand: builder.query({
      query: (brand) => `/brand/${brand}`,
      providesTags: ["Products"],
    }),

    // ✅ Fetch products by skin type suitability
    fetchProductsBySkinType: builder.query({
      query: (skinType) => `/skin-type/${skinType}`,
      providesTags: ["Products"],
    }),

    // ✅ Fetch related products by category
    fetchRelatedProducts: builder.query({
      query: (category) => `/related/${category}`,
    }),
    fetchFilteredProducts: builder.query({
      query: (filters) => {
        // Ensure minPrice and maxPrice are included properly
        const params = new URLSearchParams();
    
        if (filters.category) params.append("category", filters.category);
        if (filters.brand) params.append("brand", filters.brand);
        if (filters.skinType) params.append("skinType", filters.skinType);
        if (filters.minPrice) params.append("minPrice", filters.minPrice);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
        if (filters.limit) params.append("limit", filters.limit);
        if (filters.page) params.append("page", filters.page);
    
        return `/allProducts?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
    
    
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useFetchProductsByBrandQuery,
  useFetchProductsBySkinTypeQuery,
  useFetchRelatedProductsQuery,
  useFetchFilteredProductsQuery,

} = productsApi;

export default productsApi;
