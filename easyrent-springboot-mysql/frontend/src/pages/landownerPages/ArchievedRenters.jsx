import React, { useEffect, useState } from "react";
import { FaHistory, FaMoneyBillWave, FaTrashAlt, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaHome, FaBed, FaArrowLeft, FaArchive } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import NoRenters from "./NoRenters";
import Loading from "../../components/UI/Loading";
import { useNavigate } from "react-router-dom";

const ArchievedRenters = () => {
  const [renters, setRenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/relationship/getRenters`, {
          withCredentials: true,
        });
        let archivedRenters = response.data.renters.filter(
          (item) => item.renterStatus === "archive"
        );
        setRenters(archivedRenters);
      } catch (err) {
        console.error("Error fetching renters:", err);
      }
      setLoading(false);
    };

    fetchData();
    setIsVisible(true);
  }, []);

  const handleCheckHistory = (relationId) => {
    navigate(`/check-history/${relationId}`);
  };

  const handleRemoveRenter = async (relationId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently remove the renter!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/relationship/deleteRenter/${relationId}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setRenters((prevRenters) =>
            prevRenters.filter((renter) => renter.relationId !== relationId)
          );
        }

        toast.success("Renter removed successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to remove renter. Please try again.");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (renters.length === 0) {
    return <NoRenters />;
  }

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-white py-20 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <button
                onClick={() => navigate("/dashboard")}
                className="mb-8 flex items-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 group font-medium shadow-sm w-fit"
              >
                <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Dashboard</span>
              </button>

              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-gray-900">
                  Archived
                </span>
                <span className="block text-orange-600 mt-2">Tenant Records</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-gray-600 sm:text-xl md:mt-8 md:max-w-3xl leading-relaxed">
                View and manage your archived tenant records. Access complete rental history and payment details.
              </p>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <FaArchive className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Archived</p>
                    <p className="text-3xl font-bold text-gray-900">{renters.length}</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-full rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Renters Grid */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {renters.map((renter) => (
            <ArchivedRenterCard
              key={renter.relationId}
              renter={renter}
              onCheckHistory={() => handleCheckHistory(renter.relationId)}
              onRemoveRenter={() => handleRemoveRenter(renter.relationId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Separate component for a single archived renter card
const ArchivedRenterCard = ({ renter, onCheckHistory, onRemoveRenter }) => {
  const { renterDetails, roomDetails } = renter;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-orange-200 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full -ml-10 -mb-10 blur-xl"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm shadow-inner border border-white/30">
              <FaArchive className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{renterDetails.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-block w-2 h-2 bg-gray-300 rounded-full"></span>
                <p className="text-orange-100 text-sm font-medium">Archived Tenant</p>
              </div>
            </div>
          </div>
          <div className="text-right bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold text-white">
              {roomDetails.roomNumber}
            </div>
            <div className="text-orange-100 capitalize text-xs font-medium tracking-wider uppercase">{roomDetails.roomType}</div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <FaEnvelope className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Address</p>
              <p className="text-gray-900 font-semibold text-sm truncate">{renterDetails.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <FaPhone className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Phone Number</p>
              <p className="text-gray-900 font-semibold">{renterDetails.phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
              <FaMapMarkerAlt className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Permanent Address</p>
              <p className="text-gray-900 font-semibold text-sm leading-relaxed">
                {renterDetails.homeAddress.street}, {renterDetails.homeAddress.city}, {renterDetails.homeAddress.state} - {renterDetails.homeAddress.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4 border-b border-gray-200 pb-3">
            <FaHome className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">Room Details</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <FaBed className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Type</span>
              </div>
              <p className="text-gray-900 font-bold capitalize text-lg">{roomDetails.roomType}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <FaMoneyBillWave className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Rent</span>
              </div>
              <p className="text-orange-600 font-bold text-lg">₹{roomDetails.rentPrice}<span className="text-xs text-gray-500 font-normal">/mo</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gray-50 p-5 border-t border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onCheckHistory}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold shadow-sm group"
          >
            <FaHistory className="h-4 w-4 text-gray-500 group-hover:text-primary-600 transition-colors" />
            <span>View History</span>
          </button>

          <button
            onClick={onRemoveRenter}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-100 transition-all duration-300 font-semibold"
          >
            <FaTrashAlt className="h-4 w-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchievedRenters;
