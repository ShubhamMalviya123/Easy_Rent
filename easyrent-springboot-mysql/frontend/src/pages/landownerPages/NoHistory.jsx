import React, { useEffect, useState } from "react";
import { FaRegSadTear, FaArrowLeft, FaHistory, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const NoHistory = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-white py-20 overflow-hidden border-b border-gray-100 flex-grow flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            <div className="mb-8 relative inline-block">
              <div className="absolute inset-0 bg-primary-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white p-6 rounded-full shadow-xl border border-gray-100">
                <FaHistory className="w-16 h-16 text-primary-500" />
              </div>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
              <span className="block">No Payment History</span>
              <span className="block text-primary-600 mt-2 text-3xl sm:text-4xl">Available Yet</span>
            </h1>

            <p className="mt-4 text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              This tenant doesn't have any payment records yet. Once rent payments are added, they will appear here with complete transaction details.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/my-renters")}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <FaArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to My Renters
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 transition-all duration-200 bg-white border-2 border-gray-200 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <FaMoneyBillWave className="mr-2 h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                Add Rent Record
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaHistory className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Track Payments</h3>
                </div>
                <p className="text-sm text-gray-600">View complete payment history and records.</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaMoneyBillWave className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Add Records</h3>
                </div>
                <p className="text-sm text-gray-600">Easily add new rent payment entries.</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaChartLine className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Analytics</h3>
                </div>
                <p className="text-sm text-gray-600">Get insights on payment trends and history.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NoHistory;
