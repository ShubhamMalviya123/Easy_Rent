import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaHome, FaMoneyBillWave, FaBed, FaBath, FaArrowRight, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchNoFound from "./SearchNoFound";
import Loading from "../components/UI/Loading";
import districtData from "../../public/utils/districtData.json";
import SearchRooms from "./SearchRooms";

const FindRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchState, setSearchState] = useState("");
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRooms, setTotalRooms] = useState(0);

  // Indian states for dropdown
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  // Fetch rooms
  const fetchRooms = useCallback(async (pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/availableRoom`, {
        params: { limit, offset: (pageNum - 1) * limit },
        withCredentials: true,
      });
      const newRooms = response.data.message;
      setRooms(newRooms);
      setFilteredRooms(newRooms);
      const total = response.data.totalCount || (response.data.total || 0);
      if (total) {
        setTotalRooms(total);
        setTotalPages(Math.ceil(total / limit));
      } else {
        setTotalRooms((pageNum - 1) * limit + newRooms.length);
        setTotalPages(newRooms.length < limit ? pageNum : pageNum + 1);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
    setLoading(false);
  }, [limit]);

  // Initial fetch and on page change
  useEffect(() => {
    fetchRooms(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/availableRoom`, {
          withCredentials: true,
        });
        setRooms(response.data.message);
        setFilteredRooms(response.data.message);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
      setLoading(false);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    // On mount, set all districts from all states
    const allDistricts = districtData.states.flatMap((s) => s.districts);
    setDistricts(allDistricts);
  }, []);

  useEffect(() => {
    if (!searchState) {
      const allDistricts = districtData.states.flatMap((s) => s.districts);
      setDistricts(allDistricts);
    } else {
      const found = districtData.states.find((s) => s.state === searchState);
      setDistricts(found ? found.districts : []);
      if (searchDistrict && !(found && found.districts.includes(searchDistrict))) {
        setSearchDistrict("");
      }
    }
  }, [searchState]);

  useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  const handleRoomSearch = async (district, state) => {
    setLoading(true);
    try {
      const params = {};
      if (district) params.district = district;
      if (state) params.state = state;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/search/district-state`, {
        params,
        withCredentials: true,
      });
      setRooms(response.data.rooms || []);
      setFilteredRooms(response.data.rooms || []);
      setTotalRooms((response.data.rooms || []).length);
      setTotalPages(1);
    } catch (err) {
      setRooms([]);
      setFilteredRooms([]);
      setTotalRooms(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

  const handleClearRooms = async () => {
    setSearchDistrict("");
    setSearchState("");
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/availableRoom`, {
        withCredentials: true,
      });
      setRooms(response.data.message);
      setFilteredRooms(response.data.message);
      setTotalRooms((response.data.message || []).length);
      setTotalPages(1);
    } catch (err) {
      setRooms([]);
      setFilteredRooms([]);
      setTotalRooms(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

  const handleClearSearch = () => {
    setSearchDistrict("");
    setSearchState("");
    setFilteredRooms(rooms);
  };

  const roomTypeToImage = {
    'single': '/rooms/room1.jpg',
    'studio': '/rooms/room2.jpg',
    'apartment': '/rooms/room3.jpg',
    'shared': '/rooms/room4.jpeg',
  };

  // Pagination handlers
  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  const handleViewRoom = (roomId) => {
    navigate(`/viewRoomsDetails/${roomId}`);
  };

  if (loading) {
    return <Loading />;
  }

  const user = JSON.parse(localStorage.getItem("user"));

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
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
              Find Your Perfect Room
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 sm:text-xl mx-auto">
              Browse through our collection of available rooms and find your ideal living space
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchRooms
          searchDistrict={searchDistrict}
          setSearchDistrict={setSearchDistrict}
          searchState={searchState}
          setSearchState={setSearchState}
          districts={districts}
          states={indianStates}
          onSearchRooms={handleRoomSearch}
          onClearRooms={handleClearRooms}
        />

        {/* Results Section */}
        {!loading && rooms.length === 0 ? (
          <div className="mt-8">
            <SearchNoFound />
          </div>
        ) : rooms.length > 0 ? (
          <div className="mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
                Available Rooms ({totalRooms})
              </h3>
              <div className="text-gray-600 text-sm">
                Showing {rooms.length} of {totalRooms}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRooms.map((room) => (
                <div
                  key={room._id}
                  className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:border-primary-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={roomTypeToImage[room.roomType.toLowerCase()] || '/rooms/room1.jpeg'}
                      alt="Room"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 rounded-bl-xl font-bold text-sm shadow-md">
                      ₹{room.rentPrice}/mo
                    </div>
                    <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 rounded-br-xl font-medium text-sm shadow-md">
                      Available
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                        {room.roomType} Room
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 text-sm">
                        <FaMapMarkerAlt className="h-4 w-4 text-primary-500 flex-shrink-0" />
                        <span className="truncate">{room.address.city}, {room.address.state}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <FaBed className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm font-medium">{room.numberOfRooms} Rooms</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaBath className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm font-medium">{room.numberOfBathrooms} Bath</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                      <FaMoneyBillWave className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-green-600 font-bold text-lg">₹{room.rentPrice}/month</span>
                    </div>

                    {user ? (
                      <button
                        onClick={() => handleViewRoom(room._id)}
                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 group font-bold shadow-md"
                      >
                        <span>View Details</span>
                        <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-white text-gray-700 border-2 border-gray-300 py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-2 group font-bold"
                      >
                        <span>Login to View Room</span>
                        <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-5 py-2 rounded-xl font-bold transition-all duration-300 ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 shadow-sm'}`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${currentPage === num ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2 rounded-xl font-bold transition-all duration-300 ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 shadow-sm'}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FindRooms;
