import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

const ContentManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [selectedItems, setSelectedItems] = useState([]);

    const categories = ["Housing", "Policy", "Events", "Education", "Legal", "Community"];

    const contentData = [
        { id: 1, title: "New Rental Reform Act", category: "Policy", status: "Published", author: "Maria J.", date: "2026-02-13", views: 1245, slug: "rental-reform-act" },
        { id: 2, title: "Finding Apartment in Copenhagen", category: "Housing", status: "Draft", author: "Lars P.", date: "2026-02-12", views: 0, slug: "find-apartment-cph" },
        { id: 3, title: "Tenant Rights Workshop", category: "Events", status: "Published", author: "Sofie A.", date: "2026-02-11", views: 890, slug: "tenant-rights-workshop" },
        { id: 4, title: "Legal Aid for Internationals", category: "Legal", status: "Review", author: "Thomas L.", date: "2026-02-10", views: 456, slug: "legal-aid-intl" },
        { id: 5, title: "Danish Language Schools", category: "Education", status: "Published", author: "Emma N.", date: "2026-02-09", views: 2341, slug: "danish-schools" },
        { id: 6, title: "Healthcare for Internationals", category: "Health", status: "Draft", author: "Maria J.", date: "2026-02-08", views: 0, slug: "healthcare-intl" },
        { id: 7, title: "Community Center Opening", category: "Community", status: "Published", author: "Lars P.", date: "2026-02-07", views: 567, slug: "community-center" },
        { id: 8, title: "Rent Control Guidelines", category: "Policy", status: "Published", author: "Sofie A.", date: "2026-02-06", views: 1890, slug: "rent-control" },
    ];

    const filteredContent = contentData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || item.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesCategory = filterCategory === "all" || item.category === filterCategory;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(contentData.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Delete ${selectedItems.length} items?`)) {
            // API call to delete
            setSelectedItems([]);
        }
    };

    return (
        <div className="admin-content-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Content Management</h1>
                    <p className="page-subtitle">Manage all your articles, events, and resources</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary" onClick={() => navigate('/admin/content/new')}>
                        <i className="fas fa-plus"></i> New Content
                    </button>
                    <button className="logout-btn-admin" onClick={handleLogout} title="Logout" style={{ marginLeft: '1rem' }}>
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="filters-section">
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="review">In Review</option>
                    </select>

                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <button className="btn-outline" onClick={() => {
                        setSearchTerm("");
                        setFilterStatus("all");
                        setFilterCategory("all");
                    }}>
                        <i className="fas fa-undo"></i> Reset
                    </button>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
                <div className="bulk-actions">
                    <span>{selectedItems.length} items selected</span>
                    <div>
                        <button className="btn-outline" onClick={handleBulkDelete}>
                            <i className="fas fa-trash"></i> Delete
                        </button>
                        <button className="btn-outline">
                            <i className="fas fa-copy"></i> Duplicate
                        </button>
                        <button className="btn-outline">
                            <i className="fas fa-tag"></i> Change Category
                        </button>
                    </div>
                </div>
            )}

            {/* Content Table */}
            <div className="table-container">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th className="checkbox-col">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === contentData.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Views</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContent.map((item) => (
                            <tr key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                                <td className="checkbox-col">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                </td>
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
                                <td>{item.date}</td>
                                <td>{item.views.toLocaleString()}</td>
                                <td>
                                    <code className="slug-code">{item.slug}</code>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn edit" onClick={() => navigate(`/admin/content/edit/${item.id}`)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="action-btn view" onClick={() => navigate(`/news-corner/${item.id}`)}>
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="action-btn delete" onClick={() => {
                                            if (window.confirm(`Delete "${item.title}"?`)) {
                                                // API call
                                            }
                                        }}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredContent.length === 0 && (
                    <div className="no-results">
                        <i className="fas fa-file-alt"></i>
                        <h3>No content found</h3>
                        <p>Try adjusting your filters or create new content</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <div className="pagination-info">
                    Showing 1-{filteredContent.length} of {filteredContent.length} items
                </div>
                <div className="pagination-controls">
                    <button className="page-btn" disabled>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="page-btn">4</button>
                    <span>...</span>
                    <button className="page-btn">10</button>
                    <button className="page-btn">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;