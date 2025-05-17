import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config';
import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../Sidebar/sidebar";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTurfs, setShowAllTurfs] = useState(false); // To control Load More/Load Less visibility

  // Function to fetch turfs from the API, with optional search query
  const fetchTurfs = async (skipCount = 0, query = "") => {
    try {
      let url = `${API_URL}/api/turfs?limit=12&skip=${skipCount}`;
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
        setTurfs((prevTurfs) => [...prevTurfs, ...data]);
      }
    } catch (error) {
      console.error("Error fetching turfs:", error);
    }
  };

  // When the search query changes, reset skip and fetch filtered results
  useEffect(() => {
    setSkip(0);
    setShowAllTurfs(false); // Reset showAllTurfs when search query changes
    fetchTurfs(0, searchQuery);
  }, [searchQuery]);

  // Handler to load more turfs (maintaining the current search query)
  const handleLoadMore = () => {
    const newSkip = skip + 12;
    setSkip(newSkip);
    setShowAllTurfs(true); // Show all turfs when "Load More" is clicked
    fetchTurfs(newSkip, searchQuery);
  };

  // Handler to load less turfs (show only the first 12)
  const handleLoadLess = () => {
    setSkip(0);
    setShowAllTurfs(false); // Reset to show only the first 12 turfs
    fetchTurfs(0, searchQuery);
  };

  // Handler for search initiated from Header
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handler to update turfs when filters are applied
  const handleFilterChange = (filteredTurfs) => {
    setTurfs(filteredTurfs);
    setHasMore(false); // Disable "Load More" since filtered results are final
  };

  return (
    <div className="homepage-container">
      <Header onSearch={handleSearch} />
      <div className="content-wrapper">
        <Sidebar onFilterChange={handleFilterChange} />
        <div className="main-content">
          <div className="turf-section">
            <div className="turf-grid">
              {turfs.map((turf) => (
                <div
                  key={turf._id || turf.id}
                  className="turf-card"
                  onClick={() => navigate(`/booking/${turf._id || turf.id}`)}
                >
                  <img
                    src={`${API_URL}/api/turfs/image/${turf.image}`}
                    alt={turf.name}
                    className="turf-image"
                  />
                  <h2>{turf.name}</h2>
                  <p>{turf.address}</p>
                  <p className="price">{turf.price}</p>
                  <p className="rating">⭐ {turf.rating}</p>
                </div>
              ))}
            </div>
            {/* Show Load More if showAllTurfs is false, else show Load Less */}
            {hasMore && !showAllTurfs && (
              <div className="load-more-container">
                <button onClick={handleLoadMore}>Show More</button>
              </div>
            )}
            {showAllTurfs && (
              <div className="load-more-container">
                <button onClick={handleLoadLess}>Show Less</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
