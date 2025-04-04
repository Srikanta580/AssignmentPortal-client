import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import roleIcons from "../../components/icons/roleIcons";

const LoginForm = () => {
  const navigate = useNavigate();
  const { role } = useParams(); // Role from URL param
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // Normalize role
  const formattedRole = role ? role.toLowerCase() : "user";
  const roleTitle =
    formattedRole.charAt(0).toUpperCase() + formattedRole.slice(1);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${roleTitle} with ID: ${userId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001219] to-[#0A9396]">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          {roleIcons[formattedRole] || roleIcons["user"]}
          <h2 className="text-2xl font-bold mt-2 text-[#005F73]">
            {roleTitle} Login
          </h2>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium text-[#001219]">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 border border-[#0A9396] rounded-lg focus:ring-2 focus:ring-[#94D2BD] outline-none"
              placeholder="Enter your ID"
            />
          </div>

          <div>
            <label className="block font-medium text-[#001219]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#0A9396] rounded-lg focus:ring-2 focus:ring-[#94D2BD] outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#005F73] text-white font-semibold hover:bg-[#0A9396] transition-all duration-300"
          >
            Login
          </button>
        </form>

        {formattedRole === "student" && (
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/register")}
              className="text-sm underline text-[#EE9B00] hover:text-[#CA6702]"
            >
              Register as Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
