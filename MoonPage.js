// src/components/SunPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MoonPage.css'; 
import FrostedBox from './FrostedBox'; 

function MoonPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate back to the HomePage ("/")
    navigate('/');
  };

  return (
    <div className ="moon-page">
      <h1 className = "moon-title" >The Moon</h1>
      <p className = "moon-text">What would like like to learn about the moon?</p>
      <button className="frosted-button" onClick={handleBack}>Back to the Oracle</button>

      <div className="home-container">
        <div className="row">
          <FrostedBox 
            title="Lunar Eclipse" 
            link="/sun" 
            imageSrc="lunarEIcon.png" 
            textColor="#0000000" // Custom color for the title
          />
          <FrostedBox 
            title="Full Moon" 
            link="/moon" 
            imageSrc="fullMoonIcon.png" 
            textColor="#0000000" // Custom color for the title
          />
        </div>
        <div className="row">
          <FrostedBox 
            title="Phases" 
            link="/stars" 
            imageSrc="phaseIcon.png" 
            textColor="#0000000" // Custom color for the title
          />
          <FrostedBox 
            title="Astro Subpoint" 
            link="/planets" 
            imageSrc="subpointIcon.png" 
            textColor="#0000000" // Custom color for the title
          />
        </div>
      </div>
    </div>
  );
}

export default MoonPage;
