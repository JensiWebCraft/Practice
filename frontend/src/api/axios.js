import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});


api.interceptors.response.use(
    (response) => {

        const method = response.config.method?.toUpperCase();
        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method) && response.data?.message) {
            toast.success(response.data.message);
        }
        return response;
    },
    (error) => {
        // Don't show toast for 401 Unauthorized (unless it's a login attempt)
        if (error.response?.status === 401 && error.config.url !== '/api/auth/login') {
            return Promise.reject(error);
        }

        // Check if there is a custom error message from the backend
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Something went wrong!";

        toast.error(errorMessage);
        return Promise.reject(error);
    }
);

export default api;