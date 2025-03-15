// SunPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SunPage.css'; 
import FrostedBox from './FrostedBox'; 
import Modal from './Modal';
import SunriseForm from './SunriseForm';
import SunsetForm from './SunsetForm';

function SunPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="sun-page">
      <h1 className="sun-title">The Sun</h1>
      <p className="sun-text">What would you like to learn about the sun or planets?</p>
      <button className="frosted-button" onClick={handleBack}>Back to the Oracle</button>

      {/* Frosted Box Container */}
      <div className="home-container">
        <div className="row">
          <FrostedBox 
            title="Sunrise" 
            link="#" // No navigation here—modal will open
            imageSrc="sunriseIcon.png" 
            textColor="#000000"
            onClick={() => handleOpenModal("sunrise")}
          />
          <FrostedBox 
            title="Sunset" 
            link="#" 
            imageSrc="sunsetIcon.png" 
            textColor="#000000"
            onClick={() => handleOpenModal("sunset")}
          />
        </div>
        <div className="row">
          <FrostedBox 
            title="Astrobody Rise" 
            link="#" 
            imageSrc="planetIcon.png" 
            textColor="#000000"
            onClick={() => handleOpenModal("astrobody")}
          />
          <FrostedBox 
            title="Solar Eclipse" 
            link="#" 
            imageSrc="eclipseIcon.png" 
            textColor="#000000"
            onClick={() => handleOpenModal("eclipse")}
          />
        </div>
      </div>

      {/* Modals */}
      {activeModal === "sunrise" && (
        <Modal title="" onClose={handleCloseModal}>
          <SunriseForm queryType="sunrise" />
        </Modal>
      )}
      {activeModal === "sunset" && (
        <Modal title="" onClose={handleCloseModal}>
          <SunsetForm queryType="sunset" />
        </Modal>
      )}
      {activeModal === "astrobody" && (
        <Modal title="Astrobody Rise Info" onClose={handleCloseModal}>
          <SunriseForm queryType="astrobody" />
        </Modal>
      )}
      {activeModal === "eclipse" && (
        <Modal title="Solar Eclipse Info" onClose={handleCloseModal}>
          <SunriseForm queryType="eclipse" />
        </Modal>
      )}
    </div>
  );
}

export default SunPage;
