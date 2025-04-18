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
    images: [],
  });

  const handleChange = (e) => {
    setTurfData({ ...turfData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setTurfData({ ...turfData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Turf Details Submitted:", turfData);

    const token = localStorage.getItem("token"); // Get token from local storage
    if (!token) {
      console.error("No token found! Please log in.");
      return;
    }

    // Build FormData for multipart upload
    const formData = new FormData();
    formData.append("name", turfData.name);
    formData.append("address", turfData.address);
    formData.append("area", turfData.area);
    formData.append("contact", turfData.contact);
    formData.append("price", turfData.price);
    formData.append("type", turfData.type);
    formData.append("slots", turfData.slots);
    formData.append("amenities", turfData.amenities);
    formData.append("owner", localStorage.getItem("ownerId"));
    formData.append('image', turfData.images[0]);

    try {
      const response = await fetch(
        "http://localhost:3000/api/turfs/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create turf");
      }

      const result = await response.json();
      console.log("Turf created successfully:", result);

      // Optionally, clear the form or display a success message
      setTurfData({
        name: "",
        address: "",
        area: "",
        contact: "",
        price: "",
        type: "",
        slots: "",
        amenities: "",
        images: [],
      });

      alert("Turf created successfully!");
    } catch (error) {
      console.error("Error submitting turf details:", error);
    }
  };

  return (
    <div className="turf-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
        />

        <button type="submit">Submit Turf Details</button>
      </form>
    </div>
  );
}

export default TurfDetails;