import React from "react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  const isSuccess = status === "Completed";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-[420px] shadow-2xl text-center transform transition-all scale-105">
        {isSuccess ? (
          <>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-green-600 text-2xl font-bold">Payment Successful! 🎉</h2>
              <p className="text-gray-600 text-lg">Your order has been placed successfully.</p>
              <div className="flex flex-col w-full space-y-3 mt-4">
                <Link to="/orders" className="w-full px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-medium hover:bg-green-600 transition">
                  View Orders
                </Link>
                <Link to="/" className="w-full px-6 py-3 bg-gray-300 text-gray-800 rounded-lg text-lg font-medium hover:bg-gray-400 transition">
                  Go Back Browsing
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="text-red-600 text-2xl font-bold">Payment Failed! ❌</h2>
              <p className="text-gray-600 text-lg">Your order couldn't be placed. Please try again.</p>
              <Link
                to="/"
                className="w-full px-6 py-3 bg-red-500 text-white rounded-lg text-lg font-medium hover:bg-red-600 transition mt-4"
              >
                Go to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
