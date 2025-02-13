import PropTypes from 'prop-types';
import './ProjectCard.css';

const ProjectCard = ({ title, description, demoUrl, imageUrl, technologies }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="technologies">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="demo-button">
          View Project
        </a>
      </div>
    </div>
  );
};
ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  demoUrl: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProjectCard;