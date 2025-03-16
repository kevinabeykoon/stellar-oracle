import React, { useState } from "react";
import axios from "axios";
import './FullMoonForm.css';  // Make sure to use this CSS file for styling

const MoonPhaseForm = () => {
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // To handle the loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      setError("Please enter a valid date.");
      return;
    }

    // Extract year, month, and day from the selected date
    const [year, month, day] = date.split("-");

    try {
      setStatus('loading'); // Set status to loading when submitting
      // Get full moon data from Wolfram API
      const response = await axios.get(
        `https://www.wolframcloud.com/obj/abeykoonkevin/data-fetch/moonphase?year=${year}&month=${month}&day=${day}&hour=0&minute=0`,
        { responseType: "blob" } // Expecting an image
      );

      const imageUrl = URL.createObjectURL(response.data); // Create image URL from blob
      setImageUrl(imageUrl);
      setError("");
      setStatus('success'); // Set status to success once the data is fetched

    } catch (err) {
      setStatus('error'); // Set status to error if the API request fails
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching Wolfram API data:", err);
    }
  };

  return (
    <div className="modal-container">
      <h2 className="modal-title">Moon Phase Lookup</h2>
      <form onSubmit={handleSubmit} className="wolfram-form">
        <label className="form-label">Select a date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="date-input"
        />
        <button type="submit" className="submit-button">Get Phase Image</button>
      </form>

      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {imageUrl && (
        <div className="moon-phase-image">
          <h3>Moon Phase Image:</h3>
          <img src={imageUrl} alt="Full Moon Phase" className="moon-image" />
        </div>
      )}
    </div>
  );
};

export default MoonPhaseForm;
