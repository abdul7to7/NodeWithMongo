import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState(""); // Only used during signup
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:3000/auth/login"
      : "http://localhost:3000/auth/signup";

    const payload = isLogin
      ? { mail, password } // Login requires only mail and password
      : { username, mail, password }; // Signup requires username, mail, and password

    try {
      const res = await axios.post(url, payload);

      if (isLogin) {
        // Handle login success
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        window.location.reload();
      } else {
        // Handle signup success
        setMessage("Registration successful! You can now log in.");
        setIsLogin(true); // Switch to login form after signup
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuth}>
          {!isLogin && ( // Show username input only during signup
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="mail"
            placeholder="Email"
            value={mail}
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
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="toggle-button"
            onClick={() => {
              setIsLogin(!isLogin); // Toggle between login and signup
              setError(""); // Clear error
              setMessage(""); // Clear success message
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
