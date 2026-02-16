import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

// Sample news data (same as in NewsCorner)
const newsData = [
    {
        id: 1,
        title: "New Rental Reform Act: What Tenants Need to Know",
        excerpt: "Denmark's new housing law introduces stronger tenant protections, rent control measures, and faster dispute resolution. Effective from July 2026.",
        content: `
      <p>The Danish government has passed sweeping reforms to the rental housing sector, marking the most significant changes to tenant protections in over two decades. The new Rental Reform Act, which takes effect July 1, 2026, introduces several key measures designed to balance the relationship between tenants and landlords.</p>
      
      <h4>Rent Control Expansion</h4>
      <p>Under the new law, rent control measures will be extended to an additional 50,000 apartments in major cities. Annual rent increases will be capped at 4% plus CPI, preventing the sharp spikes that have priced many tenants out of desirable neighborhoods. The law also introduces a new formula for calculating "value-based rent" that gives tenants stronger grounds to challenge excessive rents.</p>
      
      <h4>Deposit Protection</h4>
      <p>Perhaps the most welcomed change is the new deposit protection scheme. Landlords will now be required to place tenant deposits in government-regulated escrow accounts that earn interest for tenants. Disputes over deposit deductions will be fast-tracked through the Rent Board, with binding decisions within 30 days. Landlords found to have unfairly withheld deposits face penalties of up to 200% of the disputed amount.</p>
      
      <h4>Faster Dispute Resolution</h4>
      <p>The Rent Board (Huslejenævn) will receive significant funding to expand its capacity, aiming to resolve 95% of cases within 30 days. A new digital case management system will allow tenants to file complaints, upload evidence, and track progress online. Small claims under 50,000 DKK will be eligible for expedited review without requiring legal representation.</p>
      
      <h4>What This Means for Internationals</h4>
      <p>For international tenants, the new law requires that all standard rental contracts be available in English upon request. Landlords must provide clear explanations of key terms including deposit requirements, notice periods, and utility responsibilities. The government will launch a multilingual information campaign in March 2026.</p>
      
      <p>The reforms have been praised by tenant advocacy groups while landlord associations have expressed concerns about increased administrative burdens. The full text of the law is available through the Ministry of Housing's website.</p>
    `,
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
        category: "policy",
        date: "Feb 13, 2026",
        author: {
            name: "Maria Jensen",
            role: "Senior Policy Advisor",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
            bio: "Maria has 12 years of experience in housing policy and tenant rights advocacy. She previously worked at the Danish Ministry of Housing and currently leads RAHA's policy research team.",
            articles: 47
        },
        readTime: "5 min read",
        views: "2.4K",
        likes: 128,
        tags: ["Policy", "Rent Control", "Tenant Rights", "Denmark"]
    },
    {
        id: 2,
        title: "Copenhagen's New Affordable Housing Initiative",
        excerpt: "City announces 1,500 new affordable units across Nørrebro and Østerbro with priority for internationals.",
        content: "<p>Copenhagen's new affordable housing initiative aims to address the housing shortage for international residents...</p>",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
        category: "housing",
        date: "Feb 12, 2026",
        author: {
            name: "Lars Petersen",
            role: "Urban Development Correspondent",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
            bio: "Lars covers urban development and housing policy for RAHA. He holds a master's in urban planning from Aalborg University.",
            articles: 32
        },
        readTime: "4 min read",
        views: "1.8K",
        likes: 94,
        tags: ["Affordable Housing", "Copenhagen", "Internationals"]
    },
    {
        id: 3,
        title: "Understanding Your Deposit Rights",
        excerpt: "New guidelines clarify deposit return timelines and condition report requirements for tenants.",
        content: "<p>The Danish Rent Board has issued new guidelines clarifying tenant rights regarding security deposits...</p>",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
        category: "policy",
        date: "Feb 10, 2026",
        author: {
            name: "Sofie Andersen",
            role: "Legal Affairs Writer",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
            bio: "Sofie is a legal journalist specializing in tenant-landlord law. She contributes regularly to Danish legal publications.",
            articles: 56
        },
        readTime: "3 min read",
        views: "3.1K",
        likes: 156,
        tags: ["Deposits", "Legal Rights", "Rent Board"]
    }
];

