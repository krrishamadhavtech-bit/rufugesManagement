import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./style.css";
import { fetchCategories } from "../../../../services/category";
import sunset from '../../../../assets/sunset.jpg';


function CategoryList() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetchCategories();
                if (response.statusCode === 200) {
                    setCategories(response.data);
                    setVisibleCount(10);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);


    return (
        <div className="home-container">
            {/* Impact Categories */}
            <div className="impact-section">
                <div className="impact-grid">
                    {loading ? (
                        <div className="loading-container">
                            <p>Loading categories...</p>
                        </div>
                    ) : (
                        categories.slice(0, visibleCount).map((category) => (
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
                    {!loading && (
                        <div style={{ textAlign: "center", marginTop: "1.5rem", alignContent: 'center', gridColumn: '1 / -1' }}>
                            <button
                                className="btn-primary"
                                onClick={() => navigate("/Category")}
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryList;