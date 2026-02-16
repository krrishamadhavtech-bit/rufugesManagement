import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { fetchCategories, addCategory, updateCategory, deleteCategory, fetchSubCategories, addSubCategory, updateSubCategory, deleteSubCategory } from "../../../services/category";

const CategoryManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };

    const loadCategories = async () => {
        setLoading(true);
        try {
            const response = await fetchCategories();
            if (response.statusCode === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to load categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name_en: "",
        name_hi: "",
        name_gu: "",
        desc_en: "",
        desc_hi: "",
        desc_gu: "",
        active: true,
        iconFile: null
    });

    // Sub-category state
    const [showSubModal, setShowSubModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [loadingSubs, setLoadingSubs] = useState(false);
    const [editingSubId, setEditingSubId] = useState(null);
    const [subCategoryFormData, setSubCategoryFormData] = useState({
        name_en: "",
        name_hi: "",
        name_gu: "",
        content_en: "",
        content_hi: "",
        content_gu: ""
    });

    const handleOpenSubModal = async (category) => {
        setSelectedCategory(category);
        setShowSubModal(true);
        setLoadingSubs(true);
        try {
            const response = await fetchSubCategories(category._id);
            if (response.success) {
                setSubCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to load sub-categories:", error);
        } finally {
            setLoadingSubs(false);
        }
    };

    const handleCloseSubModal = () => {
        setShowSubModal(false);
        setEditingSubId(null);
        setSubCategoryFormData({
            name_en: "",
            name_hi: "",
            name_gu: "",
            content_en: "",
            content_hi: "",
            content_gu: ""
        });
    };

    const handleSubInputChange = (e) => {
        const { name, value } = e.target;
        setSubCategoryFormData({
            ...subCategoryFormData,
            [name]: value
        });
    };

    const handleSubSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                ...subCategoryFormData,
                categoryId: selectedCategory._id
            };
            if (editingSubId) {
                const response = await updateSubCategory(editingSubId, payload);
                if (response.statusCode === 200) {
                    alert("Sub-category updated successfully!");
                    setEditingSubId(null);
                }
            } else {
                const response = await addSubCategory(payload);
                if (response.statusCode === 201) {
                    alert("Sub-category added successfully!");
                }
            }

            // Refresh sub-categories
            const subResponse = await fetchSubCategories(selectedCategory._id);
            if (subResponse.success) {
                setSubCategories(subResponse.data);
            }
            // Reset form
            setSubCategoryFormData({
                name_en: "",
                name_hi: "",
                name_gu: "",
                content_en: "",
                content_hi: "",
                content_gu: ""
            });
        } catch (error) {
            console.error("Failed to add sub-category:", error);
            alert("Failed to add sub-category.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                iconFile: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : (value || "")
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingId) {
                const response = await updateCategory(editingId, formData);
                if (response.statusCode === 200) {
                    alert("Category updated successfully!");
                    loadCategories();
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                        name_en: "",
                        name_hi: "",
                        name_gu: "",
                        desc_en: "",
                        desc_hi: "",
                        desc_gu: "",
                        active: true,
                        iconFile: null
                    });
                }
            } else {
                const response = await addCategory(formData);
                if (response.statusCode === 201) {
                    alert("Category created successfully!");
                    loadCategories();
                    setShowForm(false);
                    setFormData({
                        name_en: "",
                        name_hi: "",
                        name_gu: "",
                        desc_en: "",
                        desc_hi: "",
                        desc_gu: "",
                        active: true,
                        iconFile: null
                    });
                }
            }
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to save category. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setFormData({
            name_en: category.name || "", // Assuming name might be an object or string
            name_hi: category.name_hi || "",
            name_gu: category.name_gu || "",
            desc_en: category.description || "",
            desc_hi: category.description_hi || "",
            desc_gu: category.description_gu || "",
            active: category.active,
            iconFile: null
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category? This will affect all content in this category.")) {
            try {
                const response = await deleteCategory(id);
                if (response.statusCode === 200) {
                    alert("Category deleted successfully!");
                    loadCategories();
                }
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete category.");
            }
        }
    };

    const handleSubEdit = (sub) => {
        setEditingSubId(sub._id);
        setSubCategoryFormData({
            name_en: sub.name || "",
            name_hi: sub.name_hi || "",
            name_gu: sub.name_gu || "",
            content_en: sub.content || "",
            content_hi: sub.content_hi || "",
            content_gu: sub.content_gu || ""
        });
    };

    const handleSubDelete = async (subId) => {
        if (window.confirm("Are you sure you want to delete this sub-category?")) {
            try {
                const response = await deleteSubCategory(subId);
                if (response.statusCode === 200) {
                    alert("Sub-category deleted successfully!");
                    // Refresh sub-categories
                    const subResponse = await fetchSubCategories(selectedCategory._id);
                    if (subResponse.success) {
                        setSubCategories(subResponse.data);
                    }
                }
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete sub-category.");
            }
        }
    };

    const handleToggleActive = (id) => {
        // API call to toggle status
    };

    return (
        <div className="category-management-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Category Management</h1>
                    <p className="page-subtitle">Organize your content with categories</p>
                </div>
                <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button className="btn-primary" onClick={() => {
                        setEditingId(null);
                        setFormData({
                            name_en: "",
                            name_hi: "",
                            name_gu: "",
                            desc_en: "",
                            desc_hi: "",
                            desc_gu: "",
                            active: true,
                            iconFile: null
                        });
                        setShowForm(!showForm);
                    }}>
                        <i className="fas fa-plus"></i> New Category
                    </button>
                    <button className="logout-btn-admin" onClick={handleLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>

            {/* Category Form */}
            {showForm && (
                <div className="category-form-card">
                    <h3>{editingId ? 'Edit Category' : 'Create New Category'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Category Name (English)</label>
                                <input
                                    type="text"
                                    name="name_en"
                                    value={formData.name_en}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Housing, Policy, Events"
                                    required={editingId ? false : true}
                                />
                            </div>
                            <div className="form-group">
                                <label>શ્રેણીનું નામ (ગુજરાતી)</label>
                                <input
                                    type="text"
                                    name="name_gu"
                                    value={formData.name_gu}
                                    onChange={handleInputChange}
                                    placeholder="દા.ત., ગૃહનિર્માણ, નીતિ, ઘટનાઓ"
                                    required={editingId ? false : true}
                                />
                            </div>
                            <div className="form-group">
                                <label>श्रेणी नाम (Hindi)</label>
                                <input
                                    type="text"
                                    name="name_hi"
                                    value={formData.name_hi}
                                    onChange={handleInputChange}
                                    placeholder="उदाहरण के लिए, आवास, नीति, घटनाएँ"
                                    required={editingId ? false : true}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description (English)</label>
                            <textarea
                                name="desc_en"
                                value={formData.desc_en}
                                onChange={handleInputChange}
                                rows="2"
                                placeholder="Brief description of this category"
                            />
                        </div>
                        <div className="form-group">
                            <label>विवरण (Hindi)</label>
                            <textarea
                                name="desc_hi"
                                value={formData.desc_hi}
                                onChange={handleInputChange}
                                rows="2"
                                placeholder="इस श्रेणी का संक्षिप्त विवरण"
                            />
                        </div>
                        <div className="form-group">
                            <label>વર્ણન (ગુજરાતી)</label>
                            <textarea
                                name="desc_gu"
                                value={formData.desc_gu}
                                onChange={handleInputChange}
                                rows="2"
                                placeholder="આ શ્રેણીનું સંક્ષિપ્ત વર્ણન"
                            />
                        </div>

                        <div className="form-group">
                            <label>Category Icon</label>
                            <input
                                type="file"
                                name="iconFile"
                                onChange={handleInputChange}
                                accept="image/*"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleInputChange}
                                    />
                                    Active (visible on site)
                                </label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                            <button disabled={submitting} type="submit" className="btn-primary">
                                {submitting ? 'Saving...' : (editingId ? 'Update Category' : 'Create Category')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Categories Table */}
            <div className="table-container">
                <table className="categories-table">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading categories...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No categories found</td></tr>
                        ) : categories.map((category, index) => (
                            <tr key={category._id || index}>
                                <td className="category-id">{index + 1}</td>
                                <td className="category-name">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {category.icon?.url && <img src={category.icon.url} alt="" style={{ width: '30px', height: '30px', borderRadius: '4px' }} />}
                                    </div>
                                </td>
                                <td className="category-name">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {category.name}
                                    </div>
                                </td>
                                <td className="category-description">{category.description}</td>
                                <td>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={!category.active}
                                            onChange={() => handleToggleActive(category.id)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn sub" onClick={() => handleOpenSubModal(category)} title="Manage Subcategories">
                                            <i className="fas fa-list-ul"></i>
                                        </button>
                                        <button className="action-btn edit" onClick={() => handleEdit(category)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="action-btn delete" onClick={() => handleDelete(category._id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Category Stats */}
            <div className="category-stats">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#38a9a315', color: '#38a9a3' }}>
                        <i className="fas fa-tags"></i>
                    </div>
                    <div>
                        <span className="stat-label">Total Categories</span>
                        <span className="stat-value">{categories.length}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#517ea815', color: '#517ea8' }}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <span className="stat-label">Active Categories</span>
                        <span className="stat-value">{categories.filter(c => c.active).length}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#517ea815', color: '#517ea8' }}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <span className="stat-label">Inactive Categories</span>
                        <span className="stat-value">{categories.filter(c => !c.active).length}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#b86f7a15', color: '#b86f7a' }}>
                        <i className="fas fa-file-alt"></i>
                    </div>
                    <div>
                        <span className="stat-label">Total Content</span>
                        <span className="stat-value">{categories.reduce((acc, cat) => acc + (Number(cat.contentCount) || 0), 0)}</span>
                    </div>
                </div>
            </div>
            {/* Sub-category Modal */}
            {showSubModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Manage Sub-categories: {selectedCategory?.name}</h2>
                            <button className="close-btn" onClick={handleCloseSubModal}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* Sub-category Form */}
                            <form className="sub-category-form" onSubmit={handleSubSubmit}>
                                <h3>{editingSubId ? 'Edit Sub-category' : 'Add New Sub-category'}</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Sub-category Name (EN)</label>
                                        <input type="text" name="name_en" value={subCategoryFormData.name_en} onChange={handleSubInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>શ્રેણીનું નામ (GU)</label>
                                        <input type="text" name="name_gu" value={subCategoryFormData.name_gu} onChange={handleSubInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>श्रेणी नाम (HI)</label>
                                        <input type="text" name="name_hi" value={subCategoryFormData.name_hi} onChange={handleSubInputChange} required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Content (EN)</label>
                                        <textarea name="content_en" value={subCategoryFormData.content_en} onChange={handleSubInputChange} rows="2" required />
                                    </div>
                                    <div className="form-group">
                                        <label>વર્ણન (GU)</label>
                                        <textarea name="content_gu" value={subCategoryFormData.content_gu} onChange={handleSubInputChange} rows="2" required />
                                    </div>
                                    <div className="form-group">
                                        <label>विवरण (HI)</label>
                                        <textarea name="content_hi" value={subCategoryFormData.content_hi} onChange={handleSubInputChange} rows="2" required />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    {editingSubId && (
                                        <button type="button" className="btn-outline" onClick={() => {
                                            setEditingSubId(null);
                                            setSubCategoryFormData({
                                                name_en: "", name_hi: "", name_gu: "",
                                                content_en: "", content_hi: "", content_gu: ""
                                            });
                                        }}>Cancel Edit</button>
                                    )}
                                    <button disabled={submitting} type="submit" className="btn-primary">
                                        {submitting ? 'Saving...' : (editingSubId ? 'Update Sub-category' : 'Add Sub-category')}
                                    </button>
                                </div>
                            </form>

                            {/* Sub-category Table */}
                            <div className="sub-table-container">
                                <h3>Existing Sub-categories</h3>
                                {loadingSubs ? (
                                    <div className="loading-spinner">Loading...</div>
                                ) : subCategories.length === 0 ? (
                                    <p style={{ textAlign: 'center', padding: '2rem', color: '#6b7a8c' }}>No sub-categories found.</p>
                                ) : (
                                    <table className="sub-categories-table">
                                        <thead>
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Name</th>
                                                <th>Content</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subCategories.map((sub, idx) => (
                                                <tr key={sub._id || idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{sub.name}</td>
                                                    <td style={{ fontSize: '0.85rem', color: '#6b7a8c' }}>{sub.content}</td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <button className="action-btn edit" onClick={() => handleSubEdit(sub)}>
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button className="action-btn delete" onClick={() => handleSubDelete(sub._id)}>
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;