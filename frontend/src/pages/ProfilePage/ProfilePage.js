import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
    const isLoggedIn = true;

    const handleLogin = (e) => {
        e.preventDefault();
    };

    const handleLogout = (e) => {
        e.preventDefault();
    };

    return (
        <div className="profile-page">
            <h2 className="profile-page__title">Delivering happiness, one tiffin at a time.</h2>
            {isLoggedIn ? (
                <div className="profile-page__welcome">
                    <p className="yes">"Welcome, Altaf!"</p>
                    <button
                        className="profile-page__logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleLogin}
                    className="profile-page__login-form"
                >
                    <label htmlFor="username" className="profile-page__label">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="profile-page__input"
                    />
                    <label htmlFor="password" className="profile-page__label">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="profile-page__input"
                    />
                    <button type="submit" className="profile-page__login-btn">
                        Login
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