// Related articles data
const relatedArticles = [
    {
        id: 4,
        title: "Rent Board Reports Record Case Resolution",
        excerpt: "Huslejenævn resolves 95% of tenant-landlord disputes within 30 days.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
        category: "policy",
        date: "Feb 1, 2026",
        readTime: "4 min read",
        author: "Thomas Lund"
    },
    {
        id: 5,
        title: "International Community Hub Opens in Copenhagen",
        excerpt: "New resource center offers free housing advice and Danish classes.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
        category: "community",
        date: "Feb 8, 2026",
        readTime: "6 min read",
        author: "Emma Nielsen"
    },
    {
        id: 6,
        title: "Student Housing Portal Launches New Features",
        excerpt: "Real-time availability alerts and virtual viewings now available.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
        category: "housing",
        date: "Jan 28, 2026",
        readTime: "3 min read",
        author: "Signe Jørgensen"
    }
];

// Comments data
const comments = [
    {
        id: 1,
        author: "Michael Jensen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
        date: "Feb 14, 2026",
        time: "2 hours ago",
        content: "This is great news for tenants! The deposit protection scheme is something we've been advocating for years. Does anyone know if this applies retroactively to existing leases?",
        likes: 24,
        replies: [
            {
                id: 2,
                author: "Maria Jensen",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                date: "Feb 14, 2026",
                time: "1 hour ago",
                content: "Hi Michael, the new deposit rules apply only to leases signed after July 1, 2026. However, tenants with existing leases can request to transfer their deposit to the new escrow system with landlord consent.",
                likes: 12
            }
        ]
    },
    {
        id: 3,
        author: "Anna Kowalski",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
        date: "Feb 13, 2026",
        time: "1 day ago",
        content: "As an international student, I really appreciate that contracts will be available in English. It's been challenging understanding all the legal terms in Danish.",
        likes: 18,
        replies: []
    }
];

