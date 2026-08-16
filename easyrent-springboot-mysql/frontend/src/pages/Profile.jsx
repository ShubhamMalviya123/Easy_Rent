import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../components/UI/Loading";
import axios from "axios";
import {
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaMapMarkerAlt,
  FaHome,
  FaIdCard
} from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData(storedUser);
    }
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      homeAddress: {
        ...prevData.homeAddress,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/editprofile`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        // Update user data in localStorage
        localStorage.setItem("user", JSON.stringify(formData));
        setUser(formData);
        toast.success("Profile Updated Successfully!");
        setIsEditing(false);
      } else {
        toast.error(response.data.msg || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  if (!user) {
    return (
      <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white py-16 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
              Profile Management
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 sm:text-xl mx-auto leading-relaxed">
              View and edit your profile information with our secure and user-friendly interface.
            </p>
          </div>

          {/* User Type Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md border border-gray-200">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center mr-3">
                <FaUser className="text-white text-lg" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Account Type</p>
                <p className="text-sm font-bold text-gray-900 capitalize">{user.userType}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100">
            <div className="space-y-8">
              {/* Basic Information Header */}
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaUser className="text-primary-600" />
                  Personal Information
                </h2>
              </div>

              {/* Basic Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white hover:border-primary-300"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                      {user.name || "Not provided"}
                    </div>
                  )}
                </div>

                {/* Email Address */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" />
                    Email Address
                  </label>
                  <div className="p-4 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 font-medium">
                    {user.email}
                    <span className="ml-2 text-xs text-gray-500">(Cannot be changed)</span>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber || ""}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white hover:border-primary-300"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                      {user.phoneNumber || "Not provided"}
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <FaCalendar className="text-gray-400" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth?.split("T")[0] || ""}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none text-gray-900 transition-all duration-300 hover:bg-white hover:border-primary-300"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                      {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "Not provided"}
                    </div>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary-600" />
                  Address Information
                </h3>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        name="street"
                        value={formData.homeAddress?.street || ""}
                        onChange={handleAddressChange}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white hover:border-primary-300"
                        placeholder="Street Address"
                      />
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.homeAddress?.city || ""}
                      onChange={handleAddressChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white hover:border-primary-300"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      name="state"
                      value={formData.homeAddress?.state || ""}
                      onChange={handleAddressChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white hover:border-primary-300"
                      placeholder="State"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.homeAddress?.zipCode || ""}
                      onChange={handleAddressChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white hover:border-primary-300"
                      placeholder="Zip Code"
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                    {user.homeAddress?.street ?
                      `${user.homeAddress.street}, ${user.homeAddress.city}, ${user.homeAddress.state} - ${user.homeAddress.zipCode}` :
                      "Not provided"
                    }
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-6">
                  {/* House Name (for landowners) */}
                  {user?.userType === "landowner" && (
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <FaHome className="text-gray-400" />
                        House Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="houseName"
                          value={formData.houseName || ""}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white hover:border-primary-300"
                          placeholder="Enter house name"
                        />
                      ) : (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                          {user.houseName || "Not provided"}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Aadhar Number */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <FaIdCard className="text-gray-400" />
                      Aadhar Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="aadharCardNumber"
                        value={formData.aadharCardNumber || ""}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white hover:border-primary-300"
                        placeholder="Enter Aadhar number"
                      />
                    ) : (
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                        {user.aadharCardNumber || "Not provided"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 pt-8 border-t border-gray-100">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
              )}

              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <FaArrowLeft className="mr-2" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;