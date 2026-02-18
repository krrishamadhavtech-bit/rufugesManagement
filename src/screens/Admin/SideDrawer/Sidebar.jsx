import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import "./sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };

    const menuItems = [
        { id: 'dashboard', icon: 'fa-home', label: 'Dashboard', path: '/admin/dashboard' },
        { id: 'news', icon: 'fa-file-alt', label: 'News', path: '/admin/news' },
        { id: 'events', icon: 'fa-calendar-alt', label: 'Events', path: '/admin/events' },
        { id: 'categories', icon: 'fa-tags', label: 'Categories', path: '/admin/categories' },
    ];

    return (
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
                        className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
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
    );
};

export default Sidebar;
