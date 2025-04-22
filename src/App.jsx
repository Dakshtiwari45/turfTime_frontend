
import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./components/signup/signup";
import Login from "./components/Login/login";
import Turfdetails from "./components/turfdetails/turfdetails";
import HomePage from "./components/home/homepage";
import SplashScreen from "./components/SplashScreen/splashscreen"; 
import OwnerDashboard from "./components/Owner/owner-dashboard";
import Sidebar from "./components/Sidebar/sidebar";
import About from "./components/about/about";
import Booking from "./components/booking/booking";
import History from "./components/history/history";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/turfdetails" element={<Turfdetails />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard/>} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking/:id" element={<Booking/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

export default App;