const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 5000;

// Define route to handle Gemini API requests
app.post("/api/gemini", async (req, res) => {
  const { formattedData } = req.body;  // The formatted sunrise data from Wolfram
  
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent", // Replace with the actual Gemini endpoint
      {
        model: "gemini-2.0-flash",  // Use the desired model
        contents: [formattedData],
      },
      {
        headers: {
          "Authorization": `Bearer AIzaSyDNGTZ8FLoSWwPbhn-JDbdcrb7QhBDe6r4`,  // Add your Gemini API key here
          "Content-Type": "application/json",
        },
      }
    );

    // Send back the Gemini API response
    res.json(response.data);
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    res.status(500).json({ message: "Failed to generate content with Gemini." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
