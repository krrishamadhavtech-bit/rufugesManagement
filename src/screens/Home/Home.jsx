import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./home.css";
import { fetchCategories } from "../../services/category";
import family from '../../assets/family.jpg';
import sunset from '../../assets/sunset.jpg';
import legal from '../../assets/legal.jpg';
import house from '../../assets/house.jpg';
import health from '../../assets/health.jpg';
import education from '../../assets/education.jpg';
import job from '../../assets/job.jpg';

function Home() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("home");
    const [aboutVisible, setAboutVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for animated counters
    const [projects, setProjects] = useState(0);
    const [lives, setLives] = useState(0);
    const [countries, setCountries] = useState(0);
    // Refs for scrolling
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);

    const navItems = ["Home", "About", "Contact", "News Corner", "Upcoming Events", "Settings"];

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetchCategories();
                if (response.statusCode === 200) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAboutVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Animate counters when about section is visible
    useEffect(() => {
        if (aboutVisible) {
            // Projects counter (150)
            const projectsInterval = setInterval(() => {
                setProjects(prev => {
                    if (prev < 150) {
                        return prev + 2;
                    }
                    clearInterval(projectsInterval);
                    return 150;
                });
            }, 20);

            // Lives counter (50K)
            const livesInterval = setInterval(() => {
                setLives(prev => {
                    if (prev < 50) {
                        return prev + 1;
                    }
                    clearInterval(livesInterval);
                    return 50;
                });
            }, 30);

            // Countries counter (12)
            const countriesInterval = setInterval(() => {
                setCountries(prev => {
                    if (prev < 12) {
                        return prev + 1;
                    }
                    clearInterval(countriesInterval);
                    return 12;
                });
            }, 50);

            return () => {
                clearInterval(projectsInterval);
                clearInterval(livesInterval);
                clearInterval(countriesInterval);
            };
        }
    }, [aboutVisible]);
    // Scroll to section function
    const scrollToSection = (section) => {
        setActiveTab(section.toLowerCase());

        switch (section.toLowerCase().replace(/\s+/g, '-')) {
            case 'home':
                homeRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'about-us':
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact-us':
                contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            default:
                break;
        }
    };

    // Reviews data
    const reviews = [
        {
            id: 1,
            name: "Ahmed Hassan",
            location: "Syria → Denmark",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
            text: "Raha helped me and my family find housing and healthcare when we arrived. They gave us hope when we needed it most.",
            date: "2 months ago"
        },
        {
            id: 2,
            name: "Fatima Al-Sayed",
            location: "Iraq → Denmark",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 5,
            text: "The Danish language course through Raha changed my life. I now have a job and can communicate with my children's teachers.",
            date: "1 week ago"
        },
        {
            id: 3,
            name: "Mohammed Karim",
            location: "Afghanistan → Denmark",
            image: "https://randomuser.me/api/portraits/men/46.jpg",
            rating: 4,
            text: "Clean water access project in my community has saved us hours of walking. Thank you Raha for your compassionate work.",
            date: "3 weeks ago"
        },
        {
            id: 4,
            name: "Layla Rahman",
            location: "Syria → Denmark",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 5,
            text: "Legal aid helped me get my residency permit. The volunteers are angels on earth.",
            date: "5 days ago"
        },
        {
            id: 5,
            name: "Omar Farooq",
            location: "Somalia → Denmark",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            rating: 5,
            text: "My children received school supplies and tutoring. Now they're top of their class!",
            date: "1 month ago"
        }
    ];

    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const nextReview = () => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <div className="home-container">
            {/* Hero Section - With ref for Home scroll */}
            <div ref={homeRef} id="home" className="hero-section">
                <div className="hero-overlay-image">
                    <img
                        src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Boy with helping hands"
                        className="hero-bg-img"
                    />
                    <div className="hero-overlay"></div>

                    <div className="hero-content-overlay">
                        <h1 className="hero-main-title">
                            Every Helping Hand,<br />Every Heartfelt Change
                        </h1>
                    </div>

                    {/* Animated Relatable Icons */}
                    <div className="floating-icons">
                        <div className="icon-wrapper heart-icon-1">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="white" fillOpacity="0.9" />
                            </svg>
                        </div>

                        <div className="icon-wrapper hands-icon-1">
                            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM11 6H13V14H11V6Z" fill="white" fillOpacity="0.8" />
                                <path d="M16 11C16 13.76 13.76 16 11 16C8.24 16 6 13.76 6 11C6 8.24 8.24 6 11 6C13.76 6 16 8.24 16 11Z" fill="white" fillOpacity="0.3" />
                            </svg>
                        </div>

                        <div className="icon-wrapper charity-box">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 6H3V4H21V6ZM19 8H5V20H19V8ZM4 3H20V5H4V3Z" fill="white" fillOpacity="0.85" />
                                <rect x="8" y="11" width="8" height="2" fill="white" fillOpacity="0.9" />
                                <rect x="8" y="14" width="6" height="2" fill="white" fillOpacity="0.7" />
                            </svg>
                        </div>

                        <div className="icon-wrapper water-drop">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C12 2 6 8 6 13C6 17.97 9.13 21 12 21C14.87 21 18 17.97 18 13C18 8 12 2 12 2ZM12 19C10.07 19 8 16.87 8 13.8C8 11.4 10.1 8.2 12 6.3C13.9 8.2 16 11.4 16 13.8C16 16.87 13.93 19 12 19Z" fill="white" fillOpacity="0.85" />
                            </svg>
                        </div>

                        <div className="icon-wrapper medical-cross">
                            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 10H14V6H10V10H6V14H10V18H14V14H18V10Z" fill="white" fillOpacity="0.9" />
                            </svg>
                        </div>

                        <div className="icon-wrapper plant-icon">
                            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C12 2 17 5 17 10C17 13.87 14.87 16 12 16C9.13 16 7 13.87 7 10C7 5 12 2 12 2ZM12 4.2C12 4.2 9 6.5 9 10C9 12.5 10.5 14 12 14C13.5 14 15 12.5 15 10C15 6.5 12 4.2 12 4.2ZM11 17H13V22H11V17Z" fill="white" fillOpacity="0.85" />
                            </svg>
                        </div>

                        <div className="icon-wrapper book-icon">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16Z" fill="white" fillOpacity="0.85" />
                            </svg>
                        </div>

                        <div className="icon-wrapper food-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.1 13.34L2.5 18.93L4.62 21.05L10.21 15.46L8.1 13.34ZM14.88 11.53L16.29 10.12L13.12 6.95L14.53 5.54L13.12 4.13L15.95 1.3L18.07 3.42L20.89 0.59L23.01 2.71L20.18 5.54L22.3 7.66L20.89 9.07L17.72 5.9L16.31 7.31L19.48 10.48L18.07 11.89L14.88 8.7L13.47 10.11L16.64 13.28L15.23 14.69L12.06 11.52L10.65 12.93L13.82 16.1L12.41 17.5L9.24 14.33L6.07 17.5L8.19 19.62L11.36 16.45L12.77 17.86L9.6 21.03L11.72 23.15L14.89 19.98L16.3 21.39L13.13 18.22L14.54 16.81L17.71 19.98L19.12 18.57L15.95 15.4L17.36 13.99L20.53 17.16L21.94 15.75L18.77 12.58L20.18 11.17L23.35 14.34L24.76 12.93L20.88 9.07L14.88 11.53Z" fill="white" fillOpacity="0.8" />
                            </svg>
                        </div>

                        <div className="icon-wrapper family-icon">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="6" r="3" fill="white" fillOpacity="0.9" />
                                <circle cx="16" cy="6" r="3" fill="white" fillOpacity="0.9" />
                                <path d="M8 10C5.79 10 4 11.79 4 14V18H12V14C12 11.79 10.21 10 8 10Z" fill="white" fillOpacity="0.85" />
                                <path d="M16 10C13.79 10 12 11.79 12 14V18H20V14C20 11.79 18.21 10 16 10Z" fill="white" fillOpacity="0.85" />
                                <circle cx="12" cy="20" r="2" fill="white" fillOpacity="0.8" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Categories */}
            <div className="impact-section">
                <div className="section-header">
                    <span className="section-badge">OUR GENEROSITY</span>
                    <h2 className="section-title">How we can help</h2>
                </div>

                <div className="impact-grid">
                    {loading ? (
                        <div className="loading-container">
                            <p>Loading categories...</p>
                        </div>
                    ) : (
                        categories.map((category) => (
                            <div
                                key={category._id}
                                onClick={() => navigate("/Category", { state: { categoryId: category._id } })}
                                className="impact-card"
                            >
                                <div className="impact-image">
                                    <img
                                        src={category.icon?.url || sunset}
                                        alt={category.identifier}
                                        onError={(e) => { e.target.src = sunset; }}
                                    />
                                </div>
                                <div className="impact-content">
                                    <h3 className="impact-title">
                                        {category.identifier
                                            ? category.identifier.charAt(0).toUpperCase() + category.identifier.slice(1).replace(/-/g, ' ')
                                            : "Service"}
                                    </h3>
                                    <p className="impact-description">
                                        {category.description || `Providing essential ${category.identifier || 'support'} services to our community.`}
                                    </p>
                                    <a href="#" className="impact-link" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/Category', { state: { categoryId: category._id } }); }}>
                                        Learn More →
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* About Us Section */}
            <div ref={aboutRef} id="about-us" className="about-section">
                <div className="about-grid">
                    <div className="about-content">
                        <span className="section-badge">ABOUT US</span>
                        <h2 className="about-title">Committed to Compassion and Community</h2>
                        <p className="about-text">
                            At Raha, we are committed to making a positive impact in our community.
                            We believe that everyone deserves access to basic necessities like food,
                            shelter, and healthcare. We work tirelessly to address the root causes of
                            poverty and inequality, and we strive to create a more just and equitable world.
                        </p>

                        <div className="about-stats">
                            <div className="about-stat">
                                <span className="about-stat-number">{projects}{projects >= 150 ? '+' : ''}</span>
                                <span className="about-stat-label">Projects Completed</span>
                            </div>
                            <div className="about-stat">
                                <span className="about-stat-number">{lives}{lives >= 50 ? 'K+' : ''}</span>
                                <span className="about-stat-label">Lives Impacted</span>
                            </div>
                            <div className="about-stat">
                                <span className="about-stat-number">{countries}{countries >= 12 ? '+' : ''}</span>
                                <span className="about-stat-label">Countries</span>
                            </div>
                        </div>

                        <button className="btn-outline" onClick={() => navigate("/about")}>
                            Read Our Story
                        </button>
                    </div>

                    <div className="about-image">
                        <img
                            src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Volunteers helping"
                        />
                        <div className="experience-badge">
                            <span className="experience-years">10+</span>
                            <span className="experience-text">Years of Service</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Reviews Slider Section */}
            <div className="reviews-section">
                <div className="section-header centered">
                    <span className="section-badge">STORIES OF HOPE</span>
                    <h2 className="section-title">What Our Community Says</h2>
                    <p className="reviews-subtitle">Real stories from people we've helped</p>
                </div>

                <div className="reviews-slider-container">
                    <button className="review-nav-btn prev" onClick={prevReview}>
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    <div className="reviews-slider">
                        {reviews.map((review, index) => (
                            <div
                                key={review.id}
                                className={`review-card ${index === currentReviewIndex ? 'active' : ''}`}
                                style={{
                                    display: index === currentReviewIndex ? 'block' : 'none',
                                }}
                            >
                                <div className="review-header">
                                    <img src={review.image} alt={review.name} className="reviewer-image" />
                                    <div className="reviewer-info">
                                        <h4>{review.name}</h4>
                                        <p>{review.location}</p>
                                        <div className="review-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <i
                                                    key={i}
                                                    className={`fa-${i < review.rating ? 'solid' : 'regular'} fa-star`}
                                                    style={{ color: i < review.rating ? '#FFB800' : '#CBD5E0' }}
                                                ></i>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="review-date">{review.date}</span>
                                </div>
                                <div className="review-content">
                                    <i className="fas fa-quote-left quote-icon"></i>
                                    <p>{review.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="review-nav-btn next" onClick={nextReview}>
                        <i className="fas fa-chevron-right"></i>
                    </button>

                    <div className="review-dots">
                        {reviews.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentReviewIndex ? 'active' : ''}`}
                                onClick={() => setCurrentReviewIndex(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Us Section */}
            <div ref={contactRef} id="contact-us" className="contact-section">
                <div className="section-header centered">
                    <span className="section-badge">GET IN TOUCH</span>
                    <h2 className="section-title">Contact Us</h2>
                    <p className="contact-subtitle">We're here to help and answer any questions</p>
                </div>

                <div className="contact-container">
                    <div className="contact-info">
                        <div className="contact-info-header">
                            <h3>Let's talk</h3>
                            <p>Reach out to us anytime. Our team is ready to assist you.</p>
                        </div>

                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="contact-text">
                                    <h4>Visit Us</h4>
                                    <p>Nørregade 10, 1165 København, Denmark</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div className="contact-text">
                                    <h4>Call Us</h4>
                                    <p>+45 71 23 45 67</p>
                                    <p>Mon-Fri: 9:00 - 17:00</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="contact-text">
                                    <h4>Email Us</h4>
                                    <p>info@raha.dk</p>
                                    <p>support@raha.dk</p>
                                </div>
                            </div>

                            <div className="contact-social">
                                <h4>Follow Us</h4>
                                <div className="social-links">
                                    <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                                    <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" placeholder="Enter your name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" placeholder="Enter your email" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" placeholder="How can we help?" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows="5" placeholder="Tell us more about your inquiry..."></textarea>
                            </div>

                            <button type="submit" className="btn-primary contact-submit-btn">
                                Send Message <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Floating Support Button */}
            <div className="floating-wrapper">
                <div className="floating-bottom-icon">
                    <i className="fas fa-question"></i>
                </div>

                <div className="floating-categories">
                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            className="floating-category-item"
                            onClick={() =>
                                navigate("/Category", { state: { categoryId: cat._id } })
                            }
                        >
                            <img
                                src={cat.icon?.url || sunset}
                                alt={cat.identifier}
                                className="floating-category-img"
                            />
                            <span>
                                {cat.identifier?.charAt(0).toUpperCase() +
                                    cat.identifier?.slice(1).replace(/-/g, " ")}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;