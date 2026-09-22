import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/logout", {}, {
                withCredentials: true,
            });
            navigate("/login");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Welcome to Dashboard 🎉</h1>
            <p>You are successfully logged in.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );

}

export default Dashboard;