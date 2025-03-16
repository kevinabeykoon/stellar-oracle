import React, { useState } from "react";
import axios from "axios";
import './SunriseForm.css';  // Or change to an appropriate CSS file

const DaylightForm = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // To handle the loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus('loading');
      // Call the API to get the daylight image (PNG)
      const response = await axios.get(
        `https://www.wolframcloud.com/obj/abeykoonkevin/data-fetch/DaylightMap`,
        { responseType: "blob" }  // Expecting an image blob
      );
      const imgUrl = URL.createObjectURL(response.data);
      setImageUrl(imgUrl);
      setError("");
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching API data:", err);
    }
  };

  return (
    <div className="modal-container">
      <h2 className="modal-title">Where has the Sun Set?</h2>
      <form onSubmit={handleSubmit} className="wolfram-form">
        <button type="submit" className="sun-submit-button">Get Light Distribution Image</button>
      </form>

      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {imageUrl && (
        <div className="daylight-image-container">
          <p>Here's where the sun is set right now:</p>
          <img src={imageUrl} alt="Daylight" className="daylight-image" />
        </div>
      )}
    </div>
  );
};

export default DaylightForm;
