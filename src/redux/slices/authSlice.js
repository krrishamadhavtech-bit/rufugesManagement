import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../../services/auth";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("userToken") || null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken");
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        resetAuthState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user; // Assuming backend returns user object
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
