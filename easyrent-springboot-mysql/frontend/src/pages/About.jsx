import React, { useState, useEffect } from "react";
import { FaHome, FaUsers, FaShieldAlt, FaRocket, FaHandshake, FaChartLine, FaMobileAlt, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              About
            </h1>
            <p className={`text-2xl md:text-3xl leading-8 font-extrabold tracking-tight text-primary-600 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              EasyRent Platform
            </p>
            <p className={`text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Revolutionizing the rental experience with cutting-edge technology,
              seamless user interactions, and a commitment to making property rental
              accessible, secure, and efficient for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* For Renters Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              For Renters: Find Your Perfect Home
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Discover trusted listings, streamline your application, and find a
              place you can call home – all at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaShieldAlt size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted Listings</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse a wide range of verified properties, ensuring a secure and
                reliable rental experience with comprehensive background checks.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaRocket size={32} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Effortless Application</h3>
              <p className="text-gray-600 leading-relaxed">
                Apply for properties quickly and easily with our simple,
                streamlined application process and instant notifications.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-green-200 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaHandshake size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Moves</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with landlords directly, finalize the deal, and get moving
                in no time. Experience a seamless rental process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Landlords Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              For Landlords: Maximize Your Property Value
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Streamline property management, find quality tenants, and optimize
              your rental income with our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-orange-200 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaChartLine size={32} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Property Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Get detailed insights into your property performance, market trends,
                and rental optimization strategies.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-cyan-200 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-cyan-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers size={32} className="text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Tenants</h3>
              <p className="text-gray-600 leading-relaxed">
                Access pre-screened tenants with verified backgrounds, ensuring
                reliable and responsible renters for your properties.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-yellow-200 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaMobileAlt size={32} className="text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Manage your properties on-the-go with our mobile-optimized platform,
                keeping you connected 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Built with modern technology to provide the best rental experience for everyone.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <FaGlobe className="text-primary-600 mr-3" />
                Global Reach
              </h3>
              <ul className="space-y-4 text-gray-600 max-w-2xl mx-auto">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Advanced search and filtering capabilities</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Real-time property availability updates</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Interactive maps and location-based search</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Multi-language support for global users</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Creative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 opacity-80"></div>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6 tracking-tight">
            Ready to Transform Your <span className="text-primary-600 relative inline-block">
              Rental Experience?
              <svg className="absolute bottom-0 left-0 w-full h-2 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied users who have revolutionized their property rental journey with our platform. Start today for free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="transform hover:scale-105 transition-all duration-300">
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-lg hover:shadow-xl"
                role="button"
              >
                Get Started Today
              </Link>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <Link
                to="/about"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 transition-all duration-200 bg-white border-2 border-gray-200 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md"
                role="button"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
