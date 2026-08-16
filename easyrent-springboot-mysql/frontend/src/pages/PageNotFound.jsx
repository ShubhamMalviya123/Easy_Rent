import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";

const PageNotFound = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Main Section */}
      <section className="relative bg-white py-20 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-50"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            {/* Icon */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto">
                  <FaExclamationTriangle className="text-6xl sm:text-7xl text-orange-500 transform hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* 404 Number */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-extrabold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  404
                </span>
              </h1>
            </div>

            {/* Title */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Page Not Found
              </h2>
            </div>

            {/* Description */}
            <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
                Oops! The page you're looking for doesn't exist or has been moved.
                <br className="hidden sm:block" />
                Let's get you back on track to finding your perfect rental space.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  to="/"
                  className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gray-900 rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  <FaHome className="mr-2 h-5 w-5" />
                  <span>Go to Home</span>
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="group inline-flex items-center justify-center px-8 py-4 font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
                >
                  <FaArrowLeft className="mr-2 h-5 w-5" />
                  <span>Go Back</span>
                </button>
              </div>

              {/* Additional help */}
              <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 text-gray-700">
                  <FaSearch className="h-5 w-5 text-primary-500" />
                  <span className="font-medium">Need help finding something?</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Try searching from the homepage or contact support if you need assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
