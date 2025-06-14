import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiHome,
  FiCheck,
} from "react-icons/fi";
import Logo from "../components/atoms/Logo";

const ContactSalesPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: "",
    phone: "",
    students: "",
    interest: "Dedicated Database",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log("Form data:", formData);
    setSubmitted(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(false);
      alert("Thank you! Our sales team will contact you within 24 hours.");
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Logo in top left corner */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <Logo />
      </div>

      <div className="max-w-6xl mx-auto pt-16">
        {submitted ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <FiCheck className="text-green-500" size={48} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Thank You for Contacting Us!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Our enterprise sales team will contact you within 24 hours to
              discuss your requirements.
            </p>
            <button
              className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl shadow"
              onClick={() => (window.location.href = "/")}
            >
              Return to Homepage
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Enterprise Solutions Inquiry
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss how our dedicated infrastructure, premium support,
                and custom solutions can meet your institution's needs.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-blue-100 rounded-lg">
                    <FiHome className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Tailored Solutions
                    </h3>
                    <p className="text-gray-600">
                      Custom implementations for large universities and
                      multi-campus systems
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-purple-100 rounded-lg">
                    <FiCheck className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Compliance & Security
                    </h3>
                    <p className="text-gray-600">
                      GDPR, HIPAA, FERPA compliant solutions with
                      enterprise-grade security
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-teal-100 rounded-lg">
                    <FiUser className="text-teal-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Dedicated Support
                    </h3>
                    <p className="text-gray-600">
                      24/7 priority support with dedicated account manager and
                      SLAs
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  What to expect
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <FiCheck className="text-green-500 mt-1" />
                    <span>
                      Custom pricing based on your institution size and needs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheck className="text-green-500 mt-1" />
                    <span>
                      Technical consultation with our solutions architects
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheck className="text-green-500 mt-1" />
                    <span>Personalized demo of enterprise features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheck className="text-green-500 mt-1" />
                    <span>Implementation roadmap and timeline</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Contact Our Sales Team
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@university.edu"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="University Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., IT Director, Administrator"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Students
                  </label>
                  <select
                    name="students"
                    value={formData.students}
                    onChange={handleChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="1-1000">1 - 1,000</option>
                    <option value="1001-5000">1,001 - 5,000</option>
                    <option value="5001-10000">5,001 - 10,000</option>
                    <option value="10001-20000">10,001 - 20,000</option>
                    <option value="20000+">20,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Interest
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Dedicated Database">
                      Dedicated Database
                    </option>
                    <option value="Dedicated Schema">Dedicated Schema</option>
                    <option value="Custom Implementation">
                      Custom Implementation
                    </option>
                    <option value="Compliance Requirements">
                      Compliance Requirements
                    </option>
                    <option value="White-label Solution">
                      White-label Solution
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tell Us About Your Needs
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <FiMessageSquare className="text-gray-400" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Specific requirements, timeline, technical needs, etc."
                    ></textarea>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Contact Sales Team
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Prefer to talk now?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-700">Sales Team</p>
                    <p className="text-blue-600">
                      sales@universityplatform.com
                    </p>
                    <p className="text-gray-600 mt-1">Mon-Fri, 9am-5pm EST</p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-700">
                      Enterprise Support
                    </p>
                    <p className="text-blue-600">
                      enterprise@universityplatform.com
                    </p>
                    <p className="text-gray-600 mt-1">
                      24/7 for existing customers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSalesPage;
