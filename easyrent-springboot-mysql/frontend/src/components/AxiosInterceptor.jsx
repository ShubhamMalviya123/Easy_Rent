import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { disconnectSocket } from '../services/socket.service';

const AxiosInterceptor = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Token expired or unauthorized
                    localStorage.removeItem('user');
                    localStorage.removeItem('favouriteRooms');
                    disconnectSocket();

                    toast.error('Session expired. Please log in again.');
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    return null;
};

export default AxiosInterceptor;
