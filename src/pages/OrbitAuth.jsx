import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLock,
  FiMail,
  FiUsers,
  FiChevronRight,
  FiHome,
  FiBook,
  FiCheckCircle,
  FiSettings,
  FiArrowLeft,
} from "react-icons/fi";
import Logo from "../components/atoms/Logo";

const OrbitAuth = () => {
  const [isRegisteringUniversity, setIsRegisteringUniversity] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Main login page
  if (!isRegisteringUniversity) {
    return (
      <div className="min-h-screen flex bg-white">
        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md"
          >
            <div className="flex items-center mb-8">
              <Logo size="small" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600 mb-8">
              Log in to your university admin portal
            </p>

            {/* Orbit ID Login Option */}
            <div className="mb-6 relative group">
              <button
                disabled
                className="w-full flex items-center justify-center gap-3 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-not-allowed"
              >
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <FiUsers className="text-gray-900" />
                </div>
                <span>Login with Orbit ID</span>
              </button>

              {/* Tooltip */}
              <div className="absolute left-3/4 -translate-x-3/4 -top-8 mt-1 w-max bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                This feature is coming soon
              </div>

              <p className="text-xs text-gray-500 mt-2 text-center">
                Use your Orbit account ID
              </p>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  University Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="admin@university.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-sm text-cyan-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
              >
                Log In
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsRegisteringUniversity(true)}
                className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-cyan-100 rounded-lg font-medium text-cyan-600 hover:bg-cyan-50 transition-colors"
              >
                Register your university
                <FiChevronRight />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-cyan-50 to-teal-50 items-center justify-center p-12">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <Logo size="small" />
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Connecting education to opportunity
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join 500+ universities using Orbit to streamline administration,
              empower students, and connect with employers.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <FiHome className="text-cyan-600 text-2xl" />,
                  title: "Centralized Management",
                  text: "All your academic operations in one secure platform",
                },
                {
                  icon: <FiUsers className="text-cyan-600 text-2xl" />,
                  title: "Student Success Tools",
                  text: "Equip students with verified credentials and career pathways",
                },
                {
                  icon: <FiCheckCircle className="text-cyan-600 text-2xl" />,
                  title: "Employer Partnerships",
                  text: "Seamless collaboration with top recruiters",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // University Registration Flow
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <button
            onClick={() => setIsRegisteringUniversity(false)}
            className="flex items-center gap-1 text-cyan-600 mb-6"
          >
            <FiArrowLeft /> Back to login
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              University Registration
            </h1>
            <p className="text-gray-600">
              Complete these steps to onboard your institution
            </p>
          </div>

          {/* Progress Stepper */}
          <div className="mb-8">
            <nav className="flex items-center">
              {[1, 2, 3, 4].map((step) => (
                <React.Fragment key={step}>
                  <button
                    onClick={() => currentStep >= step && setCurrentStep(step)}
                    className={`flex flex-col items-center ${
                      currentStep >= step ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep > step
                          ? "bg-green-100 text-green-600"
                          : currentStep === step
                          ? "bg-cyan-100 text-cyan-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {currentStep > step ? <FiCheckCircle /> : step}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        currentStep >= step ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {
                        [
                          "Basic Info",
                          "Verification",
                          "Admin Setup",
                          "Complete",
                        ][step - 1]
                      }
                    </span>
                  </button>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        currentStep > step ? "bg-green-100" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl border border-gray-200"
            >
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Institution Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        University Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option>Select country</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Official Website
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution Type
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {["Public", "Private", "Community", "Vocational"].map(
                        (type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="institution-type"
                              className="h-4 w-4 text-cyan-600"
                            />
                            <span>{type}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Verification
                  </h2>
                  <p className="text-gray-600 mb-4">
                    We need to verify your authority to register this
                    institution
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Position
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="e.g. Registrar, Dean, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="name@university.edu"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Document
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-cyan-600 hover:text-cyan-500">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, JPG up to 5MB (e.g. official letterhead, staff
                          ID)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Admin Account Setup
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Minimum 12 characters with numbers and symbols
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <FiCheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Registration Submitted
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your university registration is under review. We'll contact
                    you within 2 business days to complete setup.
                  </p>
                  <button
                    onClick={() => setIsRegisteringUniversity(false)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700"
                  >
                    Return to Login
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="mt-6 flex justify-between">
              <button
                onClick={() =>
                  currentStep > 1 && setCurrentStep(currentStep - 1)
                }
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentStep === 1
                    ? "text-gray-400 cursor-default"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Back
              </button>
              <button
                onClick={() =>
                  currentStep < 4 && setCurrentStep(currentStep + 1)
                }
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:shadow-md"
              >
                {currentStep === 3 ? "Submit Registration" : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-cyan-50 to-teal-50 items-center justify-center p-12">
        <div className="max-w-lg">
          <div className="flex items-center mb-8">
            <Logo size="small" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            University Onboarding Process
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Follow these simple steps to connect your institution to the Orbit
            network.
          </p>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Basic Information",
                text: "Tell us about your institution",
              },
              {
                step: 2,
                title: "Authority Verification",
                text: "Confirm your administrative rights",
              },
              {
                step: 3,
                title: "Admin Account Setup",
                text: "Create your primary administrator profile",
              },
              {
                step: 4,
                title: "Review & Submit",
                text: "We'll verify and activate your account",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= item.step
                      ? "bg-cyan-100 text-cyan-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {item.step}
                </div>
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      currentStep >= item.step
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`${
                      currentStep >= item.step
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitAuth;
