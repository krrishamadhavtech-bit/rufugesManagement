import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

const EventReadMore = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    const currentLang = user?.language || 'en';

    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    const defaultImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";

    useEffect(() => {
        if (location.state?.event) {
            setEvent(location.state.event);
            setLoading(false);
        } else {
            // In a real app, you might fetch by ID here if state is missing
            setLoading(false);
        }
    }, [id, location.state]);

    // Helper to get localized content
    const getLocalized = (obj, field) => {
        if (!obj || !obj[field]) return "";
        return obj[field][currentLang] || obj[field]['en'] || "";
    };

    if (loading) {
        return (
            <div className="news-detail-loading">
                <div className="loading-spinner">
                    <i className="fas fa-circle-notch fa-spin"></i>
                </div>
                <p>Loading event details...</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="news-detail-error">
                <i className="fas fa-calendar-times"></i>
                <h2>Event not found</h2>
                <p>The event you're looking for doesn't exist or has been removed.</p>
                <button className="back-btn" onClick={() => navigate("/upcoming-events")}>
                    <i className="fas fa-arrow-left"></i> Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="news-detail-container">
            <div className="detail-nav">
                <button className="back-nav-btn" onClick={() => navigate("/upcoming-events")}>
                    <i className="fas fa-arrow-left"></i>
                    <span>Back to Events</span>
                </button>
            </div>

            <div className="detail-hero">
                <div className="hero-image-container">
                    <img src={event.image?.url || defaultImage} alt={getLocalized(event, 'title')} className="hero-image" />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <div className="hero-meta">
                            <span className="hero-category" style={{ background: '#e8f1f0', color: '#38a9a3' }}>
                                <i className="fas fa-calendar"></i>
                                <span>{event.category || 'Event'}</span>
                            </span>
                            <span className="hero-date">
                                <i className="fas fa-calendar-days"></i> {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="hero-read-time">
                                <i className="fas fa-clock"></i> {event.startTime} - {event.endTime}
                            </span>
                        </div>
                        <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: getLocalized(event, 'title') }}></h1>
                        <div className="hero-stats">
                            <span><i className="fas fa-location-dot"></i> {event.locationName || event.city}</span>
                            <span><i className="fas fa-user-group"></i> Community Event</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-content-wrapper">
                <div className="detail-main">
                    <div className="article-body">
                        <div className="event-info-box" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '20px', marginBottom: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', border: '1px solid #e2e8f0' }}>
                            <div className="info-item">
                                <h5 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fas fa-calendar"></i> Date</h5>
                                <p style={{ fontWeight: '600', color: '#0f172a', margin: 0 }}>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="info-item">
                                <h5 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fas fa-clock"></i> Time</h5>
                                <p style={{ fontWeight: '600', color: '#0f172a', margin: 0 }}>{event.startTime} - {event.endTime}</p>
                            </div>
                            <div className="info-item">
                                <h5 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fas fa-location-dot"></i> Venue</h5>
                                <p style={{ fontWeight: '600', color: '#0f172a', margin: 0 }}>{event.locationName}, {event.city}</p>
                            </div>
                            <div className="info-item">
                                <h5 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fas fa-map"></i> Address</h5>
                                <p style={{ fontWeight: '600', color: '#0f172a', margin: 0 }}>{event.address}, {event.postalCode}</p>
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1.5rem' }}>About this Event</h3>
                        <div
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: getLocalized(event, 'description') }}
                        />

                        <div className="article-tags">
                            <span className="tags-label"><i className="fas fa-tags"></i> Category:</span>
                            <span className="tag">{event.category || 'Community'}</span>
                            <span className="tag">{event.city}</span>
                        </div>
                    </div>
                </div>

                <div className="detail-sidebar">
                    <div className="sidebar-card">
                        <h4 className="sidebar-card-title"><i className="fas fa-circle-info"></i> Organizer Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0f2f1', color: '#38a9a3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fas fa-phone" style={{ fontSize: '0.8rem' }}></i>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Phone</span>
                                    <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: '500' }}>{event.organizerPhone}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0f2f1', color: '#38a9a3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fas fa-envelope" style={{ fontSize: '0.8rem' }}></i>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Email</span>
                                    <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: '500' }}>{event.organizerEmail}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventReadMore;
