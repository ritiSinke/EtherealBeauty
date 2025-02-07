import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utils/baseURL";
import { useCreateOrderMutation } from "../../redux/features/orders/orderApi";
import paymentApi from "../../redux/features/orders/paymentApi"
import AddressSelector from "./AddressSelector";

const Checkout = () => {
  
const [province, setProvince] = useState("");
const [district, setDistrict] = useState("");
const [municipality, setMunicipality] = useState("");
const [additionalInfo, setAdditionalInfo] = useState("");
const [ payment_method, setPaymentMethod] = useState("Khalti");
const [orderPlaced, setOrderPlaced] = useState(false);

  const navigate = useNavigate();
  const products = useSelector((store) => store.cart.products);
  const { totalPrice = 0, grandTotal = 0 } = useSelector((store) => store.cart) || {};
  const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlaceOrder = async () => {
    console.log("➡️ handlePlaceOrder triggered!");
  
    const orderData = {
      customer_id: 1,
      total_price: grandTotal,
      payment_method,
      address: {
        province,
        district,
        municipality,
        additionalInfo,
      },
      products: products.map((product) => ({
        id: product.product_id,
        name: product.name,
        quantity: product.quantity || 1,
        price: product.price,
      })),
    };
  
    console.log("📝 Order Data Sent to API:", orderData);
  
    try {
      const response = await createOrder(orderData); // ✅ Send order request
      console.log("🔄 Raw API Response:", response);
  
      if (response.error) {
        console.error("❌ API Error:", response.error);
        return;
      }
  
      const data = response.data; // ✅ Extract response data
      console.log("✅ Order Response:", data);
  
      // 🔍 **Fix: Extract correct `order_id`**
      if (!data || !data.order?.order_id) {
        console.error("❌ Order ID missing in response:", data);
        return;
      }
  
      const orderId = data.order.order_id; // ✅ Corrected order ID extraction
      console.log("🔄 Proceeding with payment, Order ID:", orderId);
  
      console.log("🔄 Checking Payment Method:", payment_method);
  
      if (payment_method === "Khalti") {
        console.log("🚀 Calling Khalti Payment API...");
        await paymentApi.initializeKhaltiPayment(orderId, window.location.origin);
      } else if (payment_method === "Esewa") {
        console.log("🔄 Redirecting to eSewa...");
        window.location.href = `https://esewa.com.np/epay/main?amt=${grandTotal}&pid=${orderId}&scd=your_esewa_merchant_code&su=your_success_url&fu=your_failure_url`;
      } else {
        console.log("💰 Cash on Delivery Selected");
        setOrderPlaced(true);
        setTimeout(() => {
          setOrderPlaced(false);
          navigate("/orders");
        }, 2000);
      }
  
      // alert("Order placed successfully!");
    } catch (error) {
      console.error("❌ Error placing order:", error);
    }
  };
  
  
  
  return (
  <div className="bg-primary-light  rounded text-base px-6 py-4 space-y-5 mb-12">
      <h2 className="text-xl text-text-dark">Checkout</h2>
      <p className="text-text-dark mt-2">Shipping Name: "guest"</p>

      <h3 className="text-lg font-bold mt-4">Shipping Address</h3>
      <AddressSelector
        province={province}
        setProvince={setProvince}
        district={district}
        setDistrict={setDistrict}
        municipality={municipality}
        setMunicipality={setMunicipality}
      />

      <textarea
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Additional information..."
      ></textarea>

      <h3 className="text-lg font-bold mt-4">Order Summary</h3>
      {products.map((prod) => (
        <div key={prod.id} className="flex justify-between">
          <span>
            {prod.name} (x{prod.quantity})
          </span>
          <span>${(prod.price * prod.quantity).toFixed(2)}</span>
        </div>
      ))}
      <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
      <p className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</p>

      <h3 className="text-lg font-bold mt-4">Payment Method</h3>
      <select
        value={ payment_method}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="Esewa">Esewa</option>
        <option value="Khalti">Khalti</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
      </select>

      <div className="flex justify-between mt-6">
        <button onClick={() => navigate("/cart")} className="bg-gray-500 px-3 py-1.5 text-white rounded-md">
          Back to Cart
        </button>
        <button onClick={handlePlaceOrder} className="bg-green-600 px-3 py-1.5 text-white rounded-md">
          Place Order
        </button>
      </div>

      {orderPlaced && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-lg font-bold">Order Successfully Placed!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;   

