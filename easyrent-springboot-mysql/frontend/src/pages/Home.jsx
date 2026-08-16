import React, { useState, useEffect } from 'react';
import HomeImage from "/images/homeImage.png"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('landlords');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const faqs = [
    {
      question: "How do I list my property?",
      answer: "Simply create an account, click on 'List Property', and follow the step-by-step guide to showcase your space to potential tenants."
    },
    {
      question: "Is there a fee for listing my property?",
      answer: "Basic listings are free. Premium features are available for a small fee to boost visibility and attract more potential tenants."
    },
    {
      question: "How do I search for rooms?",
      answer: "Use our search bar to filter by location, price range, amenities, and more. You can search by pin code or use our interactive map feature."
    },
    {
      question: "Are payments secure?",
      answer: "Yes, all transactions are processed through our secure payment gateway with encryption and fraud protection measures in place."
    },
    {
      question: "Can I schedule a viewing before renting?",
      answer: "Absolutely! You can request viewings directly through our platform and coordinate with property owners for a convenient time."
    }
  ];

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section id="home" className="relative bg-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-gray-900">
                  Find Your Perfect
                </span>
                <span className="block text-primary-600 mt-2">Rental Space</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-gray-600 sm:text-xl md:mt-8 md:max-w-3xl leading-relaxed">
                Experience seamless property rentals with our advanced platform. Connect with verified landlords and tenants for a hassle-free rental journey.
              </p>
              <div className="mt-10 sm:flex space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="transform hover:scale-105 transition-all duration-300">
                  <Link to="/uploadrooms" className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white bg-gray-900 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300">
                    <span className="relative z-10">List Property</span>
                  </Link>
                </div>
                <div className="transform hover:scale-105 transition-all duration-300">
                  <Link to="/findRooms" className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-300">
                    <span className="relative z-10">Find Rooms</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={`mt-12 lg:mt-0 lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="w-full h-64 flex items-center justify-center">
                  <img
                    className="sm:w-[30rem] md:w-[30rem] mt-10 transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl rounded-lg"
                    src={HomeImage}
                    alt="Rental Platform"
                  />
                </div>
                <div className="absolute -inset-4 bg-primary-100 rounded-lg opacity-20 blur-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              Why Choose
            </h2>
            <p className="text-3xl leading-8 font-extrabold tracking-tight text-primary-600 sm:text-4xl">
              EasyRent Platform
            </p>
            <p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Advanced features designed to streamline your rental experience with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary-200">
              <div className="h-16 w-16 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">Smart Property Management</h3>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Advanced dashboard with real-time analytics, automated tenant screening, and comprehensive property management tools.
              </p>
            </div>

            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary-200">
              <div className="h-16 w-16 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">AI-Powered Search</h3>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Intelligent search algorithms with location-based filtering, price optimization, and personalized recommendations.
              </p>
            </div>

            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary-200">
              <div className="h-16 w-16 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">Secure Transactions</h3>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Enterprise-grade security with encrypted payments, fraud protection, and compliance with financial regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="why-us" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              Platform Benefits
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Comprehensive solutions tailored for both property owners and tenants with advanced features and seamless user experience.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <div className="flex justify-center lg:justify-start mb-8">
                  <div className="inline-grid grid-cols-2 rounded-xl shadow-lg overflow-hidden relative bg-gray-100">
                    {/* Active Tab Indicator */}
                    <div
                      className={`absolute top-0 h-full w-1/2 bg-gray-900 transition-all duration-500 ease-in-out ${activeTab === 'landlords' ? 'left-0' : 'left-1/2'
                        }`}
                    ></div>

                    <button
                      onClick={() => handleTabChange('landlords')}
                      className={`relative px-12 py-4 text-base font-bold transition-all duration-300 z-10 ${activeTab === 'landlords'
                          ? 'text-white'
                          : 'text-gray-500 hover:text-gray-900'
                        } cursor-pointer`}
                    >
                      For Landlords
                    </button>
                    <button
                      onClick={() => handleTabChange('renters')}
                      className={`relative px-12 py-4 text-base font-bold transition-all duration-300 z-10 ${activeTab === 'renters'
                          ? 'text-white'
                          : 'text-gray-500 hover:text-gray-900'
                        } cursor-pointer`}
                    >
                      For Renters
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="space-y-6">
                  {activeTab === 'landlords' ? (
                    <>
                      <div className="flex items-start group">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-4 text-lg text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Advanced property analytics and market insights</p>
                      </div>
                      <div className="flex items-start group">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-4 text-lg text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Automated tenant screening and verification</p>
                      </div>
                      <div className="flex items-start group">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-4 text-lg text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Integrated payment processing and financial reporting</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start group">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-4 text-lg text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Personalized property recommendations</p>
                      </div>
                      <div className="flex items-start group">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-4 text-lg text-gray-600 group-hover:text-primary-600 transition-colors duration-300">One-click application and document submission</p>
                      </div>
                      <div className="flex items-start group">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-4 text-lg text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Real-time notifications and communication tools</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Get answers to common questions about our advanced rental platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group hover:border-primary-300 transition-all duration-300">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-8 py-6 text-left focus:outline-none flex justify-between items-center group-hover:bg-gray-50 transition-colors duration-300"
                  >
                    <span className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{faq.question}</span>
                    <svg
                      className={`h-6 w-6 text-primary-500 transform transition-transform duration-300 ${activeQuestion === index ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
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

export default Home;
