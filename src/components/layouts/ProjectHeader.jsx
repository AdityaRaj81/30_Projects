import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCode, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './ProjectHeader.css';

const ProjectHeader = ({ title, description }) => {
  return (
    <header className="project-header">
      <div className="project-header-content">
        <Link to="/" className="logo">
          <FontAwesomeIcon icon={faCode} className="logo-icon" />
          <span>React Projects</span>
        </Link>
        
        <div className="project-info">
          <h1>{title}</h1>
          {description && <p className="project-description">
            <FontAwesomeIcon icon={faLightbulb} className="description-icon" />
            {description}
          </p>}
        </div>
        
        <nav className="project-nav">
          <Link to="/" className="nav-button">
            <FontAwesomeIcon icon={faHome} /> Back to Projects
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default ProjectHeader;