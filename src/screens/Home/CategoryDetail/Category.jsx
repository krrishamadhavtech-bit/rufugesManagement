import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchSubCategories } from "../../../services/category";
import "./style.css";

// Assume these icons are from your CDN (Font Awesome)
const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // Refs for scroll spy - using a mutable object instead of individual useRefs
  const sectionRefs = useRef({});

  useEffect(() => {
    const getSubCategories = async () => {
      if (!categoryId) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetchSubCategories(categoryId);
        if (response.success) {
          setSubCategories(response.data);
          setSubCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching sub-categories:", error);
      } finally {
        setLoading(false);
      }
    };
    getSubCategories();
  }, [categoryId]);

  // Check URL params on initial load
  useEffect(() => {
    if (loading || subCategories.length === 0) return;

    const path = location.pathname;
    const sectionId = path.split('/').pop();

    // Check if the URL end part matches any subcategory ID
    const matchingSub = subCategories.find(sub => sub._id === sectionId);

    if (matchingSub) {
      setActiveSection(matchingSub._id);
    }
  }, [location.pathname, loading, subCategories]);


  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsSidebarOpen(false); // Close sidebar on selection (for mobile)
    // Scroll behavior removed for Master-Detail view
  };

  return (
    <div className="category-container">
      {/* Mobile Sidebar Toggle - Only visible on mobile */}
      <button
        className={`mobile-sidebar-toggle ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Overlay - Only visible when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Left Sidebar - In this section - with elegant spacing */}
      <div className={`section-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="brand-title">RAHA</h1>
          <div className="brand-underline"></div>
        </div>

        <h3 className="sidebar-title">SUB CATEGORIES</h3>
        <ul className="sidebar-nav">
          {subCategories.map((item) => (
            <li
              key={item._id}
              className={`nav-item ${activeSection === item._id ? 'active' : ''}`}
              onClick={() => handleNavClick(item._id)}
            >
              <div className="nav-icon-wrapper">
                {item.icon ? (
                  <img src={item.icon} alt={item.name} className="nav-icon-img" />
                ) : (
                  <i className="fas fa-circle-info"></i>
                )}
              </div>
              <span>{item.name}</span>
              {activeSection === item._id && (
                <div className="nav-active-indicator">
                  <i className="fas fa-chevron-right"></i>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content-full">
        {!activeSection ? (
          <div className="sub-categories-overview">
            <div className="overview-header">
              <span className="overview-tag">EXPLORE</span>
              <h2 className="overview-title">Sub Categories</h2>
              <div className="overview-divider"></div>
              <p className="overview-subtitle">
                Select a sub-category to view detailed information and resources.
              </p>
            </div>

            <div className="sub-categories-grid">
              {subCategories.map((sub) => (
                <div
                  key={sub._id}
                  className="sub-category-card-elegant"
                  onClick={() => handleNavClick(sub._id)}
                >
                  <div className="sub-card-icon-wrapper">
                    {sub.icon ? (
                      <img src={sub.icon} alt={sub.name} className="sub-card-icon-img" />
                    ) : (
                      <i className="fas fa-info-circle"></i>
                    )}
                  </div>
                  <div className="sub-card-content">
                    <span className="sub-card-tag">{sub.identifier || 'RESOURCES'}</span>
                    <h4 className="sub-card-name">{sub.name}</h4>
                    <p className="sub-card-description">
                      Click to explore guidelines and helpful information.
                    </p>
                    <button className="sub-card-action">
                      View Details <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          subCategories
            .filter(sub => sub._id === activeSection)
            .map((sub) => (
              <div
                key={sub._id}
                id={`${sub._id}-section`}
                className="section-detail-elegant"
              >
                <div className="section-header-elegant">
                  <div className="section-title-elegant">
                    <div className="section-icon-wrapper" style={{ background: '#38a9a315' }}>
                      {sub.icon ? (
                        <img src={sub.icon} alt={sub.name} className="section-icon-img" />
                      ) : (
                        <i className="fas fa-info-circle" style={{ color: '#38a9a3' }}></i>
                      )}
                    </div>
                    <div className="title-wrapper">
                      <span className="section-tag" style={{ color: '#38a9a3' }}>{sub.identifier || 'GUIDE'}</span>
                      <h3>{sub.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="section-description-elegant">
                  <div dangerouslySetInnerHTML={{ __html: sub.content }} />
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Category;