const ReadMore = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            const foundArticle = newsData.find(item => item.id === parseInt(id));
            setArticle(foundArticle || newsData[0]);
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) {
        return (
            <div className="news-detail-loading">
                <div className="loading-spinner">
                    <i className="fas fa-circle-notch fa-spin"></i>
                </div>
                <p>Loading article...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="news-detail-error">
                <i className="fas fa-newspaper"></i>
                <h2>Article not found</h2>
                <p>The article you're looking for doesn't exist or has been removed.</p>
                <button className="back-btn" onClick={() => navigate("/news-corner")}>
                    <i className="fas fa-arrow-left"></i> Back to News
                </button>
            </div>
        );
    }

    return (
        <div className="news-detail-container">
            {/* Progress Bar */}
            <div className="reading-progress">
                <div className="progress-bar" style={{ width: '35%' }}></div>
            </div>

            {/* Back Navigation */}
            <div className="detail-nav">
                <button className="back-nav-btn" onClick={() => navigate("/news-corner")}>
                    <i className="fas fa-arrow-left"></i>
                    <span>Back to News</span>
                </button>
                <div className="nav-actions">
                    <button className={`nav-action-btn ${saved ? 'active' : ''}`} onClick={() => setSaved(!saved)}>
                        <i className={`fas ${saved ? 'fa-bookmark' : 'fa-bookmark'}`} style={{ color: saved ? '#38a9a3' : '' }}></i>
                    </button>
                    <button className="nav-action-btn" onClick={() => window.print()}>
                        <i className="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="detail-hero">
                <div className="hero-image-container">
                    <img src={article.image} alt={article.title} className="hero-image" />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <div className="hero-meta">
                            <span className="hero-category" style={{
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
                            <span className="hero-date">
                                <i className="fas fa-calendar"></i> {article.date}
                            </span>
                            <span className="hero-read-time">
                                <i className="fas fa-clock"></i> {article.readTime}
                            </span>
                        </div>
                        <h1 className="hero-title">{article.title}</h1>
                        <div className="hero-stats">
                            <span><i className="fas fa-eye"></i> {article.views} views</span>
                            <span><i className="fas fa-heart"></i> {article.likes + (liked ? 1 : 0)} likes</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="detail-content-wrapper">
                <div className="detail-main">
                    {/* Author Card */}
                    <div className="author-card">
                        <div className="author-card-left">
                            <img src={article.author.avatar} alt={article.author.name} className="author-avatar-large" />
                            <div className="author-info-detail">
                                <h4 className="author-name-large">{article.author.name}</h4>
                                <p className="author-role">{article.author.role}</p>
                                <div className="author-stats">
                                    <span><i className="fas fa-pen"></i> {article.author.articles} articles</span>
                                </div>
                            </div>
                        </div>
                        <div className="author-card-right">
                            <button className="follow-btn">
                                <i className="fas fa-plus"></i> Follow
                            </button>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className="article-body">
                        <div
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Tags */}
                        <div className="article-tags">
                            <span className="tags-label"><i className="fas fa-tags"></i> Topics:</span>
                            {article.tags.map((tag, index) => (
                                <span key={index} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Engagement Bar */}
                        <div className="engagement-bar">
                            <div className="engagement-left">
                                <button
                                    className={`engagement-btn ${liked ? 'active' : ''}`}
                                    onClick={() => setLiked(!liked)}
                                >
                                    <i className={`fas ${liked ? 'fa-heart' : 'fa-heart'}`}></i>
                                    <span>{liked ? 'Liked' : 'Like'}</span>
                                </button>
                                <button className="engagement-btn">
                                    <i className="fas fa-comment"></i>
                                    <span>Comment</span>
                                </button>
                                <button className="engagement-btn">
                                    <i className="fas fa-share"></i>
                                    <span>Share</span>
                                </button>
                            </div>
                            <div className="engagement-right">
                                <button className={`engagement-btn ${saved ? 'active' : ''}`} onClick={() => setSaved(!saved)}>
                                    <i className={`fas ${saved ? 'fa-bookmark' : 'fa-bookmark'}`}></i>
                                    <span>{saved ? 'Saved' : 'Save'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Author Bio Section */}
                    <div className="author-bio-section">
                        <div className="bio-header">
                            <img src={article.author.avatar} alt={article.author.name} className="bio-avatar" />
                            <div className="bio-header-info">
                                <h4>About {article.author.name}</h4>
                                <p>{article.author.bio}</p>
                            </div>
                        </div>
                        <div className="bio-footer">
                            <button className="view-profile-btn">
                                View all articles <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="comments-section">
                        <div className="comments-header">
                            <h3>
                                <i className="fas fa-comments"></i>
                                Comments ({comments.length})
                            </h3>
                        </div>

                        {/* Add Comment */}
                        <div className="add-comment">
                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
                                alt="Your avatar"
                                className="comment-avatar"
                            />
                            <div className="comment-input-wrapper">
                                <textarea
                                    placeholder="Share your thoughts..."
                                    className="comment-textarea"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                ></textarea>
                                <div className="comment-actions">
                                    <button className="cancel-btn">Cancel</button>
                                    <button className="post-btn" disabled={!commentText.trim()}>
                                        Post Comment
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="comments-list">
                            {comments.map((comment) => (
                                <div key={comment.id} className="comment-item">
                                    <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
                                    <div className="comment-content">
                                        <div className="comment-header">
                                            <div>
                                                <span className="comment-author">{comment.author}</span>
                                                <span className="comment-time">{comment.time}</span>
                                            </div>
                                            <button className="comment-like">
                                                <i className="fas fa-heart"></i>
                                                <span>{comment.likes}</span>
                                            </button>
                                        </div>
                                        <p className="comment-text">{comment.content}</p>
                                        <div className="comment-footer">
                                            <button className="comment-reply-btn">
                                                <i className="fas fa-reply"></i> Reply
                                            </button>
                                        </div>

                                        {/* Replies */}
                                        {comment.replies.length > 0 && (
                                            <div className="replies-list">
                                                {comment.replies.map((reply) => (
                                                    <div key={reply.id} className="reply-item">
                                                        <img src={reply.avatar} alt={reply.author} className="reply-avatar" />
                                                        <div className="reply-content">
                                                            <div className="reply-header">
                                                                <span className="reply-author">{reply.author}</span>
                                                                <span className="reply-time">{reply.time}</span>
                                                            </div>
                                                            <p className="reply-text">{reply.content}</p>
                                                            <button className="reply-like-btn">
                                                                <i className="fas fa-heart"></i> {reply.likes}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="load-more-comments">
                            <button className="load-more-btn">
                                Load more comments <i className="fas fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="detail-sidebar">
                    {/* Table of Contents */}
                    <div className="sidebar-card toc-card">
                        <h4 className="sidebar-card-title">
                            <i className="fas fa-list-ul"></i>
                            In this article
                        </h4>
                        <ul className="toc-list">
                            <li className="toc-item active">
                                <a href="#rent-control">Rent Control Expansion</a>
                            </li>
                            <li className="toc-item">
                                <a href="#deposit">Deposit Protection</a>
                            </li>
                            <li className="toc-item">
                                <a href="#dispute">Faster Dispute Resolution</a>
                            </li>
                            <li className="toc-item">
                                <a href="#internationals">What This Means for Internationals</a>
                            </li>
                        </ul>
                    </div>

                    {/* Related Articles */}
                    <div className="sidebar-card related-card">
                        <h4 className="sidebar-card-title">
                            <i className="fas fa-newspaper"></i>
                            Related articles
                        </h4>
                        <div className="related-list">
                            {relatedArticles.map((related) => (
                                <div key={related.id} className="related-item" onClick={() => navigate(`/news/${related.id}`)}>
                                    <img src={related.image} alt={related.title} className="related-image" />
                                    <div className="related-info">
                                        <h5 className="related-title">{related.title}</h5>
                                        <div className="related-meta">
                                            <span className="related-date">
                                                <i className="fas fa-calendar"></i> {related.date}
                                            </span>
                                            <span className="related-read-time">
                                                <i className="fas fa-clock"></i> {related.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="view-all-related" onClick={() => navigate("/news-corner")}>
                            View all articles <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>

                    {/* Newsletter Card */}
                    <div className="sidebar-card newsletter-card">
                        <div className="newsletter-mini">
                            <i className="fas fa-envelope-open-text"></i>
                            <h4>Get updates</h4>
                            <p>Subscribe to receive new articles in your inbox</p>
                            <form className="newsletter-mini-form">
                                <input type="email" placeholder="Your email" className="newsletter-mini-input" />
                                <button type="submit" className="newsletter-mini-btn">
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Tags Cloud */}
                    <div className="sidebar-card tags-card">
                        <h4 className="sidebar-card-title">
                            <i className="fas fa-cloud"></i>
                            Popular topics
                        </h4>
                        <div className="tags-cloud">
                            <span className="cloud-tag">Rent Control</span>
                            <span className="cloud-tag">Deposits</span>
                            <span className="cloud-tag">Copenhagen</span>
                            <span className="cloud-tag">Student Housing</span>
                            <span className="cloud-tag">Legal Rights</span>
                            <span className="cloud-tag">Internationals</span>
                            <span className="cloud-tag">Rent Board</span>
                            <span className="cloud-tag">Affordable Housing</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadMore;