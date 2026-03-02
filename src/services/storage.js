/**
 * Utility to handle local storage operations for offline support
 * and recently viewed tracking.
 */

const STORAGE_KEYS = {
    RECENTLY_VIEWED: 'raha_recently_viewed',
    CATEGORIES_CACHE: 'raha_categories_cache',
    EVENTS_CACHE: 'raha_events_cache',
    NEWS_CACHE: 'raha_news_cache',
    LAST_EVENT_VIEWED: 'raha_last_event_viewed',
    LAST_NEWS_VIEWED: 'raha_last_news_viewed',
};

/**
 * Saves an item to the "Recently Viewed" list in localStorage.
 */
export const saveToRecentlyViewed = (item, type) => {
    try {
        const existing = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
        let list = existing ? JSON.parse(existing) : [];

        const itemToSave = {
            _id: item._id,
            title: item.title,
            headline: item.headline,
            image: item.image,
            type,
            viewedAt: new Date().toISOString()
        };

        // Remove duplicates and add to the top
        list = list.filter(i => i._id !== item._id);
        list.unshift(itemToSave);
        list = list.slice(0, 10);

        localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(list));
    } catch (error) {
        console.error("Error saving to recently viewed:", error);
    }
};

/**
 * Retrieves the recently viewed items.
 */
export const getRecentlyViewed = () => {
    try {
        const existing = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
        return existing ? JSON.parse(existing) : [];
    } catch (error) {
        return [];
    }
};

/**
 * Caches general API response data.
 */
export const cacheData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error caching data for ${key}:`, error);
    }
};

/**
 * Retrieves cached API response data.
 */
export const getCachedData = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        return null;
    }
};

export { STORAGE_KEYS };
