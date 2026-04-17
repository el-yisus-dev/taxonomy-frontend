// src/services/dashboard.services.js
import axios from "axios";

// Usar la misma configuración que tu auth.services.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const getDashboardStats = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${API_URL}/dashboard/stats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getExplorations = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${API_URL}/dashboard/explorations`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getRecentRecords = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${API_URL}/dashboard/recent-records`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllDashboardData = async () => {
    try {
        const [stats, explorations, recentRecords] = await Promise.all([
            getDashboardStats(),
            getExplorations(),
            getRecentRecords()
        ]);
        
        return { stats, explorations, recentRecords };
    } catch (error) {
        throw error;
    }
};