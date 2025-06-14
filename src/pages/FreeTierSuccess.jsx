import React from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiZap,
  FiLayers,
  FiHeadphones,
  FiArrowRight,
} from "react-icons/fi";
import Logo from "../components/atoms/Logo";
import { useSelector } from "react-redux";

const FreeTierSuccessPage = () => {
  const universitySlug = useSelector((state) => state.university.slug);
  return (
    <div className="min-h-screen bg-gradient-to-br from-light to-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Header with logo */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <Logo />
      </div>

      {/* Dashboard button in top right */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => (window.location.href = `/${universitySlug}/admin`)}
          className="cursor-pointer px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-lg flex items-center gap-2"
        >
          Go to Dashboard <FiArrowRight />
        </button>
      </div>

      <div className="max-w-4xl mx-auto pt-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mx-auto flex items-center justify-center w-32 h-32 rounded-full bg-green-100 mb-8"
          >
            <FiCheckCircle className="text-green-500" size={64} />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Your Free Tier!
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            You're all set to explore our platform with limited access to core
            modules. Start your educational journey today!
          </motion.p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            What You Can Do Now
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6 bg-blue-50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow">
                  <FiLayers className="text-blue-600" size={28} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Access Basic Modules
              </h3>
              <p className="text-gray-600">
                Course management, student roster, and basic analytics
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 bg-green-50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow">
                  <FiZap className="text-green-600" size={28} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Limited API Access
              </h3>
              <p className="text-gray-600">
                Up to 1,000 API calls per month for integration
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 bg-purple-50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow">
                  <FiHeadphones className="text-purple-600" size={28} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Community Support
              </h3>
              <p className="text-gray-600">
                Access to forums and knowledge base resources
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTierSuccessPage;
