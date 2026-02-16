import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, forgotPassword, completeOnboarding } from "../../services/auth";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("userData")) || null,
        token: localStorage.getItem("userToken") || null,
        refreshToken: localStorage.getItem("refreshToken") || null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userData");
            state.user = null;
            state.token = null;
            state.refreshToken = null;
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
                const { user, accessToken, refreshToken } = action.payload.data || {};
                state.user = user;
                state.token = accessToken;
                state.refreshToken = refreshToken;
                if (user) localStorage.setItem("userData", JSON.stringify(user));
                if (accessToken) localStorage.setItem("userToken", accessToken);
                if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Forgot Password
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Complete Onboarding
            .addCase(completeOnboarding.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(completeOnboarding.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                if (state.user) {
                    state.user.onboardingCompleted = true;
                    localStorage.setItem("userData", JSON.stringify(state.user));
                }
            })
            .addCase(completeOnboarding.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
