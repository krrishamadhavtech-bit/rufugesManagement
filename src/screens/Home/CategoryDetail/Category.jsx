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
  const [activeSection, setActiveSection] = useState("");

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
          if (response.data.length > 0) {
            setActiveSection(response.data[0]._id);
          }
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

    if (sectionId && sectionRefs.current[sectionId]) {
      setActiveSection(sectionId);
      setTimeout(() => {
        sectionRefs.current[sectionId].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [location.pathname, loading, subCategories]);

  // Scroll spy effect - automatically activates sidebar item based on scroll position
  useEffect(() => {
    if (subCategories.length === 0) return;

    const handleScroll = () => {
      let current = activeSection;
      let minDistance = Infinity;

      Object.entries(sectionRefs.current).forEach(([key, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const distance = Math.abs(rect.top - 180);
          if (distance < minDistance) {
            minDistance = distance;
            current = key;
          }
        }
      });

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [subCategories, activeSection]);

  const handleNavClick = (id) => {
    setActiveSection(id);

    // Scroll to section
    if (sectionRefs.current[id]) {
      sectionRefs.current[id].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Update URL if needed, or keep it simple
    // window.history.pushState(null, '', `/Category/${id}`);
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

        <h3 className="sidebar-title">IN THIS SECTION</h3>
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

        {/* Sidebar Decorative Element - elegant */}
        <div className="sidebar-decoration">
          <div className="decoration-icon">
            <i className="fas fa-house-circle-check"></i>
          </div>
          <div className="decoration-text">
            <p>Housing guidance</p>
            <span>since 2024</span>
          </div>
        </div>
      </div>

      {/* Main Content Area - Full Width Layout with beautiful spacing */}
      <div className="main-content-full">
        {/* Hero Section with Title - elegant spacing */}
        <div className="hero-section-elegant">
          <div className="hero-badge">WELCOME TO</div>
          <h2 className="hero-title-elegant">Finding home in a new country.</h2>
          <div className="hero-divider"></div>
          <div className="hero-text-elegant">
            <p>
              Every year, thousands of people relocate to Denmark for work, study, or family.
              Securing housing is often the biggest challenge - with low vacancy rates, complex
              contracts, and unfamiliar rental practices.
            </p>
          </div>
        </div>

        {/* Copenhagen Housing Market Map - Beautiful card */}
        <div className="market-map-elegant">
          <div className="market-map-header">
            <div className="market-icon-wrapper">
              <i className="fas fa-map-location-dot"></i>
            </div>
            <div className="market-title-wrapper">
              <span className="market-subtitle">MARKET DATA</span>
              <h3>Copenhagen Housing Market</h3>
            </div>
          </div>

          <div className="market-stats-elegant">
            <div className="market-stat-card-elegant">
              <span className="market-stat-value">€1,650</span>
              <span className="market-stat-label">avg. monthly rent</span>
              <span className="market-stat-desc">2-room apartment</span>
            </div>
            <div className="market-stat-divider"></div>
            <div className="market-stat-card-elegant">
              <span className="market-stat-value">2.8%</span>
              <span className="market-stat-label">vacancy rate</span>
              <span className="market-stat-desc">city-wide</span>
            </div>
            <div className="market-stat-divider"></div>
            <div className="market-stat-card-elegant">
              <span className="market-stat-value">14</span>
              <span className="market-stat-label">days avg.</span>
              <span className="market-stat-desc">search time</span>
            </div>
          </div>

          <div className="market-map-footer">
            <i className="fas fa-info-circle"></i>
            <p>Interactive map: Rental prices by district (2026)</p>
          </div>
        </div>

        {/* Dynamic Sections Based on Sub-Categories */}
        {subCategories.map((sub, index) => (
          <div
            key={sub._id}
            id={`${sub._id}-section`}
            ref={el => sectionRefs.current[sub._id] = el}
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
              {index === 0 && (
                <span className="section-badge-elegant" style={{ background: '#38a9a3', color: 'white' }}>
                  ESSENTIAL
                </span>
              )}
            </div>

            <div className="section-description-elegant">
              <div dangerouslySetInnerHTML={{ __html: sub.content }} />
            </div>

            <div className="action-link-elegant">
              <span>View full guide for {sub.name}</span>
              <div className="arrow-circle">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        ))}

        {/* AVAILABLE HOUSES - Beautiful grid with spacing */}
        <div className="available-houses-elegant">
          <div className="section-header-elegant">
            <div className="section-title-elegant">
              <div className="section-icon-wrapper" style={{ background: '#38a9a315' }}>
                <i className="fas fa-building" style={{ color: '#38a9a3' }}></i>
              </div>
              <div className="title-wrapper">
                <span className="section-tag" style={{ color: '#38a9a3' }}>LISTINGS</span>
                <h3>Available apartments in Copenhagen</h3>
              </div>
            </div>
            <a href="#" className="view-all-elegant">
              <span>View all</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="houses-grid-elegant">
            {availableHouses.map((house) => (
              <div key={house.id} className="house-card-elegant">
                <div className="house-image-wrapper">
                  <img src={house.image} alt={house.title} className="house-image" />
                  <span className="house-badge">{house.availability}</span>
                </div>
                <div className="house-content">
                  <h4 className="house-title">{house.title}</h4>
                  <p className="house-location">
                    <i className="fas fa-location-dot"></i> {house.location}
                  </p>
                  <div className="house-specs-elegant">
                    <span className="house-spec">
                      <i className="fas fa-arrows-alt"></i> {house.size}
                    </span>
                    <span className="house-spec">
                      <i className="fas fa-door-open"></i> {house.rooms} rooms
                    </span>
                    <span className="house-price">{house.price}</span>
                  </div>
                  <div className="house-features-elegant">
                    {house.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag-elegant">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="view-details-elegant">
                    View details <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips - Beautiful card */}
        <div className="quick-tips-elegant">
          <div className="tips-header-elegant">
            <div className="tips-icon-wrapper" style={{
              background: activeSection === "find-apartment" ? '#38a9a315' :
                activeSection === "rental-contracts" ? '#517ea815' :
                  activeSection === "landlord-problems" ? '#b86f7a15' : '#5c8d7f15'
            }}>
              <i className="fas fa-lightbulb" style={{
                color: activeSection === "find-apartment" ? '#38a9a3' :
                  activeSection === "rental-contracts" ? '#517ea8' :
                    activeSection === "landlord-problems" ? '#b86f7a' : '#5c8d7f'
              }}></i>
            </div>
            <div className="tips-title-wrapper">
              <span className="tips-subtitle">QUICK TIPS</span>
              <h4>for {activeSection === "find-apartment" ? "your apartment search" :
                activeSection === "rental-contracts" ? "reviewing your contract" :
                  activeSection === "landlord-problems" ? "resolving issues" : "temporary stays"}</h4>
            </div>
          </div>
          <div className="tips-grid-elegant">
            <div className="tip-card">
              <i className="fas fa-circle" style={{
                color: activeSection === "find-apartment" ? '#38a9a3' :
                  activeSection === "rental-contracts" ? '#517ea8' :
                    activeSection === "landlord-problems" ? '#b86f7a' : '#5c8d7f'
              }}></i>
              <span>Act within 24 hours of new listings</span>
            </div>
            <div className="tip-card">
              <i className="fas fa-circle" style={{
                color: activeSection === "find-apartment" ? '#38a9a3' :
                  activeSection === "rental-contracts" ? '#517ea8' :
                    activeSection === "landlord-problems" ? '#b86f7a' : '#5c8d7f'
              }}></i>
              <span>Have all documents ready before applying</span>
            </div>
            <div className="tip-card">
              <i className="fas fa-circle" style={{
                color: activeSection === "find-apartment" ? '#38a9a3' :
                  activeSection === "rental-contracts" ? '#517ea8' :
                    activeSection === "landlord-problems" ? '#b86f7a' : '#5c8d7f'
              }}></i>
              <span>Know your rights as a tenant in Denmark</span>
            </div>
            <div className="tip-card">
              <i className="fas fa-circle" style={{
                color: activeSection === "find-apartment" ? '#38a9a3' :
                  activeSection === "rental-contracts" ? '#517ea8' :
                    activeSection === "landlord-problems" ? '#b86f7a' : '#5c8d7f'
              }}></i>
              <span>Never pay deposit before signing contract</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;