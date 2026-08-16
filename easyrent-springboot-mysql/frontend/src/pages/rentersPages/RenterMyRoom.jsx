import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaHistory,
  FaHome,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaMoneyBillWave,
  FaArrowLeft,
  FaBuilding,
  FaDoorOpen,
  FaCalendar,
  FaInfoCircle,
  FaComments,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import NoRoomsFound from "../NoRoomsFound";
import Loading from "../../components/UI/Loading";
import PayRent from "../../components/PayRent";
import { connectSocket, getSocket } from "../../services/socket.service";
import Chat from "../../components/Chat";

const RenterMyRoom = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const socket = getSocket();

  const handleCheckHistory = (roomId) => {
    navigate("/renter-history");
  };

  useEffect(() => {
    setLoading(true);
    // Connect socket when component mounts
    if (user && user._id) {
      connectSocket(user._id);
    }

    const getRoomDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/relationship/getRoomDetails`,
          {
            withCredentials: true,
          }
        );
        setRoom(response.data.room);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
      setLoading(false);
    };

    getRoomDetails();

    // Cleanup socket on unmount
    return () => {
      // We don't disconnect here because Navbar might use it, 
      // but if we wanted to be strict we could. 
      // Usually socket is managed globally or in a context.
    };
  }, []);

  const relationId = room?.relationId;

  // Listen for new messages to update unread count
  useEffect(() => {
    if (socket && relationId) {
      const handleMessage = (message) => {
        if (!showChat && message.relationId === relationId) {
          setUnreadCount((prev) => prev + 1);
        }
      };

      socket.on("receive_message", handleMessage);

      return () => {
        socket.off("receive_message", handleMessage);
      };
    }
  }, [socket, showChat, relationId]);

  // Fetch initial unread count
  useEffect(() => {
    if (relationId && user) {
      const fetchUnreadCount = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/chat/unread/${relationId}/${user._id}`,
            { withCredentials: true }
          );
          setUnreadCount(response.data.count);
        } catch (error) {
          console.error("Error fetching unread count:", error);
        }
      };
      fetchUnreadCount();
    }
  }, [relationId, user]);

  // Reset count when chat opens
  useEffect(() => {
    if (showChat) {
      setUnreadCount(0);
    }
  }, [showChat]);

  if (loading) {
    return <Loading />;
  }

  if (!room) {
    return <NoRoomsFound />;
  }

  const { houseName, ownerNumber, ownerName, ownerEmail, roomDetails, renterId, ownerId } = room;
  const {
    address,
    rentPrice,
    roomType,
    numberOfRooms,
    numberOfBathrooms,
    roomNumber,
  } = roomDetails;

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Header Section */}
      <div className="bg-white py-20 relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center space-x-2 bg-white border border-gray-200 hover:border-primary-300 text-gray-600 hover:text-primary-600 px-6 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back</span>
            </button>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                My Current <span className="text-primary-600">Room</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
                Manage your rental details, payments, and view property information.
              </p>
            </div>

            <div className="hidden md:block w-24"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Monthly Rent Highlight - Top Banner */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-12 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-gray-900 opacity-50"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <FaMoneyBillWave className="h-10 w-10 text-primary-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Monthly Rent</p>
                <p className="text-white font-bold text-4xl mt-1">₹{rentPrice}</p>
              </div>
            </div>
            <button
              onClick={() => handleCheckHistory(roomDetails._id)}
              className="w-full md:w-auto bg-white text-gray-900 font-bold py-4 px-8 rounded-xl hover:bg-primary-50 transition-all duration-300 flex items-center justify-center space-x-3 group shadow-lg transform hover:-translate-y-0.5"
            >
              <FaHistory className="h-5 w-5 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              <span>View Payment History</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property & Room Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Information Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-primary-200 transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaBuilding className="h-6 w-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Property Information</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                  <div className="mt-1">
                    <FaHome className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Property Name</p>
                    <p className="text-lg font-bold text-gray-900">{houseName}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                  <div className="mt-1">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Full Address</p>
                    <p className="text-lg font-medium text-gray-900 leading-relaxed">
                      {address.street}, {address.city}, {address.state} - {address.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Details Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-primary-200 transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaDoorOpen className="h-6 w-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Room Details</h2>
              </div>

              {/* Room Number Highlight */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100">
                    <span className="text-primary-600 font-extrabold text-2xl">{roomNumber}</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Room Number</p>
                    <p className="text-gray-900 font-bold text-2xl">Room {roomNumber}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaBuilding className="h-5 w-5 text-primary-500" />
                    <p className="text-gray-500 text-sm font-medium">Type</p>
                  </div>
                  <p className="text-gray-900 font-bold text-lg capitalize">{roomType}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaBed className="h-5 w-5 text-primary-500" />
                    <p className="text-gray-500 text-sm font-medium">Bedrooms</p>
                  </div>
                  <p className="text-gray-900 font-bold text-lg">{numberOfRooms}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaBath className="h-5 w-5 text-primary-500" />
                    <p className="text-gray-500 text-sm font-medium">Bathrooms</p>
                  </div>
                  <p className="text-gray-900 font-bold text-lg">{numberOfBathrooms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Owner Details */}
          <div className="space-y-8">
            {/* Owner Details Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-primary-200 transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaUser className="h-6 w-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Landowner</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="mt-1">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Name</p>
                    <p className="text-lg font-bold text-gray-900">{ownerName}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="mt-1">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
                    <p className="text-base font-semibold text-gray-900 break-all">{ownerEmail}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="mt-1">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Phone</p>
                    <p className="text-lg font-bold text-gray-900">{ownerNumber}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowChat(true)}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 relative"
                >
                  <FaComments className="h-5 w-5" />
                  <span className="font-semibold">Chat with Landowner</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Pay Rent Section */}
            <PayRent
              relationId={relationId}
              rentAmount={rentPrice}
              renterId={renterId}
              ownerId={ownerId}
              roomId={roomDetails._id}
            />

            {/* Info Banner */}
            <div className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-2xl p-6 border border-primary-100 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <FaInfoCircle className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold mb-2">Need Help?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    For any issues regarding your room, payment, or maintenance, please contact your landowner directly using the details above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showChat && (
        <Chat
          relationId={relationId}
          senderId={user._id}
          recipientName={ownerName}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default RenterMyRoom;
