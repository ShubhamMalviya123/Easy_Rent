import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome, FaMapMarkerAlt, FaMoneyBillWave, FaBed, FaBath, FaBuilding, FaHashtag, FaUpload, FaArrowLeft } from "react-icons/fa";

const UploadRooms = () => {
  const navigate = useNavigate();
  const [districtData, setDistrictData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState([]);

  useEffect(() => {
    fetch("/utils/districtData.json")
      .then((response) => response.json())
      .then((data) => setDistrictData(data.states))
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const [formData, setFormData] = useState({
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    rentPrice: "",
    roomType: "",
    numberOfRooms: "",
    numberOfBathrooms: "",
    roomNumber: "",
    isAvailable: true,
  });

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);

    const stateData = districtData.find(
      (state) => state.state === selectedState
    );
    setAvailableDistricts(stateData ? stateData.districts : []);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/rooms/`, formData, {
        withCredentials: true,
      });
      toast.success("Room Registered Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Something went wrong:", err.message);
      toast.error("Something went wrong");
    }
  };

  let user = JSON.parse(localStorage.getItem("user"));
  const houseName = user?.houseName;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
      <div className="bg-white py-16 relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 relative gap-4 sm:gap-0">
            <div className="w-full sm:w-auto flex justify-start">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 group font-medium shadow-sm"
              >
                <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back</span>
              </button>
            </div>

            <div className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2">
                Upload Room Details
              </h1>
              <p className="text-gray-600 text-lg">
                Add your property to our platform
              </p>
            </div>

            <div className="hidden sm:block w-20"></div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                <FaHome className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{houseName}</h2>
                <p className="text-blue-100">Property Registration Form</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Address Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Property Address</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                    placeholder="Enter street address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                  <select
                    name="address.state"
                    value={formData.address.state}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleStateChange(e);
                    }}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                  >
                    <option value="" disabled>Select a state</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">District</label>
                  <select
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                  >
                    <option value="" disabled>Select a district</option>
                    {availableDistricts.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
            </div>

            {/* Property Details Section */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <FaBuilding className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Property Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Rent Price (₹)</label>
                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    <input
                      type="number"
                      name="rentPrice"
                      value={formData.rentPrice}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                      placeholder="Enter rent amount"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Room Type</label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                  >
                    <option value="" disabled>Select room type</option>
                    <option value="single">Single</option>
                    <option value="shared">Shared</option>
                    <option value="studio">Studio</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Room Number <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FaHashtag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                    <input
                      type="text"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                      placeholder="E.g. 101, A1, B2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Bedrooms</label>
                  <div className="relative">
                    <FaBed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                    <input
                      type="number"
                      name="numberOfRooms"
                      value={formData.numberOfRooms}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                      placeholder="Number of rooms"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Bathrooms</label>
                  <div className="relative">
                    <FaBath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-500" />
                    <input
                      type="number"
                      name="numberOfBathrooms"
                      value={formData.numberOfBathrooms}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:bg-white"
                      placeholder="Number of bathrooms"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md transform hover:scale-105"
              >
                <FaUpload className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Upload Property</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadRooms;
