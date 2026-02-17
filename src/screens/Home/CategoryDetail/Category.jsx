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
          // if (response.data.length > 0) {
          //   setActiveSection(response.data[0]._id);
          // }
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

  // Scroll spy effect - automatically activates sidebar item based on scroll position
  // Scroll spy effect removed for Master-Detail view
  // useEffect(() => {
  //   if (subCategories.length === 0) return;
  //   const handleScroll = () => { ... };
  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll();
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [subCategories, activeSection]);

  const handleNavClick = (id) => {
    setActiveSection(id);
    // Scroll behavior removed for Master-Detail view
  };

  // Sample available houses data with real images
  const availableHouses = [
    {
      id: 1,
      title: "Modern 2-Room Apartment",
      location: "Nørrebro, Copenhagen",
      price: "€1,450",
      size: "68m²",
      rooms: "2",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
      availability: "Available now",
      features: ["Balcony", "Elevator", "Pet friendly"]
    },
    {
      id: 2,
      title: "Cozy Studio in City Center",
      location: "Indre By, Copenhagen",
      price: "€1,250",
      size: "42m²",
      rooms: "1",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
      availability: "Available from March 1",
      features: ["Furnished", "High speed internet", "Washer"]
    },
    {
      id: 3,
      title: "Family Apartment with Balcony",
      location: "Østerbro, Copenhagen",
      price: "€2,100",
      size: "95m²",
      rooms: "3",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
      availability: "Available now",
      features: ["Balcony", "Parking", "Dishwasher"]
    },
    {
      id: 4,
      title: "Luxury Penthouse",
      location: "Frederiksberg, Copenhagen",
      price: "€3,200",
      size: "120m²",
      rooms: "4",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&q=80",
      availability: "Available April 1",
      features: ["Roof terrace", "Jacuzzi", "Smart home"]
    }
  ];

  return (
    <div className="category-container">
      {/* Left Sidebar - In this section - with elegant spacing */}
      <div className="section-sidebar">
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
          <div className="placeholder-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: '100vh',
            color: '#6b7a8c',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <img
              src="https://www.paulkrameronline.com/wp-content/uploads/2018/11/refugees-image.jpg"
              alt="Select a category"
              style={{
                width: '100%',
                maxWidth: '900px',
                marginBottom: '2rem',
                borderRadius: '12px',
                opacity: 0.8
              }}
            />
            <h2>Select a topic to get started</h2>
            <p>Choose a sub-category from the menu to view detailed guides and information.</p>
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