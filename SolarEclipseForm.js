import React, { useState } from "react";
import axios from "axios";
import './FullMoonForm.css';  // Update to your CSS file if needed

const SolarEclipseForm = () => {
  const [date, setDate] = useState("");
  const [rawData, setRawData] = useState(null);
  const [formattedData, setFormattedData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      setError("Please enter a valid date.");
      return;
    }

    const [year, month, day] = date.split("-");

    try {
      setStatus("loading");

      // First API call: Get data from Wolfram API (string format)
      const response1 = await axios.get(
        `https://www.wolframcloud.com/obj/abeykoonkevin/data-fetch/SolarEclipseData?year=${year}&month=${month}&day=${day}&hour=0&minute=0`
      );
      const dataString = response1.data;
      setRawData(dataString);
      setError("");

      // Format the raw data string
      const formattedMessage = formatSunriseData(dataString);
      setFormattedData(formattedMessage);

      // Second API call: Get the Solar Eclipse map image as blob
      const response2 = await axios.get(
        `https://www.wolframcloud.com/obj/abeykoonkevin/data-fetch/SolarEclipseMap?year=${year}&month=${month}&day=${day}&hour=0&minute=0`,
        { responseType: "blob" }
      );
      const imgUrl = URL.createObjectURL(response2.data);
      setImageUrl(imgUrl);

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching API data:", err);
    }
  };

  // Function to manually format the raw Wolfram DateObject string.
  // Expected rawData format:
  // "DateObject[{2025, 3, 6, 7, 31, 5.50283}, Instant, Gregorian, -4.]"
  const formatSunriseData = (rawData) => {
    // Extract the portion between "DateObject[{" and "},"
    const dataString = rawData.split("DateObject[{")[1].split("},")[0];
    // Split into individual components
    const parts = dataString.split(",").map(item => item.trim());
    // Get the first five values: year, month, day, hour, minute
    const [year, month, day, hour, minute] = parts.slice(0, 5);
    // Extract timezone from the remaining part after "Gregorian,"
    const tzPart = rawData.split("Gregorian,")[1];
    // Remove trailing characters like ".]" and trim
    const timezone = tzPart.replace(/[\.\]]/g, "").trim();
    
    const formattedDate = `${getMonthName(month)} ${parseInt(day)}, ${year}`;
    const formattedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    
    return `The sunrise on ${formattedDate} is at ${formattedTime} GMT ${timezone}`;
  };

  // Helper function to get the month name (Wolfram month is 1-based)
  const getMonthName = (month) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[parseInt(month) - 1];
  };

  return (
    <div className="modal-container">
      <h2 className="modal-title">Next Solar Eclipse Data</h2>
      <form onSubmit={handleSubmit} className="wolfram-form">
        <label className="form-label">Select a date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="date-input"
        />
        <button type="submit" className="sun-submit-button">Get Solar Eclipse Data</button>
      </form>

      {status === "loading" && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {rawData && (
        <div className="sunrise-data">
          <h3>Raw Solar Eclipse Data:</h3>
          <pre className="data-pre">{rawData}</pre>
        </div>
      )}

      {formattedData && (
        <div className="sunrise-data">
          <h3>Formatted Eclipse Data:</h3>
          <p>{formattedData}</p>
        </div>
      )}

      {imageUrl && (
        <div className="sunrise-data">
          <img src={imageUrl} alt="Solar Eclipse Map" className="solar-eclipse-image" />
        </div>
      )}
    </div>
  );
};

export default SolarEclipseForm;
