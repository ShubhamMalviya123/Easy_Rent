import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-50 relative overflow-hidden">
      {/* Creative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-80"></div>
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="text-center relative z-10">
        <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 transform hover:scale-105 transition-transform duration-500">
          {/* Logo/Brand Text */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Easy<span className="text-primary-600">Rent</span>
          </h1>

          {/* Enhanced Light Spinner */}
          <div className="flex justify-center items-center mb-8">
            <div className="relative w-20 h-20">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              {/* Spinning Gradient Ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 border-r-primary-400 rounded-full animate-spin"></div>
              {/* Inner Pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-600 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>

          {/* Loading Status */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800 animate-pulse">
              Loading Experience...
            </h2>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-gray-500 text-sm font-medium mt-2">
              Preparing your perfect home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
