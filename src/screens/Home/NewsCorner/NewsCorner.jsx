import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

// Sample news data with high-quality Unsplash images
const NewsCorner = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", name: "All News", icon: "fa-newspaper" },
        { id: "housing", name: "Housing", icon: "fa-building" },
        { id: "policy", name: "Policy", icon: "fa-scale-balanced" },
        { id: "community", name: "Community", icon: "fa-people-group" },
        { id: "events", name: "Events", icon: "fa-calendar" }
    ];

    const featuredNews = {
        id: 1,
        title: "New Rental Reform Act: What Tenants Need to Know",
        excerpt: "Denmark's new housing law introduces stronger tenant protections, rent control measures, and faster dispute resolution. Effective from July 2026.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
        category: "policy",
        date: "Feb 13, 2026",
        author: "Maria Jensen",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        readTime: "5 min read",
        featured: true
    };

    const newsArticles = [
        {
            id: 2,
            title: "Copenhagen's New Affordable Housing Initiative",
            excerpt: "City announces 1,500 new affordable units across Nørrebro and Østerbro with priority for internationals.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
            category: "housing",
            date: "Feb 12, 2026",
            author: "Lars Petersen",
            authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
            readTime: "4 min read"
        },
        {
            id: 3,
            title: "Understanding Your Deposit Rights",
            excerpt: "New guidelines clarify deposit return timelines and condition report requirements for tenants.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
            category: "policy",
            date: "Feb 10, 2026",
            author: "Sofie Andersen",
            authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
            readTime: "3 min read"
        },
        {
            id: 4,
            title: "International Community Hub Opens in Copenhagen",
            excerpt: "New resource center offers free housing advice, Danish classes, and networking events.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
            category: "community",
            date: "Feb 8, 2026",
            author: "Emma Nielsen",
            authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
            readTime: "6 min read"
        },
        {
            id: 5,
            title: "Tenant Rights Workshop Series Announced",
            excerpt: "Free monthly workshops covering rental contracts, deposit disputes, and housing search strategies.",
            image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=600&q=80",
            category: "events",
            date: "Feb 5, 2026",
            author: "Mikkel Hansen",
            authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
            readTime: "2 min read"
        },
        {
            id: 6,
            title: "Coliving Trends: The Future of Urban Housing",
            excerpt: "How shared living spaces are evolving to meet the needs of young professionals and students.",
            image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80",
            category: "housing",
            date: "Feb 3, 2026",
            author: "Clara Rasmussen",
            authorAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80",
            readTime: "7 min read"
        },
        {
            id: 7,
            title: "Rent Board Reports Record Case Resolution",
            excerpt: "Huslejenævn resolves 95% of tenant-landlord disputes within 30 days, new efficiency report shows.",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
            category: "policy",
            date: "Feb 1, 2026",
            author: "Thomas Lund",
            authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
            readTime: "4 min read"
        },
        {
            id: 8,
            title: "Student Housing Portal Launches New Features",
            excerpt: "Real-time availability alerts and virtual viewings now available on BoligPortal for students.",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
            category: "housing",
            date: "Jan 28, 2026",
            author: "Signe Jørgensen",
            authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
            readTime: "3 min read"
        },
        {
            id: 9,
            title: "Sustainable Housing: Green Roof Initiative",
            excerpt: "Copenhagen mandates green roofs on all new residential buildings from 2027.",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
            category: "housing",
            date: "Jan 25, 2026",
            author: "Anders Kristensen",
            authorAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&q=80",
            readTime: "5 min read"
        }
    ];

    const filteredNews = activeCategory === "all"
        ? newsArticles
        : newsArticles.filter(article => article.category === activeCategory);

    return (
        <div className="news-corner-container">
            {/* Header Section */}
            <div className="news-header">
                <div className="news-header-content">
                    <span className="news-badge">STAY INFORMED</span>
                    <h1 className="news-title">News Corner</h1>
                    <div className="news-divider"></div>
                    <p className="news-subtitle">
                        Latest updates on housing policies, tenant rights, and community resources in Denmark
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="category-filter">
                <div className="category-wrapper">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <i className={`fas ${category.icon}`}></i>
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Article */}
            {activeCategory === "all" && (
                <div className="featured-article">
                    <div className="featured-grid">
                        <div className="featured-image">
                            <img src={featuredNews.image} alt={featuredNews.title} />
                            <span className="featured-badge">FEATURED</span>
                        </div>
                        <div className="featured-content">
                            <div className="article-meta">
                                <span className="article-category" style={{ background: '#e8f1f0', color: '#38a9a3' }}>
                                    <i className="fas fa-scale-balanced"></i> Policy
                                </span>
                                <span className="article-date">
                                    <i className="fas fa-calendar"></i> {featuredNews.date}
                                </span>
                            </div>
                            <h2 className="featured-title">{featuredNews.title}</h2>
                            <p className="featured-excerpt">{featuredNews.excerpt}</p>
                            <div className="author-info">
                                <img src={featuredNews.authorAvatar} alt={featuredNews.author} className="author-avatar" />
                                <div className="author-details">
                                    <span className="author-name">{featuredNews.author}</span>
                                    <span className="read-time">
                                        <i className="fas fa-clock"></i> {featuredNews.readTime}
                                    </span>
                                </div>
                            </div>
                            <button className="read-more-btn" onClick={() => navigate('ReadMore')}>
                                Read full article <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* News Grid */}
            <div className="news-grid-section">
                <div className="grid-header">
                    <h2 className="grid-title">
                        {activeCategory === "all" ? "Latest News" : `${categories.find(c => c.id === activeCategory)?.name} News`}
                    </h2>
                    <span className="article-count">{filteredNews.length} articles</span>
                </div>

                <div className="news-grid">
                    {filteredNews.map((article) => (
                        <div key={article.id} className="news-card">
                            <div className="card-image-wrapper">
                                <img src={article.image} alt={article.title} className="card-image" />
                                <span className="card-category" style={{
                                    background: article.category === 'housing' ? '#e3f2fd' :
                                        article.category === 'policy' ? '#e8f1f0' :
                                            article.category === 'community' ? '#fff3e0' : '#f3e5f5',
                                    color: article.category === 'housing' ? '#1976d2' :
                                        article.category === 'policy' ? '#38a9a3' :
                                            article.category === 'community' ? '#f57c00' : '#7b1fa2'
                                }}>
                                    <i className={`fas ${article.category === 'housing' ? 'fa-building' :
                                        article.category === 'policy' ? 'fa-scale-balanced' :
                                            article.category === 'community' ? 'fa-people-group' : 'fa-calendar'
                                        }`}></i>
                                    <span>{article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                                </span>
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <span className="card-date">
                                        <i className="fas fa-calendar-alt"></i> {article.date}
                                    </span>
                                    <span className="card-read-time">
                                        <i className="fas fa-clock"></i> {article.readTime}
                                    </span>
                                </div>
                                <h3 className="card-title">{article.title}</h3>
                                <p className="card-excerpt">{article.excerpt}</p>
                                <div className="card-footer">
                                    <div className="card-author">
                                        <img src={article.authorAvatar} alt={article.author} className="author-thumb" />
                                        <span className="author-name-small">{article.author.split(' ')[0]}</span>
                                    </div>
                                    <button className="card-link" onClick={() => navigate('ReadMore')}>
                                        Read <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <div className="no-results">
                        <i className="fas fa-newspaper"></i>
                        <h3>No articles found</h3>
                        <p>Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsCorner;