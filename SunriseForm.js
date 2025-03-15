import React, { useState } from "react";
import axios from "axios";
import './SunriseForm.css';  // Make sure to use this CSS file for styling

const SunriseForm = () => {
  const [date, setDate] = useState("");
  const [sunriseData, setSunriseData] = useState(null);
  const [formattedData, setFormattedData] = useState(null);
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
      // Get sunrise data from Wolfram API
      const response = await axios.get(
        `https://www.wolframcloud.com/obj/abeykoonkevin/data-fetch/sunrise?year=${year}&month=${month}&day=${day}&hour=0&minute=0`
      );

      const rawData = response.data;  // This should be a string in the format of DateObject
      setSunriseData(rawData);
      setError("");
      
      // Format the raw string data into a readable string
      const formattedMessage = formatSunriseData(rawData);
      setFormattedData(formattedMessage);
      setStatus('success'); // Set status to success once the data is fetched and formatted

    } catch (err) {
      setStatus('error'); // Set status to error if the API request fails
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching Wolfram API data:", err);
    }
  };

  const formatSunriseData = (rawData) => {
    // Step 1: Extract the DateObject part
    const dataString = rawData.split("DateObject[{")[1].split("}]")[0];
    
    // Step 2: Split it into individual components
    const dataParts = dataString.split(",").map((item) => item.trim());
  
    // Step 3: Extract the values (year, month, day, hour, minute)
    const [year, month, day, hour, minute] = dataParts.slice(0, 5); // First five items are date/time
    const timezone = rawData.split("Instant,")[1].split(",")[1].trim().replace("]", "");  // Extract timezone and remove "]"
  
    // Step 4: Format the date
    const formattedDate = `${getMonthName(month)} ${parseInt(day)}, ${year}`;
  
    // Step 5: Format the time (no seconds, just hour and minute)
    const formattedTime = `${hour}:${minute}`;
  
    // Step 6: Construct the final message
    return `The sunrise on ${formattedDate} is at ${formattedTime} GMT ${timezone}`;
  };
  
  // Helper function to get the month name
  const getMonthName = (month) => {
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    return months[parseInt(month) - 1];
  };
  
  


  return (
    <div className="modal-container">
      <h2 className="modal-title">Sunrise Time Lookup</h2>
      <form onSubmit={handleSubmit} className="wolfram-form">
        <label className="form-label">Select a date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="date-input"
        />
        <button type="submit" className="submit-button">Get Sunrise Time</button>
      </form>

      {status === 'loading' && <p>Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {sunriseData && (
        <div className="sunrise-data">
          <h3>Raw Sunrise Data:</h3>
          <pre className="data-pre">{sunriseData}</pre>
        </div>
      )}

      {formattedData && (
        <div className="sunrise-data">
          <h3>Formatted Sunrise Time:</h3>
          <p>{formattedData}</p>
        </div>
      )}
    </div>
  );
};

export default SunriseForm;
