import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                EasyRent
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-md">
                Your reliable rental companion. We connect verified landlords and tenants for a seamless, hassle-free rental journey backed by advanced technology.
              </p>
            </div>



            {/* Social Links */}
            <div className="flex space-x-5">
              <a href="https://github.com/kumarpraveer143" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors duration-300 transform hover:scale-110">
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://x.com/kumarpraveer3?t=s-r4AAAheb9JaG9UBN70og&s=09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors duration-300 transform hover:scale-110">
                <span className="sr-only">X (Twitter)</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/kumar_praveeer?igsh=a3ZxamN0aWFqcjQw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors duration-300 transform hover:scale-110">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/praveerdeveloper/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors duration-300 transform hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Platform</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/findRooms" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    Find Rooms
                  </Link>
                </li>
                <li>
                  <Link to="/uploadrooms" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    List Property
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Support</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/faq" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/developer" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    Developers
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="https://blogging-application-ten.vercel.app" target="_blank" className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} EasyRent. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-primary-600 transition-colors duration-300">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary-600 transition-colors duration-300">
                Terms
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-primary-600 transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
