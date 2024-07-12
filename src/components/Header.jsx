// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/img/logo.png";
import profilpic from "/src/assets/img/profilpic.png";

const Header = ({ token, handleToken, userImage }) => {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="reacting-games" />
          </Link>
        </div>
        {token ? (
          <div className="user-info">
            <Link to="/favorites">
              <button>My Collection</button>
            </Link>
            <img
              src={userImage || profilpic}
              alt="Profile"
              className="profile-image"
            />
            <button onClick={() => handleToken(null)}>Log Out</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Log In</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
