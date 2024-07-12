import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import login from "/src/assets/img/login.gif";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      handleToken(token, user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <img className="signup-logo" src={login} alt="login-img" />
      <form onSubmit={handleLogin}>
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
        <button type="submit">Log In</button>
      </form>
      <Link to="/signup">
        <div className="signup-text">Don't you have an account yet ?</div>
      </Link>
    </div>
  );
};

export default Login;
