import React, { useState } from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiSettings,
  FiBook,
  FiUsers,
  FiHome,
} from "react-icons/fi";
import Logo from "../components/atoms/Logo";
import UniversityRegistrationForm from "../components/forms/UniversityRegistrationForm";
import { Link } from "react-router-dom";

const OrbitUniversityRegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <Link
            to="/login"
            className="flex items-center gap-1 text-cyan-600 mb-6"
          >
            <FiArrowLeft /> Back to login
          </Link>

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
          <UniversityRegistrationForm setCurrentStep={setCurrentStep} />
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

export default OrbitUniversityRegisterPage;
