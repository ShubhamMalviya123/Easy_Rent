import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/password/forget`, {
        email,
      });
      toast.success("Reset link is sent to your email!");
      navigate("/login");
    } catch (error) {
      console.error(
        "Error sending reset link:",
        error.response?.data || error.message
      );
      toast.error("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans py-12 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <FaEnvelope className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="mb-3 text-3xl font-extrabold text-center text-gray-900">
            Reset Your Password
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Form */}
          <form className="space-y-6" id="resetForm" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 hover:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 text-lg font-bold text-white bg-gray-900 rounded-xl shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 group"
            >
              <FaPaperPlane className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              Send Reset Link
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 space-y-4 text-center">
            <p className="text-sm text-gray-600">
              If you didn't request a password reset, please ignore this.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center px-4 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 font-medium"
            >
              <FaArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </button>
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
