import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    email: "",
    phone: "",
    admissionYear: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering Student:", formData);
    // Registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark to-secondary">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-primary">
          Student Registration
        </h2>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium text-dark">
              University Roll No
            </label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="w-full p-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent outline-none"
              placeholder="Enter your Roll No"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-dark">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent outline-none"
              placeholder="Enter your Full Name"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-dark">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent outline-none"
              placeholder="Enter your Email"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-dark">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent outline-none"
              placeholder="Enter your Phone Number"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-dark">
              Admission Year
            </label>
            <input
              type="number"
              name="admissionYear"
              value={formData.admissionYear}
              onChange={handleChange}
              className="w-full p-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent outline-none"
              placeholder="Enter your Admission Year"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition-all duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login/Student")}
            className="text-sm underline text-[#EE9B00] hover:text-[#CA6702]"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
