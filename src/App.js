import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

// Import Home, SunPage, and MoonPage components
import Home from './components/Home';
import SunPage from './components/SunPage';
import MoonPage from './components/MoonPage';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/sun" element={<PageWrapper><SunPage /></PageWrapper>} />
        <Route path="/moon" element={<PageWrapper><MoonPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// Page wrapper component to handle transition animation
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}  // Fade in from 0 opacity
      animate={{ opacity: 1 }}  // Fade to full opacity
      exit={{ opacity: 0 }}  // Fade out to 0 opacity
      transition={{ duration: 0.6 }}  // Duration of the transition
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0 // Ensure this element is on top of the previous page during transition
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}
