import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
            <span className="block text-gray-900">
              Get in Touch
            </span>
            <span className="block text-primary-600 mt-2">Contact Us</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl mx-auto leading-relaxed">
            We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Input */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-primary-600 transition-colors duration-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:border-primary-300 hover:bg-white"
                />
              </div>

              {/* Email Input */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-primary-600 transition-colors duration-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:border-primary-300 hover:bg-white"
                />
              </div>

              {/* Message Input */}
              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-primary-600 transition-colors duration-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us how we can help you..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:border-primary-300 hover:bg-white resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-bold text-white bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-800"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message <FaPaperPlane className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              Other Ways to
            </h2>
            <p className="text-3xl leading-8 font-extrabold tracking-tight text-primary-600 sm:text-4xl">
              Reach Us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Contact */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto mb-6">
                <FaEnvelope className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Email Support</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Send us an email and we'll respond within 24 hours.
              </p>
              <a
                href="mailto:techpraveer@gmail.com"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-300 font-medium block text-center"
              >
                techpraveer@gmail.com
              </a>
            </div>

            {/* Phone Contact */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto mb-6">
                <FaPhoneAlt className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Phone Support</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Call us for immediate assistance during business hours.
              </p>
              <a
                href="tel:+918252965226"
                className="text-purple-600 hover:text-purple-700 transition-colors duration-300 font-medium block text-center"
              >
                +91 8252965226
              </a>
            </div>

            {/* WhatsApp Contact */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-green-200 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="h-16 w-16 rounded-2xl bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto mb-6">
                <FaWhatsapp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">WhatsApp Support</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Start a WhatsApp chat for instant messaging support.
              </p>
              <a
                href="https://wa.me/918252965226"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 transition-colors duration-300 font-medium block text-center"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
