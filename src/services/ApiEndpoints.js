export const API_URL = "http://192.168.1.17:8000";

export const AUTH_ENDPOINTS = {
    REGISTER: `${API_URL}/api/v1/auth/register`,
    LOGIN: `${API_URL}/api/v1/auth/login`,
    FORGOT_PASSWORD: `${API_URL}/api/v1/auth/forgot-password`,
    COMPLETE_ONBOARDING: `${API_URL}/api/v1/auth/complete-onboarding`,
    UPDATE_LANGUAGE: `${API_URL}/api/v1/auth/update-language`,
}

export const CATEGORY_ENDPOINTS = {
    LIST: `${API_URL}/api/v1/category/list-category`,
    ADD: `${API_URL}/api/v1/category/add-category`,
    UPDATE: (id) => `${API_URL}/api/v1/category/update-category/${id}`,
    DELETE: (id) => `${API_URL}/api/v1/category/delete-category/${id}`,
}

export const SUB_CATEGORY_ENDPOINTS = {
    LIST_BY_CATEGORY: (id) => `${API_URL}/api/v1/sub-category/get-all-sub-categories/${id}`,
    ADD: `${API_URL}/api/v1/sub-category/add-sub-category`,
    UPDATE: (id) => `${API_URL}/api/v1/sub-category/update-sub-category/${id}`,
    DELETE: (id) => `${API_URL}/api/v1/sub-category/delete-sub-category/${id}`,
}

export const NEWS_ENDPOINTS = {
    LIST: `${API_URL}/api/v1/news/get-all-news`,
    ADD: `${API_URL}/api/v1/news/add-news`,
    UPDATE: (id) => `${API_URL}/api/v1/news/update-news/${id}`,
    DELETE: (id) => `${API_URL}/api/v1/news/delete-news/${id}`,
}

export const EVENT_ENDPOINTS = {
    LIST: `${API_URL}/api/v1/event/get-events`,
    ADD: `${API_URL}/api/v1/event/add-event`,
    UPDATE: (id) => `${API_URL}/api/v1/event/update-event/${id}`,
    DELETE: (id) => `${API_URL}/api/v1/event/delete-event/${id}`,
}