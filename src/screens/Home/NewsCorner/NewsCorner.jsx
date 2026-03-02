import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import { fetchNews } from "../../../services/news";

import { cacheData, getCachedData, STORAGE_KEYS } from "../../../services/storage";

const NewsCorner = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const currentLang = user?.language || 'en';

    const [newsArticles, setNewsArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(10);


    const loadNews = async () => {
        setLoading(true);
        try {
            const response = await fetchNews();
            if (response.statusCode === 200) {
                const activeNews = response.data.filter(item => item.active !== false);
                setNewsArticles(activeNews);
                setVisibleCount(10);
                cacheData(STORAGE_KEYS.NEWS_CACHE, activeNews);
            }
        } catch (error) {
            console.error("Failed to fetch news:", error);
            const cached = getCachedData(STORAGE_KEYS.NEWS_CACHE);
            if (cached) {
                setNewsArticles(cached);
                setVisibleCount(10);
            } else if (!window.hasAlertedNewsCornerError) {
                alert("We're currently unable to load the latest news. Please check back later.");
                window.hasAlertedNewsCornerError = true;
                setTimeout(() => window.hasAlertedNewsCornerError = false, 5000);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNews();
    }, []);

    const defaultImage = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80";

    const getLocalized = (obj, field) => {
        if (!obj || !obj[field]) return "";
        return obj[field][currentLang] || obj[field]['en'] || "";
    };

    if (loading) {
        return (
            <div className="news-corner-container news-loading-wrapper">
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin news-spinner-icon"></i>
                    <p className="news-loading-text">Loading latest news...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="news-corner-container">
            {/* Header Section */}
            <div className="news-header">
                <div className="news-header-content">
                    <h1 className="news-title">Resource Hub News</h1>
                    <div className="news-divider"></div>
                </div>
            </div>

            <div className="news-feed">
                {newsArticles.slice(0, visibleCount).map((article, index) => (
                    <div
                        key={article._id}
                        className="horizontal-news-card"
                        onClick={() => navigate('ReadMore', { state: { news: article } })}
                    >
                        <div className="news-card-image-box">
                            <img src={article.image?.url || defaultImage} alt={getLocalized(article, 'headline')} />
                        </div>
                        <div className="news-card-info">
                            <h3 className="news-card-title">
                                <span dangerouslySetInnerHTML={{ __html: getLocalized(article, 'headline') }}></span>
                            </h3>
                        </div>
                    </div>
                ))}

            </div>
            {!loading && newsArticles.length > 0 && (
                <div className="news-load-more-wrapper">
                    <button
                        className="btn-primary"
                        onClick={() => setVisibleCount(prev => prev + 10)}
                    >
                        Load More
                    </button>
                </div>
            )}
            {newsArticles.length === 0 && !loading && (
                <div className="no-results">
                    <i className="fas fa-newspaper no-news-icon"></i>
                    <h3>No News found</h3>
                    <p>Check back later for the latest updates.</p>
                </div>
            )}
        </div>
    );
};

export default NewsCorner;