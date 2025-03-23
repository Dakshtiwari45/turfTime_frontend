import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import loginVideo from "/public/video(1).mp4"; // Make sure to add your video in this folder

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Dummy validation (Replace with actual authentication logic)
    if (email && password) {
      console.log("User Logged In:", { email, password });

      // Redirect to home after successful login
      navigate("/homepage");
    } else {
      alert("Please enter valid email and password!");
    }
  };

  return (
    <div className="login-overlay">
      {/* Background Video */}
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
        
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button onClick={handleLogin}>Login</button>
        
        <p className="register-link">
          New to Turf?{" "}
          <span onClick={() => navigate("/signup")} className="signup-link">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
