import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const PaymentResultPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const isSuccess = status === "success";

  const title = isSuccess ? "Payment Successful!" : "Payment Failed";

  const description = isSuccess
    ? "Thank you for your purchase. Your subscription is now active."
    : "We couldn’t process your payment. Please try again or contact support.";

  const icon = isSuccess ? (
    <CheckCircle size={64} className="text-green-600" />
  ) : (
    <XCircle size={64} className="text-red-600" />
  );

  const bgColor = isSuccess
    ? "bg-green-50 border-green-200"
    : "bg-red-50 border-red-200";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[--color-light] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-lg w-full p-8 rounded-xl shadow-xl border ${bgColor} text-center`}
      >
        <div className="flex justify-center mb-6">{icon}</div>
        <h1 className="text-3xl font-bold mb-4 text-[--color-dark]">{title}</h1>
        <p className="text-gray-700 mb-6">{description}</p>
        <Link
          to="/"
          className="inline-block bg-[--color-primary] hover:bg-[--color-secondary] text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Go to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default PaymentResultPage;
