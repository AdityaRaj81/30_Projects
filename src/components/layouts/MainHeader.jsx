import React from 'react';
import './MainHeader.css';

const MainHeader = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <h1>React Project Showcase</h1>
        <p className="header-subtitle">A collection of 30 unique React projects demonstrating modern web development concepts</p>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">30</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Components</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Features</span>
          </div>
        </div>
      </div>
      <div className="header-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#f5f5f5" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default MainHeader;