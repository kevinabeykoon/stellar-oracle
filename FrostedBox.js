// FrostedBox.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FrostedBox.css';

const FrostedBox = ({ title, link, imageSrc, textColor = 'white', onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Open modal if provided
    } else {
      navigate(link); // Default to navigation
    }
  };

  return (
    <div className="frosted-box" onClick={handleClick} style={{ '--text-color': textColor }}>
      <h3 className="frosted-box-title">{title}</h3>
      <div className="image-container">
        <img src={imageSrc} alt={title} className="icon-image" />
      </div>
    </div>
  );
};

export default FrostedBox;
