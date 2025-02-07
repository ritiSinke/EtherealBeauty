import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // ✅ Fetch all orders
    getAllOrders: builder.query({
      query: () => ({
        url: "/allOrders",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    // ✅ Fetch order by ID
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/${orderId}`,
        method: "GET",
      }),
      providesTags: (result, error, orderId) => [{ type: "Order", id: orderId }],
    }),

    // ✅ Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
    getCustomerOrders: builder.query({
      query: (customerId) => ({
        url: `/customer/${customerId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useGetCustomerOrdersQuery,
} = orderApi;

export default orderApi;
