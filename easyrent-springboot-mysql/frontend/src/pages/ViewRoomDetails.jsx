import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaPaperPlane, FaTimes, FaArrowLeft, FaHome, FaMapMarkerAlt, FaBed, FaBath, FaMoneyBillWave, FaUser, FaCheckCircle, FaTimesCircle, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../components/UI/Loading";
import Swal from "sweetalert2";

const ViewRoomDetails = () => {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [isEngaged, setEngaged] = useState(false);

  const roomTypeToImage = {
    single: "/rooms/room1.jpg",
    double: "/rooms/room2.jpg",
    apartment: "/rooms/room3.jpg",
    shared: "/rooms/room4.jpeg",
  };

  useEffect(() => {
    const isRequest = async () => {
      try {
        const req = await axios.get(`${import.meta.env.VITE_API_URL}/request/${roomId}`, {
          withCredentials: true,
        });
        const isEngaged = await axios.get(`${import.meta.env.VITE_API_URL}/relationship/engaged`, { withCredentials: true, });
        setEngaged(isEngaged.data.message);
        setHasRequested(req.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    isRequest();
  }, []);

  useEffect(() => {
    const isFabRoom = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_API_URL}/favourite/isFabRoom/${roomId}`,
          { withCredentials: true }
        );
        setIsFavorite(response.data ? true : false);
      } catch (err) {
        console.log(err);
      }
    };
    isFabRoom();
  }, [roomId]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/rooms/roomDetails/${roomId}`,
          { withCredentials: true }
        );
        setRoomDetails(response.data.room);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleToggleFavorite = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/favourite/toggle/${roomId}`,
        { withCredentials: true }
      );
      toast.success(
        isFavorite ? "Removed from favourites" : "Added to favourites"
      );
    } catch (err) {
      console.log(err);
    }
    setIsFavorite((prevState) => !prevState);
  };

  const handleRequest = async () => {
    try {
      if (isEngaged) {
        toast.error("You are already occupying another room, so you can't make a request!");
        return;
      }

      const result = await Swal.fire({
        title: hasRequested ? "Withdraw Request?" : "Send Request to Landowner?",
        html: `
          <div class="text-left">
            <div class="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-800">${roomDetails.owner.name}</h3>
                  <p class="text-sm text-gray-600">Landowner</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  <span class="text-sm text-gray-700">${roomDetails.owner.houseName}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="text-sm text-gray-700">${roomDetails.address.street}, ${roomDetails.address.city}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  <span class="text-sm text-gray-700">₹${roomDetails.rentPrice}/month</span>
                </div>
              </div>
            </div>
            <p class="text-gray-600 text-sm">
              ${hasRequested
            ? "This will withdraw your request for this room. You can send a new request later if needed."
            : "This will send a request to the landowner. They will review your request and get back to you soon."}
            </p>
          </div>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: hasRequested ? "Yes, Withdraw" : "Yes, Send Request",
        cancelButtonText: "Cancel",
        confirmButtonColor: hasRequested ? "#ef4444" : "#4f46e5",
        cancelButtonColor: "#6b7280",
        background: "#ffffff",
        backdrop: "rgba(0, 0, 0, 0.8)",
        customClass: {
          popup: "rounded-2xl shadow-2xl",
          title: "text-2xl font-bold text-gray-800",
          confirmButton: "rounded-lg font-semibold px-6 py-3",
          cancelButton: "rounded-lg font-semibold px-6 py-3"
        },
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/request/${roomId}`,
            {},
            { withCredentials: true }
          );
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }

        toast.success(
          hasRequested ? "Request withdrawn" : "Request sent to landowner"
        );
        setHasRequested((prevState) => !prevState);
      } else {
        toast.info("Action cancelled");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error processing request");
    }
  };

  if (!roomDetails) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
      <div className="bg-white py-12 relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between relative gap-4 sm:gap-0">
            <div className="w-full sm:w-auto flex justify-start">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 group font-medium shadow-sm"
              >
                <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back</span>
              </button>
            </div>

            <div className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Room Details
              </h1>
            </div>

            <div className="hidden sm:block w-20"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative group">
              <img
                src={roomTypeToImage[roomDetails.roomType.toLowerCase()] || "/rooms/room1.jpg"}
                alt="Room"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
                ₹{roomDetails.rentPrice}/mo
              </div>
              <div className="absolute top-4 left-4">
                {roomDetails.isAvailable ? (
                  <div className="bg-green-500 text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center space-x-2 shadow-lg">
                    <FaCheckCircle className="h-4 w-4" />
                    <span>Available</span>
                  </div>
                ) : (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center space-x-2 shadow-lg">
                    <FaTimesCircle className="h-4 w-4" />
                    <span>Not Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - Mobile */}
            <div className="lg:hidden space-y-3">
              <button
                onClick={handleToggleFavorite}
                className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md ${isFavorite
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50'
                  }`}
              >
                {isFavorite ? (
                  <>
                    <FaHeart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Remove from Favorites</span>
                  </>
                ) : (
                  <>
                    <FaRegHeart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Add to Favorites</span>
                  </>
                )}
              </button>

              {roomDetails.isAvailable === true && (
                <button
                  onClick={handleRequest}
                  className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md ${hasRequested
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                >
                  {hasRequested ? (
                    <>
                      <FaTimes className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Withdraw Request</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Request Landowner</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Property Information */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-5">
                <div className="flex items-center space-x-2">
                  <FaHome className="h-5 w-5 text-white" />
                  <h2 className="text-xl font-bold text-white">Property Info</h2>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                    {roomDetails.roomType} Room
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-900">{roomDetails.owner.houseName}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-gray-700">
                  <FaUser className="h-4 w-4 text-primary-500 flex-shrink-0" />
                  <span className="text-sm">Owner: <span className="font-semibold">{roomDetails.owner.name}</span></span>
                </div>

                <div className="flex items-start space-x-2 text-gray-700">
                  <FaMapMarkerAlt className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">
                    {roomDetails.address.street}, {roomDetails.address.city}, {roomDetails.address.state}, {roomDetails.address.zipCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Room Features */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-5">
                <div className="flex items-center space-x-2">
                  <FaBed className="h-5 w-5 text-white" />
                  <h2 className="text-xl font-bold text-white">Features</h2>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FaBed className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700 font-medium">Bedrooms</span>
                  </div>
                  <span className="text-gray-900 font-bold">{roomDetails.numberOfRooms}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FaBath className="h-5 w-5 text-cyan-500" />
                    <span className="text-gray-700 font-medium">Bathrooms</span>
                  </div>
                  <span className="text-gray-900 font-bold">{roomDetails.numberOfBathrooms}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <FaMoneyBillWave className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700 font-medium">Monthly Rent</span>
                  </div>
                  <span className="text-green-600 font-bold text-xl">₹{roomDetails.rentPrice}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons - Desktop */}
            <div className="hidden lg:block space-y-3">
              <button
                onClick={handleToggleFavorite}
                className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md ${isFavorite
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50'
                  }`}
              >
                {isFavorite ? (
                  <>
                    <FaHeart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Remove from Favorites</span>
                  </>
                ) : (
                  <>
                    <FaRegHeart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Add to Favorites</span>
                  </>
                )}
              </button>

              {roomDetails.isAvailable === true && (
                <button
                  onClick={handleRequest}
                  className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md ${hasRequested
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                >
                  {hasRequested ? (
                    <>
                      <FaTimes className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Withdraw Request</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Request Landowner</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoomDetails;
