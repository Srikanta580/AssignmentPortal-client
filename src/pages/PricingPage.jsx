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
import { useDispatch, useSelector } from "react-redux";
import Logo from "../components/atoms/Logo";
import { createSubscription } from "../features/university/universityAPI";

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
    color: "green",
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
    color: "cyan",
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
    color: "teal",
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
    color: "purple",
  },
];

const PricingPage = () => {
  const universityId = useSelector((state) => state.university.id);
  const dispatch = useDispatch();

  const handleCheckout = async (plan) => {
    if (plan.priceInfo.unitAmount === null) {
      // Redirect to contact sales page for custom pricing
      window.location.href = "/contact-sales";
      return;
    }

    if (plan.priceInfo.unitAmount === 0) {
      // Redirect to free tier success page
      window.location.href = "/free-tier-success";
      return;
    }

    try {
      const res = await dispatch(
        createSubscription({
          amount: plan.priceInfo.unitAmount,
          currency: plan.priceInfo.currency,
          planName: plan.name,
          universityId,
        })
      ).unwrap();
      window.location.href = res.checkoutUrl;
    } catch (err) {
      console.error("Stripe checkout error:", err);
      alert("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center">
              <Logo />
            </div>
          </div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Pricing Plans for Universities
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your university. All plans include our
            core LMS features with flexible options to scale.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`relative rounded-2xl shadow-xl p-8 border bg-white flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? "border-blue-500 ring-4 ring-blue-100 transform -translate-y-2"
                  : "border-gray-200"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-${plan.color}-100`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {plan.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-500">
                      {plan.tier}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600 italic mb-2">{plan.bestFor}</p>
                  <p className="text-3xl font-extrabold text-gray-900 mb-1">
                    {plan.price}
                  </p>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="border-t border-gray-100 pt-6 mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Features
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <div className="mt-0.5 text-blue-500">
                          {feature.icon}
                        </div>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCheckout(plan)}
                className={`w-full py-3 px-4 mt-4 text-white font-semibold rounded-xl transition duration-200 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/30"
                    : "bg-gradient-to-r from-gray-700 to-gray-900"
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">
                Can I switch plans later?
              </h4>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Your
                billing will be prorated accordingly.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">
                Is there a setup fee?
              </h4>
              <p className="text-gray-600">
                No setup fees for any plans. Enterprise plans may have custom
                implementation fees based on requirements.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept all major credit cards. For enterprise plans, we also
                support bank transfers and invoices.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h4>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. There are no
                cancellation fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
