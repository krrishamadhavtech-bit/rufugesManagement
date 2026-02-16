import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_ENDPOINTS, API_URL } from "./ApiEndpoints";

export const API = axios.create({
    baseURL: `${API_URL}/api/v1`,
});

// Add interceptor to include token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`API Request [${config.method.toUpperCase()}] ${config.url} - Auth Attached`);
    } else {
        console.warn(`API Request [${config.method.toUpperCase()}] ${config.url} - NO TOKEN FOUND`);
    }
    return config;
});

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("email", userData.email);
            formData.append("password", userData.password);
            formData.append("language", userData.language || "en");

            const response = await axios.post(AUTH_ENDPOINTS.REGISTER, formData);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(AUTH_ENDPOINTS.LOGIN, userData);

            if (response.data.data?.accessToken) {
                localStorage.setItem("userToken", response.data.data.accessToken);
            }
            if (response.data.data?.refreshToken) {
                localStorage.setItem("refreshToken", response.data.data.refreshToken);
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("email", email);

            const response = await axios.post(
                AUTH_ENDPOINTS.FORGOT_PASSWORD,
                formData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const completeOnboarding = createAsyncThunk(
    "auth/completeOnboarding",
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.post("/auth/complete-onboarding", {});
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Onboarding completion failed"
            );
        }
    }
);
export const updateLanguage = async (language) => {
    try {
        const formData = new FormData();
        formData.append("language", language);

        const response = await API.post("/auth/update-language", formData);
        return response.data;
    } catch (error) {
        console.error("Error updating language:", error.response?.data || error.message);
        throw error;
    }
};
