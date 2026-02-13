import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_ENDPOINTS } from "./ApiEndpoints";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${AUTH_ENDPOINTS.REGISTER}`, userData);

            // Store token in localStorage
            if (response.data.token) {
                localStorage.setItem("userToken", response.data.token);
            }

            return response.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${AUTH_ENDPOINTS.LOGIN}`, userData);
            console.log(response);
            if (response.data.token) {
                localStorage.setItem("userToken", response.data.token);
            }

            return response.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);