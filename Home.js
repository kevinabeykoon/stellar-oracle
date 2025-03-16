// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS for Home styling

function Home() {
  const navigate = useNavigate();

  const handleSunButtonClick = () => {
    // Navigate to the SunPage when the button is clicked
    navigate('/sun');
  };

  const handleMoonButtonClick = () => {
    // Navigate to the SunPage when the button is clicked
    navigate('/moon');
  };

  return (
    <div className="home">
      <h1 className="home-title">The Stellar Oracle Welcomes You</h1>
      
      {/* Image Button for SunPage */}
      <div
        className="button-sun"
        onClick={handleSunButtonClick}
      />

    <div
        className="button-moon"
        onClick={handleMoonButtonClick}
      />
    </div>
    
  );
}

export default Home;
