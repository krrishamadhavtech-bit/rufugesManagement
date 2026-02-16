import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Area, AreaChart
} from 'recharts';
import "../style.css";

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dateRange, setDateRange] = useState("week");

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };

    // Stats data
    const stats = {
        totalContent: 1248,
        categoriesCount: 18,
        lastUpdated: "2 hours ago",
        pendingReviews: 23,
        totalUsers: 3456,
        activeMarkers: 156
    };

    // Chart data
    const contentTrendData = [
        { name: 'Mon', articles: 12, events: 5, markers: 3 },
        { name: 'Tue', articles: 19, events: 8, markers: 4 },
        { name: 'Wed', articles: 15, events: 12, markers: 6 },
        { name: 'Thu', articles: 21, events: 9, markers: 8 },
        { name: 'Fri', articles: 24, events: 14, markers: 5 },
        { name: 'Sat', articles: 8, events: 6, markers: 2 },
        { name: 'Sun', articles: 5, events: 3, markers: 1 },
    ];

    const categoryDistribution = [
        { name: 'Housing', value: 35 },
        { name: 'Legal', value: 25 },
        { name: 'Education', value: 20 },
        { name: 'Health', value: 15 },
        { name: 'Community', value: 5 },
    ];

    const COLORS = ['#38a9a3', '#517ea8', '#b86f7a', '#5c8d7f', '#f5a97f'];

    const recentContent = [
        { id: 1, title: "New Rental Reform Act", category: "Policy", status: "Published", updated: "2 min ago", author: "Maria J." },
        { id: 2, title: "Finding Apartment in Copenhagen", category: "Housing", status: "Draft", updated: "15 min ago", author: "Lars P." },
        { id: 3, title: "Tenant Rights Workshop", category: "Events", status: "Published", updated: "1 hour ago", author: "Sofie A." },
        { id: 4, title: "Legal Aid for Internationals", category: "Legal", status: "Review", updated: "3 hours ago", author: "Thomas L." },
        { id: 5, title: "Danish Language Schools", category: "Education", status: "Published", updated: "5 hours ago", author: "Emma N." },
    ];

    const quickActions = [
        { icon: "fa-plus-circle", label: "New Content", color: "#38a9a3", path: "/admin/content/new" },
        { icon: "fa-tags", label: "Manage Categories", color: "#517ea8", path: "/admin/categories" },
        { icon: "fa-map-marker-alt", label: "Add Location", color: "#b86f7a", path: "/admin/markers/new" },
        { icon: "fa-users", label: "Add Events", color: "#5c8d7f", path: "/admin/users" },
        { icon: "fa-chart-line", label: "Add News", color: "#f5a97f", path: "/admin/analytics" },
    ];

    return (
        <div className="admin-dashboard">
            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#38a9a315', color: '#38a9a3' }}>
                        <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Total Published Content</span>
                        <span className="stat-value">{stats.totalContent}</span>
                        <span className="stat-trend positive">
                            <i className="fas fa-arrow-up"></i> 12% from last month
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#517ea815', color: '#517ea8' }}>
                        <i className="fas fa-tags"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Total Categories</span>
                        <span className="stat-value">{stats.categoriesCount}</span>
                        <span className="stat-trend">
                            <i className="fas fa-plus"></i> 2 new this month
                        </span>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#f5a97f15', color: '#f5a97f' }}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Active events</span>
                        <span className="stat-value">{stats.totalUsers}</span>
                        <span className="stat-trend positive">
                            <i className="fas fa-arrow-up"></i> 8% growth
                        </span>
                    </div>
                </div>

            </div>

            {/* Charts Row */}
            <div className="charts-row">
                <div className="chart-card">
                    <div className="chart-header">
                        <h3>Content Trend</h3>
                        <div className="chart-legend">
                            <span><span className="dot" style={{ background: '#38a9a3' }}></span> Articles</span>
                            <span><span className="dot" style={{ background: '#517ea8' }}></span> Events</span>
                            <span><span className="dot" style={{ background: '#b86f7a' }}></span> Markers</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={contentTrendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#edf2f7" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Area type="monotone" dataKey="articles" stackId="1" stroke="#38a9a3" fill="#38a9a340" />
                            <Area type="monotone" dataKey="events" stackId="1" stroke="#517ea8" fill="#517ea840" />
                            <Area type="monotone" dataKey="markers" stackId="1" stroke="#b86f7a" fill="#b86f7a40" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Content by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {categoryDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                    {quickActions.map((action, index) => (
                        <div
                            key={index}
                            className="quick-action-card"
                            onClick={() => navigate(action.path)}
                            style={{ borderTopColor: action.color }}
                        >
                            <div className="quick-action-icon" style={{ background: `${action.color}15`, color: action.color }}>
                                <i className={`fas ${action.icon}`}></i>
                            </div>
                            <span className="quick-action-label">{action.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Content Table */}
            <div className="recent-content-section">
                <div className="section-header">
                    <h3>Recently Updated Content</h3>
                    <button className="view-all-btn" onClick={() => navigate('/admin/content')}>
                        View All <i className="fas fa-arrow-right"></i>
                    </button>
                </div>

                <div className="table-container">
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Author</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentContent.map((item) => (
                                <tr key={item.id}>
                                    <td className="content-title">{item.title}</td>
                                    <td>
                                        <span className="category-badge">{item.category}</span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>{item.author}</td>
                                    <td>{item.updated}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="action-btn edit" onClick={() => navigate(`/admin/content/edit/${item.id}`)}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="action-btn view">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;