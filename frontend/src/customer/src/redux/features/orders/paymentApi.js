import axios from "axios";
import { getBaseUrl } from "../../../utils/baseURL";

const paymentApi = {
  initializeKhaltiPayment: async (orderId, website_url) => {
    console.log("🔄 Khalti Payment API Called with:", { orderId, website_url });

    try {
      const response = await axios.post(`${getBaseUrl()}/api/payment/initialize-khalti`, {
        orderId,
        website_url,
      });

      console.log("✅ Khalti API Response:", response.data);

      if (response.data.success && response.data.payment?.payment_url) {
        console.log("🚀 Redirecting to:", response.data.payment.payment_url);
        window.location.href = response.data.payment.payment_url; 
      } else {
        console.error("❌ Failed to initialize payment:", response.data);
      }
    } catch (error) {
      console.error("❌ Error initializing Khalti payment:", error);
    }
  },
};


export default paymentApi;
