import React from "react";
import Sidebar from "./Sidebar";
import "./sidebar.css";
import "../style.css";

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-container">
            <Sidebar />
            <main className="dashboard-main">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
