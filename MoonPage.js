// src/components/SunPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoonPage.css'; 
import FrostedBox from './FrostedBox'; 
import Modal from './Modal';
import FullMoonForm from './FullMoonForm';
import LunarEForm from './LunarEForm';
import MoonPhaseForm from './MoonPhaseForm';
import GalaxyMapForm from './GalaxyMapForm';


function MoonPage() {
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
    <div className="moon-page">
      <h1 className="moon-title">The Moon</h1>
      <p className="moon-text">What would you like to learn about the Moon?</p>
      <button className="frosted-button" onClick={handleBack}>Back to the Oracle</button>

      {/* Frosted Box Container */}
      <div className="home-container">
        <div className="row">
          <FrostedBox 
            title="Next Full Moon" 
            link="#" // No navigation here—modal will open
            imageSrc="fullMoonIcon.png" 
            textColor="#000000"
            onClick={() => handleOpenModal("fullmoon")}
          />
          <FrostedBox 
            title="Moon Phase" 
            link="#" 
            imageSrc="phaseIcon.png" 
            textColor="#000000"
            onClick={() => handleOpenModal("moonphase")}
          />
        </div>
        <div className="row">
          <FrostedBox 
            title="Lunar Eclipse" 
            link="#" 
            imageSrc="lunarEIcon.png" 
            textColor="#000000"
            onClick={() => handleOpenModal("lunare")}
          />
          <FrostedBox 
            title="A Map of Above" 
            link="#" 
            imageSrc="subpointIcon.png" 
            textColor="#000000"
            onClick={() => handleOpenModal("galaxymap")}
          />
        </div>
      </div>

      {/* Modals */}
      {activeModal === "fullmoon" && (
        <Modal title="" onClose={handleCloseModal}>
          <FullMoonForm queryType="fullmoon" />
        </Modal>
      )}
      {activeModal === "moonphase" && (
        <Modal title="" onClose={handleCloseModal}>
          <MoonPhaseForm queryType="moonphase" />
        </Modal>
      )}
      {activeModal === "lunare" && (
        <Modal title="" onClose={handleCloseModal}>
          <LunarEForm queryType="lunare" />
        </Modal>
      )}
      {activeModal === "galaxymap" && (
        <Modal title="" onClose={handleCloseModal}>
          <GalaxyMapForm queryType="galaxymap" />
        </Modal>
      )}
    </div>
  );
}

export default MoonPage;

