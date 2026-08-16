import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        const sessionId = searchParams.get('session_id');

        if (sessionId) {
            verifyPayment(sessionId);
        } else {
            toast.error('Invalid payment session');
            navigate('/rentersMyRoom');
        }
    }, [searchParams]);

    const verifyPayment = async (sessionId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/payment/verify/${sessionId}`,
                { withCredentials: true }
            );

            if (response.data.success && response.data.paid) {
                setPaymentData(response.data);
                toast.success('Payment successful! 🎉');

                // Redirect after 3 seconds
                setTimeout(() => {
                    navigate('/rentersMyRoom');
                }, 3000);
            } else {
                toast.error('Payment verification failed');
                navigate('/rentersMyRoom');
            }
        } catch (error) {
            console.error('Verification error:', error);
            toast.error('Failed to verify payment');
            navigate('/rentersMyRoom');
        } finally {
            setVerifying(false);
        }
    };

    if (verifying) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Verifying Payment...</h2>
                    <p className="text-gray-600 mt-2">Please wait while we confirm your payment</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="h-12 w-12 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Your rent payment has been processed successfully.
                </p>

                {paymentData && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Amount Paid</span>
                            <span className="text-2xl font-bold text-green-600">
                                ₹{paymentData.history.rentPaid.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Payment Date</span>
                            <span className="text-gray-700">
                                {new Date(paymentData.history.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                )}

                <p className="text-sm text-gray-500">
                    Redirecting to your dashboard in 3 seconds...
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
