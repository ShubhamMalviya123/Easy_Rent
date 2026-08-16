import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCreditCard, FaLock, FaMoneyBillWave } from 'react-icons/fa';
import { SiStripe } from 'react-icons/si';

const PayRent = ({ relationId, rentAmount, renterId, ownerId, roomId }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Create checkout session
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/payment/create-checkout-session`,
                {
                    relationId,
                    amount: rentAmount,
                    renterId,
                    ownerId,
                    roomId,
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                // Redirect to Stripe checkout
                window.location.href = response.data.url;
            } else {
                toast.error('Failed to initiate payment');
            }
        } catch (error) {
            console.error('Payment error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to process payment';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Pay Rent Online</h3>
                    <p className="text-gray-600 text-sm">Secure payment powered by Stripe</p>
                </div>
                <SiStripe className="text-5xl text-purple-600" />
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amount Due</span>
                    <span className="text-3xl font-bold text-purple-600">₹{rentAmount.toLocaleString()}</span>
                </div>
            </div>

            <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-3 ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
                    }`}
            >
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <FaCreditCard className="h-5 w-5" />
                        <span>Pay with Stripe</span>
                        <FaLock className="h-4 w-4" />
                    </>
                )}
            </button>

            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <FaLock className="h-3 w-3" />
                <span>Secure payment processing</span>
            </div>
        </div>
    );
};

export default PayRent;
