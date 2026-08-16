import React, { useEffect, useState } from "react";
import NoRequest from "./NoRequest";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaUserCheck } from "react-icons/fa";
import Loading from "../../components/UI/Loading";

const IncomingRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const roomId = location.state?.roomId;

  useEffect(() => {
    if (!roomId) return;

    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/request/users/${roomId}`, {
          withCredentials: true,
        });
        setRequests(response.data.users || []);
      } catch (err) {
        setError("Failed to load requests. Please try again.");
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [roomId]);

  const handleAccept = async (renterId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/relationship/accept`,
        { renterId, roomId },
        { withCredentials: true }
      );
      navigate("/landowner-rooms");
    } catch (err) {
      console.error("Error accepting request:", err);
      alert("Failed to accept request. Please try again.");
    }
  };

  const handleReject = async (renterId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/relationship/reject`,
        { renterId, roomId },
        { withCredentials: true }
      );
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== renterId)
      );
    } catch (err) {
      console.error("Error rejecting request:", err);
      alert("Failed to reject request. Please try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg border border-red-200">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return <NoRequest />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
      <div className="bg-white py-16 relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/landowner-rooms")}
              className="flex items-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 group font-medium shadow-sm"
            >
              <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back</span>
            </button>

            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2">
                Incoming Requests
              </h1>
              <p className="text-gray-600 text-lg">
                Review and manage rental requests from potential tenants
              </p>
            </div>

            <div className="w-20"></div>
          </div>

          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center px-5 py-2 bg-green-100 rounded-full border border-green-200">
              <span className="text-green-700 text-sm font-bold">
                {requests.length} Request{requests.length !== 1 ? 's' : ''} Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              onAccept={() => handleAccept(request._id)}
              onReject={() => handleReject(request._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Separate component for a single request card
const RequestCard = ({ request, onAccept, onReject }) => {
  const {
    name,
    email,
    phoneNumber,
    dateOfBirth,
    homeAddress: { street, city, state, zipCode },
  } = request;

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
            <FaUserCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-green-100 text-sm">Rental Applicant</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-4">
        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FaEnvelope className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium">Email</p>
              <p className="text-gray-900 font-semibold text-sm truncate">{email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FaPhone className="h-5 w-5 text-green-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">Phone</p>
              <p className="text-gray-900 font-semibold">{phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FaCalendarAlt className="h-5 w-5 text-purple-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">Date of Birth</p>
              <p className="text-gray-900 font-semibold">
                {new Date(dateOfBirth).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <FaMapMarkerAlt className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium mb-1">Current Address</p>
              <p className="text-gray-900 font-semibold text-sm">
                {street}, {city}, {state} - {zipCode}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gray-50 p-4 border-t border-gray-100">
        <div className="flex gap-3">
          <button
            onClick={onAccept}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2 group font-bold shadow-md"
          >
            <FaCheckCircle className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            <span>Accept</span>
          </button>

          <button
            onClick={onReject}
            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-2 group font-bold shadow-md"
          >
            <FaTimesCircle className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            <span>Reject</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingRequest;
