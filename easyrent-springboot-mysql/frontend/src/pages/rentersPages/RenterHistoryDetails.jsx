import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaHistory, FaCalendarAlt, FaMoneyBillWave, FaCreditCard, FaComment, FaReceipt, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/UI/Loading";

const RenterHistoryDetails = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getHistory = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL}/relationship/historyOfRenter`,
          { withCredentials: true }
        );
        setHistory(response.data.histories);
      } catch (error) {
        console.error("Failed to fetch renter history:", error);
      } finally {
        setLoading(false);
      }
    };
    getHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
      <div className="bg-white py-16 relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 group font-medium shadow-sm"
            >
              <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back</span>
            </button>

            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2">
                Payment History
              </h1>
              <p className="text-gray-600 text-lg">
                Your rental payment records ({history.length} {history.length === 1 ? 'entry' : 'entries'})
              </p>
            </div>

            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {history.length > 0 ? (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-3">
                  <FaReceipt className="h-8 w-8 text-white/80" />
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    Count
                  </div>
                </div>
                <div className="text-4xl font-bold mb-1">{history.length}</div>
                <div className="text-white/90 text-sm font-medium">Total Payments</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-3">
                  <FaMoneyBillWave className="h-8 w-8 text-white/80" />
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    Total
                  </div>
                </div>
                <div className="text-4xl font-bold mb-1">
                  ₹{history.reduce((sum, item) => sum + item.rentPaid, 0).toLocaleString()}
                </div>
                <div className="text-white/90 text-sm font-medium">Total Amount Paid</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-3">
                  <FaChartBar className="h-8 w-8 text-white/80" />
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    Average
                  </div>
                </div>
                <div className="text-4xl font-bold mb-1">
                  ₹{Math.round(history.reduce((sum, item) => sum + item.rentPaid, 0) / history.length).toLocaleString()}
                </div>
                <div className="text-white/90 text-sm font-medium">Average Payment</div>
              </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex items-center space-x-3">
                  <FaHistory className="h-6 w-6 text-white" />
                  <h2 className="text-2xl font-bold text-white">Payment Records</h2>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="h-4 w-4 text-primary-500" />
                          <span>Date</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaMoneyBillWave className="h-4 w-4 text-green-500" />
                          <span>Amount Paid</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaCreditCard className="h-4 w-4 text-purple-500" />
                          <span>Payment Method</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaComment className="h-4 w-4 text-orange-500" />
                          <span>Remarks</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {history.map((item, index) => (
                      <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <div>
                              <div className="text-gray-900 font-semibold">{formatDate(item.date)}</div>
                              <div className="text-gray-500 text-sm">
                                {new Date(item.date).toLocaleDateString('en-GB', { weekday: 'long' })}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-green-600 font-bold text-lg">₹{item.rentPaid.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            {item.paymentMethod}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">
                            {item.remarks || (
                              <span className="text-gray-400 italic">No remarks</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-6">
              <div className="flex items-center space-x-3">
                <FaHistory className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-bold text-white">No Payment History</h2>
              </div>
            </div>

            <div className="p-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaReceipt className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Payment Records Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                You haven't made any payments yet. Payment history will appear here once you start making rent payments.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenterHistoryDetails;
