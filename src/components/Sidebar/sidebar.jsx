import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    price: 0,
    rating: "",
    parking: "",
    turfType: "",
    amenities: [],
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [name]: type === "range" ? parseInt(value) : value,
      };

      if (type === "checkbox") {
        newFilters.amenities = checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((item) => item !== value);
      }

      return newFilters;
    });
  };

  const handleApply = () => {
    onFilterChange(filters); // pass the full filter state back
  };

  return (
    <div className="sidebar">
      <h2>Filters</h2>
      
      <div className="filter-group">
        <label>Price Range: ₹{filters.price}</label>
        <input 
          type="range" 
          name="price" 
          min="500" 
          max="5000" 
          step="500"
          value={filters.price} 
          onChange={handleFilterChange} 
        />
      </div>

      <div className="filter-group">
        <label>Ratings:</label>
        <select name="rating" value={filters.rating} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="1">1⭐ & up</option>
          <option value="2">2⭐ & up</option>
          <option value="3">3⭐ & up</option>
          <option value="4">4⭐ & up</option>
          <option value="5">5⭐</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Parking:</label>
        <select name="parking" value={filters.parking} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="yes">Available</option>
          <option value="no">Not Available</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Turf Type:</label>
        <select name="turfType" value={filters.turfType} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="artificial">Artificial</option>
          <option value="clay">Clay</option>
          <option value="grass">Grass</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Amenities:</label>
        <div className="checkbox-group">
          <label>
            Washroom <input type="checkbox" value="washroom" onChange={handleFilterChange} checked={filters.amenities.includes("washroom")} />
          </label>
          <label>
            Changing Room <input type="checkbox" value="changing-room" onChange={handleFilterChange} checked={filters.amenities.includes("changing-room")} />
          </label>
          <label>
            Seating Area <input type="checkbox" value="seating-area" onChange={handleFilterChange} checked={filters.amenities.includes("seating-area")} />
          </label>
        </div>
      </div>

      {/* 🔍 Trigger search here */}
      <button className="apply-btn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default Sidebar;
