import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "../../../services/event";

const EventManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };

    const loadEvents = async () => {
        setLoading(true);
        try {
            const response = await fetchEvents();
            if (response.statusCode === 200) {
                setEventList(response.data);
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

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title_en: "",
        title_hi: "",
        title_gu: "",
        description_en: "",
        description_hi: "",
        description_gu: "",
        date: new Date().toISOString().split('T')[0],
        startTime: "09:00",
        endTime: "10:00",
        locationName: "",
        address: "",
        city: "",
        postalCode: "",
        organizerName: "",
        organizerEmail: "",
        organizerPhone: "",
        category: "Workshop",
        isActive: true
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Ensure all fields are exactly as required by the API
            const response = editingId
                ? await updateEvent(editingId, formData)
                : await addEvent(formData);

            if (response.statusCode === 200 || response.statusCode === 201) {
                alert(editingId ? "Event updated successfully!" : "Event created successfully!");
                loadEvents();
                setShowForm(false);
                setEditingId(null);
                resetForm();
            }
        } catch (error) {
            console.error("Submission failed:", error.response?.data || error);
            const errorMsg = error.response?.data?.errors
                ? JSON.stringify(error.response.data.errors)
                : "Failed to save event. Check console for details.";
            alert(`Submission failed: ${errorMsg}`);
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title_en: "",
            title_hi: "",
            title_gu: "",
            description_en: "",
            description_hi: "",
            description_gu: "",
            date: new Date().toISOString().split('T')[0],
            startTime: "09:00",
            endTime: "10:00",
            locationName: "",
            address: "",
            city: "",
            postalCode: "",
            organizerName: "",
            organizerEmail: "",
            organizerPhone: "",
            category: "Workshop",
            isActive: true
        });
        setEditingId(null);
    };

    const handleEdit = (event) => {
        setEditingId(event._id);
        setFormData({
            title_en: event.title?.en || "",
            title_hi: event.title?.hi || "",
            title_gu: event.title?.gu || "",
            description_en: event.description?.en || "",
            description_hi: event.description?.hi || "",
            description_gu: event.description?.gu || "",
            date: event.date ? event.date.split('T')[0] : new Date().toISOString().split('T')[0],
            startTime: event.startTime || "09:00",
            endTime: event.endTime || "10:00",
            locationName: event.locationName || "",
            address: event.address || "",
            city: event.city || "",
            postalCode: event.postalCode || "",
            organizerName: event.organizerName || "",
            organizerEmail: event.organizerEmail || "",
            organizerPhone: event.organizerPhone || "",
            category: event.category || "Workshop",
            isActive: event.isActive !== undefined ? event.isActive : true
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
            const response = await deleteEvent(deleteTarget);
            if (response.statusCode === 200) {
                alert("Event deleted successfully!");
                loadEvents();
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete event.");
        } finally {
            setShowDeleteModal(false);
            setDeleteTarget(null);
        }
    };

    return (
        <div className="category-management-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Event Management</h1>
                    <p className="page-subtitle">Schedule and organize community events</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary" onClick={() => {
                        resetForm();
                        setShowForm(!showForm);
                    }}>
                        <i className="fas fa-plus"></i> New Event
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="category-form-card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Event' : 'Create New Event'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Event Title (English)</label>
                                <input type="text" name="title_en" value={formData.title_en} onChange={handleInputChange} placeholder="English Title" required />
                            </div>
                            <div className="form-group">
                                <label>સમાચાર શીર્ષક (Gujarati)</label>
                                <input type="text" name="title_gu" value={formData.title_gu} onChange={handleInputChange} placeholder="ગુજરાતી શીર્ષક" required />
                            </div>
                            <div className="form-group">
                                <label>समाचार शीर्षक (Hindi)</label>
                                <input type="text" name="title_hi" value={formData.title_hi} onChange={handleInputChange} placeholder="हिंदी शीर्षक" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Start Time</label>
                                <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>End Time</label>
                                <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Location Name</label>
                                <input type="text" name="locationName" value={formData.locationName} onChange={handleInputChange} placeholder="e.g. City Hall" required />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address" required />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Postal Code</label>
                                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Postal Code" required />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange}>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Seminar">Seminar</option>
                                    <option value="Networking">Networking</option>
                                    <option value="Cultural">Cultural</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Organizer Name</label>
                                <input type="text" name="organizerName" value={formData.organizerName} onChange={handleInputChange} placeholder="Name" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description (English)</label>
                            <textarea name="description_en" value={formData.description_en} onChange={handleInputChange} rows="3" placeholder="Description in English" required />
                        </div>
                        <div className="form-group">
                            <label>વર્ણન (Gujarati)</label>
                            <textarea name="description_gu" value={formData.description_gu} onChange={handleInputChange} rows="3" placeholder="ગુજરાતી વર્ણન" required />
                        </div>
                        <div className="form-group">
                            <label>विवरण (Hindi)</label>
                            <textarea name="description_hi" value={formData.description_hi} onChange={handleInputChange} rows="3" placeholder="हिंदी विवरण" required />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Organizer Email</label>
                                <input type="email" name="organizerEmail" value={formData.organizerEmail} onChange={handleInputChange} placeholder="Email" required />
                            </div>
                            <div className="form-group">
                                <label>Organizer Phone</label>
                                <input type="text" name="organizerPhone" value={formData.organizerPhone} onChange={handleInputChange} placeholder="Phone Number" required />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                            <button disabled={submitting} type="submit" className="btn-primary">
                                {submitting ? 'Saving...' : (editingId ? 'Update Event' : 'Create Event')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="table-container">
                <table className="categories-table events-table">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Date & Time</th>
                            <th>Event Title (EN)</th>
                            <th>Location</th>
                            <th>Organizer</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading events...</td></tr>
                        ) : eventList.length === 0 ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No events found</td></tr>
                        ) : eventList.map((event, index) => (
                            <tr key={event._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div>{new Date(event.date).toLocaleDateString()}</div>
                                    <small style={{ color: '#64748b' }}>{event.startTime} - {event.endTime}</small>
                                </td>
                                <td className="category-name">{event.title?.en}</td>
                                <td>{event.city}</td>
                                <td>{event.organizerName}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn edit" onClick={() => handleEdit(event)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="action-btn delete" onClick={() => handleDelete(event._id)}>
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
                            <p style={{ marginBottom: '1.5rem' }}>Are you sure you want to delete this event?</p>
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

export default EventManagement;
