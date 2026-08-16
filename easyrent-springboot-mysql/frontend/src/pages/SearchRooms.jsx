import React, { useState } from "react";
import { FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const SearchRooms = ({
  searchDistrict,
  setSearchDistrict,
  searchState,
  setSearchState,
  districts,
  states,
  onSearchRooms,
  onClearRooms,
}) => {
  const [emptySearchMsg, setEmptySearchMsg] = useState("");

  const handleSearchClick = () => {
    if (!searchDistrict && !searchState) {
      setEmptySearchMsg("Please select a district or state to search.");
      return;
    }
    setEmptySearchMsg("");
    onSearchRooms(searchDistrict, searchState);
  };

  const handleClear = () => {
    setEmptySearchMsg("");
    onClearRooms();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <FaFilter className="h-6 w-6 text-white" />
          <h2 className="text-2xl font-bold text-white">Search Rooms</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">District</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
              <select
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-300 hover:bg-white"
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={`${district}-${index}`} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
              <select
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-300 hover:bg-white"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSearchClick}
            className="flex-1 bg-gray-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md"
          >
            <FiSearch className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Search Rooms</span>
          </button>

          <button
            onClick={handleClear}
            className="bg-white text-gray-700 border-2 border-gray-300 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <span>Clear Search</span>
          </button>
        </div>

        {emptySearchMsg && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 mt-4 p-3 rounded-xl text-center font-medium">
            {emptySearchMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRooms;