import React from "react";
import { useGetCustomerOrdersQuery } from "../../redux/features/orders/orderApi"; // Fix import
import { Link } from "react-router-dom";

const ViewOrders = () => {
  const customerId = 1; // Replace with actual logged-in user's ID from state
  const { data: orders, error, isLoading } = useGetCustomerOrdersQuery(customerId); // Fix query

  if (isLoading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching orders.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>

      {orders?.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.order_id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">Order #{order.order_id}</h3>
              <p className="text-gray-600">Total: ${order.total_price}</p>
              <p className="text-gray-600">Payment: {order.payment_method}</p>
              <p className="text-gray-600">Status: {order.status || "Pending"}</p>
              <Link to={`/order/${order.order_id}`} className="text-blue-600 hover:underline mt-2 block">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:underline">Go Back to Home</Link>
      </div>
    </div>
  );
};

export default ViewOrders;
