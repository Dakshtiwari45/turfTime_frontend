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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Turf Details Submitted:", turfData);
  };

  return (
    <div className="turf-container">
      <form onSubmit={handleSubmit}>
        <h2>Enter Turf Details</h2>

        <input type="text" name="name" placeholder="Turf Name" value={turfData.name} onChange={handleChange} required />

        <input type="text" name="address" placeholder="Turf Address" value={turfData.address} onChange={handleChange} required />

        <input type="text" name="area" placeholder="Turf Area (in sq ft)" value={turfData.area} onChange={handleChange} required />

        <input type="text" name="contact" placeholder="Contact Number" value={turfData.contact} onChange={handleChange} required />

        <input type="number" name="price" placeholder="Price per Hour (₹)" value={turfData.price} onChange={handleChange} required className="no-spinner" />

        <select name="type" value={turfData.type} onChange={handleChange} required className="custom-dropdown">
          <option value="">Select Turf Type</option>
          <option value="Grass">Grass</option>
          <option value="Artificial Turf">Artificial Turf</option>
          <option value="Clay">Clay</option>
        </select>

        <input type="text" name="slots" placeholder="Available Slots (e.g. 6 AM - 10 PM)" value={turfData.slots} onChange={handleChange} required />

        <input type="text" name="amenities" placeholder="Amenities (e.g. Parking, Washroom)" value={turfData.amenities} onChange={handleChange} />

        <input type="file" multiple onChange={handleImageChange} accept="image/*" />

        <button type="submit">Submit Turf Details</button>
      </form>
    </div>
  );
}

export default TurfDetails;
