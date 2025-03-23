import React, { useState } from "react";
import "./turfdetails.css";

function TurfDetails() {
  const [turfData, setTurfData] = useState({
    name: "",
    address: "",
    area: "",
    contact: "",
    price: "",
    type: "",
    slots: "",
    amenities: "",
    image: "", // Selected image filename
    owner: localStorage.getItem("ownerId") || "",
  });

  // State to control the visibility of the image grid container
  const [showImageGrid, setShowImageGrid] = useState(false);

  // Array of image options (filenames in public folder)
  const imageOptions = [
    "truf.jpg",
    "turf1.jpg",
    "turf2.jpg",
    "turf3.jpeg", // turf3 is a .jpeg file
    "turf5.jpg",
    "turf6.jpg",
    "turf7.jpg",
    "turf8.jpg",
    "turf9.jpg",
    "turf10.jpg",
    "turf11.jpg",
    "turf12.jpg",
    "turf13.jpg",
  ];

  const handleChange = (e) => {
    setTurfData({ ...turfData, [e.target.name]: e.target.value });
  };

  const handleImageClick = (img) => {
    setTurfData({ ...turfData, image: img });
    setShowImageGrid(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Turf Details Submitted:", turfData);

    try {
      const response = await fetch("http://localhost:3000/api/turfOwner/createTurf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(turfData),
      });

      if (!response.ok) {
        throw new Error("Failed to create turf");
      }

      const result = await response.json();
      console.log("Turf created successfully:", result);
      // Optionally, clear the form or display a success message
    } catch (error) {
      console.error("Error submitting turf details:", error);
    }
  };

  return (
    <div className="combined-container">
      {/* Form Container */}
      <div className="turf-container">
        <form onSubmit={handleSubmit}>
          <h2>Enter Turf Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Turf Name"
            value={turfData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Turf Address"
            value={turfData.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="area"
            placeholder="Turf Area (in sq ft)"
            value={turfData.area}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={turfData.contact}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price per Hour (₹)"
            value={turfData.price}
            onChange={handleChange}
            required
            className="no-spinner"
          />

          <select
            name="type"
            value={turfData.type}
            onChange={handleChange}
            required
            className="custom-dropdown"
          >
            <option value="">Select Turf Type</option>
            <option value="Grass">Grass</option>
            <option value="Artificial Turf">Artificial Turf</option>
            <option value="Clay">Clay</option>
          </select>

          <input
            type="text"
            name="slots"
            placeholder="Available Slots (e.g. 6 AM - 10 PM)"
            value={turfData.slots}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="amenities"
            placeholder="Amenities (e.g. Parking, Washroom)"
            value={turfData.amenities}
            onChange={handleChange}
          />

          {/* Selected image preview */}
          {turfData.image && (
            <div className="selected-image-preview">
              <img src={`/${turfData.image}`} alt={turfData.image} />
              <span>{turfData.image}</span>
            </div>
          )}

          {/* Button to open image grid */}
          <button
            type="button"
            className="open-grid-btn"
            onClick={() => setShowImageGrid(true)}
          >
            Select Image
          </button>

          <button type="submit">Submit Turf Details</button>
        </form>
      </div>

      {/* Image Grid Container */}
      {showImageGrid && (
        <div className="image-grid-container">
          <h3>Select an Image</h3>
          <div className="image-grid">
            {imageOptions.map((img, index) => (
              <div
                key={index}
                className={`image-grid-item ${
                  turfData.image === img ? "selected" : ""
                }`}
                onClick={() => handleImageClick(img)}
              >
                <img src={`/${img}`} alt={img} />
                <span>{img}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TurfDetails;
