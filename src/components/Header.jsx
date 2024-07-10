// Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ token, handleToken, userImage }) => {
  return (
    <header className="header">
      <div className="header-content">
        <span className="header-title">
          <Link to="/">Home</Link>
          <Link to="/favorites">My Collection</Link>
        </span>
        {token ? (
          <div className="user-info">
            <img
              src={userImage || "default-image-url"}
              alt="Profile"
              className="profile-image"
            />
            <button onClick={() => handleToken(null)}>Log Out</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
