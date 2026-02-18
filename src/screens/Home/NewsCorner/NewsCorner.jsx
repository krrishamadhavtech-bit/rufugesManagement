import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import { fetchNews } from "../../../services/news";

const NewsCorner = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const currentLang = user?.language || 'en';

    const [newsArticles, setNewsArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadNews = async () => {
        setLoading(true);
        try {
            const response = await fetchNews();
            if (response.statusCode === 200) {
                setNewsArticles(response.data.filter(item => item.active !== false));
            }
        } catch (error) {
            console.error("Failed to fetch news:", error);
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
            <div className="news-corner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#38a9a3' }}></i>
                    <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading latest news...</p>
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
                {newsArticles.map((article, index) => (
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

            {newsArticles.length === 0 && !loading && (
                <div className="no-results" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <i className="fas fa-newspaper" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem', display: 'block' }}></i>
                    <h3>No articles found</h3>
                    <p>Check back later for the latest updates.</p>
                </div>
            )}
        </div>
    );
};

export default NewsCorner;