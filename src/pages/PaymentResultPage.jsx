import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { confirmSubscription } from "../features/university/universityAPI";
import { plans } from "../lib/configs/plans";

const PaymentResultPage = () => {
  const universitySlug = useSelector((state) => state.university.slug);
  const universityName = useSelector((state) => state.university.name);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const sessionId = searchParams.get("session_id");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      if (status === "success" && sessionId) {
        try {
          const data = await dispatch(confirmSubscription(sessionId)).unwrap();
          setSubscriptionData(data);
          setConfirmed(true);

          // Find the matching plan
          const plan = plans.find((p) => p.name === data.planName);
          if (plan) setSelectedPlan(plan);
        } catch (err) {
          console.error("Confirmation error:", err);
          setError("Failed to confirm payment. Please contact support.");
        }
      }
    };
    confirmPayment();
  }, [status, sessionId, dispatch]);

  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Logo in top left corner */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold">EP</span>
        </div>
        <span className="text-xl font-bold text-gray-800">EduPlatform</span>
      </div>

      <div className="max-w-4xl mx-auto pt-16">
        {status === "success" &&
          confirmed &&
          subscriptionData &&
          selectedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mx-auto flex items-center justify-center w-32 h-32 rounded-full bg-green-100 mb-8"
              >
                <FiCheckCircle className="text-green-500" size={64} />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Subscription Activated Successfully!
              </h1>

              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div
                      className={`p-3 rounded-lg bg-${selectedPlan.color}-100`}
                    >
                      {selectedPlan.icon}
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-gray-800">
                        {selectedPlan.name}
                      </h2>
                      <p className="text-gray-600">{universityName}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl px-4 py-3">
                    <p className="text-sm text-gray-500">Subscription Period</p>
                    <p className="font-semibold">
                      {formatDate(subscriptionData.subscriptionStartDate)} -{" "}
                      {formatDate(subscriptionData.subscriptionEndDate)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    What You Can Do Now
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPlan.features.slice(0, 4).map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="text-blue-500 mt-0.5">
                          {feature.icon}
                        </div>
                        <span className="text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() =>
                    (window.location.href = `/${universitySlug}/admin`)
                  }
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  Go to Dashboard <FiArrowRight />
                </button>

                <button
                  className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-xl border border-gray-200 shadow"
                  onClick={() => (window.location.href = "/features")}
                >
                  Explore Features
                </button>
              </div>
            </motion.div>
          )}

        {status === "success" && !confirmed && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                <div className="w-12 h-12 rounded-full bg-blue-200"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Activating Your Subscription
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Please wait while we finalize your subscription details...
            </p>
          </motion.div>
        )}

        {(status === "fail" || error) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                <FiXCircle className="text-red-500" size={48} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Subscription Failed
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {error ||
                "Your payment was not completed. Please try again or contact support."}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => (window.location.href = "/pricing")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg"
              >
                Back to Pricing
              </button>

              <button
                className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-xl border border-gray-200 shadow"
                onClick={() => (window.location.href = "/support")}
              >
                Contact Support
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentResultPage;
