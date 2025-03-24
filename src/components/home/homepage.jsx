import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../Sidebar/sidebar";
import "./HomePage.css";

const HomePage = () => {
  const [turfs, setTurfs] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch turfs from the API, with optional search query
  const fetchTurfs = async (skipCount = 0, query = "") => {
    try {
      let url = `http://localhost:3000/api/turfs?limit=12&skip=${skipCount}`;
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch turfs");
      }
      const data = await response.json();
      
      // If the data length is less than 12, assume there are no more turfs
      if (data.length < 12) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      
      // If skipCount is 0, replace the current list; otherwise, append new data
      if (skipCount === 0) {
        setTurfs(data);
      } else {
        setTurfs(prevTurfs => [...prevTurfs, ...data]);
      }
    } catch (error) {
      console.error("Error fetching turfs:", error);
    }
  };

  // When the search query changes, reset skip and fetch filtered results
  useEffect(() => {
    setSkip(0);
    fetchTurfs(0, searchQuery);
  }, [searchQuery]);

  // Handler to load more turfs (maintaining the current search query)
  const handleLoadMore = () => {
    const newSkip = skip + 12;
    setSkip(newSkip);
    fetchTurfs(newSkip, searchQuery);
  };

  // Handler for search initiated from Header
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="homepage-container">
      <Header onSearch={handleSearch} />
      <div className="content-wrapper">
        <Sidebar />
        <div className="main-content">
          <div className="turf-grid">
            {turfs.map((turf) => (
              <div key={turf._id || turf.id} className="turf-card">
                <img
                  src={`/${turf.image}`}
                  alt={turf.name}
                />
                <h2>{turf.name}</h2>
                <p>{turf.address}</p>
                <p className="price">{turf.price}</p>
                <p className="rating">⭐ {turf.rating}</p>
              </div>
            ))}
          </div>
          {hasMore && (
            <button onClick={handleLoadMore}>Load More</button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
