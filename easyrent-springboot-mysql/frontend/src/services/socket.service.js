import { io } from "socket.io-client";

let socket = null;

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000';

export const connectSocket = (userId) => {
    if (!socket) {
        console.log('Initializing socket with URL:', SOCKET_URL);

        // Check if we are in production (IP or Domain)
        const isProduction = SOCKET_URL.includes('13.201.30.59') || SOCKET_URL.includes('easyrentify.xyz');
        const socketPath = isProduction ? '/backend/socket.io' : '/socket.io';

        console.log('Using socket path:', socketPath);

        socket = io(SOCKET_URL, {
            path: socketPath,
            withCredentials: true,
            transports: ['polling', 'websocket'],
        });

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
            // Register user with their userId
            if (userId) {
                socket.emit('register', userId);
            }
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    }

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const onNotification = (callback) => {
    if (socket) {
        socket.on('notification', callback);
    }
};

export const offNotification = (callback) => {
    if (socket) {
        socket.off('notification', callback);
    }
};

export const getSocket = () => socket;
