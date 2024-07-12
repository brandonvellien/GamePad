// Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signup from "/src/assets/img/signup.gif";
import { Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "https://site--backend-gamepad--ynyvw48hxvj2.code.run/user/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      handleToken(response.data.user.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-page">
      <img className="signup-logo" src={signup} alt="signup-img" />
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="text-photo">Choose a profile picture</div>

        <input type="file" onChange={(e) => setPicture(e.target.files[0])} />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login">
        <div className="signup-text">Already have an account ?</div>
      </Link>
    </div>
  );
};

export default Signup;
