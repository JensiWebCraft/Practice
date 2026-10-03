import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";
import axios from "axios";

import {
    LayoutDashboard,
    Building2,
    Briefcase,
    PlusCircle,
    Search,
    User,
    LogOut,
    Bell,
    Menu,
    X,
    Users
} from "lucide-react";
import api from "../api/axios";

function Layout({ children, role = "company" }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await api.post("/api/auth/logout", {}, {
                withCredentials: true,
            });
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    const companyLinks = [
        { name: "Dashboard", path: "/company/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Company Profile", path: "/company/edit", icon: <Building2 size={20} /> },
        { name: "Manage Jobs", path: "/company/jobs", icon: <Briefcase size={20} /> },
        { name: "Post a Job", path: "/company/jobs/create", icon: <PlusCircle size={20} /> },
        { name: "Applications", path: "/company/applications", icon: <Users size={20} /> }
    ];

    const userLinks = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Browse Jobs", path: "/jobs", icon: <Search size={20} /> },
        { name: "My Profile", path: "/profile", icon: <User size={20} /> },
    ];

    const navLinks = role === "company" ? companyLinks : userLinks;

    return (
        <div className="modern-layout">
            {/* Sidebar */}
            <aside className={`modern-sidebar ${isMobileSidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <h2 className="brand-logo">WorkFlow <span className="dot">.</span></h2>
                    <button
                        className="close-sidebar"
                        onClick={() => setMobileSidebarOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav-container">
                    <ul className="sidebar-nav-list">
                        {navLinks.map((link) => (
                            <li
                                key={link.path}
                                className={`nav-item ${location.pathname === link.path ? "active" : ""}`}
                                onClick={() => {
                                    navigate(link.path);
                                    setMobileSidebarOpen(false);
                                }}
                            >
                                <span className="nav-icon">{link.icon}</span>
                                <span className="nav-text">{link.name}</span>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <span className="nav-icon"><LogOut size={20} /></span>
                        <span className="nav-text">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setMobileSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="main-wrapper">
                {/* Fixed Top Navbar */}
                <header className="modern-navbar">
                    <div className="nav-left">
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="search-bar">
                            <span className="search-icon"><Search size={18} /></span>
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div>

                    <div className="nav-right">
                        <div className="user-profile">
                            <div className="avatar">
                                {role === "company" ? "C" : "U"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="content-area">
                    <div className="content-container">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;
