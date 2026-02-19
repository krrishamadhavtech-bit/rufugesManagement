import { API } from "./auth";
import { EVENT_ENDPOINTS } from "./ApiEndpoints";

export const fetchEvents = async (page = 1, limit = 10) => {
    try {
        const response = await API.get(`${EVENT_ENDPOINTS.LIST}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

export const addEvent = async (eventData) => {
    try {
        const payload = {
            title: {
                en: eventData.title_en,
                hi: eventData.title_hi,
                gu: eventData.title_gu
            },
            description: {
                en: eventData.description_en,
                hi: eventData.description_hi,
                gu: eventData.description_gu
            },
            date: eventData.date,
            startTime: eventData.startTime,
            endTime: eventData.endTime,
            locationName: eventData.locationName,
            address: eventData.address,
            city: eventData.city,
            postalCode: eventData.postalCode,
            organizerName: eventData.organizerName,
            organizerEmail: eventData.organizerEmail,
            organizerPhone: eventData.organizerPhone,
            isActive: eventData.isActive !== undefined ? eventData.isActive : true
        };

        const response = await API.post(EVENT_ENDPOINTS.ADD, payload);
        return response.data;
    } catch (error) {
        console.error("Error adding event:", error.response?.data || error.message);
        throw error;
    }
};

export const updateEvent = async (eventId, eventData) => {
    try {
        const payload = {
            title: {
                en: eventData.title_en,
                hi: eventData.title_hi,
                gu: eventData.title_gu
            },
            description: {
                en: eventData.description_en,
                hi: eventData.description_hi,
                gu: eventData.description_gu
            },
            date: eventData.date,
            startTime: eventData.startTime,
            endTime: eventData.endTime,
            locationName: eventData.locationName,
            address: eventData.address,
            city: eventData.city,
            postalCode: eventData.postalCode,
            organizerName: eventData.organizerName,
            organizerEmail: eventData.organizerEmail,
            organizerPhone: eventData.organizerPhone,
            isActive: eventData.isActive
        };

        const response = await API.put(EVENT_ENDPOINTS.UPDATE(eventId), payload);
        return response.data;
    } catch (error) {
        console.error("Error updating event:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteEvent = async (eventId) => {
    try {
        const response = await API.delete(EVENT_ENDPOINTS.DELETE(eventId));
        return response.data;
    } catch (error) {
        console.error("Error deleting event:", error.response?.data || error.message);
        throw error;
    }
};
