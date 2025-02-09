import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utils/baseURL";
import { useCreateOrderMutation } from "../../redux/features/orders/orderApi";
const Checkout = () => {
  const navigate = useNavigate();
  const products = useSelector((store) => store.cart.products);
  const { totalPrice = 0, grandTotal = 0 } = useSelector((store) => store.cart) || {};
  const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [ payment_method, setPaymentMethod] = useState("Khalti");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const apiHeaders = {
    "x-rapidapi-host": "nepal-address3.p.rapidapi.com",
    "x-rapidapi-key": "edfc1bcc3fmsh6dfa92503583514p175bc4jsnf3daa65830d6",
  };
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://nepal-address3.p.rapidapi.com/province", {
          method: "GET",
          headers: apiHeaders,
        });
        const data = await response.json();
        setProvinces(data.data.provinces || []);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setProvinces([]);
      }
    };
    fetchProvinces();
  }, []);
  useEffect(() => {
    if (province) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(
            `https://nepal-address3.p.rapidapi.com/districtsByProvince?province=${province}`,
            { method: "GET", headers: apiHeaders }
          );
          const data = await response.json();
          setDistricts(data.data.districts || []);
        } catch (error) {
          console.error("Error fetching districts:", error);
          setDistricts([]);
        }
      };
      fetchDistricts();
    }
  }, [province]);
  useEffect(() => {
    if (district) {
      const fetchMunicipalities = async () => {
        try {
          const response = await fetch(
            `https://nepal-address3.p.rapidapi.com/municipalsByDistrict?district=${district}`,
            { method: "GET", headers: apiHeaders }
          );
          const data = await response.json();
          setMunicipalities(data.data.municipals || []);
        } catch (error) {
          console.error("Error fetching municipalities:", error);
          setMunicipalities([]);
        }
      };
      fetchMunicipalities();
    }
  }, [district]);
  const handlePlaceOrder = async () => {
    const orderData = {
      customer_id : 1,
      total_price: grandTotal,
      payment_method,
      address: {
        province,
        district,
        municipality,
        additionalInfo,
      },
      products: products.map(product => ({
        id: product.product_id, // Use product.product_id instead of destructuring
        name: product.name,
        quantity: product.quantity || 1, // Ensure quantity exists
        price: product.price,
      }))
     
    };
console.log("products",products);
    console.log("Order Data Sent to API:", orderData); // Debugging line
    try {
      const { data } = await createOrder(orderData).unwrap();
      if (data) {
        if ( payment_method === "Esewa") {
          window.location.href = `https://esewa.com.np/epay/main?amt=${grandTotal}&pid=${data.orderId}&scd=your_esewa_merchant_code&su=your_success_url&fu=your_failure_url`;
        } else if ( payment_method === "Khalti") {
          window.location.href = `https://khalti.com/api/v2/payment/initiate/?return_url=your_return_url&purchase_order_id=${data.orderId}&amount=${grandTotal * 100}&website_url=your_website_url&purchase_order_name=Order-${data.orderId}`;
        } else {
          setOrderPlaced(true);
          setTimeout(() => {
            setOrderPlaced(false);
            navigate("/orders");
          }, 2000);
        }
        console.log("Order Response:", response);
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  return (
  <div className="bg-primary-light  rounded text-base px-6 py-4 space-y-5 mb-12">
      <h2 className="text-xl text-text-dark">Checkout</h2>
      <p className="text-text-dark mt-2">Shipping Name: "guest"</p>

      <h3 className="text-lg font-bold mt-4">Shipping Address</h3>
<section>
 {/* Province Dropdown */}
 <select
  value={province}
  onChange={(e) => {
    setProvince(e.target.value);
    setDistrict("");
    setMunicipality("");
  }}
  className="border p-2 rounded w-full"
>
  <option value="">Select Province</option>
  {provinces.map((prov, index) => (
    <option key={index} value={prov}>
      {prov}
    </option>
  ))}
</select>

      {/* District Dropdown */}
      <select
  value={district}
  onChange={(e) => {
    setDistrict(e.target.value);
    setMunicipality("");
  }}
  className="border p-2 rounded w-full"
  disabled={!province}
>
  <option value="">Select District</option>
  {districts.map((dist, index) => (
    <option key={index} value={dist}>
      {dist}
    </option>
  ))}
</select>


      {/* Municipality Dropdown */}
      <select
  value={municipality}
  onChange={(e) => setMunicipality(e.target.value)}
  className="border p-2 rounded w-full"
  disabled={!district}
>
  <option value="">Select Municipality</option>
  {municipalities.map((mun, index) => (
    <option key={index} value={mun}>
      {mun}
    </option>
  ))}
</select>

</section>

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