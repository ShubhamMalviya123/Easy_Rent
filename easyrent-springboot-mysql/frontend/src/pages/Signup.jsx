import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaHome, FaMapMarkerAlt, FaLock, FaArrowRight } from "react-icons/fa";

const SignupRenters = () => {
  const [userType, setUserType] = useState("renter");
  const [districtData, setDistrictData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetch('/utils/districtData.json')
      .then((response) => response.json())
      .then((data) => setDistrictData(data.states))
      .catch((error) => console.error('Error fetching the data:', error));
  }, []);

  const [formData, setFormData] = useState({
    userType: "renter",
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    houseName: "",
    homeAddress: {
      street: "",
      state: "",
      city: "",
      zipCode: "",
    },
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle state selection
    if (name === 'homeAddress.state') {
      const stateData = districtData.find((state) => state.state === value);
      setAvailableDistricts(stateData ? stateData.districts : []);

      setFormData((prevData) => ({
        ...prevData,
        homeAddress: {
          ...prevData.homeAddress,
          state: value,
          city: "", // Reset city when state changes
        },
      }));

      return; // Exit early since we handled it above
    }

    // Handle address fields
    if (name.startsWith("homeAddress.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        homeAddress: {
          ...prevData.homeAddress,
          [addressField]: value,
        },
      }));
    } else {
      // Handle other fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, formData);

      if (response.status === 200) {
        toast.success("User registered successfully");
        navigate("/login");
      } else {
        console.error("Registration failed:", response.data.message);
        toast.error(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "An error occurred while registering. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden relative">
      {/* Creative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-70"></div>
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Signup Form Container */}
      <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12 z-10">
        <div className={`w-full max-w-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-2">
              Create Account
            </h1>
            <p className="text-lg text-gray-600">
              Start your rental journey with <span className="text-primary-600 font-bold">EasyRent</span>
            </p>
          </div>

          {/* Signup Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/50 transform hover:scale-[1.005] transition-transform duration-500">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* User Type Selection */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  Sign up as
                </label>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <label className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer w-full sm:w-1/2 ${userType === 'renter' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-gray-50 hover:border-primary-300'}`}>
                    <input
                      type="radio"
                      name="userType"
                      value="renter"
                      checked={userType === "renter"}
                      onChange={(e) => {
                        setUserType(e.target.value);
                        setFormData((prevData) => ({
                          ...prevData,
                          userType: e.target.value,
                        }));
                      }}
                      className="h-5 w-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <span className={`ml-3 font-bold ${userType === 'renter' ? 'text-primary-700' : 'text-gray-600'}`}>Renter</span>
                  </label>
                  <label className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer w-full sm:w-1/2 ${userType === 'landowner' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-gray-50 hover:border-primary-300'}`}>
                    <input
                      type="radio"
                      name="userType"
                      value="landowner"
                      checked={userType === "landowner"}
                      onChange={(e) => {
                        setUserType(e.target.value);
                        setFormData((prevData) => ({
                          ...prevData,
                          userType: e.target.value,
                        }));
                      }}
                      className="h-5 w-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <span className={`ml-3 font-bold ${userType === 'landowner' ? 'text-primary-700' : 'text-gray-600'}`}>Landowner</span>
                  </label>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300"
                      required
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="group">
                  <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300"
                      required
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="group">
                  <label htmlFor="dateOfBirth" className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaCalendar className="text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                    </div>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* House Name - Only for Landowners */}
              {userType === "landowner" && (
                <div className="group">
                  <label htmlFor="houseName" className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    House Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaHome className="text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                    </div>
                    <input
                      type="text"
                      id="houseName"
                      name="houseName"
                      value={formData.houseName}
                      onChange={handleChange}
                      placeholder="Enter your House Name"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Home Address Section */}
              <div className="space-y-4 pt-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary-500" /> Home Address
                </label>

                {/* Street Address */}
                <div className="group">
                  <input
                    type="text"
                    name="homeAddress.street"
                    value={formData.homeAddress.street}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300"
                    required
                  />
                </div>

                {/* State and District Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* State Selection */}
                  <div className="group relative">
                    <select
                      name="homeAddress.state"
                      value={formData.homeAddress.state}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300 appearance-none"
                      required
                    >
                      <option value="">Select State</option>
                      {districtData.map((state) => (
                        <option key={state.state} value={state.state}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* District Selection */}
                  <div className="group relative">
                    <select
                      name="homeAddress.city"
                      value={formData.homeAddress.city}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!formData.homeAddress.state}
                      required
                    >
                      <option value="">Select District</option>
                      {availableDistricts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Zip Code */}
                <div className="group">
                  <input
                    type="text"
                    name="homeAddress.zipCode"
                    value={formData.homeAddress.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:bg-white hover:border-primary-300"
                    required
                  />
                </div>
              </div>

              {/* Signup Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting && (
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                    {!isSubmitting && <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />}
                  </span>
                </button>
              </div>
            </form>

            {/* Additional Links */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 font-bold transition-colors duration-300 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors duration-300 group font-medium"
            >
              <svg className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupRenters;
