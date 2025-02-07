import axios from "axios";
import { getBaseUrl } from "../../../utils/baseURL";

const paymentApi = {
  initializeKhaltiPayment: async (orderId, website_url) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/payment/initialize-khalti`,
        {
          orderId,
          website_url,
        }
      );

      if (response.data.success && response.data.payment.payment_url) {
        // Redirect to Khalti payment page
        window.location.href = response.data.payment.payment_url;
      } else {
        console.error("Failed to initialize payment", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error initializing Khalti payment:", error);
      return { success: false, error: error.message };
    }
  },
};

export default paymentApi;
