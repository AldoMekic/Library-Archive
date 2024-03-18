import React from "react";
import "../styles/AdminPage.css"

const AdminPage = () => {
    return (
        <div className="admin-container">

            <div className="admin-title">
                <h1>Admin Page</h1>
            </div>

            <div className="admin-buttons">
                <button>Users</button>
                <button>Books</button>
            </div>

            <div className="admin-empty">

            </div>
        </div>
    );
};

export default AdminPage;