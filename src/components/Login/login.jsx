import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";
import loginVideo from "/public/video(1).mp4";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter valid email and password!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.message}`);
        return;
      }

      localStorage.clear();
      localStorage.setItem("token", data.token);

      if (data.isOwner && data.id) {
        localStorage.setItem("ownerId", data.id);
        navigate("/owner-dashboard");
      } else if (data.id) {
        localStorage.setItem("userId", data.id);
        navigate("/homepage");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-overlay">
      <video autoPlay loop muted className="background-video">
        <source src={loginVideo} type="video/mp4" />
      </video>

      <div className="login-container">
        <h2>Welcome to Turf Booking</h2>
        <p>Book your slot now!</p>

        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button onClick={handleLogin}>Login</button>

        <p className="register-link">
          New to Turf?{" "}
          <span onClick={() => navigate("/signup")} className="signup-link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
