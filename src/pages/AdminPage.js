import React, { useState} from "react";
import AllUsers from "../components/AllUsers";
import "../styles/AdminPage.css";

const AdminPage = () => {

    return (
        <div className="admin-container">
            <div className="admin-title">
                <h1>Admin Page</h1>
            </div>

            <AllUsers />
        </div>
    );
};

export default AdminPage;