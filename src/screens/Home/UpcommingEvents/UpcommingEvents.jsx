import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import { fetchEvents } from "../../../services/event";

const UpcomingEvents = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const currentLang = user?.language || 'en';

    const [activeCategory, setActiveCategory] = useState("all");
    const [activeMonth, setActiveMonth] = useState("all");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(10);
    const categories = [
        { id: "all", name: "All Events", icon: "fa-calendar" },
        { id: "workshop", name: "Workshops", icon: "fa-chalkboard-user" },
        { id: "seminar", name: "Seminars", icon: "fa-users" },
        { id: "networking", name: "Networking", icon: "fa-handshake" },
        { id: "cultural", name: "Cultural", icon: "fa-globe" }
    ];

    const months = [
        { id: "all", name: "All Months" },
        { id: "01", name: "January" },
        { id: "02", name: "February" },
        { id: "03", name: "March" },
        { id: "04", name: "April" },
        { id: "05", name: "May" },
        { id: "06", name: "June" },
        { id: "07", name: "July" },
        { id: "08", name: "August" },
        { id: "09", name: "September" },
        { id: "10", name: "October" },
        { id: "11", name: "November" },
        { id: "12", name: "December" }
    ];

    const loadEvents = async () => {
        setLoading(true);
        try {
            const response = await fetchEvents();
            if (response.statusCode === 200) {
                // Filter only active events
                setEvents(response.data.filter(e => e.isActive !== false));
                setVisibleCount(10);
            }
        } catch (error) {
            console.error("Failed to load events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const getLocalized = (obj, field) => {
        if (!obj || !obj[field]) return "";
        return obj[field][currentLang] || obj[field]['en'] || "";
    };

    const filteredEvents = events.filter(event => {
        const categoryMatch = activeCategory === "all" || (event.category && event.category.toLowerCase() === activeCategory.toLowerCase());

        // Month filter logic
        let monthMatch = activeMonth === "all";
        if (!monthMatch && event.date) {
            const eventMonth = event.date.split('-')[1]; // assuming YYYY-MM-DD
            monthMatch = eventMonth === activeMonth;
        }

        return categoryMatch && monthMatch;
    });

    const defaultImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80";

    const handleEventClick = (event) => {
        navigate('ReadMore', { state: { event } });
    };

    if (loading) {
        return (
            <div className="events-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#38a9a3' }}></i>
                    <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading upcoming events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="events-container">
            {/* Header Section */}
            <div className="events-header">
                <div className="events-header-content">
                    <span className="events-badge">JOIN US</span>
                    <h1 className="events-title">Upcoming Events</h1>
                    <div className="events-divider"></div>
                    <p className="events-subtitle">
                        Workshops, seminars, and networking opportunities for everyone
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="events-filters">
                <div className="filter-section">
                    <h4 className="filter-label">
                        <i className="fas fa-tag"></i> Event Type
                    </h4>
                    <div className="filter-wrapper">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                <i className={`fas ${category.icon}`}></i>
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-section">
                    <h4 className="filter-label">
                        <i className="fas fa-calendar"></i> Month
                    </h4>
                    <div className="filter-wrapper">
                        {months.map((month) => (
                            <button
                                key={month.id}
                                className={`filter-btn month-btn ${activeMonth === month.id ? 'active' : ''}`}
                                onClick={() => setActiveMonth(month.id)}
                            >
                                <span>{month.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="events-grid-section">
                <div className="grid-header">
                    <h2 className="grid-title">
                        {activeCategory === "all" ? "All Events" : `${categories.find(c => c.id === activeCategory)?.name} Events`}
                        {activeMonth !== "all" && ` - ${months.find(m => m.id === activeMonth)?.name}`}
                    </h2>
                    <span className="event-count">{filteredEvents.length} upcoming events</span>
                </div>

                <div className="events-grid">
                    {filteredEvents.slice(0, visibleCount).map((event) => (
                        <div key={event._id} className="event-card" onClick={() => handleEventClick(event)} style={{ cursor: 'pointer' }}>
                            <div className="event-card-image-wrapper">
                                <img src={event.image?.url || defaultImage} alt={getLocalized(event, 'title')} className="event-card-image" />
                                <span className="event-card-category" style={{ background: '#e8f1f0', color: '#38a9a3' }}>
                                    <i className="fas fa-calendar"></i>
                                    <span>{event.category || 'Event'}</span>
                                </span>
                                <span className="event-card-price">Free</span>
                            </div>
                            <div className="event-card-content">
                                <div className="event-card-meta">
                                    <span className="event-card-date">
                                        <i className="fas fa-calendar-alt"></i> {new Date(event.date).toLocaleDateString()}
                                    </span>
                                    <span className="event-card-time">
                                        <i className="fas fa-clock"></i> {event.startTime}
                                    </span>
                                </div>
                                <h3 className="event-card-title" dangerouslySetInnerHTML={{ __html: getLocalized(event, 'title') }}></h3>
                                <p className="event-card-location">
                                    <i className="fas fa-location-dot"></i> {event.city}
                                </p>
                                <div className="event-card-excerpt" style={{ maxHeight: '60px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: getLocalized(event, 'description') }}></div>

                                <div className="event-card-footer">
                                    <div className="event-card-attendees">
                                        <i className="fas fa-user"></i>
                                        <span>{event.organizerName}</span>
                                    </div>
                                    <span style={{ color: '#38a9a3', fontSize: '0.85rem', fontWeight: '600' }}>
                                        Details <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                            {!loading && (
                    <div style={{ textAlign: "center", marginTop: "1.5rem", alignContent: 'center' }}>
                        <button
                            className="btn-primary"
                            onClick={() => setVisibleCount(prev => prev + 10)}
                        >
                            Load More
                        </button>
                    </div>
                )}
                </div>
        
                {filteredEvents.length === 0 && (
                    <div className="no-results">
                        <i className="fas fa-calendar-times"></i>
                        <h3>No events found</h3>
                        <p>Try adjusting your filters</p>
                        <button
                            className="clear-filters-btn"
                            onClick={() => {
                                setActiveCategory("all");
                                setActiveMonth("all");
                            }}
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingEvents;