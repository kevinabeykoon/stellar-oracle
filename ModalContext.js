import React, { createContext, useState, useContext } from 'react';

// Create context for modal
const ModalContext = createContext();

// ModalProvider will wrap our application and provide modal state
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Open modal with specific content
  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
    setModalContent('');
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use modal context
export const useModal = () => {
  return useContext(ModalContext);
};
