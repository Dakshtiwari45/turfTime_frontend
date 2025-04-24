import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    price: 0,
    rating: "",
  });

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "range" ? parseInt(value) : value,
    }));
  };

  const handleApply = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `http://localhost:3000/api/turfs/filter?${queryParams}`
      );
      const data = await response.json();
      onFilterChange(data); // Send filtered data to parent
    } catch (err) {
      console.error("Error fetching filtered turfs:", err);
    }
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
        <select
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="1">1⭐ & up</option>
          <option value="2">2⭐ & up</option>
          <option value="3">3⭐ & up</option>
          <option value="4">4⭐ & up</option>
          <option value="5">5⭐</option>
        </select>
      </div>

      <button className="apply-btn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default Sidebar;
