
// Function to verify Khalti Payment
// async function verifyKhaltiPayment(pidx) {
//   const headersList = {
//     "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
//     "Content-Type": "application/json",
//   };

//   const bodyContent = JSON.stringify({ pidx });

//   const reqOptions = {
//     url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
//     method: "POST",
//     headers: headersList,
//     data: bodyContent,
//   };

//   try {
//     const response = await axios.request(reqOptions);
//     return response.data;
//   } catch (error) {
//     console.error("Error verifying Khalti payment:", error);
//     throw error;
//   }
// }
// const verifyKhaltiPayment = async (pidx) => {
//   try {
//     const response = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/lookup/",
//       { pidx },
//       {
//         headers: {
//           Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data; // Contains transaction_id, amount, and status
//   } catch (error) {
//     console.error("Error verifying Khalti payment:", error.response?.data || error.message);
//     return null;
//   }
// };
// // Function to initialize Khalti Payment
// async function initializeKhaltiPayment(details) {
//   const headersList = {
//     "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
//     "Content-Type": "application/json",
//   };

//   const bodyContent = JSON.stringify(details);

//   const reqOptions = {
//     url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
//     method: "POST",
//     headers: headersList,
//     data: bodyContent,
//   };

//   try {
//     const response = await axios.request(reqOptions);
//     return response.data;
//   } catch (error) {
//     console.error("Error initializing Khalti payment:", error);
//     throw error;
//   }
// }

// module.exports = { verifyKhaltiPayment, initializeKhaltiPayment };
const axios = require("axios");

async function initializeKhaltiPayment({ amount, purchase_order_id, purchase_order_name, return_url, website_url }) {
  try {
    console.log("🔄 Sending Request to Khalti:", { amount, purchase_order_id, purchase_order_name, return_url, website_url });

    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/", {
      return_url,
      website_url,
      amount,
      purchase_order_id,
      purchase_order_name,
    }, {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Khalti API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in Khalti API Call:", error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { initializeKhaltiPayment };
