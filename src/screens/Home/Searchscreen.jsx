import { useState } from "react";
import "./home.css";

function SearchScreen() {
    const [query, setQuery] = useState("");

    const results = [
        "Health Clinics Near You",
        "Free Legal Advice Centers",
        "Childcare Support Services"
    ];

    return (
        <div className="home-container">

            <input
                type="text"
                placeholder="Search for help..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-light)",
                    marginBottom: "40px"
                }}
            />

            {results
                .filter(item => item.toLowerCase().includes(query.toLowerCase()))
                .map((result, index) => (
                    <div key={index} className="category-card">
                        {result}
                    </div>
                ))}

        </div>
    );
}

export default SearchScreen;
