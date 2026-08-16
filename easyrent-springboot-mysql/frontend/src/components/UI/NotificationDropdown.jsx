import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaCheck, FaCheckDouble, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { onNotification, offNotification } from '../../services/socket.service';

const NotificationDropdown = ({ onClose, onMarkAsRead }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();

        const handleNewNotification = () => {
            fetchNotifications();
        };

        onNotification(handleNewNotification);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            offNotification(handleNewNotification);
        };
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/notifications`, {
                withCredentials: true,
            });
            if (response.data.success) {
                setNotifications(response.data.notifications);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/notifications/${id}/read`, {}, {
                withCredentials: true,
            });
            setNotifications(prev =>
                prev.map(n => n._id === id ? { ...n, isRead: true } : n)
            );
            await onMarkAsRead();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/notifications/read-all`, {}, {
                withCredentials: true,
            });
            // Update local state immediately for responsiveness
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            // Sync with server to be sure
            await fetchNotifications();
            await onMarkAsRead();
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const handleNotificationClick = async (notification) => {
        if (!notification.isRead) {
            await handleMarkAsRead(notification._id);
        }

        // Navigate based on notification type
        switch (notification.type) {
            case 'request_received':
                navigate('/incoming-request', { state: { roomId: notification.roomId } });
                break;
            case 'request_accepted':
                navigate('/rentersMyRoom');
                break;
            case 'request_rejected':
                navigate('/findRooms');
                break;
            case 'request_withdrawn':
                // Stay on current page or navigate to a general page
                // navigate('/landowner-rooms'); // Optional: redirect if needed
                break;
            case 'rent_paid':
                navigate('/my-renters');
                break;
            default:
                break;
        }

        onClose();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden"
        >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleMarkAllAsRead}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                        title="Mark all as read"
                    >
                        Mark all read
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes />
                    </button>
                </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
                {loading ? (
                    <div className="p-4 text-center text-gray-500">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-blue-50/50' : ''
                                    }`}
                            >
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {formatDate(notification.createdAt)}
                                        </p>
                                    </div>
                                    {!notification.isRead && (
                                        <div className="flex-shrink-0 self-center">
                                            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationDropdown;
