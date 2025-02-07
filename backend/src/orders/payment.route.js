const { initializeKhaltiPayment, verifyKhaltiPayment } = require("./khalti");
const express = require("express");
const router = express.Router();
const Order = require("./orders.model"); // Keep this to fetch order details
const Payment = require("./payment.model");

router.post("/initialize-khalti", async (req, res) => {
  try {
    const { orderId, website_url } = req.body;
    console.log("🔄 Received Khalti Payment Request:", { orderId, website_url });

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    // Fetch order details
    const orderData = await Order.findOne({ where: { order_id: orderId } });
    console.log("✅ Order Data:", orderData);

    if (!orderData) {
      return res.status(400).json({ success: false, message: "Order not found" });
    }

    // Convert price to paisa
    const amount = Math.round(Number(orderData.total_price) * 100);
    console.log("💰 Amount in paisa:", amount);

    // Call Khalti API
    const paymentInitate = await initializeKhaltiPayment({
      amount,
      purchase_order_id: orderData.order_id,
      purchase_order_name: `Order #${orderData.order_id}`,
      return_url: `${process.env.FRONTEND_URI}/payment-success`, // Corrected path
      website_url,
    });

    console.log("✅ Khalti API Response:", paymentInitate);

    if (!paymentInitate.pidx || !paymentInitate.payment_url) {
      return res.status(400).json({ success: false, message: "Khalti API failed", paymentInitate });
    }

    // Store payment in DB
    const newPayment = await Payment.create({
      order_id: orderData.order_id,
      customer_id: orderData.customer_id,
      amount: orderData.total_price,
      transaction_id: null,
      pidx: paymentInitate.pidx,
      payment_status: "pending",
    });

    console.log("✅ Payment Record Stored:", newPayment);

    res.json({
      success: true,
      orderData,
      payment: paymentInitate,
      paymentRecord: newPayment,
    });

  } catch (error) {
    console.error("❌ Error initializing Khalti payment:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post("/verify-khalti", async (req, res) => {
  try {
    const { pidx } = req.body;

    if (!pidx) {
      return res.status(400).json({ success: false, message: "Pidx is required" });
    }

    // Verify payment with Khalti API
    const verificationResponse = await verifyKhaltiPayment(pidx);

    if (!verificationResponse || verificationResponse.status !== "Completed") {
      return res.status(400).json({ success: false, message: "Payment verification failed", verificationResponse });
    }

    // Extract payment details
    const { transaction_id, amount, status } = verificationResponse;

    // Update the Payments table
    const payment = await Payment.findOne({ where: { pidx } });

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment record not found" });
    }

    // Update payment status and transaction ID
    payment.transaction_id = transaction_id;
    payment.payment_status = "completed"; // or "failed" based on status
    await payment.save();

    // Optionally, update order status
    await Order.update({ status: "confirmed" }, { where: { order_id: payment.order_id } });

    res.json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });

  } catch (error) {
    console.error("Error verifying Khalti payment:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;