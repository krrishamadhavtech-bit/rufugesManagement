import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { fetchNews, addNews, updateNews, deleteNews } from "../../../services/news";

const NewsManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };

    const loadNews = async () => {
        setLoading(true);
        try {
            const response = await fetchNews();
            if (response.statusCode === 200) {
                setNewsList(response.data);
            }
        } catch (error) {
            console.error("Failed to load news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNews();
    }, []);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        headline_en: "",
        headline_hi: "",
        headline_gu: "",
        description_en: "",
        description_hi: "",
        description_gu: "",
        date: new Date().toISOString().split('T')[0],
        active: true,
        imageFile: null,
        imagePreview: null
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : (value || "")
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingId) {
                const response = await updateNews(editingId, formData);
                if (response.statusCode === 200) {
                    alert("News updated successfully!");
                    loadNews();
                    setShowForm(false);
                    setEditingId(null);
                    resetForm();
                }
            } else {
                const response = await addNews(formData);
                if (response.statusCode === 201) {
                    alert("News created successfully!");
                    loadNews();
                    setShowForm(false);
                    resetForm();
                }
            }
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to save news. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            headline_en: "",
            headline_hi: "",
            headline_gu: "",
            description_en: "",
            description_hi: "",
            description_gu: "",
            date: new Date().toISOString().split('T')[0],
            active: true,
            imageFile: null,
            imagePreview: null
        });
        setEditingId(null);
    };

    const handleEdit = (news) => {
        setEditingId(news._id);
        setFormData({
            headline_en: news.headline?.en || "",
            headline_hi: news.headline?.hi || "",
            headline_gu: news.headline?.gu || "",
            description_en: news.description?.en || "",
            description_hi: news.description?.hi || "",
            description_gu: news.description?.gu || "",
            date: news.date ? news.date.split('T')[0] : new Date().toISOString().split('T')[0],
            active: news.active !== undefined ? news.active : true,
            imageFile: null,
            imagePreview: news.image?.url || null
        });
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setDeleteTarget(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        try {
            const response = await deleteNews(deleteTarget);
            if (response.statusCode === 200) {
                alert("News deleted successfully!");
                loadNews();
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete news.");
        } finally {
            setShowDeleteModal(false);
            setDeleteTarget(null);
        }
    };

    // Helper for HTML formatting
    const insertTag = (fieldName, tag) => {
        const textarea = document.getElementsByName(fieldName)[0];
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = formData[fieldName];
        const selectedText = text.substring(start, end);

        const openTag = `<${tag}>`;
        const closeTag = `</${tag}>`;

        const newText = text.substring(0, start) + openTag + selectedText + closeTag + text.substring(end);

        setFormData({
            ...formData,
            [fieldName]: newText
        });

        // Refocus and set selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + openTag.length, end + openTag.length);
        }, 0);
    };

    const Toolbar = ({ fieldName }) => (
        <div className="editor-toolbar" style={{ marginBottom: '5px', display: 'flex', gap: '5px' }}>
            <button type="button" onClick={() => insertTag(fieldName, 'b')} title="Bold" style={toolbarBtnStyle}><b>B</b></button>
            <button type="button" onClick={() => insertTag(fieldName, 'i')} title="Italic" style={toolbarBtnStyle}><i>I</i></button>
            <button type="button" onClick={() => insertTag(fieldName, 'u')} title="Underline" style={toolbarBtnStyle}><u>U</u></button>
            <button type="button" onClick={() => insertTag(fieldName, 'h2')} title="H2" style={toolbarBtnStyle}>H2</button>
            <button type="button" onClick={() => insertTag(fieldName, 'h3')} title="H3" style={toolbarBtnStyle}>H3</button>
            <button type="button" onClick={() => insertTag(fieldName, 'p')} title="Paragraph" style={toolbarBtnStyle}>P</button>
            <button type="button" onClick={() => insertTag(fieldName, 'br')} title="Break" style={toolbarBtnStyle}>BR</button>
        </div>
    );

    const toolbarBtnStyle = {
        padding: '2px 8px',
        fontSize: '12px',
        cursor: 'pointer',
        border: '1px solid #ddd',
        background: '#f9f9f9',
        borderRadius: '3px'
    };

    return (
        <div className="category-management-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">News Management</h1>
                    <p className="page-subtitle">Organize your News</p>
                </div>
                <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button className="btn-primary" onClick={() => {
                        resetForm();
                        setShowForm(!showForm);
                    }}>
                        <i className="fas fa-plus"></i> New News
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="category-form-card" style={{ marginBottom: '2rem' }}>
                    <h3>{editingId ? 'Edit News' : 'Create New News'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>News Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {formData.imagePreview && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={formData.imagePreview} alt="Preview" style={{ width: '100px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>News Title (English)</label>
                                <Toolbar fieldName="headline_en" />
                                <input
                                    type="text"
                                    name="headline_en"
                                    value={formData.headline_en}
                                    onChange={handleInputChange}
                                    placeholder="Enter English Title"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>સમાચાર શીર્ષક (Gujarati)</label>
                                <Toolbar fieldName="headline_gu" />
                                <input
                                    type="text"
                                    name="headline_gu"
                                    value={formData.headline_gu}
                                    onChange={handleInputChange}
                                    placeholder="ગુજરાતી શીર્ષક દાખલ કરો"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>समाचार शीर्षक (Hindi)</label>
                                <Toolbar fieldName="headline_hi" />
                                <input
                                    type="text"
                                    name="headline_hi"
                                    value={formData.headline_hi}
                                    onChange={handleInputChange}
                                    placeholder="हिंदी शीर्षक दर्ज करें"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description (English)</label>
                            <Toolbar fieldName="description_en" />
                            <textarea
                                name="description_en"
                                value={formData.description_en}
                                onChange={handleInputChange}
                                rows="4"
                                placeholder="Enter English Description (HTML allowed)"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>વર્ણન (Gujarati)</label>
                            <Toolbar fieldName="description_gu" />
                            <textarea
                                name="description_gu"
                                value={formData.description_gu}
                                onChange={handleInputChange}
                                rows="4"
                                placeholder="ગુજરાતી વર્ણન દાખલ કરો (HTML ને મંજૂરી છે)"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>विवरण (Hindi)</label>
                            <Toolbar fieldName="description_hi" />
                            <textarea
                                name="description_hi"
                                value={formData.description_hi}
                                onChange={handleInputChange}
                                rows="4"
                                placeholder="हिंदी विवरण दर्ज करें (HTML की अनुमति है)"
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                            <button disabled={submitting} type="submit" className="btn-primary">
                                {submitting ? 'Saving...' : (editingId ? 'Update News' : 'Create News')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="table-container">
                <table className="categories-table news-table">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Date</th>
                            <th>Headline (EN)</th>
                            <th>Description Snippet</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading news...</td></tr>
                        ) : newsList.length === 0 ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No news found</td></tr>
                        ) : newsList.map((news, index) => (
                            <tr key={news._id}>
                                <td>{index + 1}</td>
                                <td>{news.date ? new Date(news.date).toLocaleDateString() : 'N/A'}</td>
                                <td className="category-name" dangerouslySetInnerHTML={{ __html: news.headline?.en }}></td>
                                <td className="category-description">
                                    <div style={{ maxHeight: '60px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: news.description?.en }}></div>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn edit" onClick={() => handleEdit(news)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button type="button" className="action-btn delete" onClick={() => handleDelete(news._id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay" style={{ zIndex: 10000 }}>
                    <div className="modal-content" style={{ maxWidth: '400px', width: '90%' }}>
                        <div className="modal-header">
                            <h2>Confirm Deletion</h2>
                            <button className="close-btn" onClick={() => setShowDeleteModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p style={{ marginBottom: '1.5rem' }}>Are you sure you want to delete this news article?</p>
                            <div className="form-actions">
                                <button type="button" className="btn-outline" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button type="button" className="btn-primary" style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }} onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsManagement;