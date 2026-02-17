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

import "./../sidebar.css"; // Import sidebar styles

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('dashboard');

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

    const menuItems = [
        { id: 'dashboard', icon: 'fa-home', label: 'Dashboard', path: '/admin/dashboard' },
        { id: 'content', icon: 'fa-file-alt', label: 'Content Management', path: '/admin/content' },
        { id: 'categories', icon: 'fa-tags', label: 'Categories', path: '/admin/categories' },
        { id: 'users', icon: 'fa-users', label: 'User Management', path: '/admin/users' },
        { id: 'analytics', icon: 'fa-chart-line', label: 'Analytics', path: '/admin/analytics' },
        { id: 'settings', icon: 'fa-cog', label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <i className="fas fa-shield-alt"></i>
                        <span>AdminPanel</span>
                    </div>
                </div>

                <div className="sidebar-menu">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab(item.id);
                                navigate(item.path);
                            }}
                        >
                            <i className={`fas ${item.icon}`}></i>
                            <span className="menu-label">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="user-avatar">AD</div>
                        <div className="user-info">
                            <span className="user-name">Admin User</span>
                            <span className="user-role">Super Admin</span>
                        </div>
                        <button className="logout-btn-admin" onClick={handleLogout} title="Logout" style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#dc2626' }}>
                            <i className="fas fa-sign-out-alt" style={{ fontSize: '0.9rem' }}></i>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
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
                            <span className="stat-label">Active Users</span>
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

                {/* Quick Actions removed - now in sidebar */}

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
            </main>
        </div>
    );
};

export default AdminDashboard;