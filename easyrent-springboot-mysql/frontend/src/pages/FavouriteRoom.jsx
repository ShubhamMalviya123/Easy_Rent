import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaMapMarkerAlt, FaBed, FaBath, FaMoneyBillWave, FaEye, FaHome, FaArrowLeft } from "react-icons/fa";
import NoRoomsFound from "./NoRoomsFound";
import Loading from "../components/UI/Loading";

const FavouriteRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRooms = async () => {
      try {
        const cachedRooms = localStorage.getItem("favouriteRooms");
        if (cachedRooms) {
          setRooms(JSON.parse(cachedRooms));
        }
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/favourite/myfavourite`, {
          withCredentials: true,
        });
        const fetchedRooms = response.data.rooms;
        localStorage.setItem("favouriteRooms", JSON.stringify(fetchedRooms));

        setRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
      setLoading(false);
    };
    fetchRooms();
  }, []);

  const navigate = useNavigate();

  const handleViewRoom = (roomId) => {
    navigate(`/viewRoomsDetails/${roomId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (rooms.length == 0) {
    return <NoRoomsFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
      <div className="bg-white py-16 relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50 opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 relative gap-4 sm:gap-0">
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
              <div className="flex items-center justify-center space-x-3 mb-2">
                <FaHeart className="h-8 w-8 text-pink-500 animate-pulse" />
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  My Favourite Rooms
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Your saved properties ({rooms.length} {rooms.length === 1 ? 'room' : 'rooms'})
              </p>
            </div>

            <div className="hidden sm:block w-20"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div
              key={room?._id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-pink-200 transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={room?.photos?.[0] || "/rooms/room1.jpg"}
                  alt="Room"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-xl font-bold text-sm shadow-md">
                  ₹{room?.rentPrice}/mo
                </div>
                <div className="absolute top-3 left-3">
                  {room?.isAvailable ? (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-xl font-medium text-xs flex items-center space-x-1 shadow-md">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Available</span>
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-xl font-medium text-xs flex items-center space-x-1 shadow-md">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Not Available</span>
                    </div>
                  )}
                </div>
                {/* Heart badge overlay */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                    <FaHeart className="h-5 w-5 text-pink-500" />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 space-y-4">
                {/* Room Type and Owner */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                    {room?.roomType} Room
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaHome className="h-4 w-4 text-primary-500" />
                    <span className="text-sm font-medium">{room?.owner?.houseName}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-2 text-gray-600">
                  <FaMapMarkerAlt className="h-4 w-4 text-pink-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">
                    {room?.address?.street}, {room?.address?.city}, {room?.address?.state}
                  </span>
                </div>

                {/* Room Features */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaBed className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">{room?.numberOfRooms} Rooms</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaBath className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm font-medium">{room?.numberOfBathrooms} Bath</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                  <FaMoneyBillWave className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-bold text-lg">₹{room?.rentPrice}</span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleViewRoom(room._id)}
                  className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md"
                >
                  <FaEye className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouriteRoom;
