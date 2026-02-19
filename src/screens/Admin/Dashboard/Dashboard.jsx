import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../SideDrawer/sidebar.css";

import { fetchNews } from "../../../services/news";
import { fetchEvents } from "../../../services/event";
import { fetchCategories, fetchSubCategories } from "../../../services/category";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalNews: 0,
        totalEvents: 0,
        totalCategories: 0,
        totalSubCategories: 0,
        totalContent: 0
    });

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                // Fetch basic entities
                // Fetch basic entities with large limit for stats
                const newsRes = await fetchNews(1, 1000);
                const eventsRes = await fetchEvents(1, 1000);
                const categoriesRes = await fetchCategories(1, 1000);

                // Robust check for data arrays
                const news = (newsRes.statusCode === 200 || newsRes.success) ? newsRes.data : (Array.isArray(newsRes) ? newsRes : []);
                const events = (eventsRes.statusCode === 200 || eventsRes.success) ? eventsRes.data : (Array.isArray(eventsRes) ? eventsRes : []);
                const categories = (categoriesRes.statusCode === 200 || categoriesRes.success) ? categoriesRes.data : (Array.isArray(categoriesRes) ? categoriesRes : []);

                // Fetch subcategories for each category
                const subPromises = categories.map(cat => fetchSubCategories(cat._id));
                const subResults = await Promise.all(subPromises);

                let totalSub = 0;
                categories.forEach((cat, index) => {
                    const subs = subResults[index];
                    totalSub += (subs.success || subs.statusCode === 200) ? subs.data.length : (Array.isArray(subs) ? subs.length : 0);
                });

                setStats({
                    totalNews: news.length,
                    totalEvents: events.length,
                    totalCategories: categories.length,
                    totalSubCategories: totalSub,
                    totalContent: news.length + events.length
                });

               

                // Generate last 7 days trend data using local date comparison
                const last7Days = [];
                const formatLocal = (d) => {
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                };

                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
                    const dateStr = formatLocal(date);

                    const newsCount = news.filter(n => {
                        if (!n.date) return false;
                        try {
                            return formatLocal(new Date(n.date)) === dateStr;
                        } catch (e) {
                            return false;
                        }
                    }).length;

                    const eventCount = events.filter(e => {
                        if (!e.date) return false;
                        try {
                            return formatLocal(new Date(e.date)) === dateStr;
                        } catch (e) {
                            return false;
                        }
                    }).length;

                    last7Days.push({
                        name: dayName,
                        news: newsCount,
                        events: eventCount
                    });
                }

            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const COLORS = ['#38a9a3', '#517ea8', '#b86f7a', '#5c8d7f', '#f5a97f', '#8884d8', '#82ca9d', '#ffc658'];


    return (
        <>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard Overview</h1>
                    <p className="page-subtitle">Welcome back, get an overview of your platform.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#38a9a315', color: '#38a9a3' }}>
                        <i className="fas fa-newspaper"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Total News</span>
                        <span className="stat-value">{stats.totalNews}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#517ea815', color: '#517ea8' }}>
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Total Events</span>
                        <span className="stat-value">{stats.totalEvents}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#b86f7a15', color: '#b86f7a' }}>
                        <i className="fas fa-tags"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Total Categories</span>
                        <span className="stat-value">{stats.totalCategories}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#f5a97f15', color: '#f5a97f' }}>
                        <i className="fas fa-list-ul"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Sub-Categories</span>
                        <span className="stat-value">{stats.totalSubCategories}</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                    <div className="quick-action-card" onClick={() => navigate('/admin/news')}>
                        <div className="quick-action-icon" style={{ background: '#38a9a315', color: '#38a9a3' }}>
                            <i className="fas fa-newspaper"></i>
                        </div>
                        <span className="quick-action-label">Add News</span>
                    </div>
                    <div className="quick-action-card" onClick={() => navigate('/admin/events')}>
                        <div className="quick-action-icon" style={{ background: '#517ea815', color: '#517ea8' }}>
                            <i className="fas fa-calendar-plus"></i>
                        </div>
                        <span className="quick-action-label">Add Event</span>
                    </div>
                    <div className="quick-action-card" onClick={() => navigate('/admin/categories')}>
                        <div className="quick-action-icon" style={{ background: '#b86f7a15', color: '#b86f7a' }}>
                            <i className="fas fa-folder-plus"></i>
                        </div>
                        <span className="quick-action-label">Manage Categories</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;