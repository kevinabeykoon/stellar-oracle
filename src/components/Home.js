// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS for Home styling

function Home() {
  const navigate = useNavigate();

  const handleSunButtonClick = () => {
    navigate('/sun');
  };

  const handleMoonButtonClick = () => {
    navigate('/moon');
  };

  return (
    <div className="home">
      <h1 className="home-title">The Stellar Oracle Welcomes You. </h1>
      <h1 className="home-text">Explore and learn about the astronomical events of time!</h1>
      <h3 className="home-text">Click the Sun or Moon to begin.</h3>

      {/* Image Button for SunPage */}
      <div className="button-sun" onClick={handleSunButtonClick} />

      {/* Image Button for MoonPage */}
      <div className="button-moon" onClick={handleMoonButtonClick} />
    </div>
  );
}

export default Home;
