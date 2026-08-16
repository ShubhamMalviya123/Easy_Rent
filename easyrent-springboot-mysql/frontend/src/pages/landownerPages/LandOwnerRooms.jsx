import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoRoomsFound from "../NoRoomsFound";
import Swal from "sweetalert2";
import { FaBell, FaEdit, FaSave, FaTrash, FaHome, FaMapMarkerAlt, FaMoneyBillWave, FaBed, FaBath, FaCheckCircle, FaTimesCircle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/UI/Loading";

const LandOwnerRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/myRoom`, {
          withCredentials: true,
        });
        setRooms(response.data.message);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        console.error("Error response:", error.response);
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);

        if (error.response?.status === 404) {
          toast.error("Rooms not found or access denied!");
        } else if (error.response?.status === 401) {
          toast.error("Authentication failed. Please login again.");
        } else {
          toast.error("Something went wrong! Please try again.");
        }
      }
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const handleEditClick = (roomId) => {
    setEditingRoom(roomId);
  };

  const handleSaveClick = async (roomId) => {
    const updatedRoom = rooms.find((room) => room._id === roomId);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/relationship/isRelationship`,
        { roomId },
        {
          withCredentials: true,
        }
      );
      let isRoomInRelation = res.data.renters;

      if (updatedRoom.isAvailable && isRoomInRelation) {
        toast.error("You have renters in your existing room!");
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/rooms/${roomId}`,
        updatedRoom,
        {
          withCredentials: true,
        }
      );

      toast.success("Room updated successfully!");
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Failed to update the room!");
    }

    setEditingRoom(null);
  };

  const handleDeleteClick = async (roomId) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/relationship/relationByRoomId`,
      { roomId },
      { withCredentials: true }
    );
    if (response.data.message) {
      toast.error("There is someone in the room, so you can't delete it!");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
            withCredentials: true,
          });
          toast.success("Room Deleted Successfully!");
          setRooms(rooms.filter((room) => room._id !== roomId));
        } catch (err) {
          toast.error("Something went wrong!");
          console.log(err);
        }
      } else {
        toast.info("Deletion cancelled");
      }
    });
  };

  const handleIncomingRequest = (roomId) => {
    navigate("/incoming-request", { state: { roomId } });
  };

  const handleAddressChange = (e, field) => {
    const { value } = e.target;
    setRooms(
      rooms.map((room) => {
        if (room._id === editingRoom) {
          return {
            ...room,
            address: {
              ...room.address,
              [field]: value,
            },
          };
        }
        return room;
      })
    );
  };

  const handleAvailabilityChange = (e, roomId) => {
    const { checked } = e.target;
    setRooms(
      rooms.map((room) => {
        if (room._id === roomId) {
          return { ...room, isAvailable: checked };
        }
        return room;
      })
    );
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setRooms(
      rooms.map((room) => {
        if (room._id === editingRoom) {
          return {
            ...room,
            [field]: value,
          };
        }
        return room;
      })
    );
  };

  if (loading) {
    return <Loading />;
  }
  if (rooms.length === 0) {
    return <NoRoomsFound />;
  }

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
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 group font-medium shadow-sm"
              >
                <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back</span>
              </button>
            </div>

            <div className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2">
                My Properties
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your rental properties ({rooms.length} {rooms.length === 1 ? 'property' : 'properties'})
              </p>
            </div>

            <div className="hidden sm:block w-20"></div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Room Header */}
              <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                      <FaHome className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Room {room.roomNumber ? room.roomNumber : "N/A"}
                      </h3>
                      <p className="text-blue-100 capitalize text-sm">{room.roomType}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${room.isAvailable
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                    }`}>
                    {room.isAvailable ? 'Available' : 'Occupied'}
                  </div>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-5 space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    {editingRoom === room._id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={room.address.street}
                          onChange={(e) => handleAddressChange(e, "street")}
                          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="Street"
                        />
                        <input
                          type="text"
                          value={room.address.city}
                          onChange={(e) => handleAddressChange(e, "city")}
                          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="City"
                        />
                        <input
                          type="text"
                          value={room.address.state}
                          onChange={(e) => handleAddressChange(e, "state")}
                          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="State"
                        />
                        <input
                          type="text"
                          value={room.address.zipCode}
                          onChange={(e) => handleAddressChange(e, "zipCode")}
                          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="Zip Code"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm">
                        {room.address.street}, {room.address.city}, {room.address.state}, {room.address.zipCode}
                      </p>
                    )}
                  </div>
                </div>

                {/* Room Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Rent Price */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <FaMoneyBillWave className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-gray-500 font-medium">Rent</span>
                    </div>
                    {editingRoom === room._id ? (
                      <input
                        type="number"
                        value={room.rentPrice}
                        onChange={(e) => handleChange(e, "rentPrice")}
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Rent Price"
                      />
                    ) : (
                      <p className="text-gray-900 font-bold">₹{room.rentPrice}</p>
                    )}
                  </div>

                  {/* Room Type */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <FaHome className="h-4 w-4 text-purple-500" />
                      <span className="text-xs text-gray-500 font-medium">Type</span>
                    </div>
                    {editingRoom === room._id ? (
                      <select
                        value={room.roomType}
                        onChange={(e) => handleChange(e, "roomType")}
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="single">Single</option>
                        <option value="shared">Shared</option>
                        <option value="studio">Studio</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-bold capitalize text-sm">{room.roomType}</p>
                    )}
                  </div>

                  {/* Number of Rooms */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <FaBed className="h-4 w-4 text-blue-500" />
                      <span className="text-xs text-gray-500 font-medium">Bedrooms</span>
                    </div>
                    {editingRoom === room._id ? (
                      <input
                        type="number"
                        value={room.numberOfRooms}
                        onChange={(e) => handleChange(e, "numberOfRooms")}
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Rooms"
                      />
                    ) : (
                      <p className="text-gray-900 font-bold">{room.numberOfRooms}</p>
                    )}
                  </div>

                  {/* Number of Bathrooms */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <FaBath className="h-4 w-4 text-cyan-500" />
                      <span className="text-xs text-gray-500 font-medium">Bathrooms</span>
                    </div>
                    {editingRoom === room._id ? (
                      <input
                        type="number"
                        value={room.numberOfBathrooms}
                        onChange={(e) => handleChange(e, "numberOfBathrooms")}
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Bathrooms"
                      />
                    ) : (
                      <p className="text-gray-900 font-bold">{room.numberOfBathrooms}</p>
                    )}
                  </div>
                </div>

                {/* Availability Toggle */}
                {editingRoom === room._id && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-700 font-medium">Available for Rent:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={room.isAvailable}
                        onChange={(e) => handleAvailabilityChange(e, room._id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-50 p-4 space-y-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {editingRoom === room._id ? (
                    <button
                      onClick={() => handleSaveClick(room._id)}
                      className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-xl hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2 group font-medium shadow-md"
                    >
                      <FaSave className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Save</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(room._id)}
                      className="flex-1 bg-primary-600 text-white py-2.5 px-4 rounded-xl hover:bg-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 group font-medium shadow-md"
                    >
                      <FaEdit className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Edit</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteClick(room._id)}
                    className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-xl hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-2 group font-medium shadow-md"
                  >
                    <FaTrash className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Delete</span>
                  </button>
                </div>

                {room.isAvailable && (
                  <button
                    onClick={() => handleIncomingRequest(room._id)}
                    className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-xl hover:bg-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 group font-medium shadow-md"
                  >
                    <FaBell className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>View Requests ({room.requestCount || 0})</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandOwnerRooms;
