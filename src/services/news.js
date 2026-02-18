import { API } from "./auth";
import { NEWS_ENDPOINTS } from "./ApiEndpoints";

export const fetchNews = async () => {
    try {
        const response = await API.get(NEWS_ENDPOINTS.LIST);
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
};

export const addNews = async (newsData) => {
    try {
        // If an image is present, we must use FormData
        if (newsData.imageFile) {
            const formData = new FormData();

            // Nested keys like this are usually parsed by the backend into objects
            // We use this pattern because it matches your category.js service
            formData.append("headline[en]", newsData.headline_en);
            formData.append("headline[hi]", newsData.headline_hi);
            formData.append("headline[gu]", newsData.headline_gu);

            formData.append("description[en]", newsData.description_en);
            formData.append("description[hi]", newsData.description_hi);
            formData.append("description[gu]", newsData.description_gu);

            formData.append("date", newsData.date || new Date().toISOString().split('T')[0]);

            // Attachment - field name 'image' matches your model structure
            formData.append("image", newsData.imageFile);

            // IMPORTANT: We ARE NOT appending 'active' here because it was not in your 
            // successful Postman request. Multer throws 'Unexpected field' if it sees
            // a field it doesn't recognize.

            console.log('Sending News with Image (FormData):');
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            const response = await API.post(NEWS_ENDPOINTS.ADD, formData);
            return response.data;
        } else {
            // No image: Use pure JSON payload exactly matching your Postman test
            const payload = {
                headline: {
                    en: newsData.headline_en,
                    hi: newsData.headline_hi,
                    gu: newsData.headline_gu
                },
                description: {
                    en: newsData.description_en,
                    hi: newsData.description_hi,
                    gu: newsData.description_gu
                },
                date: newsData.date || new Date().toISOString().split('T')[0]
            };

            console.log('Sending News without Image (JSON Payload):', payload);
            const response = await API.post(NEWS_ENDPOINTS.ADD, payload);
            return response.data;
        }
    } catch (error) {
        console.error("Error adding news:", error.response?.data || error.message);
        throw error;
    }
};

export const updateNews = async (newsId, newsData) => {
    try {
        if (newsData.imageFile) {
            const formData = new FormData();
            formData.append("headline[en]", newsData.headline_en);
            formData.append("headline[hi]", newsData.headline_hi);
            formData.append("headline[gu]", newsData.headline_gu);
            formData.append("description[en]", newsData.description_en);
            formData.append("description[hi]", newsData.description_hi);
            formData.append("description[gu]", newsData.description_gu);
            formData.append("date", newsData.date);
            formData.append("image", newsData.imageFile);

            const response = await API.put(NEWS_ENDPOINTS.UPDATE(newsId), formData);
            return response.data;
        } else {
            const payload = {
                headline: {
                    en: newsData.headline_en,
                    hi: newsData.headline_hi,
                    gu: newsData.headline_gu
                },
                description: {
                    en: newsData.description_en,
                    hi: newsData.description_hi,
                    gu: newsData.description_gu
                },
                date: newsData.date
            };
            const response = await API.put(NEWS_ENDPOINTS.UPDATE(newsId), payload);
            return response.data;
        }
    } catch (error) {
        console.error("Error updating news:", error.response?.data || error);
        throw error;
    }
};

export const deleteNews = async (newsId) => {
    try {
        const response = await API.delete(NEWS_ENDPOINTS.DELETE(newsId));
        return response.data;
    } catch (error) {
        console.error("Error deleting news:", error.response?.data || error);
        throw error;
    }
};
