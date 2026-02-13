import "./home.css";

function ContentList() {
    const items = [
        "Copenhagen Housing Office",
        "Aarhus Community Shelter",
        "Temporary Housing Center",
        "Danish Rental Guide"
    ];

    return (
        <div className="home-container">

            <h2 className="home-title">Available Resources</h2>

            <div className="category-grid">
                {items.map((item, index) => (
                    <div key={index} className="category-card">
                        <div className="category-title">{item}</div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ContentList;
