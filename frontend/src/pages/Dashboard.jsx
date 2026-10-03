import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import api from "../api/axios";

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await api.post("/api/auth/logout", {}, {
                withCredentials: true,
            });
            navigate("/login");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Layout role="jobseeker">
            <div style={{ padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a2e' }}>Welcome to Dashboard 🎉</h1>
                <p style={{ color: '#7a7a8e', marginBottom: '2rem' }}>You are successfully logged in.</p>

                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1a1a2e' }}>Getting Started</h3>
                    <p style={{ color: '#555' }}>Use the sidebar to navigate through your profile and explore available jobs.</p>
                </div>
            </div>
        </Layout>
    );

}

export default Dashboard;