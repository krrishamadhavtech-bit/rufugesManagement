
import { useParams, useNavigate } from "react-router-dom";
import "./home.css";

function CategoryDetail() {
    const { name } = useParams();
    const navigate = useNavigate();

    const topics = [
        "How to find an apartment",
        "Understanding rental contracts",
        "Problems with your landlord",
        "Temporary housing options"
    ];

    return (
        <div className="home-container">

            <h2 className="home-title">{name}</h2>

            <p className="home-subtitle">
                Helpful information and trusted resources.
            </p>

            <div className="category-grid">
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        className="category-card"
                        onClick={() => navigate("/content-list")}
                    >
                        <div className="category-title">{topic}</div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CategoryDetail;
