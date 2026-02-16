import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const UpcomingEvents = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeMonth, setActiveMonth] = useState("all");

    const categories = [
        { id: "all", name: "All Events", icon: "fa-calendar" },
        { id: "workshop", name: "Workshops", icon: "fa-chalkboard-user" },
        { id: "seminar", name: "Seminars", icon: "fa-users" },
        { id: "networking", name: "Networking", icon: "fa-handshake" },
        { id: "cultural", name: "Cultural", icon: "fa-globe" }
    ];

    const months = [
        { id: "all", name: "All Months" },
        { id: "feb", name: "February" },
        { id: "mar", name: "March" },
        { id: "apr", name: "April" },
        { id: "may", name: "May" }
    ];

    const featuredEvent = {
        id: 1,
        title: "Copenhagen International Housing Summit 2026",
        excerpt: "Join policymakers, housing experts, and community leaders for the annual housing summit. Key topics include affordable housing, tenant rights, and sustainable urban development.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        category: "seminar",
        date: "Mar 15, 2026",
        time: "09:00 - 18:00",
        location: "Copenhagen City Hall, Main Hall",
        organizer: "RAHA Housing Association",
        organizerAvatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80",
        attendees: 234,
        capacity: 300,
        price: "Free",
        featured: true
    };

    const events = [
        {
            id: 2,
            title: "Tenant Rights Workshop: Understanding Your Lease",
            excerpt: "Learn how to read and negotiate rental contracts, understand deposit rules, and know your rights as a tenant in Denmark.",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
            category: "workshop",
            date: "Feb 22, 2026",
            time: "14:00 - 16:30",
            location: "Nørrebro Community Center",
            organizer: "Legal Aid Denmark",
            organizerAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80",
            attendees: 45,
            capacity: 60,
            price: "Free",
            registrationDeadline: "Feb 20, 2026"
        },
        {
            id: 3,
            title: "Internationals Networking Evening",
            excerpt: "Connect with other international professionals and students. Share experiences, build your network, and meet potential roommates.",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
            category: "networking",
            date: "Feb 25, 2026",
            time: "18:30 - 21:00",
            location: "The Union, Indre By",
            organizer: "International House Copenhagen",
            organizerAvatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&q=80",
            attendees: 78,
            capacity: 100,
            price: "50 DKK",
            registrationDeadline: "Feb 23, 2026"
        },
        {
            id: 4,
            title: "Danish Housing System Explained",
            excerpt: "A comprehensive guide to finding housing in Denmark: portals, waiting lists, sublets, and common pitfalls to avoid.",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
            category: "seminar",
            date: "Mar 3, 2026",
            time: "17:00 - 19:00",
            location: "Aarhus Public Library",
            organizer: "RAHA Aarhus",
            organizerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
            attendees: 32,
            capacity: 50,
            price: "Free",
            registrationDeadline: "Mar 1, 2026"
        },
        {
            id: 5,
            title: "Deposit Disputes: How to Get Your Money Back",
            excerpt: "Practical workshop on condition reports, documentation, and legal steps to recover unfair deposit deductions.",
            image: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=600&q=80",
            category: "workshop",
            date: "Mar 10, 2026",
            time: "15:00 - 17:30",
            location: "Online (Zoom)",
            organizer: "Tenants Association LLO",
            organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
            attendees: 112,
            capacity: 200,
            price: "Free for members",
            registrationDeadline: "Mar 9, 2026"
        },
        {
            id: 6,
            title: "Nordic Coliving Conference 2026",
            excerpt: "Exploring the future of shared living spaces. Experts from Denmark, Sweden, and Norway share insights on coliving trends.",
            image: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=600&q=80",
            category: "seminar",
            date: "Mar 18, 2026",
            time: "10:00 - 16:00",
            location: "DGI Byen, Copenhagen",
            organizer: "Nordic Coliving Association",
            organizerAvatar: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=100&q=80",
            attendees: 156,
            capacity: 200,
            price: "299 DKK",
            registrationDeadline: "Mar 10, 2026"
        },
        {
            id: 7,
            title: "Cultural Evening: Danish Traditions & Housing Culture",
            excerpt: "Learn about Danish housing culture, traditions, and how to build good relationships with Danish neighbors and landlords.",
            image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80",
            category: "cultural",
            date: "Mar 25, 2026",
            time: "19:00 - 21:30",
            location: "Kulturhuset Islands Brygge",
            organizer: "Copenhagen International Community",
            organizerAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80",
            attendees: 43,
            capacity: 80,
            price: "25 DKK",
            registrationDeadline: "Mar 23, 2026"
        },
        {
            id: 8,
            title: "First-Time Renters: Everything You Need to Know",
            excerpt: "Special workshop for students and young professionals entering the rental market for the first time.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
            category: "workshop",
            date: "Apr 2, 2026",
            time: "16:00 - 18:30",
            location: "University of Copenhagen, South Campus",
            organizer: "Student Housing Copenhagen",
            organizerAvatar: "https://images.unsplash.com/photo-1531427186791-2c4c8220ff37?w=100&q=80",
            attendees: 28,
            capacity: 40,
            price: "Free",
            registrationDeadline: "Mar 31, 2026"
        },
        {
            id: 9,
            title: "Sustainable Living: Green Housing Solutions",
            excerpt: "Discover eco-friendly housing options, energy-saving tips, and how to reduce your carbon footprint at home.",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
            category: "workshop",
            date: "Apr 15, 2026",
            time: "14:00 - 16:00",
            location: "Østerbro Environment House",
            organizer: "Green Building Council Denmark",
            organizerAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&q=80",
            attendees: 19,
            capacity: 35,
            price: "Free",
            registrationDeadline: "Apr 13, 2026"
        }
    ];

    const filteredEvents = events.filter(event => {
        const categoryMatch = activeCategory === "all" || event.category === activeCategory;
        const monthMatch = activeMonth === "all" ||
            (activeMonth === "feb" && event.date.includes("Feb")) ||
            (activeMonth === "mar" && event.date.includes("Mar")) ||
            (activeMonth === "apr" && event.date.includes("Apr")) ||
            (activeMonth === "may" && event.date.includes("May"));
        return categoryMatch && monthMatch;
    });

    return (
        <div className="events-container">
            {/* Header Section */}
            <div className="events-header">
                <div className="events-header-content">
                    <span className="events-badge">JOIN US</span>
                    <h1 className="events-title">Upcoming Events</h1>
                    <div className="events-divider"></div>
                    <p className="events-subtitle">
                        Workshops, seminars, and networking opportunities for internationals in Denmark
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

            {/* Featured Event */}
            {activeCategory === "all" && activeMonth === "all" && (
                <div className="featured-event">
                    <div className="featured-event-grid">
                        <div className="featured-event-image">
                            <img src={featuredEvent.image} alt={featuredEvent.title} />
                            <span className="featured-event-badge">FEATURED</span>
                            <div className="event-capacity-badge">
                                <i className="fas fa-users"></i>
                                {featuredEvent.attendees}/{featuredEvent.capacity} booked
                            </div>
                        </div>
                        <div className="featured-event-content">
                            <div className="event-meta-top">
                                <span className="event-category" style={{ background: '#e8f1f0', color: '#38a9a3' }}>
                                    <i className="fas fa-users"></i> Seminar
                                </span>
                                <span className="event-price" style={{ background: '#38a9a3', color: 'white' }}>
                                    {featuredEvent.price}
                                </span>
                            </div>
                            <h2 className="featured-event-title">{featuredEvent.title}</h2>
                            <p className="featured-event-excerpt">{featuredEvent.excerpt}</p>

                            <div className="event-details-grid">
                                <div className="event-detail-item">
                                    <i className="fas fa-calendar"></i>
                                    <div>
                                        <span className="detail-label">Date</span>
                                        <span className="detail-value">{featuredEvent.date}</span>
                                    </div>
                                </div>
                                <div className="event-detail-item">
                                    <i className="fas fa-clock"></i>
                                    <div>
                                        <span className="detail-label">Time</span>
                                        <span className="detail-value">{featuredEvent.time}</span>
                                    </div>
                                </div>
                                <div className="event-detail-item">
                                    <i className="fas fa-location-dot"></i>
                                    <div>
                                        <span className="detail-label">Location</span>
                                        <span className="detail-value">{featuredEvent.location}</span>
                                    </div>
                                </div>
                                <div className="event-detail-item">
                                    <i className="fas fa-user"></i>
                                    <div>
                                        <span className="detail-label">Organizer</span>
                                        <span className="detail-value">{featuredEvent.organizer}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="featured-event-footer">
                                <div className="organizer-info">
                                    <img src={featuredEvent.organizerAvatar} alt={featuredEvent.organizer} className="organizer-avatar" />
                                    <span className="organizer-name">{featuredEvent.organizer}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Events Grid */}
            <div className="events-grid-section">
                <div className="grid-header">
                    <h2 className="grid-title">
                        {activeCategory === "all" ? "All Events" : `${categories.find(c => c.id === activeCategory)?.name} Events`}
                        {activeMonth !== "all" && ` - ${months.find(m => m.id === activeMonth)?.name}`}
                    </h2>
                    <span className="event-count">{filteredEvents.length} events</span>
                </div>

                <div className="events-grid">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="event-card">
                            <div className="event-card-image-wrapper">
                                <img src={event.image} alt={event.title} className="event-card-image" />
                                <span className="event-card-category" style={{
                                    background: event.category === 'workshop' ? '#e3f2fd' :
                                        event.category === 'seminar' ? '#e8f1f0' :
                                            event.category === 'networking' ? '#fff3e0' : '#f3e5f5',
                                    color: event.category === 'workshop' ? '#1976d2' :
                                        event.category === 'seminar' ? '#38a9a3' :
                                            event.category === 'networking' ? '#f57c00' : '#7b1fa2'
                                }}>
                                    <i className={`fas ${event.category === 'workshop' ? 'fa-chalkboard-user' :
                                        event.category === 'seminar' ? 'fa-users' :
                                            event.category === 'networking' ? 'fa-handshake' : 'fa-globe'
                                        }`}></i>
                                    <span>{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                                </span>
                                <span className="event-card-price">{event.price}</span>
                            </div>
                            <div className="event-card-content">
                                <div className="event-card-meta">
                                    <span className="event-card-date">
                                        <i className="fas fa-calendar-alt"></i> {event.date}
                                    </span>
                                    <span className="event-card-time">
                                        <i className="fas fa-clock"></i> {event.time}
                                    </span>
                                </div>
                                <h3 className="event-card-title">{event.title}</h3>
                                <p className="event-card-location">
                                    <i className="fas fa-location-dot"></i> {event.location}
                                </p>
                                <p className="event-card-excerpt">{event.excerpt}</p>

                                <div className="event-card-footer">
                                    <div className="event-card-attendees">
                                        <i className="fas fa-users"></i>
                                        <span>{event.attendees}/{event.capacity} attending</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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


            {/* Host an Event CTA */}
            <div className="host-event-cta">
                <div className="host-event-content">
                    <div className="host-event-icon">
                        <i className="fas fa-microphone-alt"></i>
                    </div>
                    <div className="host-event-text">
                        <h3>Want to host an event?</h3>
                        <p>Are you organizing housing-related workshops or networking events? Partner with RAHA to reach thousands of internationals in Denmark.</p>
                    </div>
                    <button className="host-event-btn">
                        Contact us <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;