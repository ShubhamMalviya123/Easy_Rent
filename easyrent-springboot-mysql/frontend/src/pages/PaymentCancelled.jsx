import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

const PaymentCancelled = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTimesCircle className="h-12 w-12 text-red-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
                <p className="text-gray-600 mb-8">
                    Your payment was cancelled. No charges were made to your account.
                </p>

                <button
                    onClick={() => navigate('/rentersMyRoom')}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                    <FaArrowLeft className="h-5 w-5" />
                    <span>Back to My Room</span>
                </button>
            </div>
        </div>
    );
};

export default PaymentCancelled;
