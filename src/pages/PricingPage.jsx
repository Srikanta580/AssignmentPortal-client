import React from "react";
import {
  FiDatabase,
  FiLayers,
  FiCode,
  FiZap,
  FiServer,
  FiBarChart2,
  FiShield,
  FiHeadphones,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import apiClient from "../services/apiClient";

const plans = [
  {
    name: "Free Tier",
    tier: "Starter",
    icon: <FiCheckCircle className="text-green-500" size={24} />,
    price: "Free",
    priceInfo: {
      unitAmount: 0,
      currency: "usd",
      priceId: null,
    },
    description: "Get started risk-free with limited access to core modules.",
    features: [
      { text: "Access to basic modules", icon: <FiLayers /> },
      { text: "Limited API calls", icon: <FiZap /> },
      { text: "Community support", icon: <FiHeadphones /> },
    ],
    cta: "Try for Free",
    bestFor: "Testing, small colleges",
    highlighted: false,
  },
  {
    name: "Shared-DB Plan",
    tier: "Standard",
    icon: <FiDatabase className="text-cyan-600" size={24} />,
    price: "$499/month",
    priceInfo: {
      unitAmount: 49900,
      currency: "usd",
      priceId: null,
    },
    description:
      "Affordable & quick setup—get started in days with full-feature access!",
    features: [
      { text: "Shared database (row-level isolation)", icon: <FiDatabase /> },
      {
        text: "Standard modules (assignments, attendance)",
        icon: <FiLayers />,
      },
      { text: "Basic customization (themes, logos)", icon: <FiCode /> },
      { text: "Fixed API rate limits", icon: <FiZap /> },
    ],
    cta: "Start Free Trial",
    bestFor: "Small/medium universities",
    highlighted: false,
  },
  {
    name: "Dedicated Schema",
    tier: "Professional",
    icon: <FiServer className="text-teal-500" size={24} />,
    price: "$1,499/month",
    priceInfo: {
      unitAmount: 149900,
      currency: "usd",
      priceId: null,
    },
    description:
      "Your own isolated environment within our shared cloud—performance + flexibility.",
    features: [
      { text: "Shared DB with dedicated schema", icon: <FiServer /> },
      { text: "Advanced modules & analytics", icon: <FiBarChart2 /> },
      { text: "Higher performance guarantees", icon: <FiZap /> },
      { text: "Custom module toggling", icon: <FiCode /> },
    ],
    cta: "Get Started",
    bestFor: "Growing institutions",
    highlighted: true,
  },
  {
    name: "Dedicated Database",
    tier: "Enterprise",
    icon: <FiShield className="text-purple-600" size={24} />,
    price: "Custom Pricing",
    priceInfo: {
      unitAmount: null,
      currency: "usd",
      priceId: null,
    },
    description:
      "Enterprise-grade security, control, and performance—your own cloud, your way.",
    features: [
      { text: "Full database isolation", icon: <FiShield /> },
      { text: "White-labeling & branding", icon: <FiCode /> },
      { text: "99.9% uptime SLA", icon: <FiZap /> },
      { text: "Dedicated account manager", icon: <FiHeadphones /> },
      { text: "Compliance-ready (GDPR, etc.)", icon: <FiShield /> },
    ],
    cta: "Contact Sales",
    bestFor: "Large universities & enterprises",
    highlighted: false,
  },
];

const PricingPage = () => {
  const handleCheckout = async (plan) => {
    if (plan.priceInfo.unitAmount === null || plan.priceInfo.unitAmount === 0) {
      alert("This plan is free or custom — no Stripe checkout needed.");
      return;
    }

    try {
      const res = await apiClient.post("/subscription/create", {
        amount: plan.priceInfo.unitAmount,
        currency: plan.priceInfo.currency,
        planName: plan.name,
        universityId: 53,
      });
      window.location.href = res.data.checkoutUrl;
    } catch (err) {
      console.error("Stripe checkout error:", err);
      alert("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Choose Your Plan
        </h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={index}
              className={`rounded-2xl shadow-lg p-6 border bg-white flex flex-col justify-between ${
                plan.highlighted ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {plan.icon}
                  <h3 className="text-xl font-semibold text-gray-700">
                    {plan.name}
                  </h3>
                </div>
                <p className="text-gray-500 mb-2 italic">{plan.bestFor}</p>
                <p className="text-3xl font-bold text-gray-900 mb-4">
                  {plan.price}
                </p>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      {feature.icon}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleCheckout(plan)}
                className={`w-full py-2 mt-2 text-white rounded-xl font-medium transition duration-200 ${
                  plan.highlighted
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
