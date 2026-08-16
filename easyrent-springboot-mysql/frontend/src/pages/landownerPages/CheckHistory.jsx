import React, { useEffect, useState } from "react";
import NoHistory from "./NoHistory";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaHistory, FaMoneyBillWave, FaCalendarAlt, FaCreditCard, FaComment, FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../../components/UI/Loading";

const CheckHistory = () => {
  const [rentHistory, setRentHistory] = useState([]);
  const [editIndex

    , setEditIndex] = useState(null);
  const [editedRent, setEditedRent] = useState({});
  const [loading, setLoading] = useState(false);
  const [isArchieve, setIsArchieve] = useState(false);
  const navigate = useNavigate();

  const { relationId } = useParams();

  useEffect(() => {
    const fetchisArchieve = async () => {
      const isArchieve = await axios.post(`${import.meta.env.VITE_API_URL}/relationship/isArchieve`, { relationId }, { withCredentials: true });
      setIsArchieve(isArchieve.data.message)
    }
    fetchisArchieve();
  }, [])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/history/${relationId}`, {
          withCredentials: true,
        });
        setRentHistory(response.data.history);
      } catch (error) {
        console.error("Error fetching history:", error);
        toast.error("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [relationId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedRent({
      rentPaid: rentHistory[index].rentPaid,
      paymentMethod: rentHistory[index].paymentMethod,
      remarks: rentHistory[index].remarks || "",
      date: rentHistory[index].date,
    });
  };

  const handleDelete = async (historyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this history item? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/history/${historyId}`,
            {
              withCredentials: true,
            }
          );

          let filteredHistory = rentHistory.filter(
            (rent) => rent._id !== historyId
          );
          setRentHistory(filteredHistory);
        } catch (err) {
          console.log(err);
          Swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (historyId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/history/${historyId}`,
        editedRent,
        {
          withCredentials: true,
        }
      );

      setRentHistory((prevHistory) =>
        prevHistory.map((item) =>
          item._id === historyId ? { ...item, ...editedRent } : item
        )
      );

      toast.success("History updated successfully!");
    } catch (err) {
      console.log(err);
    }
    setEditIndex(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (rentHistory.length === 0) {
    return <NoHistory />;
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
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/my-renters")}
              className="flex items-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 group font-medium shadow-sm"
            >
              <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back</span>
            </button>

            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2">
                Rent History
              </h1>
              <p className="text-gray-600 text-lg">
                View and manage payment history
              </p>
            </div>

            <div className="w-20"></div>
          </div>

          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center px-5 py-2 bg-blue-100 rounded-full border border-blue-200">
              <span className="text-blue-700 text-sm font-bold">
                {rentHistory.length} Payment{rentHistory.length !== 1 ? 's' : ''} Recorded
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                <FaHistory className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Payment Records</h2>
                <p className="text-blue-100">Complete transaction history</p>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <FaMoneyBillWave className="h-4 w-4 text-green-500" />
                      <span>Amount</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="h-4 w-4 text-purple-500" />
                      <span>Date</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <FaCreditCard className="h-4 w-4 text-primary-500" />
                      <span>Method</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <FaComment className="h-4 w-4 text-cyan-500" />
                      <span>Remarks</span>
                    </div>
                  </th>
                  {!isArchieve && (
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rentHistory.map((rent, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {editIndex === index ? (
                      <>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                            <input
                              type="number"
                              name="rentPaid"
                              value={editedRent.rentPaid}
                              onChange={handleChange}
                              className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                            <input
                              type="date"
                              name="date"
                              value={editedRent.date}
                              onChange={handleChange}
                              className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-500" />
                            <select
                              name="paymentMethod"
                              value={editedRent.paymentMethod}
                              onChange={handleChange}
                              className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="Online">Online</option>
                              <option value="Cash">Cash</option>
                              <option value="Others">Others</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <FaComment className="absolute left-3 top-3 h-4 w-4 text-cyan-500" />
                            <input
                              type="text"
                              name="remarks"
                              value={editedRent.remarks}
                              onChange={handleChange}
                              className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Add remarks"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleSave(rent._id)}
                              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center space-x-1 group"
                            >
                              <FaSave className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                              <span className="text-sm">Save</span>
                            </button>
                            <button
                              onClick={() => setEditIndex(null)}
                              className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center space-x-1 group"
                            >
                              <FaTimes className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                              <span className="text-sm">Cancel</span>
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <FaMoneyBillWave className="h-4 w-4 text-green-500" />
                            <span className="font-bold text-green-600">₹{rent.rentPaid}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="h-4 w-4 text-purple-500" />
                            <span className="text-gray-700">{formatDate(rent.date)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <FaCreditCard className="h-4 w-4 text-primary-500" />
                            <span className="capitalize text-gray-700">{rent.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <FaComment className="h-4 w-4 text-cyan-500" />
                            <span className="text-gray-600">{rent.remarks || "N/A"}</span>
                          </div>
                        </td>
                        {!isArchieve && (
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => handleEdit(index)}
                                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-all duration-300 group"
                              >
                                <FaEdit className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                              </button>
                              <button
                                onClick={() => handleDelete(rent._id)}
                                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all duration-300 group"
                              >
                                <FaTrash className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                              </button>
                            </div>
                          </td>
                        )}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back Button */}
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <Link to="/my-renters">
              <button className="w-full bg-gray-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md">
                <FaArrowLeft className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Back to Renters</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckHistory;
