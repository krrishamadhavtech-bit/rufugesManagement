import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style.css";

const ContentEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: isEditing ? "New Rental Reform Act" : "",
        slug: isEditing ? "rental-reform-act" : "",
        category: isEditing ? "Policy" : "",
        content: isEditing ? "<h2>Overview</h2><p>The Danish government has passed sweeping reforms that will affect tenants and landlords alike. These new regulations aim to create a more balanced rental market while ensuring affordable housing for residents.</p><h2>Key Changes</h2><ul><li>Rent increase caps at 2% annually</li><li>Extended notice periods for long-term tenants</li><li>New energy efficiency requirements for rentals</li><li>Digital rent payment system mandatory by 2025</li></ul><p>For more information, visit the <a href='https://example.com'>Ministry of Housing website</a>.</p>" : "",
        source: isEditing ? "Ministry of Housing" : "",
        status: isEditing ? "published" : "draft"
    });

    const [saving, setSaving] = useState(false);
    const [showToolbar, setShowToolbar] = useState(true);
    const [selectedText, setSelectedText] = useState({ start: 0, end: 0 });

    const categories = ["Housing", "Policy", "Events", "Education", "Legal", "Community", "Health"];

    // Auto-generate slug from title
    useEffect(() => {
        if (formData.title && !isEditing) {
            const generatedSlug = formData.title
                .toLowerCase()
                .replace(/[^\w\s]/g, '')
                .replace(/\s+/g, '-');
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [formData.title, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (publish = false) => {
        setSaving(true);
        // API call to save
        setTimeout(() => {
            setSaving(false);
            navigate('/admin/content');
        }, 1000);
    };

    // Rich text editor functions
    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        document.getElementById('content-editor').focus();
    };

    const handleTextSelection = () => {
        const textarea = document.getElementById('content-editor');
        setSelectedText({
            start: textarea.selectionStart,
            end: textarea.selectionEnd
        });
    };

    const insertFormatting = (before, after) => {
        const textarea = document.getElementById('content-editor');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = formData.content.substring(start, end);
        const newContent = formData.content.substring(0, start) +
            before + selected + after +
            formData.content.substring(end);

        setFormData({ ...formData, content: newContent });

        // Restore selection after update
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + before.length,
                end + before.length
            );
        }, 0);
    };

    const insertHeading = (level) => {
        insertFormatting(`<h${level}>`, `</h${level}>`);
    };

    const insertBold = () => {
        insertFormatting('<strong>', '</strong>');
    };

    const insertItalic = () => {
        insertFormatting('<em>', '</em>');
    };

    const insertUnderline = () => {
        insertFormatting('<u>', '</u>');
    };

    const insertBulletList = () => {
        const textarea = document.getElementById('content-editor');
        const start = textarea.selectionStart;
        const selected = formData.content.substring(start, textarea.selectionEnd);

        if (selected) {
            // Convert selected lines to list items
            const lines = selected.split('\n');
            const listItems = lines.map(line => `<li>${line}</li>`).join('');
            insertFormatting('<ul>', '</ul>');
        } else {
            // Insert empty list
            insertFormatting('<ul>\n  <li>', '</li>\n</ul>');
        }
    };

    const insertLink = () => {
        const url = prompt('Enter URL:', 'https://');
        if (url) {
            const textarea = document.getElementById('content-editor');
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selected = formData.content.substring(start, end);

            if (selected) {
                insertFormatting(`<a href="${url}" target="_blank">`, '</a>');
            } else {
                insertFormatting(`<a href="${url}" target="_blank">link</a>`, '');
            }
        }
    };

    return (
        <div className="content-editor-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{isEditing ? 'Edit Content' : 'Create New Content'}</h1>
                    <p className="page-subtitle">{isEditing ? 'Update your existing content' : 'Add new content to your site'}</p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline" onClick={() => navigate('/admin/content')}>
                        Cancel
                    </button>
                    <button
                        className="btn-primary"
                        onClick={() => handleSave(false)}
                        disabled={saving}
                    >
                        {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                        Save Draft
                    </button>
                    <button
                        className="btn-success"
                        onClick={() => handleSave(true)}
                        disabled={saving}
                    >
                        <i className="fas fa-globe"></i>
                        Publish
                    </button>
                </div>
            </div>

            <div className="editor-grid">
                {/* Main Content Column */}
                <div className="editor-main">
                    {/* Title */}
                    <div className="form-group">
                        <label>Title <span className="required">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter a compelling title"
                            className="title-input"
                        />
                    </div>

                    {/* Slug */}
                    <div className="form-group">
                        <label>Slug (auto-generated, editable)</label>
                        <div className="slug-input-group">
                            <span className="slug-prefix">/news-corner/</span>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="url-friendly-identifier"
                            />
                        </div>
                        <small className="help-text">URL-friendly version of the title. Auto-generated from title.</small>
                    </div>

                    {/* Rich Text Editor with Toolbar */}
                    <div className="form-group">
                        <label>Content <span className="required">*</span></label>
                        <div className="rich-editor-wrapper">
                            <div className="editor-toolbar">
                                <button
                                    type="button"
                                    onClick={() => insertHeading(2)}
                                    className="toolbar-btn"
                                    title="Heading 2"
                                >
                                    H2
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertHeading(3)}
                                    className="toolbar-btn"
                                    title="Heading 3"
                                >
                                    H3
                                </button>
                                <div className="toolbar-divider"></div>
                                <button
                                    type="button"
                                    onClick={insertBold}
                                    className="toolbar-btn"
                                    title="Bold"
                                >
                                    <i className="fas fa-bold"></i>
                                </button>
                                <button
                                    type="button"
                                    onClick={insertItalic}
                                    className="toolbar-btn"
                                    title="Italic"
                                >
                                    <i className="fas fa-italic"></i>
                                </button>
                                <button
                                    type="button"
                                    onClick={insertUnderline}
                                    className="toolbar-btn"
                                    title="Underline"
                                >
                                    <i className="fas fa-underline"></i>
                                </button>
                                <div className="toolbar-divider"></div>
                                <button
                                    type="button"
                                    onClick={insertBulletList}
                                    className="toolbar-btn"
                                    title="Bullet List"
                                >
                                    <i className="fas fa-list-ul"></i>
                                </button>
                                <div className="toolbar-divider"></div>
                                <button
                                    type="button"
                                    onClick={insertLink}
                                    className="toolbar-btn"
                                    title="Insert Link"
                                >
                                    <i className="fas fa-link"></i>
                                </button>
                            </div>
                            <textarea
                                id="content-editor"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                onSelect={handleTextSelection}
                                onClick={handleTextSelection}
                                onKeyUp={handleTextSelection}
                                placeholder="Write your content here..."
                                rows={20}
                                className="rich-textarea"
                            />
                            <div className="editor-footer">
                                <small className="help-text">
                                    Use toolbar for formatting: Headings, Bold, Italic, Lists, Links
                                </small>
                                <small className="char-count">
                                    {formData.content.length} characters
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="editor-sidebar">
                    {/* Publish Settings */}
                    <div className="sidebar-card">
                        <h4>Publish Settings</h4>

                        <div className="sidebar-field">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="sidebar-field">
                            <label>Category <span className="required">*</span></label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="sidebar-field">
                            <label>Source / Organization name</label>
                            <input
                                type="text"
                                name="source"
                                value={formData.source}
                                onChange={handleChange}
                                placeholder="e.g., Ministry of Housing"
                            />
                        </div>

                        <div className="sidebar-stats">
                            <div className="stat-row">
                                <span>Word count:</span>
                                <strong>{formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w).length}</strong>
                            </div>
                            <div className="stat-row">
                                <span>Reading time:</span>
                                <strong>{Math.ceil(formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w).length / 200)} min</strong>
                            </div>
                        </div>
                    </div>

                    {/* Save Options */}
                    <div className="sidebar-card">
                        <h4>Actions</h4>
                        <button className="sidebar-btn preview">
                            <i className="fas fa-eye"></i> Preview
                        </button>
                        <button className="sidebar-btn duplicate">
                            <i className="fas fa-copy"></i> Duplicate
                        </button>
                        <button className="sidebar-btn delete">
                            <i className="fas fa-trash"></i> Move to Trash
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentEditor;