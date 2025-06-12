import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import roleIcons from "../../components/icons/roleIcons";
import { login } from "./authAPI";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ userId: false, password: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formattedRole = role ? role.toLowerCase() : "user";
  const roleTitle =
    formattedRole.charAt(0).toUpperCase() + formattedRole.slice(1);

  const isFormInvalid = userId.trim() === "" || password.trim() === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setTouched({ userId: true, password: true });

    if (isFormInvalid) return;

    setIsSubmitting(true);
    try {
      const res = await dispatch(
        login({ email: userId, password, role: formattedRole.toUpperCase() })
      ).unwrap();
      navigate(`/dashboard/${formattedRole}`);
    } catch (err) {
      console.log(err);
      setErrorMsg("Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark to-secondary">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          {roleIcons[formattedRole] || roleIcons["user"]}
          <h2 className="text-2xl font-bold mt-2 text-primary">
            {roleTitle} Login
          </h2>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium text-dark">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, userId: true }))}
              className={`w-full p-2 border ${
                touched.userId && userId.trim() === ""
                  ? "border-red-500"
                  : "border-secondary"
              } rounded-lg focus:ring-2 focus:ring-accent outline-none`}
              placeholder="Enter your ID"
            />
            {touched.userId && userId.trim() === "" && (
              <p className="text-red-500 text-sm mt-1">User ID is required.</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-dark">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              className={`w-full p-2 border ${
                touched.password && password.trim() === ""
                  ? "border-red-500"
                  : "border-secondary"
              } rounded-lg focus:ring-2 focus:ring-accent outline-none`}
              placeholder="Enter your password"
            />
            {touched.password && password.trim() === "" && (
              <p className="text-red-500 text-sm mt-1">Password is required.</p>
            )}
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isFormInvalid}
            className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
              isFormInvalid || isSubmitting
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-secondary"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {formattedRole === "student" && (
          <>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate("/register")}
                className="text-sm underline text-[#EE9B00] hover:text-[#CA6702] cursor-pointer"
              >
                New Registration?
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate("/register")}
                className="text-sm underline text-[#EE9B00] hover:text-[#CA6702] cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
