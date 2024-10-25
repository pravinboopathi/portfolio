import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styled from 'styled-components';

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.primary}; /* Customize as needed */
  color: ${({ theme }) => theme.white}; /* Customize as needed */
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 9999; /* Ensure it is on top of all other elements */

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }

  svg {
    font-size: 24px;
  }

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
    
    svg {
      font-size: 20px;
    }
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <ScrollToTopButton onClick={scrollToTop}>
        <FaArrowUp />
      </ScrollToTopButton>
    )
  );
};

export default ScrollToTop;
