import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMoneyBillWave, FaCalendarAlt, FaCreditCard, FaComment, FaArrowLeft, FaUpload, FaHome } from "react-icons/fa";

const AddRent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rentPrice } = location.state || {};

  const [formData, setFormData] = useState({
    rentPaid: "",
    paymentMethod: "Online",
    remarks: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let { relationId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/history/${relationId}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Data submitted successfully!");
      } else {
        toast.warn(
          "Submission was successful, but the server returned an unexpected response."
        );
      }
      navigate("/my-renters");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during submission. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
      <div className="bg-white py-16 relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/my-renters")}
              className="flex items-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 group font-medium shadow-sm"
            >
              <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back</span>
            </button>

            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2">
                Add Rent Payment
              </h1>
              <p className="text-gray-600 text-lg">
                Record rent payment details
              </p>
            </div>

            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                <FaMoneyBillWave className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Rent Payment</h2>
                <p className="text-green-100">Record payment details</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-3xl font-bold text-white">₹{rentPrice}</div>
                <div className="text-green-100 text-sm">Monthly Rent</div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Rent Amount */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Rent Amount Paid (₹)
              </label>
              <div className="relative">
                <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                <input
                  type="number"
                  id="rentPaid"
                  name="rentPaid"
                  value={formData.rentPaid}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                  placeholder="Enter amount paid"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="relative">
                <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                >
                  <option value="Online">Online Payment</option>
                  <option value="Cash">Cash Payment</option>
                  <option value="Others">Other Methods</option>
                </select>
              </div>
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Payment Date
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                  required
                />
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Remarks (Optional)
              </label>
              <div className="relative">
                <FaComment className="absolute left-3 top-3 h-5 w-5 text-cyan-500" />
                <textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                  placeholder="Add any additional notes or remarks"
                  rows="3"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 space-y-3">
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2 group transform hover:scale-105 shadow-md"
              >
                <FaUpload className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Submit Payment</span>
              </button>

              <Link to="/my-renters">
                <button
                  type="button"
                  className="w-full bg-gray-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md"
                >
                  <FaArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Back to Renters</span>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRent;
