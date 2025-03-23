import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import signupVideo from "/public/background.mp4"; // Make sure to place your video here

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isOwner: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Email Validation
    if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (emailError) {
      alert("Please fix the errors before submitting");
      return;
    }
  
    const signupData = { ...formData };
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }
  
      // Navigate based on role
      if (formData.isOwner) {
        navigate("/turfdetails");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  
  

  return (
    <div className="signup-overlay">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={signupVideo} type="video/mp4" />
      </video>

      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}

          {/* Password Input */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Owner Checkbox */}
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="isOwner"
              checked={formData.isOwner}
              onChange={handleChange}
            />
            <label>Are you an Owner?</label>
          </div>

          {/* Signup Button */}
          <button type="submit">Sign Up</button>
        </form>

        {/* Login Link */}
        <a href="/login" className="login-link">
          Already have an account? Login
        </a>
      </div>
    </div>
  );
};

export default Signup;
