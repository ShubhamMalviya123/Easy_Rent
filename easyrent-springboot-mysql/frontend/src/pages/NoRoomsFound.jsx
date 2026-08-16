import React, { useState, useEffect } from "react";
import { FaRegSadTear, FaHome, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const NoRoomsFound = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white flex-grow flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Icon */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary-100 rounded-full opacity-20 blur-2xl animate-pulse"></div>
                <FaRegSadTear className="relative text-9xl sm:text-[10rem] text-primary-200 mx-auto transform hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            {/* Title */}
            <div className={`mt-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                No Rooms <span className="text-primary-600">Found</span>
              </h1>
            </div>

            {/* Description */}
            <div className={`mt-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                It seems there are no rooms available at the moment.
                <br className="hidden sm:block" />
                Don't worry! You can explore other options or check back later.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="transform hover:scale-105 transition-all duration-300">
                  <Link
                    to="/dashboard"
                    className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white bg-gray-900 rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    <FaHome className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10 font-bold">Go to Dashboard</span>
                  </Link>
                </div>

                <div className="transform hover:scale-105 transition-all duration-300">
                  <Link
                    to="/findRooms"
                    className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-gray-50 transition-all duration-300"
                  >
                    <FaPlus className="mr-2 h-4 w-4 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10 font-bold">Search Again</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoRoomsFound;
