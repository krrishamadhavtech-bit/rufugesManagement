import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

import { saveToRecentlyViewed, cacheData, getCachedData, STORAGE_KEYS } from "../../../../services/storage";

const ReadMore = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    const currentLang = user?.language || 'en';

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location.state?.news) {
            const newsData = location.state.news;
            setArticle(newsData);
            setLoading(false);

            // Save for offline support & history
            saveToRecentlyViewed(newsData, 'news');
            if (newsData._id) {
                cacheData(`${STORAGE_KEYS.LAST_NEWS_VIEWED}_${newsData._id}`, newsData);
            }
        } else {
            // Restore last viewed news as fallback
            const cached = getCachedData(STORAGE_KEYS.LAST_NEWS_VIEWED);
            if (cached) setArticle(cached);
            setLoading(false);
        }
    }, [location.state]);

    const getLocalized = (obj, field) => {
        if (!obj || !obj[field]) return "";
        return obj[field][currentLang] || obj[field]['en'] || "";
    };

    if (loading) {
        return (
            <div className="news-detail-loading">
                <i className="fas fa-spinner fa-spin news-spinner-icon-red"></i>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="news-detail-error">
                <h2>Article not found</h2>
                <button className="back-btn" onClick={() => navigate("/news-corner")}>Back to News</button>
            </div>
        );
    }

    return (
        <div className="news-detail-wrapper">
            {/* Top Bar Info */}
            <div className="news-detail-top-info">
                <div className="info-left">
                    <span className="source-name">THE RAHA TIMES</span>
                    <span className="info-divider">|</span>
                    <span className="article-timestamp">
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Main Title */}
            <h1 className="news-detail-headline" dangerouslySetInnerHTML={{ __html: getLocalized(article, 'headline') }}></h1>

            {/* Image Section */}
            <div className="news-detail-main-image">
                <img src={article.image?.url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"} alt="News" />
            </div>

            {/* Live Updates Style Timeline */}
            <div className="update-content">
                <div className="article-body-text" dangerouslySetInnerHTML={{ __html: getLocalized(article, 'description') }}></div>
            </div>
        </div>
    );
};

export default ReadMore;