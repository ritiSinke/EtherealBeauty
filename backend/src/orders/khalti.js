const axios = require("axios");

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
const verifyKhaltiPayment = async (pidx) => {
  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Contains transaction_id, amount, and status
  } catch (error) {
    console.error("Error verifying Khalti payment:", error.response?.data || error.message);
    return null;
  }
};
// Function to initialize Khalti Payment
async function initializeKhaltiPayment(details) {
  const headersList = {
    "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify(details);

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error initializing Khalti payment:", error);
    throw error;
  }
}

module.exports = { verifyKhaltiPayment, initializeKhaltiPayment };