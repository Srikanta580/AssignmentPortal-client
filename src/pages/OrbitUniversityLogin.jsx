import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiLock,
  FiMail,
  FiUsers,
  FiChevronRight,
  FiHome,
  FiBook,
  FiCheckCircle,
} from "react-icons/fi";
import Logo from "../components/atoms/Logo";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authAPI";
import { Link, useNavigate } from "react-router-dom";

const OrbitUniversityLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loginError, setLoginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);
    try {
      const response = await dispatch(
        login({
          email: loginFormData.email,
          password: loginFormData.password,
          role: "UNIVADMIN",
        })
      ).unwrap();

      const route = response.user.universityName
        .split(" ")
        .join("-", "-")
        .toLowerCase();
      navigate(`/${route}/admin`);
    } catch (error) {
      setLoginError(error?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center mb-8">
            <Logo size="small" />
          </Link>

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

          <form className="space-y-4" onSubmit={handleLogin}>
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
                  name="email"
                  required
                  value={loginFormData.email}
                  onChange={handleChange}
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
                  name="password"
                  required
                  value={loginFormData.password}
                  onChange={handleChange}
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

            {loginError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={
                isSubmitting ||
                loginFormData.email === "" ||
                loginFormData.password === ""
              }
              className={`w-full py-3 rounded-lg font-medium shadow-sm transition-all ${
                loginFormData.email === "" || loginFormData.password === ""
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-md"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
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

            <Link
              to="/university-reg"
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-cyan-100 rounded-lg font-medium text-cyan-600 hover:bg-cyan-50 transition-colors"
            >
              Register your university
              <FiChevronRight />
            </Link>
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
};

export default OrbitUniversityLoginPage;
