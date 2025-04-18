import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import loginVideo from "/public/video(1).mp4"; // Background video

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }
  
      const data = await response.json();
      console.log("User Logged In:", data);
  
      // Store the token and user ID in localStorage
      localStorage.setItem("token", data.token);
      if(data.isOwner===true)
        localStorage.setItem("ownerId", data.id);  // Store user ID
      else
        localStorage.setItem("userId", data.id);
  
      // Navigate to homepage after login
      navigate("/homepage");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
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
